# Morph Romania: campaign and brand archive (C4.0)

Date: 2026-09-25. Research and documentation only; nothing in the concept was changed. The archive gives C4.1–C4.3 a factual base. It builds on `00-executive-summary.md`, `01-morph-audit.md`, `docs/design/phase-05-5-content-opportunity-map.md` and `data/assets.json`, and does not repeat their findings unless it corrects or dates them.

## Evidence labels

- **[F]** Directly documented by an official Morph source that was read (page text, legal terms, image text, media-library metadata, product record).
- **[T]** A third-party claim: press, databases, retailers, creators.
- **[I]** A reasonable inference from [F] evidence. It stays an inference until Morph confirms it.
- **[?]** Unresolved, or sources conflict.

Instagram and social verification levels:
- **WF**: the public post page was fetched and its caption, author and date were read as text. The image or video was **not** viewed.
- **SN**: seen only as a search-result title or snippet. The post itself was not opened.
- **OE**: read through the platform's public oEmbed or RSS endpoint.

Confidence (per campaign): **High** means official text states the name, dates and mechanics. **Medium** means official assets exist but the name or dates are partial. **Low** means a single asset or an inference.

Descriptive placeholders for campaigns without a published official name are in square brackets, e.g. **[Gate 17 launch]**.

---

## 1. Methodology and scope

**Scope.** Morph Romania's campaigns, launches, seasonal activations, editorial projects, events, visual assets and recurring narratives, with morphparfum.com (Italy, the brand's own store) for comparison. Bounded to one systematic pass per source category; no open-ended crawl.

**What was done** (all read-only, no sign-in, no credentials):

| Source category | Method | Volume |
|---|---|---|
| morphparfum.ro sitemaps | `sitemap_index.xml` → post, page, product, product_cat, local | 5 sitemaps (90 post URLs RO+EN, 20 page URLs, 166 product URLs, 36 category URLs) |
| WordPress REST API | `wp/v2/posts` (full content), `wp/v2/pages` (full content, including pages absent from the sitemap), `wp/v2/media` (all pages), `wp/v2/product` (creation dates), categories and tags | 45 posts, 27 pages, 973 media items, 105 product records |
| WooCommerce Store API | `wc/store/v1/products?slug=` for launch products | 6 product descriptions (Primitivo, Gate 17, Oud Mafia, Antigua Bay, Tonkatonic, Disumano) |
| Rendered pages (Chromium) | morphparfum.ro home; morphparfum.com home; en.morphparfum.com home, Maison, The Noses; morphparfum.com sitemap.php | 6 pages (store locator failed on TLS) |
| Campaign images | Downloaded to the scratchpad only (never committed) and viewed as contact sheets | 40 media-library images + 3 already in `public/morph/campaign` |
| Instagram | Profile HTML, profile `/embed/`, post `/embed/captioned/`, headless Chromium, WebFetch; post discovery through web search indexes | 2 accounts; 11 posts verified at WF level; the rest SN |
| TikTok, YouTube, Facebook | TikTok oEmbed; YouTube channel RSS; Facebook video pages via WebFetch and search titles | 1 TikTok video (OE), 15 YouTube videos (OE), 6 Facebook video titles (1 WF, 5 SN) |
| Third party | Web search (20 queries in total across all categories); Fragrantica, Parfumo and a Fragrantica news article returned 403 | snippets only |

**Totals:** about 1,190 official records read through APIs (45 posts, 27 pages, 973 media items, 105 products, 40 viewed images), 6 rendered pages, 5 sitemaps, 31 social items (11 Instagram, 1 TikTok, 15 YouTube, 1 Facebook fetched, plus search-only titles), and about 12 third-party references at snippet level.

**Not done, on purpose.** No login, no private or undocumented APIs (e.g. Instagram `web_profile_info`), no crawler user-agent spoofing, no mass downloading, no scraping of personal accounts beyond single public posts that tag Morph. Images viewed for this archive stay in the scratchpad.

---

## 2. Executive summary

