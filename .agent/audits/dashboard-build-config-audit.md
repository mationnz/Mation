# Steve Jobs Audit Report

**Target**: `apps/alfred-web-dashboard/` -- Build configuration, Vite setup, TypeScript config, dependency management, E2E infrastructure
**Date**: 2026-02-18
**Verdict**: This is not a build configuration. This is a 2,300-line confession that nobody said "no" for eighteen months.

---

## Executive Summary

The vite.config.ts is a 2,292-line monument to accretion. It contains 200+ resolve aliases manually wired because the monorepo's package architecture never enforced proper export maps. The package.json declares 180 production dependencies for a *frontend SPA*, including `express`, `cors`, `@azure/identity`, and `@azure/keyvault-secrets` -- server-only packages that have no business in a browser bundle. The E2E suite has 116 spec files, but a non-trivial number assert nothing more than `expect(page.locator('body')).not.toBeEmpty()`. TypeScript safety is undermined by `noImplicitAny: false` while simultaneously claiming `strict: true`. The tsconfig.typecheck.json silently excludes four entire source directories that tsconfig.json includes, meaning the type-check command lies about what it checks.

---

## CRITICAL Issues

### C1. vite.config.ts is a 2,292-Line God File

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/vite.config.ts`
**Lines**: 1-2292

**The Problem**: A single Vite config file that is longer than most entire applications. It contains inline plugin implementations (devApiFallbackPlugin: 320 lines of hardcoded mock responses), 200+ resolve aliases, external package lists, federation validation logic, proxy configuration, and shim resolution -- all in one file.

**Why This Is Unacceptable**: Nobody can reason about this. Nobody can review a change to it with confidence. Every alias addition risks a subtle ordering conflict because Vite evaluates aliases sequentially. This file is a liability that grows with every sprint and nobody will ever shrink it voluntarily.

**The Fix**: Factor into dedicated modules:

```
vite-config/
  aliases/
    dom-mcp-aliases.ts      # All @dom-mcp/* resolve aliases
    module-aliases.ts        # All @modules/* resolve aliases
    npm-dedup-aliases.ts     # React, tanstack, etc. deduplication
    node-shim-aliases.ts     # Node built-in browser shims
    external-shim-aliases.ts # bullmq, ioredis, drizzle-orm shims
  plugins/
    dev-api-fallback.ts      # The 320-line mock server
    dom-mcp-external.ts      # domMcpExternalOverridePlugin
    es-toolkit-compat.ts     # esToolkitCompatPlugin
    external-modules-shim.ts # externalModulesDevShimPlugin
    federation-config.ts     # Federation URL validation + plugin setup
    pwa-config.ts            # (already exists)
    typescript-handling.ts   # (already exists)
  proxy-config.ts            # Dev server proxy rules
  external-packages.ts       # rollupExternalPackages list
  manual-chunks.ts           # (already exists)
  utils.ts                   # (already exists)
```

The root `vite.config.ts` should be under 100 lines -- composing these modules.

---

### C2. Server-Only Dependencies in Frontend SPA

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/package.json`
**Lines**: 75-76, 186, 191

**The Problem**: The following packages are declared as production dependencies of a browser SPA:

- `express` (line 191) -- an HTTP server framework
- `cors` (line 186) -- Express CORS middleware
- `@azure/identity` (line 75) -- Azure credential management (uses node:crypto, node:http)
- `@azure/keyvault-secrets` (line 76) -- Azure Key Vault client (server-side secret retrieval)

These are Node.js server packages. They should never appear in a frontend dependency tree.

**Why This Is Unacceptable**: Even if tree-shaking removes them from the bundle, they inflate `bun install` time, create phantom security vulnerabilities in audit reports, and signal to every developer that this package.json is a dumping ground where nobody questions what goes in.

**The Fix**: Remove them. If they are transitively required by workspace packages, those workspace packages have a boundary violation that needs fixing upstream.

