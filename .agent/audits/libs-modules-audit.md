# Steve Jobs Audit Report

**Target**: `libs/modules/learn/`, `libs/modules/talent-studio/`, `libs/modules/labour-command/`, `libs/domains/onboarding/server/`, `libs/platform/access-control/`, `libs/plugins/skills-graph/frontend/`
**Date**: 2026-02-18
**Verdict**: This codebase is a copy-paste factory wearing architecture clothing. Someone built the scaffolding and then repeated themselves fifty times instead of stepping back to ask: "What is the _system_ here?"

---

## Executive Summary

The modules show solid structural intent -- Zod schemas, `createPlatformFetch`, lazy-loaded routes, proper React Query integration. That is not nothing. But the execution is littered with duplicated utility functions (the exact same `formatDuration` appears in **five separate files**), `as any` casts that punch holes in the type system exactly where it matters most (the auth SDK), `as never` type-lie casts sprayed across every navigation call, a 1,309-line God component in `AILearnLabPage.tsx`, raw `console.*` calls throughout the onboarding server instead of the platform logger, and a redundant double-timeout in the AI coach fetch. These are not edge cases -- they are systematic patterns of "good enough" thinking.

---

## CRITICAL Issues

### 1. `as any` Infestation in the Auth SDK -- The Worst Place to Lose Type Safety

**File**: `/Users/cameronrussell/code/alfred/libs/domains/onboarding/server/src/_core/sdk.ts`
**Lines**: 146-153, 265-272

**The Problem**: The `getUserInfo` and `getUserInfoWithJwt` methods cast everything to `any` and spread unknown data structures into a typed response. This is the **authentication layer** -- the one place where you absolutely cannot afford to guess about the shape of your data.

```typescript
// Lines 146-153 -- Current (broken)
const loginMethod = this.deriveLoginMethod(
  (data as any)?.platforms,
  (data as any)?.platform ?? data.platform ?? null
);
return {
  ...(data as any),
  platform: loginMethod,
  loginMethod,
} as GetUserInfoResponse;
```

**Why This Is Unacceptable**: This is the authentication critical path. If the OAuth server changes its response shape, these `as any` casts will silently pass garbage through. You will not get a type error. You will get a production incident where user sessions contain corrupted data or fail silently. The type system exists specifically to catch this. You turned it off at the front door.

**The Fix**: Define the actual OAuth response shape and validate it with Zod at the boundary. If the upstream response includes `platforms` and `platform`, type them:

```typescript
// After (correct)
import { z } from 'zod';

const OAuthUserInfoResponseSchema = z.object({
  openId: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
  platform: z.string().optional(),
  platforms: z.array(z.string()).optional(),
});

async getUserInfo(accessToken: string): Promise<GetUserInfoResponse> {
  const raw = await this.oauthService.getUserInfoByToken({
    accessToken,
  } as ExchangeTokenResponse);

  const parsed = OAuthUserInfoResponseSchema.parse(raw);
  const loginMethod = this.deriveLoginMethod(
    parsed.platforms,
    parsed.platform ?? null
  );
  return {
    ...parsed,
    platform: loginMethod,
    loginMethod,
  };
}
```

---

### 2. AILearnLabPage.tsx Is a 1,309-Line God Component

**File**: `/Users/cameronrussell/code/alfred/libs/modules/learn/src/pages/AILearnLabPage.tsx`
**Lines**: 1-1309

**The Problem**: This single file contains: state management for the entire AI Learn experience, localStorage persistence logic, a coach chat system (including live API calls with its own fetch client), lab scoring logic, lesson navigation, step progression, XP calculation, completion tracking, and the entire UI render tree. It is not a component. It is an entire application crammed into one function.

**Why This Is Unacceptable**: No one can review, test, or modify this safely. A change to the coach chat behavior requires wading through lab scoring. A change to XP calculation requires re-reading step navigation. The cognitive load is maximal. This will accumulate bugs because no one will want to touch it.

**The Fix**: Extract into focused modules:

