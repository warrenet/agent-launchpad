# AGENTS.md

This file helps AI coding assistants (Jules, GitHub Copilot, Claude Code) understand this project.

---

## 🎯 Project Overview

**Agent Launchpad** is a GitHub template for deploying AI agents with maximum automation.

**Tech Stack:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Anthropic/OpenAI/Google AI APIs
- GitHub Actions for CI/CD
- Vercel for deployment

---

## 📁 Key Files and Purposes

### Core Application

| File | Purpose |
|------|---------|
| `app/page.tsx` | Mobile-first chat UI for testing agents |
| `app/layout.tsx` | Root layout with PWA metadata |
| `app/globals.css` | Tailwind + custom styles |
| `app/api/chat/route.ts` | Multi-API chat endpoint (Claude/GPT/Gemini) |

### Configuration

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `tsconfig.json` | TypeScript configuration |
| `tailwind.config.js` | Tailwind theme and plugins |
| `next.config.js` | Next.js settings |
| `vercel.json` | Vercel deployment config |
| `.env.example` | Environment variable template |

### Automation

| File | Purpose |
|------|---------|
| `.github/workflows/deploy.yml` | Main CI/CD pipeline |
| `scripts/generate-docs.js` | AI-powered documentation generator |

### PWA

| File | Purpose |
|------|---------|
| `public/manifest.json` | PWA manifest for mobile install |

---

## 🔧 Key Functions

### `app/api/chat/route.ts`

```typescript
// Main chat handler - routes to appropriate AI provider
POST(request: Request)

// Provider-specific handlers
handleAnthropic(messages, model, stream)  // Claude API
handleOpenAI(messages, model, stream)     // GPT API
handleGemini(messages, model, stream)     // Gemini API

// Rate limiting
checkRateLimit(ip: string): boolean       // In-memory rate limiter

// Health check
GET()                                      // Returns API status
```

### `app/page.tsx`

```typescript
// Main UI component
AgentTestUI()

// Hooks
useLocalStorage<T>(key, initialValue)     // Offline-first storage

// Key functions
sendMessage()                              // Send with streaming
generateCurl()                             // Generate curl command
copyToClipboard(text)                      // Copy utility
clearHistory()                             // Clear chat history
```

### `scripts/generate-docs.js`

```javascript
// File scanning
scanDirectory(dir, files)                  // Recursively scan project

// Context building
buildContext(files)                        // Build AI context from files

// AI generation
generateWithClaude(context, prompt)        // Generate with Claude
generateWithOpenAI(context, prompt)        // Generate with GPT-4
generateWithGemini(context, prompt)        // Generate with Gemini
generateDocs(context, prompt)              // Auto-select provider

// Fallback
generateTemplateDocs()                     // Template-based fallback
```

---

## 🖥️ Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Jest tests |
| `npm run typecheck` | TypeScript type checking |
| `npm run generate-docs` | Generate AI documentation |
| `npm run deploy` | Deploy to Vercel |

---

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | One of three | Claude API key |
| `OPENAI_API_KEY` | One of three | OpenAI API key |
| `GOOGLE_API_KEY` | One of three | Google AI API key |
| `VERCEL_TOKEN` | For deploy | Vercel API token |
| `VERCEL_ORG_ID` | For deploy | Vercel organization ID |
| `VERCEL_PROJECT_ID` | For deploy | Vercel project ID |
| `SLACK_WEBHOOK` | Optional | Slack notifications |
| `DISCORD_WEBHOOK` | Optional | Discord notifications |

---

## 🧪 Testing Patterns

### Unit Tests
```typescript
// Example test for chat endpoint
describe('POST /api/chat', () => {
  it('should return streaming response', async () => {
    const response = await POST(mockRequest);
    expect(response.headers.get('Content-Type')).toBe('text/event-stream');
  });
});
```

### Integration Tests
```typescript
// Test full chat flow
describe('Chat Flow', () => {
  it('should complete conversation', async () => {
    const messages = [{ role: 'user', content: 'Hello' }];
    const response = await chat(messages);
    expect(response).toBeDefined();
  });
});
```

---

## 📋 Coding Conventions

1. **TypeScript**: Strict mode enabled, explicit types required
2. **Components**: Functional components with hooks
3. **Styling**: Tailwind utility classes, mobile-first
4. **API**: REST endpoints in `app/api/` directory
5. **State**: React hooks + localStorage for persistence
6. **Errors**: Try/catch with user-friendly messages
7. **Commits**: Conventional commits (`feat:`, `fix:`, `docs:`)

---

## 🚨 Areas Needing Attention

1. **Rate Limiting**: Currently in-memory, use Redis for production
2. **Error Handling**: Add more specific error types
3. **Testing**: Increase test coverage
4. **Accessibility**: Add more ARIA labels
5. **Performance**: Consider response caching

---

## 🔄 CI/CD Pipeline

The GitHub Actions workflow runs on push to `main`:

1. **Validate**: Lint, type check, validate secrets
2. **Test**: Run unit and integration tests
3. **Document**: AI-generate README and AGENTS.md
4. **Deploy**: Build and deploy to Vercel
5. **Notify**: Send Slack/Discord notifications

---

## 💡 Common Tasks

### Add a new AI model
1. Add handler in `app/api/chat/route.ts`
2. Add option in `app/page.tsx` model selector
3. Update documentation

### Add a new feature
1. Create feature branch
2. Implement with tests
3. Update AGENTS.md
4. Open PR → auto-deploys preview

### Fix a bug
1. Reproduce in dev environment
2. Write failing test
3. Fix and verify test passes
4. Commit with `fix:` prefix

---

*Last updated: Auto-generated by Agent Launchpad*
