# Phase 03 — Design system (A Cromatic + C Strata)

Source of truth for implementation. Tokens live in `app/globals.css`; scent colors are derived in `lib/scent.ts`; components in `components/`. When this document and the code disagree, fix one of them in the same change.

> **Superseded in part (2026-09-24).** The brand direction in `CLAUDE.md` replaces color as the primary visual language: fragrance color is an atmospheric accent only; families, collections, the catalog and layering must not be expressed as color palettes or color mixing. Replaced by `phase-05-design-system.md` (color, type, product presentation, layering, discovery, motion). Space, grid, the buy path and the accessibility checklist still apply.

## Principles (five rules)

1. **Calm interface, colored products.** The UI is paper and ink. Color enters only through a fragrance (or a group of fragrances) and always means "this scent".
2. **Color is data.** Every scent color comes from `data/colors.json` + `data/colors.overrides.json` through `lib/scent.ts`. No component hard-codes a scent hex.
3. **Strata is behavior, not texture.** Layers express sequence (opening → heart → base) and combination (A + B). No blur, mist, glow or decorative translucency. Translucency is used once: strata that have "evaporated" in Time on Skin.
4. **The buy path is never hidden.** Format, price and one primary action are reachable in the first mobile viewport of a PDP and from a persistent bar afterwards.
5. **One signature moment per page.** Home: the scent atlas. Collection: the index with live color preview. PDP: time on skin + layering composer. Everything else is still.

## Typography