```
src/pages/AILearnLabPage.tsx          -- Composition root, layout only (~150 lines)
src/features/ai-learn/state.ts        -- AILearnState, createDefaultState, sanitizeState, loadState, saveState
src/features/ai-learn/scoring.ts      -- scoreLabDraft, challenge answer logic
src/features/ai-learn/coach.ts        -- buildCoachGreeting, buildCoachReply, requestLiveCoachReply, extractCoachContent
src/features/ai-learn/hooks.ts        -- useAILearnState (wraps useState + useEffect persistence)
src/features/ai-learn/LessonMap.tsx   -- Sidebar component
src/features/ai-learn/StepViewer.tsx  -- Active step display
src/features/ai-learn/LabCard.tsx     -- Lab prompt + feedback
src/features/ai-learn/ChallengeCard.tsx -- Challenge quiz
src/features/ai-learn/CoachPanel.tsx  -- Chat panel
```

Each piece becomes independently testable.

---

### 3. Redundant Double-Timeout on AI Coach Fetch

**File**: `/Users/cameronrussell/code/alfred/libs/modules/learn/src/pages/AILearnLabPage.tsx`
**Lines**: 52-64, 313-314

**The Problem**: `createPlatformFetch` is configured with `timeoutMs: 12_000`. Then the `requestLiveCoachReply` function creates a **second** `AbortController` with its own 12-second `setTimeout`. These are redundant and could create race conditions where the abort fires after the platform fetch has already timed out (or vice versa), leading to uncaught abort errors.

```typescript
// Line 52-64 -- platform fetch already has timeout
const aiCoachFetch = createPlatformFetch({
  timeoutMs: 12_000,
  ...
});

// Line 313-314 -- REDUNDANT manual abort
const controller = new AbortController();
const timeoutId = window.setTimeout(() => controller.abort(), 12_000);
```

**Why This Is Unacceptable**: Two competing timeout mechanisms is a bug waiting to happen. The manual abort can fire after the response is already being processed, causing a race. The `finally` cleanup on line 364 will clear the timeout, but the platform fetch timeout runs independently.

**The Fix**: Remove the manual `AbortController` and `setTimeout`. Trust `createPlatformFetch` to handle its own timeout:

```typescript
async function requestLiveCoachReply(params: { ... }): Promise<string | null> {
  if (typeof window === 'undefined') return null;

  try {
    const response = await aiCoachFetch('/api/v1/ai/chat/tanstack', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ ... }),
    });

    if (!response.ok) return null;

    const payload = await response.json().catch(() => null);
    return extractCoachContent(payload);
  } catch {
    return null;
  }
}
```

---

## MAJOR Issues

### 4. `formatDuration` / `formatTime` Duplicated in FIVE Files

**Files**:
- `/Users/cameronrussell/code/alfred/libs/modules/learn/src/pages/DashboardPage.tsx:49` (as `formatTime`)
- `/Users/cameronrussell/code/alfred/libs/modules/learn/src/pages/CourseCatalogPage.tsx:68` (as `formatDuration`)
- `/Users/cameronrussell/code/alfred/libs/modules/learn/src/pages/CourseDetailPage.tsx:115` (as `formatDuration`)
- `/Users/cameronrussell/code/alfred/libs/modules/learn/src/pages/EnrollmentPlayerPage.tsx:52` (as `formatDuration`)
- `/Users/cameronrussell/code/alfred/libs/modules/learn/src/pages/ProgressPage.tsx:49` (as `formatTime`)
- `/Users/cameronrussell/code/alfred/libs/modules/learn/src/components/CourseCard.tsx:53` (as `formatDuration`)

**The Problem**: The exact same logic -- convert minutes to "Xh Ym" format -- is copy-pasted into six locations with slightly different names (`formatTime` vs `formatDuration`) and minor variations (some use `Math.round`, some do not).

**Why This Is Unacceptable**: This is DRY 101. When someone decides to change the format (e.g., "2 hours 30 min"), they must find and update six files. They will miss at least one.

**The Fix**: Create one utility function in `src/utils/format.ts`:

```typescript
// src/utils/format.ts
export function formatMinutes(minutes: number): string {
  if (minutes < 60) {
    return `${Math.round(minutes)}m`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}
```

Import it everywhere. Delete the six copies.

---

### 5. `as never` Type Lies on Every Navigation Call

**Files**: Multiple files in `/Users/cameronrussell/code/alfred/libs/modules/learn/src/pages/`
- `DashboardPage.tsx:442`
- `CourseCatalogPage.tsx:354, 361`
- `CourseDetailPage.tsx:543, 553, 559`
- `LessonPlayerPage.tsx:90`
- `AILearnLabPage.tsx:841`

