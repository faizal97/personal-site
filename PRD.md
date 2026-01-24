# Product Requirements Document (PRD)
## Personal Portfolio & Blog Website Rewrite

**Document Version:** 1.0  
**Created:** January 24, 2026  
**Author:** [Your Name]  
**Status:** Draft

---

## 1. Executive Summary

This document outlines the requirements for a **complete rewrite** of the personal portfolio and blog website. The existing Next.js codebase will be deprecated and replaced from scratch with a modern, performance-optimized Astro-based architecture, deployed on Cloudflare Pages.

### Project Type: Complete Rewrite

> ⚠️ **This is NOT an incremental migration or refactor.** The existing codebase will be fully replaced. This decision is intentional—starting fresh allows us to leverage Astro's content-first architecture without carrying over technical debt or architectural constraints from the Next.js implementation.

**What this means:**
- New repository (or fresh branch with no shared history)
- All components, layouts, and styles rebuilt from scratch
- Content (blog posts, project data) migrated to new format
- No code reuse from existing implementation
- URL redirects configured to preserve SEO value

### Key Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | Astro (latest) | Purpose-built for content sites, zero JS by default, islands architecture |
| Hosting | Cloudflare Pages | Unlimited free bandwidth, 300+ edge locations, enterprise DDoS protection |
| Content | MDX + Content Collections | Type-safe frontmatter, component support in markdown |
| Styling | Tailwind CSS (latest) | CSS-native approach, utility-first, excellent DX |

---

## 2. Problem Statement

### Existing Project
The current portfolio and blog is built with Next.js and hosted on GitHub Pages. While functional, the implementation has accumulated technical debt and the architecture is misaligned with the site's actual requirements.

### Current Pain Points
- **Overengineered stack**: Next.js is optimized for dynamic apps, not static content sites
- **Performance overhead**: Shipping unnecessary JavaScript for predominantly static content
- **Hosting limitations**: GitHub Pages has bandwidth caps (100GB/mo) and limited edge distribution
- **Developer experience**: Complex setup for simple content updates
- **Maintenance burden**: Framework updates require significant refactoring effort

### Why Rewrite Instead of Refactor?
A complete rewrite is justified because:
1. **Architectural mismatch**: The existing React/Next.js patterns don't translate cleanly to Astro's component model
2. **Content structure**: Moving to Content Collections requires restructuring all content anyway
3. **Clean slate**: No legacy patterns or workarounds to maintain
4. **Time efficiency**: Building fresh is faster than untangling existing code
5. **Learning opportunity**: Fully embrace Astro's idioms without compromise

### Opportunity
Build a blazing-fast, maintainable portfolio and blog that:
- Loads instantly with near-zero JavaScript
- Scales infinitely on free hosting
- Makes content creation frictionless
- Showcases modern web development skills

---

## 3. Goals & Success Metrics

### Primary Goals
1. **Performance**: Achieve 100 Lighthouse score across all categories
2. **Content Velocity**: Reduce time-to-publish for new blog posts to under 5 minutes
3. **Cost**: Maintain $0/month hosting costs
4. **SEO**: Improve organic search visibility with proper meta tags, sitemap, and RSS

### Success Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| Lighthouse Performance | ≥ 95 | Google Lighthouse |
| First Contentful Paint (FCP) | < 1.0s | Web Vitals |
| Largest Contentful Paint (LCP) | < 1.5s | Web Vitals |
| Cumulative Layout Shift (CLS) | < 0.1 | Web Vitals |
| Time to Interactive (TTI) | < 1.5s | Web Vitals |
| Total JS shipped (static pages) | < 10KB | Build output |
| Build time | < 60s | Cloudflare Pages |

---

## 4. Technical Architecture

