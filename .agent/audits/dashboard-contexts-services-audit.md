# Steve Jobs Audit Report

**Target**: `apps/alfred-web-dashboard/src/{contexts,services,hooks,config}/`
**Date**: 2026-02-18
**Verdict**: Someone with taste built the foundation -- then an army of people who don't talk to each other piled features on top.

---

## Executive Summary

The context layer is surprisingly well-designed. Split contexts for render isolation, Zod validation at persistence boundaries, proper `useCallback`/`useMemo` discipline -- someone clearly understood React performance. But the services layer is a different story: a 1,687-line god-class AI service, `throw new Error` scattered across files that should use the Result pattern, a cache service that calls itself "Redis" when it is localStorage, and a feature flag service with a `TODO: persistence is broken` comment that has apparently been shipping. The hooks directory is an explosion of 100+ files with no organizational principle beyond "throw it in the hooks folder." This codebase is one talented architect surrounded by a hundred developers who each added one more thing.

---

## CRITICAL Issues

### C-1: UnifiedAIService is a 1,687-line God Class

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/services/unified-ai-service.ts`
**Lines**: 1-1687

**The Problem**: This single class handles chat completion, voice sessions, file processing, PDF extraction, Word document extraction, CSV formatting, image analysis with GPT-4 Vision, WAV audio conversion, base64 encoding, agent configuration, health checks, and HTTP client management. It is doing *at least* ten distinct jobs.

**Why This Is Unacceptable**: Every change to PDF extraction risks breaking voice sessions. Every change to chat completion risks breaking file processing. This is the textbook definition of a maintenance nightmare. The class is untestable in isolation because its responsibilities are hopelessly entangled. It also holds mutable Maps of voice sessions and agents as instance state on a module-level singleton -- a recipe for stale state and memory leaks.

**The Fix**: Decompose into focused services:

```typescript
// Before: 1 god class
export class UnifiedAIServiceImpl {
  // 1687 lines doing everything
}

// After: focused, composable services
// services/ai/chat.service.ts
export class AIChatService {
  constructor(private readonly fetch: PlatformFetch) {}
  async chat(agent: AgentConfig, message: string, files?: FileMetadata[]): Promise<ProcessingResult> { ... }
}

// services/ai/voice.service.ts
export class AIVoiceService {
  constructor(private readonly chatService: AIChatService) {}
  async processVoiceInput(sessionId: string, audio: Blob): Promise<ProcessingResult> { ... }
}

// services/ai/file-processing.service.ts
export class FileProcessingService {
  async processFiles(files: File[]): Promise<FileMetadata[]> { ... }
  private async extractPDF(file: File): Promise<string> { ... }
  private async extractWordDoc(file: File): Promise<string> { ... }
  private async analyzeImage(file: File): Promise<ImageAnalysis> { ... }
}

// services/ai/agent-registry.ts
export class AgentRegistry {
  private readonly agents = new Map<string, AgentConfig>();
  get(id: string): AgentConfig | undefined { ... }
}
```

### C-2: Feature Flag updateFlagAdmin is Broken and Ships Anyway

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/config/feature-flag-service.ts`
**Lines**: 682-731

**The Problem**: The `updateFlagAdmin` method has a `TODO` comment explicitly stating "persistence is broken" -- the code calls `getConfig` (a read operation) where it should call a write operation. Flag updates are in-memory only and lost on page reload.

```typescript
// Line 703-708: This TODO has been shipping
// TODO: Persistence is broken -- the call below only READS from Key Vault
// but never WRITES the updated flag value back.
try {
  await keyVaultConfigService.getConfig(
    'feature-flag-' + key,
    'admin',
    userId
  );
```

**Why This Is Unacceptable**: An admin changes a feature flag, sees a success message, and the flag reverts on the next page load. This is not a bug -- it is a lie to the user. Shipping known-broken persistence with a TODO is the engineering equivalent of putting a "Wet Paint" sign on dry wall and walking away.

**The Fix**: Either implement the write path or remove the admin update functionality entirely until it works. Do not ship features that silently do nothing.

