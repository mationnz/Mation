# Interactive widgets — specification

This document defines the interactive elements that make the website feel “state-of-the-art”
while still serving the story (not gimmicks).

## Widget 1 — Prompt → Canvas (Home hero)

### Purpose
Proves the generative interface: user asks in chat, Mation renders UI + artifacts.

### UX
- Left: small chat input with sample prompt dropdown
- Right: empty canvas state
- On send/select:
  - chat collapses to a compact bubble
  - canvas expands and components assemble into a grid
  - evidence badges appear on key outputs
  - action bar offers “Export”, “Assign”, “Request data”

### Implementation approach
- v1: scripted UI states (JSON) to avoid breakage and ensure consistent visuals.
- v2: swap in real backend calls later.

### Acceptance criteria
- Must run smoothly on mobile.
- Must support reduced motion.
- Must load in < 1.5s.
- Must not block page interactivity.

---

## Widget 2 — Architecture Explorer (Architecture page)

### Purpose
Lets technical evaluators click through the platform without reading a wall of text.

### UX
- Interactive node diagram (React Flow)
- Clicking a node opens a side drawer with:
  - what the node does
  - what it reads/writes
  - what gets logged
  - typical failure modes and mitigations

### Nodes
- User Harness: Chat + Canvas
- Component Registry
- Orchestrator
- Retrieval Agent
- UI Composer
- Action Agent
- Policy Engine
- Tool Gateway
- Memory Layer
- Audit Log

---

## Widget 3 — Governed Action Simulator (Security page)

### Purpose
Shows how the system stays safe: permission checks, approvals, audit trail.

### UX
- User selects an action (dropdown)
- UI displays:
  - permission check result
  - evidence sources required
  - approval step (if required)
  - audit log entry preview

---

## Widget 4 — ROI / Friction Calculator (Solutions page)

### Purpose
Convert “build vs buy” skeptics by modeling current inefficiency.

### Inputs
- # teams / users
- hours per week spent on reporting
- # systems used
- frequency of compliance/audit tasks

### Outputs (ranges)
- estimated hours reclaimed
- reduction in duplicated work
- reduction in handoffs

### Disclaimer
Display as “estimates”, not promises.
