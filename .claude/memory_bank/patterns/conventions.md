# Established Conventions

## Naming
- React components: `PascalCase` (e.g. `PropertyCard`, `PageHero`)
- Hooks: `camelCase` prefixed with `use`
- Utility and config files: `kebab-case` (e.g. `mock-properties.ts`, `metadata.ts`)
- Route segment folders: lowercase matching URL (e.g. `app/projects/[slug]/`)
- TypeScript types/interfaces: `PascalCase`
- Constants: named export objects (e.g. `siteConfig`, `routes`); `UPPER_SNAKE_CASE` only for true scalar constants

## Component Structure
- Split into three tiers: `components/ui/` (generic primitives), `components/layout/` (structural wrappers), `components/property/` (domain-specific display)
- Route files in `app/` compose these; they do not contain logic or repeat structure
- Components accept typed props; no route-specific assumptions inside shared components

## Import Rules
- Always use `@/` alias (maps to project root). Never use deep relative imports.
- `app/` → can import from `@/components`, `@/features`, `@/config`, `@/lib`, `@/types`
- `components/` → can import from `@/config`, `@/lib`, `@/types` only
- `features/` → can import from `@/config`, `@/lib`, `@/types` only
- No circular imports across layers

## Data Fetching
- Default to **server components** for all data access and page rendering
- Opt into client components only for: pathname-aware nav, browser state, forms with live validation, future filters
- All data access goes through `features/properties/catalog.ts` query functions — never import `mock-properties.ts` directly in pages
- This seam pattern means database integration later changes `catalog.ts` only, not pages

## Styling Approach
- **Tailwind CSS v4** via `app/globals.css` (`@import "tailwindcss"`)
- Design tokens defined in `config/theme.ts` → emitted as CSS variables on `<html>` via `getThemeStyleVariables()`
- Tailwind utilities reference semantic tokens: `bg-background`, `text-foreground`, `text-muted-foreground`, `bg-surface-muted`, `border-border`, etc.
- **Never hardcode hex values in components.** All colors come from `--theme-color-*` vars.
- `@theme inline` block in `globals.css` maps Tailwind tokens to CSS vars.

## Design System Rules (non-negotiable)
- Border radii: cards `0rem`, buttons `0rem`, inputs `0rem` — sharp geometry, no rounded pills
- Monochrome palette: black `#111111` and white `#ffffff` as primary contrast, gray scale for surfaces
- No warm tones, no gradients, no soft pastels — architectural editorial aesthetic
- Section rhythm alternates dark (`bg-dark`) and light sections for visual drama
- Typography: tight negative letter-spacing on headings (`-0.03em`), wide uppercase tracking on eyebrow labels (`0.15em+`)
- Font: Geist Sans for all UI (not Inter, Roboto, or Arial in new work)

## Button Component Contract
All buttons rendered via `<Button>` (`components/ui/button.tsx`). Never inline style a button.
- `variant`: `primary` (default), `outline`, `primaryDark`, `outlineDark`
- `size`: `default`, `sm`, `xs`
- `href` prop → renders `<Link>`, otherwise `<button>`
- Text color applied via inline `style={{ color }}` to survive dark section CSS inheritance

## Layout Primitives
- `SectionContainer` — standard content sections with optional `eyebrow`, `title`, `description`, `dark`, `narrow`, `spacing` variants
- `ContentContainer` — width-only wrapper, no vertical rhythm
- `PageHero` — image-led heroes; avoid repeating hero overlay markup in route files

## Metadata
- Every page exports `metadata` built via `buildMetadata({ title, description, path, image })`
- Canonical URLs auto-generated from `siteConfig.siteUrl` + path
- OG image defaults to `siteConfig.defaultOgImage`

## State Management
None. All pages are server components. No client state library in use.

## Error Handling
- Dynamic routes use `notFound()` from Next.js for missing slugs
- No error boundaries implemented yet
- API error response shape defined in docs (not yet implemented): `{ success, data }` / `{ success: false, error: { code, message } }`

## TypeScript
- `strict: true` in tsconfig
- `moduleResolution: "bundler"`, `module: "esnext"`, `target: "ES2017"`
- Path alias: `@/*` → `./*` (project root)
- Type definitions in `types/property.ts` — all property/project types live here
- No `@ts-ignore` in project source (only in Next.js auto-generated `.next/` files)
