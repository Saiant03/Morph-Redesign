# Phase C3.5.1: Layering motion and small polish

Scope: the bottle change and the tier light on `/layering`, the Nudo / Axum base notes, the arrival on `/magazin`. Nothing else was redesigned: no mobile Layering redesign, no cart transition, no C4. The transition architecture (`app/template.tsx`, the T0/T1/T2 rules in `globals.css`) is unchanged; one route-scoped T1 variant was added. Captures are in `captures/phase-c3-5-1/`.

## 1. Bottle entrance and replacement

Before: the old bottle vanished in one frame and the new one faded up 3 % over 640 ms, its glint already at full strength. It read as "the image changes".

Now (`PairStage` in `components/Stage.tsx`, CSS in `Stage.module.css`), about 1 s in all, only `transform`, `opacity`, `filter` and `clip-path` animated:

| Time (from the click) | What happens |
|---|---|
| 0–270 ms | the slot's key light dips to 40 % brightness and lowers 3 % (`dip-a/b`); the bottle that stood there sinks 1.5 % and fades out (`pair-leave`, 220 ms: exit faster than entrance) |
| 150–870 ms | the new bottle rises from under the glass (`pair-rise`, 720 ms, `--ease-out`, no overshoot). It starts `--rise` lower (5 % of its own height for A, 4 % for B, further back); the clip moves with it, so its foot stays on the shelf line and it comes up through the glass, never across the shelf's lit edge. Fully opaque by ~400 ms, then it only decelerates into place |
| 270–900 ms | the light comes back up with the bottle: the object is always visible before its light is full |
| ~580–870 ms | the reflection (from 30 %) and the glint (from 60 %) come last and travel with the bottle |
| 0–640 ms | the other bottle, if the new pair's measures move it, glides from its old place (`glide-a/b`, FLIP by `--dx`) with its light. For most pairs the shift is under 1 px and no glide runs |

Mechanics:

