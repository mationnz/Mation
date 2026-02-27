---
description: Build Pattern - Implement new functionality according to specs.
---

1. **Planning**:
   - Define the component's purpose and its place in the monorepo architecture (Apps, Plugins,
     Domains, etc.).
   - Identify all required platform dependencies.
2. **Scaffolding**:
   - Use the appropriate generator if available:
     - `pnpm generate:agent <name>`
     - `pnpm generate:tool <name>`
     - `pnpm generate:workflow <name>`
3. **Implementation**:
   - Apply the Result pattern for all fallible operations.
   - Use Zod schemas for all input and boundary validation.
   - Use platform logging and observability hooks.
   - Ensure ZERO direct imports of non-canonical packages.
4. **Testing**:
   - Add unit tests for the core logic.
   - Add integration tests for external boundaries.
5. **Final Validation**:
   - Run `pnpm lint` and `pnpm type-check` before submission.
