# Phase 05.5 — Creative upgrade plan

Status: strategy only. No code was changed in this phase. This document is the blueprint for the next implementation phase. It builds on `phase-05-design-system.md` (still the source of truth for tokens until Phase A of this plan replaces them). Companion documents: `phase-05-5-awwwards-reference-map.md` (techniques from outside Morph) and `phase-05-5-content-opportunity-map.md` (what Morph already has).

Inputs: research 00–08, design docs Phase 03–05, the Phase 05 captures (`captures/phase-05/`), the app source, the owner's review of Phase 05 in the browser, and a new pass over morphparfum.ro on 2026-09-24 (About, blog, reviews, Body & Bath, newsletter, gifting, media library, Store API). Labels: **[F]** verified fact, **[I]** interpretation, **[R]** recommendation, **[?]** needs verification with Morph.

`phase-05-refinement.md`, listed in the brief, does not exist. Phase 05 is documented in `phase-05-design-system.md`, `phase-05-art-direction-reset.md`, `phase-05-creative-review.md` and `photography-direction.md`.

---

## The idea in one sentence

**One lit room that changes state.** Morph online becomes a single continuous space of matter and light in which the bottle is always the protagonist; navigating, filtering, answering, composing and searching do not load new pages, they relight, restage and recompose the same room.

Phase 05 found the right materials (object, niche, stone, night, walnut, serif names). What it lacks is **continuity, scale contrast and real imagery**: every section is built from the same parts in the same order, pages replace each other instead of transforming, and Morph's own strongest images (the collection campaigns) are not used at all.

---

## 1. Current-state diagnosis

[F] Observed in the Phase 05 build and captures:

- Every section on every page follows the same template: full-bleed `.band` → `t-1` serif title left + muted lede right → content grid. Home has eight such bands in a row. Descoperă, Layering, Casa Morph and the finder use the same head. That structural sameness is what reads as "a sequence of UI modules" and as a repetitive scroll, even though only two elements use `Reveal`.
- The lit niche is the only product device, at every scale. It solved the white-packshot problem, but the result is a grid of identical framed rectangles (home families, Descoperă groups, the boutique wall, vitrines). The object never breaks the frame, overlaps, reflects or changes scale within a composition.
- Product scale tops out at the hero (58vw niche). The low-resolution packshots (768×960 on white) are the ceiling. No image in the concept comes from Morph's campaigns, although the live site has three 1920×1000 collection campaigns and several 2560 px editorial images (content map §1–2).
- There are no page transitions: `next.config.ts` has no view-transition setting and nothing wraps navigation. Home → Parfumuri is a hard cut from a dark hero to a stone page.
- Descoperă is a lens bar + grouped thumbnail grids + preview panel: a well-made tool that reads as a dashboard (owner feedback confirmed).
- Layering is a correct information design (two niches, tiers, a seam) with no sense of making something; the pair appears, nothing happens between the two objects.
- Search and cart are functional, accessible and plain.
- The hero title "Metamorfoză prin parfum." is safe at the captured widths (390, 1024, 1440) but fragile: each line sits in an `overflow: hidden` mask (`HeroCampaign.module.css` `.mask`), "Metamorfoză" is a single unbreakable word, and its size is viewport-based (`clamp(52px, 6vw, 112px)`) while its column is grid-based (5/12 above 1200 px, 5/12 between 900 and 1199 px). Where the word is wider than the column, the mask cuts it instead of letting it overflow. This is the mechanism of the earlier clipping and it can recur at untested widths (≈900–1000 px, ≈1200–1280 px) or with a different font fallback.
- "Casa Morph" is used as the boutique's name in the nav, footer, `BOUTIQUE.name`, the try list ("De încercat în Casa Morph"), the finder result and search. The owner has ruled this out (§6).
- Mobile home is 10,521 px (Phase 05 review), longer than Phase 03.

## 2. What is already working

- **The loader** (headline rise, niche unmask, light coming up, bottle settling). The owner singles it out. It already expresses "metamorphosis as behaviour".
- **The brand turn**: object + matter + light instead of color. Removing `--glow` changes nothing structurally. Keep this test as a gate for every new section.
- **Morph's motto as the hero line** and Morph's own copy used as quotes.
- **Fragrance language**: tiers in time order, families described by their real frequent notes, the finder's per-answer reasons, the layering seam and echoes.
- **The buy path**: format, price and CTA in the first mobile viewport of the PDP; the persistent buy bar; try beside buy everywhere.
- **Truthfulness rules**: visitor pairs labelled as visualisations, no invented services, sold-out stated in text.
- **Accessibility and reduced motion** baseline (smoke test, focus management in search and cart).
- **Data plumbing**: Store API snapshot, finder logic parsed from Morph's script, URL state for filters and pairs.

## 3. What is holding the design back

1. **Structural repetition.** One section anatomy everywhere. Fix by giving each page type 3–4 distinct compositions (§8–13) and banning the title-left/lede-right head outside commerce listings.
2. **No scale contrast.** Everything is medium. Premium editorial work alternates monument (one object, huge), still life (a few objects composed with depth) and index (many, small, strict). Phase 05 has only index and medium.
3. **No continuity between states.** Pages cut; collections swap; answers replace each other. The brand idea (metamorphosis) is exactly the thing the site does not do between pages.
4. **Morph's imagery is missing.** The concept shows packshots only, while Morph owns campaign photography that is surreal, precise and editorial (a panther for Les Exclusifs, bottles bound in red rope for Luxury, gloved lab hands and sand for Ice, a fragmented portrait for Disumano). That is Pomelli's "surreal metamorphosis / scientific precision" in Morph's own pictures.
5. **Flat materials.** One stretched turbulence layer for walnut reads as a photograph of grain, not as a built surface (§21).
6. **Utility-first discovery.** Descoperă and the finder present data correctly but the emotional register is a control panel.
7. **Under-represented Morph assets**: store reviews, Body & Bath, the newsletter, the blog, gifting, the About photography.

## 4. What should be preserved

