---
description: Prime agent context with essential monorepo knowledge before major operations
---

# Prime Workflow

Load essential context before executing major tasks. This is the "warm-up" step that prevents
cold-start mistakes and ensures agents understand the monorepo before acting.

## When to Use

- Before `/install` workflow
- Before major feature implementations
- When switching between unrelated areas of the codebase
- At the start of a new agent session
- Before any workflow that modifies significant code

## Execution Steps

// turbo-all

### 1. Load Canonical Rules

Read the single source of truth:

```bash
view_file /Users/cameronrussell/code/alfred/AGENT_RULES.md
```

Key sections to internalize:

- **Critical Rules** (Never Violate) - The 16 cardinal rules
- **Canonical Packages** (MUST USE) - Required platform packages
- **Dependency Topology** - Apps → Plugins → Domains → Foundations → Contracts
- **Validation Checklist** - Pre-completion requirements

### 2. Understand Architecture

```bash
view_file /Users/cameronrussell/code/alfred/ARCHITECTURE.md
```

Understand:

- Package layout (`apps/`, `libs/`, `tools/`)
- Technology stack (Bun 1.3.9, Node 22.11.0, TypeScript ~5.7.2)
- Build system (Turbo for caching/parallelism)

### 3. Check Current State

```bash
view_file_outline /Users/cameronrussell/code/alfred/package.json
```

Verify:

- Package manager: `bun@1.3.9` (NOT pnpm/npm)
- Node version: `22.11.0`
- Key scripts available

### 4. Load Agent Context

```bash
view_file /Users/cameronrussell/code/alfred/.agent/context.md
```

Quick links to:

- Specifications
- Living Document OS
- Agentic OS Vision

### 5. Load Relevant Specs (if applicable)

For feature work, check:

```bash
view_file /Users/cameronrussell/code/alfred/specs/CANONICAL-SOURCE-OF-TRUTH.md
```

For domain-specific work, browse:

- `specs/alfred/features/` - Feature specifications
- `specs/agentic-os/` - Agentic OS implementation
- `specs/generative-document-os/` - Living Document OS

### 6. Confirm Prime Complete

After loading context, confirm understanding by outputting:

```markdown
## Prime Complete ✅

**Monorepo**: alfred-monorepo v1.0.1
**Stack**: TypeScript | Bun 1.3.9 | Node 22.11.0 | Turbo
**Key Constraints**:

- Use canonical packages only (`@dom-mcp/*`)
- Result pattern for all fallible operations
- Zod validation at boundaries
- No `console.log`, use `@dom-mcp/platform-logging`
- No `process.env`, use `@dom-mcp/platform-config`

**Ready for**: [describe next task]
```

## Output

A brief summary confirming:

- Monorepo identity verified
- Key technologies confirmed
- Relevant constraints identified
- Agent is ready to proceed

## Integration

This workflow is automatically called by:

- `/install` workflow (Step 1)
- `/build` workflow (as needed)
- `/migration` workflow (before changes)

## Notes

- Keep context loading minimal but sufficient
- For large codebases, chunk reading with `view_file_outline` first
- If context window is constrained, prioritize AGENT_RULES.md
