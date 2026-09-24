# Phase 05 — Design system (Niche · Matter · Light)

Source of truth for implementation from Phase 05 on. It replaces the visual parts of `phase-03-design-system.md` (color principles, scent tokens, chords, strata, atlas, color keys). What still applies from Phase 03: the space scale, the 12-column grid, the buy-path rules, the accessibility checklist and the component contracts not listed here. Tokens live in `app/globals.css`. Why the reset happened: `phase-05-art-direction-reset.md`.

## Principles

1. **Product first.** Every fragrance appears as its bottle, in a lit niche. No fragrance is ever represented by a color field, bar, chip, dot or swatch.
2. **Matter and light, not palette.** Surfaces are materials (stone, dark room, walnut, one burgundy wall). The emotional work is done by light: a niche lit from behind the bottle, falling off toward its edges.
3. **Color is atmosphere.** A scent's sampled color tints the light inside its niche by 14%. That is its only use. It is not a taxonomy, not navigation, not a family and not a layering result.
4. **Fragrance language for discovery.** Families, lenses and results are described by Morph's published notes, tiers, intensity, longevity and collections, in the serif, next to the real objects.
5. **One signature per page, a different motion role each.** Motion explains a change of state; nothing moves for decoration. The site is complete with animation disabled.
6. **The buy path is never hidden** (unchanged from Phase 03): format, price and one primary action in the first mobile viewport of a PDP, a persistent bar afterwards.

## Palette philosophy

Three tones, set per chapter with `data-tone` on a full-bleed `.band` (the header adopts the tone under it):

| Tone | Where | `--bg` / `--fg` | Muted (contrast) |
|---|---|---|---|
| Stone (default) | commerce, reading, lists | `#ebe7e0` / `#191613` | `#615a52` (5.5:1) |
| Night `data-tone="dark"` | campaign hero, layering studio, time on skin, footer | `#151210` / `#ece6dc` | `#a2998e` (6.6:1) |
| Wood `data-tone="wood"` | collection vitrines, boutique chapters | `#221a14` + faint walnut grain / `#ece6dc` | `#a89c8e` (6.1:1) |