- The pair is final at once (state, URL, text). The leaving bottle is a visual copy kept for 260 ms (`leaving` in `LayeringComposer`), `aria-hidden`, without a view-transition name; its geometry is computed from the previous pair (`pairLayout`), so it leaves from exactly where it stood. At most one leaving copy exists, also when arrow keys run through the list.
- `PairChange { slot, n, from }` drives it. `n` alternates the animation names (`dip-a` / `dip-b`, `glide-a` / `glide-b`), which restarts the light's animation without remounting the pools, so the `--glow` tint still transitions from the old scent to the new one.
- The dip uses `filter` and `transform`; the tier uses `translate` and `opacity`. They never fight over a property.
- The rule from C3.5 holds: nothing on `.pairObj` forms a stacking context; every animation runs on its children.
- Found at runtime and fixed: a `brightness()` filter on the rising packshot broke its `multiply` blend (the packshot's box showed as a light rectangle over the dark room at ~450 ms). The bottle is now darkened only by the dipped light it multiplies into, which is also the physically right cause.

## 2. Tier light

- The pools move on the light's curve (`--ease-light`, `--d-story` 900 ms) instead of 640 ms ease-out; B's light follows A's by 70 ms, so one light seems to pass across the shelf. Sampled at runtime: `translate` and `opacity` interpolate continuously, no jump; the bottles do not move (frame `top` constant).
- The choice reads before the light finishes: the pressed dot scales in (320 ms), the tier label and the strata colour change in 160–320 ms.
- The notes on the glass (≥ 1200 px) arrive with the light: 120 ms after it starts, A's side, then B's, 70 ms apart, the shared notes last (360 ms).
- Inactive notes keep `--muted` (unchanged contrast).

## 3. Nudo / Axum: data diagnosis

Neither case A nor B cleanly: **the base notes exist in Morph's published data, but not in the field the snapshot reads.**

- The snapshot takes the notes from the Store API attributes `Note de vârf / de mijloc / de bază`. Seven perfumes have one empty attribute: Axum, Nudo, Antigua Bay, Malaga, Umhh, Iconic (base), Kolonaki (heart).
- Each of them lists that tier in its own product description, in the "Compoziție olfactivă" block, as a heading `Note de bază: …` (already in `data/catalog.json`, `sections`). Checked live against the Store API on 2026-09-25.
  - Axum: "Note de bază: mosc alb, vanilie, ambră cenușie" (the other two tiers match the attributes).
  - Nudo: "Note de bază: tămâie". Here Morph's two sources disagree: the attributes put tămâie in the heart, the description puts cashmeran in the heart and tămâie in the base.
- Fix (`lib/catalog.ts`, `tier()`): an empty tier is filled from the description heading of the same tier, first letter capitalised. A published attribute is never replaced, the snapshot file is not modified, nothing is invented. The PDP, search, filters and Descoperă read the same `perfumes`, so they now show these tiers too (Descoperă's A–Z count is computed, so it includes the new names).
- Nudo therefore shows tămâie in the heart (attribute) and in the base (description). Both are Morph's statements; the page does not choose between them. In the pair reading, "Tămâie: bază la Nudo" names the last tier where Nudo carries it.
- If a tier is empty in both sources, the strata show a muted "—" with "note nepublicate de Morph" for screen readers. No perfume needs it at the moment.

## 4. Arrival on `/magazin`

Measured before: the generic relight (T1) starts the new page at 40 % opacity. The walnut room is dark and the page body is light stone, so for ~400 ms the shop appeared as a washed-out pale grey panel (`before-magazin-arrival-frame-300ms.jpg`).

Now:

- `html[data-nav] .page-enter:has(> [data-enter='shop'])` swaps `vt-light` for `shop-light`: same 8 px rise, same `--ease-light`, same `--vt-lead`, 560 ms, but from `brightness(0.35)` at full opacity. The room is never translucent; its light comes up (`after-magazin-arrival-frame-310ms.jpg`).
- The three display niches on the art wall light up after the room, left to right (`display-light`, 520 ms from 260 ms, 90 ms apart): the objects resolve last. Done in page CSS (`magazin.module.css`).
- It keys on the destination, so every link to `/magazin` (header, footer, Layering, PDP) gets it; no `transitionTypes` added.
- Total: ~1 s until the last niche is lit; the page is interactive at once (no view-transition overlay is held for it).

Finding, not changed: React `enter` animations on a `<ViewTransition>` that mounts with the new route do not run under this Next navigation (probed: only shared-name pairs such as `room-image`, `room-title` and `obj-<slug>` reach `document.getAnimations()`; the existing `shelf-in` enter does not fire either). A view-transition band over the art wall was tried first and dropped for that reason. Fixing it would mean changing the transition architecture, which is outside this phase.

## Reduced motion

The global rule (all animations and transitions at 0.01 ms, view transitions off) is unchanged and covers everything new. In addition the leaving copy is never rendered under `prefers-reduced-motion`, and all new keyframes sit inside `(prefers-reduced-motion: no-preference)`. Tested: after a swap the new bottle is at opacity 1 at once, no leaving copy, no running animation after a tier change.

## Runtime QA

Scripted Playwright (CDP screencast frames + a per-frame sampler of the stage), production build, 1440 / 1024 / 768 / 390:

- A Zeta → Nudo, B Vapor → Axum, A → Zeta, B → Vapor, A Nudo → Axum, A Axum → Nudo, empty → Zeta, empty B → Vapor, Deschidere → Inimă → Bază → Deschidere.
- Final geometry after every change equals a fresh page with the same `?a=&b=` (to the pixel) at all four widths.
- No horizontal overflow at any sampled frame; no console errors.
- Light never ahead of the object: the dip's minimum (~400 ms) comes after the new bottle is opaque.
- Rapid arrow keys through the list: at most one leaving bottle, everything settles to full light.
- Fixed during QA: the multiply rectangle (§1); the old and new bottles overlapped at ~40 % opacity each (ghosting) with the first timing; the leave was shortened to 220 ms and the rise delayed to 150 ms.
- `/magazin` from `/layering`, `/`, `/parfumuri`, a PDP (1440), and from `/layering`, `/` (1024, 768, 390): no pale frame, no overflow.

## Impeccable

Focused pass with the `animate` playbook and the craft floor (no redesign):

- Motion thesis: one authored moment (a bottle placed into its light); the tier and the shop arrival are continuity, kept quieter and shorter.
- Exit faster than entrance (220 / 720 ms), ease-out arrival, no bounce, no zoom, no rotation.
- Interruption and repeated use: checked (above).
- Material by meaning: light (filter on the pool), reveal (clip-path at the shelf), continuity (FLIP glide).
- Detector on every changed file: no findings.
- Not acted on: the playbook's suggestion to keep gentle opacity feedback under reduced motion; the project's existing rule (everything final at once) is kept, as the brief asks.

## Tests

`tsc --noEmit`, `npm run build`, `npm run smoke`: 54 checks (50 + 4 new: replacement geometry and leaving copy, reduced-motion final state, Nudo / Axum base notes on Layering and the PDP, `/magazin` arrival animation and overflow). Run on a fresh server, as in C3.5.

## Known limitations

- Clearing the shelf ("Golește raftul") still removes both bottles at once; not in scope.
- The tier notes on the glass remount on a tier change, so the previous tier's copy disappears in one frame before the new one fades in (≥ 1200 px only, decorative copy).
- The header changes tone (dark → stone) instantly on arrival at `/magazin`, as on every route (T0 is not animated by design).
- `enter` view transitions do not fire under Next navigation (§4).
- Nudo's heart/base disagreement is Morph's; it is shown, not resolved.
