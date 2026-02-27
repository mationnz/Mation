# Steve Jobs Audit Report

**Target**: Agent Chat Implementation (`/agents/chat`) -- 5 files, ~5,500 lines
**Date**: 2026-02-26
**Verdict**: This is not an architecture. It is a landfill with a React component on top.

---

## Executive Summary

The agent chat feature is a 1,390-line God Component (`agent-chat-shell.tsx`) that fetches 12 unrelated API endpoints in a single `useEffect`, defines 12 nearly-identical record interfaces and 12 nearly-identical builder functions, and communicates with its children via `window.dispatchEvent(new CustomEvent(...))` -- a pattern the codebase's own context file *admits it was supposed to replace*. The backing hook (`use-agent-chat.ts`) infers conversation phases by string-matching on phrases like "let me check" and "I'm setting up." The `ChatShell.tsx` at 1,440 lines imports `getAgentSuggestions` directly from a page-level component, creating a dependency inversion so flagrant it should be in a textbook under "what not to do." The people who built this were thinking about shipping. They should have been thinking about whether anyone could maintain what they shipped.

---

## CRITICAL Issues

### 1. God Component: `agent-chat-shell.tsx` (1,390 lines)

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/pages/ai/agent-chat-shell.tsx`
**Lines**: 1-1390 (the whole file)

**The Problem**: A single React component that:
- Defines 12 record interfaces (lines 99-206)
- Defines 12 `build*Entities` functions (lines 265-670)
- Defines 4 custom `extract*Payload` functions (lines 390-601) that are 80% identical
- Manages 12 independent `useState` hooks for entity state (lines 857-878)
- Fires 12 parallel API calls in one `useEffect` (lines 918-1124)
- Contains 120 lines of static suggestion data (lines 686-829)
- Contains 45 lines of static display metadata (lines 47-97)
- Contains 8 static workflow navigation entities (lines 208-249)
- Has a `handleBeforeSendMessage` callback with **16 dependencies** (lines 1227-1348)

This is not a component. This is an entire application crammed into a function.

**Why This Is Unacceptable**: Every state change in any of those 12 entity arrays triggers a memoization recheck on `handleBeforeSendMessage`. Every render re-evaluates the closure over 16 captured variables. New entity types require touching this one file in 5+ places (interface, builder, state hook, API call, response handler, dependency array). The cognitive load is enormous and the blast radius of any change is the entire file.

**The Fix**: Extract into three layers:

```
pages/ai/
  agent-chat-shell.tsx          -- ~80 lines: composition root, props to ChatShell
  hooks/
    use-navigation-entities.ts  -- single hook: fetches, builds, returns all entities
    use-agent-resolution.ts     -- resolves agent from catalog + display meta
  data/
    agent-display-meta.ts       -- AGENT_DISPLAY_META, DEFAULT_META, AGENT_SUGGESTIONS
    entity-builders.ts          -- generic buildEntities<T>() + extractPayload<T>()
    workflow-nav-entities.ts    -- WORKFLOW_NAV_ENTITIES