| Role | Face | Setting |
|---|---|---|
| Brand mark | Morph wordmark SVG (`components/Logo.tsx`, paths from Morph's own asset) | Never re-set in a font; never recolored except ink/paper |
| Everything else | Schibsted Grotesk (variable, OFL, `latin-ext`), weights 400 and 500 only | One family |

Why one grotesk: the serif wordmark stays the only serif, so the brand mark keeps its authority; a neutral editorial grotesk carries data (notes, hours, prices) legibly. Schibsted Grotesk was validated in Phase 02 at display and small sizes and is free to license. Licensed alternatives for production: Söhne, Neue Montreal (research 07).

Scale (`--t-*`): display `clamp(48,7vw,120)` / 0.92 / −0.04em · page title `clamp(44,5.4vw,92)` · section `clamp(28,3vw,46)` · sub `clamp(20,1.6vw,25)` · lede `clamp(17,1.3vw,20)` · body 16 · small 14 · micro 13 (minimum). Sentence case everywhere; no all-caps labels, no eyebrows above headings. Numbers that are compared (prices, hours, counts) use `tabular-nums` (`.num`).

## Color

### Interface tokens

| Token | Value | Use | Contrast on `--bg` |
|---|---|---|---|
| `--bg` | `#edeeeb` mineral paper | page background | — |
| `--fg` | `#1b1c1d` ink | text, primary buttons, focus | 14.7:1 |
| `--muted` | `#5d5f5e` | secondary text | 5.5:1 |
| `--border` | ink 14% | hairlines (structure, not controls) | decorative |
| `--border-strong` | `#7d7f7d` | control outlines (inputs, format tiles) | 3.4:1 (non-text ≥ 3) |
| `--surface` / `--surface-raised` | `#e4e5e1` / `#f6f6f3` | stage backgrounds, nudges, pickers | — |
| `--accent` | = `--fg` | the interface accent is ink | — |
| `--focus` | = `--fg` (paper on `.on-dark`) | 2px outline, 2px offset | 14.7:1 |
| `--error` | `#a3261d` | form errors | 6.3:1 |
| `--success` | `#2d6a3e` | confirmations | 5.6:1 |

### Fragrance accent (per scope, from data)

`scentTokens(p)` returns, per perfume:

- `--scent` — identity color: the **label band** for Luxury bottles that have one, otherwise the **juice** (Phase 02 finding: Luxury juices are near-identical gold; the band is the distinctive color). Overrides null out Les Exclusifs "accents" that were really smoked glass. Used for swatches, bars, strata, dots. **Never** used as a text background at full strength except the base stratum (below).
- `--scent-field` — identity mixed 36% into paper; background behind packshots (they sit on it with `multiply`). Ink on field is ≥ 7.2:1 for all 26 scents.
- `--scent-ink` — identity darkened until it reads as text on paper (≥ 4.5:1). Reserved; not used for body copy.
- `tiers[3]` — opening (30% into paper), heart (62%), base (full identity, lightened only if neither ink nor paper reaches 4.5:1 on it). Text color on a tier is chosen by `textOn()`.

Pale Ice colors are ≈1.2–1.5:1 against paper, so every swatch carries a 1px inner ink ring, and color is **never the only carrier** of a name: bars, chips and dots always have an accessible name and a visible label nearby.

### Collection accent

A collection has no single color. Its accent is its **chord**: the ordered strip of its members' identity colors with hard stops (`chord()` / `collectionChord()`), no blending. Families use the same device. Mixing members into one average produced three indistinguishable browns, so that was rejected.

### Contrast check (all 26 scents, computed from the same functions)

| Scent | Collection | Identity | Source | Field | Ink on field | Base tier | Text on base tier |
|---|---|---|---|---|---|---|---|
| Primitivo | ice | `#f4ce74` | juice | `#f0e2c0` | 13.3 | `#f4ce74` | ink 11.3 |
| GATE 17 | ice | `#ecc25c` | juice | `#eddeb8` | 12.8 | `#ecc25c` | ink 10.1 |
| Tonkatonic | ice | `#f6be87` | juice | `#f0ddc7` | 12.9 | `#f6be87` | ink 10.3 |
| Oud Mafia | ice | `#f6d897` | juice | `#f0e6cd` | 13.7 | `#f6d897` | ink 12.3 |
| Antigua Bay | luxury | `#054d76` | label band | `#99b4c1` | 7.8 | `#054d76` | paper 7.7 |
| Disumano | ice | `#3b6f6c` | label band | `#adc0bd` | 9.0 | `#3b6f6c` | paper 4.9 |
| Cruda | luxury | `#734155` | label band | `#c1b0b5` | 8.2 | `#734155` | paper 6.9 |
| Axum | luxury | `#634504` | juice | `#bbb198` | 8.0 | `#634504` | paper 7.6 |
| Malaga | luxury | `#e3c953` | juice | `#e9e1b4` | 12.9 | `#e3c953` | ink 10.4 |
| Vision | luxury | `#db5503` | label band | `#e7b797` | 9.4 | `#dc5b0c` (lightened) | ink 4.5 |
| Miyazawa | les-exclusifs | `#d0a136` | juice | `#e3d2aa` | 11.4 | `#d0a136` | ink 7.2 |
| Umhh | les-exclusifs | `#b78d41` | juice | `#dacbae` | 10.7 | `#b78d41` | ink 5.6 |
| Arles | luxury | `#95793a` | juice | `#cdc4ab` | 9.8 | `#9c8248` (lightened) | ink 4.6 |
| Too | les-exclusifs | `#c47f08` | juice | `#dec699` | 10.3 | `#c47f08` | ink 5.2 |
| Kolonaki | luxury | `#af0303` | label band | `#d79997` | 7.2 | `#af0303` | paper 6.4 |
| Iconic | les-exclusifs | `#e6ac4a` | juice | `#ead6b1` | 12.0 | `#e6ac4a` | ink 8.4 |
| Montmartre | luxury | `#c3a93a` | juice | `#ded5ab` | 11.6 | `#c3a93a` | ink 7.4 |
| Nudo | luxury | `#896637` | juice | `#c9bdaa` | 9.2 | `#9d815b` (lightened) | ink 4.7 |
| N8 | les-exclusifs | `#dc9f6e` | juice | `#e7d2be` | 11.7 | `#dc9f6e` | ink 7.5 |
| Indomable | luxury | `#a77560` | label band | `#d4c2b9` | 9.9 | `#aa7a66` (lightened) | ink 4.6 |
| A21 | les-exclusifs | `#ce6833` | label band | `#e2bea9` | 9.9 | `#ce6833` | ink 4.6 |
| Rose J | les-exclusifs | `#c8840c` | juice | `#e0c89b` | 10.5 | `#c8840c` | ink 5.5 |
| Animal | les-exclusifs | `#d5ac4e` | juice | `#e4d6b2` | 11.8 | `#d5ac4e` | ink 8.0 |
| Vapor | luxury | `#057266` | label band | `#99c1bb` | 8.7 | `#057266` | paper 5.0 |
| Zeta | luxury | `#ebbb23` | juice | `#ecdca3` | 12.5 | `#ebbb23` | ink 9.5 |
| Pure Soul | luxury | `#04470d` | label band | `#99b29b` | 7.5 | `#04470d` | paper 9.4 |


Adding a product: add its sampled color to `colors.json` (script `npm run colors`), check the row above by re-running the same computation; nothing else changes.

## Space, grid, shape

- Base unit 4px (`--s-1`…`--s-9`: 4, 8, 12, 16, 24, 32, 48, 64, 96).
- Page margin `--m: clamp(16px, 3.2vw, 48px)`; gutter `--gap: clamp(12px, 1.8vw, 28px)`; section rhythm `--section: clamp(80px, 10vw, 152px)`; max width 1560.
- 12 columns ≥ 900px; one column below. Standard split: 7 + 5 (media / information), with column 8 left empty as air on PDP and composer.
- **One radius: 2px** ("glass edge") for fields, buttons, inputs and tiles. Circles only for scent swatches (drops of color). No pills, no cards with shadows. The only shadow in the system is the floating buy bar.
- Borders: 1px hairlines separate rows and sections; a 1px **ink** rule opens a functional zone (filter bar, finder row). No boxed cards.

## Components

| Component | Contract |
|---|---|
| `SiteHeader` + navigation | Logo left, 5 IA items centered (Parfumuri, Descoperă, Layering, Cadouri, Casa Morph), Caută + Coș right. Solid paper, no blur. Mobile: logo, Caută, Coș, Meniu → full-height sheet (second-level items indented), Escape closes. `aria-current` follows the path. Items in `lib/nav.ts` |
| Links | Ink, underline 1px at 45% opacity, full on hover. Never blue |
| Buttons | `.btn` ink fill (primary, one per zone) · `.btn-secondary` outline · text link for tertiary. Heights 52 / 40 (44 on coarse pointers). Label says the action; price inside the primary CTA when it adds to cart |
| `ProductVisual` | Packshot on `--scent-field`, `object-fit: contain`, `multiply`, 7% vertical padding. `next/image` with `sizes`. The field color transitions (registered `@property`) when the scent changes in place |
| `ProductMeta` | Descriptor (first three real notes), family, longevity, optional travel price. The scent signal every listing carries |
| `ProductCard` | Visual 4:5, name, meta, price + "100 ml", secondary "Adaugă" (or "Anunță-mă"). Out of stock: desaturated visual + flag |
| `ProductIndexRow` | Color strip · name (24–34px) · notes (+ travel) · family / hours · price / availability · add. Hover/focus activates the preview; strip widens 4→10px. <1200px: thumbnail + "+" disclosure with the note strata inline |
| `FilterBar` | Search (names + every note) · family chips with mini chords and counts · "Filtre" panel (intensity, longevity, travel, in stock) · sort · Index/Galerie. State in the URL (`?familie=&q=&sort=&vedere=`). Live count; "Șterge filtrele". Sticky on desktop only |
| `CollectionPreview` | Title + count · supporting text · chord of member links. Used for collections and families |
| `PurchaseBlock` | Format tiles (100 ml / Travel 2×8 ml when it exists; a single price row otherwise) · primary CTA with total · gift box (+20 lei, as on Morph) · payment line · threshold nudge (travel or sample set) · sample set link. Out of stock: back-in-stock form with error/success states. Compact bar appears when the CTA leaves the viewport (floating on desktop, full-width on mobile) |
| `NotePyramid` | Three rows, each edged with its tier color: Deschidere, Inimă, Bază |
| `TimeOnSkin` | See Motion. Uses Morph's own paragraph per tier; only the total longevity is shown as time (no invented intermediate times) |
| `LayeringComposer` | Two slots (mini visual + name + "Schimbă" → chips grouped by collection). Stage: two strata columns multiplied where they overlap = A / A+B / B. Result list merges notes per tier with origin dots. States that the pair is a visualisation, not a Morph recommendation. Buy: both travel sizes if both exist, otherwise the relevant sample set; Your Next Form always offered as Morph's own curated alternative |
| `ScentAtlas` | Home hero: 26 bars grouped by collection (labels link to collection pages); hover/focus/tap recolors the field and swaps the bottle |
| `CartDrawer` | Mock. Items with scent dots, remove, subtotal, free-shipping progress to 750 lei; checkout disabled and labeled as out of concept scope. Focus moves in, Escape closes, focus returns |
| `Footer` | IA footer columns; items with a concept route are linked (Casa Morph, Certilogo), the rest listed. Snapshot date, concept disclaimer |

### Phase 04 additions

| Component | Contract |
|---|---|
| `PageHead` | Section page opening on the collection-head grid: breadcrumb + display title (cols 1–7), lede + facts + optional chord (cols 8–12), children below (usually `SectionNav`) |
| `SectionNav` | Second-level navigation inside a section (collections, Descoperă, Layering). Text links, 1px ink underline on the current one, horizontal scroll on phones, 44px targets on touch |
| `TryOffer` | The TRY action for one perfume from what Morph sells: travel 2×8 ml (add), else the collection sample set (add), else "epuizat" + Morph's link. Always a secondary button next to the primary buy button |
| `TryToggle` | "De încercat în Casa Morph" toggle (`aria-pressed`) for a perfume or a pair; list stored only in the browser (`lib/tryList.ts`), shown by `TryListPanel` on `/casa-morph` |
| `BlindStrata` | The composer's two strata columns drawn without color (outline, 6% ink tint on the second layer) for Your Next Form: unknown scents carry no color |
| `DiscoverInstrument` | Lens buttons (`aria-pressed`) regroup color keys (bar + visible name, button). Preview sticky on desktop; on phones it opens under the chosen group via CSS `order`. Flip on regroup. URL state |
| `FinderFlow` | One question per screen, answers as full-width rows with index, label and a chord of the perfumes Morph tagged with that answer; seven progress strata; palette re-weighted by score |
| `LayeringComposer` (extended) | `detail` mode: URL state, shared notes / families / intensity / seasons, formats table, both bottles, copy link. Phones: slots side by side, stage as three horizontal bands (A from left, B from right, overlap = result) |
| `NotePyramid` (extended) | Optional `mark` highlights matching notes (underline 2px, weight 500) |
| `.text-btn` | A `<button>` that reads as a text link (tertiary actions), 44px tall |

Metadata language: product facts appear as label/value pairs (`dl`) or plain comma lists — never as "A · B · C" strings.

## Motion

| Moment | Implementation | Duration / ease |
|---|---|---|
| Entrance (home only) | GSAP timeline: headline lines rise, field unmasks, atlas bars grow | 0.9–1 s, `power3.out` / `inOut` |
| Product selection (atlas) | GSAP crossfade of the bottle (0.18 s out, 0.5 s in) + CSS `@property` field color | `--d-story` 900ms |
| Filtering / sorting / view change | GSAP Flip on rows/cards (collection route; Descoperă lens change since Phase 04) | 0.45–0.5 s `power3.inOut` |
| Finder | CSS: question enters (translate 12px + fade), palette bars re-weight (flex-grow) | 640ms |
| Preview | Field color interpolation, strip width | 900 / 320ms |
| Layering | CSS: columns part and rejoin, strata recolor top→base with 120ms stagger | 900 / 640ms |
| Time on skin | IntersectionObserver sets the phase; CSS flex-grow + opacity on strata | 900 / 640ms |
| Hover | Underline, border, 1.5% bottle lift on cards | 160–640ms |
| Drawer / buy bar | CSS transform | 320–640ms `--ease-out` |

Rules: no pinning, no scrub, no smooth-scroll library, no parallax, no cursor tracking, no reveal-on-scroll for sections. GSAP is loaded only where it earns its place (home entrance and atlas, collection and Descoperă Flip); the PDP ships no GSAP code. `prefers-reduced-motion`: GSAP setups are skipped through `gsap.matchMedia`, CSS transitions collapse to 0.01ms, smooth scrolling becomes instant. The page is complete without motion (checked with reduced motion emulation).

## Accessibility checklist (built in)

Skip link · one `h1` per page, sections labelled by their headings · buttons for actions, links for navigation · `aria-pressed` / `aria-checked` / `aria-expanded` on toggles · live regions for result counts, composer result, notify status · visible 2px focus everywhere · touch targets ≥ 44px on coarse pointers (gallery dots 28px, above the 24px WCAG 2.2 minimum) · all scent text pairs ≥ 4.5:1 (table above) · color never the only signal.
