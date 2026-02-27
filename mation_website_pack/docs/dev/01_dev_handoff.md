# Developer handoff — implementation spec

## Recommended stack

- Next.js (React)
- Tailwind (optional) + CSS variables (tokens.css)
- Framer Motion for subtle animations
- React Flow for architecture explorer
- Lottie (or Rive) for hero animation loops
- Headless CMS (Sanity/Contentful) for Resources

## Information architecture → routes

- `/` (Home)
- `/product`
- `/solutions`
- `/architecture`
- `/security`
- `/services`
- `/company`
- `/resources`
- `/contact` (Book a demo)

## Component inventory (site UI)

- `<NavBar />` (sticky, CTA button)
- `<HeroPromptCanvasDemo />` (scripted)
- `<FeatureGrid />`
- `<TabbedSolutions />`
- `<CTABand />`
- `<Footer />`
- `<ArchitectureExplorer />`
- `<GovernedActionSimulator />`
- `<ROICalculator />` (optional v1)
- `<ResourceCard />`, `<ResourceList />`
- `<ContactForm />`

## Performance requirements

- Hero widget must not block page load.
- Lazy-load diagrams and calculators.
- Respect reduced-motion.

## Accessibility

- WCAG AA contrast
- keyboard navigable widgets
- ARIA labels for interactive nodes

## Content editing

- Use MDX for docs-like pages (Architecture, Security) to keep iteration fast.
- Use CMS only for Resources (blog).
