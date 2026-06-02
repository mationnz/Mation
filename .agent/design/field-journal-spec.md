# Mation — "The Field Journal" design system (canonical spec)

> Source of truth for the redesign. The live tokens and component classes are
> implemented in `src/styles.css` — **read that file** for exact CSS; this doc
> explains intent, the naming migration, and per-file copy changes.

## Concept

Mation as a working studio that keeps a beautifully typeset notebook of the
systems it builds. Bespoke software is *authored, considered work*, so the site
should feel like being handed a thoughtfully designed studio proposal — warm ink
on warm paper, hand-numbered chapters, generous margins, a confident serif — not
a clinical enterprise PDF. We still engineer serious systems; we express that as
**editorial discipline** (a margin rule, a hanging chapter numeral, a
sentence-case figure caption) instead of a blueprint grid and CAD coordinates.

## Locked direction

1. **Light default + warm-dark toggle.** Light is a warm paper canvas; dark is a
   warm charcoal aubergine, never pure black. Both are first-class.
2. **Full reimagining.** Replace the cold technical motifs (blueprint grid,
   corner ticks, mono `FIG.01 · …` coordinates) with a journal/manuscript
   structural language.
3. **Violet anchor + terracotta/coral secondary.** Two-ink system (violet ~70%,
   coral ~25%, amber/sage ~5%). This two-ink-on-paper read is the single biggest
   defense against the "purple gradient on white" AI cliché — **never** lean on
   mono-violet gradients.

## Theme mechanism (SSR-safe, no flash)

- `@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));`
- `data-theme` lives on `<html>`. SSR renders `data-theme="light"` +
  `suppressHydrationWarning`.
- A no-flash inline `<script>` runs in `<head>` **before** `<HeadContent/>`,
  reading `localStorage.theme` (falling back to `prefers-color-scheme`) and
  setting the attribute synchronously before first paint.
- `ThemeToggle` (sun/moon) flips the attribute + persists to `localStorage`.
- Two media-scoped `theme-color` metas (`#FAF6EF` light / `#1C1822` dark).
- A `theme-ready` class is added to `<html>` after mount so the cross-fade only
  animates on user toggles, not first load.

## Tokens (short var names → value). Defined on `:root` / `[data-theme="dark"]`; exposed to Tailwind via `@theme inline` (e.g. `bg-canvas`, `text-ink`, `border-border`, `text-violet`, `text-warm-ink`).