- The loader choreography (extend it, do not replace it; §20 makes it the first instance of the transition language).
- Tokens: stone / night / walnut tones, metal hairline, the no-gold rule, two type families, `.label` for measured facts only.
- The niche as the **index-scale** product device (cards, rows, cart, search, buy bar). It stops being the only device.
- Finder logic, layering logic and disclaimers, try-list mechanics, cart logic, URL state, `useMotion` / reduced-motion infrastructure, the smoke test.
- The buy-path rules and the "complete without animation" rule.
- Routes, with renames where naming changes (§6).

## 5. What should be redesigned

| Area | From (Phase 05) | To |
|---|---|---|
| Home | eight equal bands | a campaign sequence with three scales and one sticky stage (§8) |
| Featured / most chosen | name list + one niche crossfade | a lookbook: one monument object per spread, asymmetric, travelling horizontally (§8.3) |
| Collections | wood vitrine head + rows | a room that relights per collection with Morph's campaign as its window (§9) |
| PDP | niche gallery + stacked chapters | a stage with reflection and depth, then chapters with distinct anatomies (§10) |
| Descoperă | lens bar + thumbnail groups | editorial family chapters + a notes index (§11) |
| Finder | stacked answers + dimming shelf | one question per scene, the shelf as a lit horizon, result as a portrait (§12) |
| Layering | two niches + tier table | a composition on one glass shelf that unfolds in time (§13) |
| Search, cart | plain overlay and drawer | the room dims; results and cart are small vitrines (§19) |
| Boutique | burgundy art wall with niches | "the shop in Bucharest" as a material room with facts, reviews and a try-in-person path (§18) |
| Materials | one noise layer | panelled walnut, stone, glass shelf, paper, metal as a small procedural system (§21) |

## 6. What should be removed

- **The name "Casa Morph" in every customer-facing place** (nav, footer, `BOUTIQUE.name`, try-list label, finder, search, headings, alt text). [F] On morphparfum.ro the location is referred to as "magazinul din București", "Contact magazin", "Unde ne puteți găsi", "Magazin oficial" and, in Google reviews, "the Morph perfume store in Bucharest". [F] One occurrence of "Program Casa Morph:" exists as an hours label in the live footer; no page, nav item or heading uses it as a name. Following the owner's decision, the redesign does not use it. [R] Customer-facing name: **"Magazinul Morph din București"**, short form **"Magazinul"**; nav item **"Despre Morph"** holding the story, the shop and the journal; route `/magazin` (or `/despre/magazin`) with a redirect from `/casa-morph`. [?] Owner to confirm the exact label.
- The universal section head (title left, muted lede right) outside listings.
- The families index on the home page (moves to Descoperă; home gets one family teaser).
- The lens button row as the entry to Descoperă.
- The "Your Next Form: Limitless, Reckless, …" text line on home (replaced by imagery and one link).
- Outbound links to the live site for gifting (gift card, gift box), sample sets and YNF where the concept can hold the page itself.
- Footer items that are listed but not linked.
- The literal "art wall" metaphor for the boutique (a painted burgundy rectangle standing in for an artwork we cannot show).

## 7. What should be introduced

- **Morph's campaign imagery** as environments: collection campaigns, YNF, workshop, the Luxury flat lay, the Les Exclusifs ribbed-glass still life, the Animal and N8 editorial campaigns (content map §1–2).
- **A persistent stage and a page-transition system** (§20).
- **A material system** built procedurally (§21).
- **Store reviews** as an editorial quote sequence, labelled as reviews of the shop (§17).
- **Body & Bath as the ritual of a scent** (§15).
- **The newsletter as an invitation** (§16).
- **The journal** surfaced as editorial chapters, with Morph-original posts first (§14).
- **An internal gift journey** (§14.3, concept-level).
- **A notes index** (every note in the catalog, linked to its perfumes) as discovery, education and SEO.

---

## 8. Recommended homepage composition

Goal: a fragrance campaign told in six movements, not a router. Mobile target ≤ 8,500 px (currently 10,521). Each movement has its own anatomy; none repeats the head template.

| # | Movement | Composition | Scale | Tone | Motion role |
|---|---|---|---|---|---|
| 1 | **Entrance** | Motto "Metamorfoză prin parfum." + one bottle, larger than now, standing on a glass shelf with its reflection; museum label kept | monument | night | LOAD → ENTRY (kept) |
| 2 | **Trei lumi** | One sticky stage (CSS `position: sticky`, no scroll-jacking) holding Morph's three collection campaigns full-bleed; three short text panels scroll past it; the image under the text changes by crossfade + light sweep as each panel passes the middle; each panel shows collection name, concentration, count, price, 3 bottles as a still life, link | environment + still life | image | SECTION → ENVIRONMENT |
| 3 | **Cele mai alese** | Lookbook (§8.3) | monument | stone ↔ night per spread | PRODUCT → REVEAL |
| 4 | **Forma** | The Luxury flat lay (2560 px, Morph) cropped hard to the twisted glass + the Bormioli line + Naples 2002; one image, one sentence, facts in labels | detail | stone | IMAGE → CROP (slow scale-in once) |
| 5 | **Ritualuri** | A three-column editorial spread: Descoperă (family teaser as a note line and 3 bottles), Layering (YNF campaign image + "Two perfumes, a third form" + link to the composer), Corp (a scent in three textures: perfume, gel, cream; §15) | still life | stone | EDITORIAL → PROGRESSION |
| 6 | **Magazinul** | Walnut room (§21): address, open-now, hours, two store reviews as large quotes, "Încearcă în magazin" + the try-at-home formats as the counterpart | environment | walnut | none beyond tone |
| — | **Jurnal + Scrisoarea** | Two editorial entries (Morph-original posts) + the newsletter invitation (§16) directly above the footer | index | night | none |

Rules:
- The hero title is set so it can never be cut: size bound to the text column (`cqi` container units on the text column, or a `clamp()` whose max is derived from the column width), the reveal mask clips only vertically (`clip-path: inset(0 -1em)` instead of `overflow: hidden`), and a width test for "Metamorfoză" at every 10 px from 320 to 1920 px joins the smoke test. [R]
- Layering's composer no longer lives on the home page; home gives the invitation, the composer is the Layering page's signature.
- Try at home / try in the shop appears once, inside "Magazinul", as a clear pair (§18).

### 8.3 The lookbook (most chosen / featured)

