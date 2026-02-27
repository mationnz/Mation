# Steve Jobs Audit Report

**Target**: `apps/alfred-web-dashboard/src/components/` and `apps/alfred-web-dashboard/src/modules/` (recursive)
**Date**: 2026-02-18
**Verdict**: This is 480K lines of code pretending to be a product. It is a graveyard of good intentions buried under an avalanche of unchecked complexity.

---

## Executive Summary

The dashboard contains **764 component files** and **~480K lines** of TypeScript/TSX across components and modules. Test coverage is abysmal: **54 test files for 764 components** (7% file coverage). Giant monolith components routinely exceed 1,000 lines. Mock data is hardcoded inline. `confirm()` dialogs are used instead of proper UI. Template literal classNames are sprinkled throughout instead of `cn()`. The `any` type appears **66 times** across the audit scope. `console.*` calls persist in **18 files**. There is talent here -- the VirtualDataTable, the error boundaries, and the streaming chat architecture show real craft -- but it is drowning in a sea of shortcuts and deferred decisions.

---

## CRITICAL Issues

### 1. The 2,063-Line God Component: TodaysFocusWorkspace

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/components/dashboard/todays-focus-workspace.tsx`
**Lines**: 1-2063

**The Problem**: This single component contains an email client, a calendar app, a task manager, a notification center, AND a chat interface. It manages **23 separate useState hooks**. It has its own normalizer functions, its own travel-time estimator, its own date formatters, its own API fetch layer. Line 1 literally begins with `/* eslint-disable max-lines */` -- the developer knew this was wrong and chose to silence the linter rather than fix the architecture.

**Why This Is Unacceptable**: This file is unmaintainable. No single developer can hold 2,063 lines of interleaved domain logic in their head. Every feature change requires understanding the entire file. Testing any sub-feature requires mocking the entire component. The `estimateTravelMinutes` function (lines 422-458) hardcodes Auckland suburb names and rush-hour multipliers directly into the component -- business logic living inside a React render tree.

**The Fix**: Decompose into 5 focused modules:

```
dashboard/
  todays-focus-workspace/
    TodaysFocusWorkspace.tsx          # ~80 lines, orchestrator only
    tabs/
      EmailTab.tsx                     # Email list + filters
      CalendarTab.tsx                  # Events list + travel
      TasksTab.tsx                     # Task signals
      NotificationsTab.tsx             # Notification feed
      ChatTab.tsx                      # Streaming chat
    dialogs/
      EmailDetailDialog.tsx
      EventDetailDialog.tsx
    hooks/
      useWorkspaceEmails.ts            # Email fetch + normalize
      useWorkspaceCalendar.ts          # Calendar fetch + normalize
      useWorkspaceNotifications.ts     # Notification fetch
      useWorkspaceChat.ts              # Chat streaming logic
    utils/
      normalizers.ts                   # normalizeEmail, normalizeCalendarEvent, etc.
      travel-estimator.ts              # estimateTravelMinutes
      formatters.ts                    # formatAbsoluteTime, formatEventRange, etc.
```

Each tab component gets its own file. Each data concern gets its own hook. The normalizers and business logic get their own modules with proper test coverage.

---

### 2. The 1,744-Line Command Palette With Hardcoded Navigation Maps

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/components/command-palette/CommandPalette.tsx`
**Lines**: 1-1744

**The Problem**: Lines 155-417 are **262 lines of hardcoded navigation alias keyword maps**. Five separate `Map<string, readonly string[]>` constants (`LABOUR_COMMAND_ALIAS_KEYWORDS`, `INTELLIGENCE_COMMAND_ALIAS_KEYWORDS`, `CRM_COMMAND_ALIAS_KEYWORDS`, `QUALITY_COMMAND_ALIAS_KEYWORDS`, `DOMAIN_UI_COMMAND_ALIAS_KEYWORDS`) define static routing data that should live in configuration, not in a UI component file. Lines 419-557 add another 138 lines of static command index entries. That is 400 lines of data before a single line of component logic.

**Why This Is Unacceptable**: Every time a new page is added to the application, a developer must find this file, add entries to multiple Maps, and hope they do not introduce a duplicate href. The search index is rebuilt on every render of the palette. The keyword aliases are not validated -- a typo in an href silently breaks navigation. This is configuration masquerading as code.

**The Fix**:

