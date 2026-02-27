# Steve Jobs Audit Report

**Target**: `apps/alfred-web-dashboard/src/App.tsx`, `main.tsx`, `shell/*`, `routes/*`
**Date**: 2026-02-18
**Verdict**: This is what happens when you let architecture evolve by accretion instead of by intention. There is real ambition here -- a dynamic module system with security isolation, capability-based loading, split contexts for performance -- but it is drowning in 6,730 lines of accumulated cruft, duplicated logic, and a sidebar component that has become a landfill.

---

## Executive Summary

The shell architecture has clear vision (PLAN-09 Universal Shell) and some genuinely sophisticated work: split React contexts in ModuleRegistry, plugin sandboxing, capability-gated module loading with Result pattern error handling. But nobody ever went back and cleaned up after themselves. The result is four independent path normalization systems, duplicated `hasPermissionVariants` functions, a 1,325-line sidebar component that hard-codes navigation for individual modules inline, a `ModuleRegistryContextValue` interface defined twice in two files, a provider with zero consumers shipped to production, and a route tree that imports from 33 separate route files with no organizational principle beyond "add another file." The code works. A three-legged horse works. I would not ship this.

---

## CRITICAL Issues

### 1. `UnifiedChatProvider` loaded with zero consumers

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/App.tsx`
**Line**: 109

**The Problem**: A provider is explicitly annotated `// 0 consumers` and is still mounted in the provider stack, wrapped in `withDeferredLoading`. Zero consumers. It does nothing except consume memory, add a React context layer, and slow down rendering.

**Why This Is Unacceptable**: Every line of code is a liability. This liability is not paying rent. It adds bundle size, render overhead, and cognitive load. Someone looked at it, wrote "0 consumers", and left it there. That is the definition of not caring.

**The Fix**:
```typescript
// Before (line 109)
withDeferredLoading(UnifiedChatProvider), // 0 consumers

// After
// Remove entirely. When it has consumers, add it back.
```

---

### 2. Duplicated `hasPermissionVariants` function

**Files**:
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/shell/ModuleRegistry.tsx` lines 268-275
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/shell/ModuleHost.tsx` lines 182-191

**The Problem**: The exact same function -- checking permission strings with colon-to-dot and dot-to-colon normalization -- is implemented independently in two files. Same logic, same casting to `never`, same approach. Classic copy-paste engineering.

**Why This Is Unacceptable**: When the permission format changes (and it will), someone will update one and forget the other. This is a security-relevant function. Duplication in security code is a latent vulnerability.

**The Fix**: Extract to a shared utility:
```typescript
// shell/utils/permissions.ts
export function hasPermissionVariants(
  hasPermission: (permission: never) => boolean,
  permission: string
): boolean {
  return [
    permission,
    permission.replace(/:/g, '.'),
    permission.replace(/\./g, ':'),
  ].some(candidate => hasPermission(candidate as never));
}
```

Then import from both `ModuleRegistry.tsx` and `ModuleHost.tsx`.

---

### 3. Duplicated `ModuleRegistryContextValue` interface

**Files**:
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/shell/types.ts` line 214
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/shell/ModuleRegistry.tsx` line 518

**The Problem**: Two independently maintained interfaces with the same name defining the same contract. The one in `types.ts` is exported. The one in `ModuleRegistry.tsx` is local and used by the actual hooks. They can drift apart silently.

**Why This Is Unacceptable**: Two sources of truth is zero sources of truth.

**The Fix**: Delete the local interface in `ModuleRegistry.tsx` and import from `types.ts`:
```typescript
import type { ModuleRegistryContextValue } from './types';
```

---

### 4. Four independent path normalization systems

**Files**:
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/shell/moduleRoutes.ts`: `normalizeModuleSubPath`, `normalizeCanonicalPath`, `joinCanonicalPath`, `getRouteRegex`
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/shell/ShellSidebar.tsx`: `normalizeSubPath`, `normalizeAbsolutePath`, `doesAbsolutePathMatchRoute`, `absolutePathRegexCache`

