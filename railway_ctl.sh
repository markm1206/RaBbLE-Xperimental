#!/usr/bin/bash
# railway_ctl.sh — PhysioAI backend deployment control script
#
# Usage:
#   ./railway_ctl.sh <command> [options]
#
# Commands:
#   auto         Full setup walkthrough — skips steps already done
#   setup        Install Railway CLI and log in
#   init         Create a new Railway project linked to this backend
#   link         Link to an existing Railway project
#   deploy       Deploy only if backend files changed since last deploy [--force]
#   vars         Set env vars interactively (pre-fills from backend/.env)
#   vars-show    Print current Railway environment variables
#   status       Check /api/v1/health on the deployed service
#   logs         Tail live service logs
#   open         Open the Railway dashboard in a browser
#   domain       Print the public Railway domain for this service
#   install-hook Install a git post-commit hook that auto-deploys on backend changes
#   github       Instructions for connecting GitHub (repo-based CD)
#
# Deployment modes
# ─────────────────
#   Direct upload  railway up from inside RaBbLE/server/
#                  Uploads only that directory. No GitHub required.
#                  Change detection skips deploys when nothing in backend/ changed.
#                  Pass --force to deploy regardless.
#
#   GitHub-based   Link your repo in Railway dashboard.
#                  Set Service → Source → Root Directory = RaBbLE/server
#                  Railway auto-deploys on every push to the configured branch.
#                  Run `./railway_ctl.sh github` for step-by-step instructions.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/server"
HEALTH_PATH="/api/v1/health"
DEPLOY_STAMP="$SCRIPT_DIR/.railway_last_deploy"   # tracks git SHA of last deploy
GIT_ROOT="$(git -C "$SCRIPT_DIR" rev-parse --show-toplevel 2>/dev/null || true)"
BACKEND_RELPATH="RaBbLE/server"                 # path relative to git root

# ── Helpers ───────────────────────────────────────────────────────────────────

info()  { echo "  $*"; }
ok()    { echo "✓ $*"; }
err()   { echo "✗ $*" >&2; }
header(){ echo; echo "── $* ──"; }

require_railway() {
  if ! command -v railway &>/dev/null; then
    err "Railway CLI not found. Run: ./railway_ctl.sh setup"
    exit 1
  fi
}

_service_is_linked() {
  # Returns 0 if a service is linked (railway variables succeeds or returns data).
  local output
  output="$(railway variables 2>&1 || true)"
  ! echo "$output" | grep -qi "no service linked\|link a service\|no services found"
}

_ensure_service() {
  # railway variables/set/up all require a service selected within the project.
  # Cases:
  #   1. Service already selected  → no-op
  #   2. Services exist, none selected → interactive picker
  #   3. No services exist yet     → first deploy creates one; caller must handle
  if _service_is_linked; then
    return 0
  fi

  # Try the interactive picker (works when services exist but none is selected).
  local picker_output
  picker_output="$(railway service 2>&1)" || true
  if echo "$picker_output" | grep -qi "no services found"; then
    # No services exist yet in this project. railway up will create one.
    err "No services exist in this Railway project yet."
    info "Run a first deploy to create the service:"
    info "  cd RaBbLE/server && railway up"
    info "Then re-run this command."
    return 1
  fi

  # Picker ran successfully — re-check linkage.
  if ! _service_is_linked; then
    err "Still no service linked after picker. Try: railway service"
    return 1
  fi
}

require_link() {
  require_railway
  if ! (cd "$BACKEND_DIR" && railway status) &>/dev/null 2>&1; then
    err "No Railway project linked. Run: ./railway_ctl.sh init  OR  ./railway_ctl.sh link"
    exit 1
  fi
}

get_domain() {
  (cd "$BACKEND_DIR" && railway domain 2>/dev/null) | grep -Eo 'https?://[^ ]+' | head -1 || true
}

# ── Commands ──────────────────────────────────────────────────────────────────

cmd_setup() {
  header "Railway CLI setup"

  if command -v railway &>/dev/null; then
    ok "Railway CLI already installed: $(railway --version)"
  else
    info "Installing Railway CLI via npm..."
    if command -v npm &>/dev/null; then
      npm install -g @railway/cli
      ok "Installed: $(railway --version)"
    else
      info "npm not found. Trying curl installer..."
      curl -fsSL https://railway.app/install.sh | sh
      ok "Installed: $(railway --version)"
    fi
  fi

  header "Log in to Railway"
  railway login
  ok "Logged in"
}