- Source: Morph's bestsellers from the snapshot (as now), 5 perfumes.
- Each spread: one bottle at monument scale on a glass shelf with reflection, off-centre; the name at display size overlapping the stage edge (type behind the object where possible, using a masked second layer of the name); a column with the three tiers as a formula, one Morph copy line, format + price + add, "Descoperă"; the second image of the product (angled or box) small and offset as a counterpoint.
- Desktop: a horizontal track driven by native vertical scroll inside a sticky container **only if** it passes the scroll-jacking test (native scrollbar, keyboard, find-in-page); fallback and default for touch: horizontal scroll-snap with visible arrows and a count ("2 / 5").
- Transition between spreads: the outgoing bottle lowers into its shelf light (opacity + 3% translate + light dim), the incoming one rises as its light comes up. It is the loader's grammar reused at object scale, not a slide.
- Product truth only: no invented "why we love it" copy; lines come from Morph's descriptions.

## 9. Recommended collection experience

`/parfumuri` and `/parfumuri/[colectie]` become one room with four states (all, Les Exclusifs, Luxury, Ice).

- **Head**: a full-bleed campaign band (Morph's campaign for the collection; for "all", the NOTE DE PARFUMURI row of bottles at 2560 px). Over it, bottom-left: collection name, concentration line, count, price. The shelf of bottles sits directly under the band, on a glass edge, with reflections.
- **Switching collection** (tabs under the band): a deliberate 700–900 ms state change:
  1. the campaign image crossfades behind a narrow light band that sweeps across once (a gradient mask moving, not a wipe of color);
  2. the collection title transforms word by word (outgoing words drop into their mask, incoming rise: the loader's headline grammar);
  3. the shelf restages with GSAP Flip: bottles of the leaving collection lower and fade, the arriving ones rise into place, shared bottles (in "all") move rather than re-enter;
  4. the room tone shifts where the collections differ in material (Les Exclusifs: lowest key, night; Luxury: walnut; Ice: stone, cooler key light). The mechanism is **light level and direction plus imagery**, never a hue swap.
- URL changes with `history` so the state is linkable and back works; the listing below updates by Flip (as now).
- **Listing**: the index rows stay the default (fast shopping). The filter bar is rebuilt as a quiet sentence-style control ("Toate · Gourmand · Ambrat · …   Intensitate ▾   Sortare ▾") rather than chips in boxes.
- **Body & Bath** appears as its own room (`/parfumuri/corp`, §15), not as a filter.

## 10. Recommended PDP experience

First viewport (unchanged rule: object, name, format, price, CTA visible on a phone):

- **Stage**: the bottle larger than the current niche allows on desktop (≈78vh), standing on a glass shelf; a soft reflection (mirrored image, masked gradient); key light from behind-above (the Phase 05 niche light, widened into a room); floor shadow. The niche frame disappears at this scale: the object stands in the room. The gallery becomes a sequence of **stage states** (front, angled, box, travel) with a light transition, not a thumbnail carousel.
- Name in the serif, collection · concentration · 100 ml in labels, Morph's one-line descriptor, purchase block as now.

Chapters, each with its own anatomy:
1. **Povestea**: Morph's description as an editorial pull quote, narrow measure, with the note provenance words (Chuao, Avola…) set as the only emphasis.
2. **Pe piele** (time on skin, signature §S3): a vertical sequence opening → heart → base; each tier is a full-height scene with the notes in large type and the stage light lowering and warming; the stated longevity closes it. Material close-ups replace the repeated bottle when the shoot exists.
3. **Ritualul** (only when Morph sells a gel and/or cream of the same scent; 12 perfumes today): the three textures as a still life with prices (§15).
4. **Compune**: the partner picker opens the Layering composer with this perfume in slot A (the composer is no longer embedded in full).
5. **Încearcă**: travel 2×8 ml / sample set, plus "Încearcă în magazin" with open-now.
6. **Din magazin**: one store review, clearly labelled "Recenzie Google a magazinului", never presented as a product review (Morph has 0 product reviews).
7. Same-family objects as a small shelf.

## 11. Recommended discovery experience (`/descopera`)

From an instrument to a guided exhibition.

- **Opening**: one sentence, the finder invitation, and "Explorează după familie · după notă · după moment".
- **Five family chapters** (the 5-family proposal stays a proposal, marked as such):
  - chapter title in the serif at display size; beneath it, the family written in its real frequent notes as a sentence-like line;
  - one representative bottle at monument scale with 2–4 others composed as a still life at different depths (not a grid);
  - the family's real ranges as words: intensity ("de la medie la puternică"), longevity from Morph's data ("6–8 h până la 12 h+"), collections represented, count;
  - the notes line is interactive: hovering or focusing a note lights the bottles that contain it and dims the rest (the finder's light grammar reused); tapping a note opens the notes index filtered to it.
- **Notes index** (`/descopera/note` or a section): every note in the catalog A–Z as a typographic index, each with the perfumes that carry it and in which tier. This is real fragrance education, strong for SEO, and uses Morph's data only.
- **By moment**: season and occasion only where the data discriminates (the Phase 04 review found the season lens weak: 21 of 26 are autumn). [R] Keep occasion out; keep season only as a filter in listings.
- The comparison preview (buy / try / compose) moves into a slide-in panel opened from any bottle, instead of a permanent right column.

## 12. Recommended finder experience

Logic unchanged (Morph's 7 questions and weights, parsed from the live script).

- **One question per scene**: the question in the serif at large size, answers as a typographic list (large tap targets), progress as "3 / 7" in a label.
- **The shelf as a horizon**: the 23 tagged bottles stand in a row along the bottom edge of the viewport. After each answer, bottles that still match stay lit, others dim and lower slightly. On phones the horizon is a band of small objects above the answers.
- **Transition to result**: after the last answer, the horizon collapses to the lit match; that bottle travels (shared element) into the result stage. This is the same transition as card → PDP, so the finder result feels like entering the product, not loading a report.
- **Result as a portrait**: the matched bottle at monument scale; "De ce ți se potrivește" as a museum label with one line per answer (Morph's tags in plain words, ✓ or "nu e etichetat astfel"); the three tiers; intensity and longevity in words; buy and try side by side with prices; the alternative(s) as smaller objects; "Compune cu…" and "Încearcă în magazin". Color is not part of the result.

## 13. Recommended layering experience (signature §S4)

Name: **"Compune"**. Two real bottles, one glass shelf, notes that unfold in time.

- **Staging**: both bottles on one shelf, B slightly behind A on the same axis so the glass overlaps in depth (as in the photography brief); reflections on the shelf overlap too. That overlap of glass and light is the only "mixing" image. No liquid, no color blend.
- **Choosing**: slot A and slot B open a picker shelf (grouped by collection); on desktop a bottle can also be dragged onto the shelf. Changing a bottle: the old one lowers out of the light, the new one rises (loader grammar).
- **Unfolding**: a time axis with three stops, **Deschidere → Inimă → Bază**, operated by scroll within the section or by three tabs (both work; tabs are the accessible primary). At each stop:
  - A's notes enter from the left, B's from the right, in the serif;
  - notes both carry in that tier move to the seam and merge into one word;
  - echoes (same note, different tiers) are drawn as a thin line between the two positions;
  - the stage light lowers and warms from opening to base (as on the PDP).
  Timings are tier order only; no invented minutes. The only time value shown is Morph's stated longevity for each perfume.
- **Reading the result**: "Ce au în comun" as a sentence built from data (shared notes, shared family, intensity pair), then formats: both travels, both bottles, or Morph's own YNF blind sets offered as the curated alternative.
- **Honesty**: the statement that a visitor's pair is a visualisation, not a Morph recommendation, stays on every instance.
- **Your Next Form** page: Morph's campaign images (hands with the box, the box grid, the silhouette with two vials, the workshop blindfold) carry the page; the 12 states as a typographic list with price and stock; the two unlit niches stay as the "blind" device.
- [?] If Morph approves a blind reveal (QR in the box), `/layering/reveal/[set]` reuses the composer with the pair revealed. Not to be built without Morph.

## 14. Recommended editorial strategy

### 14.1 Journal

[F] 45 Romanian posts (2024-11 → 2026-07), mirrored in English. Content map §3 classifies them. [R]

- **Surface on the home page and in context, never as a feed**: two entries on home (Morph-original posts first: Your Next Form, the layering workshop, "Layering parfum: ce este…", "Cum testezi un parfum înainte să îl cumperi"); guides inside the pages they explain (concentration → collection head, how long a perfume lasts → PDP "Pe piele", how to test → try section, layering guides → Layering).
- **Article template**: full-bleed lead image only when it is a Morph image; text column 62–68ch; products mentioned in the article appear as a small shelf in the margin (desktop) or inline (mobile); related notes link into the notes index.
- **Image rule**: many blog lead images appear to be stock or generated (lifestyle couples, candles, gifts, seasonal landscapes) [I, from visual inspection; origin unverified]. They are not used as brand imagery anywhere outside their own article.
- **SEO**: keep every URL; gendered and skin-care posts stay reachable but are not surfaced (as research 06 already recommends).

### 14.2 About / brand story (inside "Despre Morph")

A short editorial sequence with only verified facts and Morph images: Naples 2002 and Andrea Angelino → Italian and French perfumers (About copy) → the Bormioli bottle → the three collections (with their campaigns) → Gate 17 launch 2024 (event photographs, if usage is cleared) → the Bucharest shop. Concentration and collection counts stay out until Morph confirms one figure (research 01 lists the contradictions).

### 14.3 Gifts (concept-level journey, to build later)

Verified building blocks [F]: gift card (online, e-mail, 180 days, no COD; Store API price range 230–1,100 lei; exact denominations [?]); gift box +20 lei (a product in the API); perfume + gel sets 790–870 lei and perfume + cream sets 840–950 lei (cream sets described by Morph as a once-a-year holiday edition, several out of stock); travel 2×8 ml 230 lei; YNF 230 lei; sample sets 260 lei; Discovery Travel 1,250 lei; seasonal campaigns (Naughty or Nice 2025, Valentine's 2026 "Facciamo l'Amore", Summer Duo 2025 gift with purchase, now expired).

Journey [R]:
1. **Do you know what they wear?** Yes → the bottle, or the ritual set of that scent. Not sure → the finder in "for someone else" mode, or a discovery format. Undecided → gift card.
2. **Budget** as real price bands from the catalog (≈230 · ≈700 · ≈850–950 · 1,250 lei).
3. **Presentation**: gift box (+20 lei) staged as an object; gift message only if Morph confirms it exists [?].
4. **Delivery facts** (threshold, timing only as published).
Placement: `/cadouri` stays internal; seasonal campaigns become temporary chapters of that page, not separate microsites.

## 15. Recommended Body & Bath integration

[F] Store API: 8 shower gels (200 ml, 240 lei: Cruda, Disumano, Gate 17, Indomable, N8, Tonkatonic, Vapor, Zeta), 12 body creams (200 ml, 310 or 360 lei), 8 perfume + gel sets, 11 perfume + cream sets; room fragrance (Burlat, Fil Rouge) separately. Morph's own copy links them to the perfume: the gel "reinterpretează semnătura olfactivă a parfumului"; the creams are "perfecte pentru a fi utilizate împreună cu parfumul preferat Morph, accentuând persistența".

[R] The ritual is **the same scent in three textures**: Gel → Cremă → Parfum. This is supported by Morph's copy. Cross-scent body layering (gel of one, perfume of another) is **not** supported and is not suggested.

- **PDP "Ritualul"** chapter for the 12 perfumes that have a body product: three objects as a still life (bottle, cream jar, gel), order of use, prices, the matching set with its saving only if the set price is lower than the sum [F check per set].
- **Corp room** (`/parfumuri/corp`): organised by scent, not by product type; each scent a row with its textures and the set.
- **Home** movement 5 "Ritualuri" gives it one third of a spread.
- **Cart**: when a perfume with a matching cream or gel is in the cart and the order is under the 750 lei threshold, the suggestion may be the same-scent gel (240 lei) as well as the travel size.
- Photography: Morph's cream jar and gel images exist (1024×1280, white or grey). A ritual still life is on the shoot list (§22).

## 16. Recommended newsletter treatment

[F] Live: a dedicated page "Abonare newsletter" and a footer form "Abonează-te la newsletterul MORPH"; promised: "Beneficii exclusive, Produse în trend, Noutăți, Campanii speciale"; GDPR consent sentence; no incentive stated.

[R] **"Scrisoarea Morph"** (working name [?]): an invitation, not a form.
- A night band above the footer with a paper card (procedural paper, §21) lit from above; one serif line, e.g. "Află primul de parfumurile noi, campaniile și beneficiile membrilor." (rephrases the live promise, adds nothing); one e-mail field set as a line, the consent sentence visible under it, "Abonează-te".
- Success state: the card "closes" (a fold, 500 ms) and a confirmation line replaces the field; no confetti.
- No discount or sample incentive unless Morph confirms one [?]. Research 06 suggested one; it remains a question.
- Also offered at the natural moments: finder result ("Primește rezultatul pe e-mail" only if built with real sending; otherwise no), journal articles, the empty cart.

## 17. Recommended reviews treatment

[F] Trustindex Google widget on every live page: "Pe baza a 159 de recenzii", 4-column slider with "Publicat pe Google". Most long reviews praise the shop staff by name (Andreea, Bogdan) and the in-store consultation. They are reviews of the shop, not of products.

[R] **"Din magazin"**:
- One review at a time as a large serif quote (verbatim, never edited or shortened without an ellipsis and a link to the full text), reviewer shown as first name + initial [?], "Recenzie Google", date if available; the aggregate count as a label ("159 de recenzii Google").
- Placement: the shop room (home §8.6 and the shop page), PDP chapter 6 (one), finder result (one about the consultation).
- Carousel behaviour: manual (previous/next buttons + swipe), no autoplay by default, a live region announcing position, `lang="en"` on English reviews. Transition: the quote's lines fade and rise by line (the loader's grammar at text scale), 400 ms.
- Only reviews captured verbatim with their source; content changes over time, so production must read them from the review provider under its terms [?].

## 18. Recommended boutique treatment ("Magazinul Morph din București")

- A walnut room built with the new material system (panelled, lit; §21), not a stretched texture.
- Content: address, open-now + hours (live values), phone, the online-order hours, a map link; two store reviews; the two ways to try, explained as a pair:
  - **Acasă**: travel 2×8 ml, sample sets, Discovery Travel (prices, stock).
  - **În magazin**: smell on skin with the team; the try list you build online, shown on your phone in the shop (a concept feature that needs no Morph service; stated as "listă salvată pe telefonul tău").
  - The live FAQ confirms both: "Le poți testa în magazinul din București sau prin seturi de testare și mini variante travel." [F]
- Photography: the owner's own boutique photographs informed the look but are not cleared for use; the page is designed so a documentary set drops in (§22). Until then, no fake interior.
- No booking or consultation service is claimed until Morph confirms one exists [?].

## 19. Recommended search and cart treatment

**Search (SEARCH → OVERLAY)**
- Entrance: the page behind dims like lights lowering (180 ms), the overlay's panel unmasks from the top edge (320 ms), the input is already focused (synchronous, as now), the placeholder cycles through three real notes once.
- Live results in four groups: Parfumuri (object + name + three notes + price), Note (note → count → perfumes, links to the notes index), Familii, Jurnal. Empty state: popular notes, the three collections as small campaign crops, the finder.
- Selecting a product: shared-element transition of the thumbnail into the PDP stage (§20).
- Close: Escape, the close button or a click outside; the panel lifts out upward, the lights come back up, focus returns to the trigger.

**Cart ("Vitrina ta")**
- Drawer from the right on night; each line is an object on a thin glass shelf line: bottle in a small niche, serif name, format label, quantity as "− 1 +", line price; remove as a text button.
- The threshold as a sentence with a thin metal progress rule ("Mai ai 60 lei până la livrarea gratuită"), then one suggestion (travel or the same-scent gel).
- Gift box toggle (+20 lei, real). Subtotal, checkout (disabled in the concept, labelled).
- Empty state: an unlit niche, "Vitrina ta e goală", three entries (Parfumuri, Descoperă, Încearcă).
- Adding to cart: the product thumbnail travels to the cart count (200–300 ms, transform only) and the count increments; the drawer opens only on first add or explicitly.

## 20. Recommended page-transition system

Principle: **the same world changing state**. The header, the room tone and the object persist; content restages.

| Layer | What happens | Duration | Where |
|---|---|---|---|
| T0 Persistent frame | Header, footer rule and grain never animate out; header tone interpolates to the destination tone | 320 ms | every navigation |
| T1 Relight (default) | Outgoing content dims and lowers 8 px; incoming rises from 8 px as the light comes up | 120 ms out + 280 ms in | any route without a shared object |
| T2 Shared object | The bottle (or box) keeps its identity: `view-transition-name: obj-<slug>` on card, row, search result, finder horizon, lookbook, PDP stage | 450–550 ms | card/row/search/finder → PDP; PDP → collection (back) |
| T3 Shared title | A title that exists on both sides morphs (e.g. home movement 2 collection name → collection page title) | 450 ms | home → collection, collection tabs |
| T4 Room change | When source and destination tones differ, the background transitions through the light level (night → stone rises like lights coming up) rather than a colour cut | 400 ms | home (night) → Parfumuri (stone) |

Home → Parfumuri concretely: the header stays; the hero bottle (T2) moves to its position on the collection shelf if it is there, otherwise T1; the room lightens (T4); the collection title rises (loader grammar).

Implementation [R, spike first in Phase A]:
- Preferred: the View Transitions API for same-document navigations in the App Router. Next.js offers an experimental `viewTransition` flag with React's `<ViewTransition>`; its status in the installed Next 16.3 must be checked before relying on it. Fallback: a small client wrapper that calls `document.startViewTransition()` around `router.push` for internal links.
- Where unsupported: instant navigation (no JS emulation of T2).
- Reduced motion: all layers off; instant swap; focus moves to the new page's `h1`; route change announced.
- Budget: no transition longer than 550 ms; input is never blocked; back/forward restore scroll and play reversed T1.
- Loader: remains a first-visit home entrance (< 1.8 s, skippable by any input, never on repeat visits in the same session). It is T1+T4 at its slowest: the light coming up in the room.

## 21. Recommended material system

Goal: materiality, not photorealism. Every surface is a **built** surface: material + light + edge.

| Material | Construction | Where |
|---|---|---|
| **Walnut** | Panels, not a sheet: vertical panels of 3 widths with 1–2 px shadow gaps (reveals); per panel an anisotropic `feTurbulence` grain (low X frequency, high Y, 3–4 octaves, a different seed per panel) + a slow low-frequency figure layer; a satin finish as a soft specular band where the key light falls; overall light fall-off (radial) and a floor shadow. Pre-rendered once to AVIF tiles at build time (a script generates them), not live filters. | shop room, collection shelves, cart glass shelf underside |
| **Stone** | Warm mineral base, very low-contrast fractal noise, sparse speckle; light fall-off from the top | default reading tone |
| **Night** | Near-black with a directional key light (radial, off-axis) and a faint noise to prevent banding | hero, layering, footer, newsletter |
| **Glass shelf** | A 1 px bright edge, a 6–10 px translucent body gradient, the object's reflection (mirrored image, `mask-image` gradient to 0 at 40%), a contact shadow | every stage, composer, lookbook |
| **Paper** | Fine fibre noise + a 1 px deckle-like edge highlight, slight top light | newsletter card, journal pull quotes |
| **Metal** | Hairline only: 1 px rule with a brushed highlight (a narrow linear gradient) | labels, seams, progress rule |
| **Light** | Tokens, not images: `--key-x`, `--key-y`, `--key-intensity`, `--key-warmth`, registered with `@property` so they interpolate; the scent's `--glow` (14%) mixes into the key only on a product stage | all stages, room changes (§20 T4) |

Rules: textures never animate; only light tokens and transforms animate. Contrast of text on any material is checked against its darkest and lightest point. If a surface reads as "wood wallpaper", reduce contrast and add edges before adding detail. Canvas/WebGL are not needed for any of this; if a later campaign wants real refraction, it is a bounded module.

## 22. Recommended photography strategy

The concept is not blocked on a shoot; Phase B–D run on existing Morph assets (content map). Production quality depends on the shoot below. Detailed specs stay in `photography-direction.md` (still valid: master packshot, sculpture series, close-ups, collections, layering, shop, trial objects).

**Achievable now with Morph's assets** [F sizes]: collection campaigns (3 × 1920×1000), YNF and layering campaign (1920×1353, 1920×1000), workshop (4 × ~1000 px), Luxury flat lay (2560×1707), Les Exclusifs ribbed-glass still life (1200×800 and 400 px), N8 editorial (2560×1440), Animal editorial (2560×1440), the black bottle on white (2560×1707), a row of bottles (2560×1440), Disumano portrait and film (small; film from 2022), Gate 17 launch photographs (15 × 1080×1620, people identifiable), body products (1024×1280), catalog packshots (768×960).

**Requires a shoot**: every monument-scale product stage (packshots are too soft above ≈700 css px), reflections that are photographed rather than simulated, material close-ups for "Pe piele", the ritual still life, the shop interior, the shared-shelf layering image, alpha cut-outs.

| Priority | Shots | Why |
|---|---|---|
| **MUST HAVE** (1–2 days) | Master packshot of all 26 perfumes with alpha, 2800×3500, same light (backlit juice, strip light on the twist); sculpture shot per bottle (raking light on the twist) for the 5 lookbook perfumes + the hero; 3 collection shelves in one room with different light; one layering shelf (two bottles overlapping); the shop interior (documentary, evening light) with consent | Unlocks monument scale, the lookbook, collection rooms, the composer image and a real shop page |
| **NICE TO HAVE** | Opening / heart / base close-ups for the lookbook perfumes; ritual still life (bottle + cream + gel) for the 8 scents with all three; YNF box sequence (closed, half open, vials); travel and sample objects on the same surface; the team at work (consent) | PDP "Pe piele", Ritualul, YNF page, try section |
| **FUTURE** | Close-ups for all 26; a short film loop per collection (5–8 s, no people, light moving over glass); seasonal gift still lifes; ingredient provenance (Chuao cacao, Avola almond) only if Morph has sourcing access | Full catalog parity, campaign refreshes |

## 23. Motion system

Each role has its own signature so the site never repeats one reveal. Durations in ms; easing names from `lib/motion.ts`.

| Role | Signature | Duration / ease | Where |
|---|---|---|---|
| ENTRY (loader) | lines rise in masks, stage unmasks upward, light comes up, object settles | 1,400–1,800 total, `inOut` then `out` | first home visit |
| PRODUCT → REVEAL | object lowers out of its light, next rises into it; reflection follows | 600–700, `out` | lookbook, composer slots, PDP stage states |
| IMAGE → TRANSITION | crossfade under a moving light band (gradient mask) | 700–900, `inOut` | collection campaigns, home "Trei lumi" |
| IMAGE → CROP | a single slow scale from 1.06 to 1 as the image enters, once | 1,200, `out` | Forma, journal lead images |
| SECTION → ENVIRONMENT | tone and key light interpolate at a chapter boundary | 320–400 | header, room changes |
| EDITORIAL → PROGRESSION | text lines rise by line inside masks (vertical clip only) | 500, stagger 60 | display titles, quotes, review quotes |
| FRAGRANCE → TIME | per tier: notes enter, light lowers and warms | 500 per stop | PDP "Pe piele", composer |
| LAYERING → COMPOSITION | A from the left, B from the right, shared notes travel to the seam and merge, echoes draw | 700 per stop | composer |
| SEARCH → OVERLAY | lights dim, panel unmasks from top, groups settle | 180 + 320 + 60 stagger | search |
| FILTER → REFLOW | Flip with object lowering/rising, never scaling text | 450–600 | listings, Descoperă |
| FINDER → NARROW | non-matching objects dim and lower 4 px | 400 | finder horizon |
| PAGE → STATE | §20 T0–T4 | ≤ 550 | navigation |
| CART → PLACE | thumbnail travels to the count | 250 | add to cart |

Rules kept from Phase 05: no scroll-jacking, no blur, no particles, no cursor followers, no parallax on text, no reveal on body copy, complete with motion off. Changed: **scrub is allowed** in exactly two places where scroll is time (PDP "Pe piele" and the composer's time axis), each with a tab equivalent; **sticky stages** are allowed (CSS sticky, native scroll) in home "Trei lumi" and the lookbook.

## 24. Mobile strategy

- Designed, not stacked: every signature has a touch form (lookbook = swipe with snap; composer = two objects side by side, tiers below, tabs for time; collection switch = tabs under the campaign; finder horizon = a band).
- Monument scale on phones = 62–70svh, object whole (never cropped at the cap); names below the stage, not overlapping, below 600 px.
- View transitions on mobile: T1 and T2 only; T4 simplified to the header tone.
- Page length budgets: home ≤ 8,500 px, PDP ≤ 7,000 px, collection first viewport shows the campaign + first shelf row.
- Sticky buy bar and cart count stay; no hover dependency; 44 px targets.
- Test widths: 320, 360, 390, 430, 768, 1024 (and the "Metamorfoză" sweep).

## 25. Performance risks

| Risk | Mitigation |
|---|---|
| Campaign images full-bleed | AVIF via `next/image`, `sizes` per layout, only the first viewport eager; campaigns are 25–55 KB at 1920 px today |
| View Transitions snapshot cost on low-end phones | T2 only for one object; no large blurred layers; disable on `(prefers-reduced-motion)` and on `navigator.connection.saveData` |
| Procedural materials | bake to AVIF tiles at build; no live `feTurbulence` on large areas; no animated filters |
| Sticky stages | fixed-height containers to avoid layout shift; images decoded before reveal (`decode()`) |
| Reflections (duplicated images) | the same image URL (cached), `aria-hidden`, lazy below the fold |
| GSAP scope creep | Flip + core only; ScrollTrigger only if CSS scroll-driven animations or IntersectionObserver cannot serve the two scrub places; lazy-load per route |
| Video (Disumano film) | not autoplayed; poster + click to play; only if rights are cleared |
| Fonts | two families, subset, `font-display: swap`, size-adjusted fallbacks so the hero does not reflow (also protects the "Metamorfoză" width) |

Budget unchanged: LCP < 2.5 s on 4G mobile, CLS < 0.05, INP < 200 ms; add Lighthouse to the QA loop (not run in Phase 05).

## 26. Accessibility risks

- Motion: every transition off under reduced motion; no information conveyed only by motion or light (dimmed = still readable, with a text state such as "nu se potrivește").
- Page transitions: focus to the new `h1`, route announcement, scroll restoration; no trapping during a transition.
- Carousels (lookbook, reviews): no autoplay, pause if any auto-advance is ever added, buttons with names, position in a live region, swipe plus buttons.
- Text on photographs: gradient scrims measured against the brightest image region; never text over faces.
- Sticky stages and horizontal tracks: keyboard reachable, find-in-page works (content present in DOM), no hidden horizontal scroll on the page.
- Composer drag: always optional; slot buttons are the primary control.
- Languages: English review quotes and Morph's English lines marked `lang="en"`.
- Newsletter: labelled field, visible consent, error text tied to the field, success announced.
- Contrast on procedural materials checked at their darkest and lightest pixel.

## 27. Implementation dependencies

- **Owner decisions** (before Phase B): customer-facing shop name and route (§6); permission to use Morph campaign and event photographs in the private concept; whether Gate 17 event photos (identifiable guests) are used at all; newsletter name.
- **Data**: extend the snapshot with Body & Bath, sets, gift card range and gift box (the snapshot holds perfumes, travel, samples and layering only); a `reviews.json` of verbatim public reviews with source and date; a `journal.json` from the WP REST API (title, date, excerpt, lead image, link, category, "Morph-original" flag); an asset manifest (URL, size, provenance, usage status) for every Morph image downloaded into `public/morph/`.
- **Tech spikes (Phase A)**: View Transitions in Next 16.3 App Router (flag status, back/forward, reduced motion); CSS scroll-driven animations support for the two scrub places; baked material tiles (script + visual check).
- **QA**: the smoke test extended with the hero width sweep, transitions under reduced motion, carousel keyboard, and no text clipping at 320–1920 px.
- **Dependencies to add**: none required. GSAP Flip is already in `gsap`. Anything else needs a reason.

---

## Visual grammar for the next iteration

| Dimension | Grammar |
|---|---|
| **Base palette** | Stone `#ebe7e0` (reading), Night `#151210` (campaign, composition), Walnut `#221a14` (shelves, shop). Keep. Add **Bone** (≈`#f3efe8`) only for paper surfaces (newsletter, journal quotes). No brand color, no gold. |
| **Accents** | Metal hairline `#8f877c`. Wine `#4a1822` no longer as a painted wall; kept for at most one material moment in the shop room (e.g. the edge of a panel under light) [?] or dropped. The scent's `--glow` stays at 14% inside product light only. |
| **Material palette** | Walnut (panelled), stone, glass shelf, paper, brushed metal hairline (§21). |
| **Light behaviour** | One key light per scene, from behind-above the object; rooms get lighter or darker, never recoloured; state changes are light changes (dim, lower, warm, come up). |
| **Image behaviour** | Morph campaigns are environments (full-bleed, one at a time, text on scrims only in dark regions); packshots are objects (never full-bleed, always standing on a shelf); stock-looking blog images are never used as brand imagery. No recolouring, duotone or retouching of Morph images. |
| **Typography** | Serif only for names, chapter titles, quotes and notes at scale; grotesk for everything read, compared or clicked; labels for measured facts. More contrast than Phase 05: display names larger (up to 160 px), body unchanged, labels unchanged. Italic of the serif marks the current choice. A licensed display serif remains a production decision. |
| **Product scale** | Three scales per page type at most: monument (one object, 62–80vh), still life (2–5 objects at different depths and heights on one shelf), index (strict rows and thumbnails). Never two monuments in one viewport. |
| **Environmental transitions** | Between chapters and pages: light level and key position interpolate; campaign environments crossfade under a light band. |
| **Editorial composition** | Asymmetric splits (7/4, 5/5/2, 4/8) kept; add overlap (name behind or over the stage edge), off-grid objects, full-bleed environment bands, and one sticky stage per long page. Vary section anatomy: no two consecutive sections share a layout. |
| **Motion principles** | Motion is a change of light or of place, never decoration; each role has one signature (§23); everything finishes under 900 ms except the loader; the site is complete without it. |

Guardrails against the failure modes named in the brief: generic luxury (avoid black + gold, centered bottles on black everywhere; use stone and walnut and daylight-like reading rooms), dark-theme cliché (night is used for three chapter types only), excessive serif (no serif UI, no serif body), sterile minimalism (materials with edges, Morph's surreal campaigns), over-experimentation (one signature per page type; commerce stays conventional).

---

## Signature experiences

| # | Experience | User purpose | Emotional effect | Morph relevance | Complexity | Performance risk |
|---|---|---|---|---|---|---|
| **S1** | **The light comes up** (loader → every page change): entry and the T1/T4 relight | orientation: "I am in the same place, now showing something else" | calm continuity, a room that responds | "Metamorfoză prin parfum" as behaviour; the boutique's warm dramatic light | medium (loader exists; transitions need the spike) | low–medium (View Transition snapshots on low-end) |
| **S2** | **The object keeps its identity** (T2): bottle from card / search / finder / lookbook into the PDP stage | know that what I tapped is what I am now looking at; less disorientation | desire: the object comes closer | the bottle is the protagonist; the twisted Bormioli form | medium–high (naming, image sizes, fallbacks) | medium |
| **S3** | **Scent in time** (PDP "Pe piele"): tiers as scenes, light lowering from opening to base, ending on Morph's longevity | understand how a perfume changes before buying it blind | anticipation, sensuality | high concentration and longevity are Morph claims; tiers are Morph data | medium (exists in basic form) | low |
| **S4** | **Compune** (layering on one glass shelf): two bottles overlap in depth; notes unfold tier by tier and merge on the seam | learn how two perfumes combine; choose a pair and how to try it | making something; curiosity | Your Next Form, "Identity, layer by layer", 12 real blind sets | high | medium (many text nodes animating; keep to transforms/opacity) |
| **S5** | **The room relights per collection** (Parfumuri): Morph campaign environment, title transformation, shelf restage | understand how Les Exclusifs, Luxury and Ice differ before scanning 26 names | a change of place inside one house | Morph's three real campaigns; concentration tiers | medium | low–medium (image decode; Flip) |

Search and the finder's horizon reuse S1/S2 grammar; they are not separate signatures.

---

## Implementation roadmap

### Phase A — Creative system
- **Dependencies**: owner decisions on naming and image use; asset manifest; spikes (View Transitions in Next 16.3, scroll-driven CSS, baked materials).
- **Expected output**: updated design-system document (tokens for light, materials, scales, motion roles); material tiles script; transition wrapper with T0/T1/T2 working on two routes; the naming change applied (nav, footer, `BOUTIQUE`, try list, search, finder) with a `/casa-morph` redirect; hero title fix + width sweep in the smoke test; Morph campaign assets downloaded with provenance.
- **Risks**: View Transitions integration in the App Router may be experimental; material tiles can look fake (review at 1:1 on real screens).
- **Not yet**: new pages, the lookbook, the composer rebuild.

### Phase B — Homepage and core commerce
- **Dependencies**: Phase A.
- **Expected output**: home in six movements (§8) with the lookbook; collection room with campaign environments and the collection switch (§9); PDP stage and chapters incl. Ritualul (§10); search and cart redesign (§19); T2 on card/row/search → PDP; Body & Bath room (§15).
- **Risks**: packshot softness at monument scale (cap sizes; flag in review); home length; transition bugs on back navigation.
- **Not yet**: Descoperă, finder, composer rebuild; journal pages; gifting rebuild.

### Phase C — Discovery, finder, layering
- **Dependencies**: Phase B stage and transition components.
- **Expected output**: Descoperă as family chapters + notes index (§11); finder scenes, horizon and result portrait with the horizon → result transition (§12); Compune on one shelf with the time axis (§13); YNF page with Morph campaign imagery.
- **Risks**: the composer's animation density on mobile; the notes index quality depends on note normalisation (duplicates, spelling variants in Morph data).
- **Not yet**: blind reveal (needs Morph), any free-text or AI finder.

### Phase D — Editorial, Body & Bath depth, newsletter, reviews
- **Dependencies**: `journal.json`, `reviews.json`, snapshot extension; owner decision on event photos.
- **Expected output**: journal template + contextual placements (§14.1); "Despre Morph" story (§14.2); reviews "Din magazin" (§17); newsletter invitation (§16); gift journey (§14.3); shop page rebuilt (§18).
- **Risks**: image rights; review content drift; stock-looking blog images creeping into brand surfaces.
- **Not yet**: real e-mail sending, real review API, gift message (until verified).

### Phase E — Polish, transitions, visual QA
- **Dependencies**: all above.
- **Expected output**: T3/T4 transitions; motion timing pass against §23; captures at 320–1920 px; Lighthouse (mobile) and a screen-reader pass; reduced-motion walkthrough; a creative-director review like Phase 05's; updated `photography-direction.md` with the final shot list.
- **Risks**: polish time consumed by transition edge cases; regressions in the buy path.
- **Not yet**: production platform work (research 08 decisions remain with Morph).

---

## Unresolved questions

1. Customer-facing name for the shop ("Magazinul Morph din București"?) and the nav label ("Despre Morph"?). The live footer's single "Program Casa Morph:" label conflicts with the owner's statement; the owner's decision applies.
2. May the concept use Morph's campaign and event photographs (Gate 17 launch shows identifiable guests)? Private proposal use only, as with packshots so far.
3. Is there a newsletter incentive, a gift-message option, or a consultation/booking service? Not found on the live site; not designed until confirmed.
4. Gift card denominations (the API gives a 230–1,100 lei range only).
5. Which reviews may be quoted, and should reviewer names be shown in full, as initials or not at all?
6. Is the Disumano film (2022) still in use and cleared?
7. Morph's single figure for concentration and collection sizes (still contradictory; research 01).
8. Whether the 5-family grouping may be presented as Morph's (it is our proposal).
9. View Transitions: acceptable to ship T2 only where supported (Chromium, Safari) with instant fallback elsewhere?
10. Timing and budget for the MUST HAVE shoot; without it the lookbook and PDP stages stay capped at packshot resolution.
