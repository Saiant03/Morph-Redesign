# Phase A — Creative system

The first implementation stage of `phase-05-5-creative-upgrade-plan.md`. It lays the system the next phases build on: naming, light, materials, page transitions, the hero title, and Morph's campaign assets. It does not redesign pages; Phase B does.

This document extends `phase-05-design-system.md`. Where the two disagree, this one wins: wood, grain, the shop's name, motion roles, page transitions. Everything else in Phase 05 still applies (tones, type, grid, niche, buy path, accessibility).

Captures are in `captures/phase-a/`: home and shop at 1440 and 390 px, plus a frame strip of the row → product transition.

## What changed

| Area | Before | Phase A |
|---|---|---|
| Shop name | "Casa Morph" everywhere, route `/casa-morph` | "Magazinul Morph din București", nav "Magazinul", route `/magazin`, 308 redirect from `/casa-morph`; footer column "Despre Morph" |
| Walnut | one `feTurbulence` stretched over the band | a baked wall of panels with shadow gaps, a lit edge, per-panel grain and satin, lit by a key light and falling off to the floor |
| Flat tones | plain colour | a neutral grain tile on stone and night (anti-banding, surface) |
| Light | only `--glow` inside the niche | room key-light tokens `--key-x`, `--key-y`, `--key` (registered, interpolable) |
| Navigation | hard page cut | T0 persistent header, T1 relight entrance, T2 shared bottle between list and product page |
| Hero motto | size by viewport, `overflow: hidden` mask | size by its column (`cqi`), vertical-only clip; smoke-tested every 10 px from 320 to 1920 |
| Morph imagery | packshots only | 16 campaign and editorial images downloaded with provenance (`data/assets.json`), ready for Phase B |

## Naming

The live site calls the shop "magazinul din București", "Contact magazin" and "Magazin oficial". "Casa Morph" appears there once, as a footer hours label, and never as a name. The owner ruled it out.

- `BOUTIQUE.name` = "Magazinul Morph din București" (titles), `BOUTIQUE.short` = "magazinul Morph" (in sentences), `BOUTIQUE.href` = `/magazin`.
- The try list is "De încercat în magazin". "Boutique" is no longer used in customer copy; the live site does not use it.
- Deviation from the plan: the nav item is **"Magazinul"**, not "Despre Morph". The page is still mostly the shop. "Despre Morph" is used as the footer column title, and becomes the nav label when Phase D adds the story and the journal.
- The smoke test fails if "Casa Morph" appears in any route's HTML.

## Light

```css
@property --key-x { syntax: '<percentage>'; inherits: true; initial-value: 30%; }
@property --key-y { syntax: '<percentage>'; inherits: true; initial-value: 0%; }
@property --key   { syntax: '<number>';     inherits: true; initial-value: 1; }
```

One key light per room, behind and above. A room gets lighter or darker; it is never recoloured. The walnut band uses the tokens now. Phase B stages and the collection room will animate them (T4 room change, collection relight). `--glow` stays as it is: the scent tints the light inside a product stage by 14%, and nowhere else.

## Materials

Baked once by `npm run materials` (`scripts/materials.mjs`). The script renders SVG filters in the preinstalled Chromium and writes WebP to `public/materials/`. No dependency was added, and no live SVG filter runs on the site.

| File | Size | Construction | Use |
|---|---|---|---|
| `walnut.webp` | 2400×1500, 32 KB | vertical panels of 8 widths; per panel an anisotropic fractal grain (0.09 × 0.0018) bent by a slow displacement, a low-frequency figure, and a satin gradient from the upper left; 5 px shadow gaps with a 2 px lit edge. All filters in sRGB (the linearRGB default greyed the first bake). | `[data-tone='wood']` under a key-light radial and a floor fall-off, `cover`, anchored to the top |
| `grain.webp` | 160 px tile, 18 KB | seamless neutral luminance noise, alpha ≤ 0.1 | body (stone) and `[data-tone='dark']` |
| `paper.webp` | 256 px tile, 47 KB | fibres plus grain, seamless, alpha | reserved for the newsletter card and pull quotes (Phase D) |