```json
// Remove from dependencies:
// "@azure/identity": "^4.13.0",
// "@azure/keyvault-secrets": "^4.8.0",
// "cors": "^2.8.5",
// "express": "^4.21.2",
```

---

### C3. tsconfig.typecheck.json Silently Excludes Four Source Directories

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/tsconfig.typecheck.json`
**Lines**: 12-25

**The Problem**: `tsconfig.json` includes 16 source directories. `tsconfig.typecheck.json` only includes 12. The missing four are:

- `src/contexts/**/*`
- `src/modules/**/*`
- `src/shell/**/*`
- `src/domains/**/*`

The `type-check` script uses `tsconfig.typecheck.json`. This means `bun run type-check` does NOT check contexts, modules, shell, or domains code.

**Why This Is Unacceptable**: The CI pipeline's type-check gate is lying. Type errors in `src/contexts/`, `src/modules/`, `src/shell/`, and `src/domains/` will never be caught by `bun run type-check`. This is the type-safety equivalent of locking three doors but leaving the garage open.

**The Fix**: Sync the include arrays. If they were split intentionally for performance, use the partitioned configs (`tsconfig.typecheck.platform.json` and `tsconfig.typecheck.ui.json`) but ensure their union covers everything.

```json
// tsconfig.typecheck.json
{
  "include": [
    "src/components/**/*",
    "src/hooks/**/*",
    "src/config/**/*",
    "src/lib/**/*",
    "src/pages/**/*",
    "src/routes/**/*",
    "src/types/**/*",
    "src/shims/**/*",
    "src/services/**/*",
    "src/api/**/*",
    "src/utils/**/*",
    "src/features/**/*",
    "src/contexts/**/*",
    "src/modules/**/*",
    "src/shell/**/*",
    "src/domains/**/*"
  ]
}
```

---

### C4. `noImplicitAny: false` With `strict: true` Is a Contradiction

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/tsconfig.json`
**Lines**: 24-25

**The Problem**: The config declares `"strict": true` on line 24 but immediately disables `noImplicitAny` on line 25. `strict: true` enables `noImplicitAny`. Setting it to `false` after `strict` undoes one of the most important strictness guarantees.

Combined with `noUnusedLocals: false`, `noUnusedParameters: false`, `noUncheckedIndexedAccess: false`, `exactOptionalPropertyTypes: false`, and `noImplicitOverride: false`, the "strict" declaration is aspirational at best.

**Why This Is Unacceptable**: TypeScript's type system is the single most important tool for preventing runtime errors in a 788K+ LOC monorepo. Turning off `noImplicitAny` means any function parameter without an annotation silently becomes `any`, creating invisible holes in the type system that propagate through every call site.

**The Fix**: Re-enable `noImplicitAny` and fix the resulting errors. If the volume is too large for a single pass, create a migration plan that enables it per-directory using project references or tsconfig overrides.

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noUncheckedIndexedAccess": true
  }
}
```

---

## MAJOR Issues

### M1. 320-Line Hardcoded Dev API Fallback Plugin

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/vite.config.ts`
**Lines**: 248-567

**The Problem**: `devApiFallbackPlugin()` is a 320-line inline mock server embedded in the Vite config. It hardcodes mock responses for `/api/health`, `/api/learn/dashboard`, `/api/cascade/insights/summary`, `/api/v1/projects`, `/api/v1/timekeeper/approval/queue`, `/api/v1/portfolio/*`, `/api/access-control/flags/batch-evaluate`, and the entire `/api/worker-os/*` surface -- complete with fake business data like "Wynyard Quarter Tower" and "Commercial Bay Fitout".

**Why This Matters**: Mock data embedded in build configuration is unmaintainable, untestable, and invisible to developers working on those API surfaces. It duplicates mock responsibility with MSW. Fake project names hardcoded in a build file will outlive the engineer who wrote them and confuse every future reader.

**The Fix**: Extract to a standalone MSW handler file or a dedicated dev-server middleware module. The Vite config should contain a one-line import, not a mock server.

