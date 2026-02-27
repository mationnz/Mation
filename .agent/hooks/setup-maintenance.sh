#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════
# ALFRED MONOREPO - MAINTENANCE HOOK
# ═══════════════════════════════════════════════════════════════════
#
# Periodic maintenance tasks for the monorepo.
# Run regularly to keep the codebase healthy.
#
# Usage: bash .agent/hooks/setup-maintenance.sh
# Or via: just maintain
#
# ═══════════════════════════════════════════════════════════════════

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$ROOT_DIR"

# Timing
START_TIME=$(date +%s)

echo "═══════════════════════════════════════════════════════════════"
echo "ALFRED MONOREPO - MAINTENANCE HOOK"
echo "═══════════════════════════════════════════════════════════════"
echo "Timestamp: $(date -Iseconds)"
echo "Working Directory: $ROOT_DIR"
echo "═══════════════════════════════════════════════════════════════"

# ───────────────────────────────────────────────────────────────────
# STEP 1: Dependency Check
# ───────────────────────────────────────────────────────────────────
echo ""
echo "▶ STEP 1: Checking dependencies..."

echo "  Checking for outdated packages..."
if bun outdated 2>&1 | head -20; then
    echo "  ✅ Dependency check complete"
else
    echo "  ⚠️ WARN: Could not check outdated packages"
fi

# ───────────────────────────────────────────────────────────────────
# STEP 2: Security Audit
# ───────────────────────────────────────────────────────────────────
echo ""
echo "▶ STEP 2: Security audit..."

if bun audit 2>&1 | head -30; then
    echo "  ✅ Security audit complete"
else
    echo "  ⚠️ WARN: Security audit had issues (review output above)"
fi

# ───────────────────────────────────────────────────────────────────
# STEP 3: Type Check
# ───────────────────────────────────────────────────────────────────
echo ""
echo "▶ STEP 3: Type check..."

if bun run type-check 2>&1; then
    echo "  ✅ Type check passed"
else
    echo "  ❌ ERROR: Type check failed"
    echo "  Run 'bun run type-check' for details"
fi

# ───────────────────────────────────────────────────────────────────
# STEP 4: Lint Check
# ───────────────────────────────────────────────────────────────────
echo ""
echo "▶ STEP 4: Lint check..."

if bun run lint:fast 2>&1; then
    echo "  ✅ Lint check passed"
else
    echo "  ⚠️ WARN: Lint issues found"
    echo "  Run 'bun run lint:fix' to auto-fix"
fi

# ───────────────────────────────────────────────────────────────────
# STEP 5: Test Health
# ───────────────────────────────────────────────────────────────────
echo ""
echo "▶ STEP 5: Test health..."

echo "  Running quick test suite..."
if timeout 120 bun test --run --reporter=dot 2>&1 | tail -10; then
    echo "  ✅ Tests complete"
else
    echo "  ⚠️ WARN: Some tests may have failed or timed out"
fi

# ───────────────────────────────────────────────────────────────────
# STEP 6: Clean Artifacts
# ───────────────────────────────────────────────────────────────────
echo ""
echo "▶ STEP 6: Cleaning artifacts..."

# Clean old log files (keep last 10)
if [ -d ".agent/logs/install" ]; then
    LOG_COUNT=$(ls -1 .agent/logs/install/*.log 2>/dev/null | wc -l || echo "0")
    if [ "$LOG_COUNT" -gt 10 ]; then
        echo "  Cleaning old install logs..."
        ls -t .agent/logs/install/*.log | tail -n +11 | xargs rm -f
        echo "  ✅ Cleaned old install logs"
    fi
fi

if [ -d ".agent/logs/maintenance" ]; then
    LOG_COUNT=$(ls -1 .agent/logs/maintenance/*.log 2>/dev/null | wc -l || echo "0")
    if [ "$LOG_COUNT" -gt 10 ]; then
        echo "  Cleaning old maintenance logs..."
        ls -t .agent/logs/maintenance/*.log | tail -n +11 | xargs rm -f
        echo "  ✅ Cleaned old maintenance logs"
    fi
fi

# Clean Turbo cache if very large (> 1GB)
if [ -d ".turbo" ]; then
    TURBO_SIZE=$(du -sm .turbo 2>/dev/null | cut -f1 || echo "0")
    if [ "$TURBO_SIZE" -gt 1000 ]; then
        echo "  ⚠️ WARN: Turbo cache is ${TURBO_SIZE}MB, consider cleaning"
        echo "  Run: rm -rf .turbo"
    fi
fi

echo "  ✅ Artifact cleanup complete"

# ───────────────────────────────────────────────────────────────────
# SUMMARY
# ───────────────────────────────────────────────────────────────────
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "✅ MAINTENANCE COMPLETE"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Duration: ${DURATION} seconds"
echo ""
echo "Recommended Actions:"
echo "  - Review any ⚠️ warnings above"
echo "  - Update outdated dependencies if needed: bun update"
echo "  - Fix lint issues: bun run lint:fix"
echo ""
echo "Exit Code: 0"
