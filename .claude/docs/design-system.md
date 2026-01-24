# Design System

**Theme:** "Midnight Brutalist Editorial"

## Colors

| Token | Dark | Light |
|-------|------|-------|
| Accent | `#c8ff00` (chartreuse) | `#c8ff00` |
| Background | `#0a0f1a` | `#faf8f5` |

## CSS Custom Properties

Defined in `src/styles/global.css`:

- `--bg`, `--surface`, `--text`, `--muted`, `--border`

## Dark Mode

- Dark mode is the default
- Toggle state persists in `localStorage`
- Flash prevented via inline script in `BaseLayout.astro` `<head>`
