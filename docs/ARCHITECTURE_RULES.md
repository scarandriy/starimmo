# Architecture Rules

## 1. Current Baseline

The current application is a minimal Next.js 16 App Router scaffold rooted in `starimmo/`.

- Routing currently lives in `app/` with only `layout.tsx` and `page.tsx`.
- Styling uses Tailwind CSS v4 through `app/globals.css`.
- TypeScript strict mode is enabled and `@/*` already maps to the project root.
- There is no domain layer, shared component system, API structure, database code, or admin/auth module yet.

This baseline is intentionally being expanded into a documentation-first architecture so future growth stays consistent.

## 2. Architecture Principles

- Keep route files thin and compositional.
- Centralize shared configuration, tokens, paths, and metadata.
- Treat domain types as contracts that UI and future backend code must share.
- Prefer server components by default and only opt into client components for interactivity or browser APIs.
- Make future CRM, Prisma, and authentication additions possible without restructuring the public site.

## 3. Folder Structure Rules

The project must follow this structure:

```text
app/                    Route entrypoints only
components/             Reusable UI and layout primitives
components/layout/      Navigation, footer, structural wrappers
components/property/    Real-estate specific reusable display components
components/ui/          Generic low-level UI primitives
config/                 Centralized theme, site, route, and metadata constants
docs/                   Product and engineering guidance
features/               Domain-oriented modules and data access seams
features/properties/    Property-specific queries, fixtures, view helpers
lib/                    Cross-cutting utilities and framework helpers
types/                  Shared TypeScript contracts
```

Rules:

- `app/` may compose features and components, but must not contain large business logic blocks.
- Reusable code belongs in `components/`, `features/`, `lib/`, or `types/`.
- Product copy, route constants, and theme values must not be duplicated across pages.
- Future admin code should live in dedicated route groups and feature modules, not mixed with public pages.

## 4. Import Rules

- Use `@/` imports for internal modules.
- Do not use deep relative imports like `../../../components/property-card`.
- Route files may import from `@/components`, `@/features`, `@/config`, `@/lib`, and `@/types`.
- Components may import from `@/config`, `@/lib`, and `@/types`.
- Components must not import route modules from `app/`.
- Feature modules may import from `@/config`, `@/lib`, and `@/types`, but must not depend on route files.

Allowed examples:

```ts
import { routes } from "@/config/site";
import { getProjects } from "@/features/properties/catalog";
import type { Project } from "@/types/property";
```

## 5. Naming Conventions

- React components: `PascalCase`
- Hooks: `camelCase` prefixed with `use`
- Utility files: `kebab-case`
- Route segment folders: lowercase, matching URL structure
- Type aliases and interfaces: `PascalCase`
- Constants: `UPPER_SNAKE_CASE` only for true constants; otherwise export named objects

Examples:

- `components/property/project-card.tsx`
- `features/properties/data/mock-properties.ts`
- `types/property.ts`

## 6. Route and Page Rules

- Every public page must export metadata directly or via a shared metadata builder.
- Dynamic pages must source data through a feature query function, not inline objects.
- Pages should compose sections from reusable components and config-driven content.
- Use `notFound()` for missing slugs instead of rendering broken states.
- Route files should assemble shared layout primitives instead of duplicating width and spacing shells.

Page section system:

- Standard content sections must use `SectionContainer`.
- Compact stripes, stats bands, and similar add-on blocks should use `SectionContainer` with an explicit spacing variant such as `spacing="compact"`.
- Width-only alignment without vertical rhythm should use `ContentContainer`.
- Image-led page heroes should use `PageHero` instead of repeating `hero-overlay`, `max-w`, and padding wrappers in route files.
- Prefer named layout variants like `width`, `spacing`, and `dark` over one-off `py-*`, `pt-*`, and duplicated `max-w-(--theme-layout-content-max)` classes.

Planned public route tree:

```text
/
/projects
/projects/[slug]
/flats/[slug]
/houses/[slug]
/about
/contact
```

## 7. Data Fetching Conventions

Use the following defaults:

- Server components: page rendering, content assembly, SEO metadata, data lookup
- Client components: pathname-aware navigation, carousels that need browser state, forms with live validation, future filters
- Server actions: authenticated mutations or tightly coupled form submissions after backend work exists
- API routes: external integrations, webhook targets, decoupled mutation endpoints, or public API surfaces

Rules:

- Default to server components until interactivity is required.
- Create feature-level query functions even for mock data so later database integration swaps the implementation, not the page contract.
- Keep client components focused on presentation and interaction, not data ownership.

## 8. API Route Conventions

When API routes are introduced, every handler must follow the same pattern.

Rules:

- Validate input before work starts.
- Return a consistent JSON shape.
- Map known failures to explicit status codes.
- Never hardcode routes, identifiers, or environment values in handlers.
- Read constants from `config/` and helpers from `lib/`.

Response format:

```ts
type ApiSuccess<T> = {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
};

type ApiError = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
};
```

Error handling rules:

- 400 for validation failures
- 401/403 for auth failures
- 404 for missing resources
- 409 for conflicts
- 500 for unexpected failures with server-side logging

## 9. Configuration Rules

- Colors, layout tokens, and semantic styling values belong in `config/theme.ts`.
- Site identity, route builders, navigation items, and default content blocks belong in `config/site.ts`.
- Shared metadata generation belongs in `lib/metadata.ts`.
- Future database and auth clients should be created in `lib/` behind stable interfaces.

## 10. Reusability Rules

- Components must accept typed props and avoid route-specific assumptions when possible.
- Property cards, galleries, and layout wrappers should work with mock data now and database data later.
- Prefer composition over prop explosion.
- Keep visual primitives generic and domain components explicit.

## 11. Styling Rules

- All UI colors must originate from theme variables.
- Tailwind utility usage should reference semantic tokens such as `bg-surface`, `text-muted-foreground`, and `border-border`.
- Avoid arbitrary hex values in components unless they are part of the central theme file.
- Use mobile-first spacing and responsive enhancement.
- Shared vertical rhythm belongs in layout tokens and shared classes, not per-page spacing guesses.
- When section spacing needs to change globally, update `config/theme.ts`, `app/globals.css`, or shared layout primitives first.

## 12. Future CRM Boundary

CRM and admin are intentionally deferred.

To keep the codebase ready:

- Preserve clean boundaries between public UI, feature queries, and future mutation flows.
- Avoid coupling public components to authentication state.
- Model data in a way that can be backed by Prisma later without renaming the public contracts.
