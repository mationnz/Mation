# Architectural Remediation Plan

## Overview

This plan covers 15 large architectural changes identified across 6 steve-auditor reports. It is organized into 5 phases, ordered by dependency and risk. Within each phase, items can be executed in parallel unless noted.

**Verification commands (apply after every change):**
```bash
NODE_OPTIONS="--max-old-space-size=24576" bun run type-check
bun run lint:fast
bun test --filter alfred-web-dashboard
bun run build --filter alfred-web-dashboard
```

---

## PHASE 1: Low-Risk Deletions and Isolations (No Behavioral Change)

These changes remove dead code, isolate mock data, and prune server dependencies. They have the highest impact-to-risk ratio and unblock later phases.

---

### Item 2: Delete 53 Duplicate Route/Page File Pairs in features/admin/

**A. Scope & Files**

The following `*Page.tsx` files must be deleted (the `*Route.tsx` version is canonical):

**workflows/** (5 pairs):
- DELETE: `apps/alfred-web-dashboard/src/features/admin/workflows/WorkflowsPage.tsx`
- DELETE: `apps/alfred-web-dashboard/src/features/admin/workflows/ExecutionsPage.tsx`
- DELETE: `apps/alfred-web-dashboard/src/features/admin/workflows/TriggerManagerPage.tsx`
- DELETE: `apps/alfred-web-dashboard/src/features/admin/workflows/WorkflowBuilderPage.tsx`
- DELETE: `apps/alfred-web-dashboard/src/features/admin/workflows/WorkflowDetailPage.tsx`

**security/** (9 pairs):
- DELETE: `SecurityDashboardPage.tsx`, `AccessPoliciesPage.tsx`, `AuditLogsPage.tsx`, `ComplianceDetailPage.tsx`, `ComplianceOverviewPage.tsx`, `DataPrivacyPage.tsx`, `EncryptionPage.tsx`, `SecurityPoliciesPage.tsx`, `VulnerabilityPage.tsx`

**ai/** (8 pairs):
- DELETE: `AIDashboardPage.tsx`, `AIBudgetsPage.tsx`, `AIGuardrailsPage.tsx`, `AIModelsPage.tsx`, `AIProvidersPage.tsx`, `AIUsagePage.tsx`, `PromptsPage.tsx`, `PromptDetailPage.tsx`

**monitoring/** (7 pairs):
- DELETE: `MonitoringOverviewPage.tsx`, `AlertIncidentsPage.tsx`, `AlertRulesPage.tsx`, `DashboardBuilderPage.tsx`, `LogsPage.tsx`, `MetricsExplorerPage.tsx`, `SLADashboardPage.tsx`, `TracesPage.tsx`

**templates/** (3-4 pairs):
- DELETE: `TemplatesPage.tsx`, `TemplateCreatePage.tsx`, `TemplateDetailPage.tsx`, `TemplateExceptionsPage.tsx`

**rules/** (3 pairs):
- DELETE: `RulesPage.tsx`, `AlertsPage.tsx`, `AnomaliesPage.tsx`

**engines/** (2 pairs):
- DELETE: `EnginesManagementPage.tsx`, `EngineDetailPage.tsx`

**schemas/** (2 pairs):
- DELETE: `SchemasManagementPage.tsx`, `SchemaDetailPage.tsx`

**Single pairs** in: connectors, cost, events, feature-flags, jobs, orchestrators, plugins, tenancy, tools, agents (each has 1-2 Page files to delete)

MODIFY (update imports): `apps/alfred-web-dashboard/src/routes/admin/routes.tsx` and any barrel exports under `features/admin/index.ts` or subdirectory index files.

**B. Current State Analysis**

Every admin feature has two co-located implementations: a legacy `*Page.tsx` and a migrated `*Route.tsx`. The Route versions use TanStack Router's Zod search schemas and route-level loaders. The Page versions use the older pattern. Both exist in the bundle. The route tree at `apps/alfred-web-dashboard/src/routes/admin/routes.tsx` imports Route versions, so the Page versions are either tree-shaken or dead-code. Any direct imports of Page files from elsewhere must be audited.

**C. Target Architecture**

Each admin subdirectory contains only the `*Route.tsx` file. No `*Page.tsx` files exist. If a subdirectory has only a Page file and no Route file (e.g., `config/ConfigManagementPage.tsx`, `cache/CacheManagementPage.tsx`), those files remain untouched until their Route migration is completed.

**D. Implementation Steps**

1. Run: `grep -r "Page'" apps/alfred-web-dashboard/src/features/admin/ --include="*.ts" --include="*.tsx" | grep -v "Route\|test\|spec\|mock"` to identify any imports of Page files from non-test code
2. For each confirmed dead Page file, delete it
3. Update any barrel exports (`index.ts`) in affected subdirectories
4. Verify admin route tree still compiles
5. Run type-check and build

**E. Verification**
```bash
# Confirm no remaining Page/Route pairs
find apps/alfred-web-dashboard/src/features/admin -name "*Route.tsx" | while read f; do
  base=$(echo "$f" | sed 's/Route\.tsx/Page.tsx/');
  [ -f "$base" ] && echo "DUPLICATE: $f <-> $base";
done
# Should output nothing
```

**F. Risk Assessment**
- LOW RISK: The route tree already imports Route versions. Page files are likely dead code.
- Check for any lazy imports in `vite.config.ts` devApiFallbackPlugin or MSW handlers that reference Page components.
- If any Page file has functionality NOT present in its Route counterpart, preserve the Page file and create a migration ticket.

---

### Item 7: Remove Server-Only Dependencies from package.json

**A. Scope & Files**

- MODIFY: `apps/alfred-web-dashboard/package.json` -- remove 4 dependencies
- MODIFY or REFACTOR: `apps/alfred-web-dashboard/src/config/key-vault.ts` -- uses `@azure/identity` and `@azure/keyvault-secrets` via type-only imports

**B. Current State Analysis**

Lines 75-76, 186, 191 of `package.json` list:
- `"@azure/identity": "^4.13.0"` -- used only in `src/config/key-vault.ts` which uses `type` imports and has a `isBrowserRuntime()` guard. The actual Azure SDK classes are dynamically imported only in server environments.
- `"@azure/keyvault-secrets": "^4.8.0"` -- same file, same pattern.
- `"cors": "^2.8.5"` -- grep shows zero imports in `src/`.
- `"express": "^4.21.2"` -- grep shows zero imports in `src/`.

`cors` and `express` have zero consumers. They can be removed immediately.

**C. Target Architecture**

- `cors` and `express`: removed entirely from dependencies
- `@azure/identity` and `@azure/keyvault-secrets`: moved to `devDependencies` (they are needed for tests) or removed if `key-vault.ts` is extracted to a server-only package.

**D. Implementation Steps**

1. Remove `"cors"` and `"express"` from `dependencies` in `package.json`
2. Grep the entire repo for transitive consumers
3. For Azure packages: verify `key-vault.ts` uses only `import type` and dynamic `import()` for runtime access. Move both to `devDependencies`.
4. Run `bun install` to update lockfile
5. Build and verify no runtime errors

**E. Verification**
```bash
bun install
bun run build --filter alfred-web-dashboard
cat apps/alfred-web-dashboard/package.json | python3 -c "import json,sys; d=json.load(sys.stdin); print(len(d.get('dependencies',{})))"
```

**F. Risk Assessment**
- LOW for cors/express (zero consumers)
- LOW for Azure packages (type-only imports in browser code)

---

### Item 13: Isolate Mock Data from Production Bundles

**A. Scope & Files**

- MODIFY: `apps/alfred-web-dashboard/src/domains/construction-crm/service.ts` (450 lines) -- add conditional imports
- MOVE: `apps/alfred-web-dashboard/src/domains/construction-crm/mock-data.ts` (1,447 lines) -- behind dynamic import
- MODIFY: `apps/alfred-web-dashboard/src/modules/quality/pages/QualityControlDashboard.tsx` (1,189 lines) -- extract 230 lines of mock data
- CREATE: `apps/alfred-web-dashboard/src/domains/construction-crm/__mocks__/mock-data.ts`
- CREATE: `apps/alfred-web-dashboard/src/modules/quality/data/mock-dashboard-data.ts`

**B. Current State Analysis**

`construction-crm/service.ts` imports directly from `./mock-data` at the top level (static import). Every function uses `simulateDelay()` and returns hardcoded arrays. This is ~1,447 lines of mock data bundled into production.

`QualityControlDashboard.tsx` has `MOCK_ITPS`, `MOCK_INSPECTIONS`, `MOCK_DEFECTS` defined inline at lines 43-273. Chart data transforms at lines 279-339 run at module load time.

**C. Target Architecture**

Mock data is accessed via dynamic imports gated on `import.meta.env.DEV` or a demo mode feature flag:

```typescript
// construction-crm/service.ts
const getMockData = async () => {
  if (import.meta.env.DEV || isDemoModeEnabled()) {
    return import('./__mocks__/mock-data');
  }
  throw Errors.configuration('NO_API', 'Construction CRM API not configured');
};
```

**D. Implementation Steps**

1. Create `construction-crm/__mocks__/mock-data.ts` by moving content from `mock-data.ts`
2. Update `service.ts` to use dynamic import: `const data = await import('./__mocks__/mock-data')`
3. Gate all mock imports behind `import.meta.env.DEV || isDemoModeEnabled()`
4. For QualityControlDashboard: extract mock constants to `modules/quality/data/mock-dashboard-data.ts`
5. Move chart data transforms into the component body wrapped in `useMemo`
6. Delete the original `mock-data.ts` or make it re-export from `__mocks__/`

**E. Verification**
```bash
bun run build --filter alfred-web-dashboard
grep -r "Wynyard Quarter Tower\|Auckland Electrical" apps/alfred-web-dashboard/dist/ || echo "Mock data not in production bundle"
```

**F. Risk Assessment**
- MEDIUM: The construction CRM dashboard currently has no real API. Making mock data unavailable in production will show empty states or errors.
- Must verify `isDemoModeEnabled()` flag is available and properly configured.

---

### Item 11: Consolidate Redirect Routes into Data Structures

**A. Scope & Files**

- MODIFY: `apps/alfred-web-dashboard/src/routes/barracks/routes.tsx` (670 lines, 22 redirect routes)
- MODIFY: `apps/alfred-web-dashboard/src/routes/quality/routes.tsx` (1,347 lines)
- CREATE: `apps/alfred-web-dashboard/src/routes/utils/create-redirect-routes.ts`

**B. Current State Analysis**

Barracks routes file has 22 `throw redirect(...)` routes, each individually named. Quality has the `createQualityLegacyAliasRoute` helper which is a good pattern but each alias is still a separate named variable. Across all route files, there are approximately 38+ redirect-only routes.

**C. Target Architecture**

A shared utility generates redirect routes from a data structure:

```typescript
// routes/utils/create-redirect-routes.ts
export function createRedirectRoutes(
  parentRoute: AnyRoute,
  redirects: Array<{ from: string; to: string }>
): AnyRoute[] {
  return redirects.map(({ from, to }) =>
    createRoute({
      getParentRoute: () => parentRoute,
      path: from,
      beforeLoad: () => { throw redirect({ to }); },
    })
  );
}
```

Each route file defines redirects as a simple array:
```typescript
const BARRACKS_REDIRECTS = [
  { from: '/barracks/hq', to: '/barracks/home' },
  { from: '/barracks/ops-center', to: '/barracks/command-center' },
  // ... all 22 entries
];
const barracksRedirectRoutes = createRedirectRoutes(rootRoute, BARRACKS_REDIRECTS);
```

**D. Implementation Steps**

1. Create `routes/utils/create-redirect-routes.ts` with the generic helper
2. In `barracks/routes.tsx`: replace 22 individually named redirect routes with a `BARRACKS_REDIRECTS` array + call to `createRedirectRoutes`
3. In `quality/routes.tsx`: replace named legacy alias variables with a `QUALITY_REDIRECTS` array
4. Audit other route files and apply the same pattern
5. Ensure all redirect routes are included in the route tree's `addChildren()`

**E. Verification**
```bash
NODE_OPTIONS="--max-old-space-size=24576" bun run type-check
# Manually test key redirect URLs in dev
```

**F. Risk Assessment**
- LOW: Behavioral equivalent transformation. The redirects work identically.

---

## PHASE 2: Service Layer Decomposition

These changes refactor internal service architecture without changing external APIs.

---

### Item 3: Decompose UnifiedAIService (1,687 Lines) into Focused Services

**A. Scope & Files**

- DECOMPOSE: `apps/alfred-web-dashboard/src/services/unified-ai-service.ts` (1,687 lines)
- CREATE: `apps/alfred-web-dashboard/src/services/ai/chat.service.ts`
- CREATE: `apps/alfred-web-dashboard/src/services/ai/voice.service.ts`
- CREATE: `apps/alfred-web-dashboard/src/services/ai/file-processing.service.ts`
- CREATE: `apps/alfred-web-dashboard/src/services/ai/agent-registry.ts`
- CREATE: `apps/alfred-web-dashboard/src/services/ai/audio-conversion.ts`
- CREATE: `apps/alfred-web-dashboard/src/services/ai/health.service.ts`
- CREATE: `apps/alfred-web-dashboard/src/services/ai/types.ts`
- CREATE: `apps/alfred-web-dashboard/src/services/ai/schemas.ts`
- CREATE: `apps/alfred-web-dashboard/src/services/ai/http-config.ts`
- CREATE: `apps/alfred-web-dashboard/src/services/ai/index.ts` (facade that re-exports a compatible singleton)
- MODIFY: `apps/alfred-web-dashboard/src/contexts/GeneralContext.tsx` (imports `unifiedAIService`)
- MODIFY: `apps/alfred-web-dashboard/src/components/alfred-chat/AlfredChatSettingsBar.tsx` (imports `unifiedAIService`)

**B. Current State Analysis**

`UnifiedAIServiceImpl` (line 453-1683) handles:
1. **Chat completion** (lines 690-843): `chatWithAgent()` with gateway and TanStack fallback
2. **Voice sessions** (lines 846-1104): `startVoiceSession()`, `processVoiceInput()`, session management
3. **File processing** (lines 1107-1207): `processFiles()` with type-based routing
4. **PDF extraction** (lines 1213-1413): `extractPDFText()`, `fallbackPDFExtraction()`
5. **Image analysis** (lines 1418-1491): `analyzeImageWithVision()`
6. **Word document extraction** (lines 1496-1515): `extractWordDocText()`
7. **CSV formatting** (lines 1520-1541): `formatCSVForAI()`
8. **Audio conversion** (lines 897-979): `convertToWav()`, `audioBufferToWav()`
9. **Base64 encoding** (lines 1546-1564): `fileToBase64()`
10. **Agent management** (lines 508-612, 1566-1577): `initializeAgents()`, `getAgents()`, `addAgent()`
11. **Health check** (lines 1601-1682): `healthCheck()`
12. **Configuration** (lines 474-506, 1594-1598): `loadConfiguration()`, `updateRealtimeConfig()`

Only 2 files consume the singleton: `GeneralContext.tsx` and `AlfredChatSettingsBar.tsx`.

**C. Target Architecture**

```
services/ai/
  types.ts              # AIMessage, FileMetadata, VoiceSession, AgentConfig, ProcessingResult
  schemas.ts            # RealtimeConfigSchema, FileProcessingConfigSchema, etc.
  http-config.ts        # createAIGatewayFetchOptions, buildAiHeaders, runAIGatewayRequest, isAuthFailure
  agent-registry.ts     # AgentRegistry class (Map<string, AgentConfig>, initializeAgents)
  chat.service.ts       # AIChatService class (chatWithAgent, runTanStackChatFallback)
  voice.service.ts      # AIVoiceService class (startVoiceSession, processVoiceInput, endVoiceSession)
  file-processing.service.ts  # FileProcessingService (processFiles, extractPDF, analyzeImage, extractWord, formatCSV)
  audio-conversion.ts   # convertToWav, audioBufferToWav (pure functions)
  health.service.ts     # AIHealthService (healthCheck)
  index.ts              # Facade: exports a backwards-compatible singleton object
```

Interface contracts:
```typescript
// chat.service.ts depends on: AgentRegistry, FileProcessingService, http-config, schemas
// voice.service.ts depends on: AIChatService, AudioConversion, http-config, schemas
// file-processing.service.ts depends on: http-config (for vision + orchestrator)
// health.service.ts depends on: AgentRegistry, VoiceSessionStore, http-config
```

The `index.ts` facade maintains backwards compatibility:
```typescript
export const unifiedAIService = {
  chatWithAgent: (...args) => chatService.chatWithAgent(...args),
  startVoiceSession: (...args) => voiceService.startVoiceSession(...args),
  processVoiceInput: (...args) => voiceService.processVoiceInput(...args),
  // ... all existing methods
};
```

**D. Implementation Steps**

1. Create `services/ai/types.ts` -- move all interfaces
2. Create `services/ai/schemas.ts` -- move all Zod schemas
3. Create `services/ai/http-config.ts` -- move HTTP utility functions
4. Create `services/ai/agent-registry.ts` -- extract agents Map and initializeAgents
5. Create `services/ai/audio-conversion.ts` -- move pure audio functions
6. Create `services/ai/file-processing.service.ts` -- move file processing methods
7. Create `services/ai/chat.service.ts` -- move chat methods
8. Create `services/ai/voice.service.ts` -- move voice session management
9. Create `services/ai/health.service.ts` -- move healthCheck
10. Create `services/ai/index.ts` as facade
11. Update `unified-ai-service.ts` to re-export from `./ai/index.ts`
12. Verify the 2 consumers still work

**E. Verification**
```bash
NODE_OPTIONS="--max-old-space-size=24576" bun run type-check
bun test --filter alfred-web-dashboard
```

**F. Risk Assessment**
- MEDIUM: The singleton pattern and mutable Maps must be preserved in the facade.
- File processing dynamic imports (mammoth, pdfjs-dist) must remain dynamic.

---

### Item 14: Eliminate throw new Error from Services -- Migrate to Result Pattern

**A. Scope & Files**

Files with `throw new Error(...)` in the services directory:
- `services/lead-factory-queue.ts` -- lines 213, 233, 273, 286 (4 instances: unwrap Result then throw)
- `services/client-request.service.ts` -- lines 285, 328, 398
- `services/agentic-os-api.ts` -- lines 153, 160, 164
- `services/browser-realtime-client.ts` -- line 406
- `services/audio-feedback.ts` -- line 110
- `services/task-triage.service.ts` -- line 617
- `services/orchestrator-chat.service.ts` -- line 303
- `services/oauth-token-service.ts` -- line 441
- `services/api-fetch.service.ts` -- line 163

**B. Current State Analysis**

The codebase uses two error patterns: `Result<T, AppError>` from `@dom-mcp/domain` (preferred) and raw `throw new Error(...)` (legacy). The `lead-factory-queue.ts` pattern is the most egregious: it receives `Result.err()`, extracts `.message`, wraps it in `new Error()`, and throws -- destroying structured error information.

The existing pattern to follow: `return err(Errors.external(...))` or `return err(Errors.validation(...))` from `@dom-mcp/platform-errors`.

**C. Target Architecture**

1. If the function already returns `Result`: replace `throw new Error(result.error.message)` with `return err(result.error)`
2. If the function returns a Promise: convert to `Promise<Result<T, AppError>>` where possible, or use `throw Errors.*()` instead of `throw new Error()`

**D. Implementation Steps**

1. Start with `lead-factory-queue.ts` (4 instances): replace `throw new Error(result.error.message)` with `return err(result.error)`
2. `client-request.service.ts`: replace with `throw Errors.external('client-request', ...)`
3. `agentic-os-api.ts`: replace 3 throws with `throw Errors.external('agentic-os', ...)`
4. Continue through remaining files
5. `audio-feedback.ts`: `throw Errors.configuration('WEB_AUDIO_UNSUPPORTED', ...)`
6. `api-fetch.service.ts`: `throw Errors.configuration('NO_FETCH', ...)`

**E. Verification**
```bash
grep -rn "throw new Error" apps/alfred-web-dashboard/src/services/ --include="*.ts" --include="*.tsx" | grep -v test | grep -v spec
# Should be 0
```

**F. Risk Assessment**
- LOW-MEDIUM: `throw Errors.external(code, msg)` is behaviorally equivalent for callers using try/catch.
- Converting functions from throw to Result return requires updating callers -- do incrementally.

---

### Item 15: Fix Client/Server Pagination Confusion in WorkflowsRoute.tsx

**A. Scope & Files**

- MODIFY: `apps/alfred-web-dashboard/src/features/admin/workflows/WorkflowsRoute.tsx` -- lines 271-340

**B. Current State Analysis**

Lines 271-327: `useWorkflows(queryFilters)` fetches data (possibly paginated server-side), then client-side filtering is applied, then client-side re-pagination via `.slice()`. The comment at lines 320-322 acknowledges the confusion: "Assuming legacy behavior: query returns ALL, so we slice."

**C. Target Architecture**

Make it explicit that this is all-client-side pagination:
- Remove `page`/`pageSize` from server query params if present
- Keep client-side filtering and slicing
- Document that this is intentional

**D. Implementation Steps**

1. Check the `useWorkflows` hook to confirm it returns all data
2. Remove confusing comment
3. Add clear documentation comment
4. If the API does paginate, push all filters server-side instead

**E. Verification**
```bash
# Navigate to /admin/workflows in dev, apply filters, verify pagination works
```

**F. Risk Assessment**
- LOW: Clarifies existing behavior, does not change it.

---

## PHASE 3: Context and Component Architecture

---

### Item 4: Split ProjectContext into Sub-Contexts

**A. Scope & Files**

- MODIFY: `apps/alfred-web-dashboard/src/contexts/project-context.tsx` (605 lines)
- MODIFY: ~22 consumer files

**B. Current State Analysis**

`ProjectContext` uses a single `createContext<ProjectContextValue>` with a 20-item dependency array in `useMemo` (lines 538-588). Every state change causes every consumer to re-render. The codebase has a well-established split-context pattern in `realtime-context.tsx`, `sidebar-context.tsx`, `app-state-provider.tsx`, and `GeneralContext.tsx`.

**C. Target Architecture**

Split into 4 sub-contexts:

```typescript
// ProjectSelectionContext (changes rarely)
interface ProjectSelectionContextValue {
  selectedProject: Project | null;
  selectedProjectId: string | null;
  isFiltered: boolean;
}

// ProjectMetadataContext (changes occasionally)
interface ProjectMetadataContextValue {
  favorites: string[];
  recentProjects: Array<{ id: string; name: string; lastAccessed: number }>;
  autoFillData: AutoFillData | null;
  rememberSelection: boolean;
  isLoading: boolean;
  error: string | null;
}

// ProjectTimeTrackingContext (changes frequently)
interface ProjectTimeTrackingContextValue {
  currentTimeSession: TimeTrackingSession | null;
  isTracking: boolean;
}

// ProjectActionsContext (stable references, never re-renders)
interface ProjectActionsContextValue {
  selectProject: (project: Project | null) => Promise<void>;
  clearProject: () => void;
  toggleFavorite: (projectId: string) => void;
  isFavorite: (projectId: string) => boolean;
  setRememberSelection: (remember: boolean) => void;
  startTracking: () => void;
  stopTracking: () => void;
  pauseTracking: () => void;
  resumeTracking: () => void;
  getAutoFillData: () => AutoFillData | null;
  refreshProject: () => Promise<void>;
}
```

Backwards-compatible hooks:
```typescript
export function useProjectSelection(): ProjectSelectionContextValue { ... }
export function useProjectMetadata(): ProjectMetadataContextValue { ... }
export function useProjectTimeTracking(): ProjectTimeTrackingContextValue { ... }
export function useProjectActions(): ProjectActionsContextValue { ... }

// Legacy compatible hook (merges all sub-contexts)
export function useProjectContext(): ProjectContextValue {
  return { ...useProjectSelection(), ...useProjectMetadata(), ...useProjectTimeTracking(), ...useProjectActions() };
}
```

**D. Implementation Steps**

1. Define the 4 sub-context interfaces and createContext calls
2. In `ProjectProvider`, wrap children with 4 nested providers
3. Create individual `useMemo` blocks for each sub-context value
4. Export 4 new hooks + backwards-compatible `useProjectContext`
5. Existing consumers continue to work via `useProjectContext()`

**E. Verification**
```bash
NODE_OPTIONS="--max-old-space-size=24576" bun run type-check
bun test --filter alfred-web-dashboard
# Use React DevTools Profiler to verify reduced re-renders
```

**F. Risk Assessment**
- LOW: Backwards-compatible via the merged hook. New hooks are additive.
- Provider nesting order: Actions (outermost) -> Selection -> Metadata -> TimeTracking (innermost).

---

### Item 1: Decompose God Components

**A. Scope & Files**

Nine god components, listed by priority:

| Component | File | Lines | Priority |
|-----------|------|-------|----------|
| Portal.tsx | `modules/onboarding/pages/Portal.tsx` | 4,036 | P0 |
| TodaysFocusWorkspace | `components/dashboard/todays-focus-workspace.tsx` | 2,063 | P0 |
| CascadePlannerPage | `domains/cascade/pages/CascadePlannerPage.tsx` | 2,353 | P1 |
| FinanceCrmPage | `domains/finance-crm/pages/FinanceCrmPage.tsx` | 2,250 | P1 |
| CRM360Page | `domains/intelligence/pages/CRM360Page.tsx` | 2,095 | P1 |
| OrchestratorsPage | `features/admin/orchestrators/OrchestratorsPage.tsx` | 1,946 | P2 |
| ConfigManagementPage | `features/admin/config/ConfigManagementPage.tsx` | 1,909 | P2 |
| CommandPalette | `components/command-palette/CommandPalette.tsx` | 1,744 | P1 |
| AILearnLabPage | `libs/modules/learn/src/pages/AILearnLabPage.tsx` | 1,303 | P1 |

**B. Current State Analysis**

Each component violates the same anti-pattern: everything in one file. The `ConstructionCrmDashboard.tsx` (342 lines) demonstrates the correct decomposition pattern: a thin orchestrator that delegates tabs to sub-components.

**C. Target Architecture**

Each god component becomes a directory:

```
component-name/
  ComponentName.tsx          # Orchestrator only (~80-150 lines)
  tabs/
    TabA.tsx
    TabB.tsx
  dialogs/
    DialogA.tsx
  hooks/
    useComponentData.ts
    useComponentActions.ts
  utils/
    formatters.ts
    normalizers.ts
    constants.ts
```

**Specific decomposition: TodaysFocusWorkspace:**
```
dashboard/todays-focus-workspace/
  TodaysFocusWorkspace.tsx          # ~80 lines, orchestrator only
  tabs/
    EmailTab.tsx
    CalendarTab.tsx
    TasksTab.tsx
    NotificationsTab.tsx
    ChatTab.tsx
  dialogs/
    EmailDetailDialog.tsx
    EventDetailDialog.tsx
  hooks/
    useWorkspaceEmails.ts
    useWorkspaceCalendar.ts
    useWorkspaceNotifications.ts
    useWorkspaceChat.ts
  utils/
    normalizers.ts          # normalizeEmail, normalizeCalendarEvent
    travel-estimator.ts     # estimateTravelMinutes (Auckland suburb data)
    formatters.ts           # formatAbsoluteTime, formatEventRange
```

**Specific decomposition: CommandPalette:**
- Move lines 155-557 (400 lines of static data) to `config/command-palette-registry.ts`
- Create a Zod-validated command alias registry
- CommandPalette imports pre-built search indexes

**Specific decomposition: AILearnLabPage:**
- `features/ai-learn/state.ts` (AILearnState, localStorage persistence)
- `features/ai-learn/scoring.ts` (scoreLabDraft)
- `features/ai-learn/coach.ts` (buildCoachGreeting, requestLiveCoachReply)
- `features/ai-learn/hooks.ts` (useAILearnState)
- Sub-components: `LessonMap.tsx`, `StepViewer.tsx`, `LabCard.tsx`, `ChallengeCard.tsx`, `CoachPanel.tsx`

**D. Implementation Steps (per component)**

1. Create the directory structure
2. Extract types/interfaces to a local `types.ts`
3. Extract constants and static data to `utils/constants.ts` or `config/`
4. Extract utility functions to `utils/`
5. Extract hooks to `hooks/`
6. Extract each tab/section to its own component file
7. Reduce the main component to an orchestrator
8. Target: main component under 200 lines

**E. Verification**
```bash
NODE_OPTIONS="--max-old-space-size=24576" bun run type-check
bun run build --filter alfred-web-dashboard
wc -l <main-component-file>   # Should be under 200 lines
```

**F. Risk Assessment**
- MEDIUM-HIGH: Large refactors with no test coverage (7% file coverage).
- MITIGATION: Decompose one at a time. Do not change logic -- only move code. Preserve exact behavior.
- Portal.tsx at 4,036 lines is highest risk. Consider writing basic render tests BEFORE decomposing.

---

### Item 12: Split ModuleHost (846 Lines, 5 useEffect Hooks)

**A. Scope & Files**

- MODIFY: `apps/alfred-web-dashboard/src/shell/ModuleHost.tsx` (846 lines)
- CREATE: `apps/alfred-web-dashboard/src/shell/hooks/useModuleLoader.ts`
- CREATE: `apps/alfred-web-dashboard/src/shell/hooks/useModuleRedirect.ts`
- CREATE: `apps/alfred-web-dashboard/src/shell/hooks/useModulePermissions.ts`
- CREATE: `apps/alfred-web-dashboard/src/shell/hooks/useModuleLifecycle.ts`

**B. Current State Analysis**

ModuleHost contains 5 `useEffect` hooks managing:
1. Shell-surface redirect (line 427)
2. Module loading trigger (line 574)
3. Active module sync (line 597)
4. Ops Manual LDO runtime config (line 632)
5. Cleanup on unmount (line 653)

**C. Target Architecture**

```typescript
// hooks/useModuleRedirect.ts - handles shell-surface redirects
export function useModuleRedirect(moduleId: string, subPath: string): string | null

// hooks/useModuleLoader.ts - handles async module loading with stale-load cancellation
export function useModuleLoader(moduleId: string, hasAccess: boolean): {
  loadedModule: LoadedModule | null;
  isLoading: boolean;
  error: ModuleErrorState | null;
}

// hooks/useModulePermissions.ts - checks access
export function useModulePermissions(moduleId: string): boolean

// hooks/useModuleLifecycle.ts - manages active module sync, LDO config, cleanup
export function useModuleLifecycle(moduleId: string, loadedModule: LoadedModule | null): void
```

ModuleHost becomes a thin composition:
```typescript
export function ModuleHost({ fallback, errorFallback, overrideModuleId }: ModuleHostProps) {
  const moduleId = useResolvedModuleId(overrideModuleId);
  const redirectTarget = useModuleRedirect(moduleId, subPath);
  const hasAccess = useModulePermissions(moduleId);
  const { loadedModule, isLoading, error } = useModuleLoader(moduleId, hasAccess);
  useModuleLifecycle(moduleId, loadedModule);

  if (redirectTarget) return null;
  if (error) return <ErrorDisplay />;
  if (isLoading) return <LoadingSkeleton />;
  return <ModuleRenderer module={loadedModule} />;
}
```

**D. Implementation Steps**

1. Create `shell/hooks/` directory
2. Extract redirect effect to `useModuleRedirect`
3. Extract load logic + stale-load cancellation to `useModuleLoader`
4. Extract permission checking to `useModulePermissions`
5. Extract lifecycle effects to `useModuleLifecycle`
6. Reduce ModuleHost to composition
7. Keep PluginSandbox, error components in ModuleHost.tsx (small, tightly coupled)

**E. Verification**
```bash
bun test --filter "shell"
NODE_OPTIONS="--max-old-space-size=24576" bun run type-check
# Test module loading: navigate to /modules/quality-vault, /barracks, /modules/learn
```

**F. Risk Assessment**
- MEDIUM: The stale-load-cancellation pattern (loadToken + loadSequenceRef) is subtle and must be preserved exactly.

---

## PHASE 4: Build and Config Infrastructure

---

### Item 5: Factor vite.config.ts (2,292 Lines)

**A. Scope & Files**

- DECOMPOSE: `apps/alfred-web-dashboard/vite.config.ts` (2,292 lines)
- CREATE: `vite-config/aliases/dom-mcp-aliases.ts`
- CREATE: `vite-config/aliases/module-aliases.ts`
- CREATE: `vite-config/aliases/npm-dedup-aliases.ts`
- CREATE: `vite-config/aliases/node-shim-aliases.ts`
- CREATE: `vite-config/plugins/dev-api-fallback.ts`
- CREATE: `vite-config/plugins/dom-mcp-external.ts`
- CREATE: `vite-config/plugins/es-toolkit-compat.ts`
- CREATE: `vite-config/plugins/external-modules-shim.ts`
- CREATE: `vite-config/plugins/federation-config.ts`
- CREATE: `vite-config/proxy-config.ts`
- CREATE: `vite-config/external-packages.ts`
- EXISTING: `vite-config/manual-chunks.ts`, `vite-config/utils.ts`, `vite-config/plugins/pwa-config.ts`, `vite-config/plugins/typescript-handling.ts`

**B. Current State Analysis**

The vite.config.ts contains:
- Lines 1-26: imports and setup
- Lines 37-115: `domMcpExternalOverridePlugin()` inline plugin
- Lines 117-240: federation URL resolution, env helpers
- Lines 248-567: `devApiFallbackPlugin()` (320 lines of hardcoded mock responses)
- Lines 569-634: bun cache resolution utilities
- Lines 635-790: plugin array composition, federation setup
- Lines 791-2091: 200+ resolve aliases (~1,300 lines)
- Lines 2092-2200: rollup external packages, build config
- Lines 2200-2292: server config, proxy, preview config

**C. Target Architecture**

Root `vite.config.ts` becomes ~100 lines:
```typescript
import { aliases } from './vite-config/aliases';
import { plugins } from './vite-config/plugins';
import { proxyConfig } from './vite-config/proxy-config';
import { externalPackages } from './vite-config/external-packages';
import { getManualChunks } from './vite-config/manual-chunks';

export default defineConfig(({ mode }) => ({
  plugins: plugins(mode),
  resolve: { alias: aliases(__dirname) },
  build: {
    rollupOptions: {
      external: externalPackages,
      output: { manualChunks: getManualChunks },
    },
  },
  server: { proxy: proxyConfig },
}));
```

**D. Implementation Steps**

1. Extract `devApiFallbackPlugin` (320 lines) to `vite-config/plugins/dev-api-fallback.ts`
2. Extract `domMcpExternalOverridePlugin` to `vite-config/plugins/dom-mcp-external.ts`
3. Extract resolve aliases into categorized files under `vite-config/aliases/`
4. Extract external packages list to `vite-config/external-packages.ts`
5. Extract proxy configuration to `vite-config/proxy-config.ts`
6. Extract federation config to `vite-config/plugins/federation-config.ts`
7. Compose in root `vite.config.ts`
8. Remove `eslint-disable prettier/prettier` from line 1

**E. Verification**
```bash
bun run build --filter alfred-web-dashboard
bun run dev --filter alfred-web-dashboard
wc -l apps/alfred-web-dashboard/vite.config.ts   # Should be under 150 lines
```

**F. Risk Assessment**
- MEDIUM: Alias ordering matters in Vite (first-match semantics). Must preserve ordering.
- The `domMcpExternalOverridePlugin` reads from `configResolved`. When extracted, it must still receive the full resolved config.
- Test both dev and production builds.

---

### Item 8: Enable noImplicitAny: true

**A. Scope & Files**

- MODIFY: `apps/alfred-web-dashboard/tsconfig.json` -- line 25

**B. Current State Analysis**

Line 24-25: `"strict": true, "noImplicitAny": false` -- contradicts itself.

**C. Target Architecture**

```json
"strict": true,
"noImplicitAny": true,
```

**D. Implementation Steps (Staged)**

**Stage 1: Assessment**
1. Set `noImplicitAny: true` temporarily
2. Count errors: `NODE_OPTIONS="--max-old-space-size=24576" bunx tsc --noEmit 2>&1 | grep -c "error TS7006\|error TS7031\|error TS7005"`
3. If under 100: fix all in one PR
4. If 100-500: fix in batches by directory
5. If 500+: use `// @ts-expect-error` with tracking

**Stage 2: Fix or Suppress**
1. Add explicit type annotations for each error
2. Use `unknown` instead of `any` where types are unknowable
3. Commit with `noImplicitAny: true` enabled

**Stage 3: Prevent Regression**
1. CI type-check will enforce going forward

**E. Verification**
```bash
NODE_OPTIONS="--max-old-space-size=24576" bun run type-check
```

**F. Risk Assessment**
- LOW (zero runtime impact)
- HIGH EFFORT: May produce hundreds of errors. Staged approach mitigates this.

---

## PHASE 5: Structural Reorganization

---

### Item 10: Unify Path Normalization

**A. Scope & Files**

- CREATE: `apps/alfred-web-dashboard/src/shell/utils/path.ts`
- MODIFY: `apps/alfred-web-dashboard/src/shell/moduleRoutes.ts`
- MODIFY: `apps/alfred-web-dashboard/src/shell/ShellSidebar.tsx`

**B. Current State Analysis**

Four near-identical path normalization functions:
1. `moduleRoutes.ts`: `normalizeModuleSubPath`, `normalizeCanonicalPath`, `joinCanonicalPath`, `getRouteRegex` + `routeRegexCache`
2. `ShellSidebar.tsx`: `normalizeSubPath`, `normalizeAbsolutePath`, `doesAbsolutePathMatchRoute` + `absolutePathRegexCache`

26 total usages, each file with its own `Map<string, RegExp>` cache.

**C. Target Architecture**

```typescript
// shell/utils/path.ts (under 60 lines)
const routeRegexCache = new Map<string, RegExp>();

export function normalizePath(path: string): string {
  if (path === '' || path === '/') return '/';
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return normalized.replace(/\/+$/, '');
}

export function joinPaths(...segments: string[]): string {
  return normalizePath(segments.filter(Boolean).join('/').replace(/\/+/g, '/'));
}

export function getRouteRegex(routePath: string): RegExp {
  const normalized = normalizePath(routePath);
  let regex = routeRegexCache.get(normalized);
  if (!regex) {
    const pattern = normalized
      .replace(/:[^/]+/g, '[^/]+')
      .replace(/\$[^/]+/g, '[^/]+')
      .replace(/\*/g, '.*');
    regex = new RegExp(`^${pattern}$`);
    routeRegexCache.set(normalized, regex);
  }
  return regex;
}

