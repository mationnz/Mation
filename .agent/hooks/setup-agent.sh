#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════
# ALFRED MONOREPO - AGENT-OPTIMIZED INSTALLATION
# ═══════════════════════════════════════════════════════════════════
#
# Fast installation optimized for agent sandboxes with:
# - Parallel execution where possible
# - Minimal output (JSON for parsing)
# - Fast-fail on critical errors
# - Cached dependency resolution
#
# Usage: bash .agent/hooks/setup-agent.sh
#
# Output: JSON-formatted status for agent parsing
#
# ═══════════════════════════════════════════════════════════════════

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$ROOT_DIR"

# Timing
START_TIME=$(date +%s)

# JSON output helper
emit_status() {
    local step="$1"
    local status="$2"
    local message="$3"
    local duration="${4:-0}"
    echo "{\"step\":\"$step\",\"status\":\"$status\",\"message\":\"$message\",\"duration\":$duration}"
}

emit_final() {
    local status="$1"
    local message="$2"
    local end_time=$(date +%s)
    local total_duration=$((end_time - START_TIME))
    echo "{\"final\":true,\"status\":\"$status\",\"message\":\"$message\",\"totalDuration\":$total_duration}"
}

# ───────────────────────────────────────────────────────────────────
# STEP 1: Prerequisites (fast check)
# ───────────────────────────────────────────────────────────────────
prereq_start=$(date +%s)

# Check Node.js
if ! command -v node &> /dev/null; then
    emit_status "prerequisites" "error" "Node.js not found"
    emit_final "failure" "Missing Node.js"
    exit 1
fi

NODE_MAJOR=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_MAJOR" -lt 22 ]; then
    emit_status "prerequisites" "error" "Node.js 22+ required, found $(node -v)"
    emit_final "failure" "Node.js version mismatch"
    exit 1
fi

# Check Bun
if ! command -v bun &> /dev/null; then
    emit_status "prerequisites" "error" "Bun not found"
    emit_final "failure" "Missing Bun"
    exit 1
fi

prereq_end=$(date +%s)
prereq_duration=$((prereq_end - prereq_start))
emit_status "prerequisites" "success" "Node $(node -v), Bun $(bun -v)" "$prereq_duration"

# ───────────────────────────────────────────────────────────────────
# STEP 2: Dependencies (optimized)
# ───────────────────────────────────────────────────────────────────
deps_start=$(date +%s)

# Use frozen lockfile first (faster, deterministic)
if bun install --frozen-lockfile > /dev/null 2>&1; then
    deps_end=$(date +%s)
    deps_duration=$((deps_end - deps_start))
    emit_status "dependencies" "success" "Installed from lockfile" "$deps_duration"
else
    # Fallback to regular install
    if bun install > /dev/null 2>&1; then
        deps_end=$(date +%s)
        deps_duration=$((deps_end - deps_start))
        emit_status "dependencies" "warning" "Lockfile updated" "$deps_duration"
    else
        emit_status "dependencies" "error" "Install failed"
        emit_final "failure" "Dependency installation failed"
        exit 1
    fi
fi

# ───────────────────────────────────────────────────────────────────
# STEP 3: Environment (create if missing)
# ───────────────────────────────────────────────────────────────────
env_start=$(date +%s)

if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        cp .env.example .env
        env_end=$(date +%s)
        env_duration=$((env_end - env_start))
        emit_status "environment" "success" "Created from example" "$env_duration"
    else
        # Create minimal .env
        cat > .env << 'EOF'
NODE_ENV=development
LOG_LEVEL=debug
EOF
        env_end=$(date +%s)
        env_duration=$((env_end - env_start))
        emit_status "environment" "warning" "Created minimal .env" "$env_duration"
    fi
else
    env_end=$(date +%s)
    env_duration=$((env_end - env_start))
    emit_status "environment" "success" "Already configured" "$env_duration"
fi

# ───────────────────────────────────────────────────────────────────
# STEP 4: Build (parallel, cached)
# ───────────────────────────────────────────────────────────────────
build_start=$(date +%s)

# Use Turbo with high concurrency for agent environments
if turbo run build --concurrency=10 --cache-dir=.turbo > /dev/null 2>&1; then
    build_end=$(date +%s)
    build_duration=$((build_end - build_start))
    emit_status "build" "success" "Build complete" "$build_duration"
else
    emit_status "build" "error" "Build failed"
    emit_final "failure" "Build failed"
    exit 1
fi

# ───────────────────────────────────────────────────────────────────
# STEP 5: Verification (fast check)
# ───────────────────────────────────────────────────────────────────
verify_start=$(date +%s)

# Quick type check (critical)
if bun run type-check > /dev/null 2>&1; then
    verify_end=$(date +%s)
    verify_duration=$((verify_end - verify_start))
    emit_status "verification" "success" "Types valid" "$verify_duration"
else
    emit_status "verification" "warning" "Type check had issues"
fi

# ───────────────────────────────────────────────────────────────────
# FINAL STATUS
# ───────────────────────────────────────────────────────────────────
emit_final "success" "Installation complete"
exit 0
