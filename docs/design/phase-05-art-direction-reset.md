# Phase 05 — Art-direction reset

Phase 05 is a visual and experience reset of the existing concept. Routes, data, finder logic, layering logic, cart and try-list mechanics, accessibility work and the motion infrastructure were kept; the visual language was replaced. System: `phase-05-design-system.md`. Review: `phase-05-creative-review.md`. Captures: `captures/phase-05/` (1440, 1024, 390).

## What changed from Phase 03–04

| Area | Phase 03–04 (A Cromatic + C Strata) | Phase 05 |
|---|---|---|
| Foundation | calm paper UI, each scent = its color | product, form, matter, light; the bottle in a lit niche |
| Surfaces | one mineral paper | three tones by chapter: stone, night, walnut; one burgundy wall |
| Type | one grotesk | grotesk for reading and data + Newsreader serif for names and chapters |
| Home hero | "Mirosuri, culori, emoții." + an atlas of 26 color bars | Morph's motto "Metamorfoză prin parfum." + one bottle in a lit niche + a museum label with its notes |
| Home sequence | atlas → collection chords → family chords → trial → cards → composer → trust | image → object → collections → most chosen → families → try (home / boutique) → layering → boutique |
| Collections | color chord strip, rows with a color strip | wood vitrine with every bottle on a shelf; rows led by the object |
| Families | color chords | serif family names, real frequent notes, Morph's classifications, three bottles |
| Discover | lenses regroup 26 color keys | lenses regroup 26 bottles under serif titles written in notes |
| Finder | color chords per answer, palette re-weighting by score | object stacks per answer, a shelf of 23 bottles that stay lit or dim |
| Finder result | bottle on its color field | "Morph-ul tău": object, why (✓ per answer), product facts incl. availability, try, buy, compose |
| Layering | strata columns multiplied into a color overlap | composition studio: two objects, notes set against each other tier by tier, shared notes on the seam |
| Your Next Form | colorless strata | two unlit niches (unknown = no light) |
| Casa Morph | collection color wall | wood room, burgundy art wall with three niches, visit facts, a selection card |
| Search | link to the collection search field | full-screen overlay with grouped live results |
| Cart | list with color dots | objects, quantities, empty state |
| Cadouri | link to Morph's gift-card page | internal page: by budget, the bottle + gift box, discovery formats, Your Next Form, gift-card facts |

## Why Cromatic was superseded

Cromatic turned Morph's synesthesia line into the interface: every scent became a color and every group a chord. Built out across nine routes, that produced a color system rather than a fragrance house. Families read as palettes, the finder as a chart, layering as paint mixing, Casa Morph as a swatch wall. The owner rejected it after review and after comparing it with the physical boutique, which is not organised around bright colors at all. The problem was not the amount of color but its role: color was the taxonomy, the navigation and the identity. Phase 05 removes all three roles instead of turning the saturation down.

Every major section was tested by removing the fragrance colors. In Phase 04, most sections lost their meaning (atlas, chords, keys, composer). In Phase 05, removing `--glow` changes nothing structural: the objects, names, notes and prices carry every section.

## How the boutique shaped the system

From the owner's photographs of Casa Morph: dark warm wood, black and deep neutrals, glass, reflections, warm dramatic light, objects displayed like collectible pieces, a burgundy fluid artwork with the Morph M, an intimate gallery rather than retail.

- **Lit niche**: the boutique's display recesses and light-on-object staging became the single product device. It also solves a real asset problem: the white packshots need a light background for `multiply`, so the object is always lit, even in a dark room.
- **Rooms by tone**: chiaroscuro across the page (dark campaign → lit reading rooms → walnut vitrines → dark studio → walnut boutique), not a dark site.
- **Walnut**: a faint grain on the vitrine and boutique chapters only.
- **Glass**: the shelf edge and floor in every niche; the metal hairline as the only "fixture" line.
- **Burgundy**: the art wall exists once, on Casa Morph, as the wall the three niches are set into. It is not a brand color elsewhere.
- Not copied: no photographs of the boutique (we have none cleared for use), no literal M artwork, no fluid imagery.

## How the Pomelli Business DNA shaped it

Treated as input, not as guidelines.

