# CLAUDE.md

Astro 5.x static portfolio site with Tailwind CSS v4 and MDX content collections. Deploys to Cloudflare Pages.

## Commands

```bash
pnpm dev          # Dev server (localhost:4321)
pnpm build        # Static build to dist/
pnpm lint         # Biome check
pnpm lint:fix     # Biome auto-fix
pnpm format       # Biome format
```

## Key Constraints

- **No framework JS shipped** — all interactivity is vanilla JS
- **Static output only** — no SSR, no client-side API calls
- GitHub repos fetched at build time (`src/lib/github.ts`)
- Contact form uses `mailto:` (no backend)

## Docs

- [Architecture & Patterns](.claude/docs/architecture.md)
- [Design System](.claude/docs/design-system.md)
- [Content Collections](.claude/docs/content.md)