```

The page component should look like:

```tsx
export function AgentChatShellPage() {
  const agent = useAgentResolution();
  const entities = useNavigationEntities();
  const actions = useChatPageActions(agent, entities);

  return (
    <ChatPageContext.Provider value={actions}>
      <ChatShell agentId={agent.id} {...ORCHESTRATED_CHAT_PROPS} ... />
    </ChatPageContext.Provider>
  );
}
```

80 lines. Not 1,390. That is the difference between a product and a prototype.

---

### 2. CustomEvent Bus: Pretending to Have Replaced It

**Files**:
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/pages/ai/agent-chat-shell.tsx` (lines 1217-1225)
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/pages/ai/chat-sidebar-content.tsx` (lines 746-749)
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/components/chat/ChatShell.tsx` (lines 612-635)
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/pages/ai/chat-page-context.tsx` (lines 4-5)

**The Problem**: The `ChatPageContext` file literally says in its docstring: "Replaces the previous CustomEvent bus (`chat:insert-prompt`, `chat:new-conversation`) with explicit, typed, testable methods." And yet:

- `agent-chat-shell.tsx` line 1219: `window.dispatchEvent(new CustomEvent('chat:insert-prompt', ...))`
- `agent-chat-shell.tsx` line 1224: `window.dispatchEvent(new CustomEvent('chat:new-conversation'))`
- `chat-sidebar-content.tsx` line 748: `window.dispatchEvent(new CustomEvent('chat:insert-prompt', ...))`
- `ChatShell.tsx` lines 629-630: Still listens on `window` for both events
- `CoPilotPanel.tsx` line 67: Dispatches `chat:insert-prompt` via CustomEvent

The context exists. The context is provided. The context is *not used for the thing it was created to do*. The comment says "Replaces." The code says "Supplements, at best."

**Why This Is Unacceptable**: `CustomEvent` on `window` is:
- Untyped at the boundary (cast to `CustomEvent<{ text: string }>` manually)
- Untraceable in tooling (no "Find References" for event names)
- Untestable without DOM simulation
- A global side channel that any component anywhere can fire into

The ChatPageContext was the correct fix. It was created and then abandoned at the finish line.

**The Fix**: Complete the migration. `ChatShell` should accept `onInsertPrompt` and `onNewConversation` as props or consume `useChatPageActions()`. The sidebar should use the context it already wraps itself in. Kill every `window.dispatchEvent(new CustomEvent('chat:...'))` call. There should be zero references to these event names outside of tests and a migration comment.

---

### 3. Circular Dependency: ChatShell Imports from Page

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/components/chat/ChatShell.tsx`
**Line**: 132

**The Problem**:

```typescript
import { getAgentSuggestions } from '@/pages/ai/agent-chat-shell';
```

A **shared component** (`components/chat/ChatShell.tsx`) imports from a **page** (`pages/ai/agent-chat-shell.tsx`). This inverts the entire dependency hierarchy. Components are supposed to be used BY pages, not reach up into them.

This means:
- `ChatShell` cannot be used on any page without importing all 1,390 lines of `agent-chat-shell.tsx` and its transitive dependencies
- Tree-shaking cannot eliminate the page code even when ChatShell is used in a different context
- Any circular dependency analyzer will flag this (pages import components, components import pages)

**Why This Is Unacceptable**: This is the architectural equivalent of a foundation depending on the roof. It makes the shared component non-portable and creates a hidden coupling that will break the moment someone tries to reuse ChatShell outside the agent chat page.

**The Fix**: Move `getAgentSuggestions` to a shared service:

```
services/ai/agent-suggestions.ts   -- AGENT_SUGGESTIONS map + getAgentSuggestions()
```

ChatShell imports from `@/services/ai/agent-suggestions`. Page imports from `@/services/ai/agent-suggestions`. No circular dependency. Direction of dependency flows downward.

---

### 4. Phase Inference via Content Heuristics

**File**: `/Users/cameronrussell/code/alfred/libs/kits/tanstack-ai/src/hooks/use-agent-chat.ts`
**Lines**: 199-245

**The Problem**:

```typescript
function inferPhaseFromContent(content: string, currentPhase: AgentPhase): AgentPhase {
  const lowerContent = content.toLowerCase();

  if (lowerContent.includes('what would you like') || lowerContent.includes('how can i help')) {
    return 'goal_setting';
  }
  if (lowerContent.includes('analyzing') || lowerContent.includes('let me check')) {
    return 'analysis';
  }
  if (lowerContent.includes('creating') || lowerContent.includes("i'm setting up")) {
    return 'execution';
  }
  // ...
}
```

The conversation phase -- a critical piece of agent state that controls UI rendering, suggestions, and specialist routing -- is determined by checking whether the AI's response contains the word "analyzing." If the AI says "I'm not analyzing anything right now," this function returns `'analysis'`.

**Why This Is Unacceptable**: This is substring matching pretending to be intelligence. It is:
- Fragile: Any change to the LLM's wording breaks phase transitions
- False-positive prone: Negations, quotes, and user content are all matched
- Untestable in any meaningful way: What is the spec? "The phase should change when the AI says certain words"?
- A maintenance trap: Every new phase requires new magic strings

**The Fix**: The orchestrator should return phase metadata in the stream response. The server knows what phase the conversation is in. Transmit it as structured data:

```typescript
// In stream events:
case 'phase':
  actions.setPhase(event.data.phase);
  break;
```

