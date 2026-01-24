# Architecture & Patterns

## Routing

Pages live in `src/pages/` using Astro file-based routing. Dynamic blog posts use `[...slug].astro` with the Content Layer API.

## Interactivity Patterns

- View Transitions API for SPA-like navigation between pages
- `astro:after-swap` event handlers to persist state (theme, scroll) across transitions
- Scroll-triggered `.reveal` animations via IntersectionObserver
- Theme toggle persists to `localStorage`; inline `<head>` script prevents flash

## Path Aliases

Configured in `tsconfig.json`: `@/*`, `@components/*`, `@layouts/*`, `@lib/*`

## Build-time Data

GitHub repositories are fetched at build time in `src/lib/github.ts` — no client-side fetch calls.

## CI Pipeline

`.github/workflows/ci.yml` runs on push/PR to `main`:

1. **Biome** — lint & format check
2. **astro check** — TypeScript type checking
3. **astro build** — static build
4. **Lychee** — link validation on built output
5. **Lighthouse** — performance/a11y/SEO audits (min score: 0.9)
