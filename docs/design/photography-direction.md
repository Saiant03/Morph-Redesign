# Photography direction (A Cromatic + C Strata)

Status: proposal for a future production shoot. The concept keeps using Morph's current catalog packshots (768×960, on white, soft and low-resolution; Phase 02 finding). Nothing here has been shot.

## What the system needs from photography

The interface does three things with images: it puts a bottle **on its own color** (collection, home, PDP), it shows a scent **in stages** (time on skin, layering), and it shows **objects Morph sells for trying** (travel box, sample sets, Your Next Form boxes). The shoot should serve those three jobs and nothing decorative. No mist, smoke, petals, liquid splashes, butterflies or skin-glow clichés.

## 1. Product isolation (the master asset)

- Every bottle shot **front-on, straight, no tilt**, on a seamless paper background, with a clean alpha cut delivered alongside (PNG/TIFF with path). The site currently fakes isolation with `multiply` over white; a real cut-out removes the grey halo and lets the field color be exact.
- Deliver two versions per SKU: on **neutral paper** (≈ `#edeeeb`, the site background) and **cut-out**. The colored field is produced in the interface from data, not in the photograph, so a color change never needs a reshoot.
- The Bormioli twist must read: light from a large soft source 45° camera-left plus a narrow strip light camera-right to draw the twisted edges. The glass edge is the "2px glass edge" of the design system; photograph it as such.
- Juice color must be **measured, not graded**: shoot with a color target in the first frame of each bottle, keep white balance locked for the whole session, deliver a sampled juice hex and label-band hex per bottle. These replace the current canvas-sampled values in `data/colors.json` (method `sampled` → `measured`).

## 2. Bottle scale and framing

- Same focal length, camera height and distance for all 26 bottles, so bottles line up at identical scale in the index, the atlas and the composer. Bottle occupies 78–82% of frame height with the cap fully visible; baseline at the same pixel row across SKUs.
- Travel 2×8 ml boxes, sample sets and Your Next Form boxes: one fixed 3/4 top angle (the one Morph already uses for the yellow Zeta travel box), same scale rule per product type.

## 3. Ratios and crops

| Use | Ratio | Minimum delivered size | Notes |
|---|---|---|---|
| Product card, index thumbnail | 4:5 | 1600×2000 | bottle centered, 7% top/bottom air |
| PDP main, home hero field | 4:5 source, cropped to 1:1 and 5:4 by the layout | 2400×3000 | keep 10% safe area on all sides for mobile crops |
| PDP mobile | 5:4 or 1:1 crop of the same master | — | bottle must remain whole: never crop the cap |
| Collection preview panel | 5:4 | 2000×1600 | |
| Offer objects (travel, sets, boxes) | 5:4 | 2000×1600 | |
| Close-ups | 1:1 and 4:5 | 2400×2400 | |
| Layering pair | 16:9 and 4:5 | 3200×1800 / 2000×2500 | |

Delivery: lossless masters; the site generates AVIF/WebP through `next/image`.

## 4. Lighting and background (A: color as material)

- Background is **paper, not a gradient**. For the few art-directed shots that carry color in-camera (hero campaign, collection openers), use colored seamless paper matched to the measured identity color at ≈36% strength — the same mix the interface uses for `--scent-field`, so photography and UI fields meet without a seam.
- Daylight-balanced, soft, low contrast; shadows short and neutral. No colored gels on the product: the juice is the only saturated color in the frame.
- Les Exclusifs smoked glass needs a backlight pass so the amber reads through the smoke (Phase 02 had to null out "accents" that were the smoked glass).

## 5. Material close-ups (C: strata)

Per perfume, three close-ups that map to the three tiers used by Time on Skin — not illustrations of notes, but the bottle's own materials:

1. **Opening** — the atomizer and the first centimetre of juice under the cap, bright, shallow depth.
2. **Heart** — the label band / engraved M through the juice, mid-depth.
3. **Base** — the heavy glass foot and the lower juice, darker, the twist visible in refraction.

Same framing across all SKUs so the three images can be swapped per phase in the PDP without layout change. These replace the current tier color blocks only when they exist; the color strata remain the fallback.

## 6. Layering imagery

- Two bottles **side by side then overlapping in depth** (one behind the other on the same axis), shot on neutral paper, so the overlap area shows both juices through each other. This is the photographic twin of the composer's multiply overlap.
- Your Next Form: the blind box closed, lid half-open, and open with the two 8 ml vials visible — the reveal sequence. Keep the existing black-background hand campaign for editorial use only; product listings use the paper background.
- Do not shoot "recommended pairs" unless Morph confirms the pairs; shoot combinations generically (any two bottles), since the interface does not present visitor pairs as recommendations.

## 7. Hero imagery

The hero is a product field, not a lifestyle photo. Deliver, per scent, the cut-out plus a measured color; the atlas does the rest. Optional campaign frame for seasonal use: a single bottle, straight, on its colored paper, generous negative space on the left for the headline (desktop) and at the top (mobile).

## 8. Mobile crops

- Mobile PDP media is 250–360px tall: the bottle must be recognisable at 250px height — test every master at that size.
- Never rely on hover-to-reveal secondary images on touch; the gallery swipes, so the second and third images must stand alone (packaging, then a material close-up).

## 9. Casa Morph

Daylight documentary photos of the boutique at Piața Alexandru Lahovari 5 and the team at work (with consent). No staged "luxury lifestyle". Used on the Casa Morph section and future booking page.

## 10. Shot list per perfume (summary)

| # | Shot | Ratio |
|---|---|---|
| 1 | Front bottle, neutral paper + cut-out, color target frame | 4:5 |
| 2 | Bottle with its box | 4:5 |
| 3–5 | Opening / heart / base material close-ups | 1:1 |
| 6 | Travel 2×8 ml box (if sold) | 5:4 |

26 perfumes × 5–6 frames, plus sets and layering sequences. One studio setup, repeatable for new launches: a new scent brings its own measured color and slots into the system with no design work.
