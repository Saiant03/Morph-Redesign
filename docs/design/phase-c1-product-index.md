# Phase C1 — Parfumuri: the index as a cabinet of objects

Scope: `/parfumuri` and the three collection rooms that share its code (`/parfumuri/les-exclusifs`, `/luxury`, `/ice`). C2–C4 have not started. Baie & Corp, the product page, the header and the transition system were not changed. Captures are in `captures/phase-c1/`.

## Before: Impeccable critique

Run with the official Impeccable skill (`critique`), in one context rather than the skill's two subagents, because the brief asked for a focused pass. The detector (`impeccable detect`) found nothing on these files. The review found:

1. **Objects too small.** The walnut shelf showed all 26 bottles in one line, at 40–72 px each (names hidden above 14), in 26 separate framed niches. It read as a strip of thumbnails. The index below used 64 px thumbnails.
2. **A product list, not an exhibition.** The default view was a table of rows (name, notes, family, hours, price, one "Adaugă" button per row: 26 identical buttons). The optional "Galerie" was a three-column card grid.
3. **Collections were hard to see.** Collection was a micro label on each row. The line of 26 bottles mixed all three collections, with no grouping.
4. **Duplication.** Every bottle appeared twice: on the shelf and in the index.
5. **Strengths kept:** the room (window, plate, tabs), the sticky preview in the index, URL filters, and the shelf → product morph.

## Decision

The shelf and the gallery become one thing: **the vitrine**, the default view of the index. It is a walnut wall with one lit shelf per collection. Every bottle stands in its own pool of light, with its name, notes and price as a label on the wood below.

- **Continuous recess, one light per bottle.** The niches in a row touch (no gap, no radius, no outline). The glass edge and the shadow under the shelf above run across the whole row, while each bottle gets its own radial pool, tinted faintly by its `--glow`. The effect is a boutique cabinet with downlights, not a grid of cards. Separation between shelves comes from the wood.
- **Grouped by collection on /parfumuri.** There is a heading (`h2`, Newsreader), then the type and count (`Extract de parfum · 8 parfumuri`), then "Intră în Les Exclusifs" (a room change, type `room`). No kicker above the heading. On a collection page there is one shelf and no heading, because the plate already names the room. The collections are the real three. Baie & Corp stays a tab, as before.
- **Balanced shelves.** Rows are computed in CSS from the count (`--n`) and a maximum per breakpoint (`--max`): `rows = ⌈n/max⌉`, `cols = ⌈n/rows⌉` (CSS `round(up, …)`). Luxury at 1440 stands 5 · 5 · 3, not 5 · 5 · 2 · 1. The last row's pools widen up to two niches. A single bottle, for example after a filter, stands centered on a short length of glass. Without `round()` support the fallback is `--cols: --max`.
- **Bottle size.** The niche height is fixed per breakpoint (310–380 px on desktop), so every bottle stands at the same height whatever the row. The bottle is ~250 px tall at 1440 and ~300 px at 1920 (it was 40–72 px on the shelf, 64 px in the index).
- **Label.** Name (serif), three notes (`descriptor`, the real top notes, clamped to two lines), and price with format (`790 lei · 100 ml`, plus `stoc epuizat` when out of stock). Collection comes from the shelf heading. There are no badges and no add-to-cart button on the item. Buying stays one click away, on the product page, or in the Index view.
- **Index view kept.** "Vitrină / Index" replaces "Index / Galerie". The table with its sticky preview and the per-row "Adaugă" is unchanged, at `?vedere=index`. The card gallery is gone, because the vitrine replaces it. Old `?vedere=galerie` links open the vitrine.
- **Filters and sort** work on the vitrine unchanged. Everything stays in the URL, and GSAP Flip still moves the bottles when the set changes. The filter bar keeps one place in the tree, so switching views keeps focus on the button. It is sticky over the index, as before. Over the vitrine it stays in the stone room: a stone strip stuck over the wood looked like a toolbar laid on the furniture.
- The trial prompt ("Nu știi de unde să începi?") closes the vitrine instead of interrupting it, and it shows only when no filter is active.

## 2.5D objects, generalized

- `npm run lightmask` was run for all 26 perfumes (26 × ~8 KB PNG, 224 KB total, `data/lightmasks.json`). A contact sheet of every packshot with its mask was checked by eye: all silhouettes follow the glass, including the pale Ice bottles and the square Les Exclusifs packshots. No product was excluded.
- Nothing was duplicated. Each vitrine item is the existing `ShelfItem` (now with an optional label and `sizes`). It renders the existing `ProductVisual`, which mounts the existing `ObjectLight` in `hover` mode whenever a mask exists. Desktop: the pointer moves the streak (the B.5 behavior). Touch: still light (the existing non-pointer mode for niches). Reduced motion: `ObjectLight` does not attach at all.
- Hover and focus behave the same. The light over the bottle comes up (`brightness(1.08)` on its niche), and the bottle and its light layer lift together: `translateY(-2.5%) scale(1.035)` from the foot, 640 ms on `--ease-out`, with no bounce. Transforms apply to the image and the glint only, never to the niche, which is the isolated blend group, so the multiply of the packshot never breaks. The name underlines. Under reduced motion there is no lift. Keyboard focus adds the ring around niche and label (`outline-offset: -2px`, light on the wood).
- Loading state: the niche has a fixed height and its lit gradient is the placeholder, so nothing shifts when a packshot arrives.