### 4.1 Technology Stack

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION                         │
├─────────────────────────────────────────────────────────┤
│  Astro (latest)     │  Islands Architecture            │
│  Tailwind CSS       │  View Transitions API            │
│  MDX                │  Syntax Highlighting (Shiki)     │
└─────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────┐
│                    CONTENT LAYER                        │
├─────────────────────────────────────────────────────────┤
│  Astro Content Collections                              │
│  - Type-safe schemas with Zod                           │
│  - MDX for rich content                                 │
│  - Automatic slug generation                            │
│  - Tag/category taxonomies                              │
└─────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────┐
│                    INFRASTRUCTURE                       │
├─────────────────────────────────────────────────────────┤
│  Cloudflare Pages   │  Git-based deployments           │
│  Cloudflare CDN     │  300+ global edge locations      │
│  (Optional) Workers │  Dynamic functionality           │
└─────────────────────────────────────────────────────────┘
```

### 4.2 Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── layout/          # Header, Footer, Navigation
│   │   └── islands/         # Interactive React/Svelte components
│   ├── content/
│   │   ├── blog/            # Blog posts (MDX)
│   │   └── projects/        # Project showcases (MDX)
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── BlogLayout.astro
│   │   └── ProjectLayout.astro
│   ├── pages/
│   │   ├── index.astro      # Homepage
│   │   ├── about.astro      # About page
│   │   ├── blog/
│   │   │   ├── index.astro  # Blog listing
│   │   │   └── [...slug].astro
│   │   ├── projects/
│   │   │   ├── index.astro  # Projects listing
│   │   │   └── [...slug].astro
│   │   ├── rss.xml.ts       # RSS feed
│   │   └── sitemap.xml.ts   # Sitemap
│   └── styles/
│       └── global.css       # Tailwind imports + custom styles
├── public/
│   ├── fonts/               # Self-hosted fonts
│   ├── images/              # Static images
│   └── favicon.svg
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

### 4.3 Content Schema

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    readingTime: z.number().optional(), // Auto-calculated
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    heroImage: z.string(),
    technologies: z.array(z.string()),
    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
  projects: projectsCollection,
};
```

---

## 5. Features & Requirements

### 5.1 Core Pages

#### Homepage
| Requirement | Priority | Description |
|-------------|----------|-------------|
| Hero section | P0 | Name, title, brief intro, CTA buttons |
| Featured projects | P0 | 3-4 highlighted projects with images |
| Recent blog posts | P0 | Latest 3-5 posts with excerpts |
| Skills/tech stack | P1 | Visual representation of expertise |
| Contact CTA | P0 | Clear call-to-action for contact |

#### About Page
| Requirement | Priority | Description |
|-------------|----------|-------------|
| Bio section | P0 | Professional background and story |
| Experience timeline | P1 | Career history visualization |
| Skills breakdown | P1 | Categorized technical skills |
| Personal interests | P2 | Hobbies, interests (humanizing) |
| Downloadable resume | P1 | PDF download option |

#### Blog
| Requirement | Priority | Description |
|-------------|----------|-------------|
| Post listing | P0 | Paginated list with search/filter |
| Individual posts | P0 | Full MDX rendering with syntax highlighting |
| Tag filtering | P1 | Filter posts by tag |
| Reading time | P1 | Estimated reading time display |
| Table of contents | P1 | Auto-generated TOC for long posts |
| Related posts | P2 | Suggestions based on tags |
| RSS feed | P0 | Full-content RSS for subscribers |

#### Projects
| Requirement | Priority | Description |
|-------------|----------|-------------|
| Project gallery | P0 | Grid/list view of all projects |
| Project detail | P0 | Full case study with images |
| Tech stack tags | P0 | Filter by technology |
| Live demo links | P0 | Links to deployed projects |
| Source code links | P1 | GitHub repository links |

#### Contact
| Requirement | Priority | Description |
|-------------|----------|-------------|
| Contact form | P1 | Name, email, message (via Cloudflare Workers or external) |
| Social links | P0 | GitHub, LinkedIn, Twitter/X, etc. |
| Email link | P0 | Direct mailto link |

### 5.2 Global Features

| Feature | Priority | Description |
|---------|----------|-------------|
| Dark/light mode | P1 | System preference + manual toggle, persisted |
| View transitions | P1 | Smooth page transitions via View Transitions API |
| SEO meta tags | P0 | Dynamic OG images, Twitter cards, structured data |
| Sitemap | P0 | Auto-generated XML sitemap |
| 404 page | P0 | Custom not found page |
| Analytics | P1 | Cloudflare Web Analytics (privacy-first) |
| Performance monitoring | P2 | Core Web Vitals tracking |

