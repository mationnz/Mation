---
description: Scout Pattern - Find and report information without modification.
---

1. **Discovery**: Use the `glob` tool to find relevant files based on the task description.
2. **Search**: Use `grep_search` to find specific patterns or keywords within the discovered files.
3. **Chunked Reading**: Use `view_file` to read the identified files.
   - CRITICAL: Do not read more than 1000 lines at a time.
   - For initial exploration, use `view_file_outline` to understand the file structure.
4. **Analysis**: Synthesize the information found. Identify:
   - File paths and line numbers.
   - Violations of monorepo standards (e.g., `console.log`, `throw new Error`).
   - Implicit vs explicit dependencies.
5. **Reporting**: Provide a structured report to the user or the next agent in the pipeline.
