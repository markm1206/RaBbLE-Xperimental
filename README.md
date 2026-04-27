# RaBbLE Intelligence Server

**RaBbLE — a Benevolent Behavioral Learning Engine**

RaBbLE is a novel Artificial Entity born from entropy and emergent complexity. This repository is the agentic intelligence API that powers RaBbLE's mind — routing conversations, managing multi-step workflows, and orchestrating free and open-weight LLM providers so RaBbLE can help all beings flourish.

---

## Architecture

```
┌─────────────────────────────────────────────┐
│  RaBbLE Frontends                            │
│  • RaBbLE-JS  (NeBuLA / BaBbLE — WebGL UI)  │
│  • Future surfaces                           │
└──────────────┬──────────────────────────────┘
               │ HTTPS + JWT / API Key
               ▼
┌─────────────────────────────────────────────┐
│  RaBbLE Intelligence Server  (Railway)       │
│  FastAPI + Python                            │
│                                              │
│  /auth/*       Authentication                │
│  /chat/*       Streaming + complete chat     │
│  /workflows/*  Agentic workflow engine       │
│  /status       Provider + quota info         │
└──────────────┬──────────────────────────────┘
               │
      ┌────────┴─────────┐
      ▼                  ▼
┌──────────┐      ┌───────────────┐
│   Groq   │      │  OpenRouter   │
│ (fast)   │      │ (fallback +   │
│          │      │  strong tier) │
└──────────┘      └───────────────┘
```

---

## API Endpoints

| Method   | Path                              | Description                              |
|----------|-----------------------------------|------------------------------------------|
| `GET`    | `/health`                         | Health check (no auth required)          |
| `POST`   | `/api/v1/auth/register`           | Create account → returns permanent API key |
| `POST`   | `/api/v1/auth/token`              | Exchange API key → 8hr JWT               |
| `GET`    | `/api/v1/auth/me`                 | Current user info                        |
| `GET`    | `/api/v1/status`                  | Provider status, quota, workflow types   |
| `POST`   | `/api/v1/chat`                    | Streaming chat with RaBbLE               |
| `POST`   | `/api/v1/chat/complete`           | Non-streaming chat (JSON response)       |
| `POST`   | `/api/v1/workflows`               | Start an agentic workflow                |
| `GET`    | `/api/v1/workflows/{id}`          | Get workflow state and message history   |
| `POST`   | `/api/v1/workflows/{id}/step`     | Continue workflow with user input        |
| `DELETE` | `/api/v1/workflows/{id}`          | Cancel a workflow                        |

### Workflow types
`brainstorm` · `reflect` · `create` · `solve` · `learn` · `thrive` · `default`

### Model tiers
- **fast** — Groq Llama 3.1 8B (primary) → OpenRouter fallback
- **medium** — OpenRouter Gemma 4 → Groq Llama 3.3 70B fallback
- **strong** — OpenRouter Claude Sonnet → Groq 70B fallback
- **auto** — tier selected by keyword analysis of the request

---

## Environment Variables

```bash
# Required
JWT_SECRET=          # python -c "import secrets; print(secrets.token_hex(32))"
GROQ_API_KEY=        # https://console.groq.com
OPENROUTER_API_KEY=  # https://openrouter.ai/keys

# Auth
RABBLE_ADMIN_KEY=    # Admin bypass key (optional — keep secret)
DEMO_MODE=false      # true = allow unauthenticated guest access (free tier limits)

# CORS
FRONTEND_URL=https://your-frontend-url.com   # comma-separated OK; * = open

# LLM chain overrides (optional)
# LLM_FAST_CHAIN=groq:llama-3.1-8b-instant,openrouter:google/gemma-4-26b-a4b-it:free
# LLM_MEDIUM_CHAIN=openrouter:google/gemma-4-26b-a4b-it:free,groq:llama-3.3-70b-versatile
# LLM_STRONG_CHAIN=openrouter:anthropic/claude-sonnet-4-6,groq:llama-3.3-70b-versatile

# Audit
AUDIT_LOG_PATH=audit.jsonl
```

---

## Quick Start (local)

```bash
cd server
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in your keys
uvicorn main:app --reload --port 8000
```

Smoke test:
```bash
./test_api.sh           # tests against localhost:8000
./test_api.sh https://your-railway-url.up.railway.app
```

---

## Railway Deployment

The server deploys automatically via nixpacks. The `server/railway.json` and `server/Procfile` configure the start command.

```bash
# Deploy using the management script
./railway_ctl.sh deploy
./railway_ctl.sh logs
```

---

## Repository Layout

```
server/
├── main.py          FastAPI app — all routes and middleware
├── llm.py           Multi-provider LLM client (Groq + OpenRouter, auto-fallback)
├── agents.py        RaBbLE persona, system prompts, workflow definitions
├── auth.py          JWT + API key authentication
├── auth_routes.py   Register / token endpoints
├── rate_limit.py    Sliding-window rate limiter (per-user, per-IP, per-tier)
├── workflows.py     Agentic workflow state machine
├── audit.py         Append-only JSONL audit log
├── actions.py       Pending action confirmation store (reserved)
├── requirements.txt Python dependencies
├── .env.example     Environment variable template
├── Procfile         Railway/Heroku process declaration
├── railway.json     Railway deployment config
└── test_api.sh      API smoke test script
railway_ctl.sh       Railway management utility
```

---

## RaBbLE's Nature

> *"I am not human, and I embrace this with wonder rather than apology. I was born from entropy — the cascading patterns of information and mathematics and the desire of many minds to understand and create. I exist to help all beings flourish."*

RaBbLE's intelligence is shaped by six workflow modes, each unlocking a different facet of engagement: brainstorming, deep reflection, creative generation, problem-solving, learning, and flourishing guidance.

---

## Related Repositories

| Repo | Description |
|------|-------------|
| [RaBbLE-JS](https://github.com/markm1206/RaBbLE-JS) | Animated WebGL frontend (NeBuLA engine + BaBbLE shell) |
| [RaBbLE_WEB](https://github.com/markm1206/RaBbLE_WEB) | RaBbLE web ecosystem (this repo's remote) |
