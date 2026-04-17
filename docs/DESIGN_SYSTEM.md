# Design System

## 1. Design Intent

Starimmo presents a bold, confident, high-contrast visual identity aligned with the expectations of premium Luxembourg real estate buyers. The design draws from architectural editorial photography and monochrome luxury branding.

The site must feel:

- authoritative
- modern
- high-contrast
- trustworthy

Avoid soft, pastel, or startup-like aesthetics. The visual language is closer to architectural magazines and premium property marketing than SaaS landing pages.

## 2. Visual Principles

- Use bold black-and-white contrast as the primary visual device.
- Alternate dark and light sections to create dramatic page rhythm.
- Let large architectural photography carry visual weight.
- Use sharp geometry and minimal border radii.
- Avoid excessive decoration, rounded pills, or bubbly shapes.
- Whitespace should feel intentional and generous, not empty.

## 3. Color System

The palette is monochrome with controlled accent use.

Core tokens:

- `background`: pure white (`#ffffff`)
- `foreground`: near-black (`#111111`)
- `surface`: white (`#ffffff`)
- `surface-muted`: light gray (`#f5f5f5`)
- `border`: light gray (`#e5e5e5`)
- `primary`: black (`#111111`) -- used for CTAs, navigation, emphasis
- `primary-foreground`: white (`#ffffff`)
- `secondary`: light gray (`#f5f5f5`)
- `secondary-foreground`: near-black (`#111111`)
- `accent`: black (`#111111`) -- monochrome accent for labels and eyebrows
- `accent-foreground`: white (`#ffffff`)
- `muted`: gray (`#f5f5f5`)
- `muted-foreground`: medium gray (`#737373`)
- `dark`: near-black (`#111111`) -- for dark section backgrounds
- `dark-foreground`: white (`#ffffff`) -- text on dark sections

Rules:

- Components must consume semantic tokens exclusively.
- Dark sections invert foreground/background using the dark token pair.
- No warm beige, cream, or gold tones anywhere in the interface.

## 4. Typography

Typography should feel editorial and architectural.

- Display and headings: bold serif face (Playfair Display) used at dramatic scale
- Body and UI copy: clean sans-serif (Geist) for readability
- Monospace: reserved for technical contexts only

Usage:

- `h1`: hero headlines only, used at 48-72px scale with tight letter-spacing
- `h2`: major section headings, 30-40px
- `h3`: card titles and subsection headings, 20-28px
- Body: descriptive copy at 14-16px

Rules:

- Headings use tight negative letter-spacing (`-0.03em` to `-0.04em`).
- Eyebrow labels use wide uppercase tracking (`0.15em+`).
- Body copy uses generous line-height for readability.
- No sentence-case softness on primary headings -- statements should feel declarative.

## 5. Layout System

- Max content width: `76rem` (centered)
- Narrow content width: `58rem` (for text-heavy pages)
- Section spacing: generous vertical rhythm using `clamp()` for responsiveness
- Card spacing: tight enough for scanning, generous enough for breathing room

Layout patterns:

- Full-bleed sections for heroes and dark bands
- Contained grid layouts for cards and content
- Sidebar layouts for property detail pages (content + summary panel)

## 6. Geometry and Surfaces

- Card border radius: `0.5rem` (sharp, not bubbly)
- Button border radius: `0.25rem` (rectangular, not pill-shaped)
- Input border radius: `0.375rem`
- Borders preferred over shadows for card separation
- Shadows used only on navigation and elevated floating elements
- Dark sections use solid background fills, not gradients

## 7. Component Rules

### Navigation

- Full-width dark/black background
- White text for links
- Brand identity on the left, navigation on the right
- Clean horizontal link row without pill-shaped active states
- Active state indicated by underline or weight change, not background fill
- Sticky on scroll

### Footer

- Full-width dark/black background matching navigation
- White text throughout
- Multi-column layout: brand + description, navigation links, contact details
- Clean horizontal divider separating footer from content

### Buttons and Links

All buttons use the `<Button>` component (`components/ui/button.tsx`). Never style buttons with inline Tailwind classes -- always use the component so changes propagate globally.

**Variants:**

| Variant | Background | Text color | Border | Use on |
|---|---|---|---|---|
| `primary` (default) | `#111111` | `#ffffff` | none | Light backgrounds |
| `outline` | transparent | `#111111` | `#e5e5e5` | Light backgrounds |
| `primaryDark` | `#ffffff` | `#111111` | none | Dark sections, hero overlays |
| `outlineDark` | transparent | `#ffffff` | `rgba(255,255,255,0.4)` | Dark sections, hero overlays |

**Sizes:**

| Size | Padding | Font weight |
|---|---|---|
| `default` | `px-6 py-3` | `font-semibold` |
| `sm` | `px-5 py-2.5` | `font-medium` |
| `xs` | `px-4 py-2` | `font-medium` |

**Props:** `variant`, `size`, `fullWidth`, `href` (renders `<Link>` when provided, `<button>` otherwise), `className`, standard button/anchor attributes.

**Color safety:** Text color is applied via inline `style={{ color }}` to prevent CSS inheritance from overriding contrast in nested dark contexts.

**Rules:**

- No pill-shaped buttons anywhere
- Hover states use opacity transition
- Text links use underline on hover
- Choose the correct variant for the section context -- never rely on Tailwind color utilities for button text

### Cards

- Sharp corners (`0.5rem` max)
- Thin border treatment
- Image fills the top of the card edge-to-edge
- Clean fact row below image with icon-style metadata
- No meta pills or bubbly tag shapes

### Property Cards

Each property card should expose:

- cover image (edge-to-edge)
- title
- location
- price
- key facts as an icon row (beds, baths, surface)
- status indicator
- one clear CTA

### Image Galleries

- Sharp-edged grid layout (no rounded corners on gallery items)
- First image spans wider for visual hierarchy
- Consistent aspect ratios within rows
- No carousel chrome -- static grid presentation
- Subtle hover zoom effect

## 8. Dark Sections

Dark sections are a core visual device:

- Background: `#111111`
- Text: white
- Used for: hero overlays, stats counters, CTA bands, amenity sections, footer
- Borders within dark sections use `rgba(255,255,255,0.15)`
- Buttons in dark sections invert to white background with black text

## 9. Page Tone

- Headlines should sound declarative and confident.
- Copy should speak as a real estate company, not about the codebase.
- Avoid meta-language about "typed contracts" or "future CRM integration."
- Contact prompts should feel direct and professional.
- Stats and figures should be displayed prominently.

## 10. Mobile-First Rules

Breakpoints scale progressively:

- Base: single-column stacked layout
- Medium (768px): two-column content blocks, denser fact grids
- Large (1024px): full grid layouts, sidebar detail panels

Rules:

- Heroes stack vertically on mobile with image above text
- Dark sections remain full-bleed at all sizes
- Navigation collapses cleanly on narrow screens
- Touch targets remain accessible
- Card grids go single-column on mobile

## 11. Imagery Direction

- Use bold, high-quality architectural photography
- Prefer dramatic interior and exterior shots with strong composition
- Images should fill their containers edge-to-edge
- Dark overlay on hero images for text readability
- No rounded image frames or excessive padding around images

## 12. Accessibility Rules

- Maintain WCAG AA contrast ratios on all text
- Dark sections must have sufficient contrast for white text
- Provide visible focus states using a ring color
- Never communicate status by color alone
- Heading order must remain logical
- All images must have descriptive alt text
