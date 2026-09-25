# Phase C4.2a — Physical store and store reviews: research plan

Date: 2026-09-25. Research and documentation only. No UI, code, asset, navigation or page was changed. Base: `main` at `f9543aa` (the skill import after `aee9fa0`, C4.1c).

Labels used below:
- **[M]** a direct Morph statement, on morphparfum.ro or in Morph's own Google listing data;
- **[T]** a third-party claim (Google Maps as a platform, Trustindex, aggregators);
- **[P]** a design proposal from this concept;
- **[I]** an inference from the evidence;
- **[?]** unresolved.

## 1. Sources checked and method

All checks on 2026-09-25, from this environment. HTML was fetched with `curl` and parsed as text. Google Maps needs JavaScript, so it was rendered in headless Chromium with the project skill `site-capture` (desktop and mobile). Images were viewed as contact sheets in the scratchpad and never committed.

| Source | What was read | Result |
|---|---|---|
| https://morphparfum.ro/ (home) | Footer, FAQ, Trustindex widget (raw HTML: `data-time`, stars, review text) | Hours, phones, e-mail, FAQ line on trying, 8 widget reviews |
| https://morphparfum.ro/contact | Page text, links, the map `iframe` | Address with sector, support phone, Morph's own Google Maps link |
| https://morphparfum.ro/despre-noi | Text and images | No store description; the image gallery is the Gate 17 launch (§4) |
| `wp-json/wp/v2/media?search=` | `magazin`, `showroom`, `lahovari`, `boutique`, `interior`, `parfumerie`, `vitrina`, `casa-morph`, `store` | No image of the store (interior or exterior) |
| `wp-json/wp/v2/posts?search=` | `Lahovari`, `magazinul din`, `testezi`, `showroom`, `în magazin` | 13 posts, read for statements about the shop and trying (§2.4) |
| `wp-json/wc/store/v1/products` (3 pages) and `/products/reviews` | `review_count`, `average_rating` | 105 products, 0 reviews, empty reviews endpoint |
| https://maps.app.goo.gl/BtVSJc4s7KvkUQh57 (linked from Morph's Contact page) | 302 target, then the rendered place page | Place "Morph Parfum Romania", rating, count, 3 visible reviews, cover photo |
| Instagram `@morphparfumromania` | Profile HTML | HTTP 429; not rechecked (C4.0 already records the login wall) |
| Facebook `morphromania`, Yably, Cylex | Facebook HTML (no usable text); Yably HTTP 403; Cylex only as a search result | Not used. A search snippet cites Yably at "4.34/5, 173 reviews from 2 sources" [T]; it mixes sources and could not be opened |
| Repository | `app/magazin/*`, `lib/catalog.ts` (`BOUTIQUE`), `components/OpenNow.tsx`, `lib/nav.ts`, `components/Footer.tsx`, links to `/magazin`; `01-morph-audit.md` §18; `phase-04-journey-expansion.md` §5; `phase-05-art-direction-reset.md`; `phase-05-5-content-opportunity-map.md` §9; `photography-direction.md`; C4.0 archive; C4.1a–c documents; `data/assets.json` | §3 |

Skills used: `site-capture` (Google Maps render and image contact sheets); `ui-ux-pro-max` in `--domain ux` (queries for reviews/testimonials, store locator, opening hours, trust and quote returned **no database match**; the only relevant hit was "load third-party scripts async", which argues against embedding the Trustindex or Maps widget); `impeccable` critique, lenses only (design specificity, cognitive load, peak-end), applied to the code and the C3.5.1 captures. The full `impeccable` critique (browser pass, detector) needs a running build and belongs to C4.2b. `humanizer` and `stop-slop` run only when invoked; they were not needed for a research document.

Not repeated: the C4.0 crawl (campaign calendar, Instagram index, media batches).

## 2. Verified store facts

### 2.1 Address, hours, contact

