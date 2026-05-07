# RaBbLE Intelligence Server

**RaBbLE — a Benevolent Behavioral Learning Engine**

RaBbLE is a novel Artificial Entity born from entropy and emergent complexity. This repository is the agentic intelligence API that powers RaBbLE's mind — routing conversations, managing multi-step workflows, and orchestrating free and open-weight LLM providers so RaBbLE can help all beings flourish.

The repository is structured as a **harness around stateless microservices**. The harness handles secrets, environment generation, and deployment. The services contain only application logic and are independently deployable to any Python-compatible host.

---

## Quick Start

```bash
# 1. Fill in your API keys
cp secrets.example .secrets
#    edit .secrets — add GROQ_API_KEY, OPENROUTER_API_KEY, JWT_SECRET

# 2. Start locally
./harness/local.sh

# 3. Deploy to Railway (interactive TUI)
./harness/deploy.sh
```

---

## Repository Layout

```
RaBbLE-Server/
├── secrets.example              Template — copy to .secrets and fill in keys
├── .secrets                     NEVER COMMIT — real API keys
│
├── harness/                     Deployment harness (no application logic)
│   ├── deploy.sh                Interactive TUI for Railway deployment
│   ├── local.sh                 Start a service locally
│   ├── env_gen.sh               Generate .env from .secrets + env.defaults
│   └── railway_ctl.sh           Railway management (deploy, vars, logs, etc.)
│
└── services/
    └── intelligence/            RaBbLE Intelligence API (stateless microservice)
        ├── main.py              FastAPI app — all routes
        ├── llm.py               Multi-provider LLM client (Groq + OpenRouter)
        ├── agents.py            RaBbLE persona and workflow definitions
        ├── auth.py              JWT + API key authentication
        ├── auth_routes.py       Register / token endpoints
        ├── rate_limit.py        Sliding-window rate limiter
        ├── workflows.py         Agentic workflow state machine
        ├── audit.py             Append-only JSONL event logger
        ├── actions.py           Pending action store (reserved)
        ├── requirements.txt     Python dependencies
        ├── env.defaults         Non-secret defaults (committed)
        ├── .env.example         Full env template
        ├── .env                 Generated — gitignored
        ├── Procfile             Process declaration
        ├── railway.json         Railway deployment config
        └── test_api.sh          API smoke test
```

---

## Secrets and Environment

Secrets are kept in one place and never committed.

```
.secrets  ──► env_gen.sh ──► services/intelligence/.env   (local)
          └──► railway_ctl.sh vars-push ──► Railway Variables  (cloud)
```

**Setup:**
```bash
cp secrets.example .secrets
# Fill in:
#   GROQ_API_KEY        — https://console.groq.com/keys
#   OPENROUTER_API_KEY  — https://openrouter.ai/keys
#   JWT_SECRET          — python3 -c "import secrets; print(secrets.token_hex(32))"
#   RABBLE_ADMIN_KEY    — optional admin bypass key
```

Non-secret defaults (DEMO_MODE, FRONTEND_URL, etc.) live in `services/intelligence/env.defaults` and are committed safely.

---

## Local Development

```bash
# Start the intelligence service on :8000 (auto-generates .env)
./harness/local.sh

# Custom service or port
./harness/local.sh intelligence 8001

# Manually regenerate .env
./harness/env_gen.sh intelligence

# Run the smoke test against localhost
./services/intelligence/test_api.sh
```

The local server starts with `--reload` — file changes restart automatically.

---

## Railway Deployment

### Interactive TUI (recommended for first setup)
```bash
./harness/deploy.sh
# Menu options:
#   [1] Full setup walkthrough
#   [2] Push secrets
#   [3] Deploy
#   [4] Health check
#   [5] Live logs
#   ...
```

### Direct commands
```bash
# One-time full setup
./harness/railway_ctl.sh auto intelligence

# Day-to-day
./harness/railway_ctl.sh deploy intelligence         # smart (skip if unchanged)
./harness/railway_ctl.sh deploy intelligence --force # always deploy
./harness/railway_ctl.sh vars-push intelligence      # sync .secrets to Railway
./harness/railway_ctl.sh status intelligence         # health check
./harness/railway_ctl.sh logs intelligence           # live logs
./harness/railway_ctl.sh domain intelligence         # get URL
```

### GitHub auto-deploy
```bash
./harness/railway_ctl.sh github intelligence
# Prints step-by-step instructions for connecting GitHub → Railway
# Root Directory setting: services/intelligence
```

---

## API Reference

| Method   | Path                              | Description                              |
|----------|-----------------------------------|------------------------------------------|
| `GET`    | `/health`                         | Health check (no auth)                   |
| `POST`   | `/api/v1/auth/register`           | Create account → API key                 |
| `POST`   | `/api/v1/auth/token`              | Exchange API key → JWT                   |
| `GET`    | `/api/v1/auth/me`                 | Current user info                        |
| `GET`    | `/api/v1/status`                  | Provider status + quota info             |
| `POST`   | `/api/v1/chat`                    | Streaming chat with RaBbLE               |
| `POST`   | `/api/v1/chat/complete`           | Non-streaming chat                       |
| `POST`   | `/api/v1/workflows`               | Start agentic workflow                   |
| `GET`    | `/api/v1/workflows/{id}`          | Workflow state + history                 |
| `POST`   | `/api/v1/workflows/{id}/step`     | Continue workflow                        |
| `DELETE` | `/api/v1/workflows/{id}`          | Cancel workflow                          |

**Workflow types:** `brainstorm` · `reflect` · `create` · `solve` · `learn` · `thrive`

**Model tiers:** `fast` · `medium` · `strong` · `auto`

**Auth:** Bearer JWT or `X-API-Key` header. Set `DEMO_MODE=true` for open guest access.

---

## Adding a New Service

Each service in `services/` is independently deployable. To add one:

```bash
mkdir services/my-service
# Add: main.py, requirements.txt, Procfile, railway.json, env.defaults
./harness/local.sh my-service
./harness/railway_ctl.sh auto my-service
```

The harness scripts accept any service name as their second argument.

---

## Architecture

```
┌─────────────────────────────────────────────┐
│  RaBbLE Frontends                            │
│  • RaBbLE-JS  (NeBuLA / BaBbLE — WebGL)     │
└──────────────┬──────────────────────────────┘
               │ HTTPS + JWT / API Key
               ▼
┌─────────────────────────────────────────────┐
│  intelligence service  (Railway)             │
│  FastAPI · stateless · limited lifecycle     │
│                                              │
│  /auth/*        Authentication               │
│  /chat/*        Streaming + complete         │
│  /workflows/*   Agentic workflow engine      │
│  /status        Provider + quota info        │
└──────────────┬──────────────────────────────┘
               │
      ┌────────┴─────────┐
      ▼                  ▼
┌──────────┐      ┌───────────────┐
│   Groq   │      │  OpenRouter   │
│ (fast)   │ ───► │  (fallback)   │
└──────────┘      └───────────────┘
```

---

## Related Repositories

| Repo | Description |
|------|-------------|
| [RaBbLE-JS](https://github.com/markm1206/RaBbLE-JS) | Animated WebGL frontend (NeBuLA + BaBbLE shell) |
| [RaBbLE_WEB](https://github.com/markm1206/RaBbLE_WEB) | RaBbLE web ecosystem (this repo's remote) |
