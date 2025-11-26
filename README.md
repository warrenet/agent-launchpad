# 🚀 Agent Launchpad

[![Deploy](https://github.com/warrenet/agent-launchpad/actions/workflows/deploy.yml/badge.svg)](https://github.com/warrenet/agent-launchpad/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-violet.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

**One-click deployment for AI agents with auto-documentation and mobile-first testing UI.**

Push code → Everything else is automatic.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔄 **95%+ Automation** | Push code, everything else happens automatically |
| 📱 **Mobile-First UI** | Test your agents from your phone (PWA installable) |
| 📝 **Auto-Documentation** | AI generates README, AGENTS.md, and changelogs |
| 🚀 **Zero-Config Deploy** | Automatic Vercel deployment on every push |
| 🔀 **Multi-API Support** | Works with Claude, GPT-4, and Gemini |
| 📊 **Health Monitoring** | Real-time status and latency tracking |
| 🔔 **Deploy Notifications** | Slack and Discord webhook support |

---

## 🏁 Quick Start

### Option 1: Use as Template (Recommended)

1. Click **"Use this template"** on GitHub
2. Add your API keys to repository secrets:
   - `GOOGLE_API_KEY` (recommended - get at aistudio.google.com)
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
3. Push any code — deployment is automatic!

### Option 2: Clone and Configure

```bash
# Clone the repository
git clone https://github.com/warrenet/agent-launchpad.git my-agent
cd my-agent

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Add your Gemini API key to .env.local
# GOOGLE_API_KEY=your-key-here

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to test your agent.

---

## 📁 Project Structure

```
agent-launchpad/
├── .github/
│   └── workflows/
│       └── deploy.yml      # 🔄 Main automation pipeline
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts    # 🤖 Multi-API chat endpoint
│   ├── globals.css         # 🎨 Tailwind styles
│   ├── layout.tsx          # 📱 PWA-enabled layout
│   └── page.tsx            # 💬 Mobile-first test UI
├── public/
│   └── manifest.json       # 📲 PWA manifest
├── scripts/
│   └── generate-docs.js    # 📝 AI documentation generator
├── .env.example            # 🔐 Environment template
├── package.json
├── vercel.json             # ⚡ Vercel configuration
└── README.md
```

---

## 🔧 Configuration

### Required Secrets (GitHub Repository Settings → Secrets)

| Secret | Description | Required |
|--------|-------------|----------|
| `GOOGLE_API_KEY` | Google Gemini API key | **Recommended** |
| `ANTHROPIC_API_KEY` | Claude API key | Alternative |
| `OPENAI_API_KEY` | OpenAI API key | Alternative |
| `VERCEL_TOKEN` | Vercel deploy token | For auto-deploy |
| `VERCEL_ORG_ID` | Vercel organization ID | For auto-deploy |
| `VERCEL_PROJECT_ID` | Vercel project ID | For auto-deploy |

### Optional Secrets

| Secret | Description |
|--------|-------------|
| `SLACK_WEBHOOK` | Slack notifications |
| `DISCORD_WEBHOOK` | Discord notifications |

### Getting Vercel Credentials

1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens) → Create token
2. Install Vercel CLI: `npm i -g vercel`
3. Run `vercel link` in your project
4. Find IDs in `.vercel/project.json`

---

## 📱 Mobile PWA Installation

The test UI is a Progressive Web App (PWA) that can be installed on your phone:

### Android
1. Open the deployed URL in Chrome
2. Tap the menu (⋮) → "Add to Home screen"
3. The app icon appears on your home screen

### iOS
1. Open the deployed URL in Safari
2. Tap the share button → "Add to Home Screen"
3. The app icon appears on your home screen

---

## 🔄 Pipeline Stages

When you push to `main`, this happens automatically:

```
┌─────────────────────────────────────────────────────────────┐
│  1. VALIDATE                                                │
│     ├── Lint code                                           │
│     ├── Type check                                          │
│     └── Validate API keys exist                             │
├─────────────────────────────────────────────────────────────┤
│  2. TEST                                                    │
│     ├── Run unit tests                                      │
│     └── Generate coverage report                            │
├─────────────────────────────────────────────────────────────┤
│  3. DOCUMENT (AI-powered)                                   │
│     ├── Generate README.md                                  │
│     ├── Generate AGENTS.md (Jules-compatible)               │
│     └── Update CHANGELOG.md                                 │
├─────────────────────────────────────────────────────────────┤
│  4. DEPLOY                                                  │
│     ├── Build project                                       │
│     ├── Deploy to Vercel                                    │
│     └── Create GitHub release                               │
├─────────────────────────────────────────────────────────────┤
│  5. NOTIFY                                                  │
│     └── Send Slack/Discord notifications                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🤖 Using with AI Coding Assistants

### Jules (Google)

The auto-generated `AGENTS.md` file helps Jules understand your project:

1. Connect Jules to your repository
2. Jules reads `AGENTS.md` for context
3. Ask Jules to fix bugs, add features, or write tests

### GitHub Copilot

The structured codebase and documentation help Copilot provide better suggestions.

### Claude Code

Use Claude Code with this template:
```bash
claude-code "Add a new endpoint for /api/summarize"
```

---

## 🛠️ Customization

### Adding Your Agent Logic

Edit `app/api/chat/route.ts` to customize the chat endpoint:

```typescript
// Add custom preprocessing
const processedMessages = messages.map(m => ({
  ...m,
  content: customPreprocess(m.content),
}));

// Add custom tools/functions
const tools = [
  { name: 'search', description: 'Search the web' },
  { name: 'calculate', description: 'Perform calculations' },
];
```

### Custom System Prompts

Configure in the UI or set defaults in the API:

```typescript
const DEFAULT_SYSTEM_PROMPT = `You are a specialized assistant for...`;
```

### Adding New Models

Add new models to the dropdown in `app/page.tsx`:

```tsx
<option value="your-model-id">Your Model Name</option>
```

---

## 📊 Health Monitoring

The test UI includes built-in health monitoring:

- **Status indicator**: Green (healthy), Yellow (degraded), Red (down)
- **Latency tracking**: Response time in milliseconds
- **Auto-refresh**: Checks every 30 seconds

Access the health endpoint directly:
```bash
curl https://your-app.vercel.app/api/chat
# Returns: { "status": "healthy", "apis": { "anthropic": true, ... } }
```

---

## 🚀 Deployment Options

### Vercel (Default)

Automatic deployment is configured out of the box.

### Other Platforms

The app is a standard Next.js project and can be deployed to:
- **Netlify**: `netlify deploy --prod`
- **Railway**: Connect GitHub repo
- **Render**: Connect GitHub repo
- **Self-hosted**: `npm run build && npm start`

---

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |
| `npm run generate-docs` | Generate AI documentation |
| `npm run deploy` | Deploy to Vercel |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🚀 Predeploy Validation

Before pushing to Vercel, run:

```bash
bash ./predeploy-check.sh
```

This ensures lockfile presence and Node compatibility.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Deployed on [Vercel](https://vercel.com/)
- AI powered by [Anthropic Claude](https://www.anthropic.com/), [OpenAI](https://openai.com/), and [Google Gemini](https://deepmind.google/technologies/gemini/)

---

<p align="center">
  <strong>Made with ❤️ for the AI agent builder community</strong>
</p>

<p align="center">
  <a href="https://github.com/warrenet/agent-launchpad/issues">Report Bug</a>
  ·
  <a href="https://github.com/warrenet/agent-launchpad/issues">Request Feature</a>
</p>