cmd_init() {
  require_railway
  header "Initialize Railway project"
  info "This creates a NEW Railway project linked to $BACKEND_DIR"
  info "If you already have a project, run: ./railway_ctl.sh link"
  echo
  cd "$BACKEND_DIR"
  railway init
  info "Select the service to link (Railway project → service):"
  railway service
  ok "Project and service linked"
  info "Next: set environment variables with ./railway_ctl.sh vars"
}

cmd_link() {
  require_railway
  header "Link to existing Railway project"
  cd "$BACKEND_DIR"
  railway link
  info "Select the service to link (Railway project → service):"
  railway service
  ok "Project and service linked"
}

_backend_changed_since_stamp() {
  # Returns 0 (true) if any backend file is newer than the stamp, or no stamp exists.
  [[ ! -f "$DEPLOY_STAMP" ]] && return 0

  local last_sha
  last_sha="$(cat "$DEPLOY_STAMP" 2>/dev/null || true)"

  if [[ -z "$last_sha" || -z "$GIT_ROOT" ]]; then
    # No git info — fall back to file-mtime comparison.
    find "$BACKEND_DIR" -newer "$DEPLOY_STAMP" \
      ! -path '*/__pycache__/*' ! -name '*.pyc' -print -quit | grep -q .
    return $?
  fi

  # Compare HEAD against the last-deployed SHA for changes under RaBbLE/server/.
  if ! git -C "$GIT_ROOT" cat-file -e "${last_sha}^{commit}" 2>/dev/null; then
    info "Last-deploy SHA $last_sha no longer valid — treating as changed."
    return 0
  fi

  git -C "$GIT_ROOT" diff --quiet "$last_sha" HEAD -- "$BACKEND_RELPATH"
  # diff --quiet exits 0 if no diff, 1 if diff.  We want "changed" = exit 0 from this fn.
  local rc=$?
  [[ $rc -ne 0 ]]   # invert: return 0 (true) when there IS a diff
}

_record_deploy() {
  if [[ -n "$GIT_ROOT" ]]; then
    git -C "$GIT_ROOT" rev-parse HEAD > "$DEPLOY_STAMP" 2>/dev/null || true
  else
    touch "$DEPLOY_STAMP"
  fi
}

_show_backend_diff() {
  local last_sha
  last_sha="$(cat "$DEPLOY_STAMP" 2>/dev/null || true)"
  if [[ -n "$GIT_ROOT" && -n "$last_sha" ]]; then
    echo
    info "Changes since last deploy ($last_sha):"
    git -C "$GIT_ROOT" diff --stat "$last_sha" HEAD -- "$BACKEND_RELPATH" 2>/dev/null || true
    echo
  fi
}

cmd_deploy() {
  require_link
  local force=0
  [[ "${2:-}" == "--force" || "${1:-}" == "--force" ]] && force=1

  header "Deploy to Railway (direct upload — monorepo mode)"

  if [[ $force -eq 0 ]]; then
    if ! _backend_changed_since_stamp; then
      ok "No changes detected in $BACKEND_RELPATH since last deploy. Skipping."
      info "Use --force to deploy anyway: ./railway_ctl.sh deploy --force"
      return 0
    fi
    _show_backend_diff
  else
    info "--force: deploying regardless of changes."
  fi

  info "Uploading $BACKEND_DIR ..."
  cd "$BACKEND_DIR"
  _ensure_service
  railway up --detach
  _record_deploy
  ok "Deploy triggered"
  echo
  info "Waiting 15 s for service to start..."
  sleep 15
  cmd_status
}

cmd_install_hook() {
  if [[ -z "$GIT_ROOT" ]]; then
    err "Not inside a git repo. Cannot install hook."
    exit 1
  fi

  local hook_file="$GIT_ROOT/.git/hooks/post-commit"
  local hook_marker="# physioai-railway-deploy"

  if grep -q "$hook_marker" "$hook_file" 2>/dev/null; then
    ok "Git hook already installed at $hook_file"
    return 0
  fi

  header "Install git post-commit hook"

  cat >> "$hook_file" <<HOOK

$hook_marker
# Auto-deploy RaBbLE backend to Railway when backend files change.
if git diff --quiet HEAD~1 HEAD -- "$BACKEND_RELPATH" 2>/dev/null; then
  : # no backend changes — skip
else
  echo "[railway_ctl] Backend changed — deploying to Railway..."
  "$SCRIPT_DIR/railway_ctl.sh" deploy
fi
HOOK

  chmod +x "$hook_file"
  ok "Hook installed: $hook_file"
  info "Every commit that touches $BACKEND_RELPATH will trigger a Railway deploy."
  info "Remove the hook section from $hook_file to disable."
}

