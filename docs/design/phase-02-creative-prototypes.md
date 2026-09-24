# Phase 02 — Creative prototypes

Nine focused screens: three creative directions × (homepage, collection, product page), built on the same real Morph data. Purpose: compare territories, not ship a site. No direction is chosen here. The comparison is in `phase-02-comparison.md`.

## How to run

```bash
npm install
npm run dev            # or: npm run build && npm start
```

- Index: `/`
- Screens: `/concept/{a|b|c}/{home|collection|product}`
- Parameters: collection `?c=les-exclusifs|luxury|ice` (default Luxury); product `?p=<slug>` (default Zeta, e.g. `?p=morph-vapor-parfum-100ml`)
- `?capture` hides the internal switcher bar used for navigating between prototypes.
- Captures (desktop 1440, mobile iPhone 13 at 390px): `docs/design/captures/{a,b,c}-{home,collection,product}-{desktop,mobile}-{top.png,full.jpg}`.

## Implementation

| Area | Decision |
|---|---|
| Stack | Next.js 16.3 (App Router) + React 19.3 + TypeScript 5.9 + GSAP 3.15 (ScrollTrigger, Flip). No CSS framework, no UI kit, no other runtime deps |
| Structure | `app/concept/{a,b,c}/`: each direction owns a layout (font), one CSS module and its components. Deleting a folder removes a direction. Shared code is limited to `lib/catalog.ts` (data), `components/shared/` (Logo, mock cart, motion hook, prototype switcher) |
| Data | `scripts/snapshot.mjs` reads Morph's public WooCommerce Store API (read-only, no credentials) into `data/catalog.json` and downloads product images to `public/morph/` (≈0.75 MB). 26 perfumes, 15 travel/discovery sets, 3 sample sets, 12 layering sets; snapshot 2026-09-24 |
| Colors | `scripts/colors.mjs` samples every packshot in Chromium (canvas) and stores `juice` (the gold/amber body) and `accent` (the label band) in `data/colors.json`. Five manual overrides null out accents that were really the smoked glass of Les Exclusifs (`data/colors.overrides.json`) |
| Logo | Morph's own wordmark SVG paths (from the public quiz plugin asset), rendered in `currentColor` |
| Motion | `useMotion()` wraps `gsap.matchMedia()`, so every animation is skipped under `prefers-reduced-motion` and reverted on unmount. Flip for filter/sort reflow in all three directions |
| Cart | An in-memory mock: "Adaugă" updates the header count and shows a confirmation. There is no checkout |
| Robots | `noindex` headers + metadata. This is a private concept |

Build: `next build` passes. All 18 captures (9 screens × 2 widths) show no console errors and no horizontal overflow. An interaction smoke test (color index, filters, composer, format switch, add to cart, collection preview, width-axis animation, time phases, pinned scroll) passes.

## Shared content structure (fairness)

Every direction uses the same products, images, facts and sections. Only composition, type, color, hierarchy, interaction and motion change.

| Screen | Sections, identical content across A/B/C |
|---|---|
| Home | Hero (origin fact, Morph line, route to shop + finder) → three collections → four steps (find / try / buy / combine, real offers and prices) → layering composer (Zeta + Vapor) → 4 bestsellers mixed across collections → Casa Morph (address, hours, Certilogo, free shipping ≥ 750 lei) |
| Collection | Luxury (13): title, Morph collection line, concentration, count, price → family filter (5 proposed groups) + sort → all 13 products incl. 2 out of stock → Luxury sample set tile after the 5th product → links to the other collections |
| Product | Zeta: gallery (3 Morph images) → name, concentration, 100 ml, 690 lei → Morph summary → family / intensity / longevity → notes by tier → 100 ml / travel 2×8 ml (230 lei) → threshold nudge (690 < 750) → sample set → Certilogo, boutique → Morph's own "Descriere" text → notes with Morph's paragraphs → composer → 4 related (same family) |

Font budget: one variable family per direction (C adds one display face). Imagery: the same Morph packshots everywhere, treated differently.

## A — Cromatic

