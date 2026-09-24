# Phase B — Homepage and core commerce

Second implementation stage of `phase-05-5-creative-upgrade-plan.md`. It builds on `phase-a-creative-system.md` (light, materials, page transitions). Captures are in `captures/phase-b/`.

Images of identifiable people (the Gate 17 launch, the Animal editorial) remain excluded until the owner approves them. The pages use only Morph images with objects, hands or silhouettes.

## What was built

| Area | Before | Phase B |
|---|---|---|
| Product at scale | the niche (a lit box) at every size | `Stage`: the bottle stands on a glass shelf in the room's light, with its reflection and contact shadow; the niche stays for index scale |
| Home | eight equal bands (hero, object, vitrines, most chosen, families, try, composer, boutique) | six movements, each with its own anatomy: entrance · three worlds · lookbook · form · three rituals · the shop |
| Most chosen | name list + one niche | lookbook: one bottle per spread at monument scale, the name crossing the stage, native horizontal snap with buttons and a live count |
| Collections | wood vitrine head | a room: Morph's campaign as the window, a plate with the name crossing its edge, the walnut shelf below; changing collection changes the room in place |
| Body & Bath | absent | `/parfumuri/corp`: 12 scents, each with its gel, cream, perfume and sets; "Ritualul" chapter on the 12 product pages that have them |
| PDP | niche gallery, full composer embedded | the bottle on its stage first; "Ritualul"; a compact layering entry (two bottles in depth, link to the composer) |
| Search | fade-in overlay | the room dims, the panel unfolds from the top and lifts away faster; campaign thumbnails for the collections; body products searchable |
| Cart | stone drawer | night drawer, lines on glass edges, metal threshold rule, one real suggestion that covers the gap, gift box (+20 lei, real) |

## Stage (`components/Stage.tsx`)

- The foot of the bottle sits exactly on the shelf line because each packshot is measured: `npm run objects` renders every product image in Chromium and writes the object box (top, bottom, left, right as fractions) to `data/objects.json` (107 images). For the front packshots, the foot sits at 87.5–88.3% of the image height.
- Position: `top = shelf − foot × box height`. The reflection is the same image flipped about the foot, masked so it fades out within a fifth of the bottle's height. The contact shadow is the width of the measured bottle.
- Light: a soft radial pool (`--glow` at 14% at its centre, as in the niche) that reaches the room tone (`--bg`) before the stage edges, plus the grain tile. The object stands in the room with no visible frame, on night as well as on stone.
- Blend: `mix-blend-mode: multiply` sits on the object's positioned wrapper, not on the image. On the image it did nothing, because the wrapper's stacking context isolated the blend.
- The stage is the shared transition object (`obj-<slug>`), so a row, card or lookbook bottle morphs into the product page's stage.

## Home, six movements

1. **Entrance:** Morph's motto and Zeta on a stage in the night room. The Phase A loader is unchanged.
2. **Three worlds** (`CollectionWorlds`): a sticky full-bleed layer holds the three collection campaigns (panther, red rope, lab). Three cards scroll over it on native scroll. When a card reaches the middle of the screen, its campaign crossfades in under a passing band of light. Cards sit on the side each photograph leaves free. Phones get Morph's portrait crops, with no sticky layer. The section is `overflow: clip`: without it, the sticky layer (negative bottom margin) overhung the section and, being positioned, painted over the lookbook.
3. **Cele mai alese** (`Lookbook`): 5 bestsellers without the hero perfume, so transition names stay unique. Each spread has a stage, the name at up to 168 px crossing the stage edge, Morph's own first sentence in italic, the three tiers, facts, add-to-cart and a travel link. There is no autoplay; the buttons, count and swipe follow the ui-ux-pro-max carousel rule. Spreads that leave lower out of their light; the arriving one rises.
4. **Form:** Morph's Luxury flat lay (2560 px) in a hard crop with IMAGE → CROP (it settles from a 1.07 scale once), next to the Bormioli line and the house facts.
5. **Three rituals:**
   - Descoperă: five families with their three most frequent notes and counts, plus the finder;
   - Layering: the Your Next Form campaign image, the count and price, and Morph's quoted line about the blind box;
   - Baie & Corp: Zeta as perfume, gel and cream, with prices, and Morph's line on the creams.
6. **The shop:** a walnut room with the address, open now, hours, and the try-at-home / try-in-the-shop pair with real formats and prices.

Mobile home is 8,735 px, down from 10,521 in Phase 05, but still 235 px over the plan's 8,500 target. To get there, some content is hidden on phones only:
- the lookbook note formula;
- the hero tiers;
- the family notes;
- the trust list, which also appears on the product page and in the footer.

## Collection room (`app/parfumuri/CollectionPage.tsx`)