**The Problem**: Every single `navigate()` call casts the `to` parameter `as never` to suppress type errors from TanStack Router's strict route typing:

```typescript
navigate({ to: buildLearnPath(basePath, path) as never });
```

**Why This Is Unacceptable**: `as never` is a lie to the type system. It says "this value has no possible type, trust me." It suppresses the compiler error that is trying to tell you the route string is not type-safe. If you have eight lies, you have eight places where an invalid route string will compile but fail at runtime.

**The Fix**: Create a typed navigation helper that works with TanStack Router's type system:

```typescript
// src/utils/navigation.ts
import { useNavigate } from '@tanstack/react-router';

export function useLearnNavigate() {
  const navigate = useNavigate();
  const { basePath } = useLearnRouteContext();

  return (path: string) => {
    // Use the router's navigate with `to` as a literal type
    // or use window.location if type-safe routing is not possible
    // for dynamic module paths
    void navigate({ to: buildLearnPath(basePath, path) });
  };
}
```

Or, if the module routes are truly dynamic and cannot be statically typed, use `router.navigate` with the `href` option instead of lying with `as never`.

---

### 6. Raw `console.*` Calls Throughout Onboarding Server

**File**: `/Users/cameronrussell/code/alfred/libs/domains/onboarding/server/src/`
**Files affected**: `_core/sdk.ts`, `exportHelper.ts`, `pdf/pdfFormFiller.ts`, `pdf/consolidatedPdfGenerator.ts`

**The Problem**: At least 30+ instances of `console.log`, `console.warn`, and `console.error` instead of `createLogger` from `@dom-mcp/platform-logging`.

```typescript
// sdk.ts:34
console.error("[OAuth] ERROR: OAUTH_SERVER_URL is not configured!...");
// sdk.ts:213
console.warn("[Auth] Missing session cookie");
// sdk.ts:229
console.warn("[Auth] Session payload missing required fields");
// pdfFormFiller.ts:426
console.log("Set IRD field to:", irdDigits.join(""));
```

**Why This Is Unacceptable**: `console.*` calls bypass the platform logging infrastructure. They produce no structured output, no log levels, no correlation IDs, no sampling. In production, `console.log("Set IRD field to:", ...)` is noise that obscures signal. The platform has `@dom-mcp/platform-logging` for a reason. Every other module uses it.

**The Fix**: Replace all `console.*` calls with the platform logger:

```typescript
import { createLogger } from '@dom-mcp/platform-logging';
const logger = createLogger('onboarding-server');

// Before
console.error("[OAuth] ERROR: OAUTH_SERVER_URL is not configured!");
// After
logger.error('OAUTH_SERVER_URL is not configured', { component: 'OAuthService' });
```

---

### 7. `as any` Cast Explosion in Onboarding Server

**File**: `/Users/cameronrussell/code/alfred/libs/domains/onboarding/server/src/`
**Files affected**: `db.ts:273`, `exportHelper.ts:56-75`, `routers/auth.router.ts:114`, `routers/admin.router.ts:291,539-554`, `routers/application.router.ts:130,194,607,610`, `storage.ts:62,89`, `pdf/consolidatedPdfGenerator.ts:522,540,550`, `_core/llm.ts:122`, `pdf/pdfGenerator.ts:145-170`

**The Problem**: At least 25 `as any` casts throughout the onboarding server. These are not test files or type-definition workarounds. These are production code paths handling real application data, PDFs, database operations, and authentication.

**Why This Is Unacceptable**: Each `as any` is a typed guard removed from a production code path. The `admin.router.ts:291` does `jwt.verify(input.token, ENV.cookieSecret) as any` -- casting the JWT verification result to `any` in an admin route. This is the kind of code that gets you on the front page of Hacker News for the wrong reasons.

**The Fix**: Define proper types for each boundary. For PDF generators, create `ApplicationPDFData` type. For the JWT verification, use `jose`'s typed payload interface. For database operations, use the schema types already defined. This is not optional work -- this is closing the barn door while the horse is still inside.

---

### 8. Duplicate `unwrapResult` and `unwrapBackendResult` Are Identical Functions