export function matchRoute(pathname: string, routePath: string): boolean {
  return getRouteRegex(routePath).test(normalizePath(pathname));
}
```

**D. Implementation Steps**

1. Create `shell/utils/path.ts`
2. Update `moduleRoutes.ts`: replace 4 functions with imports
3. Update `ShellSidebar.tsx`: replace 3 functions + cache with imports
4. Search for other callers of old function names
5. Delete old function definitions

**E. Verification**
```bash
grep -rn "normalizeSubPath\|normalizeAbsolutePath\|normalizeModuleSubPath\|normalizeCanonicalPath\|absolutePathRegexCache" apps/alfred-web-dashboard/src/shell/ --include="*.ts" --include="*.tsx" | grep -v "utils/path.ts"
# Should return nothing
```

**F. Risk Assessment**
- LOW: Pure refactoring with identical behavior.

---

### Item 6: Extract Module-Specific Navigation out of ShellSidebar

**A. Scope & Files**

- MODIFY: `apps/alfred-web-dashboard/src/shell/ShellSidebar.tsx` (955 lines)
- CREATE: `apps/alfred-web-dashboard/src/shell/navigation/types.ts`
- CREATE: `apps/alfred-web-dashboard/src/shell/navigation/barracks-navigation.ts`
- CREATE: `apps/alfred-web-dashboard/src/shell/navigation/ops-manual-navigation.ts`
- CREATE: `apps/alfred-web-dashboard/src/shell/navigation/chat-commands.ts`
- CREATE: `apps/alfred-web-dashboard/src/shell/navigation/NavigationRenderer.tsx`

**B. Current State Analysis**

The sidebar contains hardcoded data:
- Lines 70-91: `OPS_MANUAL_NAV_GROUPS` (~20 lines)
- Lines 93-105: `BARRACKS_PRIMARY_ROUTE_PATHS` (~15 lines)
- Lines 106-122: `BARRACKS_SECONDARY_ROUTE_MAP` (~15 lines)
- Lines 124-153: `CHAT_PRODUCT_COMMANDS` (~30 lines)
- Quality navigation is already extracted to `QualitySidebarNav.tsx` (lazy-loaded)

The render function uses a ternary chain based on `effectiveActiveModule?.id`.

**C. Target Architecture**

```typescript
// shell/navigation/types.ts
export interface ModuleNavigationConfig {
  moduleId: string;
  primaryPaths: readonly string[];
  secondaryRouteMap?: Record<string, string[]>;
  navGroups?: CuratedModuleNavGroup[];
  commands?: ChatProductOrchestrationCommand[];
}
```

Each module's navigation declared as data, with a generic `NavigationRenderer` component.

ShellSidebar lookup:
```typescript
const NAVIGATION_CONFIGS: Record<string, ModuleNavigationConfig> = {
  barracks: BARRACKS_NAVIGATION,
  'ops-manual': OPS_MANUAL_NAVIGATION,
  chat: CHAT_NAVIGATION,
};

