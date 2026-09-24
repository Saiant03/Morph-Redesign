# Phase 03 — Consolidation (A Cromatic + C Strata)

Phase 02 compared three directions (`phase-02-comparison.md`). Phase 03 consolidates the chosen hybrid into one concept: **A's color language, C's behavior, B's collection index as a merchandising pattern**. The nine prototype screens (`/concept/{a,b,c}/…`) were removed from the app; they remain in git at `ae81766` and in `captures/` (Phase 02 files).

Rules and tokens: `phase-03-design-system.md`. Future shoot: `photography-direction.md`. Captures: `captures/phase-03/`.

## The story for Morph

Morph already has the ingredients: colored bottles, rich attribute data, a finder, travel sizes, sample sets, twelve blind layering sets, Certilogo, Casa Morph and a loyalty program. Online they are separate dead ends (research 01, 05). The concept connects them into one journey — **find → try → buy → combine** — and gives it an identity made from Morph's own product truths: each scent's color, and the way a scent develops and combines in layers.

The journey is not four marketing blocks. It emerges from the pages:

| Step | Where it lives |
|---|---|
| Find | Home atlas (26 colors = 26 scents), families as color chords, Fragrance Finder entry, collection index with search by note |
| Try | Travel 2×8 ml as a format on the PDP and in the index, sample sets in the grid and on the PDP, the shipping-threshold nudge, the composer's "try both in travel" |
| Buy | PDP purchase block (CTA in the first mobile viewport), persistent buy bar, quick add from cards and rows, cart drawer with free-shipping progress |
| Combine | Layering composer on home and every PDP, Your Next Form sets |

## What was retained

**From A — Cromatic (primary visual language)**
- Mineral paper + ink interface; one grotesk; the serif wordmark as the only serif.
- Each scent's identity color (label band for Luxury, juice otherwise) as the scent's field behind its bottle, interpolated on change.
- The color index as the home hero (now the "atlas", grouped by collection, each group linking to its collection).
- Collections and families read as color chords.

**From C — Strata (behavior)**
- Time on skin on the PDP: opening → heart → base with Morph's own paragraphs, now on native scroll (no pin).
- Notes as strata everywhere (`NotePyramid`): the scent's own color from light (opening) to full (base).
- The layering composer as the signature: two strata columns overlap into the layered result; notes merge tier by tier.
- The persistent buy bar on long pages.

**From B — Forma (pattern only)**
- The collection **index with a live preview**: the fastest shopping view in Phase 02. Kept as the default collection view, restyled in A's language (scent strip, preview field in the scent's color, strata notes) and paired with a gallery view. Nothing else from B (shear, width-axis type, monochrome, typographic "MORPH").

## What was discarded, and why

| Discarded | Reason |
|---|---|
| C's pinned home hero and pinned PDP section | Scroll-jacking, long pin spacers; research/brief ask users to stay in control. Replaced by sticky CSS + IntersectionObserver |
| C's backdrop blur, veils, serif italic second voice | Performance on mobile, contrast, "dreamy beauty" cliché |
| A's glass-pane composer | Read as a diagram; replaced by strata columns that also carry time |
| A's explanatory hint under the index | The labels, tooltips and caption make it self-evident |
| A's four numbered journey cards | The journey is expressed by the page sequence instead of a module |
| B's shear, width-axis type, monochrome | Conflicts with the serif wordmark and hides color, which is the identity |
| Native `<select>` pickers in the composer | Replaced by slots with the bottle and grouped chips |
| Hard-coded prototype colors (`veilTint`, ad-hoc mixes) | All scent colors now come from `lib/scent.ts` |

## Final design principles

1. Calm interface, colored products.
2. Color is data (sampled, overridable, contrast-checked).
3. Strata is behavior: sequence and combination, not texture.
4. The buy path is never hidden.
5. One signature moment per page.

## Main interactions

