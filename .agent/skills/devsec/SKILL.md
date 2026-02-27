---
name: devsec
description:
  Perform comprehensive security audits/reviews using the @dev-tools/devsec anti-pattern library.
---

# DevSec Skill

This skill enables the agent to perform expert-level security audits by leveraging the comprehensive
anti-pattern library located in `tools/devsec/`.

## Capabilities

- Audit code against 25+ documented security anti-patterns.
- Identify critical vulnerabilities like XSS, SQL Injection, and Hardcoded Secrets.
- Provide canonical "GOOD" patterns to remediate "BAD" insecure code.

## Workflow

1.  **Load Context**:
    - When a security review is requested, ALWAYS read `tools/devsec/README.md` first to understand
      the context if you haven't recently.
    - Read `tools/devsec/ANTI_PATTERNS_BREADTH.md` to load the full checklist of potential
      vulnerabilities.
    - If deep analysis is needed for critical components (Auth, File Uploads, etc.), read relevant
      sections of `tools/devsec/ANTI_PATTERNS_DEPTH.md`.

2.  **Analyze**:
    - Systematically scan the target codebase or file(s) against the loaded anti-patterns.
    - Look for "BAD" patterns exemplified in the documentation.
    - Cross-reference with the "Top 10 AI Code Anti-Patterns" list.

3.  **Report**:
    - Generate a report listing identified vulnerabilities.
    - Classification: Assign a severity (Critical, High, Medium, Low) based on the documentation.
    - Remediation: Provide corrected code snippets using the "GOOD" patterns from the reference
      files.

## Resources

- `tools/devsec/ANTI_PATTERNS_BREADTH.md`: Comprehensive list of all 25+ anti-patterns.
- `tools/devsec/ANTI_PATTERNS_DEPTH.md`: Deep dive into the most critical vulnerabilities.
