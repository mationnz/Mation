# UI component library — renderable components (v1 → v2)

This list defines what the **generative interface** must be able to render.
It also acts as the “component registry” contract used by the UI spec returned from the backend.

## Core (v1 must-have)

- `kpiCard` (title, value, delta, status)
- `summaryCard` (bulleted summary, confidence/evidence badges)
- `table` (sortable, filterable, expandable rows)
- `chart` (line, bar, stacked bar; v1 can be mocked)
- `artifactEditor` (rich text / markdown editor for reports)
- `actionBar` (primary/secondary actions, approvals)
- `drawerPanel` (details, evidence, “why” explanations)
- `toast` / `banner` (system messages, warnings)
- `emptyState` (friendly empty UI)

## Inputs and controls

- `form` (dynamic schema-driven forms)
- `textInput`, `textarea`
- `dropdown`, `multiSelect`
- `datePicker`, `timePicker`
- `toggle`, `checkbox`, `radio`
- `fileUpload` (photos, docs)
- `searchTypeahead`

## Structure/navigation

- `tabs`
- `accordion`
- `modal`
- `breadcrumbs`
- `stepper` (multi-step workflow)

## Workflow & collaboration (v2)

- `checklist` (SOP-driven)
- `taskList` (assignments, due dates)
- `kanban`
- `timeline` / `gantt`
- `commentThread` (on artifacts)
- `approvalSignature` (digital sign-off)
- `map` (optional)

## Advanced (v3)

- `workflowBuilder` (power user chaining)
- `integrationConsole` (connector health, permissions)
- `explainWhyPanel` (reasoning summary + evidence links)
- `automationSimulator` (dry-run preview)
