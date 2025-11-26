# CLAUDE.md

> **Comprehensive guide for AI coding assistants (Claude Code, Cursor, Jules, GitHub Copilot)**
>
> This file provides deep context about the Agent Launchpad codebase, its architecture, conventions, and workflows to help AI assistants make informed decisions and provide better assistance.

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Repository Architecture](#-repository-architecture)
3. [Tech Stack Details](#-tech-stack-details)
4. [File Structure & Purposes](#-file-structure--purposes)
5. [Development Workflows](#-development-workflows)
6. [Coding Conventions](#-coding-conventions)
7. [CI/CD Pipeline](#-cicd-pipeline)
8. [Environment Configuration](#-environment-configuration)
9. [Common Tasks & Patterns](#-common-tasks--patterns)
10. [Testing Strategy](#-testing-strategy)
11. [Deployment Process](#-deployment-process)
12. [Security Considerations](#-security-considerations)
13. [Troubleshooting Guide](#-troubleshooting-guide)

---

## 🎯 Project Overview

**Agent Launchpad** is a GitHub template repository designed for rapid deployment of AI agents with maximum automation. It provides a production-ready foundation for building and deploying conversational AI applications.

### Key Characteristics

- **Type**: Next.js 14 web application (App Router)
- **Purpose**: GitHub template for AI agent deployment with auto-documentation
- **License**: MIT
- **Author**: Warren E. T.
- **Target Users**: Developers building AI agents and conversational AI apps
- **Deployment**: Vercel (primary), supports other platforms

### Core Value Propositions

1. **95%+ Automation**: Push code → everything else happens automatically
2. **Mobile-First**: PWA-enabled test UI installable on phones
3. **AI-Powered Documentation**: Auto-generates README, AGENTS.md, CHANGELOG
4. **Multi-API Support**: Works with Claude, GPT-4, and Gemini
5. **Zero-Config Deploy**: Automatic Vercel deployment on push to main

---

## 🏗️ Repository Architecture

### Current State

The repository is currently in **template/bootstrap phase**. The following structure is **planned but not yet implemented**:

```
agent-launchpad/
├── .git/                      # Git version control
├── .github/                   # [TO BE CREATED] GitHub Actions workflows
│   └── workflows/
│       └── deploy.yml         # [MOVE FROM ROOT] CI/CD pipeline
├── app/                       # [TO BE CREATED] Next.js 14 App Router
│   ├── api/
│   │   └── chat/
│   │       └── route.ts       # [TO CREATE] Multi-API chat endpoint
│   ├── globals.css            # [TO CREATE] Tailwind + custom styles
│   ├── layout.tsx             # [TO CREATE] Root layout with PWA metadata
│   └── page.tsx               # [TO CREATE] Mobile-first chat UI
├── public/                    # [TO BE CREATED] Static assets
│   └── manifest.json          # [TO CREATE] PWA manifest
├── scripts/                   # ✅ Utility scripts
│   ├── validate-lockfile.sh   # ✅ Validates package-lock.json
│   └── generate-docs.js       # [TO CREATE] AI doc generator
├── .env.example               # ✅ Environment variable template
├── .gitignore                 # ✅ Git ignore rules
├── AGENTS.md                  # ✅ Jules/AI assistant documentation
├── deploy.yml                 # ✅ GitHub Actions pipeline (to move)
├── LICENSE                    # ✅ MIT License
├── next.config.js             # ✅ Next.js configuration
├── package.json               # ✅ Dependencies and scripts
├── postcss.config.js          # ✅ PostCSS configuration
├── README.md                  # ✅ User-facing documentation
├── tailwind.config.js         # ✅ Tailwind CSS configuration
├── tsconfig.json              # ✅ TypeScript configuration
└── vercel.json                # ✅ Vercel deployment config
```

### Architecture Patterns

1. **Monorepo Structure**: Single repository contains frontend, API, and deployment config
2. **Serverless Functions**: API routes deploy as Vercel Edge Functions
3. **Static Site Generation**: Pages pre-rendered where possible
4. **Progressive Enhancement**: Core functionality works without JS
5. **Mobile-First Design**: Responsive from 320px up

---

## 🔧 Tech Stack Details

### Core Framework

- **Next.js 14.2.0+**: React framework with App Router
  - Server Components by default
  - API Routes in `app/api/`
  - File-based routing
  - Automatic code splitting

### Language & Type Safety

- **TypeScript 5.0+**: Strict mode enabled
  - All `.ts` and `.tsx` files type-checked
  - No implicit `any` allowed
  - Strict null checks enabled
  - Paths alias: `@/*` → project root

### Styling

- **Tailwind CSS 3.4+**: Utility-first CSS
  - Mobile-first breakpoints
  - Custom theme in `tailwind.config.js`
  - PostCSS for processing
  - JIT mode enabled

### AI APIs (Optional Dependencies)

- **Anthropic SDK 0.39.0+**: Claude API client
- **OpenAI SDK**: GPT API client (via fetch)
- **Google Generative AI**: Gemini API (via fetch)

### Build & Development Tools

- **ESLint 8.0+**: Code linting (Next.js config)
- **Prettier 3.0+**: Code formatting
- **Jest 29.0+**: Unit testing framework
- **Autoprefixer 10.4+**: CSS vendor prefixes

### Deployment & CI/CD

- **Vercel**: Primary deployment target
- **GitHub Actions**: CI/CD automation
- **Node.js 18+ (20 in CI)**: Runtime environment

---

## 📁 File Structure & Purposes

### Root Configuration Files

| File | Purpose | Modify When | AI Assistant Notes |
|------|---------|-------------|-------------------|
| `package.json` | Dependencies, scripts, metadata | Adding dependencies, updating scripts | Check for `optionalDependencies` - AI SDKs are optional |
| `tsconfig.json` | TypeScript compiler options | Changing module resolution, adding paths | Strict mode enabled - maintain type safety |
| `next.config.js` | Next.js framework config | Adding headers, redirects, image domains | Contains security headers - preserve these |
| `tailwind.config.js` | Tailwind theme and plugins | Customizing design system | Extends default theme - don't replace |
| `postcss.config.js` | PostCSS processing pipeline | Adding CSS plugins | Minimal config - rarely needs changes |
| `vercel.json` | Vercel deployment settings | Adjusting function timeouts, regions | Max duration: 30s for API routes |
| `.env.example` | Environment variable template | Adding new env vars | Update when adding new API integrations |
| `.gitignore` | Files excluded from Git | Adding new build artifacts | Never commit `.env.local` |

### Documentation Files

| File | Auto-Generated | Purpose | Update Frequency |
|------|----------------|---------|------------------|
| `README.md` | ✅ Yes | User-facing documentation | Every push to main |
| `AGENTS.md` | ✅ Yes | AI assistant context | Every push to main |
| `CLAUDE.md` | ❌ No | Deep AI assistant guide | Manual updates |
| `CHANGELOG.md` | ✅ Yes | Git commit history | Every push to main |
| `LICENSE` | ❌ No | MIT license terms | Never |

### Scripts Directory

| File | Language | Purpose | Usage |
|------|----------|---------|-------|
| `validate-lockfile.sh` | Bash | Validates package-lock.json for deployment | CI/CD pre-deploy check |
| `generate-docs.js` | Node.js | AI-powered doc generation | CI/CD documentation step |

### Future Application Structure

The following files will be created as the application is built:

#### `app/api/chat/route.ts`

**Purpose**: Main chat endpoint supporting multiple AI providers

**Key Functions**:
- `POST(request: Request)`: Main request handler
- `GET()`: Health check endpoint
- `handleAnthropic(messages, model, stream)`: Claude API integration
- `handleOpenAI(messages, model, stream)`: GPT API integration
- `handleGemini(messages, model, stream)`: Gemini API integration
- `checkRateLimit(ip: string)`: In-memory rate limiter

**Request Format**:
```typescript
{
  messages: Array<{ role: 'user' | 'assistant', content: string }>,
  model: string,  // e.g., 'claude-3-5-sonnet-20241022'
  stream: boolean,
  systemPrompt?: string
}
```

**Response Format**:
- Streaming: `text/event-stream` with Server-Sent Events
- Non-streaming: JSON with `{ response: string }`

#### `app/page.tsx`

**Purpose**: Mobile-first chat test UI

**Key Features**:
- Message history with localStorage persistence
- Model selector dropdown
- System prompt configuration
- Copy as cURL functionality
- Real-time streaming responses
- Health status indicator

**Hooks**:
- `useLocalStorage<T>(key, initialValue)`: Offline-first storage
- `useState`, `useEffect` for React state management

#### `app/layout.tsx`

**Purpose**: Root layout with PWA metadata

**Key Features**:
- PWA manifest link
- Meta tags for mobile
- Global CSS imports
- Theme provider (if using)

---

## 🔄 Development Workflows

### Initial Setup

```bash
# 1. Clone the repository
git clone https://github.com/warrenet/agent-launchpad.git
cd agent-launchpad

# 2. Install dependencies
npm install  # or npm ci for clean install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local and add at least one AI API key

# 4. Start development server
npm run dev  # Runs on http://localhost:3000
```

### Development Cycle

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Edit files in `app/`, `app/api/`, or other directories
   - Follow TypeScript strict mode requirements
   - Use Tailwind utility classes for styling

3. **Test Locally**
   ```bash
   npm run dev          # Development server
   npm run lint         # Check for linting errors
   npm run typecheck    # TypeScript validation
   npm run test         # Run Jest tests (when configured)
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   # Use conventional commits: feat:, fix:, docs:, refactor:, test:
   ```

5. **Push to Remote**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open Pull Request**
   - GitHub Actions runs validation, tests, and preview deployment
   - Preview URL posted as PR comment
   - Merge to main triggers production deployment

### Hot Reload Behavior

- **Page Changes**: Instant refresh
- **API Route Changes**: Server restarts (~1s)
- **Config Changes**: Requires manual restart
- **Environment Variables**: Requires restart

---

## 📐 Coding Conventions

### TypeScript Standards

```typescript
// ✅ DO: Use explicit types
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function processMessage(message: Message): string {
  return message.content.trim();
}

// ❌ DON'T: Use implicit any
function processMessage(message) {  // Error: implicit any
  return message.content;
}
```

### Component Patterns

```typescript
// ✅ DO: Use functional components with TypeScript
interface ChatProps {
  messages: Message[];
  onSend: (message: string) => void;
}

export default function Chat({ messages, onSend }: ChatProps) {
  const [input, setInput] = useState('');
  // ...
}

// ❌ DON'T: Use class components
class Chat extends React.Component { /* ... */ }
```

### Styling Conventions

```tsx
// ✅ DO: Use Tailwind utility classes (mobile-first)
<div className="p-4 md:p-6 lg:p-8 bg-white dark:bg-gray-900">
  <h1 className="text-lg md:text-xl lg:text-2xl font-bold">
    Mobile First
  </h1>
</div>

// ❌ DON'T: Use inline styles
<div style={{ padding: '16px', backgroundColor: 'white' }}>
```

### API Route Patterns

```typescript
// ✅ DO: Handle errors properly
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Process request
    return Response.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// ❌ DON'T: Let errors bubble up unhandled
export async function POST(request: Request) {
  const body = await request.json();  // Can throw
  // ...
}
```

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format: <type>(<scope>): <subject>

feat: add Gemini API support
feat(api): add streaming response support
fix: resolve CORS issue in chat endpoint
fix(ui): correct mobile layout overflow
docs: update API documentation
docs(readme): add deployment instructions
refactor: simplify message handling logic
test: add unit tests for chat API
chore: update dependencies
chore(deps): bump @anthropic-ai/sdk to 0.40.0
```

### File Naming Conventions

- **Components**: `PascalCase.tsx` (e.g., `ChatMessage.tsx`)
- **API Routes**: `route.ts` (Next.js App Router convention)
- **Utilities**: `camelCase.ts` (e.g., `formatMessage.ts`)
- **Types**: `types.ts` or inline with component
- **Constants**: `UPPER_SNAKE_CASE` or `camelCase` file

---

## 🔄 CI/CD Pipeline

The GitHub Actions pipeline (`deploy.yml`) runs on:
- Push to `main` or `master`
- Pull requests to `main` or `master`
- Manual workflow dispatch

### Pipeline Stages

#### 1. Validate (Parallel Execution)

**Duration**: ~1-2 minutes

**Steps**:
1. Checkout code
2. Detect agent type (Node.js/Python/Generic)
3. Setup Node.js 20 or Python 3.11
4. Install dependencies (`npm ci`)
5. Validate API keys in secrets
6. Lint code with ESLint
7. Check for changes since last commit

**Outputs**:
- `has_changes`: Whether code changed
- `agent_type`: Detected project type

**AI Assistant Notes**:
- Linting errors are warnings only (`continue-on-error: true`)
- At least one AI API key must be configured
- Uses `npm ci` for reproducible builds

#### 2. Test (Sequential after Validate)

**Duration**: ~30 seconds - 2 minutes

**Steps**:
1. Checkout code
2. Setup runtime environment
3. Install dependencies
4. Run test suite (`npm test`)
5. Upload coverage to Codecov

**Skip Conditions**:
- Manual workflow with `skip_tests: true`

**AI Assistant Notes**:
- Currently no tests configured - step will echo message
- Add tests in `__tests__/` directory
- Use Jest configuration in `package.json`

#### 3. Document (Sequential after Test)

**Duration**: ~30 seconds - 1 minute

**Steps**:
1. Checkout code with GITHUB_TOKEN
2. Setup Node.js
3. Run `scripts/generate-docs.js` (or fallback to templates)
4. Generate CHANGELOG.md from git history
5. Sync .env.example with actual usage
6. Commit and push documentation

**Generated Files**:
- `README.md`: User-facing docs
- `AGENTS.md`: AI assistant context
- `CHANGELOG.md`: Commit history
- `.env.example`: Environment template

**AI Assistant Notes**:
- Uses AI APIs (Claude/GPT/Gemini) if available
- Falls back to template generation
- Commits with `[skip ci]` to prevent loops
- Bot commits as "Agent Launchpad Bot"

#### 4. Deploy (Sequential after Document)

**Duration**: ~2-5 minutes

**Steps**:
1. Checkout code
2. Setup Node.js
3. Install Vercel CLI
4. Build project (`npm run build`)
5. Deploy to Vercel production
6. Create GitHub release (main branch only)
7. Post deployment comment (PRs only)

**Environment Variables**:
- `VERCEL_TOKEN`: Required for deployment
- `VERCEL_ORG_ID`: Required for deployment
- `VERCEL_PROJECT_ID`: Required for deployment

**AI Assistant Notes**:
- Deployment skipped if Vercel secrets missing
- Creates release tag `v{run_number}`
- Preview deployments for PRs
- Production deployments for main branch

#### 5. Notify (Sequential after Deploy)

**Duration**: ~5 seconds

**Steps**:
1. Check deployment status
2. Send Slack notification (if configured)
3. Send Discord notification (if configured)

**Optional Webhooks**:
- `SLACK_WEBHOOK`: Slack channel URL
- `DISCORD_WEBHOOK`: Discord webhook URL

---

## 🌍 Environment Configuration

### Development Environment (.env.local)

**Never commit this file!** It's in `.gitignore`.

```bash
# Required: At least ONE AI API key
GOOGLE_API_KEY=AIza...               # Recommended (Google AI Studio)
ANTHROPIC_API_KEY=sk-ant-...         # Alternative (Anthropic Console)
OPENAI_API_KEY=sk-proj-...           # Alternative (OpenAI Platform)

# Optional: Application config
NEXT_PUBLIC_APP_NAME=Agent Launchpad
NODE_ENV=development

# Optional: Notifications (not used in local dev)
SLACK_WEBHOOK=https://hooks.slack.com/...
DISCORD_WEBHOOK=https://discord.com/api/webhooks/...
```

### GitHub Secrets (Production)

Configure at: `Repository Settings → Secrets and variables → Actions`

**Required for AI Features**:
- `GOOGLE_API_KEY`: Google Gemini API key (primary)
- `ANTHROPIC_API_KEY`: Anthropic Claude API key (alternative)
- `OPENAI_API_KEY`: OpenAI GPT API key (alternative)

**Required for Deployment**:
- `VERCEL_TOKEN`: Vercel API token
- `VERCEL_ORG_ID`: Vercel organization ID
- `VERCEL_PROJECT_ID`: Vercel project ID

**Optional**:
- `SLACK_WEBHOOK`: Slack notification URL
- `DISCORD_WEBHOOK`: Discord notification URL

### Environment Variable Priority

1. `.env.local` (highest, local dev only)
2. `.env.development` (development mode)
3. `.env.production` (production mode)
4. `.env` (all environments, **not recommended**)

### Getting API Keys

**Google Gemini** (Recommended):
1. Visit https://aistudio.google.com/apikey
2. Click "Create API Key"
3. Copy key to `.env.local`

**Anthropic Claude**:
1. Visit https://console.anthropic.com/
2. Navigate to API Keys
3. Generate new key
4. Copy to `.env.local`

**OpenAI**:
1. Visit https://platform.openai.com/api-keys
2. Create new secret key
3. Copy immediately (only shown once)
4. Add to `.env.local`

**Vercel**:
1. Visit https://vercel.com/account/tokens
2. Create new token with appropriate scopes
3. Run `vercel link` in project directory
4. Find IDs in `.vercel/project.json`

---

## 🎯 Common Tasks & Patterns

### Task 1: Add a New AI Model

**Files to modify**:
1. `app/api/chat/route.ts` - Add handler function
2. `app/page.tsx` - Add to model selector dropdown
3. `README.md` - Update documentation
4. `.env.example` - Add API key if new provider

**Example**:
```typescript
// app/api/chat/route.ts
async function handleNewProvider(
  messages: Message[],
  model: string,
  stream: boolean
): Promise<Response> {
  const apiKey = process.env.NEW_PROVIDER_API_KEY;
  if (!apiKey) {
    return Response.json({ error: 'API key not configured' }, { status: 500 });
  }
  // Implementation
}

// app/page.tsx
<select>
  <option value="claude-3-5-sonnet-20241022">Claude 3.5 Sonnet</option>
  <option value="gpt-4">GPT-4</option>
  <option value="new-model-id">New Model</option>
</select>
```

### Task 2: Add Custom System Prompts

**Pattern**: Store in localStorage, send with each request

```typescript
// app/page.tsx
const [systemPrompt, setSystemPrompt] = useLocalStorage(
  'systemPrompt',
  'You are a helpful assistant.'
);

// In sendMessage function:
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({
    messages,
    model,
    stream: true,
    systemPrompt  // Include here
  })
});
```

### Task 3: Implement Rate Limiting

**Current**: In-memory (resets on deploy)
**Production**: Use Redis or Vercel KV

```typescript
// app/api/chat/route.ts (current in-memory)
const rateLimits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimits.get(ip);

  if (!limit || now > limit.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + 60000 });
    return true;
  }

  if (limit.count >= 10) {  // 10 requests per minute
    return false;
  }

  limit.count++;
  return true;
}
```

### Task 4: Add API Endpoint Documentation

**Pattern**: Use JSDoc comments for TypeScript intellisense

```typescript
/**
 * POST /api/chat
 *
 * Main chat endpoint supporting multiple AI providers.
 *
 * @param {Request} request - HTTP request with JSON body
 * @returns {Response} Streaming or JSON response
 *
 * @example
 * ```typescript
 * const response = await fetch('/api/chat', {
 *   method: 'POST',
 *   body: JSON.stringify({
 *     messages: [{ role: 'user', content: 'Hello!' }],
 *     model: 'claude-3-5-sonnet-20241022',
 *     stream: true
 *   })
 * });
 * ```
 */
export async function POST(request: Request): Promise<Response> {
  // Implementation
}
```

### Task 5: Debug Production Issues

**Steps**:
1. Check Vercel deployment logs
2. Review GitHub Actions workflow runs
3. Verify environment variables in Vercel dashboard
4. Test API endpoints with curl

```bash
# Health check
curl https://your-app.vercel.app/health

# Test chat endpoint
curl -X POST https://your-app.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Test"}],
    "model": "gemini-pro",
    "stream": false
  }'
```

### Task 6: Update Dependencies

**Safe process**:
```bash
# 1. Check for outdated packages
npm outdated

# 2. Update non-breaking (patch/minor)
npm update

# 3. Update specific package
npm install @anthropic-ai/sdk@latest

# 4. Test everything
npm run dev
npm run build
npm run lint
npm run typecheck

# 5. Commit with descriptive message
git commit -m "chore(deps): update dependencies"
```

### Task 7: Add PWA Features

**Files to modify**:
- `public/manifest.json`: PWA configuration
- `app/layout.tsx`: Add manifest link
- `next.config.js`: Configure PWA settings

```json
// public/manifest.json
{
  "name": "Agent Launchpad",
  "short_name": "Launchpad",
  "description": "AI Agent Testing Interface",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 🧪 Testing Strategy

### Current State

**No tests currently implemented.** The `npm test` command will echo a message.

### Recommended Test Structure

```
__tests__/
├── api/
│   └── chat.test.ts          # API endpoint tests
├── components/
│   └── ChatMessage.test.tsx  # Component tests
└── utils/
    └── helpers.test.ts       # Utility function tests
```

### Unit Test Example (Jest + React Testing Library)

```typescript
// __tests__/api/chat.test.ts
import { POST } from '@/app/api/chat/route';

describe('POST /api/chat', () => {
  it('returns 400 for missing messages', async () => {
    const request = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ model: 'gemini-pro' })
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it('returns streaming response when stream is true', async () => {
    const request = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Hello' }],
        model: 'gemini-pro',
        stream: true
      })
    });

    const response = await POST(request);
    expect(response.headers.get('Content-Type')).toBe('text/event-stream');
  });
});
```

### Integration Test Pattern

```typescript
// __tests__/integration/chat-flow.test.ts
describe('Chat Flow', () => {
  it('completes full conversation', async () => {
    const messages = [
      { role: 'user', content: 'What is 2+2?' }
    ];

    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages, model: 'gemini-pro', stream: false })
    });

    const data = await response.json();
    expect(data.response).toBeDefined();
    expect(typeof data.response).toBe('string');
  });
});
```

### Test Coverage Goals

- **API Routes**: 80%+ coverage
- **Components**: 70%+ coverage
- **Utilities**: 90%+ coverage

### Running Tests

```bash
npm test                # Run all tests
npm run test:watch      # Watch mode for development
npm run test:coverage   # Generate coverage report
```

---

## 🚀 Deployment Process

### Automatic Deployment (Recommended)

**Trigger**: Push to `main` branch

**Process**:
1. GitHub Actions runs full pipeline
2. Validation and tests pass
3. Documentation auto-generated
4. Build created with `npm run build`
5. Deployed to Vercel production
6. GitHub release created
7. Notifications sent

**URL**: Vercel assigns production domain

### Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Link project (first time)
vercel link

# Deploy to preview
npm run deploy:preview

# Deploy to production
npm run deploy
```

### Environment Variables in Vercel

**Required for deployment**:
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add the same variables from `.env.local`:
   - `GOOGLE_API_KEY`
   - `ANTHROPIC_API_KEY`
   - `OPENAI_API_KEY`
3. Set environment: Production, Preview, Development
4. Redeploy to apply changes

### Deployment Checklist

- [ ] All environment variables configured in Vercel
- [ ] GitHub secrets set for CI/CD
- [ ] API keys valid and active
- [ ] Build succeeds locally (`npm run build`)
- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] No linting errors (`npm run lint`)
- [ ] `.env.local` not committed
- [ ] Vercel project linked

### Rollback Procedure

**Via Vercel Dashboard**:
1. Go to Deployments tab
2. Find previous working deployment
3. Click "..." → "Promote to Production"

**Via CLI**:
```bash
vercel rollback
```

---

## 🔒 Security Considerations

### Environment Variables

**Never commit**:
- `.env.local`
- `.env.development.local`
- `.env.production.local`
- Any file with API keys

**Always check**:
- `.gitignore` includes `.env*.local`
- GitHub repository has no exposed secrets

### API Security Headers

Already configured in `next.config.js` and `vercel.json`:

```javascript
{
  'X-Content-Type-Options': 'nosniff',        // Prevent MIME sniffing
  'X-Frame-Options': 'DENY',                  // Prevent clickjacking
  'X-XSS-Protection': '1; mode=block',        // XSS protection
  'Referrer-Policy': 'strict-origin-when-cross-origin'
}
```

### Rate Limiting

**Current**: In-memory (10 requests/minute per IP)
**Limitation**: Resets on deployment
**Production Recommendation**: Use Vercel Edge Config or Redis

### Input Validation

**Always validate**:
- User messages (max length, sanitize)
- Model names (whitelist only)
- System prompts (max length)

```typescript
// Example validation
const MAX_MESSAGE_LENGTH = 10000;

if (message.content.length > MAX_MESSAGE_LENGTH) {
  return Response.json(
    { error: 'Message too long' },
    { status: 400 }
  );
}

const ALLOWED_MODELS = [
  'claude-3-5-sonnet-20241022',
  'gpt-4',
  'gemini-pro'
];

if (!ALLOWED_MODELS.includes(model)) {
  return Response.json(
    { error: 'Invalid model' },
    { status: 400 }
  );
}
```

### CORS Configuration

**Default**: Same-origin only
**If needed**: Add CORS headers in API routes

```typescript
export async function POST(request: Request) {
  const response = await handleRequest(request);

  response.headers.set('Access-Control-Allow-Origin', 'https://yourapp.com');
  response.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');

  return response;
}
```

### Secrets Scanning

**GitHub automatically scans for**:
- API keys
- Private keys
- Access tokens

**Best practices**:
- Use GitHub Secrets for CI/CD
- Use Vercel Environment Variables for runtime
- Rotate keys regularly
- Use read-only keys where possible

---

## 🛠️ Troubleshooting Guide

### Issue: Build Fails with TypeScript Errors

**Symptoms**:
```
Type error: Property 'xyz' does not exist on type 'ABC'
```

**Solutions**:
1. Run `npm run typecheck` locally
2. Check `tsconfig.json` for strict settings
3. Add explicit types to variables
4. Install missing `@types/*` packages

```bash
npm install --save-dev @types/node @types/react
```

### Issue: Deployment Fails - Missing Vercel Secrets

**Symptoms**:
```
⚠️ VERCEL_TOKEN not set - skipping deployment
```

**Solutions**:
1. Create Vercel token at https://vercel.com/account/tokens
2. Add to GitHub Secrets:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
3. Get IDs by running `vercel link` locally
4. Check `.vercel/project.json` for IDs

### Issue: API Returns 500 Error

**Symptoms**:
```json
{ "error": "Internal server error" }
```

**Solutions**:
1. Check Vercel function logs
2. Verify API key is set in Vercel environment variables
3. Test API key validity with curl
4. Check API provider status page
5. Review error logs in Vercel dashboard

### Issue: Rate Limit Exceeded

**Symptoms**:
```json
{ "error": "Rate limit exceeded" }
```

**Solutions**:
1. Wait 60 seconds (current implementation)
2. Implement persistent rate limiting with Redis
3. Increase rate limit threshold
4. Add authentication to bypass rate limits

### Issue: Hot Reload Not Working

**Symptoms**: Changes don't appear after saving

**Solutions**:
1. Check terminal for errors
2. Restart dev server (`npm run dev`)
3. Clear `.next` directory:
   ```bash
   rm -rf .next
   npm run dev
   ```
4. Check file is saved in correct location
5. Verify no syntax errors

### Issue: Environment Variables Not Loading

**Symptoms**: `process.env.VARIABLE` is undefined

**Solutions**:
1. Restart dev server (required for `.env.local` changes)
2. Check variable name starts with `NEXT_PUBLIC_` for client-side
3. Verify file is named `.env.local` (not `.env`)
4. Check file is in project root
5. Verify no quotes around values:
   ```bash
   # ✅ Correct
   API_KEY=abc123

   # ❌ Wrong
   API_KEY="abc123"
   ```

### Issue: Module Not Found

**Symptoms**:
```
Error: Cannot find module '@/components/Chat'
```

**Solutions**:
1. Check path alias in `tsconfig.json`:
   ```json
   "paths": { "@/*": ["./*"] }
   ```
2. Restart TypeScript server (VS Code: Cmd+Shift+P → "Restart TS Server")
3. Verify file exists at path
4. Check file extension (.ts vs .tsx vs .js)

### Issue: Tailwind Classes Not Applied

**Symptoms**: Styles don't appear despite Tailwind classes

**Solutions**:
1. Check `tailwind.config.js` content paths include your files
2. Verify `globals.css` imports Tailwind directives:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
3. Check `app/layout.tsx` imports `globals.css`
4. Restart dev server
5. Clear browser cache

### Issue: Package Lock Validation Fails

**Symptoms**:
```
Error: lockfileVersion is 3, expected 1
```

**Solutions**:
1. Use npm 6.x to generate lockfile version 1:
   ```bash
   npm install -g npm@6
   npm install
   ```
2. Or update validation script to accept version 3
3. Check Node version matches Vercel (18.x)

---

## 📚 Additional Resources

### Official Documentation

- **Next.js**: https://nextjs.org/docs
- **TypeScript**: https://www.typescriptlang.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Vercel**: https://vercel.com/docs

### AI API Documentation

- **Anthropic Claude**: https://docs.anthropic.com/
- **OpenAI**: https://platform.openai.com/docs
- **Google Gemini**: https://ai.google.dev/docs

### Related Tools

- **GitHub Actions**: https://docs.github.com/en/actions
- **Jest**: https://jestjs.io/docs/getting-started
- **ESLint**: https://eslint.org/docs/latest/

---

## 🤖 AI Assistant Best Practices

### When Making Changes

1. **Read First**: Always read existing code before modifying
2. **Maintain Consistency**: Follow existing patterns and conventions
3. **Type Safety**: Ensure all TypeScript types are explicit
4. **Test Locally**: Verify changes work with `npm run dev`
5. **Update Docs**: Modify AGENTS.md if architecture changes
6. **Commit Properly**: Use conventional commit messages

### When Asked to Debug

1. **Gather Context**: Read error messages and logs
2. **Check Basics**: Environment variables, dependencies, file paths
3. **Isolate Issue**: Test components in isolation
4. **Verify Assumptions**: Don't assume - check git history
5. **Provide Steps**: Give clear reproduction steps

### When Suggesting Features

1. **Understand Requirements**: Ask clarifying questions
2. **Check Constraints**: Review package.json, deployment limits
3. **Consider Scale**: Think about production implications
4. **Propose Alternatives**: Offer multiple implementation approaches
5. **Estimate Complexity**: Be realistic about effort required

### When Refactoring

1. **Preserve Behavior**: Don't change functionality
2. **Maintain Types**: Keep TypeScript strictness
3. **Update Tests**: Ensure tests still pass
4. **Document Changes**: Explain why in commit message
5. **Incremental Steps**: Small, reviewable changes

---

## 📝 Changelog

This CLAUDE.md file will be manually updated when significant architectural changes occur.

**Last Updated**: 2025-11-26

**Version**: 1.0.0

**Changes**:
- Initial creation with comprehensive codebase analysis
- Documented current repository structure
- Added development workflows and conventions
- Included CI/CD pipeline details
- Provided troubleshooting guide

---

**For questions or improvements to this guide, open an issue or PR on GitHub.**