```typescript
// vite-config/plugins/dev-api-fallback.ts
import { devFallbackRoutes } from '../dev-mocks/fallback-routes';
// ... plugin wrapper only
```

---

### M2. 180 Production Dependencies for a Frontend SPA

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/package.json`
**Lines**: 73-253

**The Problem**: 180 production dependencies. For context, React itself plus its entire ecosystem (react, react-dom, react-router, tanstack-query, zustand, zod, tailwind, radix-ui) is roughly 30-40 packages. This SPA has 180.

Notable inclusions that should be lazy-loaded or removed:
- `@react-three/drei`, `@react-three/fiber`, `three` -- 3D rendering (not core SPA functionality)
- `mammoth` -- DOCX parsing
- `xlsx` -- spreadsheet parsing
- `jspdf`, `jspdf-autotable`, `html2canvas` -- PDF generation
- `web-ifc-viewer` -- IFC (BIM) viewing
- `y-indexeddb`, `y-webrtc`, `yjs` -- CRDT collaboration
- `react-force-graph`, `reactflow` -- graph visualization
- `@apollo/client`, `graphql`, `graphql-ws` -- GraphQL (alongside REST/tRPC)
- `@openai/agents`, `@openai/agents-realtime` -- AI agent runtime

**Why This Matters**: Every dependency is an attack surface, a bundle size contributor, a potential breaking change, and a maintenance burden. Having 180 deps means nobody can confidently say what this application actually needs.

**The Fix**: Audit each dependency for actual import usage. Move anything used by fewer than 3 routes into dynamic imports. Move server-only packages to devDependencies or remove them entirely.

---

### M3. NODE_OPTIONS Discrepancy Between CLAUDE.md and package.json

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/package.json`
**Lines**: 335-337

**The Problem**: CLAUDE.md documents `NODE_OPTIONS="--max-old-space-size=24576"` (24GB) as required. But `package.json`'s `mcpTasks.build` sets `NODE_OPTIONS: "--max-old-space-size=8192"` (8GB). Which is correct? If 24GB is truly needed (as CLAUDE.md states for `tsc`), then the build task's 8GB will OOM. If 8GB is sufficient, then CLAUDE.md is lying.

**The Fix**: Determine the actual memory requirement and make it consistent everywhere.

---

### M4. Duplicate Alias Definitions: tsconfig.paths.json vs vite.config.ts

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/tsconfig.paths.json` (716 lines)
**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/vite.config.ts` (resolve.alias: lines 791-2091)

**The Problem**: Path aliases are defined twice -- once in `tsconfig.paths.json` for TypeScript resolution, and again as Vite `resolve.alias` entries. These two lists have 200+ entries each and they are NOT automatically synchronized. When someone adds a new workspace package, they must update BOTH files or one system resolves correctly while the other fails.

Some aliases even point to different targets:
- `tsconfig.paths.json` maps `@dom-mcp/qiis-copilot-v2` to source (`../../libs/domains/quality-vault/copilot-v2/src`)
- `vite.config.ts` maps `@dom-mcp/qiis-copilot-v2` to a shim (`src/shims/qiis-copilot-v2.ts`)

This is because the Vite alias overrides the tsconfig path for build-time behavior, but the divergence is documented nowhere and is a maintenance landmine.

**The Fix**: Use `vite-tsconfig-paths` plugin to derive Vite aliases from tsconfig automatically. Override only the exceptions (shims, browser stubs) in Vite config. Document every override with a comment explaining why it diverges from tsconfig.

---

### M5. E2E Tests That Assert Nothing Meaningful

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/e2e/qa-smoke.spec.ts`
**Lines**: 28-53

**The Problem**: Multiple smoke tests assert only `expect(page.locator('body')).not.toBeEmpty()`. This asserts that the HTML body is not empty -- which is true even if the page renders a white screen with a single empty `<div>`. Five instances of this pattern in qa-smoke.spec.ts alone.

Similarly, `trivial.spec.ts` (line 13) asserts `expect(title).toBeDefined()` -- the page title is always defined, even if it's an empty string.

**Why This Matters**: Tests that cannot fail provide false confidence. They appear in coverage reports and CI dashboards as "passing tests" while testing nothing. They are worse than no tests because they create the illusion of coverage.

**The Fix**: Replace with meaningful assertions that verify actual page content or behavior:

```typescript
// Before (broken)
await expect(page.locator('body')).not.toBeEmpty();

