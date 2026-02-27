---
description: Interactive installation with human-in-the-loop configuration choices
---

# Install Interactive Workflow

Guided installation for humans with configuration choices. Use this when you need to make
decisions about database setup, secrets, or optional components.

## When to Use

- First-time human onboarding
- Environments with multiple database options
- When secrets need manual configuration
- Custom component selection

## Prerequisites

- Node.js 22+ installed
- Bun 1.3+ installed
- Git clone complete

## Execution Steps

### 1. Run Prime

Execute the `/prime` workflow first to load context.

### 2. Gather Configuration Choices

Ask the user the following questions (batch 4 at a time):

**Batch 1: Core Setup**

1. **Database Mode**: How should I handle the database?
   - `fresh` - Create new database containers (Docker required)
   - `existing` - Use existing database (provide connection string)
   - `skip` - Skip database setup (some features won't work)

2. **Installation Mode**: What level of installation?
   - `full` - All packages, all features
   - `minimal` - Core packages only (faster)
   - `dashboard-only` - Just the main dashboard app

3. **Environment Check**: Should I verify environment variables?
   - `yes` - Check and prompt for missing required vars
   - `no` - Skip env validation

4. **Documentation Fetch**: Should I fetch external documentation?
   - `yes` - Pull API docs for integrations (requires network)
   - `no` - Skip (use cached/offline docs)

### 3. Execute Based on Choices

#### Database Setup

```bash
# If fresh:
docker compose -f docker-compose.local.yml up -d postgres redis
sleep 5
just db-migrate
just db-seed

# If existing:
# Prompt user: "Please enter your DATABASE_URL:"
# Update .env with provided value
# Run: just db-migrate

# If skip:
echo "⚠️ Database skipped - some features will be unavailable"
```

#### Installation Mode

```bash
# If full:
bun install --frozen-lockfile || bun install
bun run build

# If minimal:
bun install --frozen-lockfile || bun install
turbo run build --filter=@dom-mcp/platform-* --filter=@dom-mcp/contracts

# If dashboard-only:
bun install --frozen-lockfile || bun install
turbo run build --filter=alfred-web-dashboard-static...
```

### 4. Handle Secrets (Human Confirmation)

For any secrets that cannot be auto-configured:

```markdown
## 🔐 Secrets Configuration Required

The following secrets need manual configuration in `.env`:

| Variable | Description | Where to get it |
|----------|-------------|-----------------|
| `AZURE_CLIENT_ID` | Azure AD app ID | Azure Portal → App Registrations |
| `OPENAI_API_KEY` | OpenAI API key | platform.openai.com |
| `PROCORE_CLIENT_ID` | Procore app ID | developers.procore.com |

**Steps:**
1. Open `.env` in your editor
2. Fill in the values above
3. Save the file
4. Reply "done" when complete
```

Wait for human confirmation before proceeding.

### 5. Verification

After all configuration complete:

```bash
# Run doctor to verify
just doctor

# Quick smoke test
bun test --run --reporter=dot | tail -10
```

### 6. Generate Report

Create personalized onboarding report:

```markdown
# Welcome to Alfred! 🎉

## Your Setup
- Database: {mode} ({status})
- Installation: {mode}
- Packages: {count} installed

## Quick Start
```bash
just dev    # Start development
```

## Your Next Steps
1. {context-specific next step}
2. Review AGENT_RULES.md for coding standards
3. Check specs/ for feature documentation

## Getting Help
- #dev-help on Slack
- docs/troubleshooting/
- `just doctor` for diagnostics
```

## Question Batching

Due to interface constraints, questions are batched:

- **Batch 1**: Core setup (DB, install mode, env check, docs)
- **Batch 2**: If secrets needed - confirmation checkpoint
- **Batch 3**: Optional components (if full install)

## Fallback to One-Shot

If user prefers automated setup:

```
User: "Just use defaults"
Agent: Running one-shot install with defaults...
→ Execute /install workflow instead
```

## Exit Criteria

- [ ] All configuration choices made
- [ ] Secrets configured (if applicable)
- [ ] Verification passed
- [ ] Welcome report generated
- [ ] User confirms "ready to develop"

## Notes

- Keep questions minimal and high-impact
- Provide sensible defaults for each choice
- Allow "skip" for optional steps
- Log all choices for future reference