- **Scent atlas** (home): hover, focus or tap a color → field recolors, bottle swaps, caption links to the PDP.
- **Collection index**: family chips (with chords), search by name or note, secondary filters (intensity, longevity, travel, stock), sort, index/gallery; URL keeps state; Flip reflow; hover/focus a row → preview recolors; on mobile a "+" opens the strata inline.
- **PDP purchase**: 100 ml / travel toggle, gift box, CTA with total, threshold nudge, sample set, back-in-stock form for out-of-stock perfumes plus in-stock alternatives from the same family.
- **Time on skin**: phase tabs + scroll; upper strata thin out as the scent settles; only Morph's stated longevity is shown as time.
- **Layering composer**: pick two scents → columns part and rejoin, strata recolor top to base, merged notes; buy both travel sizes or the relevant sample set; Your Next Form offered as Morph's own curated alternative. Visitor pairs are explicitly labelled as a visualisation, not a recommendation.
- **Cart drawer**: opens on add; free-shipping progress; checkout deliberately disabled.

## Implementation decisions

| Area | Decision |
|---|---|
| Routes | `/` · `/parfumuri` (all) · `/parfumuri/{les-exclusifs,luxury,ice}` · `/{product-slug}` using Morph's existing slugs (26 statically generated; unknown slugs 404). Collection pages render dynamically so filter URLs work without a flash |
| Components | `components/`: SiteHeader, CartDrawer, Footer, Logo, ProductVisual, ProductMeta, ProductCard, ProductIndex (+Row), FilterBar, CollectionPreview, ScentAtlas, PurchaseBlock, ProductGallery, NotePyramid, TimeOnSkin, LayeringComposer, AddToCart |
| Data | Unchanged Phase 02 snapshot (`data/catalog.json`, 2026-09-24) and colors (`colors.json` + overrides). New: `lib/scent.ts` (tokens, contrast), `lib/filters.ts` (URL-safe filter state). `familyNotes()` describes a family by its most frequent real notes instead of written copy |
| Styling | Global tokens and primitives in `app/globals.css`; CSS Modules per component; no CSS framework, no UI kit |
| Motion | GSAP only for the home entrance/atlas and collection Flip; CSS for the rest; no ScrollTrigger in the app anymore. Reduced motion respected |
| Images | `next/image` everywhere (responsive `sizes`, AVIF/WebP, lazy by default, priority for LCP) |
| Dependencies | None added (still `next`, `react`, `react-dom`, `gsap`) |
| Links outside the concept | Finder → Morph's live `/quiz`; Cadouri → Morph's gift card page; sample sets and Your Next Form → their Morph product pages. Footer items are listed, not linked |

## Verification (this phase)

