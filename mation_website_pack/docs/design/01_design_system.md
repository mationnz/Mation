# Design system — v1

## Brand palette

Derived from the provided logo and favicon assets.

- Purple Deep: `#310B5E`
- Purple Primary: `#3C1789`
- Purple Mid: `#431B98`
- Violet: `#6142CD`
- Blue: `#6B81DE`
- Cyan: `#91C5F0`

Brand gradient:
`linear-gradient(90deg, #310B5E 0%, #431B98 35%, #6142CD 65%, #91C5F0 100%)`

**Usage rules**
- Use the gradient for hero accents, highlights, and key interactive moments.
- Do not put the gradient behind body text. Use it on lines, icons, small surfaces, and CTAs.
- In dark mode, prefer gradient accents on borders and glow lines rather than full fills.

## Typography

Recommended:
- Headings: Space Grotesk (600–700)
- Body: Inter (400–500)
- Mono: JetBrains Mono (400)

Type scale (desktop)
- H1 56/64
- H2 40/48
- H3 28/36
- Body 16/26
- Small 14/22

## Layout

- 12 column grid desktop (max 1200px content width)
- 4 column grid mobile
- Section padding: 96px desktop / 56px mobile

## Component style

- Corners: medium radius (14px)
- Borders: subtle, always (helps “high-trust cockpit” feel)
- Shadows: minimal; prefer borders + soft shadow only on elevated surfaces

## Button styles

Primary button:
- background: gradient
- text: white
- hover: slightly brighter gradient + subtle shadow

Secondary button:
- background: transparent
- border: 1px solid border
- hover: panel background

Ghost button:
- text only, used for tertiary actions

## Dark mode

Default should be dark-mode friendly. Use `[data-theme="dark"]` tokens.
All diagrams should be designed to work in both light and dark mode.

## Avoid

- Stock robot imagery
- Neon “AI brains”
- Overly glossy 3D renders
