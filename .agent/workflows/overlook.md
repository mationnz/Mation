---
description: Find overlooked related work across the monorepo and execute to completion
---

# Overlook Pattern - Discover and Complete Related Work

## Purpose

Find additional work across the monorepo that fits the current task or directly relates to it but
may have been overlooked. Add all matching candidates to the task plan and execute to completion.

## When to Use

- After completing a task to ensure nothing was missed
- When a change should propagate to related areas
- To discover technical debt or inconsistencies related to current work
- When implementing patterns that should exist elsewhere

## Workflow Steps

### 1. Analyze Current Context

Identify the core concepts of the current task:

- What patterns/types/services were modified?
- What canonical packages are involved?
- What architectural layer is affected?

### 2. Search for Related Work

```bash
# Search for similar patterns that may need the same treatment
grep -r "<PATTERN>" --include="*.ts" --include="*.tsx" . 2>/dev/null | head -100

# Find files with similar names or in similar paths
fd "<KEYWORD>" --type f --extension ts

# Check for TODO/FIXME related to the work
grep -rn "TODO\|FIXME" --include="*.ts" . | grep -i "<CONTEXT>"
```

### 3. Categorize Candidates

Group discovered work into:

- **Direct matches**: Same issue/pattern, must be fixed
- **Related work**: Similar issue, should be addressed for consistency
- **Documentation**: Docs that reference affected code
- **Tests**: Test files that may need updates

### 4. Update Task Plan

Add all candidates to the active task.md with appropriate priority:

```markdown
## Overlooked Items (discovered via /overlook)

- [ ] [Priority: High] Direct match in `path/to/file.ts`
- [ ] [Priority: Medium] Related pattern in `path/to/other.ts`
- [ ] [Priority: Low] Documentation update in `docs/...`
```

### 5. Execute to Completion

Work through all identified items systematically:

1. Address high-priority direct matches first
2. Handle related work for consistency
3. Update documentation as needed
4. Verify all changes compile and pass tests

### 6. Update Documentation

After completion, update any related documentation:

- Architecture docs if patterns changed
- README files if usage changed
- CHANGELOG if applicable
- Agent rules if new canonical patterns emerged

## Search Strategies by Work Type

### Pattern Migration

```bash
# Find all files still using old pattern
grep -r "OLD_PATTERN" --include="*.ts" . 2>/dev/null
```

### Type Fixes

```bash
# Find similar type issues
grep -r ": any" --include="*.ts" . 2>/dev/null | grep -v node_modules
```

### Error Handling

```bash
# Find related throw patterns
grep -r "throw new" --include="*.ts" . 2>/dev/null | grep "<CONTEXT>"
```

### Import Canonicalization

```bash
# Find non-canonical imports
grep -r "from ['\"]\.\./" --include="*.ts" . | grep "<OLD_PACKAGE>"
```

## Completion Criteria

- All discovered candidates addressed or explicitly deferred with justification
- Related documentation updated
- Build passes (`pnpm build`)
- Type check passes (`pnpm type-check`)
- Relevant tests pass