// After (useful)
await expect(page.getByRole('heading')).toBeVisible({ timeout: 10000 });
await expect(page).toHaveTitle(/Projects/);
```

---

### M6. `devApiFallbackPlugin` Directly Manipulates Connect Middleware Stack

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/vite.config.ts`
**Lines**: 559-564

**The Problem**: The plugin casts `server.middlewares.stack` to `Array<{ route: string; handle: ... }>` and calls `stack.unshift()` to prepend its middleware. This relies on Connect's internal data structure, which is not part of its public API.

```typescript
const stack = server.middlewares.stack as Array<...>;
if (Array.isArray(stack)) {
  stack.unshift({ route: '', handle: devFallback });
}
```

**Why This Matters**: This will break silently when Vite upgrades its Connect dependency (which has happened before). The `configureServer` hook provides `server.middlewares.use()` for a reason.

**The Fix**: Use the documented API. If ordering matters, use the `configureServer` return value for post-middleware hooks, or accept the proxy fallback order.

---

### M7. PWA Caching JS Chunks with StaleWhileRevalidate

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/vite-config/plugins/pwa-config.ts`
**Lines**: 97-104

**The Problem**: Lazy JS chunks are cached with `StaleWhileRevalidate`:
```typescript
urlPattern: /\/assets\/.*\.js$/i,
handler: 'StaleWhileRevalidate',
```

JS chunks use content hashes (`[name]-[hash].js`). Every deployment produces new hashes. StaleWhileRevalidate serves the stale cached version immediately and revalidates in the background -- but since the old hash URL returns a 404 after deployment, the revalidation silently fails. Users get stale code until they hard-refresh.

**Why This Matters**: After a deployment, users may run a mix of old and new chunk versions, causing runtime errors when module interfaces change between versions.

**The Fix**: Use `CacheFirst` for hashed assets (they are immutable by definition) and rely on the service worker update flow to invalidate the precache.

```typescript
{
  urlPattern: /\/assets\/.*\.js$/i,
  handler: 'CacheFirst',  // Hashed assets are immutable
  options: {
    cacheName: 'js-assets-cache',
    expiration: { maxEntries: 300, maxAgeSeconds: 2592000 }, // 30 days
  },
},
```

---

## MINOR Issues

### m1. `eslint-disable prettier/prettier` at Top of vite.config.ts

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/vite.config.ts`, line 1

Disabling the formatter for the entire file is a white flag. If the file is too complex for the formatter, the file is too complex.

### m2. Inconsistent Indentation in Alias Array

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/vite.config.ts`, lines 940-954

The `partial-json` and `tough-cookie` aliases use 6-space indentation while everything else uses 8-space. The `@opentelemetry/exporter-prometheus` replacement path closing brace is misaligned. This is what happens in a 2,000-line file -- nobody can maintain consistent formatting.

### m3. `preferTypeScriptPlugin` Uses Synchronous `fs.existsSync` in Hot Path

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/vite-config/plugins/typescript-handling.ts`, lines 28-33

The `resolveId` hook runs for every import. Calling `fs.existsSync` synchronously twice per `.js` import in source files adds I/O latency to every module resolution during dev. Vite's own resolution uses async I/O for a reason.

### m4. Bun Cache Resolution Hardcodes Layout Assumptions

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/vite.config.ts`, lines 601-634

The `resolvePackageFile` function manually walks `node_modules/.bun` with hardcoded directory structure assumptions. The comment on line 599 acknowledges this is fragile. The function should use `Bun.resolve()` or `bun --resolve` instead of manual filesystem traversal.

### m5. `shouldForceLocalAiProxy` Default Is `true`

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/vite.config.ts`, lines 129-132