**The Problem**: 26 total usages of four near-identical path normalization functions spread across two files, each with their own regex cache. `normalizeSubPath` and `normalizeModuleSubPath` do the same thing. `normalizeAbsolutePath` and `normalizeCanonicalPath` do the same thing. Each file maintains its own `Map<string, RegExp>` cache for route matching.

**Why This Is Unacceptable**: This is complexity masquerading as architecture. Four functions that strip trailing slashes and add leading slashes. The cognitive load of choosing which one to call, and the risk of subtle behavioral drift between them, is the tax you pay for not making a decision.

**The Fix**: Create `shell/utils/path.ts` with a single set of canonical path utilities. Delete all four variants. One cache, one normalize, one match.

---

## MAJOR Issues

### 5. ShellSidebar.tsx: 1,325 lines of hardcoded module-specific navigation

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/shell/ShellSidebar.tsx`

**The Problem**: This single component contains:
- `QUALITY_NAV_GROUPS` (lines 87-290): 200+ lines of hardcoded quality vault navigation
- `OPS_MANUAL_NAV_GROUPS` (lines 292-313): Hardcoded ops manual navigation
- `BARRACKS_PRIMARY_ROUTE_PATHS` + `BARRACKS_SECONDARY_ROUTE_MAP` (lines 315-344): Hardcoded barracks navigation
- `CHAT_PRODUCT_COMMANDS` (lines 346-375): Hardcoded chat commands
- Module-specific rendering branches (quality-vault, ops-manual, barracks, chat, dashboard, default)

The render function is one enormous ternary chain: `module === 'quality-vault' ? (...) : module === 'ops-manual' ? (...) : module === 'barracks' ? (...) : module === 'chat' ? (...) : (...)`.

**Why This Is Unacceptable**: The whole point of PLAN-09 is a dynamic module system that loads capabilities from manifests. But the sidebar ignores all of that and hardcodes navigation for specific modules. When you add a new module, you have to edit this 1,325-line file. That is the opposite of extensibility. This file violates the Open/Closed Principle so aggressively it should be arrested.

**The Fix**: Each module should declare its own sidebar navigation structure in its `capability.json` or a co-located `navigation.ts`. The sidebar should read from a single, unified navigation model. Module-specific rendering (grouped sections, primary/secondary routes) should be driven by data, not by `if (moduleId === 'barracks')` branches.

---

### 6. `main.tsx`: 388 lines of procedural initialization code

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/main.tsx`

**The Problem**: This is a procedural script, not a module. It contains:
- Environment validation with inline HTML string construction (lines 46-55)
- MSW initialization logic (lines 63-204)
- App Insights initialization (lines 206-220)
- OpenTelemetry initialization (lines 222-244)
- Web Vitals initialization (lines 246-254)
- Ops Manual service worker initialization (lines 256-279)
- Shell service worker registration (lines 281-295)
- Application rendering (lines 297-315)
- Four global event listeners (lines 317-387)
- An `asQualityVaultNavigationDetail` type guard for a specific domain event (lines 94-122)

**Why This Is Unacceptable**: A domain-specific event type guard (`QualityVaultNavigationEventDetail`) has no business in the application entry point. The MSW initialization logic -- 40+ lines including SSR guards for an SPA -- is inline code that should be extracted. The inline HTML error page is a raw string concatenation with no XSS protection on the error message.

**The Fix**:
1. Extract `QualityVaultNavigationEventDetail` and its handler to a quality-specific telemetry module.
2. Extract MSW initialization to `utils/msw.ts`.
3. Extract the environment validation error UI to a separate file or use a simple pre-built error template.
4. The error message at line 51 is interpolated into raw HTML via template literal. If `envError.message` contains HTML, it will render. Sanitize it.

---

### 7. `createRootCompat` compatibility shim for React 18

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/main.tsx`
**Lines**: 127-138

**The Problem**: Seven lines of defensive code checking for `createRoot` on the default export and the named export. React 18 has been stable for years. If you are on React 18+, `createRoot` is always available from `react-dom/client`.

**Why This Is Unacceptable**: Dead defensive code that will never execute, adding confusion about what environment this app targets.

**The Fix**:
```typescript
// Before (7 lines of compatibility checks)
const createRootCompat = ...