### 5.3 Interactive Islands (Hydrated Components)

These components require client-side JavaScript and will use Astro's islands architecture:

| Component | Framework | Trigger |
|-----------|-----------|---------|
| Theme toggle | Vanilla JS | `client:load` |
| Mobile navigation | Vanilla JS or React | `client:media="(max-width: 768px)"` |
| Contact form | React | `client:visible` |
| Code copy button | Vanilla JS | `client:idle` |
| Search (if implemented) | React | `client:idle` |

---

## 6. Design Requirements

### 6.1 Design Principles
1. **Minimalist**: Content-first, no visual clutter
2. **Fast**: Design choices should support performance (system fonts as fallback, optimized images)
3. **Accessible**: WCAG 2.1 AA compliance minimum
4. **Responsive**: Mobile-first, works on all screen sizes
5. **Distinctive**: Avoid generic "AI-generated" aesthetic

### 6.2 Typography
- **Headings**: Modern sans-serif (Inter, Geist, or similar)
- **Body**: Highly readable serif or sans-serif
- **Code**: Monospace (JetBrains Mono, Fira Code)
- **Scale**: Modular scale with clear hierarchy

### 6.3 Color Palette
| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| Background | `#ffffff` | `#0a0a0a` |
| Foreground | `#171717` | `#ededed` |
| Muted | `#737373` | `#a3a3a3` |
| Accent | TBD | TBD |
| Border | `#e5e5e5` | `#262626` |

### 6.4 Spacing & Layout
- 8px base unit
- Max content width: 768px (prose), 1280px (full)
- Consistent vertical rhythm

---

## 7. SEO & Performance Requirements

### 7.1 SEO Checklist
- [ ] Semantic HTML structure
- [ ] Unique title and meta description per page
- [ ] Open Graph tags for social sharing
- [ ] Twitter Card meta tags
- [ ] JSON-LD structured data (Person, BlogPosting, WebSite)
- [ ] Canonical URLs
- [ ] XML sitemap submitted to Google Search Console
- [ ] RSS feed with full content
- [ ] robots.txt
- [ ] Alt text for all images

### 7.2 Performance Checklist
- [ ] Static generation for all pages
- [ ] Image optimization (WebP/AVIF, responsive sizes)
- [ ] Font subsetting and `font-display: swap`
- [ ] Minimal JavaScript (< 10KB for static pages)
- [ ] Preload critical assets
- [ ] Efficient CSS (Tailwind purging)
- [ ] Lazy loading for below-fold images
- [ ] Prefetching for navigation

---

## 8. Deployment & Infrastructure

### 8.1 Cloudflare Pages Configuration

```toml
# wrangler.toml (if using Workers)
name = "portfolio"
compatibility_date = "2024-01-01"  # Use recent stable date

[site]
bucket = "./dist"
```

### 8.2 Build Configuration
```bash
# Build command
npm run build

# Output directory
dist

# Environment variables
NODE_VERSION=lts  # Or specify current LTS version (e.g., 20, 22)
```

### 8.3 Custom Domain Setup
1. Add custom domain in Cloudflare Pages dashboard
2. Configure DNS (CNAME or proxied A record)
3. SSL certificate auto-provisioned

### 8.4 Deployment Pipeline
```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  Push to │ ──▶ │  Build   │ ──▶ │  Deploy  │ ──▶ │   Live   │
│  GitHub  │     │  Astro   │     │  to Edge │     │  (300+   │
│          │     │          │     │          │     │  PoPs)   │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
                      │
                      ▼
               Preview URL for
               every commit/PR
```

---

## 9. Rewrite Plan

> **Approach:** Build the new site in parallel while the existing site remains live. Switch over only when the new site is fully ready and tested.

### Phase 1: Foundation (Week 1)
- [ ] Create new repository for Astro project
- [ ] Initialize Astro project with TypeScript
- [ ] Configure Tailwind CSS (latest)
- [ ] Set up content collections schema
- [ ] Create base layouts
- [ ] Implement dark/light mode

