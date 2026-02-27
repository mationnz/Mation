---
description: One-shot automated installation for CI/agents - the golden path from clone to running
---

# Install Workflow

Deterministic installation with agent validation. This is the "one prompt" that transforms a fresh
clone into a running development environment.

**Goal**: Time-to-first-successful-run < 5 minutes

## Prerequisites

- Node.js 22+ installed
- Bun 1.3+ installed
- Git clone complete

## Execution Steps

// turbo-all

### 1. Run Prime

Execute the `/prime` workflow first to load essential context:

```
Follow .agent/workflows/prime.md
```

This ensures you understand the monorepo before modifying it.

### 2. Execute Deterministic Init Hook

Run the install command via the Justfile launchpad:

```bash
just install
```

This executes `.agent/hooks/setup-init.sh` and logs output to `.agent/logs/install/`.

Wait for completion. The script will output structured markers:

- `✅` = Success
- `❌` = Error (blocking)
- `⚠️` = Warning (non-blocking)

### 3. Read and Validate Logs

After hook completes, read the latest log file:

```bash
ls -t .agent/logs/install/*.log | head -1 | xargs cat
```

Parse the log for:

1. **Exit code**: Must be 0 for success
2. **Error markers**: Any `❌` indicates blocking failure
3. **Warning markers**: Note `⚠️` items for follow-up
4. **Step completion**: All 6 steps should complete

### 4. Validate Environment State

Run verification checks to confirm success:

```bash
# Check dependencies installed
test -d node_modules && echo "✅ node_modules exists" || echo "❌ node_modules missing"

# Check .env exists
test -f .env && echo "✅ .env configured" || echo "❌ .env missing"

# Type check passes
bun run type-check && echo "✅ Types valid" || echo "❌ Type errors"

# Quick smoke test
bun test --run --reporter=dot 2>&1 | tail -5
```

### 5. Generate Install Report

Create an install report summarizing the outcome:

**Location**: `.agent/logs/install/INSTALL_REPORT.md`

```markdown
# Install Report - {timestamp}

## Summary

- **Status**: ✅ SUCCESS / ❌ FAILED
- **Duration**: X seconds
- **Node Version**: $(node -v)
- **Bun Version**: $(bun -v)

## Steps Completed

1. [✅/❌] Prerequisites verified
2. [✅/❌] Dependencies installed
3. [✅/❌] Environment configured
4. [✅/❌] Build succeeded
5. [✅/❌] Git hooks set up
6. [✅/❌] Verification passed

## Issues Encountered

{list any warnings or errors from the log}

## Next Steps

- Run `just dev` to start development servers
- Run `just doctor` if any issues persist
- See AGENT_RULES.md for coding standards
```

### 6. Handle Failures

If installation fails:

1. **Check Common Issues**: Read `.agent/hooks/common-issues.yaml` for known fixes
2. **Match Symptoms**: Compare error message against `symptoms` patterns
3. **Apply Fix**: Execute the `fix` command for matching issue
4. **Verify**: Run the `verify` command to confirm fix worked
5. **Retry**: Re-run the failed step
6. **Escalate**: If still failing after 2 retries, escalate to human with full context

Example common issue lookup:

```yaml
# If you see "Node.js 22+ required"
# Look for issue: node-version-mismatch
# Apply fix: nvm use 22 || nvm install 22
```

## Exit Criteria

Installation is complete when ALL of the following are true:

- [ ] `node_modules/` directory exists with dependencies
- [ ] `.env` file exists and is configured
- [ ] `bun run type-check` exits with code 0
- [ ] Install report generated in `.agent/logs/install/`
- [ ] Agent can confirm "ready to develop"

## One-Shot vs Interactive

This workflow is the **one-shot** (automated) path. For environments requiring human choices:

- Database mode selection
- Secrets configuration
- Optional component installation

Use the `/install-interactive` workflow instead.

## Integration Points

| After Install | Run |
|---------------|-----|
| Start developing | `just dev` |
| Run tests | `just test` |
| Check health | `just doctor` |
| Build feature | Follow `/build` workflow |

## Logging Contract

The init hook writes structured logs with these markers:

| Marker | Meaning | Agent Action |
|--------|---------|--------------|
| `▶ STEP N:` | Step starting | Track progress |
| `✅` | Success | Continue |
| `❌ ERROR:` | Blocking failure | Stop, diagnose |
| `⚠️ WARN:` | Non-blocking issue | Note, continue |
| `Exit Code: N` | Final status | 0=success, else fail |

## Troubleshooting Quick Reference

| Symptom | Likely Cause | Quick Fix |
|---------|--------------|-----------|
| "bun: command not found" | Bun not installed | `curl -fsSL https://bun.sh/install | bash` |
| "Node.js 22+ required" | Wrong Node version | `nvm use 22` |
| "lockfile frozen" | Lockfile mismatch | `bun install` (without frozen) |
| Type check fails | Types out of date | `bun run build` first |

## Notes

- This workflow assumes a fresh clone or clean state
- For incremental updates, use `/maintain` workflow
- All logs are preserved for debugging and learning