// After
import { createRoot } from 'react-dom/client';
```

---

### 8. `MODULE_SHELL_ROUTES` is a 280-line hardcoded routing table

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/shell/moduleRoutes.ts`
**Lines**: 93-284

**The Problem**: A massive `Record<string, Record<string, string>>` mapping module sub-paths to shell paths. quality-vault alone has 55 entries. barracks has 39 entries. This is the second place (after ShellSidebar) where module-specific routing knowledge is hardcoded into the shell.

**Why This Is Unacceptable**: This map, the sidebar navigation groups, and the capability.json manifests all encode overlapping information about module routing. Three sources of truth for the same data. When a route changes, you must update up to three places.

**The Fix**: This mapping should live with each module, not in the shell. Modules should declare their canonical-to-legacy redirects in their own configuration. The shell should consume this declaratively, not maintain a centralized lookup table.

---

### 9. `ShellContext` useMemo dependency array includes values not in the memo output

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/shell/ShellContext.tsx`
**Lines**: 300-352

**The Problem**: The `useMemo` for the context `value` includes `isDashboardHome`, `persistedState.dashboardSidebarCollapsed`, and `persistedState.sidebarCollapsed` in the dependency array (lines 335-337), but the memo object only uses `effectiveSidebarCollapsed` (which is derived from those values). This causes unnecessary re-renders of every shell consumer whenever the user navigates to/from the dashboard home, even if the effective collapsed state did not change.

**Why This Is Unacceptable**: The entire point of `useMemo` is to prevent unnecessary re-renders. Adding spurious dependencies defeats the purpose. Every component consuming `useShell()` re-renders on every dashboard navigation.

**The Fix**: Remove `isDashboardHome`, `persistedState.dashboardSidebarCollapsed`, and `persistedState.sidebarCollapsed` from the dependency array. The memo should depend only on `effectiveSidebarCollapsed`.

---

### 10. ProductSwitcher creates unused `idSet` variable

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/shell/ProductSwitcher.tsx`
**Line**: 51

**The Problem**:
```typescript
const favoriteModules = useMemo(() => {
  const idSet = new Set(favoriteIds); // Created but never used
  return favoriteIds
    .map(id => modules.find(m => m.id === id)) // Uses linear scan instead of Set
    .filter((m): m is ModuleManifest => m != null);
}, [favoriteIds, modules]);
```

A `Set` is constructed but never read. The `map` call uses `modules.find()` (O(n) per lookup) instead of using the set.

**Why This Is Unacceptable**: Dead code in a useMemo. Someone started optimizing, got distracted, and left the corpse behind.

**The Fix**:
```typescript
const favoriteModules = useMemo(() => {
  const moduleMap = new Map(modules.map(m => [m.id, m]));
  return favoriteIds
    .map(id => moduleMap.get(id))
    .filter((m): m is ModuleManifest => m != null);
}, [favoriteIds, modules]);
```

---

### 11. `root.tsx` auth guard bypasses in production-reachable code

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/routes/root.tsx`
**Lines**: 338-352

**The Problem**: Two separate auth bypasses:
1. `isDevModeAllowed()` (line 338) -- claimed to be tree-shaken in production, but if the build config is wrong, auth is bypassed.
2. Azure AD placeholder check (lines 345-352) -- if `VITE_AZURE_CLIENT_ID` is not set or is a placeholder, auth is bypassed entirely. This means any staging deployment without Azure AD configured has zero authentication.

**Why This Is Unacceptable**: Security bypasses should never be conditional on environment variable presence. A missing config should fail closed (deny access), not fail open (allow everything). The Azure placeholder bypass means someone deploying to a new environment with a misconfigured `.env` has an open dashboard.

**The Fix**: Remove the Azure placeholder bypass. If Azure AD is not configured, the app should show a configuration error page, not silently allow unauthenticated access.

---

## MINOR Issues

### 12. Route tree imports 33 route files

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/routes/route-tree.tsx`
**Lines**: 22-59