- `next build` passes; 30 static pages + 2 dynamic collection routes. `/nope` → 404.
- `site-capture` at 1440 and iPhone 13 (390) for home, all perfumes, Luxury, Zeta and Malaga (out of stock): no console errors, no horizontal overflow. Extra check at 390/768/1024/1440 on 5 routes: no overflow. Intermediate captures at 1024 are in `captures/phase-03/*-tablet-top.png`.
- Interaction smoke test (Playwright): atlas hover, composer change, add to cart → drawer, Escape closes it, family filter → URL, note search ("vanilie" → 4 in Gourmand), empty state, gallery view from URL, travel toggle updates CTA, time-on-skin phase follows scroll, buy bar appears, notify form error and success, skip link first in tab order, reduced-motion render.
- Mobile PDP (390×664 viewport): format selector and "Adaugă în coș · 690 lei" are visible without scrolling (the audit's main mobile defect).
- Lightweight performance read on `next start`, localhost, no throttling — **not a Lighthouse benchmark**: JS transferred per page 100–350 KB uncompressed including Next's link prefetching, images 11–32 KB on first view (AVIF via `next/image`), fonts 20–66 KB, 37–83 requests per page. Morph's live pages: 230–370 requests (not like-for-like). Mobile home is ≈7,000 px tall (live site ≈12,000).

## Creative director review

1. **Unmistakably Morph?** Mostly. The twisted bottle on its own color, the real notes and Morph's own sensory paragraphs make it specific; a screenshot of the atlas or a PDP could not belong to another house. What still makes it less Morph than it could be: the packshots (soft, low-res, grey halos) and the absence of Naples/Bormioli storytelling beyond one line.
2. **Color distinctive without being decorative?** Yes. Color appears only where a scent (or a group of scents) is, and it always means that scent. The page itself stays paper and ink; even the collection "accent" is its members' chord, not a brand color.
3. **Does Strata add behavior, not noise?** Yes, in two places: time on skin (the column settles as you read) and the composer (overlap = result, tier by tier). No blur or veils remain. The risk is that on mobile the time section is mostly text with color bands; it works, but the strata column only exists on desktop.
4. **Premium with animation disabled?** Yes; checked with reduced motion. Nothing depends on motion to be understood — the composer, strata and fields are static states.
5. **Understand what Morph sells immediately?** On desktop yes: headline, a bottle with name, notes, price, and 26 colors with collection names in the first viewport. On mobile the bottle and caption are in the first viewport after the headline; the atlas sits just below.
6. **Purchase without friction?** Yes: quick add from cards/rows, a PDP CTA above the fold on mobile, a persistent bar, a drawer that confirms. Checkout itself is out of scope.
7. **Layering memorable?** It is now a clear, ownable device (two strata columns becoming a third) and it sells (travel pair). It is not yet a "wow": the result has no name or image of its own, and Morph's own Your Next Form pairs cannot be shown because their contents are blind.
8. **Does the PDP justify a premium journey?** Largely: story in Morph's words, notes over time, classification, trial and layering paths, Certilogo and the boutique near the CTA. Photography is the limit.
9. **Collection efficient?** Yes. The index exposes name, notes, family, longevity, price, stock and travel on one line; search covers every note; preview avoids opening PDPs. On mobile the header + filter bar still push the first row to the bottom of the first viewport.
10. **Still generic:** the filter bar (search + chips) and the footer; the Casa Morph block is text only; the "Cele mai alese" row is a standard product row.
11. **Still over-designed:** the atlas tooltip plus caption double the name; the composer axis labels on desktop repeat what the result list says.
12. **Remove next:** the collections strip under the hero duplicates the atlas group labels (kept for now because it explains the collections in words; remove if the atlas labels get the one-line description).
13. **Push further:** measured colors from the shoot; material close-ups replacing tier color blocks; a finder result page in this system ("your color", why it fits, try/buy/pair); pairing pages and the QR blind reveal for Your Next Form once Morph confirms set contents; a boutique booking entry.

Targeted changes made from this review (not taste): mobile hero reordered so the product is in the first viewport; mobile PDP media shortened, formats compacted and the gift option moved after the CTA to put the CTA above the fold; composer rebuilt from a flat 3×3 color chart into three equal zones with the two bottles; collection label removed from rows on single-collection pages; availability separated from the travel offer in rows; the browser's blue search-clear icon removed (the audit flagged default link blue); single-format PDPs got an explicit price row (Malaga showed no price when out of stock); trial offers on mobile became a swipe row (home 8,000 → 7,000 px).

## Remaining limitations

- Photography: catalog packshots only (see `photography-direction.md`).
- Scent colors are canvas-sampled from those packshots; they need measured values.
- Checkout, account, search results page, finder result, gift hub, pairing pages, blind reveal and Casa Morph pages are not built. The cart is an in-memory mock; the notify form sends nothing.
- Family grouping (5 families) is still our proposal (research 06), to validate with Morph.
- Data contradictions from the audit (concentration %, set counts) remain unresolved; percentages are not shown.
- RO only; no EN.
- No Lighthouse or real-device testing; no screen-reader pass beyond semantic checks.
- Fonts: Schibsted Grotesk is a free stand-in; a licensed face is a production decision.

## Technical risks

- Collection routes are dynamic (for filter URLs); on a static host they need a server or client-side param parsing.
- `mix-blend-mode: multiply` hides the white packshot backgrounds; with cut-outs it becomes unnecessary, without them any non-white background in a new image will show.
- `@property` color interpolation is progressive enhancement (older browsers switch instantly).
- Headless WooCommerce (research 08) would need Store API cart/checkout, points and Certilogo rebuilt; the components here assume a catalog shape close to the Store API but no live integration exists.

## Decisions needed before the next phase

1. Whether the scope of Phase 04 is breadth (finder result, layering hub/pairing pages, Descoperă, Casa Morph, cart states) or production readiness (real checkout path, EN, CMS).
2. A production stack decision (research 08: headless Woo + Next vs custom WordPress theme) — it decides how much of this component layer carries over.
3. Photography: commission the shoot in `photography-direction.md`, or keep packshots for the presentation.
4. Validation with Morph: the 5-family grouping, the identity colors (label band vs juice), whether any pairs can be named as recommended, and Your Next Form contents for a blind reveal.
5. Typeface licensing (keep a free grotesk or license Söhne / Neue Montreal).
6. Presentation format and whether a private preview deploy (e.g. Vercel) is allowed.