Accents, used once per page at most: `--wine #4a1822` (the boutique's art wall, Casa Morph only), `--metal #8f877c` (brushed-metal hairlines on dark: the hero label rule, the layering seam, the disclaimer rule). No gold. No brand color. Buttons, focus and borders follow the tone (`--fg` / `--bg`), so a primary button is ink on stone and bone on night.

The grain is one SVG `feTurbulence` data URI stretched over the band (no tiling seam, no image download). It must stay barely visible; if it reads as "wood texture" it is too strong.

## Typography

| Role | Face | Setting |
|---|---|---|
| Wordmark | Morph SVG (`components/Logo.tsx`) | untouched |
| Names and chapters | Newsreader (Google Fonts, OFL, variable `opsz`, 300/400, italic) | `.t-display` 52–128px / 300, `.t-1` 42–88px / 300, `.t-2` 30–50px / 400. Fragrance names, chapter titles, Morph's quoted copy, note lists at scale |
| Everything read or compared | Schibsted Grotesk (unchanged) | body 16, `.t-3` 19–23 / 500, small 14, micro 13 |
| Measured facts | Schibsted Grotesk `.label` | 11.5px, 500, uppercase, +0.09em. Only for facts: tiers, formats, collection · concentration lines, section keys ("Obiectul", "Acasă") |

Rules: the serif never carries UI (buttons, filters, prices). Italic marks the current choice (the focused fragrance, the open slot, the active row) instead of a color. Sentence case everywhere except `.label`. Two families only.

## Grid, spacing, scale

Unchanged tokens: 4px base (`--s-1`…`--s-9`), `--m` page margin, `--gap`, `--section`, max width 1560, 12 columns ≥ 900px, one column below. New composition habits:

- **Asymmetric editorial splits**: 7 + gap + 4 (head: title / lede), 5 + 5 + 2 (hero: text / niche / museum label), 4 + 8 (index / stage).
- **Product scale**: the hero niche is the full remaining viewport height; stage niches 70–84vh on desktop, 56–70svh full-bleed on phones; list objects 64×80, thumbnails 56×70 / 48×60 / 32×40. Every size is the same niche, so the object reads as the same thing at every scale.
- `.band` = full-bleed chapter with `padding-block: var(--section)`. Put the `.wrap` inside it.
- Note: `.wrap` sets `margin: 0 auto; padding: 0 var(--m)`. A module rule that sets margin or padding on the same element must double its class (`.story.story`) to win.

## Image and material treatment

- **Niche** (`ProductVisual`, `Niche`, `.niche-sm`): radial light `var(--glow)` → `--niche-mid` → `--niche-edge`, a top inner shadow (the recess), a glass shelf edge and a darker floor in the lower 13%. Packshots on white are `multiply`-ed onto it, so the light becomes their background with no halo. On dark tones the niche edge darkens (`#6a5e52`), so the niche reads as a lit box set into the room.
- `--glow` is a registered `@property` color: it interpolates (900ms) when the fragrance in a niche changes.
- Packshots only, never recolored or retouched. Tilted or angled Morph shots (e.g. Antigua Bay, image 3) are used where a chapter talks about form.
- Sold out: `grayscale(0.6)` on the object plus a text flag. Never color alone.

## Buttons and navigation

- `.btn` (primary, one per zone), `.btn-secondary`, `.text-btn` / `.link` for tertiary; 52 / 40px, 44px on coarse pointers; price inside the CTA when it adds to cart, laid out `justify-content: space-between`.
- Header: logo, five IA items (Parfumuri, Descoperă, Layering, Cadouri, Casa Morph — Cadouri is now internal), Caută (opens the overlay; `/` shortcut), Coș with count. Tone follows the chapter under it. Mobile sheet: serif items, second level indented.
- `SectionNav`, `PageHead`: unchanged contracts; `PageHead` lost its color chord.

## Collection presentation

- **Vitrine head** (wood): breadcrumb, display title, collection line, a facts list (concentration, count, price), then the **shelf**: every bottle of the collection as a small niche with its name, linking to its PDP. Above 14 objects the names hide (links keep an accessible name).
- **Index rows**: object (64×80 niche) · serif name · three-note descriptor · family and hours · price and stock · add. Active row = italic name; preview (desktop ≥ 1200) = large niche, label, serif name, note formula, facts, actions.
- **Families** are typographic rows: serif family name at display size, its four most frequent real notes, Morph's own classifications it gathers, three of its bottles, a count link.

## Product presentation (PDP)

Gallery in niches (sticky on desktop) · serif name · `.label` collection · concentration · unisex · 100 ml · serif-italic descriptor · purchase block (format tiles, CTA with total, gift box, payment line, threshold nudge, sample set) · facts (family, intensity, time on skin) · summary · assurances · Morph's description as a serif quote · **Time on skin** (night) · **composer** (night) · same-family cards.

`NotePyramid` is now a formula: numbered tiers (`1 Deschidere`, `2 Inimă`, `3 Bază`) as `.label`, notes as text, hairlines between. No tier colors.

## Search

`SearchOverlay`: full-screen stone dialog, input in the serif at display size, focused on open (and selected on reopen), `/` opens it anywhere outside a field, Escape closes and returns focus, Tab is trapped. Groups: Parfumuri (name or collection), Cu nota căutată (every perfume carrying the note, with its tier), Familii, Seturi și formate, Pagini. Empty query: note chips, collections, bestsellers. No result: Finder and families. Entry motion: fade 320ms, input rises 10px over 640ms, groups rise with a 60ms offset.

## Cart

`CartDrawer`: serif title with count, lines merged by key with quantity steppers, object thumbnail (bottle or box via `imageFor`), serif name, `.label` format, line total, remove; free-shipping line and bar; subtotal; checkout disabled and labelled as concept scope; empty state points to perfumes, trial formats and the Finder. Focus moves in, Escape closes, focus returns.

## Layering (composition studio)

Night tone. Object A (niche + slot) · the score · object B. The score: the two names, then three tier rows in time order; A's notes set right-aligned toward a hairline seam, B's left-aligned from it; notes both carry **in the same tier** sit on the seam in the serif; notes both carry **in different tiers** are dotted-underlined "echoes". Slots open a picker that is a shelf of bottles grouped by collection. The visitor-pair statement sits on a metal rule: "Aceasta este o vizualizare a celor două compoziții după notele publicate de Morph, nu o recomandare Morph." Phones: the two objects side by side, then the tiers with A left / B right and seam notes on their own line.

Your Next Form is drawn as **two unlit niches** (`BlindPair`): a lit niche means a known fragrance; a blind set shows nothing until the box is opened.

## Motion

| Role | Where | How |
|---|---|---|
| LOAD → ENTRY | home hero (kept from Phase 03–04) | GSAP: headline lines rise, the niche unmasks upward, then its light comes up (a dim layer fades 1.4s) and the bottle settles; captions fade in |
| IMAGE → REVEAL | home "Obiectul" niches only | `Reveal`: clip-path unmask upward once, when the chapter enters |
| PRODUCT → FOCUS | "Cele mai alese", index preview, Descoperă preview | GSAP crossfade: the object sinks and fades, the new one rises with the text, `--glow` re-tints |
| SEARCH → OVERLAY | search | CSS fade + input rise + staggered groups |
| LAYERING → COMPOSITION | composer | CSS: on every change A's notes enter from the left, B's from the right, tier by tier (160ms apart: opening first, base last), seam notes settle last |
| TIME → LIGHT | PDP time on skin | the niche's light warms and lowers with the phase in view (1.4s) |
| SECTION → TRANSITION | header | background and text tone follow the chapter under the header (320ms) |
| FILTER → REFLOW | collection, Descoperă | GSAP Flip (unchanged) |
| Finder narrowing | finder | the shelf of 23 tagged bottles: matches stay lit, others dim (opacity + grayscale by score) |

Rules: no pinning, no scrub, no parallax, no cursor tracking, no blur, no particles, no reveal on text. `prefers-reduced-motion`: GSAP setups are skipped (`useMotion` / `reducedMotion()`), `Reveal` never hides, CSS durations collapse to 0.01ms. Checked in the smoke test.

## Accessibility (additions)

Contrast pairs above; `.label` never below 11.5px and only for short facts with a readable value next to it. Buttons for actions (`aria-pressed` on focus names, lenses, answers, picks), links for navigation. The search and cart are modal dialogs with focus management. Objects used as links carry the fragrance name as their accessible name; decorative niches are `aria-hidden`. Nothing depends on hover: every hover preview has a click/tap or focus equivalent.