33 import statements for domain route modules, each spreading an array into `rootRoute.addChildren()`. There is no organizational principle -- they are roughly alphabetical but not consistently. Some use nested route trees (`adminRouteTree`), others spread flat arrays (`...barracksRoutes`). The inconsistency makes it harder to understand the route hierarchy.

---

### 13. `normalizeDevManifest` is 127 lines of defensive parsing

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/shell/ModuleRegistry.tsx`
**Lines**: 306-432

This function manually validates every field of a capability manifest with `typeof` checks and fallback chains. It is a hand-rolled Zod schema. The project already uses Zod (`parseUserCapabilities` is called at line 728). This function should be a Zod schema with `.parse()` or `.safeParse()`.

---

### 14. ShellLayout prefetches projects with inline async function in useEffect

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/shell/ShellLayout.tsx`
**Lines**: 76-105

Inline `async` function defined inside `useEffect`, fetching data, setting query cache, catching errors. This should be a `useQuery` with `enabled: isDashboardHome` or at minimum a `prefetchQuery` call without the manual orchestration.

---

### 15. `ModuleHost` is 819 lines with 8 `useEffect` hooks

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/shell/ModuleHost.tsx`

Eight effects managing loading, redirects, retries, cleanup, error handling, and default route resolution. Several have 6-8 dependencies. The component is doing too many things. It is a module loader, a redirect handler, an error boundary orchestrator, a permission checker, and a route matcher all in one component.

---

### 16. Barracks routes file: 670 lines, 16 redirect-only routes

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/routes/barracks/routes.tsx`

16 legacy alias routes that do nothing but `throw redirect(...)`. These are not routes; they are URL rewrite rules. They should be handled by a centralized redirect map, not as individual route objects with their own variable names.

---

### 17. Quality routes file: 1,347 lines, 22 legacy alias routes

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/routes/quality/routes.tsx`

The longest route file. 85 child routes plus 22 legacy aliases. The `createQualityLegacyAliasRoute` helper (line 49) is a good pattern, but it still results in 22 individually named variables that add nothing. These should be generated from a data structure.

---

### 18. `useProductSwitcher` hook does not memoize its return value

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/shell/ShellContext.tsx`
**Lines**: 463-475

Unlike `useShellSidebar` (which wraps its return in `useMemo`), `useProductSwitcher` returns a new object on every render. Any component using this hook will re-render on every `ShellContext` change, even if the product switcher state did not change.

---

## NITPICK Issues

- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/shell/ShellQueryClient.tsx` line 138: `invalidateShellQueries` wraps a single `invalidateQueries` call in `Promise.all([...])`. `Promise.all` with a single promise is pointless.

- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/shell/ShellQueryClient.tsx` lines 138, 149, 158: `invalidateShellQueries`, `clearShellQueries`, and `getQueryClient` are wrapped in `useMemo` returning arrow functions. `useCallback` exists for this purpose and communicates intent more clearly.

- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/App.tsx` line 11: Comment `// ConstructionLoader removed - deferred providers no longer block rendering` should itself be removed. Comments about removed code are meta-noise.

- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/shell/index.ts`: 271 lines of re-exports. The barrel file is larger than most of the files it re-exports. Consider whether all of these exports are actually consumed.

- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/main.tsx` lines 45-56: `eslint-disable no-secrets/no-secrets` around inline CSS. The lint rule is triggering on CSS strings. Fix the lint config, do not suppress it in application code.

- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/routes/root.tsx` line 35: `CompactModuleLoadingSkeleton` is imported but only used inside a function. Move the import inside the lazy component or next to its usage for clarity.

---

## What Does Not Completely Suck

1. **Split contexts in ModuleRegistry** (`ModuleRegistryStableContext`, `ModuleRegistryActiveContext`, `ModuleRegistryLoadingContext`): This is genuine performance engineering. Separating stable data from loading/active state prevents cascading re-renders. Smart.

2. **Plugin sandboxing in ModuleHost**: The `PluginSandbox` + `ModuleShellIsolationBoundary` pattern is thoughtful defense-in-depth. Providing a read-only shell context to module trees and scoped event emitters is the kind of security thinking I rarely see in frontend code.

3. **Result pattern for module loading**: `loadModule` returns `Result<LoadedModule, ModuleLoadError>` instead of throwing. The error codes (`NOT_FOUND`, `UNAUTHORIZED`, `VERSION_MISMATCH`, `LOAD_FAILED`) are specific and actionable. This is how grown-ups handle errors.

4. **Stale load cancellation via symbols**: The `loadToken` + `loadSequenceRef` pattern in ModuleHost/ModuleRegistry prevents stale async results from overwriting current state. This solves a real race condition correctly.

5. **Route prefetching on pointer down**: `warmRouteOnPointerDown` in ShellSidebar prefetches route bundles before the click event fires. Measurable UX improvement.

6. **Capability-gated module loading with version compatibility checks**: The shell validates module versions against a compatibility matrix before loading. This prevents version skew between shell and modules in production.

---

## The Path to Greatness

1. **Extract module-specific navigation data out of ShellSidebar**: This is the highest-impact change. Move `QUALITY_NAV_GROUPS`, `BARRACKS_PRIMARY_ROUTE_PATHS`, `OPS_MANUAL_NAV_GROUPS`, and `CHAT_PRODUCT_COMMANDS` into their respective module packages or capability files. Make the sidebar render from a single, generic navigation model. Target: ShellSidebar under 400 lines.

2. **Unify path normalization**: Create `shell/utils/path.ts` with `normalizePath`, `joinPaths`, `matchRoute`, and a single regex cache. Delete all four duplicate implementations. Target: one file, under 50 lines.

3. **Extract shared utilities**: `hasPermissionVariants` to `shell/utils/permissions.ts`. `normalizeDevManifest` should become a Zod schema. `createRootCompat` should be deleted.

4. **Remove zero-consumer providers and dead code**: Delete `UnifiedChatProvider` from the provider stack. Remove the `createRootCompat` shim. Remove the stale comment about `ConstructionLoader`. Remove unused `idSet` in ProductSwitcher.

5. **Fix the auth bypass in root.tsx**: Replace the Azure AD placeholder check with a fail-closed configuration error page.

6. **Consolidate redirect routes into data structures**: The 38 redirect-only routes across barracks and quality should be generated from a `Map<string, string>` or array, not individually named variables.

7. **Fix ShellContext useMemo dependencies**: Remove `isDashboardHome` and raw persisted state values from the dependency array to prevent spurious re-renders.

8. **Split ModuleHost**: Extract redirect handling, permission checking, and route matching into separate hooks or utilities. Target: ModuleHost under 400 lines.

---

## Commands to Verify Fixes

```bash
# Type check (requires heap size increase for this monorepo)
NODE_OPTIONS="--max-old-space-size=24576" bun run type-check

# Lint
bun run lint:fast

# Test shell components
bun test --filter alfred-web-dashboard -- shell

# Build
bun run build --filter alfred-web-dashboard
```

---

## Final Verdict

This codebase has ambition. The dynamic module system, the security isolation boundaries, the split contexts -- these are the work of people who understand what they are building. But ambition without discipline produces exactly this: 6,730 lines across 7 key files where the architecture fights itself. Three redundant sources of truth for module routing. Four copies of the same path normalization function. A sidebar that knows the internal structure of every module it renders.

The tragedy is that all the hard problems are solved. Loading modules dynamically, gating by capability, isolating plugin contexts -- done. But the easy problems -- deduplication, extraction, consistency -- are untouched. The team built the cathedral and left the scaffolding up.

Strip the scaffolding. Consolidate the routing truth to one place. Make the sidebar data-driven. Delete everything that is not earning its keep. The bones are here for something genuinely great. Right now it is great potential buried under mediocre housekeeping.

> "Details matter. It is worth waiting to get it right."