## Transitions (unchanged system, checked)

- A vitrine bottle keeps `shelf-<slug>` (room changes: bottles shared by two rooms move, the others leave and arrive) and `obj-<slug>` into its product page (`lib/pick.ts`: the shelf holds the name unless the index row was clicked).
- Smoke-tested: vitrine → Animal on desktop, vitrine → Zeta on a phone, Luxury → Ice room change, and row → product in the Index view.

## Responsive

| Width | Shelf | Niche height | Notes |
|---|---|---|---|
| 1920 | ≤ 6 per shelf (Les Exclusifs 4 · 4, Luxury 5 · 5 · 3, Ice 5) | 380 px | Bottles ~300 px |
| 1440 | ≤ 5 | 23vw (331 px) | Heading and count/link on one line |
| 1024 | ≤ 4 | 29vw (297 px) | Luxury 4 · 4 · 4 · 1 (the last bottle centered) |
| 768 | ≤ 3 | 38vw (292 px) | Luxury 3 · 3 · 3 · 3 · 1 |
| 390 | 2 | 62vw (242 px) | Heading 44 px, count and link wrap under it; notes 13 px; no hover dependence |

No horizontal overflow at any of the five widths (measured, and covered by the smoke sweep, which now includes `/parfumuri`).

## After: Impeccable pass

The detector found nothing on the changed files. The manual pass (craft floor: contrast, states, focus, motion, anti-patterns) found three things, all fixed:

1. After a filter, a collection with one bottle filled the whole shelf. The cap is now two niches of the row maximum.
2. The filter bar lost its sticky position over the Index view (it had moved into its own container). Fixed without remounting the bar between views.
3. The first version remounted the filter bar when switching views, which lost focus. Fixed, and covered by a test.

Recommendations not applied: an add-to-cart on every object (it would bring back the 26 identical buttons), and staggered entrance animation (one authored moment is enough: the hover).

## Verification

- `tsc --noEmit` clean; `next build` passes (`/parfumuri` static, collection rooms SSG).
- `npm run smoke`: 31 checks, passing on two consecutive runs. New or changed checks:
  - the vitrine has 8 · 13 · 5 bottles under three headings, all 26 lit, with notes and price in the label, and Luxury stands 5 · 5 · 3 at 1440;
  - the Index view is in the URL, keeps focus and is sticky;
  - hover lifts the bottle and moves its light;
  - keyboard focus shows the ring and the lift;
  - reduced motion keeps the bottle still;
  - vitrine → product morph on desktop;
  - the row → product checks now use `?vedere=index`.
- Objects checked by eye at 1440 and 1920: Umhh, N8, Animal, Miyazawa, Too, Iconic, A21, Rose J (square packshots); Cruda, Vision, Indomable, Vapor, Zeta, Antigua Bay, Axum, Kolonaki, Montmartre, Nudo, Pure Soul, Malaga, Arles (4:5); GATE 17, Tonkatonic, Oud Mafia, Disumano, Primitivo (pale Ice glass).
- Captures: `before-desktop.jpg`, `desktop.jpg`, `desktop-1920.jpg`, `mobile.jpg`, `hover-zeta.jpg`, `filter-gourmand.jpg`.
- Not run: Safari, Firefox, real devices, screen reader, Lighthouse.

## Known limitations

- The masks include the packshots' floor reflection and the thick glass of the base. Fixed after review (below): the streak now fades out before the base.

## Fixes after review (owner, 2026-09-24)

Three defects, seen on the dark stages (home lookbook, 1920 px):

1. **Hard top edge on the halo.** The stage's radial pool (center at 47%, vertical radius 54%) was still lighter than the room at the box's top edge, so the box showed as a band above the bottle. The ramp now reaches `--bg` at 86% of the radius (`components/Stage.module.css`). The glass floor also fades toward the bottom of the box, so no bottom edge shows either.
2. **Hard white line at the lower left of the bottle.** The light streak crossed the thick glass of the base, where the silhouette has thin bright edges. `ObjectLight` now adds a second mask layer, intersected with the silhouette (`mask-composite: intersect`), so the light fades out between 55% and 78% of the packshot's height. The fix applies everywhere the object is lit: stage, vitrine, niches.
3. **The next lookbook spread showed dimmed at the right.** Spreads were capped at 1560 px inside a full-width track, so on wider screens the next one was visible. A spread now spans the track, and its content is centered with padding (`max(var(--m), (100% − 1560px) / 2 + var(--m))`), aligned with the bar above it.
- The square Les Exclusifs packshots render their bottles visibly shorter than the 4:5 packshots at the same niche height. The images are Morph's and were not rescaled or cropped.
- The light is still a 2D approximation. The label and the embossing do not respond to it.
- A room change animates up to 26 named shelf items, most of them off screen. It was fine in headless Chromium and has not been measured on a low-end phone.
- `round()` in CSS needs Chrome 125+, Safari 15.4+ or Firefox 118+. Older browsers fall back to full rows of `--max`, with an uneven last row.