```typescript
// Option 1: Implement properly
async updateFlagAdmin(key: string, updates: Partial<FeatureFlag>, userId?: string): Promise<void> {
  const flag = this.flags.get(key);
  if (!flag) throw Errors.notFound('FeatureFlag', key);

  const updatedFlag = { ...flag, ...updates, key, lastModified: new Date(), modifiedBy: userId };
  this.flags.set(key, updatedFlag);
  this.clearCache();

  // Actually persist to Key Vault
  await keyVaultConfigService.setConfig(`feature-flag-${key}`, JSON.stringify(updatedFlag));
}

// Option 2: Be honest about the limitation
async updateFlagAdmin(): Promise<never> {
  throw Errors.internal('NOT_IMPLEMENTED', 'Feature flag persistence is not yet implemented');
}
```

### C-3: ProjectContext is a Monolithic Re-Render Bomb

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/contexts/project-context.tsx`
**Lines**: 538-592

**The Problem**: Unlike every other context in this codebase (which wisely split into stable/dynamic sub-contexts), `ProjectContext` stuffs everything into a single context value with a 20-item `useMemo` dependency array. Every time *anything* changes -- loading state, error, favorites, time tracking session, auto-fill data -- every consumer re-renders. Components that only care about `selectedProject` re-render when `currentTimeSession.isPaused` changes.

**Why This Is Unacceptable**: The other contexts demonstrate the team *knows* how to split contexts for render isolation. This one was skipped. Given that project selection is a global concept used by dozens of components, this is the most impactful context to optimize and the one that was left unoptimized.

**The Fix**: Apply the same split-context pattern used in `GeneralContext`, `RealtimeContext`, and `SidebarContext`:

```typescript
// Split into 3 sub-contexts:
// 1. ProjectSelectionContext: selectedProject, selectedProjectId, isFiltered (changes rarely)
// 2. ProjectMetadataContext: favorites, recentProjects, autoFillData (changes occasionally)
// 3. ProjectTimeTrackingContext: currentTimeSession, isTracking (changes frequently)
// 4. ProjectActionsContext: all callbacks (stable references, never causes re-renders)
```

---

## MAJOR Issues

### M-1: cacheService Calls Itself "Redis" But Is localStorage

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/services/cacheService.ts`
**Lines**: 64-66

**The Problem**: The function `isRedisConnected()` checks `typeof localStorage !== 'undefined'`. There is no Redis anywhere in this service. It is a localStorage wrapper with aspirational naming.

```typescript
export function isRedisConnected(): boolean {
  return isConnected && typeof localStorage !== 'undefined';
}
```

**Why This Matters**: Naming is the most important documentation. A developer seeing `isRedisConnected()` will assume a Redis dependency exists, will search for connection strings, will file infrastructure tickets. This wastes time and erodes trust in the codebase.

**The Fix**: Rename to what it actually is.

```typescript
export function isCacheAvailable(): boolean {
  return isConnected && typeof localStorage !== 'undefined';
}
```

### M-2: Raw `throw new Error` in Service Layer Violating Result Pattern

**File**: Multiple files in `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/services/`

**The Problem**: At least 19 instances of `throw new Error(...)` in the services directory, while the codebase otherwise uses the `Result<T, AppError>` pattern with `ok()`/`err()` from `@dom-mcp/domain`. Mixed error handling strategies mean callers cannot trust whether to use try/catch or Result unwrapping.

Key offenders:
- `browser-realtime-client.ts:406` - `throw new Error('Not connected to realtime service')`
- `client-request.service.ts:285,328,398` - Raw throws on HTTP failures
- `agentic-os-api.ts:153,160,164` - Multiple raw throws
- `audio-feedback.ts:110` - `throw new Error('Web Audio API is not supported')`
- `lead-factory-queue.ts:213,233,273,286` - Four instances of `throw new Error(result.error.message)` -- literally unwrapping a Result to throw it

**Why This Matters**: The `lead-factory-queue.ts` pattern is particularly egregious: the code receives a properly-typed `Result.err()`, extracts the message, wraps it in a generic `Error`, and throws it. This destroys the structured error information (error codes, context, severity) that `@dom-mcp/platform-errors` provides.

**The Fix**: Use `Errors.*` factories and return `Result` types consistently:

```typescript
// Before (lead-factory-queue.ts:213)
if (result.isErr()) {
  throw new Error(result.error.message);
}

// After
if (result.isErr()) {
  return err(result.error); // Propagate the structured error
}
```

