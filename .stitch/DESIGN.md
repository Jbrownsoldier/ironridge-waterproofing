# Ironridge Architectural Structural & Waterproofing — Design System (`DESIGN.md`)

## 1. Visual Philosophy & Atmosphere
- **Archetype:** Contemporary Residential Structural Engineering Studio meets White-Glove Local Craftsmanship.
- **Vibe:** Calm, authoritative, tactile, and transparent. Replaces legacy home-service clichés (muddy navy boxes and traffic-cone orange borders) with an airy **Material 3 Tonal Surface System**, generous breathing room, and documentary jobsite realism.

---

## 2. Color & Tonal Surface Tokens

| Token Name | Hex | Role |
| :--- | :--- | :--- |
| `surface-canvas` (`--brand-canvas`) | `#FAF9F6` | Primary warm alabaster page background |
| `surface-container-lowest` | `#FFFFFF` | Elevated interactive cards, diagnostic qualifier, project dossier |
| `surface-container-low` (`--brand-surface`) | `#F3F2EE` | Nested option tiles, metrics ribbon, secondary section canvas |
| `surface-container-high` | `#EAE8E1` | Hover states on stone tiles, tab tracks, subtle dividers |
| `on-surface` (`--brand-navy`) | `#18181B` | Deep architectural charcoal ink for primary headlines & grounding |
| `on-surface-variant` (`--brand-slate`) | `#52525B` | Warm zinc secondary body copy |
| `primary-accent` (`--brand-cta`) | `#C85A32` | Refined architectural terracotta clay for primary CTAs & active conduits |
| `primary-accent-hover` | `#B04A25` | Deep terracotta hover state |
| `verified-accent` (`--brand-verified`) | `#1E6B4B` | Mineral sage green for verified reviews, dry guarantees & SMS delivery |

---

## 3. Typography System

- **Display & Headings (`--font-heading`):** `Plus Jakarta Sans` (`600`, `700`, `800`), tight tracking (`-0.025em`), line-height `1.08`–`1.15`.
- **Body Copy (`--font-sans`):** `Plus Jakarta Sans` (`400`, `500`, `600`), minimum `16px`–`18px` for effortless homeowner legibility.
- **Technical & Engineering Specs (`--font-mono`):** `JetBrains Mono` (`500`, `600`) for diagnostic codes (`01 /HYDROSTATIC`), laser tolerances (`±0.125"`), and license numbers (`#OH-FDN-84921`).

---

## 4. Signature Stitch UI Patterns

1. **Tonal Surface Elevation Over Borders:** Cards and form options sit on soft tonal layers (`#FFFFFF` over `#FAF9F6`, `#F7F6F2` tiles shifting to `#EFECE6` on hover) with diffused multi-layer shadows (`0 24px 48px -12px rgba(24,24,27,0.08)`).
2. **Hover Accent Conduit Bars:** Interactive Bento cards feature a concealed left/right terracotta accent bar (`w-1.5 bg-[#C85A32]`) that glides into view on hover alongside expanding directional arrows (`gap-1.5 group-hover:gap-3`).
3. **Floating Glassmorphic Telemetry Chips:** Documentary photography frames include floating `backdrop-blur-md bg-white/90` telemetry overlays displaying real-time field data (laser readings, completion duration, zero-excavation verification).
4. **Animated Focus Conduit Inputs:** Form inputs use borderless soft stone fills (`#F7F6F2`) with an animated bottom terracotta conduit line (`w-0 group-focus-within:w-full transition-all duration-300`) that expands on focus.