```typescript
// config/command-palette-registry.ts
import { z } from 'zod';

const CommandAliasSchema = z.object({
  href: z.string().startsWith('/'),
  aliases: z.array(z.string().min(1)),
  category: z.string().optional(),
});

export const COMMAND_ALIASES = z.array(CommandAliasSchema).parse([
  { href: '/labour-operations', aliases: ['labour dashboard', '/labour-dashboard'] },
  // ... all aliases in one validated registry
]);

export function getSearchKeywordsForHref(href: string): string[] {
  return COMMAND_ALIASES
    .filter(entry => entry.href === href)
    .flatMap(entry => entry.aliases);
}
```

Move all static data into a validated configuration file. The CommandPalette component should import pre-built indexes, not construct them.

---

### 3. Hardcoded Mock Data in Production Dashboard Components

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/modules/quality/pages/QualityControlDashboard.tsx`
**Lines**: 43-273

**The Problem**: 230 lines of hardcoded `MOCK_ITPS`, `MOCK_INSPECTIONS`, and `MOCK_DEFECTS` data are defined at the top of a production page component. The comment on line 41 says `TODO: Migrate to centralized mock data from quality-vault-mock-data.ts`. This TODO has not been addressed. The chart data transforms on lines 279-339 operate directly on these module-scoped constants.

**Why This Is Unacceptable**: This page renders identically for every user in every environment. There is no data fetching, no loading state for real data, no API integration. It is a static demo page that looks like a production feature. Users see fake "Auckland Electrical Co" inspection data and think it is their data.

**The Fix**: Either:
1. Connect to real data via GraphQL hooks (the quality module already has an Apollo client at `modules/quality/services/apollo-client.ts`)
2. Clearly gate this behind a demo/preview flag and visually indicate mock data to users
3. Move mock data to `__mocks__/` or `data/` directories and import conditionally

---

### 4. 12 `any` Types in Apollo Client Configuration

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/modules/quality/services/apollo-client.ts`
**Lines**: Throughout (12 occurrences)

**The Problem**: The GraphQL client configuration -- one of the most security-sensitive files in the application -- contains 12 uses of `any`. This file handles authentication token refresh, WebSocket connections, error recovery, and offline-first caching. Every `any` is a door left unlocked.

**Why This Is Unacceptable**: The auth token refresh flow parses untrusted server responses. The error link handles operation contexts. The offline cache deals with persisted data of unknown shape. These are exactly the places where type safety matters most.

**The Fix**: Replace each `any` with proper types:

```typescript
// Before
const context = operation.getContext() as any;

// After
interface AuthOperationContext {
  authRefreshRetried?: boolean;
  headers?: Record<string, string>;
}
const context = operation.getContext() as AuthOperationContext;
```

---

## MAJOR Issues

### 5. `window.confirm()` Used for Destructive Actions

**Files**:
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/components/chat/chat-history-sidebar.tsx` (lines 85, 113)
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/components/chat/enhanced-chat-interface.tsx` (line 331)
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/components/dashboard/dashboard-editor.tsx` (line 1345)
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/components/surfaces/SurfaceRenderer.tsx` (line 633)
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/components/pwa/service-worker-update-prompt.tsx` (line 44)

**The Problem**: 8 instances of `window.confirm()` or `confirm()` for destructive actions like deleting chat history and clearing dashboards. These browser-native dialogs are unstylable, have no brand consistency, break the visual language of the application, and are synchronous (blocking the main thread).

**Why This Matters**: The application already has a `ConfirmDialog` component at `components/ui/confirm-dialog.tsx`. There is literally a purpose-built component sitting unused while the codebase reaches for the browser primitive.

**The Fix**:

```typescript
// Before (chat-history-sidebar.tsx:85)
if (confirm('Are you sure you want to delete this chat?')) {
  deleteSession(sessionId);
}

// After
const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

<ConfirmDialog
  open={confirmDelete !== null}
  onConfirm={() => {
    if (confirmDelete) deleteSession(confirmDelete);
    setConfirmDelete(null);
  }}
  onCancel={() => setConfirmDelete(null)}
  title="Delete Chat"
  description="This action cannot be undone."
  variant="destructive"
/>
```

---

### 6. Template Literal className Strings Instead of cn()

**Files**: 502 occurrences across 169 files in `components/`

**The Problem**: Massive use of `` className={`some-class ${condition ? 'a' : 'b'}`} `` instead of the utility `cn()` from `@/lib/utils`. The `cn()` utility (which wraps `clsx` + `tailwind-merge`) exists specifically to handle conditional classes, merge conflicting Tailwind utilities, and handle undefined/falsy values gracefully.

**Examples**:

```typescript
// chat-history-sidebar.tsx:144
<Card className={`h-full flex flex-col ${className}`}>

