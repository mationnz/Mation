---
description: Maintenance tasks for keeping the monorepo healthy
---

# Maintain Workflow

Periodic maintenance to keep the Alfred monorepo healthy, secure, and performant.

## When to Use

- Weekly: Routine health checks
- After major dependency updates
- Before releases
- When agents detect code quality drift

## Execution Steps

// turbo-all

### 1. Run Maintenance Hook

Execute the maintenance command via Justfile:

```bash
just maintain
```

This runs `.agent/hooks/setup-maintenance.sh` and logs to `.agent/logs/maintenance/`.

### 2. Read Maintenance Log

Review the output:

```bash
ls -t .agent/logs/maintenance/*.log | head -1 | xargs cat
```

Check for:
- ✅ All steps passed
- ⚠️ Warnings needing attention
- ❌ Errors requiring action

### 3. Review Dependency Status

If outdated packages were found:

```bash
# See full outdated list
bun outdated

# Update all dependencies
bun update

# Or update specific package
bun update <package-name>
```

### 4. Address Security Issues

If security audit found vulnerabilities:

```bash
# Run detailed security audit
bun run security:audit

# Fix automatically where possible
bun audit --fix
```

### 5. Fix Lint Issues

If lint warnings were found:

```bash
# Auto-fix what's possible
bun run lint:fix

# Review remaining issues
bun run lint 2>&1 | head -50
```

### 6. Generate Maintenance Report

Create a summary report:

```markdown
# Maintenance Report - {date}

## Health Status
- [ ] Dependencies up to date
- [ ] No security vulnerabilities
- [ ] Type check passes
- [ ] Lint check passes
- [ ] Tests pass

## Actions Taken
- Updated X packages
- Fixed Y lint issues
- Resolved Z vulnerabilities

## Follow-up Required
- {list any items needing manual attention}
```

## Maintenance Schedule

| Task | Frequency | Automation Level |
|------|-----------|------------------|
| Dependency check | Weekly | Fully automated |
| Security audit | Weekly | Fully automated |
| Type/lint check | On commit | Fully automated |
| Log cleanup | Weekly | Fully automated |
| Turbo cache review | Monthly | Semi-automated |
| Major version updates | Quarterly | Human review required |

## Exit Criteria

Maintenance is complete when:
- [ ] All automated checks pass
- [ ] No blocking security issues
- [ ] Maintenance log generated
- [ ] Follow-up items documented

## Integration

This workflow supports the Agentic OS goal of:
- **Phase 3 (Learning)**: Maintenance traces captured for pattern extraction
- **Phase 4 (Autonomy)**: Self-healing for common maintenance issues

## Notes

- Run `/prime` before maintenance if starting a new session
- For major updates, create a branch first
- Check AGENT_RULES.md for update policies