Rules:
- Textures never animate. Only light tokens and transforms do.
- If a surface reads as wallpaper or a curtain, lower the contrast and strengthen the edges before adding detail. The second bake halved the displacement for that reason.
- Contrast is measured on the rendered wood with the page text hidden. `--muted` (#a89c8e) reaches ≥ 4.78:1 on 99.9% of the lit walnut and 7.3:1 on its darkest point. Only the 2 px lit panel edges reach 4.27:1, and body text never sits on a single line. `--fg` reaches ≥ 9.2:1 everywhere.

Glass shelf, reflection and stone light fall-off are specified in the plan (§21) and built with the Phase B stage, where they are first used.

## Page transitions (PAGE → STATE)

Built with React's `<ViewTransition>`, which works in the Next 16.3 App Router without configuration. Browsers without the View Transitions API navigate instantly.

| Layer | Implementation |
|---|---|
| T0 persistent frame | `SiteHeader` has `view-transition-name: site-header` (set inline; a CSS-module value would be hashed). Its group sits above the page with no animation; the old image is hidden, so the header never flickers or fades. |
| T1 relight | `app/template.tsx` wraps each page in `.page-enter`. After the first client navigation (`components/NavState` sets `html[data-nav]`), the new page rises 8 px from dim over 380 ms (`vt-light`). The first load never gets it, so the home entrance is not doubled. |
| T2 shared object | `ProductVisual` takes `vt`: `<ViewTransition name="obj-<slug>" share="morph" default="none">`. It is set on collection index rows, the collection gallery cards, the home hero, and the first image of the product gallery. The morph lasts 520 ms, `--ease-inout`. |
| Trigger | An empty marker `<ViewTransition enter="page" exit="page">` in the template makes React run a transition on every navigation, without capturing the page itself. |
| Reduced motion | every `::view-transition-*` animation is `none`; `.page-enter` collapses with the global 0.01 ms rule; tested. |

Findings from the spike, kept here so they are not rediscovered:
- **Capturing the whole page breaks.** Wrapping the page in an enter/exit `ViewTransition` snapshots an element taller than the viewport. After Next resets the scroll, Chromium placed the clipped snapshot at the wrong offset and its group covered the header. The marker + CSS entrance approach avoids any large capture.
- **React cancels the root snapshot** when no boundary affects the root (`rootViewTransitionNameCanceled` in react-dom), so `::view-transition-new(root)` never animates. The page stays live under the transition layer, which is why T1 is a CSS entrance on live content.
- **One name per page.** Unpaired names cost nothing, but a slug present twice on either side forms a second pair. Vapor flew from its collection row to the "same family" card on the Zeta page until those cards stopped being named. Rule: name an object only where its product page holds no other named copy of it.
- **The outgoing page is not dimmed** (T1 out), because React does not keep a root snapshot. The new page appears in ≈ 250 ms, and the bottle carries the continuity. If Phase E wants a visible dim-out, it needs a small fixed overlay animated before navigation. That has not been built.

Timeline measured with a CDP screencast (collection row → Zeta, 1200 × 750): header stays; new page in at ≈ 243 ms and fully lit by ≈ 620 ms; bottle grows from the row position into the gallery between ≈ 250 and 735 ms.

Not yet built: T3 shared titles and T4 room change (planned for Phase B–E), shared search results, finder result.

## Hero motto

"Metamorfoză" is one unbreakable word, and its reveal mask had `overflow: hidden`. Where the viewport-based size outgrew the grid column, the mask cut the word.

- The text column (desktop) and the hero grid (mobile, where the column is `display: contents`) are inline-size containers.
- The word is 5.65 × the font size in Newsreader 300 (measured). `font-size: min(112px | 72px, 17cqi)` keeps it at ≈ 96% of its column.
- The mask clips only vertically: `clip-path: inset(-0.3em -1em 0 -1em)`. The rise animation is unchanged.
- The smoke test sweeps 320–1920 px in 10 px steps and checks both lines against their mask and the viewport.

## Morph assets

`npm run assets` downloads every `status: "concept"` entry in `data/assets.json` into `public/morph/campaign/`: the three collection campaigns (desktop and mobile crops), three Your Next Form images, two workshop images (hands only), the Luxury flat lay, the Les Exclusifs still life, the black bottle, the row of bottles and the N8 editorial. That is 16 files, 0.6 MB. The PNG slide was replaced by the same shot as AVIF (23 KB instead of 1.5 MB).

Marked `pending` and not downloaded:
- the Gate 17 launch photographs (identifiable guests);
- the Animal editorial (models);
- one workshop image with people.

None of the assets is placed on a page yet; Phase B uses them.

## Motion roles

The table in the plan (§23) is the reference. Phase A implements three of its roles:
- ENTRY: unchanged;
- PAGE → STATE: T0, T1 and T2 as above;
- SECTION → ENVIRONMENT: already the header tone.

The rest arrive with their components in Phases B–C.

## Verification

- `tsc --noEmit` clean; `next build` passes (routes unchanged except `/casa-morph` → `/magazin`).
- `npm run smoke`: 20 checks pass. They include four new ones:
  - naming and redirect;
  - hero sweep 320–1920 px;
  - row → product runs a view transition with `obj-morph-zeta-parfum-100ml`;
  - no running animation and full opacity under reduced motion.
  The try-list and overflow checks now use `/magazin`.
- Visual: captures at 1440 / 390 px. Transition checked frame by frame with a CDP screencast. Walnut contrast measured on the rendered page.
- Not run: Lighthouse, Safari/Firefox, real devices.

## For Phase B

- Stage primitive (glass shelf, reflection, key light) and monument scale; use it on the home hero and the product page.
- The collection room with campaign environments and the collection switch (T3 title, light change).
- Name the search results and the lookbook objects for T2, one name per page.
- Replace the painted art wall on `/magazin` (Phase D per the plan; flag if B touches the page).
