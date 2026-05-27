# Mation

**Bespoke software, built around your business.**

Marketing site for [Mation](https://mation.nz) — a software-engineering partner that builds the operating system each client actually runs on: custom systems that unify their tools, data, and workflows, engineered around how they operate and powered by AI.

## Stack

- **TanStack Start** — Full-stack React framework (SSR, server functions, file-based routing)
- **Vite** — Build tool and dev server
- **Tailwind CSS v4** — Utility-first styling
- **Bun** — Runtime and package manager
- **Node** — Runtime support (>=20)

## Quick Start

```bash
# Install dependencies
bun install

# Start dev server
bun run dev
```

Open [http://localhost:6969](http://localhost:6969).

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start dev server (port 6969) |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build |
| `bun run start` | Run production server (after build) |
| `bun run test` | Run tests |
| `bun run lint` | Lint with Biome |
| `bun run format` | Format with Biome |

## Project Structure

```
src/
├── components/     # Reusable components
├── routes/         # File-based routes (TanStack Router)
├── styles.css      # Global styles + Tailwind
└── router.tsx     # Router configuration
```

## Environment

The contact form (`/contact`) emails submissions via [Resend](https://resend.com), through a
server-side TanStack Start server function (`src/server/sendContact.ts`) so the API key never
reaches the browser. Set these on the host (e.g. Railway → service → Variables):

| Variable | Required | Default | Notes |
|----------|----------|---------|-------|
| `RESEND_API_KEY` | Yes | — | Resend API key. Without it, the form shows an "email us directly" fallback. |
| `CONTACT_TO_EMAIL` | No | `cam@mation.nz` | Where submissions are delivered. |
| `CONTACT_FROM_EMAIL` | No | `Mation website <noreply@mation.nz>` | Sender — must be on a Resend-verified domain. |

## Deployment

The app uses [Nitro](https://nitro.build/) with the Bun preset. Build outputs to `.output/`. Deploy to any platform that supports Node (Vercel, Netlify, Railway, etc.) or use the custom Bun server for self-hosting.

```bash
bun run build
bun run start
```

## Learn More

- [TanStack Start](https://tanstack.com/start)
- [TanStack Router](https://tanstack.com/router)
- [Tailwind CSS](https://tailwindcss.com)
- [Bun](https://bun.sh)
