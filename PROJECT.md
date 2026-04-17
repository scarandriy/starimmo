# PROJECT.md

## What this is
Starimmo is a premium Luxembourg real estate marketing site. It presents property developments, flats, and houses to prospective buyers with a high-end monochrome editorial aesthetic. No backend, no auth — public marketing site with mock data.

## Stack
Next.js 16.2.4 / TypeScript 5 (strict) / Tailwind CSS v4 / React 19 / Lucide Icons / No DB / No Auth

## Key Paths
```
starimmo/app/                    Route entrypoints (server components)
starimmo/components/             UI, layout, and property display components
starimmo/config/site.ts          Routes, nav, copy, site identity
starimmo/config/theme.ts         All design tokens → CSS variables
starimmo/features/properties/    Data queries (catalog.ts) and mock data
starimmo/types/property.ts       All TypeScript contracts
starimmo/docs/                   Design system, architecture rules, data models
starimmo/.claude/memory_bank/    Agent memory bank (decisions, patterns, architecture)
```

## How to Run
```bash
cd starimmo
npm run dev     # localhost:3000
npm run build
npm run lint
```

## Current State (as of 2026-04-17)
- Public routes implemented: `/`, `/projects`, `/projects/[slug]`, `/flats/[slug]`, `/houses/[slug]`, `/about`, `/contact`
- Mock data: 2 projects (Luxembourg City), multiple flats and houses
- Design system: monochrome black/white, sharp geometry, no rounded pills, token-driven
- Layout primitives in place: SectionContainer, PageHero, ContentContainer
- Navigation and footer complete
- No forms, no search/filter, no auth, no database, no CRM
- Contact page exists but has no form implementation

## Open Questions
1. **Playfair Display serif** — documented in DESIGN_SYSTEM.md as the display/heading font, not yet implemented (currently Geist Sans). Intentional or deferred?
2. **Border radii** — `config/theme.ts` sets all to `"0 rem"` but DESIGN_SYSTEM.md specifies `0.5rem` for cards. Which is authoritative?
3. **Image hosting** — Unsplash CDN is a dev placeholder. What's the production media host (Cloudinary, S3, Sanity, etc.)?
4. **Contact form** — backend target? Server action, API route, or third-party form service (Resend, Formspree)?
5. **CMS or database** — Prisma + Postgres, Sanity, or something else? Affects `catalog.ts` swap strategy.
6. **Root `memory_bank/`** — there's a `memory_bank/` at the repo root outside of `starimmo/`. Is this still used?

## Memory Bank
```
.claude/memory_bank/architecture/overview.md    Stack, folder map, routing, data layer
.claude/memory_bank/patterns/conventions.md     Naming, imports, styling, component rules
.claude/memory_bank/decisions/initial.md        8 ADRs covering all major tech choices
.claude/memory_bank/troubleshooting/known.md    Gotchas: working dir, font/radius discrepancies, contact stub
```
