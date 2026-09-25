# Phase C3.5: Layering and Your Next Form

Scope: `/layering`, `/layering/your-next-form`, and what directly serves them (the pair stage, the composer, the YNF index, their smoke checks). C4 and C5 have not started. The header, the nav, `/parfumuri`, `/parfumuri/corp`, `/descopera` and the transition architecture were not redesigned. Captures are in `captures/phase-c3-5/` (`before-*` is the state at the start of the phase).

The journey the two routes now carry:

discover → find → try → buy → **combine** (`/layering`) → **explore your next form** (`/layering/your-next-form`).

## Before: Impeccable critique

Focused critique with the Impeccable skill (critique dimensions, craft floor, detector) on both routes, with runtime captures at 1440 and 390 and the picker open. The detector returned no findings on either route's files, as in C1–C3. The review found:

1. **Layering was a comparison, not a composition.** Two bottles stood in separate light-coloured niche frames at the far edges of the grid, with a three-row table between them. The two objects never met. That is the phase 05.5 finding ("a correct information design … nothing happens between the two objects"), still true.
2. **Flat hierarchy after the studio.** Shared notes, families, intensity/longevity and seasons were four `dl` rows of equal weight; "what they share" was a line of small text, and for Zeta + Vapor it read "Niciuna…" at the same weight as everything else.
3. **The picker was detached.** It opened under the whole studio (below the fold at 1440 × 900), as 26 light thumbnails in three groups: a wall of tiny packshots, and the stage was out of view while choosing.
4. **Phone: "two thumbnails + long text".** The two niches shrank to half-width tiles; the rest was a 3,700 px column of text.
5. **The time axis was decorative.** "Aplicare ↓" and a static table; nothing to operate, no link between a tier and the objects.
6. **Split header** ("Compune" left, a paragraph right) repeating the page head.
7. **YNF was twelve product rows.** Thumbnail + name + accord + price + stock + "Adaugă" twelve times: a catalogue table with twelve identical buttons; the preview changed only on hover or focus, and phones had no preview at all. Morph's campaign images were not used.
8. **Kept:** the URL pair state, the tier model and the seam, the honesty rules (disclaimer, sold-out in text, no invented pairing), Morph's own YNF copy and the unlit-niche "blind" device.

## Data and logic preserved

Nothing about fragrance matching was added. Everything on both pages comes from `data/catalog.json`.