In dev mode, local AI bypass defaults to `true` when `VITE_REQUIRE_AUTH` is not set. This means developers may unknowingly bypass authentication for AI endpoints, potentially masking auth integration bugs until staging.

### m6. E2E `createLogger` Import from `@dom-mcp/platform-logging`

**Files**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/e2e/qa-smoke.spec.ts`, `e2e/boot-diagnostic.spec.ts`, `e2e/debug.spec.ts`, `e2e/trivial.spec.ts`, `e2e/sidebar-smoke.spec.ts`

E2E tests should not import application platform packages. Playwright tests run in Node.js, not the browser. Using `@dom-mcp/platform-logging` creates a coupling between the test infrastructure and the application's logging package, and makes the e2e tests dependent on workspace build order.

Use `console.log` or Playwright's built-in `test.info()`.

### m7. 36 `test.skip()` Calls Across E2E Suite

**Files**: Multiple e2e spec files

36 conditionally-skipped tests. Many skip based on whether a UI element is rendered (`if ((await filterCandidate.count()) === 0) test.skip(...)`). This is defensive to avoid false failures but indicates the tests are not running against a deterministic environment. Tests that frequently skip are tests that rarely provide value.

### m8. Performance Tests Use Wall-Clock Timing

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/e2e/performance.spec.ts`

Multiple tests use `Date.now()` deltas to assert page load times under 2s. Wall-clock timing in CI is meaningless -- a busy CI runner can double load times. These should use Lighthouse CI scores or the Performance Observer API with thresholds calibrated to the CI environment.

### m9. `tsconfig.json` Excludes Entire Directories From Type-Checking

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/tsconfig.json`, lines 67-69

```json
"src/pages/digital-twin.tsx",
"src/pages/worker-os/**/*",
"src/pages/workforce/**/*",
```

These are shipped page directories excluded from type-checking. If they're broken enough to exclude, they shouldn't be shipped. If they're shipped, they should be type-checked.

### m10. `package.json` Has Dual Build Targets (CJS + ESM) for an SPA

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/package.json`, lines 6, 57-58, 312-323

The package.json declares `"main": "./dist/index.cjs"`, `"module": "./dist/index.js"`, and full export maps with CJS and ESM variants. This is an SPA that builds to `dist/` via Vite. It is not a consumable library. These fields are copy-paste artifacts that serve no purpose and confuse tooling.

---

## Nitpicks

- **`enableInspectPlugin = false` with comment "Disabled due to vite-plugin-inspect bug"** (line 163): If it's been disabled long enough to earn a comment, remove the import and the variable. Dead config is dead code.

- **`resolveQiisRemoteUrl` throws on missing URL in production** (lines 581-585): The error message is clear, but this validation happens at config evaluation time, not at a named validation step. If the intent is to fail-fast, add a `validateBuildEnvironment()` function called explicitly.

- **`getEnv` wrapper for `process.env`** (lines 23-24): The `typeof process !== 'undefined'` guard is unnecessary in a Vite config file, which always runs in Node.js. This guard only matters in isomorphic code.

- **Multiple overlapping alias patterns for the same package**: e.g., `@dom-mcp/qiis-copilot-v2` appears at both line 864 (source resolution) and line 1764 (noop shim). Vite uses first-match semantics. The ordering dependency is critical but undocumented and fragile.

- **`debug.spec.ts` and `trivial.spec.ts` should not exist in a production e2e suite**: They are development scaffolding that was never removed.

---

## What Doesn't Completely Suck

- **The manual-chunks strategy is well-structured** (`/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/vite-config/manual-chunks.ts`). The VENDOR_RULES array is readable, prioritized, and handles domain-specific splitting intelligently. The `getAppChunk` function cleanly maps internal libs to named chunks. This is the one file that shows someone thought about architecture.

- **The `domMcpExternalOverridePlugin` is clever** (lines 37-115). The approach of wrapping the federation plugin's external array in a function that checks alias resolution before externalization is a genuinely elegant solution to a hard problem. It's well-commented and handles edge cases.