// chat-history-sidebar.tsx:222-225
className={`group ${
  compact ? 'relative px-2 py-1.5' : 'p-3'
} rounded-md cursor-pointer transition-colors hover:bg-muted/50 ${
  currentSession?.id === session.id ? 'bg-muted' : ''
}`}
```

**Why This Matters**: Template literals do not handle Tailwind class conflicts. If `className` contains `p-4` and the template adds `p-3`, both are applied and the result is unpredictable. `cn()` deduplicates and resolves these conflicts. Additionally, template literals produce ugly strings with extra whitespace and are harder to read.

**The Fix**:

```typescript
// Before
<Card className={`h-full flex flex-col ${className}`}>

// After
<Card className={cn('h-full flex flex-col', className)}>

// Before
className={`group ${compact ? 'relative px-2 py-1.5' : 'p-3'} rounded-md ...`}

// After
className={cn(
  'group rounded-md cursor-pointer transition-colors hover:bg-muted/50',
  compact ? 'relative px-2 py-1.5' : 'p-3',
  currentSession?.id === session.id && 'bg-muted',
)}
```

---

### 7. Abysmal Test Coverage: 7% File Coverage

**Scope**: 54 test files for 764 component files; 44 test files for the entire modules directory

**The Problem**: The dashboard has a test-to-component ratio of roughly **1:14**. Critical paths -- the command palette, the workspace hub, the entire chat infrastructure, all navigation components, every dashboard widget, every form wizard -- are untested.

**Why This Matters**: Without tests, every refactoring is a gamble. The god components (issue #1) cannot be safely decomposed without tests to verify behavior is preserved. The mock data (issue #3) cannot be replaced with real API calls without integration tests to validate rendering. This is a house built on sand.

**Minimum Coverage Targets**:
- All error boundaries: unit tests for each error category
- VirtualDataTable: integration tests with 1K+ row datasets
- CommandPalette: search index building, keyboard navigation, AI suggestion flow
- Chat components: message rendering, streaming state, tool call display
- Every form wizard: validation, step navigation, submission flow

---

### 8. Chat History Sidebar Edit Feature is Broken

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/components/chat/chat-history-sidebar.tsx`
**Lines**: 98-103

**The Problem**: The `handleSaveEdit` function does nothing:

```typescript
const handleSaveEdit = () => {
  if (editingSessionId && editTitle.trim()) {
    // Update session title logic would go here
    setEditingSessionId(null);
    setEditTitle('');
  }
};
```

The comment says "would go here." The edit button is rendered (line 318), the input is functional (line 241), but the save action is a no-op. The UI presents a feature that does not work.

**The Fix**: Either implement the feature or remove the edit button entirely. Half-built features that mislead users are worse than no feature at all.

```typescript
const handleSaveEdit = () => {
  if (editingSessionId && editTitle.trim()) {
    updateSessionTitle(editingSessionId, editTitle.trim());
    setEditingSessionId(null);
    setEditTitle('');
  }
};
```

---

### 9. Streaming Chat Updates via Full Array Map on Every Token

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/components/dashboard/todays-focus-workspace.tsx`
**Lines**: 1074-1088

**The Problem**: During chat streaming, every content delta triggers:

```typescript
setChatMessages(previous =>
  previous.map(message =>
    message.id === assistantMessageId
      ? { ...message, content: finalContent, domain: responseDomain, streaming: true }
      : message
  )
);
```

This creates a new array and new objects for every single token received from the AI stream. With a typical response of 200+ tokens and a message history of 10+ messages, that is 2,000+ object allocations during a single response, plus React reconciliation for each one.

**Why This Matters**: This causes unnecessary garbage collection pressure and re-renders of the entire chat message list on every token. The `VirtualizedChatList` component exists (at `components/chat/VirtualizedChatList.tsx`) specifically to handle this efficiently but is not used here.

**The Fix**: Use a ref for the accumulating content and update state on a throttled schedule:

```typescript
const streamContentRef = useRef('');
const updateThrottleRef = useRef<number | null>(null);

// In the stream loop:
streamContentRef.current += event.delta;

if (!updateThrottleRef.current) {
  updateThrottleRef.current = requestAnimationFrame(() => {
    setChatMessages(prev =>
      prev.map(msg =>
        msg.id === assistantMessageId
          ? { ...msg, content: streamContentRef.current, streaming: true }
          : msg
      )
    );
    updateThrottleRef.current = null;
  });
}
```

---

### 10. No Memoization on Chat History Search

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/components/chat/chat-history-sidebar.tsx`
**Lines**: 59-65

