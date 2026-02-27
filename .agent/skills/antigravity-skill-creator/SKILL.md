---
name: creating-antigravity-skills
description:
  Generates high-quality Antigravity skill directories with SKILL.md, scripts, examples, and
  resources. Use when the user asks to create, build, or generate a new skill, agent capability, or
  automation workflow for the .agent/skills/ folder.
---

# Antigravity Skill Creator

## When to use this skill

- User asks to "create a skill" or "build a skill"
- User wants to add a new agent capability or automation
- User mentions generating `.agent/skills/` content
- User requests a workflow, helper, or automation packaged as a skill

## Core Structural Requirements

Every skill must follow this folder hierarchy:

```
<skill-name>/
├── SKILL.md          # Required: Main logic and instructions
├── scripts/          # Optional: Helper scripts
├── examples/         # Optional: Reference implementations
└── resources/        # Optional: Templates or assets
```

## YAML Frontmatter Standards

The `SKILL.md` must start with YAML frontmatter:

| Field           | Rules                                                                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **name**        | Gerund form (e.g., `testing-code`, `managing-databases`). Max 64 chars. Lowercase, numbers, hyphens only. No "claude" or "anthropic". |
| **description** | Third person. Include specific triggers/keywords. Max 1024 chars.                                                                     |

**Example:**

```yaml
---
name: extracting-pdf-text
description:
  Extracts text from PDF documents. Use when the user mentions document processing, PDF parsing, or
  text extraction from files.
---
```

## Writing Principles

- **Conciseness**: Assume the agent is smart. Focus only on unique skill logic.
- **Progressive Disclosure**: Keep `SKILL.md` under 500 lines. Link to secondary files if needed
  (one level deep).
- **Forward Slashes**: Always use `/` for paths, never `\`.
- **Degrees of Freedom**:
  - **Bullet Points** → High-freedom tasks (heuristics)
  - **Code Blocks** → Medium-freedom (templates)
  - **Specific Bash Commands** → Low-freedom (fragile operations)

## Workflow & Feedback Loops

For complex tasks, include:

1. **Checklists**: Markdown checklist the agent can copy and update to track state
2. **Validation Loops**: "Plan-Validate-Execute" pattern (check config BEFORE applying changes)
3. **Error Handling**: Scripts are "black boxes"—instruct agent to run `--help` if unsure

## Output Template

When creating a skill, generate this structure:

### Folder Structure

```
.agent/skills/<skill-name>/
├── SKILL.md
├── scripts/       # If needed
├── examples/      # If needed
└── resources/     # If needed
```

### SKILL.md Template

```markdown
---
name: <gerund-name>
description: <3rd-person description with triggers>
---

# <Skill Title>

## When to use this skill

- <Trigger 1>
- <Trigger 2>

## Workflow

- [ ] Step 1
- [ ] Step 2
- [ ] Step 3

## Instructions

<Specific logic, code snippets, or rules>

## Resources

- [Script name](scripts/<script>.sh) - Description
- [Example](examples/<example>.md) - Description
```

## Checklist for Skill Creation

Copy and update as you build:

- [ ] Determine skill name (gerund form, lowercase, hyphens)
- [ ] Write description (3rd person, include triggers)
- [ ] Define "When to use" triggers
- [ ] Create workflow/checklist for the skill
- [ ] Write core instructions
- [ ] Add scripts if needed (with `--help` support)
- [ ] Add examples if complex
- [ ] Add resources/templates if applicable
- [ ] Validate folder structure matches spec
