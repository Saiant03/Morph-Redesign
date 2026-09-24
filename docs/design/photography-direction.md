# Photography direction (Phase 05: object, matter, light)

Status: proposal for a future production shoot. Nothing here has been shot. The concept uses Morph's catalog packshots (768×960 on white, soft, low resolution) staged in a digital lit niche. Revised in Phase 05: the Phase 03 direction (bottles on seamless paper matched to each juice color) is withdrawn, because color is no longer the system's language. See `phase-05-art-direction-reset.md`.

## What the system needs from photography

The interface shows fragrances as **objects in light** inside rooms of **stone, night and walnut**. Photography should carry the same four ideas: CRAFT (the Bormioli twist, the label, the cap), OBJECT (the bottle as a collectible piece), SCENT (what is inside, told through liquid and material, not illustration) and MATERIAL (glass, wood, stone, metal, a burgundy wall). Not a color palette. No mist, smoke, petals, splashes, butterflies, melting glass or skin-glow clichés.

## 1. The master packshot (replaces the niche's white packshot)

- Every bottle front-on, straight, same camera height and focal length, bottle at 78–82% of frame height, cap whole, baseline on the same pixel row across all SKUs.
- **Lit from behind and above** like the niche: a soft source behind the bottle (the juice glows), a narrow strip light camera-right to draw the twisted edges, a dark card camera-left so the glass edge reads. The light itself is neutral; the juice colors it.
- Background: warm stone paper (≈ `#e7e0d5`) with a real light fall-off, plus a clean alpha cut-out. With a cut-out the site stops relying on `multiply` and the niche can go darker.
- Measured color, not graded: a color target in the first frame, white balance locked for the session, juice and label-band hexes delivered per bottle (they feed `--glow`, `data/colors.json`, method `measured`).
- Les Exclusifs smoked glass: an extra backlit pass so the amber reads through the smoke.

## 2. The sculpture series (for the hero, "Obiectul", PDP gallery)

Per bottle, on dark walnut or black stone, one warm key light, deep shadow:
1. **Raking light along the twist** (the "echilibru și mișcare continuă" image): 3/4 view, light grazing the faceted edge.
2. **Shoulder and cap**: brushed metal against glass, macro, shallow depth.
3. **The label through the juice**: the band and the engraved M seen through the liquid.
4. **The foot on glass**: the heavy base on a glass shelf with its reflection (the shelf edge the niche imitates).

These replace the packshot in the large niches (hero, "Obiectul", PDP first slide on desktop). They must also work at 56svh on a phone: the object whole, not cropped at the cap.

## 3. Material close-ups (time on skin)

Three frames per perfume, same framing across SKUs, used in the Time on Skin niche per phase: opening (atomizer and the first centimetre of juice, bright), heart (label band through the juice, mid light), base (glass foot and the lowest juice, low warm light). They match the interface behaviour, where the niche's light warms and lowers with the phase. Liquid texture (a slow drop, a meniscus) is acceptable here; decorative splashes are not.

## 4. Collections (the vitrines)

One campaign image per collection, shot in the same wood room: Les Exclusifs (smoked glass, lowest key), Luxury (clear glass, label bands), Ice (frosted glass, pale light). Same camera, same shelf, different light, so the three read as rooms of one house. Replaces the single bestseller packshot in each vitrine.

## 5. Layering

Two bottles on one glass shelf, the second slightly behind the first on the same axis, so the glass and juices overlap in depth. Shot generically (any two bottles): the site never presents a visitor's pair as recommended. Your Next Form: the closed box, the lid half open, the two 8 ml vials revealed, on dark stone. The existing black campaign of hands and box stays editorial.

## 6. Casa Morph

Documentary, not staged lifestyle: the walnut displays and their lit niches, the glass, the burgundy art wall with the M, the counter, the team at work (with consent), evening light. These replace the digital art wall on `/casa-morph` and the home boutique chapter. Credit and permission required before any use.

## 7. Trial objects

Travel 2×8 ml boxes, sample sets and the Discovery Travel set at the existing 3/4 top angle, on the same stone paper, same scale per product type. Open and closed.

## 8. Ratios and delivery

| Use | Ratio | Minimum size |
|---|---|---|
| Master packshot, cards, index, shelf | 4:5 | 2000×2500 |
| Hero, "Obiectul", stage niches | 4:5 source, cropped to 3:4 / 5:6 | 2800×3500 |
| Sculpture series, close-ups | 4:5 and 1:1 | 2800×3500 / 2800×2800 |
| Collection vitrines | 3:4 | 2400×3200 |
| Layering pair | 16:9 and 4:5 | 3600×2025 / 2400×3000 |
| Casa Morph | 3:2 and 4:5 | 3600×2400 |
| Trial objects | 1:1 and 5:4 | 2000×2000 |

Lossless masters with alpha where listed; the site produces AVIF/WebP through `next/image`. Test every master at 250px height (phone thumbnails and the buy bar).

## 9. Shot list per perfume

| # | Shot | Ratio |
|---|---|---|
| 1 | Master packshot on stone + cut-out + color target frame | 4:5 |
| 2–5 | Sculpture series: twist, shoulder, label through juice, foot on glass | 4:5 / 1:1 |
| 6–8 | Opening / heart / base close-ups | 1:1 |
| 9 | With its box | 4:5 |
| 10 | Travel 2×8 ml (if sold) | 1:1 |

26 perfumes × 9–10 frames, plus collections, layering, Your Next Form, trial objects and Casa Morph. One lighting setup per series, repeatable for new launches.

## Where production photography would change the result most

1. The hero and "Obiectul" chapter (the packshot is soft at that scale).
2. Casa Morph (no real space is shown today).
3. The collection vitrines (one campaign image each instead of a bestseller packshot).
4. Time on skin (material close-ups instead of one bottle under changing light).
