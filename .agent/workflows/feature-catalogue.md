---
description: Maintain the Feature Governance & Composability Catalogue
---

# Feature Catalogue Workflow

// turbo-all

## When to Use

Use this workflow when:
- Adding a new feature to the catalogue
- Updating an existing feature's metadata
- Running a drift check against the codebase
- Adding a new domain

## Steps

### 1. Understand the Catalogue Structure

```
audit/features/
├── README.md                     # Human entry point
├── taxonomy.md                   # Classification schema
├── composability-map.md          # Dependency graph (Mermaid)
├── drift-report.md               # Codebase validation
├── migration-manifest.md         # Migration priorities
├── catalogue/
│   ├── index.md                  # L0 Master Index
│   ├── _template.md              # Entry template
│   ├── finance.md                # L1 Domain catalogues...
│   ├── labour.md
│   ├── quality.md
│   ├── safety.md
│   ├── engagement.md
│   ├── platform.md
│   └── intelligence.md
```

### 2. Adding a New Feature

1. Open `audit/features/catalogue/_template.md` and copy the template
2. Determine the correct domain catalogue file (e.g., `finance.md`)
3. Assign a Feature ID following the pattern: `FEAT-{DOMAIN}-{NNN}`
4. Fill in all fields including `Provides` and `Requires` capabilities
5. Add the entry to the appropriate section of the domain catalogue
6. Update `audit/features/catalogue/index.md` if adding a new domain

### 3. Running a Drift Check

1. For each catalogued package, verify the path exists:
   ```bash
   # From repo root
   for p in $(grep -oP '`libs/[^`]+`' audit/features/catalogue/*.md | grep -oP 'libs/[^`]+'); do
     [ -d "$p" ] && echo "✅ $p" || echo "❌ $p"
   done
   ```
2. Check for orphaned packages not in any catalogue:
   ```bash
   ls -d libs/domains/*/ | while read d; do
     grep -rl "$(basename $d)" audit/features/catalogue/*.md >/dev/null 2>&1 || echo "ORPHAN: $d"
   done
   ```
3. Update `audit/features/drift-report.md` with findings

### 4. Updating the Composability Map

1. Extract all `Provides` and `Requires` values from catalogue files
2. Cross-reference every `Requires` against every `Provides`
3. Update the Mermaid diagram in `audit/features/composability-map.md`
4. Flag any new unresolved capability gaps

### 5. Validation

After any changes:
- Verify the L0 index feature count matches actual entries
- Ensure no duplicate Feature IDs exist across catalogues
- Check that `Provides` capability strings are unique