If server-side phase tracking is not yet available, at minimum use a structured annotation in the response (e.g., `<!-- phase:analysis -->`) that the LLM is prompted to include, rather than hoping the natural language contains your trigger words.

---

## MAJOR Issues

### 5. 12x Duplicated Extract/Build Pattern

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/pages/ai/agent-chat-shell.tsx`
**Lines**: 251-670

**The Problem**: There are 4 custom `extract*Payload` functions (`extractDocumentPayload`, `extractIncidentPayload`, `extractAlertsPayload`, `extractReportsPayload`) that all do nearly the same thing: check if the response is an array, check for `.data`, check for a named key. They differ only in the named key (`documents`, `incidents`, `reports`).

Meanwhile, `extractArrayPayload<T>` already exists (line 251) and handles the `Array.isArray` and `.data` cases. The custom extractors exist solely to handle one additional nested key per entity type.

The 12 `build*Entities` functions are also structurally identical: extract array, map to `{ id, name, aliases }`, filter nulls. The only variation is which fields become `name` and which become `aliases`.

**Why This Matters**: 420 lines of code that could be ~40. Every new entity type requires copy-pasting a function and modifying field names. This is not DRY. This is DRENCHED.

**The Fix**: One generic function:

```typescript
interface EntityFieldMapping<T> {
  id: (record: T) => string | undefined;
  name: (record: T) => string | undefined;
  aliases?: (record: T) => (string | undefined | null)[];
  routePath?: (record: T) => string | undefined;
}

function buildEntitiesFromPayload<T>(
  payload: unknown,
  mapping: EntityFieldMapping<T>,
  namedArrayKey?: string  // 'documents', 'incidents', etc.
): ActionEntity[] {
  const records = extractPayload<T>(payload, namedArrayKey);
  return records
    .map(record => {
      const id = mapping.id(record)?.trim();
      const name = mapping.name(record)?.trim();
      if (!id || !name) return null;
      return {
        id,
        name,
        aliases: mapping.aliases?.(record)?.filter(Boolean as unknown as (v: unknown) => v is string) ?? [],
        routePath: mapping.routePath?.(record),
      };
    })
    .filter(Boolean) as ActionEntity[];
}
```

Then each entity type is a 5-line config object, not a 30-line function.

---

### 6. 12 Parallel API Calls in a Single useEffect

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/pages/ai/agent-chat-shell.tsx`
**Lines**: 918-1124

**The Problem**: One `useEffect` fires 12 `apiFetch.standard()` calls via `Promise.allSettled`, then checks each result individually with 12 near-identical `if (response.status === 'fulfilled' && response.value.ok)` blocks, each calling `.json()` and then a builder function. This is 200 lines of boilerplate.

Additionally:
- All 12 calls fire on mount, regardless of whether the user needs those entities
- There is no caching -- navigating away and back re-fetches everything
- There is no loading state -- the user has no idea 12 API calls are in flight
- The dependency array is `[getToken, user?.id, user?.userId]`, meaning any auth change re-fires all 12

**Why This Matters**: This is a page that hammers the API with 12 simultaneous requests on every mount. On mobile connections, this competes with the actual chat streaming for bandwidth. Most of these entities (dominion workers, incident records) may never be needed in the current session.

**The Fix**:

1. Extract to a `useNavigationEntities()` hook
2. Use React Query (`@tanstack/react-query`) for caching and deduplication
3. Lazy-load entity types: only fetch when the user's chat input matches a deep-link pattern
4. At minimum, batch into a single BFF endpoint: `GET /api/v1/chat/entity-catalog`

---

### 7. SIDEBAR_AGENTS Duplicates AGENT_DISPLAY_META