1. **Morph Romania runs a dense, dated campaign calendar**, and most of it is documented on morphparfum.ro even when the blog is silent. Of the 33 campaigns and activations identified (§3), 23 date from 2025–2026. The media library is the best chronological archive: its slide filenames and upload dates trace the calendar from 2022 to August 2026 [F].
2. **Legal terms are the most precise source.** Three campaign regulations give exact dates and mechanics: *Voucher cadou de Morph Crăciun* (6–20 Dec 2024, in store), *Voucher cadou* (28 Aug–29 Oct 2026, online), and the Morph Points terms (from 1 June 2025) [F]. The Christmas 2024 regulation also names the Instagram account (`morphparfumromania`) and the draw urn: "sticla Morph Crăciun" [F].
3. **Official channels** [F, from the morphparfum.ro footer]: Instagram `@morphparfumromania`, TikTok `@morphparfumro`, YouTube `@MorphParfumRomania`, Facebook `morphromania`, LinkedIn `morph-parfum-romania`. `@morphparfum` is the **Italian brand account**, linked from morphparfum.com, not the Romanian one. Both Morph accounts are verified [WF].
4. **Instagram could not be browsed.** From this environment every profile, profile embed and post embed redirected to the login wall, and WebFetch on a profile returned HTTP 429. Individual post pages were readable through WebFetch, so the archive holds 11 verified posts (5 RO, 6 IT) found through search indexes. Search indexes cover the account poorly: 1,114 RO posts are claimed [SN], and only 5 were found (§6).
5. **A correction to the concept's asset data.** The image stored as `ice-campaign.avif` (the 2026 "Colecția Ice" home slide) is a crop of the **Primitivo launch shoot** (September 2025): the bottle in the gloved hand is labelled PRIMITIVO [F, visual comparison]. It shows Ice through its newest product; it is not a separate collection shoot [I].
6. **Recurring narratives** [F]: metamorphosis and identity (the "Your Next Form. Identity, layer by layer" line of 2026); "Your Next Obsession" (2025, used on bottles, gel pouches, a tote bag, Morph Friday and Facciamo l'Amore); duality (Naughty or Nice); Italian voice ("Facciamo l'Amore", "Innamorati di te"); laboratory precision (gloved hands, rigs, and lab micro-captions like "RARE MATERIALS / COLD EXTRACTION" and "ANALYZING / DETECTED / INITIATED"); surreal still life (burning rose, shattered-glass heart, rope, panther).
7. **Visual worlds differ by launch** (§4.2), and no single photographic system runs through them. Surreal pink sky (Gate 17 2024) → lab and elements (Primitivo 2025, Les Exclusifs panther 2026) → noir studio portrait (Facciamo l'Amore, YNF 2026) → blue lab-sky with a butterfly (Summer 2026). The Phase 05 art direction (dark wood, glass, light) is closer to the 2026 lab and noir work than to the 2024 pastel work [I].
8. **The international site is teasing something.** On 2026-09-25 the morphparfum.com hero showed "a new form is emerging" over a dark steel lab table with gloves, glassware, roots and two embossed silver emblems [F]. Whether this is Your Next Form reaching Italy or a new launch is unknown [?].
9. **Rights exposure is high.** Most 2024–2026 campaign images feature identifiable models, and several activations show identifiable guests or participants: the Gate 17 launch, the layering workshop, creator testimonials (Cristian Pandia, Simina Stroe, "Antonia"). Rights review is required before any reuse (§8).

---

## 3. Campaign index and chronology

Dates are **campaign dates** only when official text states them. "Media upload" dates are when a file entered the WordPress library; "product created" dates are when the product record was created on morphparfum.ro. Both are proxies, not launch dates. The 2021-08-26 product dates reflect a site-wide import and carry no launch meaning [I].

### Summary table

| # | Campaign / activation | Date or range | Type | Confidence |
|---|---|---|---|---|
| C01 | Valentine's Day 2022 | Feb 2022 (media) | Seasonal | Low |
| C02 | [Disumano launch] | Jul–Aug 2022 | Product launch, Ice | High (assets) / Medium (dates) |
| C03 | [Antigua Bay launch] | May–Jul 2023 | Product launch, Luxury | Medium |
| C04 | [Oud Mafia launch] | Oct–Nov 2023 | Product launch, Ice | Medium |
| C05 | Black Friday 2023 | Nov 2023 (media) | Promotion | Low |
| C06 | [Tonkatonic launch] | Feb–Mar 2024; creator content Aug 2024 | Product launch, Ice | Medium |
| C07 | [Gate 17 launch] + launch event | Oct 2024 (event date unpublished) | Product launch + event, Ice | High |
| C08 | Voucher cadou de Morph Crăciun | 6–20 Dec 2024 | In-store draw | High |
| C09 | [Valentine's 2025 "Cupid is Over"] | Feb 2025 | Seasonal | Medium |
| C10 | Creator testimonials series | 2024–2025 | Social content | Medium |
| C11 | Morph Points (loyalty) | from 1 Jun 2025 | Program | High |
| C12 | A Perfect Summer Duo | 21–27 Jun 2025 | Promotion | High |
| C13 | "Your Next Obsession" line | 2025 (Mar → Nov) | Recurring tagline | High (use) |
| C14 | [Tonkatonic gel + Limited Edition set] | Jul 2025 | Product launch, Bath & Body | Medium |
| C15 | [Tote bag] | Aug 2025 | Gift with purchase (?) | Low |
| C16 | [Primitivo launch] | Sep–Oct 2025 | Product launch, Ice | High (assets) |
| C17 | Seturile Morph Limited Edition | from 24 Oct 2025 | Gift sets | High |
| C18 | Morph Friday ("less black. more Morph") | 7–14 Nov 2025 | Promotion | High |
| C19 | Cruda Limited Edition Set | 15–30 Nov 2025 | Limited set | Medium |
| C20 | Naughty or Nice (Christmas 2025) | 28 Nov–24 Dec 2025 | Seasonal campaign | High |
| C21 | Happy New Year 2026 | late Dec 2025–Jan 2026 | Seasonal | Medium |
| C22 | Facciamo l'Amore (Valentine's 2026) | 7–24 Feb 2026 | Seasonal campaign | High |
| C23 | Aplicația Morph: free shipping | Feb 2026 → ongoing | Channel activation | High |
| C24 | 8 Martie 2026 | Jan–Mar 2026 | Seasonal editorial | Low |
| C25 | [Collection campaigns 2026] | Mar 2026 (media) | Collection campaign | Medium |
| C26 | Spring Selection 2026 | from 27 Mar 2026 | Curated selection | High |
| C27 | [Morph Mystery Set weekend] | 2–3 May 2026 | Gift with purchase | High |
| C28 | Your Next Form (layering collection) | pre-launch 11–27 Jul 2026, launch 1 Aug 2026 | Collection launch | High |
| C29 | Primul workshop Morph dedicat Layering-ului | before 16 Jul 2026 (date unpublished) | Event | High (existence) |
| C30 | [Summer campaign 2026] | Aug 2026 | Seasonal / Les Exclusifs | Medium |
| C31 | Voucher cadou (150 RON) | 28 Aug–29 Oct 2026 | Promotion | High |
| C32 | [International teaser "a new form is emerging"] | observed 25 Sep 2026 | Teaser (IT site) | Medium (seen) / Low (meaning) |
| C33 | Italian account history (`@morphparfum`) | 2015–2025 | International social | see §6 |

### Campaign records

**C01 · Valentine's Day 2022** · Seasonal · Low
- Assets [F]: `2022/02/Valentines-Day-Banner-peisaj-scaled.avif` (red paper heart with ribbon, on white; uploaded 2022-02-12); `2022/02/1-1.avif` (alt "happy valentines day").
- [I] Generic imagery with no Morph object in frame. Mechanics unknown.

**C02 · [Disumano launch]** · Ice · High for assets, Medium for dates
- Product: Disumano EDP (RO product record created 2022-08-10) [F].
- Assets [F]: `2022/07/slider-morph_disumano.gif` (home slider, uploaded 2022-07-17); `2022/08/MORPH-DISUMANO.mp4` and `.mov` (film, 2022-08-12); `2022/08/MORPH-DISUMANO_2.avif`. Visual: fragmented face collages in teal and white, a portrait split into offset strips.
- Perfumer: Douglas Morel [T, Fragrantica snippet]. The morphparfum.com Noses page lists Douglas Morel but does not attribute perfumes [F].
- Later content: YouTube "Review Morph Disumano – Simina Stroe" and "Morph Disumano – delicios, exotic, seducător" (Cristian Pandia), both uploaded 2025-05-14 [OE]; TikTok Simina Stroe video, 2024-10-12 [OE] (see C10).
- Flags: identifiable models in the launch imagery; film rights and length unknown (content map §1).

**C03 · [Antigua Bay launch]** · Luxury · Medium
- Product: Antigua Bay EDP; the RO product record was created 2023-06-28 and the Store API files it under "Parfumuri colecția Luxury" [F].
- Instagram IT: reel "Antigua bay Coming soon #MyMorph #MorphParfum", 2023-05-23 [WF] → https://www.instagram.com/morphparfum/reel/CslQmtSoh7i/
- RO asset [F]: `2023/07/Banner-Web_Antiguabay-12-GIUGNO.avif`: the bottle laid diagonally across a blue ink wash on white. [I] "12 GIUGNO" (Italian for 12 June) in the filename suggests the Italian launch date, not confirmed.
- YouTube RO "Morph Antigua Bay – piperat, ozonic, marin", uploaded 2025-05-14; its description says "Disponibil acum în showroom" [OE].

**C04 · [Oud Mafia launch]** · Ice · Medium
- Product created 2023-11-09 [F]. Instagram IT reel, 2023-10-27: "Oud Mafia is more than just a fragrance; it's a movement of enthusiasts celebrating the diversity of cultures united by the same passion." [WF] → https://www.instagram.com/morphparfum/reel/Cy5N9asAwez/
- RO asset [F]: `2023/11/slider-Oud-Mafia_coming_soon.avif`: the words "UNITY / MOVEMENT / PASSION" in yellow graffiti lettering over a clear bottle, with an orange flare.
- [?] A commenter on the IT reel asked whether the fragrance was previously called "Primitivo" (WF summary of comments). Nothing official supports this; Primitivo launched separately in 2025 (C16).

**C05 · Black Friday 2023** · Low
- Only asset: `2023/11/Black-Friday-bg-tranparent-round.avif` (gold confetti ring, no product) [F]. Mechanics unknown. See C18 for the 2025 reframing as "Morph Friday".

**C06 · [Tonkatonic launch]** · Ice · Medium
- Product created 2024-02-29 [F]. The blog "Parfumuri de toamnă" (2025-09-02) says "lansat în 2024" [F]. Perfumer "Nose Mathieu Nardin": blog 2024-12-18 and YouTube description [F]; the name also appears on the morphparfum.com Noses list [F].
- Asset [F]: `2024/03/slider-morph_tonkatonic-min.avif`: hands holding phones photographing the bottle on a pink pedestal against sky blue.
- YouTube RO (uploaded 2025-03-19) [OE]: "Your next obsession is here!", "Bold elegance with Morph Tonkatonic!".
- Instagram RO reel, 2024-08-16: "Parfumul Morph Tonkatonic i-a dat peste cap toate așteptările lui @cristian_pandia… Vino și tu să-l testezi la 📍 Piața Alexandru Lahovari, nr. 5. #mymorph #new #tonkatonic #morphperfumes #ice" [WF] → https://www.instagram.com/reel/C-u478ACo_i/ (creator content; see §8).

**C07 · [Gate 17 launch] and launch event** · Ice · High
- Product created 2024-10-02; campaign images uploaded 2024-10-09 [F].
- Official statement (Despre noi) [F]: "În 2024, a fost lansată cea mai nouă creație a casei Morph, parfumul Gate 17 din gama Ice, moment ce a fost celebrat cu fast printr-un eveniment memorabil ce a adus împreună echipa, partenerii și susținătorii noștri." **The event date and venue are not published** [?].
- Perfumer: "Christian Carbonnel" (RO YouTube description) vs "Christian Carbonell" (morphparfum.com Noses list) [?, spelling conflict].
- Visual language [F, viewed]: a surreal pastel world with pink-lilac sky, dunes, a reflecting pool, a chrome ring and a sphere or planet. Two bare arms pass the bottle hand to hand (`morph-gate-17-final-scaled.avif`, `despre-noi-morph-parfum-2.avif`), and a model in white reclines on a pink dune holding the bottle (`2025/03/banner_1800x1100_02.avif`, the About banner).
- Launch activation [F, image text]: `2024/10/Beige-Refined-Elegant-Photo-Collage-Moodboard-Instagram-Post-A2-peisaj.avif`: "NEW GATE 17 · Transport GRATUIT 19–21 octombrie" (year from upload date, 2024 [I]).
- Event photographs [F]: the 15-image About gallery (`2025/03/1-2.avif` … `15.avif`, 1080×1620) and `Despre-noi-Lansare-Morph-Gate-17(-2).avif`. Contents are documented in the content map §4 (black wall with sculpted M, "Do you want to turn heads?" wall, tasting table, Gate 17 cake). Guests are identifiable; status `pending` in `data/assets.json`.
- YouTube RO (uploaded 2025-03-19) [OE]: "Morph introduces the new Gate 17 in Romania", "New Morph Fragrance – Gate 17", "Gate 17 – Describe it in one word", "Gate 17 – the melody of scent by Antonia" (a named person; rights flag). Copy: "Gate 17 is the fragrance for those who dream without limits"; "the scent of those who know that one world is never enough".
- Launch year 2024 [T, Fragrantica snippet] agrees.

**C08 · Voucher cadou de Morph Crăciun** · In store · High
- Source: the regulation page `/regulamentul-campaniei-promotionale-voucher-cadou-de-morph-craciun` (published 2024-12-05) [F].
- 6–20 Dec 2024, only at Piața Alexandru Lahovari 5. Any in-store purchase → a paper ticket (name, surname, phone) → into the draw urn, "sticla Morph Crăciun". One winner drawn on 20 Dec 2024; prize a 1,000 lei (+VAT) voucher usable in store. Announcement post: "va fi publicată pe contul de Instagram 'morphparfumromania' în cursul zilei de 6 decembrie 2024" [F]. Organizer: Luxury Expert Parfum SRL [F].
- [I] "sticla Morph Crăciun" suggests an oversized bottle-shaped urn in the shop. It was not seen; the Instagram post was not found.
- Related: Tonkatonic set and cream records created 2024-12-03 [F]. The blog "Idei de cadouri de Crăciun: 40+ idei" (2024-12-18) is a gift guide [F]. The media file `2024/12/Campanii-speciale-Morph.avif` (red juice in a tilted bottle, white studio) sits next to the newsletter assets from the same week [I: probably the newsletter page's "Campanii speciale" tile].

**C09 · [Valentine's 2025 "Cupid is Over"]** · Seasonal · Medium
- The placeholder name comes from the filename `2025/02/ValentinesDay_Morph_Cupid_is_Over_01.avif` (1080×1350, uploaded 2025-02-10) [F]. The image: a rose in flames beside a hand spraying an amber bottle, on burgundy. A surreal still life.
- Blog "Cadouri de Valentine's Day pentru el și ea" (2025-02-07) uses couple-set images captioned "Sursa foto: Morphparfum.ro" [F] and calls Morph "o adevărată artă a metamorfozei olfactive" [F].
- Mechanics unknown.

**C10 · Creator testimonials series** · Social · Medium
- Instagram RO: Tonkatonic × @cristian_pandia reel, 2024-08-16 [WF] (C06); Zeta customer testimonial post, 2024-05-26, hashtags `#morphpeople #morphtestimonials`, quoting a customer who discovered Zeta "acum 3 ani" in the Lahovari shop and thanks "doamnelor care lucrează în parfumeria Morph" [WF] → https://www.instagram.com/p/C7bQ_w7oGKP/
- TikTok RO: "Simina Stroe îți dezvăluie secretul ei pentru un vibe irezistibil – Morph Disumano!", 2024-10-12 (date decoded from the video ID) [OE] → https://www.tiktok.com/@morphparfumro/video/7424832849078963489
- YouTube RO: Simina Stroe (Disumano), Cristian Pandia (Disumano), both 2025-05-14 [OE].
- [I] The testimonials consistently send people to the physical shop.
- Flags: named, identifiable people; creator agreements unknown.

**C11 · Morph Points** · Loyalty program · High
- Terms in `/termeni-si-conditii`: the program is open "începând cu data de 1 iunie 2025" [F]. Blog 2025-08-06: 10% of the order value returned as points [F]. Home slide `2026/03/program-fidelizare-slide.avif`: black silhouettes of bottles and boxes against pale blue [F, viewed].

**C12 · A Perfect Summer Duo** · Promotion · High
- Slide `2025/06/summer-duo-ro.avif` (and `-en`), uploaded 2025-06-20 [F, image text]: "A PERFECT SUMMER DUO. În perioada 21–27 iunie 2025 primești CADOU un gel de duș sau o cremă de corp Morph, la alegere, la orice comandă plasată pe www.morphparfum.ro și achitată online, ce include două parfumuri Morph de 100 ml, exclusiv din selecția promoțională." Online only. The visual is a white bottle embossed "YOUR NEXT OBSESSION".

**C13 · "Your Next Obsession"** · Recurring line · High
- Uses [F]: the YouTube title "Your next obsession is here!" (Tonkatonic, 2025-03-19 upload); the Summer Duo bottle emboss (Jun 2025); the Italian Instagram hashtag `#YourNextObsession` on "See things with a new perspective.", 2025-06-25 [WF] (https://www.instagram.com/p/DLUgpWBMVlI/); the gel pouch print (content map §6); the tote bag slide (C15); the Tonkatonic gel slide (C14); "Morph Friday. Take your next obsession." (C18); Facciamo l'Amore copy "gata să devină noua ta obsesie" (C22).
- [I] In 2026 it gives way to "Your Next Form" (C28), which keeps the "Your Next …" structure. Morph has not stated this.

**C14 · [Tonkatonic gel and Limited Edition set]** · Bath & Body · Medium
- Slide `2025/07/morph-tonkatonic-set-limited-edition-ro.avif` (2025-07-04) [F, image text]: "NOU · Disponibile pentru precomandă · Gel de Duș Revitalizant 200 ml · SET Tonkatonic Ediție Limitată: Gel de duș revitalizant 200 ml & Apă intensă de parfum 100 ml". Visual: a warm-lit Tonkatonic gel bottle beside a model's face in half shadow. The gel product record was created 2025-07-03 [F].

**C15 · [Tote bag]** · Low
- Slide `2025/08/morph-tote-bag-slide.avif` (2025-08-06): a white tote printed "YOUR NEXT OBSESSION" and a vial set on sand, black-and-white [F]. No text explains the mechanics [?].

**C16 · [Primitivo launch]** · Ice · High for assets
- Product created 2025-09-26, categories "Parfumuri colecția Ice", "Nou" [F]. Copy: "Imaginează-ți vântul ridicând nisipul, umbrele și lumina dansând peste peisaje sălbatice… Primitivo captează această energie primară" [F].
- Slides [F, viewed]: `2025/09/Primitivo-Slider-Morph.avif`: a studio lab rig with gloved hands pouring sand and holding a blotter, the bottle, dark wood and resin. `2025/10/Primitivo-Morph-Slider-2.avif`: the bottle wedged between rocks. `Primitivo-Morph-Slider-3.avif`: a figure amid sparks and fire, holding the bottle.
- **The 2026 "Colecția Ice" home slide (`2026/03/colectia-ice-slide.avif`, in the concept as `public/morph/campaign/ice-campaign.avif`) is a crop of the Primitivo rig shot**; the bottle label reads PRIMITIVO [F, side-by-side comparison].
- Perfumer: Mathieu Nardin [T, search snippet of a Fragrantica news article that returned 403]. Launch year: Fragrantica lists 2026 [T, SN]; morphparfum.ro sold it from September 2025 [F] → [?] the Romanian release may precede the international one.
- Facciamo l'Amore copy (Jan 2026): "Primitivo evocă libertatea unui spirit neîmblânzit" [F].

**C17 · Seturile Morph Limited Edition (winter 2025)** · Gift sets · High
- Slide `2025/10/seturi-limited-edition-ro.avif` (2025-10-24) [F, image text]: "NOU · Descoperă Seturile Morph Limited Edition · CADOUL PERFECT · Un ritual complet cu parfum și cremă sau parfum și gel de duș." Visual: turquoise hinged box holding two bottles. Product records for 6 perfume+gel/cream sets created 2025-10-24; N8 and Cruda sets 2025-11-13; Gate 17 perfume+gel set 2025-11-29 [F].
- Consistent with the About claim that cream+perfume sets are produced "exclusiv o dată pe an, în preajma sărbătorilor de iarnă" [F]. The Facciamo l'Amore post (Feb 2026) still sells limited editions until 24 Feb [F], which stretches "once a year" [?].
- Also created 2025-11-29 [F]: "Set mini parfumuri Morph Discovery Travel 24 parfumuri 8 ml" and "Blind set 6 samples + 1 travel" (the 24 vs 22 count conflict is in research 01).

**C18 · Morph Friday: "less black. more Morph"** · Promotion · High
- Slide `2025/11/promotie-morph-friday-en.avif` (2025-11-07) [F, image text]: "less black. more Morph · 7–14 nov 2025 · Morph Friday. Take your next obsession. Spend over 700 RON on our website or in-store and receive a free shower gel or body cream! Promotion valid while stocks last. Limited edition sets are not included in the promotion. Loyalty points do not apply within this promotion." Visual: a model with wet hair seated on a white-draped rock by the sea, holding a bottle (identifiable).
- [I] Morph reframes Black Friday as its own name. Only the EN variant was found in the library [?].

**C19 · Cruda Limited Edition Set** · Medium
- Slide `2025/11/15-30.11.2025-en.avif` (2025-11-15) [F, image text]: "NEW · Discover the Morph Limited Edition Sets · THE PERFECT GIFT · A complete ritual with perfume and body cream or perfume and shower gel · CRUDA LIMITED EDITION SET · Exclusively available in Romania". The date range comes only from the filename (15–30.11.2025) [I]. Visual: lilac box with two bottles.

**C20 · Naughty or Nice (Christmas 2025)** · High
- Pages `/naughty` and `/nice` (created 2025-11-28, not in the sitemap) [F]. Slides `2025/11/naughty-nice-desktop-/tablet/mobile` (2025-11-29): "Naughty or Nice?" in script type, a burgundy/white split, bottle and box [F, viewed]. Blog "Naughty or Nice? Sezonul cadourilor la Morph Parfum" (2025-12-07) [F].
- Concept [F]: "Fiecare dintre noi ascunde atât o latură angelică, cât și una rebelă. Parfumul pe care îl alegem spune, fără cuvinte, povestea acestei dualități." Taglines: "Îndrăznește să fii Naughty/Nice. Îndrăznește să fii tu."
- Mechanics [F]: online 1–21 Dec, orders ≥660 RON → "Set Morph Discovery (5 Samples)" gift; in store 1–24 Dec, any purchase → a bottle of prosecco; TikTok contest on `@morphparfumro`: comment "Naughty or Nice", 4 × 500 RON vouchers, live draw on TikTok on 22 Dec.
- Products [F]. Two official lists that **do not match** [?]:
  - `/naughty` page: Animal, Antigua Bay, Axum, Cruda, Indomable, Kolonaki, Montmartre, Nudo, Oud Mafia, Primitivo, Rose J, Tonkatonic, Too.
  - `/nice` page: Arles, Disumano, Gate 17, Iconic, Miyazawa, N8, Pure Soul, Umhh, Vapor, Vision, Zeta.
  - The blog lists Naughty as Animal, Rose J, Too, Cruda, Primitivo, Oud Mafia, and Nice as Iconic, Miyazawa, Umhh, N8, Vapor, Zeta. It then recommends Disumano "pentru el" and Cruda "pentru o fire romantică", which crosses the page lists.
- [I] The only Morph campaign so far that sorts the whole catalogue by a character axis rather than by collection.
- The blog lead image was judged possibly generated in the content map [I].

**C21 · Happy New Year 2026** · Medium
- Slides `2025/12/HNY-desktop.avif` (+3 mobile variants, 2025-12-30 / 2026-01-03) [F, image text]: "Happy New Year! Start 2026 with your signature scent. Here's to a sparkling and fragrant New Year!" A model in black reclines beside a pale pink box, gold bokeh (identifiable).

**C22 · Facciamo l'Amore (Valentine's 2026)** · High
- Blog "Valentine's Day 2026: Facciamo l'Amore By Morph" (2026-01-27) and page `/scrisori-de-dragoste-morph` (2026-02-06) [F].
- Mechanics [F]: 7–24 Feb, every purchase online or in store gets a free personalized love letter. Online buyers write the message in "Notă comandă" or pick one of the three ready letters ("Varianta 1–3"). Limited Edition sets on sale until 24 Feb. Free shipping through the Morph app for all of February, across Europe.
- Voice [F]: "Innamorati di te Morph!", "Meriti amore, tanto amore con Morph!", "Layering pentru doi" (Disumano "parfumul ei" + Too "parfumul lui").
- Products named [F]: Gate 17, Cruda, N8 (for her); Primitivo, Animal, Antigua Bay (for him); LE body cream and shower gel sets. [I] The gendered pairing contradicts the unisex positioning (a known pattern, research 01 §14).
- Slides [F, viewed]:
  - `facciamo-L-amore-slide`: a heart of shattered clear glass with a bottle, on red;
  - `scrisori-cadou-morph-slide`: a red payphone handset hand-lettered "Don't call her. Tell her with a Morph.";
  - `editii-limitate-slide`: a model holding an INDOMABLE box to her face, on black (identifiable);
  - `transport-gratuit-morph-app-slide`: a bottle bound with a black strap, on black.

**C23 · Aplicația Morph: free shipping** · High
- Page `/aplicatia-morph` (2026-02-06) [F]: "Comenzile plasate din aplicația Morph pentru iOS sau Android au transport gratuit. Oriunde te afli. România sau diaspora. Nu pe site." Slides `2026/03/transport-gratuit-slide(-m)` [F]. App Store listing "Morph Parfum Romania" (id1524253859) [SN].
- [?] Whether "Oriunde" still covers all of Europe after February (C22 said Europe for February only).

**C24 · 8 Martie 2026** · Low
- Blog posts "Cadou de 8 Martie: 3 parfumuri Morph…" (2026-01-11) and "…ce parfum îi iei mamei și ce parfum îi iei iubitei" (2026-01-18) [F]. No activation assets found.

**C25 · [Collection campaigns 2026]** · Medium
- Home slides uploaded 2026-03-12 (desktop + `-m`) [F]; already in the concept (`data/assets.json`):
  - `les-exclusifs-slide`: a black panther in grainy monochrome, jaws around a black bottle; lab micro-captions "RARE MATERIALS / COLD EXTRACTION / UNCOMPROMISING BLACK" and "LES EXCLUSIFS" [F, viewed];
  - `colectia-luxury-slide`: clear bottles bound in red rope;
  - `colectia-ice-slide`: the Primitivo rig crop (see C16).
- Same batch [F]: `slide-2-fara-scris` ("without text": black silhouettes of bottles and boxes on pale blue, same shoot as the loyalty slide); `program-fidelizare-slide`; `transport-gratuit-slide`.
- [?] No launch text or date. The upload date is the only anchor.

**C26 · Spring Selection 2026** · High
- Page `/spring-selection-2026` (2026-03-27) [F]: "Descoperă parfumurile care definesc primăvara aceasta… Alege parfumul care te reprezintă." Products: N8, Iconic, Gate 17, Tonkatonic, Vapor. No distinct imagery was found.

**C27 · [Morph Mystery Set weekend]** · High
- Popup `2026/04/popup-1-3-05-2026-en.avif` (2026-04-30) [F, image text]: "ESCAPE THE ROUTINE · UNLOCK THE MYSTERY · A gift from us: MORPH MYSTERY SET · On orders over 500 lei, online or in store, May 2–3 · Promotion valid while stocks last." Visual: an open white box of vials over dark sea waves.
- [I] Blind discovery as a gift mechanic, two months before Your Next Form made the blind set a product line.

**C28 · Your Next Form: the layering collection** · High
- Blog "Your Next Form: Noua colecție Morph dedicată Layering-ului" (2026-07-16) [F]:
  - Concept: "Atunci când două parfumuri se întâlnesc, ia naștere o nouă energie. O nouă stare… O nouă formă… un concept construit în jurul identității și al transformării, inspirat de filosofia brandului și de ideea de metamorfoză."
  - Line: "12 identități. 12 forme." Close: "Who Do You Choose to Be?… Your Next Form. Identity, Layer by Layer."
- **Three-stage reveal** [F]:
  - 11–13 Jul: Magnetic, Fearless, Addictive, Euphoric;
  - 18–20 Jul: Untamed, Unforgettable, Mysterious, Desired;
  - 25–27 Jul: Hypnotic, Irresistible, Reckless, Limitless.
  - Each weekend, an online purchase of a 100 ml perfume or a Limited Edition Set earned one YNF set as a gift, while stocks lasted.
  - Official launch: 1 August 2026.
  - The product record dates match the stages: 2026-07-10, 07-15 and 07-23 [F].
- "Termenii și Condițiile Campaniei" links to the general `/termeni-si-conditii`, which contains no YNF terms [F] → the campaign terms were not found [?].
- YouTube RO (all 2026-07-29) [OE]:
  - "YOUR NEXT FORM LAYERING COLLECTION. LAUNCHING AUGUST 1." and three cut-downs;
  - description: "Morph was born from the idea of metaMORPHoses, the constant transformation of fragrance through the person who wears it. The same scent evolves with every skin…";
  - other lines: "Layer by layer, every combination reveals a different version of YOU."; "Identity, created in layers."
- Assets [F, viewed]:
  - `layering-slide-1.png` / `layering-parfum-slide.avif`: the open box with two vials in hand, on black; the current home hero;
  - `layering-slide-2`: a box grid;
  - `layering-slide-3`: a silhouette with two vials;
  - `your-next-form-1`: a torso in a black suit holding two vials; face out of frame;
  - `your-next-form-3`: a woman holding two bottles, with a band of shadow across her eyes (identifiable).
- Home caption [F]: "NEW: YOUR NEXT FORM │ THE LAYERING COLLECTION · DISPONIBILĂ ACUM · IDENTITY, LAYER BY LAYER."

**C29 · Primul workshop Morph dedicat Layering-ului** · Event · High for existence
- Blog (2026-07-16) [F]. The workshop was "primul contact al invitaților cu universul Your Next Form". Participants were blindfolded and smelled one of the 12 layerings, then tried to recreate it by testing and changing the application order. The identities were revealed only at the end.
- **The date, venue and number of guests are not published** [?]. The blog post (published 2026-07-16) describes it in the past tense, so the event took place before that date [F].
- Assets [F, viewed]:
  - `workshop-morph-slide.avif`: several participants in green satin blindfolds holding blotter cards; faces partly visible;
  - `workshop-morph-2.avif`: a woman blindfolded smelling a card;
  - `-1`: table setting;
  - `-3`: notes cards and vials, hands only;
  - `-4`: the YNF box in hand.
- Flags: participants identifiable in the slide, 1 and 2; `workshop-1` is `pending` in `data/assets.json`; `workshop-2` and the slide should be added as pending (§8).
- [I] The blindfold ritual (sense first, name last) is a Morph-originated mechanic that the concept's Your Next Form page already mirrors (identities before names). It is not a claim that workshops recur.

**C30 · [Summer campaign 2026]** · Les Exclusifs · Medium
- Slide `2026/08/morph-summer-campaign-2026-slide.avif` (+ `.jpg`; uploaded 2026-08-21; on the home slider 2026-09-25) [F]. Visual: a dark bottle with a monarch butterfly on the cap against a blue gradient sky, a thin grid, and lab micro-captions "ANALYZING / DETECTED / INITIATED" and "Les Exclusifs" [F, viewed]. The small caption text also shows "N.8" [F]; the rest is illegible at the viewed size.
- [?] No blog or page explains it. The content map (§1) advised against a butterfly hero for the concept; that stays a concept decision, not a comment on Morph's campaign.

**C31 · Voucher cadou (150 RON)** · Online · High
- `/termeni-voucher-cadou` (2026-08-21) [F]: valid 28 Aug–29 Oct 2026, online only; each voucher 150 RON, single use; eligible cart must contain a 100 ml Morph perfume or a Limited Edition Set (perfume+cream or perfume+gel); minimum order 690 RON; no stacking with loyalty points or free shipping.
- [?] **How the vouchers are distributed is not stated.** It may be the newsletter, the summer campaign or in-store handouts; none is confirmed.

**C32 · [International teaser: "a new form is emerging"]** · morphparfum.com · Medium seen / Low meaning
- The morphparfum.com and en.morphparfum.com hero on 2026-09-25 [F, rendered]: a dark steel laboratory table with discarded white gloves, glass flasks, dried roots and red flowers. Two embossed silver emblems (venus flytraps; a thorn wreath) sit between the words "a new form is emerging". Carousel file `carousel/148/dtnfrg.jpg`.
- [?] It is not known whether this is Your Next Form reaching Italy (the "form" wording), a new product, or a new line. **Do not treat it as a Romanian campaign.**

**C33 · Italian account history (`@morphparfum`)** · see §6.

---

## 4. Recurring brand narratives and visual language

### 4.1 Narratives (with first and latest evidence)

| Narrative | Evidence [F] | Notes |
|---|---|---|
| **Metamorphosis / constant evolution** | Maison (morphparfum.com): "an experimental olfactory space, a 'movement' … dedicated to innovation, change… to Metamorphosis"; RO Ice copy "Metamorfoză prin parfum" (research 01); YNF 2026: "metaMORPHoses" | The core brand idea, stated by Italy and Romania alike |
| **Identity / "Your Next …"** | "Your Next Obsession" (2025) → "Your Next Form. Identity, layer by layer" (2026); "Alege parfumul care te reprezintă" (Spring 2026); "Îndrăznește să fii tu" (Naughty or Nice) | [I] the Romanian team's main campaign voice from 2025 |
| **Duality and character** | Naughty / Nice (2025); YNF 12 states (2026); the finder's "Ce prezență vrei să ai?" (research 01) | Perfumes framed as a personality choice |
| **Laboratory precision + raw elements** | Primitivo rig (2025); panther captions "RARE MATERIALS / COLD EXTRACTION" (2026); Summer 2026 "ANALYZING / DETECTED / INITIATED"; the IT teaser lab table (2026); About: "estetica italiană cu precizia laboratorului" | Strongest 2025–26 visual thread; matches the Phase 05 art direction |
| **Italian origin and voice** | "Facciamo l'Amore", "Innamorati di te", "Meriti amore, tanto amore"; Naples 2002; Bormioli bottle | Used as flavour in RO campaigns |
| **Surreal still life** | Burning rose (2025), shattered-glass heart (2026), rope-bound bottles (2026), panther holding the bottle (2026), strapped bottle (2026), butterfly on cap (2026) | Object-first images with no people; the safest for reuse (§8) |
| **The shop as destination** | Testimonials pointing to Lahovari 5 (2024–25); in-store draw (2024); prosecco (2025); "online sau în magazin" in Morph Friday, Facciamo l'Amore and the Mystery Set | [I] Most activations since 2024 include the shop; exceptions: Summer Duo, the YNF pre-launch gifts and the 2026 voucher (online only) |
| **Gift and ritual** | LE sets "un ritual complet"; Summer Duo; Morph Friday gel/cream; Mystery Set; love letters | Body products appear mostly as gifts or add-ons |

### 4.2 Visual worlds by period [F, viewed; summary is I]

| Period | World | Palette and light | People |
|---|---|---|---|
| 2022 Disumano | fragmented portrait collage | white, teal | identifiable models |
| 2023 Antigua Bay / Oud Mafia | ink wash; graffiti type | blue on white; yellow/orange | none |
| 2024 Tonkatonic / Gate 17 | playful studio; surreal pastel sky and dune | sky blue + pink; pink-lilac | hands; model (Gate 17 banner) |
| 2025 H1 | surreal still life; embossed white bottle | burgundy + flame; white | hands |
| 2025 H2 Primitivo / Morph Friday / LE sets | lab rig + raw elements; fire; seaside | white studio, warm fire; grey sea | gloved hands; models |
| 2026 Facciamo / HNY / LE | noir studio, red set | black, red, pink box | models |
| 2026 collections / YNF | monochrome panther; rope; black studio with a key light | black, white, red rope; black | torso, hands, model |
| 2026 Summer / IT teaser | lab-sky; steel lab table | blue gradient; cold steel | none |

**Constants across periods** [F]: the Bormioli twisted bottle is always the hero object; the serif MORPH wordmark with its swash; product-first framing; unisex casting. **Variables**: palette, typography on slides (script for Naughty or Nice, geometric sans elsewhere, graffiti for Oud Mafia), and the photographic register.

[I] For the concept: the object-only still lifes (rope, panther, shattered glass, strapped bottle, lab rig) and the lab micro-caption idea fit the Phase 05 "product in light" system. The pastel Gate 17 world and the model-led 2025–26 slides do not. The rights constraint (§8) points the same way.

---

## 5. Visual asset inventory (additions to `data/assets.json`)

Paths are relative to `https://morphparfum.ro/wp-content/uploads/`. "Seen" = viewed in the scratchpad at contact-sheet size. None were committed. Status proposals use the existing `concept` / `pending` vocabulary; **nothing is added to the concept in C4.0**.

| Asset | Campaign | Seen | Content | People | Proposed status |
|---|---|---|---|---|---|
| `2025/09/Primitivo-Slider-Morph.avif` | C16 | yes | lab rig, gloved hands, sand, wood, bottle | gloved hands only | concept candidate |
| `2025/10/Primitivo-Morph-Slider-2.avif` | C16 | yes | bottle wedged between rocks | none | concept candidate |
| `2025/10/Primitivo-Morph-Slider-3.avif` | C16 | yes | figure in sparks and fire | partly identifiable | pending |
| `2026/02/facciamo-L-amore-slide(-mobile).avif` | C22 | yes | shattered-glass heart, bottle, red | none | concept candidate (seasonal) |
| `2026/02/transport-gratuit-morph-app-slide.avif` | C22/23 | yes | bottle bound with a black strap, black | none | concept candidate |
| `2026/02/scrisori-cadou-morph-slide(-mobil).avif` | C22 | yes | payphone, hand-lettered line | none | concept candidate (seasonal; lettering is part of the image) |
| `2025/02/ValentinesDay_Morph_Cupid_is_Over_01.avif` | C09 | yes | burning rose + spray | a hand | concept candidate (seasonal) |
| `2026/03/slide-2-fara-scris.avif`, `program-fidelizare-slide.avif` | C25/C11 | yes | bottle and box silhouettes, pale blue | none | concept candidate |
| `2026/04/popup-1-3-05-2026-en.avif` | C27 | yes | open vial box over sea (text baked in) | none | reference only (text in image) |
| `2025/08/morph-tote-bag-slide.avif` | C15 | yes | tote + vials on sand, B/W | none | reference only |
| `2026/08/morph-summer-campaign-2026-slide.avif` | C30 | yes | bottle + butterfly, lab captions | none | reference only (see content map §1) |
| `2023/11/slider-Oud-Mafia_coming_soon.avif` | C04 | yes | graffiti words over bottle | none | reference only |
| `2023/07/Banner-Web_Antiguabay-12-GIUGNO.avif` | C03 | yes | ink wash + bottle | none | reference only |
| `2024/03/slider-morph_tonkatonic-min.avif` | C06 | yes | phones photographing bottle | hands | reference only |
| `2024/10/morph-gate-17-*.avif`, `2025/03/despre-noi-morph-parfum-2.avif` | C07 | yes | pastel sky, hands passing bottle | hands | reference only |
| `2025/03/banner_1800x1100_02.avif` | C07 | yes | model on pink dune | identifiable | pending |
| `2022/07/slider-morph_disumano.gif`, `2022/08/MORPH-DISUMANO_2.avif`, `.mp4/.mov` | C02 | yes (stills) | fragmented portraits; film | identifiable | pending |
| `2025/11/promotie-morph-friday-en.avif` | C18 | yes | model by the sea | identifiable | pending |
| `2025/12/HNY-*.avif` | C21 | yes | model in black, pink box | identifiable | pending |
| `2026/02/editii-limitate-slide(-mobil).avif` | C22 | yes | model with Indomable box | identifiable | pending |
| `2026/07/your-next-form-3.avif` | C28 | yes | woman holding two bottles | identifiable | pending |
| `2026/07/your-next-form-1.avif` | C28 | yes | torso in suit, two vials | face out of frame | concept candidate (check for tattoos, rings, other identifying marks) |
| `2026/07/workshop-morph-slide.avif`, `workshop-morph-2.avif` | C29 | yes | blindfolded participants | identifiable | pending |
| `2025/10/seturi-limited-edition-ro.avif`, `2025/11/15-30.11.2025-en.avif`, `2025/07/morph-tonkatonic-set-limited-edition-ro.avif`, `2025/06/summer-duo-ro.avif` | C17/19/14/12 | yes | set packaging and promo text | Tonkatonic slide: partial face | reference only (text in image) |
| `2025/11/naughty-nice-*.avif` | C20 | yes | script title, bottle, box | none | reference only (text in image) |
| `2025/10/Cadouri-de-Craciun-Morph-Parfum-Romania.avif` | blog | yes | fireplace, candle, gifts | none | [I] looks like stock; article-only |

**Correction for `data/assets.json`** (not applied in C4.0): the `ice-campaign.avif` subject "gloved lab hands, sand, vial" should also record that the image is the Primitivo launch shoot (C16). Using it for the Ice room stays valid, since Primitivo is an Ice perfume, but the provenance note should be exact.

---

## 6. Instagram discoveries

### 6.1 Access attempts and results

| Attempt | Result |
|---|---|
| `curl` profile `instagram.com/morphparfumromania/` and `/morphparfum/` | 302 → `accounts/login/?next=…&is_from_rle` (login wall) |
| Profile embed `…/morphparfumromania/embed/` and `/morphparfum/embed/` | 200, but the logged-out shell (`PolarisLoggedOut…`) with no posts |
| Post embed `/p/Cn7W9xNo1AO/embed/captioned/` | same logged-out shell |
| Headless Chromium on both profiles | TLS failure inside the browser; not retried with any bypass |
| WebFetch on the RO profile | HTTP 429 Too Many Requests |
| WebFetch on individual post URLs | **worked**: caption, author, date and like counts returned as text (WF) |
| Web search (15 Instagram-focused queries) | about 20 Instagram URLs surfaced; 11 relevant ones fetched; the rest unrelated or profile pages |

Not attempted: logged-in sessions, `web_profile_info` or GraphQL endpoints, crawler user-agents, third-party Instagram viewers or scrapers.

Profile facts [SN, search snippets]:
- `@morphparfumromania`: "MORPH PARFUM ROMANIA", about 15K followers, 14 following, 1,114 posts; bio mentions shop hours "L-V: 12-20, S-D: 10-18" and "true Italian luxury essence experience".
- `@morphparfum`: about 23K followers, 1,331 posts; bio "For us, doing things well is not enough. We want to make them extraordinary."
- These counts are search-index values. The fetch date is unknown.

### 6.2 Verified posts (WF unless stated)

| Date | Account | URL | Caption (excerpt) | Campaign | Products | Type | People | Value |
|---|---|---|---|---|---|---|---|---|
| 2015-07-23 | morphparfum | https://www.instagram.com/morphparfum/p/5eftoKq6PF/ | "MONTMARTRE. morphparfum.com. #bestshop … #paris #milan" | none (early brand) | Montmartre | Morph original; tags Italian retailers (thestoremilano, magentahomme, gianbertone.orange, mariodannaluxury, volpimodena) | not known | history: Montmartre existed by 2015; retailer tags suggest selected-store distribution [I] |
| 2021-11-16 | morphparfum | https://www.instagram.com/reel/CWV4v1qFvGc/ | "#MorphParfum #MyMorph" | none | not stated | Morph original reel | not known | `#MyMorph` in use by 2021 |
| 2023-01-27 | morphparfumromania | https://www.instagram.com/morphparfumromania/p/Cn7W9xNo1AO/ | "Animal . . . #animal #morph #morphparfum #morphparfumromania" | none | Animal | Morph RO original | not known | low |
| 2023-05-23 | morphparfum | https://www.instagram.com/morphparfum/reel/CslQmtSoh7i/ | "Antigua bay Coming soon" | C03 | Antigua Bay | teaser reel | not known | Italian teaser precedes the RO listing (28 Jun) |
| 2023-10-27 | morphparfum | https://www.instagram.com/morphparfum/reel/Cy5N9asAwez/ | "Oud Mafia is more than just a fragrance; it's a movement…" | C04 | Oud Mafia | launch reel | not known | "movement" wording matches Maison copy |
| 2024-05-26 | morphparfumromania | https://www.instagram.com/p/C7bQ_w7oGKP/ | customer testimonial on Zeta and the Lahovari shop staff | C10 | Zeta | **repost of a customer's words** (`#morphtestimonials`) | customer (name not given in the WF text) | shop evidence; UGC flag |
| 2024-08-16 | morphparfumromania | https://www.instagram.com/reel/C-u478ACo_i/ | Tonkatonic × @cristian_pandia; "Vino… la Piața Alexandru Lahovari, nr. 5" | C06 / C10 | Tonkatonic | creator content posted by Morph RO | identifiable creator | shop-led narrative; rights flag |
| 2025-02-19 | morphparfum | https://www.instagram.com/p/DGQp9EApNWi/ | "Just the taste of pure obsession. 🍒✨" | C13 (line) | [?] cherry theme; Burlat is Morph's cherry room scent [I, not confirmed] | Morph original | not known | "obsession" line in Italy too |
| 2025-06-25 | morphparfum | https://www.instagram.com/p/DLUgpWBMVlI/ | "See things with a new perspective. #MyMorph #MorphParfum #YourNextObsession" | C13 | not stated | Morph original | not known | confirms "Your Next Obsession" is a brand-level line, not RO-only |
| 2025-10-26 | laviniastoicaofficial (verified, not Morph) | https://www.instagram.com/reel/DQRFyBejDmG/ | "Cruda de la @morphparfumromania. Un parfum cu muuulta scorțișoară…" | none known | Cruda | **third-party creator** | identifiable creator | social proof only; not reusable without permission |

Search-only (SN): the Instagram location page "Morph Parfum Romania" (`explore/locations/418314605176281`) exists; a reel `DZxcZmwtMGi` titled in Russian ("Corporations, stop trying to buy Morph") surfaced but was **not** verified as Morph-related, and "Morph" there may be another brand.

### 6.3 Other official social channels

- **YouTube `@MorphParfumRomania`** (RSS, 15 latest) [OE]: the 4 YNF launch videos (2026-07-29); 4 creator or product videos (2025-05-14: Simina Stroe/Disumano, Cristian Pandia/Disumano, Antigua Bay, Vapor); 7 videos uploaded 2025-03-19 (Gate 17 ×4, Tonkatonic ×2, "The secret of seduction – the touch of Morph fragrances"). [I] 2025-03-19 looks like a bulk upload of earlier content, so upload dates are not campaign dates.
- **TikTok `@morphparfumro`** [OE]: the Simina Stroe Disumano video (2024-10-12). The account was used for the live Naughty or Nice draw (C20) [F].
- **Facebook `morphromania`** [SN titles]: "#MorphCollection", "• ZETA • #morphparfum #mymorph", "#Zeta 💛 #morphzeta #richbodycream", "#vision #morphvision", "#BAMBOO #LimitedEdition" (WF: hashtags only). [?] "Bamboo Limited Edition" is not in the RO Store API; it may be an Italian limited edition or an older product.
- **Facebook `mymorph`** (Italy) and LinkedIn `morph-parfum-romania`: not examined beyond existence.

### 6.4 What Instagram likely holds that this archive does not [I]

Going by the campaign calendar in §3, `@morphparfumromania` probably contains the Gate 17 event, the 2024 draw announcement (confirmed as planned by the regulation), Naughty or Nice, Facciamo l'Amore, the YNF reveal weekends, the workshop and shop imagery. None of it could be listed, and none of it is claimed here. **A manual, logged-in review by the owner is the only way to index it** (§9).

---

## 7. Content opportunities for C4.1–C4.3

Each opportunity rests on [F] evidence above; every item still needs the owner's call and, where people appear, rights clearance.

1. **A Morph "campaign archive" chapter** (Jurnal or Despre Morph): 2022 → 2026 as a sequence of objects rather than posters (Disumano film still, Antigua ink, Oud Mafia, Gate 17, Primitivo rig, panther, YNF box), each dated and captioned from §3. Only object-only frames until rights are cleared.
2. **The lab thread as a system**: the micro-caption idea (RARE MATERIALS / COLD EXTRACTION; ANALYZING / DETECTED / INITIATED) is Morph's own. It could label ingredients or process on PDP and collection rooms, in the concept's type system, not as copied graphics.
3. **Correct Ice's image story**: present the Ice room image as Primitivo's world (C16), or pair it with the Primitivo PDP. This is a factual fix as well as a creative choice.
4. **Your Next Form, told as Morph told it**: the three reveal weekends (4 identities each), the blindfold workshop (sense → recreate → name), the 1 August launch, and "Identity, layer by layer". The concept's YNF page can adopt the reveal-in-stages structure with no new claims.
5. **Seasonal chapters on `/cadouri`**, as documented past examples and not current offers: Naughty or Nice (character axis; the two official lists must be reconciled first), Facciamo l'Amore (love letters: a gift-message step with Morph's own three texts), the Mystery Set, Summer Duo, Morph Friday.
6. **The shop as protagonist**: most activations since 2024 include Lahovari 5 (draw urn, prosecco, testimonials "vino să-l testezi"); a few are online only (C12, C28 pre-launch, C31). This supports the concept's shop room and the "try in store" path with dated evidence.
7. **"Your Next …" as an editorial device**: the brand's own progression from obsession to form can title the journal or the finder result, if the owner agrees.
8. **The noses**: morphparfum.com names 7 perfumers (Douglas Morel, Sofia Bardelli, Luca Maffei, Arturetto Landi, Veronique Nyberg, Mathieu Nardin, Christian Carbonell) with biographies. RO pages attribute only Tonkatonic (Nardin) and Gate 17 (Carbonnel). The concept could carry perfumer credits per PDP only where Morph attributes them.

Not recommended [I]: the pastel Gate 17 world and model-led slides as concept heroes (they clash with the Phase 05 direction and carry rights risk); gendered "pentru ea / pentru el" framing (it contradicts unisex).

---

## 8. Image-use and permission considerations

No legal conclusions are drawn here. These are flags for the owner and, eventually, for Morph.

- **Identifiable people** (models, guests, participants, creators) appear in: C02 Disumano; C07 Gate 17 banner and event gallery; C16 Primitivo slide 3 (partly); C18 Morph Friday; C21 HNY; C22 LE slide; C28 `your-next-form-3`; C29 workshop slide and images 1–2; C10 creator videos and posts (Cristian Pandia, Simina Stroe, "Antonia"); the third-party reel by `laviniastoicaofficial`. The standing rule applies: not used until the owner explicitly agrees (CLAUDE.md), and the files stay `pending`.
- **Workshop participants** are guests, not models. Consent for campaign use is a separate question from Morph's own blog use.
- **Handwritten names or messages**: the "Don't call her. Tell her with a Morph." lettering is Morph's campaign lettering, not a customer's. The love letters (C22) are Morph-authored texts. No customer handwriting was seen. Gate 17 event photos were not re-inspected for name cards.
- **UGC and testimonials**: the Zeta testimonial (C10) republishes a customer's words; creator reels and TikToks are shared content. Reuse needs the author's consent in addition to Morph's.
- **Third-party photography**: no photographer credits appear anywhere on morphparfum.ro. The blog's "Sursa foto: Morphparfum.ro" is not a photographer credit. Ownership of campaign images (Morph Italy vs the Romanian operator, Luxury Expert Parfum SRL) is unknown [?]; research 01 already notes that the legal relationship was not verified.
- **Text baked into images** (promo mechanics, dates) makes several slides unusable outside their campaign. They are reference only.
- **Possibly stock or generated images** (some blog leads, the 2025 Christmas fireplace) are not brand imagery [I].
- **Instagram post images** were not downloaded. Two `og:image` CDN URLs were returned by WebFetch; they are signed, expiring links and are not recorded as assets.

---

## 9. Evidence gaps and limitations

1. **Instagram is under-indexed**: 5 of about 1,114 RO posts and 6 of about 1,331 IT posts were verified. Highlights, stories and reels grids were inaccessible. The owner could export a post list while logged in (their own session, their decision) for a follow-up pass.
2. **Event facts**: the date, venue and guest list are missing for the Gate 17 launch and the layering workshop.
3. **Missing campaign terms**: YNF pre-launch T&C (the link points to the general terms); the Naughty or Nice TikTok contest rules; the distribution of the 2026 150 RON vouchers; the tote bag and Mystery Set mechanics beyond the image text.
4. **Conflicts recorded, not resolved**:
   - Naughty/Nice product lists (pages vs blog);
   - Primitivo year (RO sale Sep 2025 vs Fragrantica 2026);
   - Carbonnel vs Carbonell;
   - About says Luxury has 13 references and Les Exclusifs 8 (the Phase 05.5 content map §4 recorded these the other way round; the About text read on 2026-09-25 says Luxury 13, Les Exclusifs 8);
   - "once a year" LE cream sets vs sets still sold in February.
5. **Dates**: media upload and product creation dates are proxies. YouTube upload dates include at least one bulk upload (2025-03-19).
6. **Third-party sources**: Fragrantica and Parfumo returned 403, so their data is snippet-level [T, SN]. No Romanian press coverage of Morph campaigns was found in the queries run. The Jovoy Paris interview video and the ShoppingMap.it interview (2020) with Andrea Angelino exist [SN] but were not watched.
7. **The international site** (BigCommerce) has no blog or campaign pages. Its hero slider was the only campaign surface found. The Italian store locator failed to load.
8. **Images were viewed at contact-sheet size.** Fine caption text (Summer 2026, panther) is only partly legible.
9. **The English mirror** of morphparfum.ro (`/en/`) was not audited separately; the RO originals were used.

---

## 10. Linked sources

**morphparfum.ro, pages** [F]:
- https://morphparfum.ro/despre-noi
- https://morphparfum.ro/naughty
- https://morphparfum.ro/nice
- https://morphparfum.ro/scrisori-de-dragoste-morph
- https://morphparfum.ro/aplicatia-morph
- https://morphparfum.ro/spring-selection-2026
- https://morphparfum.ro/termeni-voucher-cadou
- https://morphparfum.ro/regulamentul-campaniei-promotionale-voucher-cadou-de-morph-craciun
- https://morphparfum.ro/termeni-si-conditii
- https://morphparfum.ro/abonare-newsletter
- https://morphparfum.ro/gdpr-magazin
- https://morphparfum.ro/reseller
- https://morphparfum.ro/

**morphparfum.ro, posts** [F]:
- https://morphparfum.ro/your-next-form-noua-colectie-morph-dedicata-layering-ului
- https://morphparfum.ro/primul-workshop-morph-dedicat-layering-ului-cum-a-prins-viata-universul-your-next-form
- https://morphparfum.ro/naughty-or-nice-sezonul-cadourilor-la-morph-parfum
- https://morphparfum.ro/facciamo-lamore-celebreaza-dragostea-cu-morph-de-valentines-day
- https://morphparfum.ro/morph-points-romania-programul-de-fidelitate-care-te-rasplateste-la-fiecare-comanda
- https://morphparfum.ro/cadouri-de-valentines-day-pentru-el-si-ea-parfumuri-de-lux-pentru-o-dragoste-aromata
- https://morphparfum.ro/idei-de-cadouri-de-craciun-40-idei-pentru-a-crea-amintiri-deosebite
- https://morphparfum.ro/parfumuri-de-toamna
- https://morphparfum.ro/parfum-cadou-8-martie
- https://morphparfum.ro/cadou-8-martie-mama-iubita-parfum

**morphparfum.ro, APIs** [F]:
- https://morphparfum.ro/sitemap_index.xml
- https://morphparfum.ro/wp-json/wp/v2/posts
- https://morphparfum.ro/wp-json/wp/v2/pages
- https://morphparfum.ro/wp-json/wp/v2/media
- https://morphparfum.ro/wp-json/wp/v2/product
- https://morphparfum.ro/wp-json/wc/store/v1/products
- Media files are cited by path under `https://morphparfum.ro/wp-content/uploads/` (a base path; not browsable)

**International** [F]:
- https://morphparfum.com/
- https://en.morphparfum.com/
- https://en.morphparfum.com/maison/
- https://en.morphparfum.com/nose-perfumer/
- https://en.morphparfum.com/sitemap.php

**Social, official** (verification level in brackets):
- Instagram RO https://www.instagram.com/morphparfumromania/ (login wall) and IT https://www.instagram.com/morphparfum/ (login wall); posts listed in §6.2 [WF].
- TikTok https://www.tiktok.com/@morphparfumro, video 7424832849078963489 [OE].
- YouTube https://www.youtube.com/@MorphParfumRomania, feed https://www.youtube.com/feeds/videos.xml?channel_id=UCST0MZLc9P7GT4OvkTpiS-w [OE].
- Facebook https://www.facebook.com/morphromania/ and https://www.facebook.com/morphromania/videos/bamboo-limitededition-morphparfum-morphparfumromania/529666590962746/ [WF, hashtags only]; other video titles [SN].
- LinkedIn https://www.linkedin.com/company/morph-parfum-romania/ (existence only).
- App Store https://apps.apple.com/ro/app/morph-parfum-romania/id1524253859 [SN].

**Third party** [T, SN unless noted]:
- https://www.fragrantica.com/designers/Morph.html (403)
- https://www.fragrantica.com/perfume/Morph/Gate-17-98061.html
- https://www.fragrantica.com/perfume/Morph/Tonkatonic-90868.html
- https://www.fragrantica.com/perfume/Morph/Disumano-76559.html
- https://www.fragrantica.com/perfume/Morph/Primitivo-127086.html
- https://www.fragrantica.com/news/Morph-Primitivo-The-Call-of-the-Ancestors-Naivete-and-Wine-24640.html (403)
- https://www.parfumo.com/Perfumes/Morph/gate-17 (403 on the brand page)
- https://www.instagram.com/reel/DQRFyBejDmG/ (third-party creator, WF)
- https://www.youtube.com/watch?v=b0hq-rrUR-0 (ShoppingMap.it meets Andrea Angelino)
- https://www.facebook.com/jovoyparfumsrares/videos/on-air-fran%C3%A7ois-h%C3%A9nin-rencontre-andrea-angelino-fondateur-de-morph-parfum-une-ma/1113684893547051/ (Jovoy: François Hénin meets Andrea Angelino)
- https://kafkaesqueblog.com/tag/morph-parfum/
