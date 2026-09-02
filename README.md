# Mation

**Operational software your business runs on. Built on our platform, owned where it matters.**

Marketing site for [Mation](https://mation.nz) — a product company in Auckland that runs a
multi-tenant platform and builds bespoke operational software for New Zealand businesses on it.

## The rule this site lives by

Every claim on the site must be one a buyer's lawyer could ask us to demonstrate. Copy and
commercial facts live in one place, `src/content/site.ts`, so a change to a price, a tier or
an ownership statement happens once. Before changing a claim, read
`docs/handover/2026-09-02-website-rebuild-brief.md` — it lists the sentences that must never
return (unqualified "you own the code", "no lock-in", "no ongoing licence", "rent-to-buy",
"purchase outright", any percentage on /security, any client outcome number, any published
guarantee) and the audit greps that catch them.

## Stack

- **TanStack Start** — full-stack React (SSR, server functions, file-based routing)
- **Vite 7** · **Tailwind CSS 4** · **React 19** · **Bun** · **Biome**

## Quick start

```bash
bun install
bun run dev        # http://localhost:6969
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Dev server on port 6969 |
| `bun run build` | Production build (runs `prebuild` first, which regenerates `public/sitemap.xml`) |
| `bun run preview` | Preview the production build |
| `bun run start` | Run the built server from `.output/` |
| `bun run test` | Unit tests (Vitest, `src/**/*.test.ts`) |
| `bun run check` | Biome lint + format check — must pass |
| `bun run format` | Format with Biome |

## Site map

| Route | What it is |
|---|---|
| `/` | The problem, the platform, what you own, the two tiers, the price, one call to action |
| `/what-we-build` | Role-based pain lines and what a tenant's system is made of |
| `/how-it-works` | The tenancy model, what sits underneath, the delivery sequence |
| `/what-you-own` | The ownership seam, the limit, continuity and escrow, the anti-guarantee |
| `/pricing` | The Managed tier price ladder (NZD, + GST); Owned deployment is scoped, not priced |
| `/security` | Controls every tenant runs with; ISO 27001-aligned, explicitly not certified |
| `/insights`, `/insights/$slug` | Ten long-form articles in `src/data/articles.ts` |
| `/about` | What Mation is and isn't |
| `/contact` | Four-field form, persisted before anything else |
| `/privacy`, `/terms` | Privacy statement (Privacy Act 2020) and website terms |
| `/approach`, `/plans`, `/work`, `/work/$slug` | 301 redirects from the old information architecture |

Every route sets its own `head()` metadata. `src/routeTree.gen.ts` is generated — don't edit it.

## Contact form

Submissions go through a server function (`src/server/sendContact.ts`) that persists first and
notifies second, so a missing email key never loses a lead:

1. Appended as one JSON line to the store file (`src/server/contactStore.ts`).
2. Optionally POSTed to a webhook.
3. Optionally emailed via [Resend](https://resend.com).

The form only reports failure if none of the three accepted the submission.

| Variable | Required | Default | Notes |
|----------|----------|---------|-------|
| `CONTACT_STORE_PATH` | No | `data/contact-submissions.jsonl` | System of record. Relative to the working directory. On a host with an ephemeral filesystem, point this at a mounted volume. `data/` is git-ignored. |
| `CONTACT_WEBHOOK_URL` | No | — | Receives each submission as JSON (a CRM, a sheet connector, anything). |
| `RESEND_API_KEY` | No | — | Emails each submission. Without it, submissions are stored and logged, not emailed. |
| `CONTACT_TO_EMAIL` | No | `cam@mation.nz` | Notification inbox. |
| `CONTACT_FROM_EMAIL` | No | `Mation website <noreply@mation.nz>` | Sender — must be on a Resend-verified domain. |

## Design system

Tokens and component classes are in `src/styles.css`. Light is the default; dark is keyed off
`data-theme` on `<html>`, set before first paint by an inline script in `src/routes/__root.tsx`.
Fraunces carries display type, Geist carries text, Geist Mono carries money and system facts.
One accent (violet) marks what is yours and what things cost; coral is reserved for the
boundary band. Structure comes from hairline-ruled document rows (`Section`), the ownership
ledger and the price ladder — not from cards or gradients.

## Deployment

Nitro with the Bun preset; output in `.output/`. Deploy anywhere that runs Bun or Node, or:

```bash
bun run build
bun run start
```

The Open Graph card is `public/og-card.png` (1200×630), rendered from `scripts/og-card.html`.