**Files**:
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/pages/ai/chat-sidebar-content.tsx` (lines 66-102)
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/pages/ai/agent-chat-shell.tsx` (lines 47-91)
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/services/ai/agent-configs.ts`

**The Problem**: Agent identity (id, name, icon, color) is defined in three places:
1. `AGENT_DISPLAY_META` in `agent-chat-shell.tsx` -- icons, headerColor, welcomeColor
2. `SIDEBAR_AGENTS` in `chat-sidebar-content.tsx` -- id, name, slug, icon, color
3. `AGENT_CONFIGS` in `agent-configs.ts` -- id, name, description, capabilities

Adding a new agent requires updating all three. They can drift. The sidebar says "Cost Expert" while the display meta has no opinion on names. `AGENT_CONFIGS` says "Safety Compliance Specialist" but the sidebar says "Safety Specialist."

**Why This Matters**: Three sources of truth is zero sources of truth. This will drift. It already has.

**The Fix**: Single canonical agent registry:

```typescript
// services/ai/agent-registry.ts
export const AGENT_REGISTRY: AgentRegistryEntry[] = [
  {
    id: 'safety-agent',
    name: 'Safety Compliance Specialist',
    shortName: 'Safety Specialist',   // for sidebar
    slug: 'safety',
    icon: 'ShieldCheck',
    headerColor: '#ef4444',
    welcomeColor: 'bg-red-500',
    sidebarColor: 'text-red-500',
    description: '...',
    capabilities: [...],
    chatEligible: true,
  },
  // ...
];
```

One file. One truth. Everyone reads from it.

---

### 8. `useAgentChat` Wrapper Adds Minimal Value Over `useTanStackChat`

**File**: `/Users/cameronrussell/code/alfred/libs/kits/tanstack-ai/src/hooks/use-agent-chat.ts`
**Lines**: 357-635

**The Problem**: `useAgentChat` wraps `useTanStackChat` and adds:
- Phase inference (broken, see Issue #4)
- Entity extraction via regex (lines 250-302) that only finds connector names and action verbs
- Wrapper callbacks (`activateSpecialist` wraps `actions.activateSpecialist` and adds an event emit)
- A `useMemo` that rebuilds `chatOptions` on every phase or activeSpecialists change (which means the chat body changes, which could trigger re-connection depending on the adapter)

The wrapper callbacks on lines 502-580 are pure delegation + event emission:

```typescript
const activateSpecialist = useCallback(
  (specialistId: string) => {
    actions.activateSpecialist(specialistId);       // delegation
    events?.emit('onSpecialistActivate', { id: specialistId });  // event
  },
  [actions, events]
);
```

This is the same pattern repeated 5 times. It adds one line of logic per wrapper.

**Why This Matters**: The abstraction does not simplify -- it obscures. Consumers must understand both `useAgentChat` and `useTanStackChat` to debug issues. The `chatOptions` useMemo has 20 dependencies, meaning the options object is recreated frequently, potentially causing unnecessary re-subscriptions.

**The Fix**: Either make `useAgentChat` genuinely valuable (server-driven phases, real entity extraction, conversation memory) or eliminate it and have consumers use `useTanStackChat` directly with a small `useAgentEvents` middleware hook for the observability emit pattern.

---

### 9. Entity Extraction is Cargo Cult NLP

**File**: `/Users/cameronrussell/code/alfred/libs/kits/tanstack-ai/src/hooks/use-agent-chat.ts`
**Lines**: 250-302

**The Problem**:

```typescript
function extractEntitiesFromContent(content: string): Array<{ type: string; value: string; confidence: number }> {
  const connectorPatterns = [/\b(procore|teams|slack|jira|sharepoint|azure|onedrive|dropbox)\b/gi];
  const triggerPatterns = [/\b(scheduled?|webhook|daily|weekly|monthly|on\s+(?:new|update|delete))\b/gi];
  const actionPatterns = [/\b(send|get|fetch|create|update|delete|notify|alert|sync)\b/gi];
  // ...
}
```

This claims to "extract entities" with hardcoded confidence scores (0.8, 0.7, 0.6). The word "send" in any context gets tagged as an "action" entity with 0.6 confidence. "Can you send me the report?" extracts `{type: 'action', value: 'send', confidence: 0.6}`. Meaningless.

**Why This Matters**: These extracted entities are pushed to the agent store via `actions.addEntity()`. If anything downstream uses them for decision-making, it is making decisions based on glorified string.includes(). The confidence numbers are fiction.

**The Fix**: Remove this entirely or replace with server-side NER that returns structured entities with real confidence scores. Do not pretend regex is intelligence.

---

## MINOR Issues

### 10. handleBeforeSendMessage is a Navigation Router Inside a Chat Handler

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/pages/ai/agent-chat-shell.tsx`
**Lines**: 1227-1348

