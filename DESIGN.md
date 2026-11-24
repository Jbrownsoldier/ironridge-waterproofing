# Ironridge Foundation & Waterproofing — Architectural Design System (`DESIGN.md`)

> **Creative North Star:** *Architectural Engineering Monograph* — Precision structural engineering meets warm editorial craft. Calibrated, unhurried, deeply local to Central Ohio, and engineered for zero "AI slop" template signals.

---

## 1. Visual Identity & Color Tokens

| Token | Hex | Role |
|---|---|---|
| `--brand-canvas` | `#FAF9F6` | Warm Alabaster primary light background (replaces harsh `#FFFFFF`) |
| `--brand-surface` | `#F3F2EE` | Warm Stone tonal shift & alternating section ground |
| `--brand-obsidian` | `#0B0C0E` | Deep Architectural Obsidian hero & interactive diagnostic stage |
| `--brand-navy` | `#18181B` | Charcoal Ink primary text & dark structural callout cards |
| `--brand-navy-dark` | `#111113` | Deepest Carbon footer & recessed stage frame |
| `--brand-slate` | `#52525B` | Warm Zinc secondary body text (WCAG AA on `#FAF9F6` & `#F3F2EE`) |
| `--brand-cta` | `#C85A32` | Terracotta Clay primary action, active conduit accents, laser markers |
| `--brand-cta-hover` | `#B04A25` | Deep Terracotta active/hover press state |
| `--brand-verified` | `#1E6B4B` | Mineral Sage verification, warranties, dry-basement telemetry |

### Surface Materiality Rules
- **Subtle Drafting Grain**: Obsidian and warm-stone editorial sections carry an ultra-light inline SVG fractal noise overlay (`opacity: 0.03`, `pointer-events: none`) for physical vellum/concrete texture.
- **Architectural Hairlines**: Favor `1px` crisp structural borders (`rgba(24,24,27,0.08)` on light, `rgba(255,255,255,0.09)` on obsidian) and subtle corner registration ticks over heavy blur shadows or identical floating rounded boxes.
- **Subsoil Clay Strata Contours**: Dark structural sections use organic Central Ohio clay-strata contour hairlines rather than generic tech-SaaS square grids.
- **Specular Rim Lighting**: Dark interactive engineering stages use GPU-light CSS custom property cursor spotlight (`--mx`, `--my`) for a subtle `1px` specular edge catch — never neon glow.

---

## 2. Typography Architecture (Self-Hosted via `next/font/google`)

| Family | Variable | Strict Usage |
|---|---|---|
| **Plus Jakarta Sans** | `--font-jakarta` | All display headlines (`h1`–`h4`), UI controls, and body copy. Tight optical tracking (`-0.03em` on display, `-0.01em` on body). |
| **Instrument Serif** | `--font-instrument-serif` | **Strictly reserved** for Mark Callahan's founder pull-quotes, homeowner testimonials, and human editorial voice — never generic UI labels or hero headlines. |
| **JetBrains Mono** | `--font-jetbrains` | Tabular engineering telemetry (`±0.125"`), zone codes (`ZONE 01 //`), Ohio license numbers, pricing counters, and structural callouts (`font-variant-numeric: tabular-nums`). |

### Fluid Display Scale
- Hero `H1`: `clamp(2.5rem, 4.6vw, 4.15rem)` · line-height `1.04` · tracking `-0.035em`
- Section `H2`: `clamp(1.875rem, 3.2vw, 2.85rem)` · line-height `1.1` · tracking `-0.028em`
- Pull-Quote Editorial Serif: `clamp(1.5rem, 2.6vw, 2.35rem)` · line-height `1.18`

---

## 3. Motion Physics & Scroll Architecture

- **Weighted Inertia**: Global smooth scroll via `Lenis` synchronized to `GSAP ScrollTrigger`, automatically disabled when `prefers-reduced-motion: reduce` is active and automatically paused whenever a modal dialog or mobile drawer is open.
- **Primary Easing Curve**: Architectural damped deceleration `cubic-bezier(0.16, 1, 0.3, 1)` (GSAP `power4.out` / `expo.out`) — authoritative stop with zero Cartoon bounce.
- **Micro-Interaction Window**: `140ms–240ms` crisp ease-out feedback on buttons, chips, sliders, and interactive toggles.
- **Beyond Generic Fade-Ups**:
  - Display headlines: `MaskedHeadline` (`GSAP SplitText` line-mask reveal).
  - Documentary & project imagery: `CurtainReveal` (clip-path unveil + subtle `1.05 → 1` settle).
  - Structural dividers: `ArchitecturalRule` (`scaleX: 0 → 1` left-to-right hairline draw).
  - Numeric telemetry & pricing: `RollingNumber` (tabular-nums spring odometer roll).
  - Reading progress bar: Native CSS `animation-timeline: scroll(root)` compositor-thread indicator with automatic fallback.
  - Route transitions: Native Next.js / CSS View Transitions API (`view-transition-name`) with persistent `site-header` anchor and shared case-study card morphs.

---

## 4. Anti-"AI Slop" Guardrails

1. **Zero Symmetrical Box Monotony**: Vary layout cadence across sections — typographic architectural ledger (`AuthorityStrip`), interactive Greater Columbus soil map (`CentralOhioSoilMap`), asymmetric bento dossier (`SymptomGrid`), full-bleed unobstructed video & interactive simulator stages (`FieldVideoStage`, `InteractiveBlueprint`).
2. **Unobstructed Proof Media**: Never overlay cluttered badge stacks directly on top of real jobsite photography or field video subjects.
3. **Honest Production UI**: Never expose placeholder copy (`"Reset Demo Form"`), fabricated charts, or unoptimized raw multi-megabyte `<img>` assets.
4. **Performance & Accessibility First**: All photography delivered via `next/image` (AVIF/WebP + responsive `sizes`), all interactive diagnostics keyboard-navigable with full `aria-*` roles and reduced-motion fallbacks.