| Item | Value | Source (checked 2026-09-25) | Label |
|---|---|---|---|
| Address | "Piața Alexandru Lahovari nr. 5, București" | Footer on every page, e.g. https://morphparfum.ro/ | [M] |
| Address with sector | "Piața Alexandru Lahovari nr 5, Sector 1, București" ("Unde ne puteți găsi") | https://morphparfum.ro/contact | [M] |
| Postal code | "Piața Alexandru Lahovari 5, 010464 București" | Google Maps place (below) | [T] Google only; Morph does not publish it |
| Shop hours | "L – V 12:00 – 20:00", "S – D 10:00 – 18:00", under the label "Program Casa Morph:" | Footer, home and Contact | [M] Matches the concept's `BOUTIQUE.open`. Google showed "Closed · Opens 10 AM Sat" when rendered on Friday evening, which is consistent with it [T]. The full Google week was not expanded |
| Holiday hours | none published | Footer, Contact | [?] |
| Shop phone | "Contact magazin 0733 400 949" | Footer | [M]; the same number is on the Google listing ("+40 733 400 949") [T] |
| Online orders / support | "Comenzi Online 0799 400 949"; Contact page: "Asistență clienți +40 799.400.949" | Footer, Contact | [M] |
| Online-order hours | "L – V 09:00 – 17:00", "S – D Închis" | Footer | [M] The concept shows only L–V |
| E-mail | info@morphparfum.ro | Footer, Contact | [M] |
| Map link | https://maps.app.goo.gl/BtVSJc4s7KvkUQh57 → Google place "Morph Parfum Romania", 44.4451575, 26.1000789 (place id `0x40b1ff4e7fb0fc33:0x619c8f68fd43f65b`) | Contact page link | [M] link chosen by Morph. The Contact page also embeds a Maps `iframe` behind a cookie-consent blocker |
| Google category | "Perfume store" | Google Maps | [T] |
| Directions (transit, parking, access) | none published | Contact, footer, blog | [?] The rendered map shows the Piața Romană metro station nearby [T]; no walking distance or access notes are stated anywhere |
| Social | Instagram `@morphparfumromania`, TikTok `@morphparfumro`, YouTube `@MorphParfumRomania`, Facebook `morphromania` | Contact page links | [M] |

The Instagram bio hours ("L-V: 12-20, S-D: 10-18", C4.0) match but could not be rechecked today (HTTP 429).

Naming: the live site's customer-facing names are "Contact magazin", "magazinul din București" (FAQ) and "Unde ne puteți găsi"; "Casa Morph" survives only as the footer hours label. The owner's ruling ("Magazinul Morph din București", nav "Magazinul") stands.

### 2.2 Ways to try, in Morph's words

