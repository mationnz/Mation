#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════
# ALFRED MONOREPO - SELF-HEALING AUTOMATION
# ═══════════════════════════════════════════════════════════════════
#
# Automated fix application based on common-issues.yaml
# Usage: bash .agent/hooks/self-heal.sh [issue-id]
#
# If no issue-id provided, runs diagnostics and auto-fixes what it can.
#
# ═══════════════════════════════════════════════════════════════════

set -uo pipefail  # Don't exit on error - we want to try all fixes

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$ROOT_DIR"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "═══════════════════════════════════════════════════════════════"
echo "ALFRED MONOREPO - SELF-HEALING"
echo "═══════════════════════════════════════════════════════════════"
echo "Timestamp: $(date -Iseconds)"
echo ""

# Track results
FIXES_ATTEMPTED=0
FIXES_SUCCEEDED=0
FIXES_FAILED=0

# Function to attempt a fix with retry
attempt_fix() {
    local issue_id="$1"
    local description="$2"
    local fix_command="$3"
    local verify_command="$4"
    local max_retries=2
    local retry=0

    echo -e "${BLUE}▶ Attempting fix: ${description}${NC}"
    FIXES_ATTEMPTED=$((FIXES_ATTEMPTED + 1))

    while [ $retry -lt $max_retries ]; do
        echo "  Attempt $((retry + 1))/$max_retries..."
        
        # Run the fix
        if eval "$fix_command" 2>&1 | head -20; then
            # Verify the fix
            if eval "$verify_command" > /dev/null 2>&1; then
                echo -e "  ${GREEN}✅ Fix verified: ${description}${NC}"
                FIXES_SUCCEEDED=$((FIXES_SUCCEEDED + 1))
                return 0
            else
                echo -e "  ${YELLOW}⚠️ Fix applied but verification failed${NC}"
            fi
        else
            echo -e "  ${RED}❌ Fix command failed${NC}"
        fi

        retry=$((retry + 1))
        if [ $retry -lt $max_retries ]; then
            echo "  Retrying in 2 seconds..."
            sleep 2
        fi
    done

    echo -e "  ${RED}❌ Fix failed after $max_retries attempts${NC}"
    FIXES_FAILED=$((FIXES_FAILED + 1))
    return 1
}

# ───────────────────────────────────────────────────────────────────
# DIAGNOSTIC CHECKS
# ───────────────────────────────────────────────────────────────────

echo "▶ Running diagnostics..."
echo ""

# Check: Node version
echo "  Checking Node.js version..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 22 ]; then
        echo -e "  ${YELLOW}⚠️ Node.js version too old: $(node -v)${NC}"
        if command -v nvm &> /dev/null; then
            attempt_fix "node-version" "Upgrade Node.js to 22" \
                "nvm install 22 && nvm use 22" \
                "node -v | grep -E 'v2[2-9]|v[3-9][0-9]'"
        else
            echo -e "  ${YELLOW}  nvm not available, cannot auto-fix${NC}"
        fi
    else
        echo -e "  ${GREEN}✅ Node.js: $(node -v)${NC}"
    fi
else
    echo -e "  ${RED}❌ Node.js not installed - cannot auto-fix${NC}"
fi

# Check: Bun
echo "  Checking Bun..."
if ! command -v bun &> /dev/null; then
    echo -e "  ${YELLOW}⚠️ Bun not installed${NC}"
    attempt_fix "bun-install" "Install Bun" \
        "curl -fsSL https://bun.sh/install | bash" \
        "command -v bun"
else
    echo -e "  ${GREEN}✅ Bun: $(bun -v)${NC}"
fi

# Check: node_modules
echo "  Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo -e "  ${YELLOW}⚠️ node_modules missing${NC}"
    attempt_fix "deps-install" "Install dependencies" \
        "bun install" \
        "test -d node_modules"
else
    echo -e "  ${GREEN}✅ node_modules exists${NC}"
fi

# Check: .env file
echo "  Checking environment..."
if [ ! -f ".env" ]; then
    echo -e "  ${YELLOW}⚠️ .env file missing${NC}"
    if [ -f ".env.example" ]; then
        attempt_fix "env-create" "Create .env from example" \
            "cp .env.example .env" \
            "test -f .env"
    else
        echo -e "  ${YELLOW}  No .env.example available${NC}"
    fi
