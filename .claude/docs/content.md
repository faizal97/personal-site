# Content Collections

Schemas defined in `src/content.config.ts` using Zod. Content loaded via Astro Content Layer API (glob loader).

## Blog (`src/content/blog/*.mdx`)

Frontmatter fields:

- `title` — post title
- `description` — summary for meta/listing
- `pubDate` — publication date
- `tags` — string array for categorization
- `draft` — boolean, excludes from build when true

## Projects (`src/content/projects/*.mdx`)

Frontmatter fields:

- `title`, `description` — basic info
- `technologies` — string array
- `liveUrl` — deployed URL
- `status` — project status
- `role` — your role on the project
- `scale` — project scale/size
- `featured` — boolean, shown on homepage
- `order` — numeric sort order for display
