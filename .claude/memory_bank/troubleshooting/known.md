# Known Issues and Gotchas

## Source Scan Results

No `TODO`, `FIXME`, `HACK`, `XXX`, `@ts-ignore`, or `@ts-expect-error` comments found in project source files.

The only `@ts-ignore` hits are in `.next/types/validator.ts` — Next.js auto-generated file, not project code.

---

## Gotchas Worth Noting

### Working Directory
The `package.json` and all dev commands live in `starimmo/`, not the repo root (`Starimmo/`). Always run `npm run dev`, `npm run build`, etc. from `starimmo/`. The repo root only contains a top-level `package-lock.json` and a `memory_bank/` folder (separate from the project's `.claude/memory_bank/`).

### Two Memory Bank Locations
There is a `memory_bank/` at the repo root (`/Starimmo/memory_bank/`) AND a `.claude/memory_bank/` inside the project (`/Starimmo/starimmo/.claude/memory_bank/`). The authoritative one for the agent team is `.claude/memory_bank/` inside the project. The root-level one may be stale or from a prior setup.

### Design System Font Override
`config/theme.ts` defines Geist Sans as the font, but `docs/DESIGN_SYSTEM.md` section 4 specifies "bold serif face (Playfair Display) for display/headings." The implementation currently uses Geist Sans for all headings — Playfair Display is documented intent but not yet implemented.

### Border Radius Discrepancy
`config/theme.ts` sets all radii to `"0 rem"` (sharp edges), but `docs/DESIGN_SYSTEM.md` section 6 describes card radius as `0.5rem` and button radius as `0.25rem`. The theme config wins in practice — the docs may reflect a prior intention.

### No Contact Form Implementation
`app/contact/page.tsx` exists but `ContactRequest` type is defined in `types/property.ts` with no corresponding form, server action, or API route. The contact page is a placeholder.

### getFeaturedProperties Mixing Types
`getFeaturedProperties()` in `catalog.ts` returns a mix of flats and houses (`[...flats.slice(0, 2), ...houses].slice(0, limit)`). Callers receive `Property[]` (union type). This works now but will need care if the query is ever filtered by type.