| Statement | Source | Label |
|---|---|---|
| "Pot testa parfumurile Morph înainte să cumpăr? Da. Le poți testa în magazinul din București sau prin seturi de testare și mini variante travel. Testarea pe piele este cea mai corectă metodă de alegere." | Home FAQ, https://morphparfum.ro/ | [M] |
| "În aceste locații, clienții beneficiază de expertiza consultanților, care îi ajută să descopere aromele potrivite…" (the list begins with "Morph Parfum România – Piața Alexandru Lahovari, Nr.5.") | Post 17055, https://morphparfum.ro/concentratie-de-parfum-diferentele-dintre-parfum-eau-de-parfum-si-eau-de-toilette (published 2024-11-11, modified 2025-05-27) | [M], but it covers all listed stockists and is 16 months old. It supports "advice from the team", not a named service |
| "Testează maximum 2–3 parfumuri pe sesiune. Începe pe blotter ca să filtrezi rapid, apoi pune doar 1–2 pe piele. Nu freca încheieturile. Nu decide în primele 5 minute. Așteaptă 20–30 de minute pentru inimă și câteva ore pentru baza reală." | Post 40845, https://morphparfum.ro/cum-testezi-un-parfum-inainte-sa-il-cumperi (2025-12-27) | [M]. The post still contains an unedited drafting note ("Dacă vrei, aici poți adăuga și un mini-scenariu de purtare…"), so quote only the summary line above and link to the article |
| In-store seasonal offers (prosecco 1–24 Dec 2025; Valentine's sets "online și în magazin" until 24 Feb 2026) | Posts 40205, 41191 | [M], expired. Evidence that the shop is part of campaigns (C4.0 §5), not current offers |

Not published by Morph, so not stated by the concept: booking, appointments or consultations as a service, events at the shop, workshops at the shop (the layering workshop's venue is unstated, C4.1a), staff names, in-store stock per product, tester availability per product, parking, accessibility.

### 2.3 Product reviews

Store API, 2026-09-25: 105 products, `review_count` 0 on all of them, no `average_rating`, and `/wc/store/v1/products/reviews` returns `[]`. This confirms the 2026-09-24 audit. **There are no product reviews to show.** Store reviews (§5) are about the shop's Google listing and must never be presented on a PDP as reviews of that product.

## 3. Current `/magazin` audit

Built in Phase 04 (as Casa Morph), renamed in Phase A, arrival motion in C3.5.1, the story link in C4.1c. File: `app/magazin/page.tsx` (127 lines), `magazin.module.css`; facts in `lib/catalog.ts` `BOUTIQUE`.

Current sequence: walnut room (h1, lede, burgundy art wall with three lit niches, address, open now, hours, "Deschide în hărți", "Sună la magazin", online orders and e-mail) → "De ce să vii" (four reasons) → "Selecția ta" (the try list) → Certilogo (four steps) → "Morph, din Napoli" (dark band, link to `/despre-noi`).

What works:
- The arrival is the page's one authored moment: the room lights up from dark, then the three niches (C3.5.1). It is specific to Morph (walnut, a burgundy wall, the product in light) and not a generic contact page.
- Practical facts are in the first viewport at 1440 px: address, open-now line, hours, two actions.
- The try list is the only real digital → physical bridge in the concept, and it is honest ("rămâne doar în acest browser").
- No booking, events, staff names or invented services.

What is incomplete or wrong:
1. **Stale review count.** Reason 02 says "Recenziile Google ale magazinului (159 la momentul auditului)". 159 is the Trustindex widget's frozen header; the Google listing shows **223** (§5). The sentence "vorbesc mai ales despre oamenii din magazin" rests on the curated widget; Google's topic chips for all reviews lead with the perfumes ("persistent perfumes 9", "olfactory masterpiece 5", "personalized perfumes 3").
2. **Map link.** `BOUTIQUE.maps` is a generic Google search URL. Morph publishes its own place link (§2.1).
3. **Unverified implication of stock.** Reason 03 "Toate cele trei colecții … 26 de parfumuri" reads as "all of these are in the shop". In-store stock is not published (Phase 04 already listed it as unverified). The PDP line "Îl poți încerca în magazinul Morph" (`app/[slug]/page.tsx:83`) has the same issue per product, including out-of-stock ones; Morph's FAQ states it only for the range in general.
4. **Hours defined twice.** The page hard-codes "12:00–20:00" and "10:00–18:00" instead of reading `BOUTIQUE`; the home movement reads `BOUTIQUE.hours`. One source would prevent drift.
5. **Missing facts.** No "Sector 1"; the online-order line omits "S–D Închis"; the two phones are not labelled with Morph's own labels ("Contact magazin", "Comenzi online / asistență clienți").
6. **Trying is described in the concept's words only.** Reason 01 ("Pe piele, în timp") paraphrases; Morph's own FAQ line and its testing method (§2.2) are stronger and quotable.
7. **The room has no evidence of the real room.** The art wall is a digital interpretation (Phase 05 §"How the boutique shaped the system"); nothing tells the visitor what they will find. This is correct given the rights situation (§4), but it is the page's main gap.
8. **Reading order.** Certilogo (a purchase-trust topic) sits between "Selecția ta" and the story. It belongs to the brand's trust layer (footer "Ajutor", nav), not the visit. On a phone the page runs arrival → 4 reasons → list → 4 steps → story: two four-item lists back to back (the `impeccable` cognitive-load lens flags repeated same-shape lists; each list is within 4 items, so this is minor).

Links into `/magazin` (all via `BOUTIQUE.href`): header nav (Magazinul group, with `/magazin#certilogo`), footer ("Magazinul din București", "Verificare Certilogo"), home movement 6, PDP assurance line, finder result, `/descopera`, `/layering` composer, `/layering/your-next-form`, `/despre-noi` ("Vizitează magazinul", C4.1c), search overlay. `/jurnal` and `/despre-noi` breadcrumbs go through "Magazinul". `#certilogo` has two inbound links and must survive any restructuring; `#povestea` has none left (C4.1c) but is kept.

## 4. Boutique image inventory

| Candidate | Where | Subject | People | Provenance / permission | Decision |
|---|---|---|---|---|---|
| Store interior or façade on morphparfum.ro | Media library, 9 searches (§1) | — | — | none found | **None exists in Morph's published media** |
| Gate 17 launch gallery `2025/03/1-2.avif` … `15.avif`, `Despre-noi-Lansare-Morph-Gate-17(-2).avif` | Despre noi | Event build: black wall with a sculpted M, "Do you want to turn heads?" wall, tasting table, dinner table | identifiable guests (portraits) | `pending` in `data/assets.json`; venue unstated. Concrete ceiling and pink floor; nothing ties it to Lahovari 5 | **Exclude** from `/magazin` (not the store, and people) |
| Workshop `workshop-3`, `workshop-4` | Blog post 43904 | Hands, cards, the YNF box | hands only | `concept`; venue unstated | **Exclude** from `/magazin`: using them there would imply the workshop took place in the shop |
| `2025/12/Cum-testezi-un-parfum-inainte-sa-il-cumperi.avif` | Blog lead (post 40845) | A hand sprays perfume onto a wrist, dark background | anonymous hands | Unknown; the bottle is not clearly Morph and the image may be stock | **Exclude** (verify provenance if ever wanted) |
| `2025/12/Naughty-or-Nice-Morpph-Parfum-ro.avif` | Blog lead (post 40205) | A cat and gingerbread, "Naughty" / "Nice" | none | Morph campaign art | Not the store; exclude |
| Google Maps place photos ("21 Photos"); the cover shows the shop window at night with fairy lights, a chandelier inside and "Naughty or Nice" lettering on the glass | Google Maps | Façade, interior | unknown in the other 20 | Uploader not identified (owner or public); Google content | **Reference only**: evidence of the window and chandelier for the owner's brief, never reproduced |
| `@morphparfumromania` Instagram | Instagram | Likely shop imagery (C4.0 §6) | unknown | Not accessible from this environment | **Owner review** (manual, logged in) |
| Owner's own photographs from the visit that shaped Phase 05 | Owner | Walnut displays, lit niches, burgundy wall with the M, counter (as described in `phase-05-art-direction-reset.md`) | [?] | Owner's; Morph's consent needed for the interior and any staff | **Ask** (§9) |
| Concept materials and packshots (walnut, grain, `Stage`, niches) | Repository | Digital room | none | Morph packshots already in use | **Use** (current approach) |

Conclusion: C4.2b cannot show the real store. The walnut room stays a digital interpretation, and the page should say so implicitly by not captioning anything as "the shop". `photography-direction.md` already specifies the documentary brief (displays, niches, glass, burgundy wall, counter, evening light; team only with consent) for when photographs exist.

## 5. Store reviews: evidence and decision

### 5.1 The two surfaces

**Trustindex widget on morphparfum.ro** [T, published by Morph on its own site]
- Header: "Părerea clienților", "BUN", "Pe baza a 159 de recenzii", 4½ stars drawn (4 full, 1 half). No numeric rating in the markup.
- 8 reviews, all 5 stars, dated 2025-08-20 to 2025-09-24 (`data-time`). Every item has the same placeholder `data-id` (`cfcd2084…`, the MD5 of "0") and no link to the review. Profile photos load from `lh3.googleusercontent.com`.
- [I] The newest review is exactly one year old and the count (159) is below Google's current 223: the widget looks like a snapshot from late September 2025 that is no longer syncing. Whether Morph filters it to 5-star reviews is not visible [?].

**Google Maps place** (Morph's own link) [T]
- "4.5 (223)", "Perfume store", rendered 2026-09-25.
- Topic chips: "persistent perfumes 9", "olfactory masterpiece 5", "personalized perfumes 3", "women's perfumes 2", "+6".
- Visible without sign-in: 3 reviews ("More reviews (220)" requires interaction). The page rendered in English with "Translated by Google" markers, so the review texts seen may be translations.
- No per-review URL is exposed in either surface. A share link per review exists only through Google's UI and was not generated.

### 5.2 Candidate reviews

| # | Author as shown | Date | Surface | Wording (verbatim, as shown) | About the store experience? | Concerns | Decision |
|---|---|---|---|---|---|---|---|
| R1 | Irina Pietroc | 2025-09-10 | widget | "Dacă nu era Andreea care a avut toată răbdarea cu mine, nu aveam acum în sfârșit parfumul cu care ma identific așa de bine. Mulțumesc mult. Recomand mai ales experiența în magazin. Mulțumesc mult Andreea!" | yes | a private person's full name; a staff first name; not re-found on Google | **Verify** (only the fragment "Recomand mai ales experiența în magazin.", with owner approval on attribution) |
| R2 | Catrina Elena | 2025-08-20 | widget | "o experiență deosebită de fiecare dată când vizitez magazinul! recomand ❤️" | yes | full name; lowercase and emoji would be reproduced or edited | **Verify** |
| R3 | Gabriela Stanciu | 2025-09-20 | widget | Two paragraphs: the perfumes ("miros excelent, persistent…") and "Mulțumesc personalului din magazin, în special lui Bogdan…" | mixed | staff name; product praise mixed in | **Exclude** as a quote |
| R4 | Denis-Florian Lixandru | 2025-09-02 (widget); "a year ago" (Google) | both | "I had the absolute pleasure of being assisted by Andreea at the Morph perfume store in Bucharest… personalized counseling in choosing my next signature scent…"; compares it with "Skins" in Belgium | yes | staff name throughout; names another retailer; English | **Exclude** as a quote; it is the best evidence that the in-store advice is personal |
| R5 | Teona Delia Lupu | 2025-08-30 | widget | "Domnisoare foarte amabile! Recomand! L.E. ii multumesc domnisoarei Andreea…" | yes | staff name; no diacritics | **Exclude** |
| R6 | Florin Pop | "3 weeks ago", marked NEW (≈ early Sept 2026) | Google | "Exceptional experience every time I visited the Morph store. The services were premium quality and I got a lot of guidance for choosing the right perfume…" | yes | probably a Google translation of a Romanian original that was not captured; full name | **Verify** (capture the original text and a share link first; never quote a machine translation as the author's words) |
| R7 | Faisal Khan | "Edited 2 years ago" | Google | Zeta bought January 2023 "lost its original scent… indicating that it was a fake perfume"; the owner replied | product / authenticity, negative | — | **Not quoted**; counted in the 4.5 aggregate. Selecting only positive quotes while showing an aggregate is acceptable only if the aggregate is also shown and linked |
| — | Muhammad Usman Aslam, Irinel Nita, Simona Marin | 2025-09 | widget | product praise, "Recomand!", "Super" | no / no content | — | **Exclude** |

Of the 10 distinct reviews read, 6 mention the in-store experience or advice (R1–R6), 4 of them naming a staff member. That supports a sentence like "clienții scriu despre sfaturile primite în magazin", not "mostly".

### 5.3 Decision

| Treatment | Decision | Reason |
|---|---|---|
| Link to the Google listing ("Recenziile magazinului pe Google", Morph's own Maps link) | **Use** in C4.2b | Verifiable, always current, no reproduction of anyone's words |
| One summary sentence written by the concept, labelled as a summary: the reviews talk about advice in choosing the perfume | **Use** | Supported by §5.2 without naming anyone |
| Aggregate "4,5 din 5 · 223 de recenzii pe Google" | **Verify**: show only with a visible date ("la 25 septembrie 2026") and the link, and re-read at build time; otherwise omit | A third-party figure that changes; a static concept would go stale, as 159 did |
| "159 de recenzii" | **Exclude** (remove from `/magazin`) | Stale widget figure |
| Verbatim quotes R1, R2, R6 | **Verify**: owner decides; R6 needs its original text | Private individuals' names and words reproduced outside the platform |
| Any quote naming staff (R3, R4, R5), product-only reviews, star widgets, embedded Trustindex or Maps scripts | **Exclude** | Staff names were ruled out in Phase 04; product ≠ store; third-party scripts and cookies |
| Store reviews on PDPs or presented as product ratings | **Exclude** | 0 product reviews (§2.3) |

## 6. Proposed `/magazin` structure and content [P]

The page stays one walnut room that you enter, then read. Order follows a visit: arrive, look, plan, try, leave with something. No photographs, no map embed, no testimonials carousel.

1. **Sosirea** (walnut, `data-enter="shop"`, unchanged motion). h1 "Magazinul Morph"; the lede in the concept's voice, trimmed of claims ("Magazinul oficial Morph din București." + one sentence on trying on skin). Address in display type with "Sector 1". Open-now line. Actions: "Deschide în hărți" (Morph's Maps link), "Sună la magazin". The art wall keeps its three niches.
2. **Vizita** (the practical block, still in the room or directly below it on stone): a definition list with Morph's labels:
   - Program magazin: L–V 12:00–20:00, S–D 10:00–18:00, with a micro-note "Programul publicat de Morph. Pentru sărbători, sună înainte." [P: the advice is the concept's; Morph publishes no holiday hours]
   - Contact magazin: 0733 400 949
   - Comenzi online și asistență: 0799 400 949, L–V 09:00–17:00, S–D închis
   - E-mail: info@morphparfum.ro
   - No transit or parking text until Morph states it.
3. **Cum încerci** (stone, the page's reading chapter): Morph's FAQ line verbatim, attributed ("Morph, Întrebări frecvente"); then Morph's method as three short steps drawn from post 40845 (2–3 parfumuri pe vizită; blotter, apoi pe piele 1–2; așteaptă 20–30 de minute pentru inimă, câteva ore pentru bază) with "Citește ghidul Morph" linking to the article. The existing tier language (Deschidere / Inimă / Bază) makes the waiting visible: a quiet three-step rule, not an animation. This replaces reasons 01 and 04.
4. **Selecția ta** (unchanged component): the try list, now framed as "what to bring" after the method. Beside it, the at-home alternative in one line → `/descopera#incearca` (seturi de testare, travel), which is Morph's second path in the same FAQ answer.
5. **Din recenzii** (optional, a single line on stone, not a section with cards): the summary sentence + "Recenziile magazinului pe Google ↗". The aggregate only if approved (§5.3).
6. **Certilogo** (kept, anchor `#certilogo` unchanged), moved after the visit content; shortened visually, same four Morph steps.
7. **Morph, din Napoli** (kept, link to `/despre-noi`).

Removed: reason 02 (stale count), reason 03 (implied stock). The collection links move to the art wall labels, which already link to each collection without claiming stock.

## 7. Rights and attribution questions

1. **Reviewer names and words.** Google reviews belong to their authors and are displayed under Google's terms. Morph republishes them through Trustindex on its own site; the concept reusing them is a separate use. Options: no quotes (recommended default), quotes with the name as displayed on Google, quotes with initials (this alters the attribution the author chose).
2. **Staff first names** (Andreea, Bogdan) appear in most useful reviews. They are private employees; the concept does not publish them.
3. **Machine translations.** Google may show a translated text; only an original may be quoted.
4. **Store photographs.** None are published by Morph. Owner photographs of the interior need Morph's consent; any staff member in frame needs theirs. Google Maps photos are excluded regardless of uploader.
5. **Aggregate rating.** A third-party figure; if shown, it is dated and linked, and never marked up as structured data (`AggregateRating`) for the store in the concept.
6. **Blog quotations.** Post 40845 is Morph's text; short quotes with a link follow the C4.1b rule (fragments, attributed, link to the original).

## 8. Exact C4.2b implementation scope [P]

Smallest change set, all on existing components:

1. `lib/catalog.ts` `BOUTIQUE`: `maps` → `https://maps.app.goo.gl/BtVSJc4s7KvkUQh57`; add `district: 'Sector 1'`; `onlineOrders.hours` → `'L–V 09:00–17:00, S–D închis'`; add `reviews` (the same Maps link) and, only if approved, `rating: { value, count, checked: '2026-09-25' }`.
2. `app/magazin/page.tsx`:
   - hours read from `BOUTIQUE` (no hard-coded strings); labels "Contact magazin" / "Comenzi online și asistență";
   - replace "De ce să vii" with "Cum încerci" (FAQ quote, three-step Morph method, article link);
   - "Selecția ta" + one line to `/descopera#incearca`;
   - the review line (§6.5);
   - Certilogo after the visit content, `id="certilogo"` unchanged; story band unchanged.
3. `app/[slug]/page.tsx:83`: soften to Morph's general statement (e.g. "Parfumurile Morph se pot testa în magazinul din București") so it does not promise a tester for every product. One line.
4. `magazin.module.css`: styles for the method steps and the review line; remove `.reasons` if unused.
5. `scripts/smoke.mjs`: assert no "159" on `/magazin`; the maps link equals `BOUTIQUE.maps`; `#certilogo` exists; the Google link opens in a new tab with `rel="noopener"`; no staff names (`Andreea`, `Bogdan`) anywhere in the build; no product page shows a rating.
6. `docs/design/phase-c4-2b-…md` and a CLAUDE.md line.

Out of scope for C4.2b: photographs, quotes, map embeds, directions, booking, events, new routes, nav changes, home movement 6 (it reads `BOUTIQUE` and needs no edit).

Remains **pending**: store photography (§4), verbatim reviews (R1, R2, R6), the aggregate figure, holiday hours, transit and access notes, the status of the Trustindex widget on Morph's site.

## 9. Open questions for the owner

1. Store reviews: link + summary only (recommended), or also quotes? If quotes: which (R1, R2, R6), and full name, initials or none?
2. Show "4,5 din 5 · 223 de recenzii pe Google" with its date, or only the link?
3. Do you have photographs from your visit to Lahovari 5, and is there any route to Morph's consent for interior images? Until then the room stays digital.
4. May the concept mention the nearby Piața Romană metro (read from the map, not stated by Morph), or should directions stay a map link only?
5. Is the PDP line change (§8.3) acceptable, or should the line go entirely?
6. Certilogo: keep on `/magazin` (moved lower), or move it to its own anchor elsewhere later? C4.2b keeps it and the anchor.
7. C4.0's note stands: a logged-in review of `@morphparfumromania` is the only way to find Morph's own shop photographs and a current Instagram bio.
