# Phase B.5 — Asset and transition refinement

A refinement of Phase B (`phase-b-core-commerce.md`), limited to four things: image framing, navigation, a 2.5D/3D object proof for Zeta, and the existing page transitions. Phase C has not started. Captures are in `captures/phase-b5/`.

## 1. Image framing

Audit of every Morph campaign image used in Phase B, at 1920, 1440, 1024, 768 and 390 px.

| Where | Problem found | Fix |
|---|---|---|
| Home "Trei lumi", Les Exclusifs (desktop) | The card sat on the right, over the bottle in the panther's jaws, which is the subject of the image | Card on the left, over the panther's body; focal point `62% 32%` |
| Home "Trei lumi", Luxury (desktop) | The card on the left covered the upright bottle and its label | Card on the right, where the photograph is empty; focal point `0% 12%`, so the caps stay in frame |
| Home "Trei lumi", Ice (desktop) | The card on the left covered the gloved hand pouring sand (the matter of the image) | Card on the right, low (`align: 'end'`), under the bottle held up in the glove; bottle, sand and blotter all visible |
| Home "Trei lumi", 900–1199 px (tablet landscape) | The sticky stage ran at this width with a 368 px card; the portrait layout below 900 px showed Morph's portrait crop at 54svh | The sticky stage starts at 1200 px. Below that, each collection shows its own image: the whole landscape frame from 600 px (no crop), and the portrait crop only on phones |
| Collection room, Ice and Luxury (desktop) | The centered vertical crop cut the Ice bottle's cap and the Luxury caps | Focal points `70% 6%` (Ice) and `0% 12%` (Luxury). At 1920 × 1080 the window shows about 54% of the image height, so the subject has to sit at the top |
| Collection room, 600–899 px | A portrait crop at `min(134vw, 72svh)` cut 30% of the image | The landscape frame at 16:10 |
| Collection tabs at 1024 px | "Les Exclusifs" and "Baie & Corp" wrapped across lines | Tabs never wrap; below 1200 px they go under the plate |
| Your Next Form (home, "Trei ritualuri") | The 4:5 crop cut the left side of the open box | Square frame, which holds the whole box (21–80% of the frame's width) |
| Forma (home, phone) | The crop lost the Zeta label | Phone focal point `62% 30%` |

- Focal points live with the image data (`lib/campaign.ts`: `pos` for the landscape frame, `posM` for Morph's portrait crop). `CampaignPicture` (components/RoomImage.tsx) serves the right file per breakpoint with the right focal point (`.campaign-img`).
- No image is stretched. `object-fit: cover` is kept everywhere, with its focal point set explicitly.
- Portrait crops on phones were already correct. They changed only through the focal points.

## 2. Navigation and information architecture

On morphparfum.ro the header has 9 top-level items (research 01 §4). The concept keeps the 5 primary items from research 06. The rest of Morph's real structure sits one level down, under the item it belongs to. No category was invented.

```
Parfumuri    Colecții: Toate · Les Exclusifs · Luxury · Ice
             Baie & Corp: Geluri de duș și creme de corp
             Seturi: Parfum cu gel sau cremă · Travel 2×8 ml și mostre · Seturi layering Your Next Form
Descoperă    Explorează familiile · Fragrance Finder · Încearcă înainte de sticlă
Layering     Compune o pereche · Your Next Form
Cadouri      După buget · Dacă știi parfumul · Dacă nu știi încă · Gift card
Magazinul    Magazinul Morph din București · Autenticitate Certilogo
             Morph: Despre Morph · Jurnal ↗
```

- **Seturi** keeps Morph's label and sits under Parfumuri, as on the live site. Its links go to the page that serves each intent (research 06: ritual sets on Baie & Corp, trial sets on Descoperă, blind sets on Layering). No new sets page was added.
- **Jurnal** links to Morph's blog (`https://morphparfum.ro/blog/`) and opens in a new tab, as the link text says. The concept has no article pages and invents none.
- **Despre Morph** is now at the second level, under Magazinul, as well as in the footer. It is still not in the primary nav.
- Room fragrances (Parfumuri de cameră) exist on the live site but are not in the concept's snapshot, so they are not linked.
- Desktop: a stone panel under the header opens on hover or focus. Tab moves from the primary item into its panel. After a choice the panel stays shut until the pointer leaves the header. Mobile: the same groups sit indented under each item in the menu sheet.
- Data: `lib/nav.ts` (`groups` for the panel and sheet, `children` for the section nav on the item's own pages).

## 3. Zeta as a digital object: 3D or 2.5D

### What the public material allows

Morph publishes three Zeta images: one front packshot of the bottle (768 × 960), the box alone, and the box with the bottle, from the same front angle. Zeta also appears in the Luxury flat lay, tilted and overlapping other bottles.
- There is no side, back or top view, and no dimensions.
- The bottle is a twisted Bormioli prism: thick clear glass with an inner volume of juice at a different angle, an embossed M and MORPH on the back wall seen through the juice, a printed front label and a metal cap with an angled top.

### Comparison

| | True 3D (glTF + WebGL) | 2.5D (packshot + silhouette + light), built |
|---|---|---|
| From public imagery | **Not viable.** Photogrammetry needs dozens of views, and glass defeats it even then. A hand model from one front view would have to guess the twist, the wall thickness, the depth and the refraction. That guess is the "poor fake" the brief rules out. | Viable: the real photograph stays the object, so nothing is invented |
| What it needs | The physical bottle or Morph's CAD from Bormioli, label vector art, cap material reference | One packshot per product (already in the snapshot) |
| Format | `.glb` (mesh + PBR textures), 0.3–0.8 MB per bottle (estimate) | The existing AVIF packshot + an 8 KB PNG silhouette (`public/morph/objects/*-mask.png`) |
| Rendering | three.js with physical transmission, which renders the scene twice for glass. A new dependency, about 150–200 KB gzip (estimate) | CSS only: a masked light layer (`mix-blend-mode: screen`), registered custom properties, tilt of at most 4° |
| Phones | Transmission is the costliest material on mobile GPUs; it needs a fallback anyway | No pointer: the light crosses the glass as the bottle scrolls through the screen. Reduced motion: still light |
| Scale to the catalogue | One base model could serve all 26 (same Bormioli glass; three cap finishes), plus 26 labels. Estimate: 3–5 days of 3D work for the base, about half a day per label, once Morph supplies the bottle or CAD | `npm run lightmask <slug…>`: automatic, seconds per image. Zeta only for now, as briefed |
| Can it rotate? | Yes, fully | No. Beyond about 5° the flatness shows, so the tilt is capped at 4° |

**Decision.** True 3D is not produced. With the public imagery it would be a guess at the glass, and the brief rules that out. The 2.5D object is the proof.

A middle route exists once Morph supplies a model or the physical bottle: render a turntable offline (for example 36 frames) and play it as an image sequence. Phones get real rotation without shipping WebGL. This is documented only, not built.

### The 2.5D prototype

- `scripts/lightmask.mjs`: flood-fills the white sweep from the image border, so the clear glass inside the outline stays part of the object. It writes the silhouette at half resolution with a 1 px feather, and lists the result in `data/lightmasks.json`.
- `components/ObjectLight.tsx`: a light layer masked to the silhouette.
  - Desktop: the pointer sets `--lx`/`--ly` (where the light crosses the bottle, mapped onto the measured object box) and `--ry` (tilt).
  - Phones: the light is driven by scroll position.
  - The layer draws a crisp streak plus the thinner second reflection of thick glass. The contact shadow shifts away from the light.
- It is reusable where the bottle already appears:
  - `Stage` (home hero, lookbook, product page, layering entry) gets it automatically for any image with a mask;
  - `ProductVisual` (niche: shelf, index, cards) gets the hover version;
  - the page transition carries it: the morph snapshot is the same element.
- Performance:
  - one extra composited layer per lit object, no WebGL, no new dependency;
  - the pointer is read at most once per frame (rAF);
  - 60 fps measured in headless Chromium while the pointer moves continuously over the stage (121 frames in 2 s);
  - the mask costs 8 KB.
- Limits:
  - the label and the embossing do not shift with the light;
  - the light is a 2D approximation, not refraction;
  - the tilt cannot go past 4°.

## 4. Page transitions

Same architecture as Phase A: React `<ViewTransition>`, named shared elements, CSS on the pseudo-elements. No new library.

### Measured before → after (headless Chromium, local production build)

| Path | Before | After |
|---|---|---|
| Home → collection ("Intră în Luxury") | No shared element. Header only; the new page faded in from opacity 0 | The campaign on screen is the room's window (`room-image`, class `room-enter`): the frame travels to the window's place and size (620 ms, camera curve), the photograph keeps filling it (`cover`), the band of light crosses it (900 ms). Desktop and phone |
| Collection shelf → product | No shared element (the shelf bottle had only `shelf-<slug>`) | The shelf bottle is `obj-<slug>` and morphs into the product stage |
| Collection row → product | Morph 520 ms, `ease-inout` | 620 ms on a camera curve (quick departure, long settle); the object lands lit (brightness 1.18 → 1) and the old view hands over in the first 55% |
| Collection → collection (tabs) | Room change in place | Unchanged. It now carries the type `room`, which keeps the page itself still |
| Click → transition start | 19–81 ms | 24–100 ms (local; no change beyond noise) |

### What changed

- **Relight without an empty frame.** React cancels the root snapshot (`cancelRootViewTransitionName`), so the old page cannot be dimmed; it is gone at the first frame. The new page now starts at 40% of its light instead of 0 (`vt-light`) and waits `--vt-lead` (90 ms), so the moving object leads and the room follows. The timings are tokens: `--vt-in`, `--vt-lead`, `--vt-morph`, `--ease-camera`.
- **One element per name.** On a collection page a bottle is on the shelf and in the index. `lib/pick.ts` gives `obj-<slug>` to whichever was clicked, the shelf by default, so returning from a product lands the bottle back on its shelf.
- **Static collection rooms.** `/parfumuri` and the three collection routes are now prerendered (SSG). The filters are still in the URL, read on the client (smoke-tested with a reload). A `<Link>` prefetches the whole room, so in production no server render sits between the click and the room change. This was the Phase B limitation "server-rendered collection routes delay the room change".
- **Bug found:** on emulated iPhones (`isMobile`), every view transition aborted ("invalid state") whenever the page was 4 px wider than the screen. The cause was the tabs set to never wrap inside a grid cell without `min-width: 0`. Fixed. Any horizontal overflow on phones silently disables all transitions, which is one more reason for the smoke test's overflow sweep.

## Verification

- `tsc --noEmit` clean; `next build` passes. `/parfumuri` is now static and `/parfumuri/[colectie]` SSG.
- `npm run smoke`: 28 checks, passing on two consecutive runs. New checks:
  - filters survive a reload of the static collection page;
  - nav panels (collections, Baie & Corp, Seturi, Despre Morph, Jurnal as an external link), keyboard into the panel, mobile sheet;
  - home world → collection carries `room-image`, on desktop and phone;
  - shelf bottle → product morph on a phone;
  - the Zeta glint follows the pointer.
- Captures in `captures/phase-b5/`: framing before/after (desktop, tablet, 1920, phone), nav (desktop, phone), Zeta 2.5D at three light positions, and transition frames for home → Luxury and shelf → Zeta (desktop and phone).
- Not run: Safari, Firefox, real devices, Lighthouse, screen reader.
