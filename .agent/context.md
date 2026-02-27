# Agent Context Loader

> **Single Source of Truth**: [`AGENT_RULES.md`](../AGENT_RULES.md) contains all canonical rules.

This file provides a unified entry point for all AI agents (Gemini, Claude, etc.) to understand the
monorepo standards and patterns.

## Quick Links

- **Core Rules**: [AGENT_RULES.md](../AGENT_RULES.md)
- **Architecture**: [ARCHITECTURE.md](../ARCHITECTURE.md)
- **Patterns**: [AGENTS.md](../AGENTS.md) (root redirect); [.agents/agents.md](../.agents/agents.md)
  (Codex)

## Essential Commands

```bash
bun install && bun run build     # Setup
bun test                         # Run tests

# Type checking - ALWAYS set max heap size to prevent OOM (repo default: 24GB)
NODE_OPTIONS="--max-old-space-size=24576" bun run type-check
NODE_OPTIONS="--max-old-space-size=24576" bunx tsc --noEmit
```

**Important**: The monorepo exceeds the default 4GB Node.js heap limit during type-checking. Repo
default is `NODE_OPTIONS="--max-old-space-size=24576"`. Always use it for `tsc`, `type-check`, and
other memory-intensive operations. Without this, they will crash with
`JavaScript heap out of memory`.

## Agent Capabilities & Tips

### 💻 Code Agents (Claude/Gemini/Copilot)

- **Context**: You are in a unified monorepo. Packages are in `libs/` and apps in `apps/`.
- **Imports**: Always use `@dom-mcp/*` scope. Never import relative paths across boundaries.
- **Verification**: Run `bun run type-check` after edits (canonical; uses alfred CLI).