| token | light | dark | use |
|---|---|---|---|
| `--canvas` | `#FAF6EF` | `#1C1822` | page background (warm paper / warm charcoal) |
| `--canvas-2` | `#F3ECE0` | `#16131C` | recessed wells, figure plates |
| `--surface` | `#FFFDF9` | `#262130` | cards/panels (warm white, never #FFF) |
| `--surface-2` | `#FBF4E9` | `#2F2A3A` | raised/subtle surfaces |
| `--surface-violet` | `#EFE9FB` | `#2A2140` | violet-tinted tiles |
| `--surface-warm` | `#FBE7DD` | `#33231F` | coral-tinted tiles, error wells |
| `--ink` | `#241F2E` | `#F3EEE6` | primary text + headings (AAA) |
| `--ink-soft` | `#3C3550` | `#D9D2E2` | strong secondary text |
| `--mute` | `#615B70` | `#A39CB2` | supporting/caption text (AA) |
| `--faint` | `#8C8699` | `#7C7589` | decorative/large only — never body |
| `--border` | `#E7DECF` | `#322C3D` | hairlines/keylines |
| `--border-strong` | `#D8CCB6` | `#433B50` | stronger dividers, secondary btn |
| `--violet` | `#6A4BD8` | `#B5A0FF` | brand anchor: links, rules, numerals, icons |
| `--violet-ink` | `#4F37AD` | `#9C84F5` | violet **text** < 18px; primary btn fill (dark) |
| `--violet-tint` | `#EFE9FB` | `rgba(155,132,245,.16)` | hover washes, selection |
| `--warm` | `#E2613F` | `#F0805C` | coral fills/ticks/dots — **decorative only** |
| `--warm-ink` | `#B8492C` | `#F2997B` | coral **text** (kicker labels, accents) |
| `--warm-tint` | `#FBE7DD` | `rgba(240,128,92,.15)` | coral washes |
| `--amber` / `--amber-ink` | `#B5781A` / `#8A5A12` | `#E6A847` | notice / in-progress |
| `--success` | `#2E7D55` | `#5FC58C` | positive "yours, no lock-in" |
| `--danger` | `#C0392B` | `#E8705F` | form errors |
| `--info` | `#2F6F92` | `#6FB0D2` | info |
| radii | `--radius-xs 6` · `--radius-sm 10` (buttons/inputs) · `--radius 16` (cards) · `--radius-lg 22` · `--radius-pill 999` (live-dot/toggle only) | | |
| ease | `--ease-paper: cubic-bezier(.22,.61,.36,1)` | | settling, never sliding |

Shadows are **warm** (brown-violet base) in light, surface-step + inset in dark:
`--shadow-xs/-sm/-/-lg`, `--shadow-violet` (primary btn), `--shadow-warm`,
`--card-inset` (printed card-stock lift). Atmosphere: `--bloom` (one soft
violet→coral bloom behind hero) + faint warm paper grain (`--grain-opacity`,
`--grain-blend`). **No blueprint grid.**

## Naming migration (old class/token → new). `styles.css` keeps deprecated aliases so the site never breaks mid-rollout, but rename as you touch each file:

- `border-line` → `border-border`
- `bg-panel` → `bg-surface` ; `bg-panel-2` → `bg-surface-2` (or `bg-canvas-2` for wells)
- `text-violet-bright` → `text-violet`
- `bg-white/[0.02|0.03|0.04]` → `bg-surface` (raised) or `bg-surface-2` (subtle)
- hardcoded `rgba(7,6,14,…)` / `bg-black/70` → tokenized paper-glass / `bg-ink/[α]`
- `.gradient-ink` (white→violet text clip, assumes dark) → solid `text-ink` with a violet/coral underline accent on metrics
- `font-mono` uppercase micro-labels → sentence-case Geist via `.kicker` / `.chapter`
- Use the `dark:` variant **only** for the rare non-color flip (e.g. primary
  button label color, grain blend-mode). Colors flip automatically via tokens.

## Typography

- **Fraunces Variable** (serif display, opsz + SOFT axis) = all H1–H3, pull-quotes,
  chapter ordinals, drop-caps, the "Mation" wordmark, large metric numerals.
  `font-optical-sizing: auto`; heading tracking ~`-0.005em` (serifs don't want the
  old `-0.03em`); `text-wrap: balance`. Class: `.font-display` / `.display`.
- **Geist Variable** (body) = all running text, nav, buttons, labels, captions,
  forms. Body `1.0625rem / 1.65` (roomy for non-technical readers).
- **Geist Mono** = demoted to genuine data only (code, version/file stamps, live
  values inside diagrams), normal case — **never** wide-tracked uppercase kickers.
- Scale: Display-1 hero `clamp(2.9rem,6vw,5.25rem)/1.02`; Display-2 section
  `clamp(2rem,3.6vw,3rem)/1.06`; H3 `1.5rem/1.25`; lede `1.1875rem/1.6`.

## Motifs — OUT → IN

**OUT:** blueprint grid (`body::before` + every inline `linear-gradient(rgba(123,97,255…))`
tile grid), corner registration ticks (`.ticked`/`.bracket`), near-black-tuned
blooms, wide-tracked uppercase mono kickers / section indexes / `FIG/IDX/DOC/dimline`
coordinate captions (`.bp-coord`, `.dimline`, `.section-index`).

**IN:**
1. **Margin rail + hanging chapter numeral** (THE signature). Major sections get a
   hairline vertical rule down the left with an oversized Fraunces ordinal
   "No. 03" in low-opacity violet hung in the margin, a thin coral tick at the
   start, section title in serif beside it. The rule "draws" downward
   (`scaleY 0→1`, origin top) as the section enters. Classes: `.chapter`,
   `.chapter-no`.
2. **Kicker = hairline coral rule + small-caps Geist label** (e.g. "— What we
   build"). Never a mono pill, never uppercase tracking.
3. **Drop-caps** on the lead paragraph of key sections — Fraunces initial,
   alternating violet/coral. Class: `.lede`.
4. **Figure plates.** Diagrams reframed as captioned plates on tinted
   `surface-2`/`canvas-2` with a fine keyline and a real sentence-case caption
   beneath ("From scattered tools to one system"), not an engineering callout.
5. **Card corner node** instead of corner ticks: a single small filled dot
   (violet; coral on featured) top-right that brightens/scales on hover.
6. **Hand-routed connectors:** all diagram linework = organic Bézier curves,
   rounded caps, slow gentle dash drift; ~1/3 of nodes/links coral so two systems
   visibly resolve into one.
7. **Paper grain** (≤5% opacity warm noise) replaces the grid; one soft
   violet→coral bloom behind the hero only.

## Components (see styles.css for the CSS)

- **Primary button:** solid violet, `radius-sm` (10px), 1px darker keyline,
  `--shadow-violet`, inset top highlight. Label `#FFFDF9` in light; **flips to
  dark ink `#1C1822` in dark** (AA on the lighter dark-violet). No gradient, no pill.
- **Secondary:** "paper" button — surface fill, `border-strong`, ink text; hover
  border→violet, bg→violet-tint, lift 1px.
- **Ghost/text:** Geist + animated coral/violet underline (not mono).
- **Cards/panels:** surface + 1px border + warm shadow + card-inset; `.panel-hover`
  lifts 2px with a violet keyline + corner node. Featured panels get a 3px coral
  or violet top-edge rule ("tabbed page").
- **Header:** paper bar, transparent at top → on scroll
  `rgba(250,246,239,.85)`+blur+border (light) / `rgba(28,24,34,.85)` (dark) via a
  tokenized class. Wordmark in Fraunces. ThemeToggle sits inline before the CTA.
- **Inputs:** surface fill, 1px border, `radius-sm`, 2px violet focus ring;
  placeholder = faint; error = `--color-danger` / `surface-warm`.

## Motion (CSS-first, "paper" — settling, never sliding; no JS motion lib)

One orchestrated page-load per view (`.reveal-up` + `.delay-*`, lift retuned to
~16px, `--ease-paper`, ~90ms stagger). Scroll reveals via
`@supports (animation-timeline: view())` (`.reveal-scroll`/`.reveal-stagger`).
Hairline margin rules draw downward on enter. The "live" dot is a slow **coral
breathing** pulse (rename `@keyframes ping`→`breathe`). Theme toggle = ~220ms
color cross-fade, gated off on first paint. Everything collapses under the global
`prefers-reduced-motion` rule (add `.live-dot`, `.chapter::before`, constellation
to its reset list; diagrams render settled).

## Accessibility (verified contrast; full pairs in styles.css comments)

AA = 4.5:1 text / 3:1 large+UI. Highlights: light `ink/canvas` ≈ 13.6:1;
`mute/canvas` ≈ 5.6:1; `violet/canvas` ≈ 5.4:1 (use `violet-ink` ≈ 8.0:1 for
small violet text); coral **text** must use `warm-ink` (base `warm` ≈ 2.9:1 is
fills only). Dark `ink/canvas` ≈ 14.6:1; `violet` ≈ 7.6:1; `warm-ink` ≈ 7.2:1.
**Primary button flips to dark text in dark mode** (white on `#9C84F5` is only
~3.0:1). Focus ring = `--ring` (violet) 2px + 2px offset, both themes.

## Copy changes (warm the voice; keep positioning)

1. **Hero/SystemMap caption + in-SVG `UNIFIED`** (`index.tsx ~L217`,
   `SystemMap.tsx ~L172/207`): `FIG.01 · SYSTEM TOPOLOGY — SCATTERED → UNIFIED`
   → caption **"From scattered tools to one system."**; keep label
   **"One system, built around you"**; drop the all-caps `UNIFIED` overline.
2. **"Enterprise-grade …"** (hero bullet `index L204`, security strip `L472`,
   `approach L626`, `about L401`): → **"Serious security, built in"** /
   **"Security and oversight, built in"** / **"Your data protected, every action
   tracked"** / **"Serious security — and yours to keep."** Name the concrete
   control, not the abstract "enterprise-grade."
3. **Mono micro-labels everywhere** (`bp-coord`/`dimline`/`section-index`:
   index L166/216/356, approach L154/212/249/410, what-we-build L277/343,
   security L205/227, work.index L55/88/165/219, insights L88): drop
   `FIG/IDX/DOC/coordinate` prefixes, sentence case, render via kicker/chapter —
   e.g. `Mation — bespoke systems · est. Auckland NZ` → **"Bespoke systems ·
   Auckland, NZ"**; `FIG.01 · THE ENGAGEMENT` → **"How an engagement works"**;
   `FIG.02 · THE SYSTEM, LAYERED` → **"The system, layer by layer"**;
   `IDX · ALL PIECES` → **"All articles"**; `DOC · 6 min read` → **"6 min read"**.
   *(Highest-leverage warmth change.)*
4. **`REQ-FORM · SECURE`** (`contact.tsx ~L252`) → lock icon + **"Private — goes
   straight to our team"**.
5. **`FIG.01 · OUTCOME — MEASURED, NOT CLAIMED`** (`work.$slug.tsx ~L118/129`) →
   **"The result that mattered"** / **"A real, measured outcome."**
6. **Security jargon** (`security.tsx ~L205/225/228/336`, `TrustControlPanel ~L84/88`):
   `Exposure with controls on` / `Risk ↓ 90%` / `SURFACE AREA — CONTROLS ENGAGED`
   → **"How protected you are"** / **"Risk cut by 90%"** / **"More safeguards,
   less risk"**; "before we widen reach" → "before we widen access".
7. **"No lock-in, no hostage situation."** (`security.tsx ~L71`) → **"No lock-in —
   you can take it anywhere, anytime."**
8. **"no bespoke magic to maintain."** (`approach.tsx ~L91`) → **"nothing fragile
   or one-off to maintain."**
9. **"ontology of how you operate"** + all-caps mono dt labels
   (`what-we-build.tsx ~L156/369/377/385/461`) → **"a single, agreed definition
   of how you operate"**; render `What it is / When you need it / What changes for
   you / We'd build` sentence-case Geist (not all-caps mono).
10. **`Modular · compounding`** / **`Combined · not à la carte`** (`index L295`,
    `what-we-build L333`) → **"Built to grow with you"** / **"One joined-up
    system, not a menu"**. Footer sign-off (`Footer.tsx ~L86`): keep words, drop
    ALL-CAPS + monospace.

## How to apply (for rollout agents)

1. **Read `src/styles.css` first** — use its utility classes (`bg-surface`,
   `text-ink`, `border-border`, `text-violet`, `text-warm-ink`, `.panel`,
   `.button-primary`, `.kicker`, `.chapter`, `.lede`, `.figure-plate`) and short
   vars (`var(--ink)`, `var(--violet)`, `var(--border)`). Don't invent tokens.
2. Replace hardcoded colors and the old class names per the migration table.
3. Replace blueprint motifs with the journal language; reframe diagrams as plates.
4. Apply the copy changes that touch your files.
5. **Verify AA in BOTH themes.** Coral text → `warm-ink`. Don't put real copy at
   decorative opacities.
6. Keep it CSS-first and SSR-safe; preserve `prefers-reduced-motion` behavior.
