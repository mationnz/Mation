---
description: Comprehensive environment diagnostics and health verification
---

# Doctor Workflow

Comprehensive diagnostics to verify environment health and identify issues.
The doctor doesn't fix issues — it diagnoses them and points to solutions.

## When to Use

- After installation to verify success
- When something seems broken
- Before starting major development work
- Regular health checks

## Execution Steps

// turbo-all

### 1. Run Doctor Command

```bash
just doctor
```

Or directly:

```bash
bun run alfred doctor
```

### 2. Parse Diagnostic Output

The doctor command checks:

#### Prerequisites
- [ ] Node.js version (22+)
- [ ] Bun version (1.3+)
- [ ] Git installed
- [ ] Docker installed (optional)

#### Dependencies
- [ ] node_modules exists
- [ ] No missing dependencies
- [ ] No peer dependency issues

#### Environment
- [ ] .env file exists
- [ ] Required variables set
- [ ] No invalid variable formats

#### Build State
- [ ] All packages built
- [ ] No stale dist folders
- [ ] Type declarations generated

#### Database (if configured)
- [ ] Connection successful
- [ ] Migrations up to date
- [ ] No pending migrations

### 3. Interpret Results

| Status | Meaning | Action |
|--------|---------|--------|
| ✅ PASS | Check passed | None needed |
| ⚠️ WARN | Non-blocking issue | Review recommended |
| ❌ FAIL | Blocking issue | Must fix before proceeding |
| ⏭️ SKIP | Check skipped | Optional component not configured |

### 4. Generate Health Report

```markdown
# Environment Health Report

**Overall Status**: 🟢 Healthy / 🟡 Warnings / 🔴 Issues

## Check Results

| Category | Status | Details |
|----------|--------|---------|
| Prerequisites | ✅ | Node 25.3.0, Bun 1.3.6 |
| Dependencies | ✅ | 195 packages installed |
| Environment | ⚠️ | 2 optional vars missing |
| Build | ✅ | All packages built |
| Database | ⏭️ | Not configured |

## Warnings
- PROCORE_CLIENT_ID not set (Procore integration disabled)
- OPENAI_API_KEY not set (AI features disabled)

## Recommendations
1. Set optional env vars for full functionality
2. Run `just maintain` for periodic health

## Quick Fixes
{common issues from common-issues.yaml that match warnings}
```

### 5. Suggest Fixes

For each issue found, check `.agent/hooks/common-issues.yaml`:

```bash
# Example: If Node version wrong
cat .agent/hooks/common-issues.yaml | grep -A 10 "node-version-mismatch"
```

Provide actionable fix commands.

## Extended Diagnostics

For deeper investigation:

### Dependency Analysis
```bash
bun pm ls --depth=0  # Top-level deps
bun outdated         # Check for updates
```

### Build Verification
```bash
turbo run build --dry-run  # Check what would build
bun run type-check         # Verify types
```

### Network Diagnostics
```bash
curl -s https://api.github.com | head -1  # GitHub connectivity
curl -s https://registry.npmjs.org | head -1  # npm registry
```

### Disk Usage
```bash
du -sh node_modules  # Dependencies size
du -sh .turbo        # Cache size
```

## Health Score

Calculate overall health score (0-100):

| Component | Weight | Scoring |
|-----------|--------|---------|
| Prerequisites | 30% | All pass = 30, any fail = 0 |
| Dependencies | 25% | Installed = 25, issues = 10 |
| Environment | 20% | Complete = 20, partial = 10 |
| Build | 25% | Clean = 25, needs rebuild = 10 |

**Score Interpretation**:
- 90-100: 🟢 Excellent
- 70-89: 🟡 Good (minor issues)
- 50-69: 🟠 Fair (should address issues)
- 0-49: 🔴 Poor (likely broken)

## Exit Criteria

- [ ] All checks executed
- [ ] Health report generated
- [ ] Issues mapped to fixes
- [ ] Overall status determined

## Related Workflows

- `/install` - Fix installation issues
- `/maintain` - Periodic health maintenance
- `/prime` - Reload context after fixes
