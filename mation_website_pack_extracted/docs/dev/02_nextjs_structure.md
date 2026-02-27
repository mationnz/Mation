# Next.js project structure (suggested)

```
/app
  /(marketing)
    page.tsx                 # Home
    product/page.tsx
    solutions/page.tsx
    architecture/page.tsx
    security/page.tsx
    services/page.tsx
    company/page.tsx
    resources/page.tsx
    contact/page.tsx
/components
  layout/
    NavBar.tsx
    Footer.tsx
    Section.tsx
  hero/
    HeroPromptCanvasDemo.tsx
    PromptPicker.tsx
    CanvasRenderer.tsx
  widgets/
    ArchitectureExplorer.tsx
    GovernedActionSimulator.tsx
    ROICalculator.tsx
  ui/
    Button.tsx
    Card.tsx
    Tabs.tsx
    Accordion.tsx
    Modal.tsx
/styles
  tokens.css
  globals.css
/demo
  ui_states/*.json
/content
  resources/*.mdx (optional, if not using CMS)
```

Key idea:
- the hero demo uses JSON UI states that map `type` → component registry in `CanvasRenderer`.