**The Problem**: This callback contains an entire navigation state machine: history detection, ambiguous match handling, suggestion fallback, parameterized deep-linking, and direct navigation. It has 16 dependency array entries. It is the most complex callback in the file and it is only loosely related to "chat."

**The Fix**: Extract to `useNavigationInterceptor(entities)` hook that returns a `(content: string) => Promise<boolean>` handler. The page just passes it: `onBeforeSendMessage={navigationInterceptor}`.

---

### 11. Redundant `isMounted` Checks After `AbortController`

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/pages/ai/agent-chat-shell.tsx`
**Lines**: 1000-1109

**The Problem**: The code uses both `controller.abort()` in cleanup AND manual `isMounted` flag checks. The `AbortController.signal` already handles cancellation -- if the fetch is aborted, the `.json()` call will throw, and the catch block already handles `AbortError`. The `isMounted` flag is redundant with the `AbortController` pattern.

**The Fix**: Remove `isMounted`. The `AbortController` is sufficient. If you are paranoid about the `.json()` call succeeding after abort (it will not), a single check after `Promise.allSettled` is enough.

---

### 12. `useMemo(() => WORKFLOW_NAV_ENTITIES, [])` is Useless

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/pages/ai/agent-chat-shell.tsx`
**Line**: 879

**The Problem**:

```typescript
const workflowEntities = useMemo(() => WORKFLOW_NAV_ENTITIES, []);
```

`WORKFLOW_NAV_ENTITIES` is a module-level constant. Its reference never changes. Wrapping it in `useMemo` with an empty dependency array does nothing. It is the same reference on every render regardless.

**The Fix**: `const workflowEntities = WORKFLOW_NAV_ENTITIES;`

---

### 13. `AGENT_SUGGESTIONS_BY_ID` Map is Unnecessary Indirection

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/pages/ai/agent-chat-shell.tsx`
**Lines**: 831-841

**The Problem**:

```typescript
const AGENT_SUGGESTIONS: Record<string, Suggestion[]> = { ... };
const AGENT_SUGGESTIONS_BY_ID = new Map<string, Suggestion[]>(Object.entries(AGENT_SUGGESTIONS));

export function getAgentSuggestions(agentId: string) {
  return AGENT_SUGGESTIONS_BY_ID.get(agentId) ?? AGENT_SUGGESTIONS_BY_ID.get('general-ai') ?? [];
}
```

A `Record<string, Suggestion[]>` is already a lookup by string key. Converting it to a `Map` adds no value -- object property lookup is O(1) for string keys. This is two data structures for one purpose.

**The Fix**: Use the Record directly: `return AGENT_SUGGESTIONS[agentId] ?? AGENT_SUGGESTIONS['general-ai'] ?? [];`

---

### 14. ChatShell at 1,440 Lines is Its Own God Component

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/components/chat/ChatShell.tsx`

**The Problem**: While not the primary audit target, this file is also 1,440 lines and handles: message state management (via `useReducer`), streaming orchestration, voice recording, file upload, canvas rendering, tool call tracking, artifact management, suggestion chips, UI spec resolution, command palette, and CustomEvent listeners.

**Why This Matters**: Two 1,400-line files connected by a circular dependency is not an architecture. It is two problems pretending to be a solution.

**The Fix**: This deserves its own audit, but at minimum: extract the streaming orchestration into `useChatStreaming()`, extract canvas management into `useChatCanvas()`, extract the reducer into a separate file. Target: ChatShell.tsx under 400 lines.

---

## NITPICK Issues

- **Inconsistent color formats**: `AGENT_DISPLAY_META` uses hex for `headerColor` and Tailwind class for `welcomeColor`. Pick one system. The `AgentDisplayInfo.color` field is overloaded to mean both depending on which code path creates it (line 1158 vs 1166).

- **`router as { routeTree?: unknown }`**: Line 884 casts the router to access `routeTree`. This is reaching into framework internals. If `routeTree` is not part of the public API, this will break on a TanStack Router upgrade.

- **Dead import potential**: `CHAT_ELIGIBLE_AGENT_IDS` (line 673) filters agents but is a static Set defined next to the dynamic `catalog` state. If the catalog API ever returns eligibility information, this Set becomes a lie.