**File**: `/Users/cameronrussell/code/alfred/libs/plugins/skills-graph/frontend/apiClient.ts`
**Lines**: 29-60

**The Problem**: Two functions -- `unwrapResult` and `unwrapBackendResult` -- have identical implementations:

```typescript
async function unwrapResult<T>(resultPromise: Promise<{
  isOk(): boolean; isErr(): boolean; value?: T; error?: unknown;
}>): Promise<T> {
  const result = await resultPromise;
  if (result.isErr()) { throw result.error; }
  return result.value as T;
}

async function unwrapBackendResult<T>(resultPromise: Promise<{
  isOk(): boolean; isErr(): boolean; value?: T; error?: unknown;
}>): Promise<T> {
  const result = await resultPromise;
  if (result.isErr()) { throw result.error; }
  return result.value as T;
}
```

**Why This Is Unacceptable**: These are literally the same function with different names. Whoever wrote the second one either forgot the first existed or thought names create semantics. They do not.

**The Fix**: Delete `unwrapBackendResult`. Use `unwrapResult` for both HTTP and backend calls. Or better yet, import the `Result` unwrap from `@dom-mcp/domain` if one exists.

---

### 9. `getMarketInsights` Is a Dead Stub Returning Empty Data

**File**: `/Users/cameronrussell/code/alfred/libs/plugins/skills-graph/frontend/apiClient.ts`
**Lines**: 174-176

**The Problem**:
```typescript
getMarketInsights: async () => {
  return { skillGaps: [], clusters: [], stats: null };
},
```

This is exported as part of the public `skillsApi` and will be called by consumers who expect real data.

**Why This Is Unacceptable**: A stub that silently returns empty data is worse than a function that throws. Consumers will render empty states and assume the system is working. No one will investigate "no market insights" as a bug because the function "succeeded."

**The Fix**: Either implement the endpoint integration or throw a clear error:

```typescript
getMarketInsights: async () => {
  throw new Error('getMarketInsights is not yet implemented');
},
```

Or mark it with a `@deprecated` JSDoc and remove it from the public export.

---

### 10. AvailabilityPage Uses `as any` for Route Navigation

**File**: `/Users/cameronrussell/code/alfred/libs/modules/labour-command/src/pages/AvailabilityPage.tsx`
**Line**: 204

```typescript
navigate({ to: '/modules/labour-command/availability' as any });
```

**Why This Is Unacceptable**: Hardcoded module route path cast to `as any`. If the route structure changes, this line will compile but produce a broken navigation. Routes should be derived from a module configuration, not hardcoded.

---

### 11. Feature Flag Service Constructor Has Fire-and-Forget Async Side Effects

**File**: `/Users/cameronrussell/code/alfred/libs/platform/access-control/src/feature-flags/feature-flag.service.ts`
**Lines**: 58-67

```typescript
constructor(store?: FeatureFlagStore) {
  this.store = store || createFeatureFlagStore();
  void this.initializeCache().then(() => {
    if (typeof process !== 'undefined' && process.versions?.node) {
      void this.subscribeToUpdates();
    }
  });
}
```

**The Problem**: The constructor fires async operations (`initializeCache`, `subscribeToUpdates`) that are not awaited and have no error boundary beyond internal try/catch. Callers have no way to know when the service is actually ready. The first `evaluateFlag` call may run before the cache is initialized, causing silent cache misses.

**Why This Is Unacceptable**: A constructor should not perform async I/O. This makes the service untestable in isolation and creates a race condition between construction and first use.

**The Fix**: Add an explicit `initialize()` method:

```typescript
class FeatureFlagService {
  private initialized = false;

  constructor(store?: FeatureFlagStore) {
    this.store = store || createFeatureFlagStore();
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;
    await this.initializeCache();
    if (typeof process !== 'undefined' && process.versions?.node) {
      await this.subscribeToUpdates();
    }
    this.initialized = true;
  }
}
```

---

## MINOR Issues

### 12. `getDueDateVariant` Is Called Inside `formatDueDate` -- Redundant

**File**: `/Users/cameronrussell/code/alfred/libs/modules/learn/src/pages/DashboardPage.tsx`
**Lines**: 61-80, 85-119

`formatDueDate` computes the date diff independently, then also calls `getDueDateVariant` which re-computes the same diff. Either inline the variant logic or have `formatDueDate` be the single source.

