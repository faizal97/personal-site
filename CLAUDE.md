# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

Personal portfolio website built with Astro 5.x, Tailwind CSS v4, and MDX content collections. Fully static output with no SSR — deploys to Cloudflare Pages or any static host.

## Tech Stack

- **Framework:** Astro 5.x (static site generator)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite` plugin
- **Content:** MDX with Astro Content Layer API (glob loader)
- **Typography:** Syne (display), Outfit (body), JetBrains Mono (code) via Google Fonts
- **Syntax Highlighting:** Shiki (github-light / github-dark themes)
- **Package Manager:** pnpm

## Development Commands

```bash
pnpm dev        # Start dev server (localhost:4321)
pnpm build      # Build static site to dist/
pnpm preview    # Preview production build locally
```

## File Structure

```
src/
├── pages/
│   ├── index.astro              # Homepage (all sections)
│   ├── 404.astro                # 404 page
│   ├── rss.xml.ts               # RSS feed endpoint
│   ├── blog/
│   │   ├── index.astro          # Blog listing
│   │   └── [...slug].astro      # Individual blog posts
│   └── projects/
│       └── index.astro          # Projects + GitHub repos
├── layouts/
│   └── BaseLayout.astro         # HTML shell, meta, View Transitions
├── components/
│   ├── Navigation.astro         # Fixed nav with mobile menu
│   ├── Footer.astro             # Copyright + social links
│   ├── ThemeToggle.astro        # Dark/light toggle
│   ├── StructuredData.astro     # JSON-LD schemas
│   └── sections/                # Homepage section components
│       ├── Hero.astro
│       ├── About.astro
│       ├── Skills.astro
│       ├── Experience.astro
│       ├── FeaturedProjects.astro
│       ├── RecentPosts.astro
│       └── Contact.astro
├── content/
│   ├── blog/                    # MDX blog posts
│   └── projects/                # MDX project descriptions
├── lib/
│   └── github.ts                # Build-time GitHub API fetch
├── styles/
│   └── global.css               # Tailwind v4 theme + utilities
└── content.config.ts            # Collection schemas (blog, projects)
```

## Design System

**Theme:** "Midnight Brutalist Editorial"

- Accent: `#c8ff00` (chartreuse)
- Dark BG: `#0a0f1a` / Light BG: `#faf8f5`
- CSS custom properties for theming (`--bg`, `--surface`, `--text`, `--muted`, `--border`)
- Dark mode default, toggle persists in localStorage
- Theme flash prevented via inline script in `<head>`

## Content Collections

**Blog** (`src/content/blog/*.mdx`):
- Frontmatter: title, description, pubDate, tags, draft
- Rendered with prose styling and Shiki highlighting

**Projects** (`src/content/projects/*.mdx`):
- Frontmatter: title, description, technologies, liveUrl, status, role, scale, featured, order
- Featured projects queried and displayed on homepage and projects page

## Key Patterns

- All interactivity via vanilla JS (no framework JS shipped)
- View Transitions for SPA-like navigation between pages
- `astro:after-swap` event handlers ensure state persists across transitions
- Scroll-triggered `.reveal` animations via IntersectionObserver
- GitHub repos fetched at build time (no client-side API calls)
- Contact form submits via mailto: link (no backend)

## Configuration

- `astro.config.mjs` — Integrations (MDX, sitemap), Vite plugins (Tailwind), Shiki config
- `tsconfig.json` — Path aliases (`@/*`, `@components/*`, `@layouts/*`, `@lib/*`)
- `src/content.config.ts` — Zod schemas for content collections
