# Steve Jobs Audit Report

**Target**: `apps/alfred-web-dashboard/src/features/`, `apps/alfred-web-dashboard/src/pages/`, `apps/alfred-web-dashboard/src/domains/`
**Date**: 2026-02-18
**Verdict**: This is not a product. This is 461,000 lines of unfinished migration duct-taped over a mountain of mock data, shipping the illusion of software.

---

## Executive Summary

1,390 files. 461K lines of code. 38 tests. That is a 2.7% test-to-source file ratio -- the engineering equivalent of building a skyscraper and testing one doorknob. Every admin feature has been duplicated wholesale during a TanStack Router migration that was never completed, resulting in **53 Route/Page file pairs** sitting side-by-side doing the same thing. The entire `domains/construction-crm` and `domains/finance-crm` layers are backed by fake `simulateDelay()` calls returning hardcoded mock data, passing that off as a "service layer." Status color maps have been independently redeclared at least **20 times** across the codebase. The `formatCurrency` function has been reinvented in at least 4 different files. This codebase doesn't need features -- it needs a funeral for the dead code and a birth certificate for the code that survives.

---

## CRITICAL Issues

### C1. Fifty-Three Route/Page Duplicates -- A Migration That Never Landed

**Scope**: Every subdirectory under `features/admin/`

Every single admin feature has two implementations sitting side by side: a legacy `*Page.tsx` and a "migrated" `*Route.tsx`. Neither has been deleted. Both are likely in the bundle.

**Confirmed duplicates (53 pairs)**:
- `features/admin/workflows/` -- WorkflowsPage.tsx + WorkflowsRoute.tsx, ExecutionsPage.tsx + ExecutionsRoute.tsx, TriggerManagerPage.tsx + TriggerManagerRoute.tsx, WorkflowBuilderPage.tsx + WorkflowBuilderRoute.tsx, WorkflowDetailPage.tsx + WorkflowDetailRoute.tsx
- `features/admin/security/` -- 8 pairs (SecurityDashboard, AccessPolicies, AuditLogs, ComplianceDetail, ComplianceOverview, DataPrivacy, Encryption, SecurityPolicies, Vulnerability)
- `features/admin/ai/` -- 7 pairs (AIDashboard, AIBudgets, AIGuardrails, AIModels, AIProviders, AIUsage, PromptDetail, Prompts)
- `features/admin/monitoring/` -- 7 pairs
- `features/admin/templates/` -- 3 pairs
- `features/admin/rules/` -- 3 pairs
- `features/admin/engines/` -- 2 pairs
- `features/admin/schemas/` -- 2 pairs
- Plus connectors, tools, plugins, tenancy, feature-flags, cost, agents, orchestrators, events, jobs

**Why This Is Unacceptable**: This is shipping TWO implementations of everything. It doubles the maintenance surface. It confuses every developer. It inflates the bundle. And the commit messages say "chore: bun migration v1 updates" -- meaning someone checked this in and moved on, leaving 53 ticking time bombs of divergence.