### M-3: `as any` in Production Service Code

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/services/offline-data-manager.ts`
**Line**: 96

**The Problem**: `offlineCacheTable as any` in the database schema definition. This is not test code -- this is the production offline data manager.

```typescript
const offlineDb = createDatabase({
  name: 'alfred-offline-cache',
  version: 1,
  tables: {
    offline_cache: offlineCacheTable as any,  // <-- Type system defeated
  },
});
```

**Why This Matters**: The `as any` exists because the table definition type does not match what `createDatabase` expects. Instead of fixing the type mismatch at its source, the developer punched a hole in the type system. This means the compiler cannot catch schema errors, which in an offline database is how you lose user data.

**The Fix**: Fix the type definition in `@dom-mcp/platform-offline-db` to properly type `defineTable` return values, or create a proper type assertion that documents the constraint:

```typescript
// Type-safe assertion that documents the constraint
const offlineDb = createDatabase({
  name: 'alfred-offline-cache',
  version: 1,
  tables: {
    offline_cache: offlineCacheTable satisfies TableDefinition,
  },
});
```

### M-4: GeneralContext processInput Has Broken Indentation Hiding Control Flow

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/contexts/GeneralContext.tsx`
**Lines**: 270-293

**The Problem**: The `try` block at line 270 is indented one level less than the code above it, making the control flow deceptive. The `if (!selectedEntityId)` block at line 273 appears to be at the same level as the `try`, but it is actually inside it. This formatting bug makes it look like the conversational fallback runs outside error handling.

```typescript
      try {
      // Always try to answer conversationally first  <-- Wrong indentation
      if (!selectedEntityId) {
        const conversationResponse =
          await buildConversationalFallbackResponse(input);
```

**Why This Matters**: When code formatting lies about structure, bugs hide. A developer scanning this function will misunderstand the error handling boundaries.

**The Fix**: Fix the indentation to match the actual AST structure.

### M-5: Hooks Directory Has No Organizational Structure

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/hooks/`

**The Problem**: 100+ hook files dumped into a single directory with inconsistent naming conventions. Some use `use-kebab-case.ts`, others use `useCamelCase.ts`. There is a file called `USE_THEME_EXAMPLES.tsx` (screaming case, example code checked in). Subdirectories exist for `barracks/`, `data/`, `labour/`, `widgets/`, and `tests/` but the vast majority of hooks sit at the root level with no grouping.

**Why This Matters**: When a developer needs to understand what hooks exist for a domain (e.g., all safety-related hooks), they must scan 100+ files. Discovery is impossible. Duplication is invisible. `useApprovalQueue.ts` and `use-approval-queue.ts` both exist -- are they the same thing? Different? Nobody can tell without reading both.

**The Fix**: Organize by domain, enforce naming convention:

```
hooks/
  ai/           -> use-tanstack-chat.ts, use-voice-input.ts, use-chatbot-actions.ts
  barracks/     -> (already exists, good)
  project/      -> use-project-form.tsx, use-project-filtered-data.tsx
  safety/       -> use-safety-voice-commands.ts, use-safety-directives.ts
  workforce/    -> use-approval-queue.ts, use-bullish-placements.ts
  ui/           -> use-mobile.tsx, use-reduced-motion.ts, use-high-contrast.ts
  network/      -> use-network-status.ts, use-pwa.tsx, use-offline-sync.ts
  shared/       -> use-confirm.ts, use-toast.ts, use-persisted-state.ts
```

Remove `USE_THEME_EXAMPLES.tsx` -- examples belong in docs or Storybook, not in production source.

### M-6: Duplicate Hook Names With Different Casing

**Files**:
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/hooks/useApprovalQueue.ts`
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/hooks/use-approval-queue.ts`
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/hooks/tests/useAuth.test.tsx`
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/hooks/tests/use-auth.test.tsx`

**The Problem**: Two files for approval queue hooks and two test files for auth hooks. On case-insensitive filesystems (macOS default), this is a ticking time bomb. On case-sensitive filesystems, consumers importing `useApprovalQueue` vs `use-approval-queue` get different modules.

**Why This Matters**: This is how you get two implementations of the same hook that drift apart over time, creating inconsistent behavior depending on which import path a component chose.

**The Fix**: Pick one convention (kebab-case to match the majority of the codebase), delete the duplicate, update all imports.

---

## MINOR Issues

### N-1: Sidebar Test Asserts Against Wrong Storage Key After PLAN-04 Migration

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/contexts/tests/sidebar-context.test.tsx`
**Lines**: 104-134