### Phase 2: Core Pages (Week 2)
- [ ] Build homepage (new design)
- [ ] Build about page (new design)
- [ ] Build blog listing and post pages
- [ ] Build projects listing and detail pages
- [ ] Implement 404 page

### Phase 3: Content Migration (Week 3)
- [ ] Export/copy existing blog posts content
- [ ] Convert posts to MDX format with new frontmatter schema
- [ ] Export/copy project content to new structure
- [ ] Optimize and migrate images to new project
- [ ] Create URL redirect map (old URLs → new URLs)

### Phase 4: Polish & Launch (Week 4)
- [ ] Implement view transitions
- [ ] Add contact form functionality
- [ ] SEO audit and fixes
- [ ] Performance optimization
- [ ] Deploy to Cloudflare Pages (preview URL)
- [ ] Final testing and QA
- [ ] Configure custom domain (cutover)
- [ ] Set up redirects from old URL structure
- [ ] Submit updated sitemap to search engines
- [ ] Archive/deprecate old repository

---

## 10. Future Considerations (Post-MVP)

| Feature | Description | Priority |
|---------|-------------|----------|
| Full-text search | Client-side search with Pagefind or Fuse.js | P2 |
| Comments | Giscus (GitHub Discussions) or similar | P2 |
| Newsletter | Email subscription via Buttondown or Resend | P2 |
| Analytics dashboard | Custom analytics with Cloudflare Workers | P3 |
| Internationalization | Multi-language support | P3 |
| CMS integration | Headless CMS for non-technical editing | P3 |

---

## 11. Dependencies & Packages

```json
{
  "dependencies": {
    "astro": "latest",
    "@astrojs/mdx": "latest",
    "@astrojs/sitemap": "latest",
    "@astrojs/rss": "latest",
    "@astrojs/tailwind": "latest"
  },
  "devDependencies": {
    "tailwindcss": "latest",
    "typescript": "latest",
    "sharp": "latest",
    "@tailwindcss/typography": "latest"
  }
}
```

### Optional (for islands)
```json
{
  "@astrojs/react": "latest",
  "react": "latest",
  "react-dom": "latest"
}
```

> **Note:** Always use `latest` during initial setup to ensure the most up-to-date features and security patches. Lock versions in `package-lock.json` after installation for reproducible builds.

---

## 12. Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Astro breaking changes | Medium | Low | Pin versions after install, test upgrades in preview |
| Cloudflare service disruption | High | Very Low | Static assets cached globally, minimal impact |
| Content migration errors | Medium | Medium | Automated validation, manual review of converted posts |
| SEO ranking drop during cutover | Medium | Medium | Proper 301 redirects, keep old URLs working, gradual rollout |
| Scope creep | High | Medium | Strict MVP definition, defer non-essentials to post-launch |
| Longer timeline than expected | Medium | Medium | Parallel development allows flexible cutover date |
| Loss of existing functionality | Medium | Low | Document all current features before starting rewrite |

---

## 13. Open Questions

1. **Contact form backend**: Cloudflare Workers, Formspree, or Netlify Forms equivalent?
2. **Analytics preference**: Cloudflare Analytics, Plausible, or Umami?
3. **Design system**: Build custom or adapt existing (shadcn/ui)?
4. **Image hosting**: Local in repo, or external (Cloudflare Images, Cloudinary)?
5. **Domain**: Keep existing or new domain?

---

## 14. References

- [Astro Documentation](https://docs.astro.build)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
- [MDX Documentation](https://mdxjs.com)

---

## Appendix A: Competitive Analysis

| Site | Stack | Strengths | Learnings |
|------|-------|-----------|-----------|
| [leerob.io](https://leerob.io) | Next.js, Vercel | Clean design, fast | Content-focused layout |
| [joshwcomeau.com](https://joshwcomeau.com) | Gatsby | Interactive tutorials | Engaging components |
| [cassidoo.co](https://cassidoo.co) | Astro | Personality, fun | Don't be boring |
| [kentcdodds.com](https://kentcdodds.com) | Remix | Rich content ecosystem | Blog as platform |

---

*Document maintained in version control. Last updated: January 24, 2026*