**Visual concept.** Each perfume *is* its bottle color. The UI is quiet mineral paper (#edeeeb) and a single grotesk (Schibsted Grotesk), and the only accent is the scent currently in view. Collections read as color registers: Les Exclusifs smoked amber, Luxury label bands, Ice frosted pastels.

**Interaction concept.**
- **Color index** (home): 26 swatches grouped by collection. Hover or tap recolors the hero field (a CSS `@property` color transition) and swaps the bottle. The field is a light tint so the white-background packshot can sit on it with `multiply`.
- **Glass panes** (composer): two panes of the chosen colors slide together; the overlap multiplies into a third color. It offers both travel sizes when both exist.
- Collection chips carry the family color; the grid reflows with Flip.
- PDP notes as a three-step ramp of the scent's own hue.

**Motion.** One load moment (headline lines rise, field wipes up). Color transitions on selection, Flip on filter. Nothing else moves.

## B — Forma

**Visual concept.** *Morphē* means form. Concrete grey, graphite and silver; Archivo with a variable **width axis** as the type voice (compressed, uppercase display words). Every image frame is sheared by the bottle's ~7° twist (`clip-path` parallelogram). Images are monochrome, and **color appears only in the glass**: on hover, in the composer, and on the PDP bottle.

**Interaction concept.**
- **Width-axis wordmark** (home): "MORPH" compresses from width 125 to 62 while the hero frame takes the bottle's shear. The brand's form idea becomes an entrance.
- **Collection as index**: an architectural list (name, notes, family, longevity, price, add). Hovering a row reveals that bottle in color in a sticky sheared frame. It toggles to a gallery of sheared tiles.
- **Two twisted bottles** (composer): the bottles lean at −7° / +7° and overlap.
- PDP is a spec sheet (definition list) beside a full-height frame. The bottle fills with color on arrival; the note tiers are huge compressed words.

**Motion.** A hero width animation plus a frame shear; the three collection frames on the homepage settle from a stronger twist to 7° on scroll (scrub); a clip wipe on row preview; a color fill on the PDP.

## C — Strata

**Visual concept.** A scent develops in layers and over time. Cool mist (#e3e1e5), skin, aubergine; Instrument Sans with Instrument Serif italic as the "second layer" voice. Translucent veils (backdrop blur), overlapping sheets, and cards whose information veil rises over the image.

**Interaction concept.**
- **Veils clear with scroll** (home, desktop pinned): three veils carrying Zeta's real opening / heart / base notes slide away while the bottle comes into focus. The hero line is Morph's own "Identity, layer by layer."
- **Time on skin** (PDP, pinned on desktop; buttons on all sizes): opening → heart → base, with Morph's paragraph for each note and the longevity range. Buttons scroll to the phase when pinned, so state and scroll never disagree.
- **Gauze composer**: two tall tinted sheets overlap; below, the two note pyramids merge tier by tier (real notes).
- The buy bar is **always visible** on the PDP, because long immersive pages must keep shopping one tap away.

**Motion.** A pinned scrub on the home hero and the PDP time section; Flip with a blur-in on filter; veil reveals on cards (hover, desktop only).

## Decisions

1. **Same data, same sections, same images** in all three, so the comparison isolates the design language.
2. **Real data only.** Prices, sizes, notes, family, intensity, longevity, stock, the travel/sample/layering offers and their prices all come from the snapshot. Missing attributes show "—" (e.g. Axum's intensity). Story texts are Morph's own PDP paragraphs, trimmed by sentence.
3. **Composer ≠ recommendation.** The layering composers visualise any two scents the visitor chooses. None claims Morph recommends a pair. Your Next Form sets are presented as they are sold (blind, 12, 230 lei). The PDP default partner is a same-family scent that has a travel size, picked by attribute logic.
4. **Related products = same proposed family** (attribute-based), labelled as such.
5. **Concentration percentages are omitted.** Morph's site states 20%, 30% and 25–35% in different places (01 audit); only the concentration type is shown.
6. **Finder links** go to Morph's existing quiz (`morphparfum.ro/quiz`). The finder is out of scope for this phase.
7. **Out-of-stock products stay visible** (Malaga, Arles) with "Anunță-mă", sorted last.
8. **Every direction was fixed on mobile, not only desktop.** A header alignment; B title overlapping the thumbnails; C card text overlapping images; PDP media shortened so price and CTA come sooner on mobile (the exact defect found in the audit).

## Deviations from research

| Research said | Prototype does | Why |
|---|---|---|
| "Juice colors" as the palette (05, 07) | **Bottle colors**: the label band for Luxury, the juice for Les Exclusifs and Ice | Sampling showed Luxury juices are almost all gold; the distinctive color is the label band. Using juice alone would make 13 near-identical yellows |
| A: candidate fonts Neue Montreal / Söhne | Schibsted Grotesk (Google Fonts, free) | Licensing; a comparable editorial grotesk for a prototype |
| B: WebGL refraction hero | No WebGL; width-axis type + shear + color-in-glass | The brief asked for restraint and fair effort; the idea reads without 3D. WebGL stays a possible later enhancement |
| C: blends "computed from real pairs" | Overlapping tinted gauze sheets with masked edges | A first build used blurred blobs, which read as the "abstract liquid blob" cliché, so they were replaced |
| IA: 5 families (06) | Implemented as proposed; the original Morph value is still shown on the PDP (e.g. "Gourmand") | Keeps Morph's taxonomy visible while testing the simplified grouping |
| Sample set on PDP "credit-back" idea | Not shown | No evidence Morph offers credit-back; not invented |
| Product reviews | Not shown | Morph has 0 product reviews; none invented |

## Known limitations

- The finder, cart drawer, checkout, search, account, gift hub and pairing pages are out of scope.
- Images are Morph's low-resolution catalog packshots on white. All directions would need a dedicated shoot (A color-matched paper; B studio light and caustics; C mist, skin and fabric).
- The pinned sections in C create long pin spacers in full-page screenshots; in the browser they scroll normally.
- Fonts are loaded through `next/font/google` at build time (self-hosted in the output).
- Performance was not measured with Lighthouse in this phase. Pages load 30–46 requests (vs 230–370 on the live site), but that is a prototype without analytics or third-party scripts, not a like-for-like comparison.