**The Problem**: The sidebar test still asserts against `alfred-sidebar-collapsed` storage key (line 115), but PLAN-04 migrated collapsed state to `AppStateProvider` under `alfred-app-state`. The test may be passing coincidentally due to the mock localStorage, but it is testing a stale contract.

### N-2: UnifiedChatProvider `generateId()` Uses Weak Randomness

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/contexts/unified-chat-context.tsx`
**Lines**: 392-399

**The Problem**: ID generation concatenates `Date.now()` with a base-36 encoding of 9 random bytes, then slices to 9 characters. While `crypto.getRandomValues` is used (good), the truncation to 9 characters and concatenation with a timestamp produces IDs that are not UUIDs and could collide in high-throughput scenarios.

```typescript
function generateId(): string {
  return (
    Date.now().toString() +
    Array.from(crypto.getRandomValues(new Uint8Array(9)))
      .map(b => b.toString(36))
      .join('')
      .slice(0, 9)
  );
}
```

**The Fix**: Use `generateUUID()` from `@dom-mcp/platform-utilities` which is already imported elsewhere in the codebase.

### N-3: Voice Settings Provider Duplicates Web Speech API Fallback Code

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/contexts/voice-settings-context.tsx`
**Lines**: 186-205

**The Problem**: The Web Speech API utterance setup (lines 186-194 and 197-205) is duplicated verbatim. The catch block creates an utterance with the exact same configuration as the else branch.

**The Fix**: Extract to a helper function.

```typescript
const speakWithBrowserTTS = (text: string, rate: number) => {
  if (!synthRef.current) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  utterance.pitch = 1;
  utterance.volume = 0.8;
  utterance.onstart = () => setIsSpeaking(true);
  utterance.onend = () => setIsSpeaking(false);
  utterance.onerror = () => setIsSpeaking(false);
  synthRef.current.speak(utterance);
};
```

### N-4: Operations Context Creates URLSearchParams From Router State Redundantly

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/contexts/operations-context.tsx`
**Lines**: 90-106

**The Problem**: TanStack Router already provides parsed search params. The code manually reconstructs `URLSearchParams` from the router state, handling string and object cases. This is reimplementing what the router already does.

### N-5: Config Module Has `getConfigValue` Using Unsafe Dot-Path Access

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/config/index.ts`
**Lines**: 330-346

**The Problem**: `getConfigValue` uses `Reflect.get` with string-split dot paths and returns `T` via type assertion. There is no runtime validation that the value at the path matches type `T`. This is `any` with extra steps.

```typescript
export function getConfigValue<T = unknown>(config: AppConfig, path: string): T {
  // ...unsafe path traversal...
  return value as T;  // Trust me bro
}
```