---

### 13. `useLearnRouteContext` Casts Params with `as`

**File**: `/Users/cameronrussell/code/alfred/libs/modules/learn/src/utils/route-context.ts`
**Line**: 15

```typescript
const params = useParams({ strict: false }) as LearnRouteParams;
```

This bypasses TanStack Router's typed params. Use the generic form or a type guard.

---

### 14. `capability.json` Route Params Use `$` While `index.tsx` Uses `:`

**File**: `/Users/cameronrussell/code/alfred/libs/modules/learn/capability.json`
**Line**: 13 vs `/Users/cameronrussell/code/alfred/libs/modules/learn/src/index.tsx` line 87

```json
{ "path": "/courses/$courseId" }    // capability.json
```
```typescript
{ path: '/courses/:courseId' }      // index.tsx routes
```

The `$` syntax is TanStack Router convention; `:` is React Router convention. This inconsistency means one of them is wrong for the active router.

---

### 15. Talent Studio Route Preload Warms ALL 22 Chunks

**File**: `/Users/cameronrussell/code/alfred/libs/modules/talent-studio/src/index.tsx`
**Lines**: 107-130

The `ROUTE_CHUNK_PRELOADERS` array eagerly preloads all 22 route chunks including `WorkspacePage` (which is omitted from the preload list, yet it is the default route that loads first). On a good connection this is fine; on slow connections even with `shouldWarmRouteChunks()` gating, sequentially fetching 22 chunks is aggressive.

**The Fix**: Prioritize. Only preload the 3-5 most likely next navigations based on the default route. Defer the rest.

---

### 16. `searchParams` Cast in AvailabilityPage

**File**: `/Users/cameronrussell/code/alfred/libs/modules/labour-command/src/pages/AvailabilityPage.tsx`
**Line**: 174

```typescript
const searchParams = useSearch({ strict: false }) as { workerId?: string };
```

Another `as` cast instead of using TanStack Router's typed search params.

---

### 17. Cookie Module Type Declaration Should Use `@types/cookie`

**File**: `/Users/cameronrussell/code/alfred/libs/domains/onboarding/server/src/types/cookie.d.ts`

A hand-rolled module declaration for `cookie` exists when `@types/cookie` is the standard package. This type declaration is incomplete (missing `CookieSerializeOptions`) and will drift from the actual library.

---

### 18. `evaluateFlags` Evaluates Sequentially Instead of in Parallel

**File**: `/Users/cameronrussell/code/alfred/libs/platform/access-control/src/feature-flags/feature-flag.service.ts`
**Lines**: 404-415

```typescript
async evaluateFlags(flagKeys: string[], context: EvaluationContext): Promise<Record<string, boolean>> {
  const results: Record<string, boolean> = {};
  for (const key of flagKeys) {
    results[key] = await this.evaluateFlag(key, context);
  }
  return results;
}
```

**The Fix**: Use `Promise.all` or `Promise.allSettled` to evaluate flags concurrently:

```typescript
async evaluateFlags(flagKeys: string[], context: EvaluationContext): Promise<Record<string, boolean>> {
  const entries = await Promise.all(
    flagKeys.map(async key => [key, await this.evaluateFlag(key, context)] as const)
  );
  return Object.fromEntries(entries);
}
```

---

### 19. AvailabilityPage Regenerates Mock Data on Every Week Navigation

**File**: `/Users/cameronrussell/code/alfred/libs/modules/labour-command/src/pages/AvailabilityPage.tsx`
**Line**: 188

```typescript
const workers = useMemo(() => generateMockAvailability(weekDays), [weekDays]);
```

Every time `weekOffset` changes, `weekDays` changes, which regenerates all mock workers with new random data. A worker who was "booked" this week might show as "available" if you navigate away and back. Mock data should be deterministic for the same worker across views.

---

## NITPICK Issues

- **`'use client'` directive** in `DashboardPage.tsx` line 1 -- this is a Next.js directive and the project uses Vite. Remove it.
- **`eslint-disable no-secrets/no-secrets`** comments at the top of multiple `access-control` files. If the rule is wrong, fix the ESLint config rather than suppressing per file.
- **`FC` type import** in `CourseCatalogPage.tsx` -- the React community consensus is to avoid `FC` and use explicit prop typing. Inconsistent with other pages that do not use `FC`.
- **`frontendMetadata` object** in skills-graph `index.ts` hardcodes page and widget names. This should be derived from the exports, not maintained manually.
- **Comment sections** with `=====` banner dividers are consistent but noisy. The file structure should communicate sections, not ASCII art.