**The Fix**: For each pair, decide which version is canonical (the Route version, since that's the migration target), delete the Page version, and update all imports. This is a one-day task that eliminates tens of thousands of lines.

```
# For each pair, delete the legacy version:
# features/admin/workflows/ExecutionsPage.tsx  -> DELETE
# features/admin/workflows/ExecutionsRoute.tsx -> KEEP, rename to ExecutionsPage.tsx
# Update all imports accordingly
```

---

### C2. Entire Domain Service Layers Are Fake

**Files**:
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/domains/construction-crm/service.ts` (450 lines)
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/domains/construction-crm/mock-data.ts` (1,447 lines)
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/domains/finance-crm/mock-data.ts`

**The Problem**: The entire construction CRM domain -- which powers the "Project Command Center" dashboard -- is backed by `simulateDelay()` returning hardcoded JavaScript arrays. This is line 42-43 of `service.ts`:

```typescript
/** Simulates network latency between 200 and 400 ms. */
const simulateDelay = (): Promise<void> =>
  new Promise(r => setTimeout(r, 200 + Math.random() * 200));
```

Every single function in the service layer (`fetchProjects`, `fetchContacts`, `fetchSubcontractors`, `fetchInvoices`, `fetchActivities`, `fetchDashboardMetrics`, `fetchFinancialSummary`) follows this pattern. The "mutations" like `advanceProjectStage` mutate the in-memory mock array directly (line 404: `project.stage = nextStage`).

**Why This Is Unacceptable**: This is not a service layer. It is a prototype wearing a service layer's clothing. Anyone using this dashboard thinks they're looking at real data. The mutation functions silently corrupt shared mutable state across the app. And 1,447 lines of mock data in `mock-data.ts` are pure dead weight in the production bundle.

**The Fix**: Either connect these to real API endpoints, or explicitly isolate mock data behind a feature flag / dev-only import. The mock data file should NEVER be in the production bundle:

```typescript
// Before (production code importing mocks)
import { MOCK_PROJECTS, MOCK_CONTACTS } from './mock-data';

// After (conditional, tree-shakeable)
const getProjects = import.meta.env.DEV
  ? () => import('./mock-data').then(m => m.MOCK_PROJECTS)
  : () => apiClient.get('/construction-crm/projects');
```

---

### C3. Test Coverage Is Functionally Zero

**The Numbers**:
- Source files: **1,352**
- Test files: **38**
- Coverage ratio: **2.8%**

**Distribution of the 38 tests**:
- `pages/workforce/tests/` -- 3 files
- `pages/barracks/command-center/tests/` -- a few utility tests
- `domains/intelligence/pages/__tests__/` -- 3 integration tests
- `domains/intelligence/components/__tests__/` -- 1 test
- `domains/finance-crm/` -- 2 unit tests (utils, orchestration)
- `features/admin/cost/mocks/` -- mock data files (not tests)
- `features/labour/__tests__/` -- 1 test
- `features/ai-assistance/` -- 1 test

**What has ZERO tests**:
- The entire `features/admin/` directory (465 files, ~146K lines) has effectively 0 behavior tests
- The entire `features/agent-builder/` (complex visual builder) -- 0 tests
- The entire `features/worker-onboarding/` (critical user flow) -- 0 tests
- The entire `domains/construction-crm/` -- 0 tests
- The entire `domains/procore/` -- 0 tests
- The entire `domains/cascade/` -- 0 tests
- ~95% of pages -- 0 tests

**Why This Is Unacceptable**: You cannot refactor, delete, or merge the 53 duplicate files with confidence when there are no tests. You cannot swap mock services for real ones. You cannot verify the TanStack Router migration actually works. The code is unfalsifiable -- it exists in a state where no one can prove it works OR prove it's broken.

**The Fix**: Before any other work, write integration tests for the critical paths:
1. Each admin Route component renders without errors
2. Search param Zod schemas validate correctly
3. Domain service functions return expected shapes
4. Cost dashboard hooks handle error/demo fallback correctly

---

## MAJOR Issues

### M1. Massive Copy-Paste Infrastructure: statusColors Declared 20+ Times

**Files** (representative sample):
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/features/admin/agents/AgentsPage.tsx:131`
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/features/admin/agents/AgentDetailPage.tsx:148`
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/features/admin/workflows/ExecutionsRoute.tsx:98`
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/features/admin/workflows/WorkflowDetailPage.tsx:119`
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/features/admin/schemas/SchemasManagementPage.tsx:78`
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/features/admin/tools/ToolsManagementPage.tsx:78`
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/features/admin/connectors/HealthHistoryChart.tsx:57`
- ...and at least 12 more

**The Problem**: Every admin feature independently declares its own `const statusColors: Record<string, string>` mapping status names to Tailwind classes. Some are typed with specific enums, some use `Record<string, string>`. The color values are inconsistent across features -- "active" might be green in one place and blue in another.

**Why This Matters**: When you change your design system's color for "active" status, you have to find and update 20+ files. One will be missed. The UI will be inconsistent.

**The Fix**: Create a shared status utilities module:

```typescript
// features/admin/shared/status-config.ts
export const STATUS_VARIANTS = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  draft: 'bg-blue-100 text-blue-800',
  error: 'bg-red-100 text-red-800',
  // ...
} as const;

export function getStatusColor(status: string): string {
  return STATUS_VARIANTS[status as keyof typeof STATUS_VARIANTS] ?? STATUS_VARIANTS.inactive;
}
```

---

### M2. useCostDashboard.ts: 809 Lines of Identical Boilerplate

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/features/admin/cost/hooks/useCostDashboard.ts`

**The Problem**: This file defines 12 Zod schemas, 12 validation wrapper functions, and 12 query hooks. Every single hook follows this exact pattern:

```typescript
export function useXxx() {
  return useQuery({
    queryKey: ['cost-xxx'],
    queryFn: async () => {
      try {
        const response = await apiRequest<Xxx>('/admin/cost/xxx');
        return validateXxx(response.data ?? []);
      } catch (error) {
        logger.error('Failed to fetch xxx', error instanceof Error ? error : new Error(String(error)));
        if (isDemoModeEnabled()) {
          return getMockXxx();
        }
        throw error;
      }
    },
  });
}
```

This pattern is repeated **12 times** with only the endpoint, type, and mock function changing. The validation functions are equally redundant -- each is a one-liner wrapping `Schema.parse()`.

**Why This Matters**: 809 lines that should be ~150. The copy-paste creates 12 places where the error-handling/demo-fallback pattern could diverge. When you need to add retry logic or change the demo mode check, you edit 12 functions.

**The Fix**: Create a generic factory:

```typescript
function createCostQuery<T>(
  key: string,
  endpoint: string,
  schema: z.ZodType<T>,
  mockFn: () => T
) {
  return () => useQuery({
    queryKey: ['cost', key],
    queryFn: async () => {
      try {
        const response = await apiRequest<T>(`/admin/cost/${endpoint}`);
        return schema.parse(response.data);
      } catch (error) {
        logger.error(`Failed to fetch ${key}`, error instanceof Error ? error : new Error(String(error)));
        if (isDemoModeEnabled()) return mockFn();
        throw error;
      }
    },
  });
}

export const useCostSummary = (period: string) => createCostQuery(/* ... */);
// One line per hook instead of 30
```

---

### M3. `as any` and `as never` Type Assertions Everywhere

**Files**:
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/pages/timekeeper/GhostEntryPage.tsx:69,70,117,364` -- 4 instances of `as any`
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/pages/timekeeper/TimesheetEntryPage.tsx` -- 3 instances of `as any`
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/features/admin/ai/AIDashboardRoute.tsx:869-870` -- `as unknown as BudgetUtilizationCardProps['budgets']`
- 132 instances of `as never` across 57 files in the `src/` directory

**Specific egregious example** from GhostEntryPage.tsx, lines 69-72:

```typescript
const navigate = useNavigate({ from: '/timekeeper/ghost-entries' as any });
const search = useSearch({
  from: '/timekeeper/ghost-entries' as any,
}) as SearchParams;
```

And line 117:
```typescript
navigate({ search: { week: newWeek } } as any);
```

And line 364:
```typescript
navigate({ to: timekeeperEntryRoute.to as any } as any)
```

**Why This Matters**: Every `as any` is a lie to the type system. The TanStack Router migration was supposed to bring type-safe routing, but `as any` on the route path defeats the entire purpose. If the route path changes, no type error. If the search params shape changes, no type error. You've paid the complexity cost of TanStack Router while getting none of the safety.

**The Fix**: Register routes properly in the TanStack Router route tree so the `from` parameter is type-safe:

```typescript
// Before
const navigate = useNavigate({ from: '/timekeeper/ghost-entries' as any });

// After (with properly registered routes)
const navigate = useNavigate({ from: timekeeperGhostRoute.id });
```

---

### M4. God Components: 2,353 Lines in a Single File

**Files (largest)**:
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/domains/cascade/pages/CascadePlannerPage.tsx` -- **2,353 lines**
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/pages/worker-os/portal/sections.tsx` -- **2,305 lines**
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/domains/finance-crm/pages/FinanceCrmPage.tsx` -- **2,250 lines**
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/domains/intelligence/pages/CRM360Page.tsx` -- **2,095 lines**
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/features/admin/orchestrators/OrchestratorsPage.tsx` -- **1,959 lines**
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/features/admin/config/ConfigManagementPage.tsx` -- **1,909 lines**
- 7 more files above 1,500 lines

**Why This Matters**: A 2,353-line React component is not a component. It is a monolith with JSX. No one can review it, test it, or reason about its state. The render cycle is unpredictable. Co-locating everything in one file means you cannot lazy-load subsections.

**The Fix**: The ConstructionCrmDashboard.tsx (342 lines) shows this team knows how to decompose -- delegate tabs to sub-components. Apply the same discipline to every file over 500 lines. Extract sub-components, hooks, and utilities into separate files with a clear data-flow contract.

---

### M5. `window.location.reload()` as a "Refresh" Strategy

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/features/admin/ai/AIDashboardRoute.tsx:799`

```typescript
<Button
  variant="outline"
  size="icon"
  onClick={() => window.location.reload()}
>
  <RefreshCw className="h-4 w-4" />
</Button>
```

**Why This Matters**: Full page reload destroys all client state, query caches, scroll position, and active connections. The component already has access to TanStack Query's `queryClient.invalidateQueries()`. Using `window.location.reload()` next to a proper invalidation pattern (used elsewhere) shows a lack of discipline.

**The Fix**:
```typescript
const queryClient = useQueryClient();
// ...
onClick={() => queryClient.invalidateQueries({ queryKey: ['ai'] })}
```

---

### M6. PropertiesPanel: 11 eslint-disable Comments Hiding Accessibility Issues

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/features/agent-builder/components/PropertiesPanel.tsx`

**Lines**: 35, 53, 70, 87, 106, 153, 171, 189, 206, 224 (10 instances of `eslint-disable-next-line jsx-a11y/label-has-associated-control`)

**The Problem**: Rather than fixing the accessibility issue (associating labels with their form controls via `htmlFor`/`id`), the developer suppressed the lint rule 10 times in a single file. This means screen readers cannot associate labels with inputs.

**The Fix**:
```typescript
// Before
{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
<label className="text-xs font-medium text-gray-500">Label</label>
<input type="text" value={node.data?.label || ''} onChange={...} />

// After
<label htmlFor={`${node.id}-label`} className="text-xs font-medium text-gray-500">
  Label
</label>
<input id={`${node.id}-label`} type="text" value={node.data?.label || ''} onChange={...} />
```

---

### M7. Client-Side Filtering After Server-Side Pagination

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/features/admin/workflows/WorkflowsRoute.tsx:271-327`

**The Problem**: The component fetches paginated data from the server via `useWorkflows(queryFilters)`, then applies client-side filtering (search, category, tab, status, trigger type), then re-paginates the result client-side with `filteredWorkflows.slice(start, start + pageSize)`. There's even a comment admitting the confusion (lines 321-323):

```typescript
// If useWorkflows provided everything, we slice here.
// If it provided paginated data, we might be slicing twice or slicing correctly?
// Assuming legacy behavior: query returns ALL, so we slice.
```

**Why This Matters**: If the server returns page 1 of 20, and you then client-filter and re-slice, you might show 3 results when there are 50 that match on the server. Pagination is broken. The developer knew this and left a comment instead of fixing it.

**The Fix**: Push ALL filtering to the server query, or fetch all data and only paginate client-side. Do not mix the two.

---

## MINOR Issues

### m1. Redundant `formatCurrency` Implementations

At least 4 independent implementations of currency formatting exist across the codebase:
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/features/admin/ai/AIDashboardRoute.tsx:84-91` (USD, 2 decimals)
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/domains/construction-crm/utils.ts` (NZD-specific)
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/features/admin/cost/utils.ts`
- Timekeeper module (`@dom-mcp/module-timekeeper/utils`)

Consolidate into a single utility in the shared layer.

### m2. Inconsistent Import of `useQuery`

Some files import from `@tanstack/react-query` directly:
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/domains/construction-crm/pages/ConstructionCrmDashboard.tsx:11`

Others use the platform wrapper:
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/features/admin/cost/hooks/useCostDashboard.ts:13` (`@dom-mcp/tanstack-query`)

Pick one. The platform wrapper exists for a reason -- use it everywhere.

### m3. Custom Skeleton Component Redeclared in Domain Files

`ConstructionCrmDashboard.tsx` lines 53-60 define a local `Skeleton` component despite `@dom-mcp/ui` exporting one. This is pure duplication.

### m4. Unused Variables Prefixed with Underscore

Multiple files use the underscore-prefix convention for intentionally unused variables:
- `_pagination` (ExecutionsRoute.tsx:147)
- `_confirmProgress` (GhostEntryPage.tsx:161)
- `_isLoading` (AIDashboardRoute.tsx:743)
- `_getHealthStatusColor` (AIDashboardRoute.tsx:104)

These should be removed, not silenced. Dead code is dead weight.

### m5. Inconsistent Error Handling Patterns

Some pages use the Result pattern properly (AgentsRoute.tsx loader, lines 75-89). Others use raw try/catch with `logger.error` (WorkflowsRoute.tsx, lines 363-372). Others use TanStack Query's error state (EscalationsRoute.tsx). There is no single error-handling strategy.

### m6. `console.log` Leaks in Domains

- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/domains/construction-crm/pages/ConstructionFinancialsPage.tsx` -- 1 occurrence
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/domains/construction-crm/pages/ConstructionReportsPage.tsx` -- 1 occurrence

These should use `@/utils/logger` like the rest of the codebase.

---

## Nitpicks

- The comment "Migrated" appears in multiple page titles (e.g., "Executions (Migrated)"). This leaks internal migration status to users.
- Import ordering in ExecutionsRoute.tsx has an `eslint-disable import/order` suppression at line 9 instead of fixing the order.
- The `EscalationsRoute.tsx` includes a dev-only debug panel (lines 422-432) that renders `JSON.stringify(search)`. This is fine for dev but should be behind a more explicit dev tools panel, not inline.
- Several admin Route files define their Zod search schemas but don't export them for reuse by other components that might need to link with search params.

---

## What Does Not Completely Suck

1. **The TanStack Router pattern itself is correct.** The Zod search schemas with `.default().catch()` chains (e.g., ExecutionsRoute.tsx lines 61-90) are exactly right. Type-safe URL state is the correct approach. The migration just needs to be finished.

2. **Cost dashboard Zod validation at the API boundary.** The useCostDashboard.ts file validates every API response against a Zod schema before returning it. This is the right pattern for runtime safety. It just needs to be deduplicated.

3. **The AgentsRoute loader returns errors as values**, not thrown exceptions (lines 78-85). This is the Result pattern done correctly for loaders.

4. **ConstructionCrmDashboard tab decomposition.** The CRM dashboard (342 lines) properly delegates each tab to a sub-component (`OverviewTab`, `PipelineTab`, `FinancialsTab`, `ActivityTab`). This is the correct structural pattern that should be applied everywhere.

5. **Reduced-motion support in the construction CRM domain.** `useReducedMotion()` from framer-motion is properly used to conditionally disable animations. This is an accessibility win.

6. **The Escalations query correctly passes search params to the query key**, ensuring cache invalidation on filter changes.

---

## The Path to Greatness

1. **Delete the 53 duplicate Page files** (HIGHEST PRIORITY). This is the single highest-leverage change. It removes ~30-50K lines of dead code and eliminates the primary source of confusion. One developer, one day.

2. **Isolate mock data from production bundles.** Move all `mock-data.ts` files behind dynamic imports gated on `import.meta.env.DEV` or a demo mode feature flag. The construction CRM's 1,447-line mock file should never ship to production.

3. **Write 50 integration tests for Route components.** Each Route component should have at least one test that renders it with mock providers and verifies it doesn't crash. This gates the ability to safely delete and refactor.

4. **Extract shared admin infrastructure.** Create `features/admin/shared/`:
   - `status-config.ts` (shared status colors and icons)
   - `query-factory.ts` (generic createAdminQuery helper)
   - `formatters.ts` (shared formatCurrency, formatDuration, etc.)

5. **Fix all `as any` / `as never` assertions.** Register all routes in the TanStack Router route tree properly. Every `as any` is a regression from the migration's stated goal.

6. **Break up god components.** Every file over 500 lines gets decomposed. CascadePlannerPage.tsx (2,353 lines), FinanceCrmPage.tsx (2,250 lines), and CRM360Page.tsx (2,095 lines) are the worst offenders.

7. **Standardize error handling.** Pick ONE pattern (Result for loaders, TanStack Query error state for hooks) and apply it everywhere. Remove raw try/catch in mutation handlers.

8. **Fix the client/server pagination confusion.** Decide: either fetch all data and paginate client-side, or push all filters to the server. The current hybrid is provably broken.

---

## Commands to Verify Fixes

```bash
# Type check (requires heap size increase per CLAUDE.md)
NODE_OPTIONS="--max-old-space-size=24576" bun run type-check

# Lint
bun run lint:fast

# Test
bun test --filter alfred-web-dashboard

# Build
bun run build --filter alfred-web-dashboard

# Find remaining duplicates
find apps/alfred-web-dashboard/src/features -name "*Route.tsx" | while read f; do \
  base=$(echo "$f" | sed 's/Route\.tsx/Page.tsx/'); \
  [ -f "$base" ] && echo "DUPLICATE: $f <-> $base"; \
done

# Count remaining `as any` assertions
rg "as any" apps/alfred-web-dashboard/src --type ts --count-matches | sort -t: -k2 -rn

# Count remaining console.log leaks
rg "console\.(log|warn|error)" apps/alfred-web-dashboard/src --type ts --count-matches
```

---

## Final Verdict

The people who built this were clearly talented -- the TanStack Router patterns, Zod schemas, and Result-pattern loaders show someone who knows what good looks like. But knowing what good looks like and actually shipping it are two different things. This codebase is a half-finished renovation where someone tore out all the old plumbing, installed new pipes in half the rooms, left the old pipes in the other half, and connected both to the main water line. Now water flows through both systems, nobody knows which one is active, and there are no tests to tell you when a pipe bursts.

The 53 duplicate files are the cardinal sin. They represent a migration that was started with ambition and abandoned with indifference. Every day they remain, they accumulate divergence. Every developer who touches this code asks "which file do I edit?" and gets it wrong half the time.

The mock data masquerading as a production service layer is the second sin. Someone will demo the construction CRM to a customer, the customer will ask "is that real data?", and the answer will be "it's a `setTimeout` returning a hardcoded array." That is not a product. That is a lie with a nice gradient.

Fix the duplicates. Isolate the mocks. Write the tests. Then -- and only then -- does this have a chance at being something worth shipping.

> "Real artists ship. But they don't ship the same thing twice with different file names."