**The Problem**: The session search filter iterates through every message of every session on every keystroke:

```typescript
const filteredSessions = sessions.filter(
  session =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.messages.some(msg =>
      msg.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
);
```

This is computed directly in the render path with no `useMemo`. For users with 50+ chat sessions and hundreds of messages, this is O(n*m) string operations on every render.

**The Fix**:

```typescript
const filteredSessions = useMemo(() => {
  const query = searchQuery.toLowerCase();
  if (!query) return sessions;

  return sessions.filter(
    session =>
      session.title.toLowerCase().includes(query) ||
      session.messages.some(msg =>
        msg.content.toLowerCase().includes(query)
      )
  );
}, [sessions, searchQuery]);
```

---

## MINOR Issues

### 11. Inconsistent Error Boundary Patterns

**Files**:
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/components/error-fallbacks.tsx` -- Three near-identical error fallback components with copy-pasted layouts
- `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/components/voice-error-boundary.tsx` -- A 383-line class component error boundary with a `reportErrorToMonitoring` method that is entirely commented out (lines 199-205)

The error fallbacks (`DefaultErrorFallback`, `APIErrorFallback`, `GlobalErrorFallback`) share 80% of their markup. They should be a single parameterized component.

The `VoiceErrorBoundary` constructs an `errorReport` object (lines 186-198) and then does nothing with it. Dead code.

---

### 12. VoiceInput Component Is a Pointless Wrapper

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/modules/quality/components/VoiceInput.tsx`
**Lines**: 1-27

**The Problem**: This entire component is:

```typescript
export const VoiceInput: React.FC<VoiceInputProps> = props => {
  return <VoiceCapture {...props} />;
};
```

A component that does nothing but forward props to another component is not a component. It is indirection for the sake of indirection. The `React.FC` type annotation is also deprecated guidance from the React team.

**The Fix**: Delete this file. Import `VoiceCapture` directly where needed.

---

### 13. Module-Level Side Effects in QualityControlDashboard

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/modules/quality/pages/QualityControlDashboard.tsx`
**Lines**: 279-339

**The Problem**: Chart data transforms (`inspectionBarData`, `inspectionPieData`, `dominionVsSubDonutData`, `agingData`) are computed at module load time as top-level constants. These run during import even if the component is never rendered. This is a tree-shaking and code-splitting hazard.

**The Fix**: Move transforms inside the components that use them, or wrap in `useMemo`.

---

### 14. Duplicate eslint-disable Patterns

**Scope**: 30+ unique eslint-disable comments across components

The most concerning:
- `eslint-disable max-lines` at the top of god components -- the correct fix is decomposition, not silence
- `eslint-disable react-hooks/purity` in `SharedCursor.tsx` and `CopilotChat.tsx` -- indicates hooks rules violations that should be fixed, not suppressed
- `eslint-disable jsx-a11y/no-noninteractive-element-interactions` in 4 files -- indicates accessibility violations

---

### 15. The 4,036-Line Onboarding Portal Page

**File**: `/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/modules/onboarding/pages/Portal.tsx`
**Lines**: 1-4036

**The Problem**: This is the largest single component file in the audit scope. 4,036 lines in a single page component. It contains approximately 30 inline type definitions, its own form editor system, notification management, document upload logic, and multiple sub-page renderers.

**Why This Matters**: This exceeds even the TodaysFocusWorkspace in raw size. The file is impossible to review in a single PR, impossible to test incrementally, and impossible to reason about.

---

## NITPICKS

- **Inconsistent icon imports**: Some files import from `lucide-react` directly, others from a local `@/icons` barrel. Pick one pattern.
- **`React.FC` usage**: `VoiceInput.tsx` uses `React.FC` which is discouraged. Use plain function declarations.
- **Date formatting**: Multiple components implement their own date formatting utilities (`formatAbsoluteTime`, `formatDate`, `formatRelativeMinutes`) instead of using a shared utility. `date-fns` is already a dependency (used in `chat-history-sidebar.tsx`).
- **Color hardcoding in charts**: Recharts color values like `#10b981`, `#f59e0b` are hardcoded strings rather than referencing the design system's CSS variables.
- **`as const` on inline arrays**: The workspace tabs and filter arrays use `as const` assertions inside JSX, which is valid but less readable than extracting to module-level constants.

---

## What Does Not Completely Suck

1. **VirtualDataTable** (`/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/components/ui/virtual-data-table.tsx`): This is genuinely well-architected. Clean prop interface, proper `forwardRef` with generic typing, accessible ARIA roles, keyboard navigation, loading/empty states, and a clean separation of the hook (`useVirtualTable`) from the rendering component. The imperative handle API (`scrollToIndex`, `scrollToRow`, `getSelectedRows`) is thoughtfully designed. This is what caring looks like.