---

## What Does Not Completely Suck

1. **Zod schemas in `learn/types/index.ts`** are thorough, well-structured, and export both schemas and inferred types. This is exactly how you define data contracts.

2. **`createPlatformFetch` usage** across `learn-api.ts` and `skills-graph/transport.ts` shows proper use of the platform HTTP abstraction with retry, circuit breaker, and timeout configuration. The transport layer in skills-graph follows the Result pattern correctly.

3. **`FeatureFlagService` evaluation logic** is methodical -- cycle detection, dependency resolution, rollout percentages, user targeting. The evaluation cascade in `evaluateFlagWithReason` is well-ordered and traceable.

4. **Talent Studio's `lazyWithPreload` pattern** is a clean utility for prefetching route chunks with network-aware gating via `shouldWarmRouteChunks()`.

5. **AI curriculum data structure** (`ai-basics-curriculum.ts`) is rich and well-typed. The lesson/step/lab/challenge hierarchy is coherent and the content itself is substantive.

6. **React Query key factories** in `query-client.ts` are properly hierarchical, enabling targeted cache invalidation.

---

## The Path to Greatness

1. **Extract AILearnLabPage into feature module** (CRITICAL): This 1,300-line monster is the biggest risk. Break it into state, scoring, coach, and UI sub-modules. Make each testable.

2. **Kill the `as any` casts in the auth SDK** (CRITICAL): Add Zod validation at the OAuth response boundary. This is your authentication layer -- zero tolerance for type-unsafe data.

3. **Create shared `formatMinutes` utility** (MAJOR, 15 min fix): Delete six duplicate functions. One source of truth.

4. **Fix the `as never` navigation pattern** (MAJOR): Create a typed navigation helper or use TanStack Router's dynamic route support properly. Eight type lies is eight future bugs.

5. **Replace all `console.*` with platform logger** (MAJOR): Grep for `console.` in the onboarding server and replace. This is mechanical work but it matters for production observability.

6. **Remove redundant AI coach abort timeout** (CRITICAL, 5 min fix): The platform fetch already handles timeout. Remove the manual `AbortController`.

7. **Delete duplicate `unwrapBackendResult`** (MAJOR, 2 min fix): It is literally the same function.

8. **Add `initialize()` to FeatureFlagService** (MAJOR): Get async side effects out of the constructor.

9. **Align route param syntax** between `capability.json` and `index.tsx` (MINOR): Pick `$` or `:` and be consistent.

10. **Prioritize talent-studio chunk preloading** (MINOR): 22 sequential chunk fetches is too aggressive.

---

## Commands to Verify Fixes

```bash
# Type check all affected packages
NODE_OPTIONS="--max-old-space-size=24576" bun run type-check

# Lint
bun run lint:fast

# Test learn module
bun test --filter learn

# Test talent-studio
bun test --filter talent-studio

# Test access-control
bun test --filter access-control

# Build affected
bun run build --filter @dom-mcp/module-learn --filter @dom-mcp/module-talent-studio --filter @dom-mcp/platform-access-control
```

---

## Final Verdict

The bones are decent. Someone who cared about architecture set up the module system, the platform abstractions, the React Query patterns, the Zod schemas. But then the implementation phase happened, and caring was replaced by shipping. Copy-paste replaced extraction. Type casts replaced thinking. A 1,300-line component replaced decomposition.

This is not garbage. It is mediocrity. And mediocrity is harder to fix than garbage because it almost works. It looks close enough to correct that people stop pushing.

The path from here to great is not a rewrite. It is discipline: extract the duplicated logic, type the boundaries, decompose the God components, respect the abstractions you already built. The platform logging library exists -- use it. The type system exists -- stop lying to it. The Result pattern exists -- stop throwing raw `Error` objects in the auth layer.

Ship the fixes in this order. Do not skip the auth SDK types. Do not leave the God component intact for "later." Later never comes.

> "Details matter. It is worth waiting to get it right."
