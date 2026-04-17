# Project Architecture

## What it does
Starimmo is a premium Luxembourg real estate marketing site. It presents residential property developments (projects), individual flats, and standalone houses to prospective buyers, with contact-driven lead generation.

## Stack
- **Framework:** Next.js 16.2.4 (App Router)
- **Language:** TypeScript 5, strict mode
- **Runtime:** Node.js
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/postcss`)
- **Icons:** Lucide React 0.577
- **Fonts:** Geist Sans + Geist Mono (Google Fonts via `next/font`)
- **Images:** Unsplash CDN (configured in `next.config.ts` remotePatterns)
- **No database, no auth, no ORM** — mock data only at this stage

## Folder Structure
```
starimmo/
  app/                  Route entrypoints only — thin composition layers
    layout.tsx          Root layout: Navigation + Footer wrapper, Geist fonts, theme CSS vars
    page.tsx            Homepage
    about/page.tsx      About page
    contact/page.tsx    Contact page
    projects/page.tsx   Projects listing
    projects/[slug]/    Project detail
    flats/[slug]/       Flat detail
    houses/[slug]/      House detail
    not-found.tsx       404 handler
  components/
    layout/             Structural wrappers: Navigation, Footer, PageHero, SectionContainer, ContentContainer
    property/           Domain display: PropertyCard, ProjectCard, GalleryCarousel, PropertyFactsGrid, PropertyFeatureList
    ui/                 Generic primitives: Button, HeroCtaButton, StatusBadge
  config/
    theme.ts            All design tokens (colors, radii, shadows, layout) → emitted as CSS vars
    site.ts             Site identity, route builders, nav items, static content copy
  docs/                 Engineering and product guidance (read-only reference)
    ARCHITECTURE_RULES.md
    CODE_TEMPLATES.md
    DATA_MODELS.md
    DESIGN_SYSTEM.md
    PRODUCT_STRUCTURE.md
  features/
    properties/
      catalog.ts        Query functions: getProjects, getFlats, getHouses, getFeatured*, getBySlug, getFacts
      data/
        mock-properties.ts   All seed data (2 projects, multiple flats, houses)
  lib/
    metadata.ts         buildMetadata() — canonical URL + OG tags from siteConfig
    utils.ts            cn(), formatCurrency(), formatSurface(), formatAddress(), formatListingStatus()
  types/
    property.ts         All shared TypeScript contracts (Project, Flat, House, Property, ContactRequest, enums)
  public/               Static assets
```

## Routing
App Router (`app/` directory). All routes are server components by default.

| Route | Purpose |
|---|---|
| `/` | Homepage: hero, featured projects, featured properties, CTA band |
| `/projects` | Full projects listing grid |
| `/projects/[slug]` | Project detail: gallery, facts, flat list |
| `/flats/[slug]` | Flat detail: gallery, facts, features, project link |
| `/houses/[slug]` | House detail: gallery, facts, features |
| `/about` | Brand story and team |
| `/contact` | Contact form / office details |

## Data Layer
- **No database.** All data lives in `features/properties/data/mock-properties.ts`.
- **Query interface** in `features/properties/catalog.ts` — all pages use these functions, not the data file directly. This seam is the swap point for a future database (Prisma) integration.
- Data types: `Project`, `Flat`, `House`, `Property` (union), `ContactRequest` — all in `types/property.ts`.
- `Flat` belongs to a `Project` (via `projectId`). `House` is standalone.

## Auth
None implemented. Architecture docs note auth is intentionally deferred.

## External Services
- **Unsplash CDN** — all images sourced from `images.unsplash.com` (configured in `next.config.ts`)
- **No analytics, no CRM, no email service** yet

## Build and Run
```bash
npm run dev     # next dev (localhost:3000)
npm run build   # next build
npm run start   # next start
npm run lint    # eslint
```
Working directory: `starimmo/` (not repo root — package.json is in `starimmo/`)