- **`resolvedAgents` useMemo depends only on `[catalog]`**: Line 1147. But it also reads `AGENT_CONFIGS` and `AGENT_DISPLAY_META` which are module-level constants. This is correct but misleading -- a reader might wonder why `AGENT_CONFIGS` is not in the dependency array.

---

## What Does Not Completely Suck

1. **The `ChatPageContext` pattern is correct in concept** (file: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/pages/ai/chat-page-context.tsx`). A typed React context with a `useChatPageActions()` hook that throws if used outside the provider. This is the right pattern. It just was not followed through.

2. **`extractArrayPayload<T>` is a good generic** (line 251). The generic version handles the common `Array | { data: Array }` shape correctly. It should have been used everywhere instead of spawning 4 custom extractors.

3. **The `SidebarSection` abstraction** (`chat-sidebar-content.tsx` lines 284-326) is clean. Configurable, composable, handles customize mode. This is what good component design looks like.

4. **`NavigationIntentService`** is genuinely sophisticated: compiled regex patterns, Levenshtein fuzzy matching, semantic concept mapping, visit frequency personalization, plugin route registration. It is well-structured as a service module. The problem is not its quality but its coupling to 12 entity types in the page component.

5. **Tests exist** for the page component, context, sidebar, and welcome screen. The test infrastructure is in place even if the code under test is hard to test.

---

## The Path to Greatness

1. **Extract entity loading into `useNavigationEntities()` hook** -- This single change eliminates 500+ lines from `agent-chat-shell.tsx`, creates a testable/cacheable unit, and opens the door to lazy loading. Priority: immediate.

2. **Create a generic `buildEntitiesFromPayload<T>()` function** -- Replace 12 builder functions and 4 custom extractors with one generic. 400 lines become 40. Priority: immediate.

3. **Complete the CustomEvent-to-Context migration** -- The context exists. Use it. Kill every `window.dispatchEvent(new CustomEvent('chat:...'))`. Priority: this week.

4. **Break the circular dependency** -- Move `getAgentSuggestions` out of the page file. ChatShell must not import from pages. Priority: this week.

5. **Create a single agent registry** -- Merge `AGENT_DISPLAY_META`, `SIDEBAR_AGENTS`, and `AGENT_CONFIGS` into one source of truth. Priority: next sprint.

6. **Replace phase inference with server-side phase metadata** -- Substring matching is not a production phase detection system. Priority: next sprint.

7. **Extract navigation interception from handleBeforeSendMessage** -- This is a routing concern, not a chat concern. Separate hook. Priority: next sprint.

8. **Add React Query for entity caching** -- Stop re-fetching 12 endpoints on every page mount. Priority: next sprint.

9. **Audit and decompose ChatShell.tsx** -- 1,440 lines of UI logic is 1,000 too many. Priority: following sprint.

10. **Delete `extractEntitiesFromContent`** -- Regex is not NER. Either build real extraction or stop pretending. Priority: whenever someone has the courage.

---

## Commands to Verify Fixes

```bash
# Type check (REQUIRED: set heap size for this monorepo)
NODE_OPTIONS="--max-old-space-size=24576" bun run type-check

# Lint
bun run lint:fast

# Test the affected packages
bun test --filter alfred-web-dashboard

# Test the tanstack-ai kit
bun test --filter tanstack-ai

# Verify no circular dependency (if a tool is configured)
bun run check:circular 2>/dev/null || echo "No circular dependency checker configured -- add one."

# Build
NODE_OPTIONS="--max-old-space-size=24576" bun run build --filter alfred-web-dashboard
```

---

## Final Verdict

This feature works. A three-legged horse also works. It gets from A to B, and if you do not look too closely at how it moves, you might even be impressed by the distance it covers. But we are not in the business of three-legged horses.

The bones are here: the context pattern, the navigation intent service, the test infrastructure, the streaming architecture. Someone cared about the right things at the design level and then drowned the design in implementation shortcuts. Twelve copy-pasted entity types. A Custom Event bus that was supposedly replaced. A phase system that parses English prose with `string.includes()`.

The path from here to great is not a rewrite. It is discipline. Extract what should be extracted. Delete what should be deleted. Finish what was started. Every line of code in that 1,390-line file that is not directly about rendering the chat page is a line that should live somewhere else.

Ship it when it is right. Not when it compiles.

> "Details matter. It's worth waiting to get it right." -- Steve Jobs