2. **ToolCallRenderer** (`/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/components/chat/tool-call-renderer.tsx`): Clean pattern matching on tool types, defensive JSON parsing, proper type narrowing, no `any` types, structured card rendering. Simple, focused, correct.

3. **AlfredChatSettingsBar** (`/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/components/alfred-chat/AlfredChatSettingsBar.tsx`): Proper use of `useCallback` for stability, idle-task scheduling for non-blocking health checks, active ref tracking to prevent state updates after unmount, clean animation with AnimatePresence. This component was built by someone who understands the runtime.

4. **VoiceErrorBoundary** (`/Users/cameronrussell/code/alfred/apps/alfred-web-dashboard/src/components/voice-error-boundary.tsx`): Despite the dead monitoring code, the error categorization, exponential backoff retry logic, and graceful degradation pattern are solid. The `useVoiceErrorHandler` hook companion is a nice touch for functional component consumers.

5. **Zod validation in CommandPalette**: The `RecentPageSchema` and `RecentPageArraySchema` for localStorage parsing show proper boundary validation. The `safeLocalStorageGetValidated` utility is the right pattern.

---

## The Path to Greatness

1. **Decompose the god components**: Start with `TodaysFocusWorkspace` (2,063 lines), `Portal.tsx` (4,036 lines), and `CommandPalette` (1,744 lines). These three files alone account for ~8K lines. Break them into focused, testable modules. This is the single highest-impact change.

2. **Establish a test floor**: Write tests for every error boundary, every data normalizer, every hook. Target 40% file coverage as a first milestone. No new component should merge without at least one test file.

3. **Purge `window.confirm()`**: Replace all 8 instances with the existing `ConfirmDialog` component. This is a 2-hour task that immediately improves UX consistency.

4. **Migrate template literal classNames to `cn()`**: Automate with a codemod or address the 502 occurrences file-by-file during normal development. Add a lint rule to prevent new ones.

5. **Extract all mock data**: Move hardcoded mock data out of page components and into dedicated data files or feature-flagged data providers. The `QualityControlDashboard` is the worst offender.

6. **Kill the `any` types**: 66 occurrences across the audit scope. The Apollo client file alone has 12. Start with the security-sensitive files (auth, API clients) and work outward.

7. **Centralize date/time formatting**: Create a single `utils/formatters.ts` that wraps `date-fns` for all display formatting. Delete the 5+ duplicate implementations.

8. **Delete dead code**: Remove the `VoiceInput` passthrough wrapper. Remove the commented-out monitoring endpoint in `VoiceErrorBoundary`. Remove the broken edit feature in chat-history-sidebar (or implement it).

---

## Commands to Verify Fixes

```bash
# Type check (requires heap size increase for this monorepo)
NODE_OPTIONS="--max-old-space-size=24576" bun run type-check

# Lint
bun run lint:fast

# Test (if tests exist for the dashboard)
bun test --filter alfred-web-dashboard

# Build
bun run build --filter alfred-web-dashboard

# Find remaining any types
rg ': any\b|as any' apps/alfred-web-dashboard/src/components apps/alfred-web-dashboard/src/modules --type ts --type tsx -c

# Find remaining confirm() calls
rg 'confirm\(' apps/alfred-web-dashboard/src/components apps/alfred-web-dashboard/src/modules --type ts --type tsx

# Find remaining template literal classNames
rg 'className=\{`' apps/alfred-web-dashboard/src/components --type tsx -c
```

---

## Final Verdict

There are engineers on this team who clearly know what great looks like. The VirtualDataTable is proof. The ToolCallRenderer is proof. The streaming chat architecture is proof. But somewhere along the way, the team stopped holding itself to the standard those components set. Features were shipped as 2,000-line monoliths instead of being decomposed. Mock data was left in production paths. Linter rules were silenced instead of obeyed. Test files were never written.

The codebase is not beyond redemption -- far from it. But it requires a commitment to craftsmanship that has clearly been missing in recent development cycles. The god components must be broken apart. The test coverage must come up. The `confirm()` dialogs, the `any` types, the hardcoded mock data -- these are not style preferences. They are professional standards.

Ship the decomposition of TodaysFocusWorkspace and Portal.tsx as the first two PRs. Write tests as you go. Let the VirtualDataTable be the standard every new component aspires to.

> "Details matter. It's worth waiting to get it right."