| DNA | Where it shows | What was avoided |
|---|---|---|
| Monochrome minimalism | three neutral tones, the scent only as light | black + gold |
| Editorial sophistication | serif names and chapters, asymmetric splits, museum-label captions, Morph's copy as quotes | decorative drop caps, all-serif UI |
| Scientific precision | `.label` facts, numbered tiers, the finder's per-answer ✓, the layering score | lab/mono pastiche |
| Surreal metamorphosis | behaviour, not imagery: light coming up on load, the light changing with time on skin, lit/dimmed shelves, the notes composing | butterflies, melting objects, smoke, blobs |
| Artisanal craftsmanship, Italian craft | the Bormioli bottle chapter ("echilibru și mișcare continuă"), Napoli 2002 facts | tricolore, generic "handmade" copy |
| Personal identity | "Morph-ul tău" finder result, "Selecția ta" for Casa Morph, "Identity, layer by layer" | psychological claims beyond Morph's tags |
| Scent unfolding layer by layer | tiers everywhere in time order; composer tiers compose opening → base | stacked color strata |
| Pomelli's Roboto/Poppins | not used | — |

## The role of color now

Only `--glow`: the scent's sampled identity color mixed 14% into the niche light (`lib/scent.ts`). Visible as a slight warmth or coolness behind the bottle, interpolated when the fragrance in a niche changes. Packaging colors appear only because they are in Morph's own photographs. Removed: atlas, chords, color keys, answer chords, palette bars, tier colors, strata, color dots in the cart and composer, color walls, the swatch primitive. `data/colors.json` stays as data for the glow.

## Product presentation

The bottle is the protagonist at every scale, always in the same niche, so a 32px cart thumbnail and the 800px hero read as the same object. Scale was pushed (hero and stages 70–84vh; phones full-bleed 56–70svh), names moved to the serif, and every list now leads with the object instead of a color strip. The low-resolution packshots (768×960 on white) are the limit: crops stay moderate to avoid blur, and angled Morph shots are used where the page talks about form. Where a production shoot would change the result is documented in `photography-direction.md`.

## Motion

The loader was kept and refined: the same headline rise and upward unmask, now followed by the niche's light coming up and the bottle settling, so the entrance itself is a small metamorphosis. Everything else was given a distinct role (focus, reveal, overlay, composition, time as light, section tone, reflow, narrowing) instead of repeating one scroll reveal. `Reveal` is used on two images only. Full table in the design system.

## Layering

From "two colors multiply into a third" to "two compositions set against each other". The studio shows two real bottles, then the notes in the order they unfold on skin. The seam holds what the two share in the same tier; echoes mark notes shared across tiers. It never names, scores or recommends a visitor's pair, and says so on every instance. Your Next Form stays truthful: states, Morph's accord copy, price, stock, and two unlit niches.

## Discovery

The lenses, URL state, preview and Flip were kept; the objects replaced the color keys and the group titles moved to fragrance language (family name + its frequent notes; tier names for the note lens). Try is now two explicit paths on Home and Descoperă: **Acasă** (travel 2×8 ml, sample sets, Discovery Travel, with stock) and **În persoană** (Casa Morph address, open-now, hours). No free sampling or service is claimed.

## Verification

- `tsc --noEmit` clean; `next build` passes (37 pages; new route `/cadouri`).
- `npm run smoke` (new, `scripts/smoke.mjs`, against a started server): 16 checks pass — hero, skip link, featured focus, cart (add, quantity, remove, empty state, Escape), search (focus, note results, `/`, empty state, focus return), header tone, collection filters in the URL, PDP formats / buy bar / time on skin, full finder run to Zeta with reasons and try, layering URL state and disclaimer, try list to Casa Morph, Cadouri, reduced motion, no horizontal overflow on 9 routes at 390 / 768 / 1024 / 1440, mobile PDP CTA in the first viewport, no console errors.
- Captures: `captures/phase-05/` — 10 routes at 1440 (top + full), 390 (top + full) and 1024 (top), plus search (empty, results), cart and finder mid-flow at 1440 and 390.
- Not run: Lighthouse, screen reader, real devices.

## Remaining limitations

- Photography: catalog packshots only; the largest niches show their softness. See `photography-direction.md`.
- The Casa Morph room is a digital interpretation; no boutique photographs are used.
- Newsreader is a free stand-in; a licensed display serif is a production decision.
- Mobile home is 10,521px; the families index could be shortened further.
- Gift-card amounts are not in the snapshot and are not shown; the page links to Morph's gift-card page for them.
- Everything from Phase 04's limitations still holds (tags as published, 5-family grouping is a proposal, mock cart / notify / try list, snapshot stock).