- **URL pair** `?a=&b=` (`app/layering/page.tsx`, `readPair`): no parameters show the default pair (Zeta + Vapor, as before); an unknown slug falls back to the default for that slot (as before); B never repeats A (as before). New: an empty value is an empty slot, which is what "Golește raftul" writes (`?a=&b=`). The composer rewrites the URL with `replaceState` on every change, so a reload or a shared link restores the exact pair.
- **Shared notes** (`sharedNotes`) and the per-tier seam (`voices`) are the Phase 04 functions: same wording after accent folding (`norm`), tier kept for each perfume. No score, no percentage, no ranking.
- **Family** (the proposed five-family grouping from research 06, as before), **intensity**, **longevity** (`hours`), **seasons** (intersection of Morph's season lists), **formats** (100 ml, travel 2×8 ml via `travelFor`, the sample set via `samplesFor` when a travel set does not exist), **prices and stock** from the snapshot.
- **Disclosure**: kept on the page, reworded as two sentences: "Compoziția arată notele publicate de Morph. Nu e o recomandare Morph și nu îți spune cum miroase perechea."
- **Your Next Form** as Morph's curated alternative: linked from the composer's "Perechea ta" and from the section under it.
- **YNF**: the 12 sets, their state names, Morph's accord text (the product copy without its "Descoperă X, unul dintre…" opener, unchanged), 230 lei, stock, the Morph URL, the cart line (`Your Next Form <state>`, "Set blind 2×8 ml").

## Layering: the composition model

A + B on one glass shelf, in one room.

- **`PairStage`** (`components/Stage.tsx`, CSS in `Stage.module.css`) is the new piece of the object system. It reuses what the stage already has: the measured object boxes (`data/objects.json`), the silhouette masks and `ObjectLight` (2.5D glint, hover mode, no tilt), the shelf, the reflection mask, the contact shadow and `scentVars`. Nothing in `Stage`, `ProductVisual`, `ObjectShelf` or `ObjectLight` was changed.
- **Geometry** is computed from the measured boxes, in stage heights (`cqh`, the stage is a size container), so it holds at every width:
  - both bottles are scaled to the same measured object height (66 % of the stage for A). Morph's packshots come in two framings (768 × 960 and 768 × 768) at different scales, so matching the packshot box would make square-framed bottles 15 % smaller for no reason in the objects;
  - B stands a step behind: 0.87 of A's height, its foot 3.5 % higher on the glass, painted before A, its reflection fainter;
  - the glass overlaps by 30 % of the narrower bottle; the pair is centred on its visible extent, not on the packshots;
  - an empty slot keeps its place (it takes the other bottle's measure), so choosing B never moves A.
- **Light**: each bottle stands in its own key light (`--glow`, the scent's 14 % tint, as everywhere). The second pool is `screen`-blended, so where the two lights cross the light adds. That overlap of glass and light is the only "mixing" image; no colour field, no blend of juices.
- **Stacking rule** (commented in the CSS): no bottle host may form a stacking context, so each packshot multiplies into both pools, not only its own. The rise animation therefore runs on the frame inside the host, never on the host.
- **Changing a bottle**: the new one rises into its light (`pair-rise`, 640 ms); reduced motion: it is simply there.

## Interaction

- **Slots** A and B sit on the glass under their bottles: letter, name (serif), family · intensity · longevity, and "Schimbă". They are the only controls on the room; they carry `aria-expanded` / `aria-controls`.
- **The picker** is the 26 names, typographic, grouped by collection, as a native radio group (`fieldset`/`legend`, one `fieldset` per collection). The shelf above is the preview: choosing a name (click or arrow keys) places that bottle on the shelf at once. The other slot's perfume is disabled and marked "deja A/B". Opening focuses the chosen name; Escape or "Gata" closes and returns focus to the slot. On desktop the list takes the reading column's place beside the stage, so the stage stays in view while choosing; on phones it opens under the slots and scrolls into view when it would open below the fold.
- **Reset**: "Golește raftul" empties both slots (`?a=&b=`) and focuses slot A. The empty state is a dark shelf with two unlit pools and "Alege două parfumuri: primul stă în față, al doilea în spatele lui."
- **Share**: "Copiază linkul perechii" (clipboard, announced politely), and "De încercat în magazin" adds the pair to the try list, as before.
- No modal, no drag (the 05.5 plan's drag is not needed once the radio list previews live).

## Shared-note hierarchy

Ordered by what a visitor needs first:

1. **What I chose**: the two objects, and the pair as the section heading ("Animal + Miyazawa", `t-1`).
2. **What they share**: one sentence at lede size built from the data ("Se întâlnesc în iris și lemn de santal." or "Nicio notă comună în notele publicate: fiecare strat aduce altceva."), then one small line with where each shared note sits, family and common season.
3. **How they differ**: per bottle, on the glass (family · intensity · longevity), and tier by tier in the strata (A's notes left, B's right, the shared ones on the seam; phones stack the seam under the two voices).
4. **Try, buy, keep** in one row: "Încearcă perechea" (both travel sets in one cart action, or the sample set when a travel set does not exist; the shop in Bucharest), "Sticlele de 100 ml" (per-bottle table with 100 ml, travel, stock and product links; both bottles in one action when both are in stock), "Perechea ta" (disclosure, copy link, reset, Your Next Form).

## Time and strata

- The three tiers (Deschidere, Inimă, Bază) are a list; each tier's label is a button (`aria-pressed`). Nothing depends on scroll and there is no scroll-jacking.
- Choosing a tier: the key light lowers and dims (`data-tier` on the stage, pools translate down to 42 % and fade to 0.84); the other tiers' notes turn muted but stay readable (≥ 4.5:1); on screens ≥ 1200 px the tier's notes stand on the glass beside their bottle (A's left, B's right, the shared ones above the overlap). That copy is `aria-hidden`; the strata list carries every note for everyone. Below 1200 px the dark margins beside the pools are too narrow for text over the light, so the notes stay in the strata only.
- Tier order is the only "time". The only time values shown are Morph's longevity for each perfume.

## Try / buy / combine relationships

- Travel 2×8 ml (230 lei each, 12 perfumes have one) → both travels in one step; sample sets when not; the shop in Bucharest; "Alte formate de încercare" → `/descopera#incearca`.
- 100 ml bottles → both in one step, only when both are in stock; sold out stated in text.
- Your Next Form → Morph's own pairs (230 lei).
- The former "Pe piele, nu pe ecran" section is folded into the "Încearcă perechea" column and the disclosure (same facts, one place).

## Your Next Form: the blind information model

Known and unknown are separated on the page, never inferred:

| Known before buying (shown) | Discovered on opening (not shown) |
|---|---|
| the state (written on the box) | the two perfumes |
| Morph's accord text | the instructions and the order of application (Morph: they are in the box) |
| 2 × 8 ml, 230 lei, stock | |

- **Opening**: Morph's campaign photograph of the sealed boxes (state names on them, nothing else) beside a ledger: "Ce știi dinainte" (solid rule) and "Ce afli la deschidere" (a broken rule, italic), then Morph's own sentence, quoted: „Fiind un blind set, identitatea parfumurilor este dezvăluită doar la deschiderea cutiei.”
- **Index**: the 12 states as one line of serif type, not 12 rows. Each state is a link (`?stare=<state>#stari`): it works without JavaScript, the choice survives a reload and can be shared; with JavaScript it changes in place (`replaceState`). Only the chosen set is rendered in full: its box packshot, two unlit niches (`BlindPair`, no colour, no name) captioned "Înăuntru: două parfumuri de 8 ml, fără nume până la deschidere.", Morph's accord text, price, stock, one add-to-cart and the Morph page link. Twelve "Adaugă" buttons became one.
- **Blind rule, tested**: no perfume name appears in the page's text, `aria-label`, `alt` or `title` (smoke). The blind sets never take a scent colour; the niches stay unlit.
- **Transitions**: a YNF set has no page in the concept (it links to morphparfum.ro), so no object transition was added there.

## Transitions

Only the existing `obj-<slug>` names, with `share="morph"`. Each bottle on the pair stage is named `obj-<slug>` (A and B are always different, so names stay unique):

- product → Layering: the bottle on the product stage lands as A (verified with the stage on screen);
- Layering → product: a bottle from the pair (via the product links in the table) lands on the product stage.

React only runs a shared transition for boundaries inside the viewport, so a product page's "Compune cu …" band, far below the product stage, opens Layering with the page relight only. That is the existing architecture's behaviour, left as it is.

## Assets used

All from `public/morph/`, already in `data/assets.json` with status `concept`; nothing new was downloaded.

- `campaign/ynf-box-in-hand.avif` (open box with two 8 ml vials, hands only): `/layering`, the YNF section.
- `campaign/ynf-boxes.avif` (sealed boxes with state names): `/layering/your-next-form` opening.
- The 26 perfume packshots with their measured boxes and masks (pair stage), the 12 YNF box packshots (the chosen set).
- Not used: `ynf-silhouette` (a person, even if in silhouette) and the workshop photographs (the one with a table setting is `pending`; the others add nothing the page needs).

## Skill usage

| Skill | Use |
|---|---|
| impeccable | critique before and after (both routes, runtime captures, the picker state), craft floor before editing, `detect` on all changed files (no findings), polish pass (below) |
| design-taste-frontend (read in place, `/` skill named by the owner) | consulted for composition: removed the split header, the anti-generic list check (no eyebrows added, no repeated CTAs, one shape system), content density on YNF |
| ui-ux-pro-max | not queried: the questions that came up (radio group vs listbox, focus return, touch targets) are covered by its rules already applied in C3 and by the native elements used |
| stop-slop (one of the two text skills, never both) | the new connective copy only (empty-state lines, the disclosure's wording, the YNF caption); Morph's product copy was not touched |
| site-capture (its Node Playwright setup) | captures and the runtime QA scripts |
| Reticle, Chisle, UI Skills | not installed in this repository and not in `docs/research/skill-registry.md`; not imported in this phase, because external skills are imported only after inspection. Runtime QA was done with scripted Playwright sessions instead (next section) |
| Understand Anything, diagram-design, design-md, humanizer | not needed |

## Runtime QA (scripted Playwright, in place of Reticle)

Run against the production build at 1440, 1024, 768 and 390 px, with a layout-shift observer:

- **Focus**: slot buttons, tier buttons and radios show the 2 px focus outline; Enter opens the list and focuses the chosen name; ArrowDown moves the selection and the stage and URL follow; Escape closes and returns focus to the slot. Same at every width.
- **Layout shift**: zero unexpected layout shift while choosing A, choosing B, and changing the tier (all four widths).
- **Clipping**: no visible text clipped with the longest names (Montmartre + Antigua Bay); nothing wider than the viewport except the intentionally bled stage and images.
- **Found and fixed**:
  - the tier's notes on the glass sat inside B's pool at 1024 px (light text on light), and B's pool swallowed two of its three notes at the first 1440 build: the pools were narrowed (2.1 × the bottle's width), the stage became 3 : 2, and the notes on the glass are shown only from 1200 px;
  - on phones the list opened below the fold: it now scrolls into view on open;
  - the longevity in the slot line wrapped as "10–12 / h" at 1024: non-breaking space;
  - at 768 px the stage (1 : 1) scaled the bottles past what the packshots hold: 4 : 3 between 600 and 899 px; the YNF box is capped at 520 px there;
  - the notes on the seam sat on a `--bg` box that showed over the grain: the hairline now disappears where notes sit on the seam.
- **Reduced motion**: no running animation after a swap (phone) or a state change (YNF); content is present at once.
- **Pair after reload**: restored from the URL (smoke).

## After: Impeccable critique and polish

- **Specificity**: the page is now about two objects on one shelf in one light; the reading is ordered chosen → shared → different → formats. It could not be reused unchanged by another product.
- **Polish applied**: the tier control lost its pill border (the only rounded control on a 2 px-radius site); the pressed tier uses the same lit point as the chosen name in the picker. The seam boxes were removed. Copy tightened (stop-slop).
- **Cognitive load**: at most four choices per decision point (A, B, three tiers); the 26 names appear only on request.
- **Remaining observations (not changed)**: on phones the pair heading repeats the two slot names right above it; the heading is kept because it names the section for assistive tech and reads as the composition's title. The YNF desktop column under the line of names is empty while the box column is long; kept for the sticky box.
- **Detector**: no findings.

## Responsive decisions

| Width | Layering | Your Next Form |
|---|---|---|
| ≥ 1200 | stage 7/12 (bleeds to the left edge), reading 4/12; the tier's notes on the glass | line of names 7/12, sticky box 4/12 |
| 900–1199 | same grid, no notes on the glass | names 6/12, box 6/12 |
| 600–899 | one column, stage full bleed 4 : 3 | one column, box ≤ 520 px |
| < 600 | stage full bleed 1 : 1 (bottles ≈ 260 px tall at 390), slots side by side ≥ 64 px high, strata stacked with the seam under the voices | names at 32–44 px, 44 px targets, the box right under them |

## Tests

`npm run smoke` (production build, `npm start`): 50 checks, all passing on a fresh server. New or replaced:

- layering: empty slots, the default pair, a URL pair, invalid and duplicate fallback;
- layering: replace A and B through the radio list (click and arrow key), Escape returns focus, the pair survives a reload, "Golește raftul";
- layering: shared notes and every note of A from `data/catalog.json`, a tier button moves the light, prices / travel / stock per bottle from the snapshot, both travels to the cart, the disclosure, the YNF link;
- layering phone: both bottles taller than 250 px and overlapping on one shelf, slots ≥ 44 px, no running animation after a swap under reduced motion;
- Layering ↔ product: `obj-<slug>` both ways;
- Your Next Form: the 12 state names in Morph's order, price and stock, the Morph URL, Tab + Enter to the next state (panel, `?stare=`, `aria-current`), no perfume name anywhere on the page, add to cart, no-JS state from the URL, reduced motion;
- the overflow sweep (390 / 768 / 1024 / 1440 / 1920) now includes the empty shelf, a square-framed pair and a YNF state.

Note: after two full smoke runs on the same `next start` process, one `/_next/image` request on `/descopera` (the sample-set webp) could stay pending, so the two `/descopera#…` checks that wait for `networkidle` timed out. A fresh server passes all checks; the baseline (`main` before this phase) passes on a fresh server too. Not a code change of this phase; noted for C4.

## Intentional non-changes

- Global nav, `/parfumuri`, `/parfumuri/corp`, `/descopera`, the transition CSS in `globals.css`, `Stage`, `ProductVisual`, `ObjectShelf`, `ObjectLight`, `BlindPair`.
- The PDP's layering band (two small niches and "Compune cu …") and the finder result's layering link: they already open the composer with the pair in the URL.
- No blind reveal (`/layering/reveal/[set]`): it needs Morph (a QR in the box).
- No drag and drop onto the shelf.

## Known limitations

- The two bottles are shown at the same object height; the packshots do not tell real bottle heights across collections.
- The packshots (768 px) are the ceiling for the stage size; at 768–899 px the stage is capped at 4 : 3 for that reason. A photographed layering shelf (photography brief) would replace the simulated overlap.
- The tier light is an interpretation of order only; it says nothing about how long each tier lasts.
- The transition into Layering from a product page runs only when the product stage is on screen at the click.
- The YNF index keeps the chosen state in the URL; the default state (no `?stare=`) is the first in Morph's list.
