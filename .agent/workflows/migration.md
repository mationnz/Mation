---
description: Migration Pattern - Move legacy code to canonical platform patterns.
---

1. **Pre-flight Check**:
   - Verify the canonical package replacement exists (check `CLAUDE.md`).
   - Run `pnpm test` for the target package to ensure a stable baseline.
2. **Analysis**:
   - Identify all instances of the anti-pattern (e.g., `axios`, `process.env`).
   - Map each instance to the corresponding canonical function in the platform package.
3. **Refactor**:
   - Execute the migration using `replace_file_content` or `multi_replace_file_content`.
   - Update `package.json` dependencies if necessary.
   - Fix imports to use the canonical package entry points.
4. **Verification**:
   - Run `pnpm type-check` for the affected packages.
   - Run `pnpm test` to ensure functional parity.
5. **Registration**:
   - If the component is a service or agent, update the appropriate registry in `libs/agents/`.
