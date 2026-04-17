# Initial Decisions (Pre-existing in Codebase)

## ADR-0001: Next.js App Router over Pages Router
Status: accepted
Date: 2026-03-15 (inferred from mock data timestamp)
Decision: Use Next.js App Router (`app/`) as the routing layer.
Rationale: App Router enables server components by default, reducing client JS bundle. Aligns with Next.js 13+ direction and enables granular streaming and layout nesting.
Consequences: All route files are server components unless explicitly marked `"use client"`. Layouts are composable. No `getServerSideProps` or `getStaticProps`.

---

## ADR-0002: Mock Data with Catalog Seam
Status: accepted
Decision: All property data lives in a single mock file behind a catalog query interface, not fetched from a database.
Rationale: Allows the public site to be built and designed before a database or CMS is selected. The `features/properties/catalog.ts` query functions are the stable interface; swapping the data source later changes only the catalog implementation, not any page code.
Consequences: No real-time data, no admin interface, no search. Adding Prisma means replacing the internals of `catalog.ts` without touching pages.

---

## ADR-0003: Tailwind CSS v4 with CSS Variable Token System
Status: accepted
Decision: Use Tailwind CSS v4 (`@tailwindcss/postcss`) with all design tokens defined in `config/theme.ts` and emitted as CSS variables on `<html>`.
Rationale: Separates design intent from implementation. Token changes propagate globally without touching components. The `@theme inline` block in `globals.css` bridges CSS vars to Tailwind utility classes.
Consequences: No hardcoded hex values in components. All components must use semantic token classes (`bg-background`, `text-muted-foreground`, etc.). Changing the theme means only editing `config/theme.ts`.

---

## ADR-0004: Monochrome Architectural Aesthetic
Status: accepted
Decision: The visual identity is strictly monochrome black/white with sharp geometry. No rounded pills, no gradients, no warm tones.
Rationale: Target audience is premium Luxembourg real estate buyers. The design brief aligns with architectural editorial photography and luxury property marketing, not SaaS or startup aesthetics.
Consequences: Any new component must commit to this aesthetic. Inter/Roboto/Arial are prohibited. Purple gradients, soft pastels, and generic card layouts are blocked by design rules.

---

## ADR-0005: No Auth, No CRM (Intentionally Deferred)
Status: accepted
Decision: Authentication and CRM features are explicitly out of scope for the initial build.
Rationale: Focus is on public marketing site first. Clean boundaries are being preserved so auth and CRM can be added without restructuring public components.
Consequences: No `useSession`, no protected routes, no admin panel. Future auth should live in dedicated route groups. Public components must never depend on auth state.

---

## ADR-0006: TypeScript Strict Mode
Status: accepted
Decision: `strict: true` with `noEmit: true` in tsconfig.
Rationale: Catches null/undefined errors at compile time. Forces explicit types on shared contracts (especially property types).
Consequences: All code must be fully typed. No implicit `any`. `types/property.ts` is the source of truth for all shared interfaces.

---

## ADR-0007: Unsplash for All Listing Images
Status: accepted
Decision: All property and listing images are Unsplash CDN URLs.
Rationale: Development convenience — high-quality photography without uploading assets. Configured in `next.config.ts` remotePatterns.
Consequences: Images depend on Unsplash CDN availability. Must be replaced with a real media hosting solution before production launch. `next/image` `remotePatterns` will need updating when the image host changes.

---

## ADR-0008: Server Components by Default
Status: accepted
Decision: All route files and most components are React Server Components. `"use client"` is opt-in only for interactivity or browser APIs.
Rationale: Reduces client JS bundle, enables direct async data access in components, and aligns with Next.js App Router best practices.
Consequences: Components that need `useState`, `useEffect`, event handlers, or browser APIs must be explicitly marked `"use client"` and kept as leaf nodes where possible.