**The Fix**: Either remove this function (callers should access config properties directly with TypeScript's type system) or use Zod to validate the return type.

---

## NITPICK Issues

- `cacheService.ts` exports functions like `cacheDashboardSession`, `getCachedDashboardSession`, `cacheChatHistory`, etc. -- this is 8 pairs of get/set wrappers that each add a string prefix. A single `getWithPrefix`/`setWithPrefix` would eliminate all of them.

- `config/logger.ts` is a 4-line file that re-exports `logger` from `@/utils/logger`. This is an unnecessary indirection layer.

- `shortlist-context.tsx` imports `React` (line 1) but never uses it as a namespace -- only named imports are used. The default import is dead.

- `operations-context.tsx` defines `DEFAULT_OPERATIONS_CONFIG` inside the component function body (line 125), meaning it is recreated on every render. Move it to module scope.

- `useNetworkStatus` hook creates a new `getNetworkStatus()` result object on every event, even if nothing changed. Should diff before updating state.

---

## What Doesn't Completely Suck

1. **Context split pattern is genuinely well-done**: `AppStateProvider`, `GeneralContext`, `UnifiedChatProvider`, `RealtimeProvider`, `SidebarProvider`, and `VoiceSettingsProvider` all correctly split into stable/dynamic (or actions/state) sub-contexts with individual `useMemo` wrappers. This prevents unnecessary re-renders and shows someone understood React internals deeply. The backwards-compatible hooks that merge the sub-contexts for legacy callers is a mature migration strategy.

2. **Zod validation at persistence boundaries**: `AppStateProvider`, `UnifiedChatProvider`, `SidebarProvider`, `ShortlistProvider`, `OperationsProvider`, and `VoiceSettingsProvider` all validate data read from localStorage through Zod schemas. This prevents corrupt storage from crashing the app -- a pattern many teams never implement.

3. **Environment validation is thorough**: `environment-validation.ts` is an 875-line fortress of Zod schemas with stage-specific requirements, sensitive-key guards that block API keys from VITE_ exposure, production mock-data guards, and HTTPS enforcement. The `VITE_OPENAI_API_KEY` hard block with migration guidance is exemplary security engineering.

4. **platform-http adoption**: The AI service, offline data manager, feature flag service, and AI agents API service all use `createPlatformFetch` or `BaseDashboardApiService` with retry, circuit breaker, and telemetry configurations. This is the canonical pattern done right.

5. **`usePersistedState` hook**: Used consistently across 6+ contexts for localStorage persistence with Zod validation, namespacing, and versioning. A well-designed primitive that the team has adopted widely.

6. **Error types use `@dom-mcp/platform-errors`**: Context hooks throw `Errors.validation()`, `Errors.configuration()`, etc. rather than raw strings. Structured error codes enable programmatic handling upstream.

---

## The Path to Greatness

1. **Decompose `UnifiedAIServiceImpl`** (Critical, Week 1): This is the highest-risk code in the dashboard. Break it into `AIChatService`, `AIVoiceService`, `FileProcessingService`, `AgentRegistry`, and `AudioConversionService`. Each should be independently testable with its own test file.

2. **Fix feature flag persistence or remove admin API** (Critical, Week 1): The broken `updateFlagAdmin` method is shipping a lie. Either implement Key Vault write-back or throw `Errors.internal('NOT_IMPLEMENTED')` so callers know the truth.

3. **Split ProjectContext into sub-contexts** (Critical, Week 2): Apply the same stable/dynamic split pattern used everywhere else. This is the most-consumed context and the only one still monolithic.

4. **Eliminate `throw new Error` from services** (Major, Week 2): Audit every `throw new Error` in the services directory. Replace with `return err(Errors.*(...))`  for functions that return `Result`, or `throw Errors.*(...)` for functions that legitimately throw.

5. **Organize hooks directory** (Major, Week 3): Create domain subdirectories, move hooks, update imports. Delete `USE_THEME_EXAMPLES.tsx`. Resolve the `useApprovalQueue`/`use-approval-queue` duplication.

6. **Rename cacheService Redis references** (Major, Week 3): `isRedisConnected` -> `isCacheAvailable`. Remove any other naming that implies infrastructure that does not exist.

7. **Fix GeneralContext indentation** (Minor, Week 3): Run the formatter on the file and fix the misleading indentation in `processInput`.

---

## Commands to Verify Fixes

```bash
# Type check (CRITICAL: requires heap size override)
NODE_OPTIONS="--max-old-space-size=24576" bun run type-check

# Lint the dashboard
bun run lint:fast

# Run dashboard tests
bun test --filter alfred-web-dashboard

# Build to verify no regressions
NODE_OPTIONS="--max-old-space-size=24576" bun run build --filter alfred-web-dashboard
```

---

## Final Verdict

This codebase has a sophisticated foundation -- the context splitting pattern, the Zod-validated persistence, the environment security guards. Someone with real taste built the architecture. But that architecture is being buried under the weight of a services layer that never got the same love. A 1,687-line AI god-class, broken feature flag persistence shipping with a TODO, a cache service cosplaying as Redis, 100+ hooks dumped in a single directory with duplicate names -- this is what happens when you build a cathedral and let everyone add their own shed to the side.

The path from here to great is clear: decompose the god class, fix the broken persistence, apply the context split pattern you already invented to the one context that needs it most, and organize the hooks. The team has proven they can build excellent infrastructure -- they just need to hold *every* file to the standard they already set in their best files.

> "Quality is more important than quantity. One home run is much better than two doubles." -- Steve Jobs

This codebase has hit some home runs. Now stop hitting doubles.