- **The federation URL validation** (lines 204-243) is thorough -- HTTPS enforcement, domain allowlisting, placeholder detection, clear error messages. This is what security-conscious configuration looks like.

- **The E2E `loginAs()` helper** (`/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/e2e/utils/test-helpers.ts`, lines 231-327) is robust. It handles MSW readiness, service worker control, session creation with retry, and post-navigation verification. This shows someone who understands the complexity of deterministic E2E auth.

- **The `modulePreload.resolveDependencies` filter** (lines 2182-2204) is a smart optimization -- constraining preloads to shell/runtime chunks keeps FCP tight.

- **PWA workbox configuration** is sensible: `skipWaiting: false`, `clientsClaim: false`, prompt-based updates, appropriate cache strategies per asset type.

---

## The Path to Greatness

1. **Factor vite.config.ts into modules** (CRITICAL): This is the single highest-leverage change. A 100-line root config that imports composable modules transforms this from unmaintainable to manageable. Every other improvement becomes easier once this file is tamed.

2. **Sync tsconfig.typecheck.json includes with tsconfig.json** (CRITICAL): Four source directories are not type-checked. Fix this today. It requires changing four lines.

3. **Remove server-only dependencies from package.json** (CRITICAL): `express`, `cors`, `@azure/identity`, `@azure/keyvault-secrets` must go. Trace their imports and fix the upstream boundary violations.

4. **Enable `noImplicitAny: true`** (CRITICAL): Start with a PR that enables it and suppresses existing violations with `// @ts-expect-error` comments plus a tracking issue. Then burn through them systematically.

5. **Extract devApiFallbackPlugin to a standalone file** (MAJOR): 320 lines of mock data has no business in a build config. Move to `vite-config/plugins/dev-api-fallback.ts` or better yet, consolidate with MSW handlers.

6. **Audit and reduce 180 dependencies** (MAJOR): Run `depcheck`. Move 3D/document/graph/collaboration packages to dynamic imports. Target under 80 production deps.

7. **Fix meaningless E2E assertions** (MAJOR): Every `expect(body).not.toBeEmpty()` should become a real content assertion. Delete `trivial.spec.ts` and `debug.spec.ts`.

8. **Use `vite-tsconfig-paths` to eliminate alias duplication** (MAJOR): Single source of truth for path resolution. Override only browser-specific shims in Vite config.

---

## Commands to Verify Fixes

```bash
# Type check (with proper heap size)
NODE_OPTIONS="--max-old-space-size=24576" bun run type-check

# Verify no server-only imports
grep -r "require('express')\|from 'express'\|from '@azure/identity'" apps/alfred-web-dashboard/src/

# Count remaining aliases after refactor
grep -c "find:" apps/alfred-web-dashboard/vite.config.ts

# E2E smoke
bun run test:e2e -- --grep "Dashboard loads"

# Check dependency count
cat apps/alfred-web-dashboard/package.json | python3 -c "import json,sys; d=json.load(sys.stdin); print(len(d.get('dependencies',{})))"
```

---

## Final Verdict

This build configuration is the predictable result of a fast-moving team that never invested in build infrastructure as a first-class concern. Every alias, every shim, every mock endpoint in vite.config.ts represents a decision that was expedient in the moment and corrosive over time.

The manual-chunks strategy and the federation override plugin show that the team has people who can think architecturally. The problem is that architectural thinking was applied selectively -- to code splitting and federation -- but not to the build configuration itself.

A 2,292-line Vite config is not a configuration. It is technical debt wearing a trench coat. The path forward is clear: factor, prune, and enforce. The team has the skill. What's been missing is the discipline to say "this file is too big, and I refuse to make it bigger."

> "People think focus means saying yes to the thing you've got to focus on. But that's not what it means at all. It means saying no to the hundred other good ideas. You have to pick carefully."

Two hundred resolve aliases is what happens when nobody picks carefully. Start picking.