const navConfig = effectiveActiveModule ? NAVIGATION_CONFIGS[effectiveActiveModule.id] : null;
return navConfig
  ? <NavigationRenderer config={navConfig} module={effectiveActiveModule} />
  : <DefaultNavigation routes={filteredRoutes} />;
```

**D. Implementation Steps**

1. Create `shell/navigation/types.ts`
2. Move barracks data to `shell/navigation/barracks-navigation.ts`
3. Move ops-manual data to `shell/navigation/ops-manual-navigation.ts`
4. Move chat commands to `shell/navigation/chat-commands.ts`
5. Create `NavigationRenderer.tsx`
6. Remove duplicated path functions from ShellSidebar (use shared utils from Item 10)
7. Replace ternary chain with config lookup + NavigationRenderer
8. Target: ShellSidebar under 400 lines

**E. Verification**
```bash
NODE_OPTIONS="--max-old-space-size=24576" bun run type-check
wc -l apps/alfred-web-dashboard/src/shell/ShellSidebar.tsx   # Should be under 400
```

**F. Risk Assessment**
- MEDIUM: Sidebar is visible on every page. Visual regression is primary risk.
- Quality sidebar is already extracted, proving the pattern works.
- Must preserve `warmRouteOnPointerDown` prefetching behavior.

---

### Item 9: Organize 100+ Hooks into Domain Subdirectories

**A. Scope & Files**

- REORGANIZE: `apps/alfred-web-dashboard/src/hooks/` (100+ files at root)
- DELETE: `apps/alfred-web-dashboard/src/hooks/USE_THEME_EXAMPLES.tsx`
- MERGE: `useApprovalQueue.ts` and `use-approval-queue.ts`

**B. Current State Analysis**

100+ hooks at root level. Naming inconsistent: mix of `use-kebab-case.ts` and `useCamelCase.ts`. Known duplicates exist.

**C. Target Architecture**

```
hooks/
  ai/           # use-tanstack-chat.ts, use-voice-input.ts, use-chatbot-actions.ts
  barracks/     # (existing)
  data/         # (existing)
  labour/       # (existing)
  project/      # use-project-form.tsx, use-project-filtered-data.tsx
  safety/       # use-safety-directives.ts
  workforce/    # use-approval-queue.ts, use-bullish-placements.ts
  admin/        # useOpsKeyboardShortcuts.ts, useOpsManual.ts
  ui/           # use-mobile.tsx, use-theme.ts, use-high-contrast.ts
  network/      # use-network-status.ts, use-pwa.tsx, use-offline-sync.ts
  shared/       # use-confirm.ts, use-toast.ts, use-persisted-state.ts
  time/         # use-time-entries.ts, useTimesheets.ts
  compliance/   # useCompliance.ts, usePermits.ts
  voice/        # use-voice-commands.ts, use-voice-capture.ts
  widgets/      # (existing)
  tests/        # (existing)
