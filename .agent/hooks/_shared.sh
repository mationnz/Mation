#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════
# ALFRED MONOREPO - SHARED BASH UTILITIES
# ═══════════════════════════════════════════════════════════════════
#
# Common functions for all hook scripts. Source this file:
#   source "$SCRIPT_DIR/_shared.sh"
#
# ═══════════════════════════════════════════════════════════════════

# Colors
export RED='\033[0;31m'
export GREEN='\033[0;32m'
export YELLOW='\033[0;33m'
export BLUE='\033[0;34m'
export NC='\033[0m'

# Logging
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }
log_warning() { echo -e "${YELLOW}⚠️ $1${NC}"; }
log_info() { echo -e "${BLUE}ℹ️ $1${NC}"; }
log_step() { echo ""; echo "▶ STEP $1: $2"; }

# Check Node.js version (usage: check_node_version 22)
check_node_version() {
    local min="${1:-22}"
    if ! command -v node &> /dev/null; then
        log_error "Node.js not found"; return 1
    fi
    local major=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$major" -lt "$min" ]; then
        log_error "Node.js $min+ required. Found: $(node -v)"; return 1
    fi
    log_success "Node.js: $(node -v)"; return 0
}

# Check Bun
check_bun() {
    if ! command -v bun &> /dev/null; then
        log_error "Bun not found"; return 1
    fi
    log_success "Bun: $(bun -v)"; return 0
}

# Check Git
check_git() {
    command -v git &> /dev/null && log_success "Git: $(git --version | cut -d' ' -f3)" || log_warning "Git not found"
}

# Check Docker
check_docker() {
    if command -v docker &> /dev/null; then
        docker ps > /dev/null 2>&1 && log_success "Docker running" || log_warning "Docker not running"
    else
        log_info "Docker not installed"
    fi
}

# Check node_modules
check_node_modules() {
    [ -d "node_modules" ] && log_success "node_modules exists" || { log_warning "node_modules missing"; return 1; }
}

# Check .env
check_env_file() {
    [ -f ".env" ] && log_success ".env exists" || { log_warning ".env missing"; return 1; }
}

# Check build state
check_build_state() {
    for pkg in libs/contracts libs/platform-utilities libs/platform-config; do
        [ -d "$pkg" ] && [ ! -d "$pkg/dist" ] && { log_warning "$pkg needs building"; return 1; }
    done
    log_success "Build state OK"; return 0
}

# JSON output for agents
emit_json_status() {
    echo "{\"step\":\"$1\",\"status\":\"$2\",\"message\":\"$3\",\"duration\":${4:-0}}"
}

# Timing
elapsed_seconds() {
    echo $(( $(date +%s) - $1 ))
}