- Window: `RoomImage` uses `getImageProps` and `<picture>` to serve Morph's desktop campaign above 900 px and its portrait crop below. "All" uses Morph's row-of-bottles image.
- Plate: the breadcrumb, the name (named `room-title`), Morph's collection line and the facts, on a stone plate that overlaps the window's lower edge. Tabs: Toate · Les Exclusifs · Luxury · Ice · Baie & Corp.
- Shelf: every bottle on the walnut band. Each item is named `shelf-<slug>`, so bottles shared by both collections move and the others leave and arrive.
- Room change (between collection routes):
  - the photograph (`room-image`) stays in place; the old one fades while the new one is revealed by a moving soft mask edge, slightly brightened;
  - the old title drops and the next rises (the loader's grammar);
  - timings are 700–900 ms.

  The mechanism is light and imagery, never hue. Measured by screencast (Luxury → Ice): the change starts at ≈ 490 ms after the click and completes by ≈ 1,000 ms.
- Limitation: collection routes render on the server per request (their filters are in the URL). That rendering accounts for most of the delay before the transition starts. Making the room head static, or prefetching the siblings, would shorten it; this is a Phase E item.

## Body & Bath

- Data: `npm run snapshot` now also writes `body` (39 items: 8 gels, 12 creams, 8 perfume + gel sets, 11 perfume + cream sets) and `gift` (the gift box at 20 lei; the gift card at 230–1,100 lei). The perfume data did not change: the diff against the previous snapshot is empty. Each body item links to its perfume by the name Morph gives it; all 39 matched.
- `Ritual` (shared by the product page and `/parfumuri/corp`): gel, cream and the 100 ml perfume side by side, then the sets. "Separat X lei" appears only when the set costs less than the perfume plus that body product, computed from the data.
- The only claim about body and perfume is Morph's own About sentence on the creams, quoted verbatim. Cross-scent body layering is not suggested.

## Product page

- Gallery: the first slide is the stage, and the packaging shots stay in niches.
- "Ritualul {name}" on the 12 perfumes with body products.
- The layering entry replaces the embedded composer: two bottles overlapping in depth, "Compune cu {partner}" (same family, stated as not a Morph recommendation) and the Your Next Form link. The full composer lives on `/layering`, where Phase C rebuilds it.

## Search and cart

- Search: the dim lasts 180 ms; the panel unfolds with `clip-path` over 440 ms after 120 ms; closing takes 260 ms (exit faster than entry). The input is still focused synchronously. Collections in the empty state show their campaign crops. Body products and a Baie & Corp page are in the index.
- Cart: the night drawer has a grain surface, and every line stands on a glass edge. The threshold appears as a sentence with a metal progress rule. The suggestion is the cheapest real product, among the travel sizes and same-scent gels of the perfumes already in the cart, that covers the remaining amount; nothing appears if none does. The gift box toggle adds Morph's gift box (20 lei, from the Store API). The empty state is an unlit niche.

## ui-ux-pro-max

Imported verbatim from `nextlevelbuilder/ui-ux-pro-max-skill` at `dcc40ff`, after inspection (see `docs/research/skill-registry.md`).

- Its `--design-system` output for this project was rejected. It recommended a gold accent, Cormorant/Montserrat, a feature-card grid, "liquid glass" blur and a `back.out` stagger, which contradict the Morph direction in CLAUDE.md.
- Its UX rules were applied:
  - rotating content needs controls and no autoplay (lookbook, and later the reviews);
  - a visible focus indicator on every control;
  - live search results with suggestions when nothing matches;
  - reserved media space (`aspect-ratio` or fixed heights on every stage and window).
- `"drawer cart overlay"` returned no match, so the cart follows the plan instead.

## Verification

- `tsc --noEmit` clean. `next build` passes, with the new static route `/parfumuri/corp`.
- `npm run smoke`: 23 checks, passing three runs in a row. New or changed checks:
  - lookbook next/count/active spread;
  - cart via the lookbook;
  - header tone over "Forma";
  - collection room Luxury → Ice (`room-image`, `room-title`, 5 bottles on the Ice shelf);
  - Baie & Corp (12 rows, add a gel at 240 lei, PDP ritual);
  - cart suggestion and gift box;
  - `/parfumuri/corp` added to the overflow sweep.
- Two flaky cases found and fixed:
  - The hero sweep's first measurement after a 1440 → 320 resize could run before the container-query layout; it now re-measures once after 150 ms.
  - The page entrance could hold opacity 0 for a moment under reduced motion. It is now declared only under `prefers-reduced-motion: no-preference`.
- Other bugs found during visual review and fixed:
  - `CAMPAIGN` imported from a client module into a server component resolved to `undefined` (500 on collection pages). The data moved to `lib/campaign.ts`.
  - The global `.t-display` size beat the hero's `.title` at 900 px after the CSS order changed; the hero rule's specificity was raised.
  - The "Form" image's scale overflowed the page by 11 px on phones: an absolutely positioned image was not clipped by a static `overflow: hidden` wrapper.
  - The mobile collection window lost width because `aspect-ratio` combined with `max-height` shrank the width.
  - The perfume column of `Ritual` collapsed to 0 width.
- Not run: Lighthouse, Safari/Firefox, real devices, screen reader.

## For Phase C

- Descoperă as family chapters and a notes index, the finder's scenes, the horizon → result transition, and Compune on one glass shelf. The `Stage` primitive and the transition names are ready.
- Remaining home/commerce limitations:
  - packshots soften above ≈ 700 css px (the MUST HAVE shoot fixes this);
  - server-rendered collection routes delay the room change;
  - the collection filter bar is still the Phase 05 control;
  - search results do not morph into the product page, because a result can share a slug with a bottle on the page underneath (duplicate names).