```

Naming convention: `use-kebab-case.ts` for all.

**D. Implementation Steps**

1. Delete `USE_THEME_EXAMPLES.tsx`
2. Resolve duplicates: compare, keep one, delete other, update imports
3. Create subdirectories
4. Move hooks to domain directories
5. Rename camelCase hooks to kebab-case
6. Update all import paths across the codebase
7. Verify no circular dependencies

**E. Verification**
```bash
NODE_OPTIONS="--max-old-space-size=24576" bun run type-check
ls apps/alfred-web-dashboard/src/hooks/*.ts apps/alfred-web-dashboard/src/hooks/*.tsx 2>/dev/null | wc -l
# Should be near 0
```

**F. Risk Assessment**
- MEDIUM: Mass import path changes.
- Best done in one large PR to avoid merge conflicts.

---

## Dependency Graph

```
PHASE 1 (all parallel):
  Item 2  (Delete duplicate Route/Page pairs)
  Item 7  (Remove server-only deps)
  Item 13 (Isolate mock data)
  Item 11 (Consolidate redirect routes)

PHASE 2 (all parallel, after Phase 1):
  Item 3  (Decompose UnifiedAIService)
  Item 14 (Eliminate throw new Error)
  Item 15 (Fix pagination confusion)

PHASE 3 (after Phase 2):
  Item 4  (Split ProjectContext) -- independent
  Item 1  (Decompose god components) -- independent per component
  Item 12 (Split ModuleHost) -- independent

PHASE 4 (after Phase 1):
  Item 5  (Factor vite.config.ts) -- independent
  Item 8  (Enable noImplicitAny) -- best after Phase 1

PHASE 5 (after Phases 3-4):
  Item 10 (Unify path normalization) -- blocks Item 6
  Item 6  (Extract module navigation) -- depends on Item 10
  Item 9  (Organize hooks) -- independent, best done last
```

## Summary Table

| # | Item | Phase | Size | Risk | Depends On |
|---|------|-------|------|------|------------|
| 2 | Delete 53 duplicate Route/Page pairs | 1 | Large (deletions) | Low | None |
| 7 | Remove server-only deps | 1 | Small | Low | None |
| 13 | Isolate mock data | 1 | Medium | Medium | None |
| 11 | Consolidate redirect routes | 1 | Medium | Low | None |
| 3 | Decompose UnifiedAIService | 2 | Large | Medium | None |
| 14 | Eliminate throw new Error | 2 | Medium | Low-Med | None |
| 15 | Fix pagination confusion | 2 | Small | Low | None |
| 4 | Split ProjectContext | 3 | Medium | Low | None |
| 1 | Decompose god components | 3 | XL | Med-High | None |
| 12 | Split ModuleHost | 3 | Medium | Medium | None |
| 5 | Factor vite.config.ts | 4 | Large | Medium | None |
| 8 | Enable noImplicitAny | 4 | XL | Low (high effort) | Item 2 |
| 10 | Unify path normalization | 5 | Small | Low | None |
| 6 | Extract module navigation | 5 | Large | Medium | Item 10 |
| 9 | Organize 100+ hooks | 5 | Large | Medium | All others |