_load_dotenv() {
  # Parse backend/.env and export values into the current shell.
  # Skips blank lines, comments, and lines without =.
  local env_file="$BACKEND_DIR/.env"
  if [[ ! -f "$env_file" ]]; then return; fi
  while IFS= read -r line || [[ -n "$line" ]]; do
    [[ "$line" =~ ^[[:space:]]*# ]] && continue
    [[ "$line" =~ ^[[:space:]]*$ ]] && continue
    [[ "$line" != *"="* ]] && continue
    local key="${line%%=*}"
    local val="${line#*=}"
    # Strip surrounding quotes if present
    val="${val#\"}" ; val="${val%\"}"
    val="${val#\'}" ; val="${val%\'}"
    export "$key"="$val"
  done < "$env_file"
}

cmd_vars() {
  require_link
  header "Set Railway environment variables"

  local env_file="$BACKEND_DIR/.env"
  if [[ -f "$env_file" ]]; then
    info "Pre-filling from $env_file (existing Railway values take precedence)."
    _load_dotenv
  fi
  info "Press Enter to keep the shown value."
  echo

  cd "$BACKEND_DIR"
  _ensure_service

  _prompt_var() {
    local key="$1" hint="$2" default_cmd="${3:-}"
    local railway_current dotenv_val suggested val

    railway_current="$(railway variables get "$key" 2>/dev/null || true)"
    dotenv_val="${!key:-}"   # value exported by _load_dotenv, if any

    if [[ -n "$railway_current" ]]; then
      # Already set in Railway — show that it exists, allow override.
      info "$key  hint: $hint"
      read -rp "  Value [already set in Railway, Enter to keep]: " val
    elif [[ -n "$dotenv_val" ]]; then
      # Not in Railway yet but present in .env — offer as default.
      info "$key  hint: $hint"
      read -rp "  Value [$dotenv_val]: " val
      val="${val:-$dotenv_val}"
    elif [[ -n "$default_cmd" ]]; then
      # Generate a suggested value (e.g. random JWT secret).
      suggested="$(eval "$default_cmd")"
      info "$key  hint: $hint"
      read -rp "  Value [$suggested]: " val
      val="${val:-$suggested}"
    else
      info "$key  hint: $hint"
      read -rp "  Value: " val
    fi

    if [[ -n "$val" ]]; then
      railway variables set "${key}=${val}"
      ok "Set $key"
    else
      info "Skipped $key"
    fi
    echo
  }

  _prompt_var "JWT_SECRET"           "32-byte hex secret" \
    "python3 -c \"import secrets; print(secrets.token_hex(32))\""
  _prompt_var "OPENROUTER_API_KEY"   "from openrouter.ai/keys"
  _prompt_var "GROQ_API_KEY"         "from console.groq.com/keys (optional fallback LLM)"
  _prompt_var "JANE_API_KEY"         "'mock' for dev, or your real Jane key"
  _prompt_var "JANE_BASE_URL"        "default: https://api.jane.app/api/v2"
  _prompt_var "FRONTEND_URL"         "exact origin of your HostGator frontend, e.g. https://yoursite.com"
  _prompt_var "AUDIT_LOG_PATH"       "default: audit.jsonl"

  echo
  ok "Done. Review with: ./railway_ctl.sh vars-show"
}

cmd_vars_show() {
  require_link
  header "Current Railway variables"
  cd "$BACKEND_DIR"
  railway variables
}

cmd_status() {
  require_link
  header "Health check"
  local domain
  domain="$(get_domain)"

  if [[ -z "$domain" ]]; then
    err "Could not determine Railway domain. Run: ./railway_ctl.sh domain"
    exit 1
  fi

  local url="${domain}${HEALTH_PATH}"
  info "GET $url"
  local response http_code
  response="$(curl -sf --max-time 10 -w '\n%{http_code}' "$url" || true)"
  http_code="$(echo "$response" | tail -1)"
  local body
  body="$(echo "$response" | head -1)"

  if [[ "$http_code" == "200" ]]; then
    ok "Health check passed: $body"
  else
    err "Health check failed (HTTP $http_code): $body"
    exit 1
  fi
}

cmd_logs() {
  require_link
  header "Live logs (Ctrl+C to stop)"
  cd "$BACKEND_DIR"
  railway logs --tail
}

cmd_open() {
  require_link
  cd "$BACKEND_DIR"
  railway open
}

cmd_domain() {
  require_link
  cd "$BACKEND_DIR"
  local domain
  domain="$(get_domain)"
  if [[ -n "$domain" ]]; then
    ok "Public URL: $domain"
    info "Health endpoint: ${domain}${HEALTH_PATH}"
    info "Frontend wiring: ${domain} (set CONFIG.API_URL or use ?api= query param)"
  else
    err "No domain assigned yet. Deploy first or assign a domain in the Railway dashboard."
    exit 1
  fi
}

cmd_github() {
  header "GitHub-based continuous deployment (repo-based mode)"
  cat <<'EOF'

  This mode auto-deploys your backend whenever you push to a branch.
  Because your repo contains multiple projects, you MUST set the Root
  Directory so Railway only watches the backend subdirectory.

  Steps:
  ──────
  1. Push your repo to GitHub (if not already):
       git remote add origin git@github.com:youruser/PhysioThrive.git
       git push -u origin main

  2. In the Railway dashboard → your project → your service:
       Settings → Source → Connect Repo
       Choose: your GitHub repo

  3. Still in Service Settings → Source:
       Root Directory = PhysioAI/backend
       Branch        = main  (or PhysioAI-dev for staging)

  4. Railway will now watch PhysioAI/backend/** and trigger a
     redeploy on every push — other directories are ignored.

  5. Environment variables: set them in
       Railway dashboard → Service → Variables
     OR keep using: ./railway_ctl.sh vars

  Direct upload (railway up) still works alongside GitHub mode —
  useful for hotfixes when you don't want to push a commit.

EOF
}

cmd_auto() {
  header "PhysioAI Railway — full setup"
  info "Each step is skipped automatically if already done."
  echo

  # ── Step 1: CLI installed? ────────────────────────────────────────────────
  header "Step 1/5: Railway CLI"
  if command -v railway &>/dev/null; then
    ok "CLI already installed: $(railway --version)"
  else
    info "Installing Railway CLI..."
    if command -v npm &>/dev/null; then
      npm install -g @railway/cli
    else
      curl -fsSL https://railway.app/install.sh | sh
    fi
    ok "Installed: $(railway --version)"
  fi

  # ── Step 2: Logged in? ────────────────────────────────────────────────────
  header "Step 2/5: Login"
  if railway whoami &>/dev/null 2>&1; then
    ok "Already logged in as $(railway whoami)"
  else
    info "Opening browser for Railway login..."
    railway login
    ok "Logged in"
  fi

  # ── Step 3: Project linked? ──────────────────────────────────────────────
  header "Step 3/6: Project link"
  if (cd "$BACKEND_DIR" && railway status) &>/dev/null 2>&1; then
    ok "Project already linked"
  else
    info "No project linked. Choose an option:"
    echo "  1) Link to an existing Railway project"
    echo "  2) Create a new Railway project"
    read -rp "  Choice [1]: " choice
    choice="${choice:-1}"
    cd "$BACKEND_DIR"
    if [[ "$choice" == "2" ]]; then
      railway init
    else
      railway link
    fi
    ok "Project linked"
  fi

  # ── Step 4: First deploy — creates the service ────────────────────────────
  # Railway only creates a service when railway up is first run.
  # We deploy before setting vars so the service exists; vars will trigger a redeploy.
  header "Step 4/6: Initial deploy (creates Railway service)"
  cd "$BACKEND_DIR"
  if _service_is_linked; then
    ok "Service already exists — skipping initial deploy"
  else
    info "No service in this project yet — deploying to create one..."
    info "(The app may start without env vars; step 5 will set them and redeploy.)"
    railway up --detach
    info "Waiting 20 s for service to register..."
    sleep 20
    # Link the newly created service
    railway service 2>/dev/null || true
    ok "Service created"
  fi

  # ── Step 5: Environment variables ─────────────────────────────────────────
  header "Step 5/6: Environment variables"
  cmd_vars

  # ── Step 6: Final deploy with env vars ────────────────────────────────────
  header "Step 6/6: Deploy with environment variables"
  cmd_deploy --force

  echo
  ok "Setup complete."
  cmd_domain
}

# ── Entry point ───────────────────────────────────────────────────────────────

COMMAND="${1:-help}"

case "$COMMAND" in
  auto)         cmd_auto ;;
  setup)        cmd_setup ;;
  init)         cmd_init ;;
  link)         cmd_link ;;
  deploy)       cmd_deploy "$@" ;;
  vars)         cmd_vars ;;
  vars-show)    cmd_vars_show ;;
  status)       cmd_status ;;
  logs)         cmd_logs ;;
  open)         cmd_open ;;
  domain)       cmd_domain ;;
  install-hook) cmd_install_hook ;;
  github)       cmd_github ;;
  help|--help|-h|"")
    sed -n '/^# Usage/,/^[^#]/p' "$0" | grep '^#' | sed 's/^# \?//'
    ;;
  *)
    err "Unknown command: $COMMAND"
    echo "Run: $0 help"
    exit 1
    ;;
esac