else
    echo -e "  ${GREEN}✅ .env exists${NC}"
fi

# Check: Build state
echo "  Checking build state..."
# Check if a few key packages have dist folders
KEY_PACKAGES=(
    "libs/contracts"
    "libs/platform-utilities"
    "libs/platform-config"
)
BUILD_NEEDED=false
for pkg in "${KEY_PACKAGES[@]}"; do
    if [ -d "$pkg" ] && [ ! -d "$pkg/dist" ]; then
        BUILD_NEEDED=true
        break
    fi
done

if [ "$BUILD_NEEDED" = true ]; then
    echo -e "  ${YELLOW}⚠️ Some packages need building${NC}"
    attempt_fix "build" "Build packages" \
        "bun run build" \
        "test -d libs/contracts/dist"
else
    echo -e "  ${GREEN}✅ Build state OK${NC}"
fi

# Check: Type errors
echo "  Checking types..."
if ! bun run type-check > /dev/null 2>&1; then
    echo -e "  ${YELLOW}⚠️ Type check failing${NC}"
    # Try rebuild first
    attempt_fix "type-rebuild" "Rebuild and type-check" \
        "bun run build && bun run type-check" \
        "bun run type-check"
else
    echo -e "  ${GREEN}✅ Types valid${NC}"
fi

# Check: Docker/PostgreSQL (optional)
echo "  Checking Docker..."
if command -v docker &> /dev/null; then
    if docker ps > /dev/null 2>&1; then
        echo -e "  ${GREEN}✅ Docker running${NC}"
        
        # Check if postgres is expected but not running
        if grep -q "DATABASE_URL" .env 2>/dev/null; then
            if ! docker ps | grep -q "postgres"; then
                echo -e "  ${YELLOW}⚠️ PostgreSQL container not running${NC}"
                if [ -f "docker-compose.local.yml" ]; then
                    attempt_fix "postgres-start" "Start PostgreSQL" \
                        "docker compose -f docker-compose.local.yml up -d postgres" \
                        "docker ps | grep postgres"
                fi
            else
                echo -e "  ${GREEN}✅ PostgreSQL running${NC}"
            fi
        fi
    else
        echo -e "  ${YELLOW}⚠️ Docker not running${NC}"
    fi
else
    echo -e "  ${BLUE}ℹ️ Docker not installed (optional)${NC}"
fi

# Check: Playwright (optional)
echo "  Checking Playwright..."
if [ -f "package.json" ] && grep -q "playwright" package.json 2>/dev/null; then
    if ! bunx playwright --version > /dev/null 2>&1; then
        echo -e "  ${YELLOW}⚠️ Playwright browsers not installed${NC}"
        attempt_fix "playwright-install" "Install Playwright" \
            "bunx playwright install chromium" \
            "bunx playwright --version"
    else
        echo -e "  ${GREEN}✅ Playwright installed${NC}"
    fi
fi

# ───────────────────────────────────────────────────────────────────
# SUMMARY
# ───────────────────────────────────────────────────────────────────

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "SELF-HEALING SUMMARY"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Fixes attempted: $FIXES_ATTEMPTED"
echo -e "Fixes succeeded: ${GREEN}$FIXES_SUCCEEDED${NC}"
echo -e "Fixes failed:    ${RED}$FIXES_FAILED${NC}"
echo ""

if [ $FIXES_FAILED -eq 0 ] && [ $FIXES_ATTEMPTED -gt 0 ]; then
    echo -e "${GREEN}✅ All fixes applied successfully!${NC}"
    echo ""
    echo "Run 'just doctor' to verify environment health."
elif [ $FIXES_FAILED -gt 0 ]; then
    echo -e "${YELLOW}⚠️ Some fixes failed. Manual intervention may be required.${NC}"
    echo ""
    echo "Check .agent/hooks/common-issues.yaml for manual fix instructions."
    echo "Or escalate to #dev-help on Slack."
else
    echo -e "${GREEN}✅ No fixes needed - environment looks healthy!${NC}"
fi

echo ""
echo "Exit Code: $FIXES_FAILED"
exit $FIXES_FAILED
