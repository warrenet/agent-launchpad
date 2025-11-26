import { NextRequest } from 'next/server';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: Message[];
  model: string;
  stream?: boolean;
  systemPrompt?: string;
}

// In-memory rate limiting (resets on deployment)
const rateLimits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimits.get(ip);

  if (!limit || now > limit.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + 60000 });
    return true;
  }

  if (limit.count >= 20) {
    return false;
  }

  limit.count++;
  return true;
}

function getClientIP(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    '0.0.0.0'
  );
}

// GET - Health check
export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    apis: {
      anthropic: !!process.env.ANTHROPIC_API_KEY,
      openai: !!process.env.OPENAI_API_KEY,
      google: !!process.env.GOOGLE_API_KEY,
    },
  };

  return Response.json(health);
}

// POST - Main chat handler
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIP(request);
    if (!checkRateLimit(ip)) {
      return Response.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const body: ChatRequest = await request.json();
    const { messages, model, stream = true, systemPrompt } = body;

    // Validation
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    if (!model) {
      return Response.json({ error: 'Model is required' }, { status: 400 });
    }

    // Route to appropriate handler
    if (model.startsWith('claude')) {
      return handleAnthropic(messages, model, stream, systemPrompt);
    } else if (model.startsWith('gpt')) {
      return handleOpenAI(messages, model, stream, systemPrompt);
    } else if (model.includes('gemini')) {
      return handleGemini(messages, model, stream, systemPrompt);
    } else {
      return Response.json({ error: 'Unsupported model' }, { status: 400 });
    }
  } catch (error) {
    console.error('Chat API Error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Anthropic Claude handler
async function handleAnthropic(
  messages: Message[],
  model: string,
  stream: boolean,
  systemPrompt?: string
): Promise<Response> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: 'Anthropic API key not configured' },
      { status: 500 }
    );
  }

  try {
    const Anthropic = (await import('@anthropic-ai/sdk')).default;
    const client = new Anthropic({ apiKey });

    if (stream) {
      const streamResponse = await client.messages.create({
        model,
        max_tokens: 4096,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        system: systemPrompt,
        stream: true,
      });

      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        async start(controller) {
          try {
            for await (const event of streamResponse) {
              if (
                event.type === 'content_block_delta' &&
                event.delta.type === 'text_delta'
              ) {
                const data = `data: ${JSON.stringify({
                  content: event.delta.text,
                })}\n\n`;
                controller.enqueue(encoder.encode(data));
              }
            }
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();
          } catch (error) {
            controller.error(error);
          }
        },
      });

      return new Response(readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      });
    } else {
      const response = await client.messages.create({
        model,
        max_tokens: 4096,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        system: systemPrompt,
      });

      const content = response.content[0];
      const text = content.type === 'text' ? content.text : '';

      return Response.json({ response: text });
    }
  } catch (error: any) {
    console.error('Anthropic API Error:', error);
    return Response.json(
      { error: error.message || 'Anthropic API error' },
      { status: 500 }
    );
  }
}

// OpenAI handler
async function handleOpenAI(
  messages: Message[],
  model: string,
  stream: boolean,
  systemPrompt?: string
): Promise<Response> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: 'OpenAI API key not configured' },
      { status: 500 }
    );
  }

  try {
    const apiMessages = systemPrompt
      ? [{ role: 'system', content: systemPrompt }, ...messages]
      : messages;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: apiMessages,
        stream,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'OpenAI API error');
    }

    if (stream) {
      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        async start(controller) {
          try {
            const reader = response.body?.getReader();
            if (!reader) throw new Error('No response body');

            const decoder = new TextDecoder();
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value);
              const lines = chunk.split('\n').filter((line) => line.trim());

              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  const data = line.slice(6);
                  if (data === '[DONE]') {
                    controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                    continue;
                  }

                  try {
                    const parsed = JSON.parse(data);
                    const content =
                      parsed.choices[0]?.delta?.content || '';
                    if (content) {
                      const payload = `data: ${JSON.stringify({
                        content,
                      })}\n\n`;
                      controller.enqueue(encoder.encode(payload));
                    }
                  } catch (e) {
                    // Skip invalid JSON
                  }
                }
              }
            }
            controller.close();
          } catch (error) {
            controller.error(error);
          }
        },
      });

      return new Response(readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      });
    } else {
      const data = await response.json();
      return Response.json({
        response: data.choices[0]?.message?.content || '',
      });
    }
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    return Response.json(
      { error: error.message || 'OpenAI API error' },
      { status: 500 }
    );
  }
}

// Google Gemini handler
async function handleGemini(
  messages: Message[],
  model: string,
  stream: boolean,
  systemPrompt?: string
): Promise<Response> {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: 'Google API key not configured' },
      { status: 500 }
    );
  }

  try {
    // Convert messages to Gemini format
    const contents = messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const requestBody: any = {
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    };

    if (systemPrompt) {
      requestBody.systemInstruction = {
        parts: [{ text: systemPrompt }],
      };
    }

    const endpoint = stream
      ? `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`
      : `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Gemini API error');
    }

    if (stream) {
      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        async start(controller) {
          try {
            const reader = response.body?.getReader();
            if (!reader) throw new Error('No response body');

            const decoder = new TextDecoder();
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value);
              const lines = chunk.split('\n').filter((line) => line.trim());

              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  const data = line.slice(6);
                  try {
                    const parsed = JSON.parse(data);
                    const text =
                      parsed.candidates?.[0]?.content?.parts?.[0]?.text || '';
                    if (text) {
                      const payload = `data: ${JSON.stringify({
                        content: text,
                      })}\n\n`;
                      controller.enqueue(encoder.encode(payload));
                    }
                  } catch (e) {
                    // Skip invalid JSON
                  }
                }
              }
            }
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();
          } catch (error) {
            controller.error(error);
          }
        },
      });

      return new Response(readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      });
    } else {
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      return Response.json({ response: text });
    }
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return Response.json(
      { error: error.message || 'Gemini API error' },
      { status: 500 }
    );
  }
}
