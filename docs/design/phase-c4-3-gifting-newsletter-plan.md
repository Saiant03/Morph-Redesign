# Phase C4.3a — Gifting and newsletter plan

Documentation only. No page, code, asset, navigation or form was changed. This plan is for the owner's review before C4.3b.

Inputs: `CLAUDE.md`, `docs/research/morph-romania-campaign-archive.md` (C4.0), `phase-05-5-content-opportunity-map.md` §7–8, `phase-05-5-creative-upgrade-plan.md` §14.3 and §16, the C4.1 and C4.2 documents, the current code (`app/cadouri/page.tsx`, `lib/nav.ts`, `components/CartDrawer.tsx`, `components/PurchaseBlock.tsx`, `components/Footer.tsx`, `data/catalog.json`), and a new pass over morphparfum.ro and its Store API on **2026-09-25**.

Labels: **[F]** verified on the date given; **[S]** snapshot-dependent (price or stock, `data/catalog.json`, 2026-09-24, rechecked against the live API on 2026-09-25); **[C]** proposed concept copy, not Morph wording; **[?]** not verifiable from public sources.

Skills used: `impeccable` 4.3.1 (the `shape` brief structure only; its launcher asks for a PRODUCT.md via `init`, which was not run because this phase writes no project files beyond this plan and `docs/design/` is the design authority); `ui-ux-pro-max` (one targeted UX query on form feedback). Impeccable was not updated.

---

## 1. Current experience audit

### 1.1 `/cadouri` today (commit `150daa0`)

Order on the page: head → "După buget" list → "Dacă știi parfumul" (3 bestseller bottles + gift-box note) → "Dacă nu știi încă" (Discovery Travel, sample sets, Travel 2×8 ml) → "O surpriză" (Your Next Form, `BlindPair`, night band) → "Gift card Morph" (walnut band, three facts, link out).

What already works:
- The three intents (know the scent / don't know / let them choose) are the right spine. They match research 06 and plan §14.3.
- Every price and stock value comes from the snapshot through `lib/catalog.ts`. Nothing is hard-typed except the gift box (below).
- Products are added to the cart in place; sold-out items say "Stoc epuizat" instead of disappearing.
- The walnut band for the gift card and the night band for Your Next Form fit the Phase 05 material system.
- All internal anchors resolve: `#sticla`, `#descoperire`, `#card`, `/descopera#travel`, `/descopera#incearca`, `/parfumuri/corp#coffret`, `/layering/your-next-form`. The one outbound link (`/gift-card-morph-parfum`) returns 200. **No broken path was found.**

Problems:
1. **The page opens with a price list, not with the buyer's question.** "După buget" is the first thing on the page, before the visitor has said whether they know the scent. Its rows mix formats (one row joins Travel and Your Next Form because both cost 230 lei).
2. **Coffret is missing.** Morph's own home page calls these "Seturi Morph cadou … coffret-uri de lux, frumos ambalate" [F], and the 2025 slide called them "CADOUL PERFECT" [F, C17]. In the concept they live only at `/parfumuri/corp#coffret` and in the Parfumuri nav panel. `/cadouri` does not mention them.
3. **Gift-card facts are incomplete and one reason is stale.** The page shows three facts and says the amounts "nu fac parte din instantaneu". The live product now publishes five fixed values, and two of its restrictions are missing: the card is **used** only online as well as bought online, and it cannot be returned, refunded or cancelled (§2).
4. **The Your Next Form copy paraphrases Morph.** "Nici cel care dăruiește, nici cel care primește nu știe ce e înăuntru" is concept wording. Morph's own sentence is available and more exact (§2): the buyer does know the state and its notes; only the identity of the two perfumes is hidden.
5. **Gift box handling does not match Morph.**
   - The price `20` is hard-coded in `app/cadouri/page.tsx` and `components/PurchaseBlock.tsx`, although `giftBox` exists in the snapshot.
   - The cart drawer offers "Cutie cadou" for any non-empty cart. On morphparfum.ro the checkbox appears only on some product pages (§2); it does not appear on Your Next Form, Coffret or Discovery Travel 24.
   - Every box shares the cart key `cutie`. Two boxed bottles become one line with quantity 2, and unticking the drawer checkbox removes all of them.
6. **No route to the Finder** for a buyer who has a hunch about the recipient.
7. **The lede states concept copy as a Morph fact** ("Morph are câte un format pentru fiecare grad de certitudine").
8. **No newsletter entry anywhere in the concept.** The footer has no newsletter item. Morph has a page, a menu item and a footer form (§2).

### 1.2 Other gifting paths in the concept

| Path | Where | State | Overlap / note |
|---|---|---|---|
| Nav "Cadouri" panel | `lib/nav.ts` | 4 anchors on `/cadouri`; "După buget" first | mirrors the current page order |
| Nav "Parfumuri → Seturi" | `lib/nav.ts` | Coffret, Travel Editions, Mostre și Discovery, Your Next Form | same products as `/cadouri` §2–3, grouped by product type; not broken, but a gift buyer who starts there never meets the gift card |
| Coffret shelf | `/parfumuri/corp#coffret` | walnut room, stock per box, one gift-box sentence + gift-card link | the only place Coffret is shown |
| Travel, samples, Discovery | `/descopera#incearca` | full list with add-to-cart | framed as "try before the bottle" for oneself; `/cadouri` repeats a subset |
| Your Next Form | `/layering/your-next-form` | 12 states, only the chosen set rendered | `/cadouri` links there correctly |
| Gift box | PDP `PurchaseBlock`, cart drawer | see problem 5 | |
| Gift card | `/cadouri#card` → morphparfum.ro | link out | correct choice; the concept cannot sell it |
| Footer | "Cadouri și gift card" → `/cadouri` | works | |
| Search | "Cadouri", "Coffret" entries | work | |
| Finder result | `/descopera/finder/rezultat` | shows travel availability and `TryOffer` | no gift framing (correct) |

---

## 2. Verified facts and dated sources

All checked **2026-09-25** unless stated. Prices in lei, including VAT, as displayed.

### 2.1 Gift card — https://morphparfum.ro/gift-card-morph-parfum (+ Store API `?slug=gift-card-morph-parfum`)

| Fact | Official wording or value |
|---|---|
| Values | Five fixed amounts, "Alege suma": **230 · 360 · 690 · 790 · 1.100 lei** (API type `pw-gift-card`, 5 variations) [F] |
| Form fields | "Adresă e-mail" (the recipient; several addresses may be comma-separated, "1 pentru fiecare destinatar"), "De la", "Mesaj (opțional)" with "500 caractere disponibile" [F]. No delivery-date field was seen [F]. |
| Delivery | "Cardul Cadou Morph Parfum poate fi achiziționat și utilizat exclusiv online, fiind livrat electronic după achiziție. Destinatarul va primi un e-mail cu un atașament ce conține toate detaliile cardului, inclusiv codul alfanumeric, necesar pentru utilizare la finalizarea comenzii." [F] |
| Validity | "valabil timp de 180 de zile de la data emiterii" [F] |
| Use | "valoarea cardului va fi dedusă automat din totalul coșului de cumpărături" [F] |
| Restrictions | "nu poate fi returnat, rambursat sau anulat"; "nu este disponibil pentru achiziție cu plata ramburs" [F] |
| Not stated [?] | partial use and remaining balance; use in the Morph app; use in the Bucharest shop (the wording "utilizat exclusiv online" implies no, but the shop is not named); whether "emiterii" means purchase or sending |

### 2.2 Gift box — https://morphparfum.ro/gift-box (+ API `?slug=gift-box`)

- Product "GIFT BOX", **20 lei**, in stock, simple product, no description [F][S]. The page carries `noindex` and shows no add-to-cart button [F]; it is sold through a PDP checkbox.
- PDP checkbox label: **"Cutie cadou (+20 lei)"** [F].
- Checkbox present on (checked 2026-09-25): 100 ml perfume (`/morph-zeta-parfum-100ml`), Travel 2×8 ml (`/set-travel-morph-zeta`), sample set (`/morph-set-esantioane-luxury-collection`), shower gel (`/morph-zeta-gel-de-dus-200-ml`) [F].
- Checkbox absent on: Your Next Form (`/set-layering-parfum-morph-limitless-2x8ml`), perfume + cream set (`/morph-set-zeta`), perfume + gel set (`/morph-zeta-set-parfum-si-gel-de-dus`), Discovery Travel 24 (`/set-mini-parfumuri-morph-discovery-travel-24-parfumuri-8ml`) [F]. Body creams were not checked [?].
- Image: `2025/12/gift-box.avif`, a white box with the gold MORPH logo on white; already local as `public/morph/gift-box-0.avif` [F, viewed].
- Not stated [?]: whether one box holds one item or several; what the box contains; any gift message or gift receipt.

### 2.3 Products relevant to gifting — Store API, 105 products

The live API matched the snapshot on every slug on 2026-09-25: no price or stock difference [F]. All figures below are **[S]** and must be re-read at build time.

| Format | Price | Stock | Official description (key line) |
|---|---|---|---|
| Perfume 100 ml | Luxury 690; Les Exclusifs 790; Ice 790 | 24 of 26 in stock (Malaga and Arles out) | — |
| Travel 2×8 ml (single scent) | 230 | 12 scents, all in stock | "Perfect pentru testare, folosire zilnică sau ca idee de cadou rafinat." (Zeta) [F] |
| Your Next Form 2×8 ml | 230 | 12 of 12 in stock | "Fiind un blind set, identitatea parfumurilor este dezvăluită doar la deschiderea cutiei, iar instrucțiunile complete de layering și ordinea de aplicare sunt incluse în interior." (Limitless) [F] |
| Sample set Luxury (2,5 ml) | 260 | in stock | "o gamă de 12 parfumuri … 2,5 ml" [F]; the list names Antigua Bay, not Arles |
| Sample set Les Exclusifs & Ice (2,5 ml) | 260 | in stock | says "12 parfumuri" but lists 11; Gate 17 and Primitivo are not named [F] |
| Discovery Travel 24 × 8 ml | 1.250 | in stock | "adună toate parfumurile casei … o variantă practică pentru cei care vor varietate sau un cadou deosebit" [F]; 24 vs the 26 perfumes in the API [?] |
| Discovery Travel 22 × 8 ml | 1.100 | out | older set |
| Blind set 6 samples + 1 travel | 250 | out | — |
| Eșantioane (older set) | 200 | out | — |
| Coffret parfum + gel de duș | 790–870 | 8 of 8 in stock | "un set cadou premium potrivit pentru Crăciun sau pentru orice moment…" (Zeta) [F] |
| Coffret parfum + cremă de corp | 840–950 | 4 of 11 in stock (Gate 17, Tonkatonic, Zeta, Indomable) | About: produced "exclusiv o dată pe an, în preajma sărbătorilor de iarnă" [F, C4.0 C17] |
| Shower gel 200 ml / body cream 200 ml | 240 / 310–360 | see snapshot | gift box offered on the gel PDP |

Room fragrances (Burlat, Fil Rouge: 8 products, 190–1.100 lei, Fil Rouge and the Burlat spray out of stock) are in the API but not in the concept snapshot. They are **not** part of this plan (§6).

### 2.4 Delivery, shipping, returns

- "Transport gratuit · Comenzi peste 750 RON": trust bar on the PDP, gift-card and gift-box pages [F]. Matches `FREE_SHIPPING = 750`.
- Terms (`/termeni-si-conditii`): deliveries to Romania and the EEA; no deliveries on Saturday or Sunday; delivery may take longer around holidays and Black Friday; "Taxele de livrare sunt precizate în pagina de comandă" [F]. **No delivery time is published** [F].
- Online-order service: L–V 09:00–17:00, S–D închis (footer) [F].
- Returns (`/politica-de-retur`): 14 days, only unopened and sealed [F]. **No gift receipt, exchange by the recipient or gift return procedure is published** [F].

### 2.5 Newsletter — https://morphparfum.ro/abonare-newsletter

- Page copy [F]: "Abonează-te la newsletter-ul" · "Află înaintea tuturor ultimele noutăți, campaniile în derulare, dar și beneficiile exclusive special create pentru membrii comunității Morph." · "Poți avea acces în premieră la" · **Beneficii Exclusive · Produse în trend · Noutăți · Campanii speciale** · "Completează corect adresa de E-mail și apasă butonul “Abonare”!" · "Vă puteți dezabona oricând doriți. Pentru mai multe detalii, vă rugăm să consultați Politica noastră de confidențialitate."
- Footer form on every page: "Abonează-te la newsletterul MORPH" [F]. Menu: "Devino membru → Abonare newsletter" [F].
- Form mechanics [F, from the page markup]: a Breakdance form ("Abonare newsletter") posting by AJAX to `https://morphparfum.ro/wp-admin/admin-ajax.php`. Fields: one required e-mail field and one checkbox whose label is the consent sentence "Prin trimitere, vă exprimați acordul cu privire la prelucrarea datelor personale, în scopul prelucrării și trimiterii ofertelor de marketing." The checkbox is **not** marked `required`. Configured success message: "Mulțumim! Te-ai înscris cu succes la newsletterul nostru..". reCAPTCHA and honeypot are disabled.
- Not visible [?]: the sending platform behind the form, whether a double opt-in e-mail follows, the frequency.
- **No incentive is stated** (no discount, sample or welcome voucher) [F].
- Privacy policy (`/politica-de-confidentialitate`): operator Luxury Expert Parfum SRL; marketing only with prior consent or the existing-customer exception; unsubscribe through the link in each e-mail or `confidentialitate@morphparfum.ro` [F].

### 2.6 Current promotions that touch gifting

- **"Voucher cadou" campaign** (`/termeni-voucher-cadou`, published 2026-08-21) is **active today**: valid 28 Aug–29 Oct 2026, online only, 150 RON per voucher, single use, eligible cart must contain a 100 ml perfume or a Limited Edition Set, minimum 690 RON, no stacking with loyalty points or free shipping [F]. **How vouchers are distributed is not stated** [?, C4.0 C31].
- No gift campaign on the home slider on 2026-09-25: the slides are the three Your Next Form images and the Summer campaign 2026 [F].

---

## 3. Seasonal and campaign material (C4.0), sorted

| Material | Status on 2026-09-25 | Use in the concept |
|---|---|---|
| C31 Voucher cadou 150 RON | **active**, distribution unknown | **Exclude.** It is a discount, not a gift product. Its name is easily confused with the gift card ("card cadou"). Showing it would promote a current offer whose terms the concept does not control. |
| C08 Christmas voucher draw 2024, C12 Summer Duo 2025, C18 Morph Friday 2025, C20 Naughty or Nice 2025 mechanics, C22 Facciamo l'Amore mechanics, C27 Mystery Set weekend 2026, C28 YNF pre-launch gifts | expired | **Exclude as offers.** Never shown as an incentive. |
| C17 Limited Edition sets as "CADOUL PERFECT", "un ritual complet cu parfum și cremă sau parfum și gel de duș" | the products still exist (Coffret) | **Use the wording** as a Morph quote attributed to the 2025 slide, or the current home line "Seturi Morph cadou" (preferred: it is live). |
| C20 Naughty or Nice character axis | expired campaign; two official lists disagree | **Defer.** Reusable as an editorial idea only after the lists are reconciled; not in C4.3b. |
| C22 Facciamo l'Amore love letters (three ready texts) | expired | **Defer.** Morph's texts belong to that campaign; no gift-message service is published for physical orders. |
| Blog gift guides (Crăciun 2024, Valentine's 2025, 8 Martie 2026) | old SEO posts, often gendered | **Exclude** from the page; they stay on Morph's blog. |
| C13 "Your Next Obsession" | recurring tagline | Not needed on `/cadouri`. |

---

## 4. Gifting decision paths and proposed page structure

### 4.1 Brief (impeccable `shape` structure)

- **Job and audience.** Someone buying for another person, often without knowing their fragrance, sometimes with a date in mind. Mode: *Operate* with a *Persuade* surface: they must leave with the right format and no false expectation.
- **Outcome.** The visitor chooses one of four formats: a bottle, an exploratory format, a Coffret or a gift card. They know the price and what the recipient receives, and they are told nothing Morph does not publish (no delivery date, no exchange, no message on physical orders).
- **Direction.** Inside the Phase 05 / Phase A world: stone reading surface, walnut for objects that are gifts (Coffret, gift card), night for the blind set. One lit object per path. No new colors, no seasonal decoration.
- **Boundaries.** One route (`/cadouri`), no checkout, no form, no seasonal chapter, no room fragrance.

### 4.2 Where the buyer starts

The page opens with **one question and three answers**, as plain links to anchors (not a quiz, no state stored):

> **Cât de bine știi parfumul cuiva?** [C]
> - *Știu ce poartă* → the bottle (and its Coffret, if one exists)
> - *Am o bănuială sau nu știu deloc* → formats to explore; the Finder
> - *Prefer să aleagă singur* → the gift card

Each answer is one object on a shelf, lit like the vitrine (bottle · open sample box · gift card), with its price range under it. This replaces the budget list as the opening. The budget index moves to the end as a reference.

### 4.3 Proposed order

1. **Head.** Title "Cadouri". New lede [C], plainly concept copy, e.g. "Un parfum e greu de ghicit pentru altcineva. Alege după cât de bine îl cunoști." Meta line: prices and stock from the Morph catalog snapshot, with its date.
2. **The three answers** (§4.2).
3. **"Dacă știi ce poartă"** (`#sticla`, stone).
   - Keep the three bottles (bestseller mix) and add one link "Caută parfumul în vitrină" → `/parfumuri`.
   - Gift box as a fact line with its image at small scale: "Cutie cadou Morph, +20 lei, se bifează pe pagina produsului" (price from `giftBox`).
   - **Coffret sub-block** on walnut: Morph's line "Seturi Morph cadou" (quoted, sourced), the gel and cream counts in stock, price ranges from data, up to three in-stock boxes, and "Toate seturile" → `/parfumuri/corp#coffret`. The concept does not rebuild the shelf; `/parfumuri/corp` keeps it.
4. **"Dacă nu știi încă"** (`#descoperire`, stone), ordered by commitment rather than price:
   - *Ai o bănuială*: Finder link (§4.4), then Travel 2×8 ml (12 scents, 230 lei) → `/descopera#travel`.
   - *Nu știi deloc*: the two sample sets (260 lei, 12 × 2,5 ml each, as Morph states), Discovery Travel 24 × 8 ml (1.250 lei).
   - Copy states the format and volume only. It does not say "toate parfumurile" (24 vs 26) and does not list the perfumes in each sample set (Morph's lists conflict, §2.3).
5. **"O surpriză"** (`#surpriza`, night): Your Next Form, `BlindPair`, with Morph's blind-set sentence quoted instead of the paraphrase. States, price and stock from data. → `/layering/your-next-form`.
6. **"Gift card Morph"** (`#card`, walnut):
   - Values as a single typographic row: 230 · 360 · 690 · 790 · 1.100 lei, from the snapshot (§7, data change).
   - Facts, Morph's wording, sourced: "achiziționat și utilizat exclusiv online"; delivered by e-mail to the address you enter, with "De la" and an optional message of up to 500 characters; valid 180 days from issue; cannot be returned, refunded or cancelled; no cash-on-delivery.
   - One button: "Cumpără gift card-ul pe morphparfum.ro" (outbound, marked external). Nothing is sold in the concept.
7. **"După buget"** (`#buget`, stone, compact index): one row per real price point, generated from data, each with its format and a link to its section. It includes the gift-card values and the Coffret ranges, and it keeps Travel and Your Next Form on separate rows.
8. **Practical line** (micro text): free delivery from 750 lei (as displayed by Morph); no weekend deliveries and possible delays around holidays (Morph's terms); link "Livrare și retur pe morphparfum.ro". **No delivery date or "arrives by" promise.**

### 4.4 Finder link

- Placement: first item under "Ai o bănuială" in section 4. Not in the head and not in the three answers.
- Copy [C]: "Dacă știi cum e persoana, dar nu ce poartă, poți răspunde la întrebările Fragrance Finder gândindu-te la ea. Rezultatul e un punct de plecare; un travel de 2×8 ml îl verifică pe piele."
- Framing rules:
  - It is navigation inside the concept. It is never called a gift service, a consultation or a Morph gift advisor.
  - The Finder's questions stay as they are (Morph's logic, second person). No "for someone else" mode is added in C4.3b, because that would mean rewriting Morph's questions.
  - No "send the result by e-mail" (no real sending exists).

### 4.5 States and ranges

- Stock: every product block reads `inStock`. A sold-out Coffret is not shown in the three picks. If no cream Coffret is in stock, the line says so from data. If all 12 YNF sets sell out, the band says "Stoc epuizat" and still links to the page.
- Gift-card values come from data. If the snapshot has no variations, the row falls back to the range, and never to invented steps.
- No JavaScript is needed: all paths are anchors and links; add-to-cart stays as today.
- Motion: the existing `Reveal` and the vitrine light only. No new transition.

---

## 5. Candidate products and image assets, with provenance

| Asset | File (local) | Source | Status | Use |
|---|---|---|---|---|
| Gift box | `public/morph/gift-box-0.avif` | Store API image `2025/12/gift-box.avif` | local, packshot | fact line, small niche |
| Gift card graphic | `public/morph/gift-card-morph-parfum-0.avif` | `2022/06/GiftCard_Morph.avif` | local | **Verify first**: a flat "MORPH GIFT CARD" graphic that does not fit the lit-object system. Recommended: a typographic treatment (values on walnut) and no image. |
| Coffret packshots (19) | `public/morph/morph-*-set-*-0.avif`, `morph_set_*-0.avif` | Store API | local | Coffret sub-block (up to 3) |
| Discovery Travel 24 | `set-mini-parfumuri-morph-discovery-travel-24-parfumuri-8ml-0.avif` | Store API | local | section 4 |
| Sample sets | `morph-set-esantioane-*-0.webp` | Store API | local | section 4 |
| Travel Zeta | `set-travel-morph-zeta-0.avif` | Store API | local | section 4 (as today) |
| Your Next Form boxes | `public/morph/campaign/ynf-boxes.avif` | home slider `2026/07/layering-slide-2.avif` | `concept` in `data/assets.json` | optional behind `BlindPair` |
| YNF box in hand | `campaign/ynf-box-in-hand.avif` | `workshop-morph-4` | `concept`, hands only | optional |
| Bottles (bestseller mix) | packshots via `ProductVisual` | Store API | local | section 3 |

Excluded images:
- Morph Friday, Happy New Year 2026 and "editii-limitate": identifiable models.
- Naughty or Nice slides, "scrisori-cadou" payphone and the Mystery Set popup: seasonal, with offer text or lettering in the image.
- The Limited Edition 2025 slides: "NOU" and campaign text in the image. **Verify first** if the owner wants a Coffret atmosphere image.
- Workshop 1, 2, slide and 3: pending, or a participant's handwritten name.
- Gate 17 event: pending.

No new download is needed for C4.3b.

---

## 6. Newsletter: content and a technically honest signup

### 6.1 Decision: link to Morph's signup; no form in the concept

Reasons:
- The only real destination is Morph's own form endpoint on morphparfum.ro. The concept has no authorization to submit addresses to it, and posting from another origin to a WordPress AJAX handler is not a supported integration.
- A field that accepts an address and then shows a success state would simulate a subscription. A field that goes nowhere would collect nothing but still invite personal data. Both are excluded.
- UX rule (ui-ux-pro-max, Forms / Submit Feedback, severity High): a form must report a real success or failure. That cannot be met without a real destination.
- An integrated form becomes possible only in production, on Morph's stack, with its platform and consent flow. That is outside the concept.

### 6.2 Content

- **Label.** Default: Morph's own term, **"Newsletter Morph"**. "Scrisoarea Morph" stays a proposal for the owner (Q1) and is not used until approved.
- **Copy.**
  - The heading may be concept copy [C], e.g. "Află primul." Every promise is Morph's: "ultimele noutăți, campaniile în derulare, dar și beneficiile exclusive special create pentru membrii comunității Morph" and the four items Beneficii exclusive · Produse în trend · Noutăți · Campanii speciale, quoted and attributed.
  - No discount, sample, welcome voucher, frequency or "first access" beyond Morph's own "acces în premieră".
- **Action.** One link, "Abonează-te pe morphparfum.ro", to `https://morphparfum.ro/abonare-newsletter`, marked external. Under it, in micro text, Morph's unsubscribe sentence and a link to its privacy policy.
- **Placement** (recommended):
  1. A compact band at the top of the footer, sitewide (the footer already carries the concept notice).
  2. Nothing extra on `/cadouri`, because the page already ends with the budget index and practical line.
  3. No modal, no pop-up, and no Finder-result prompt.
- **Material.** Night footer. The "paper" card from plan §16 is optional and needs no new asset (`paper.webp` exists).

---

## 7. Use now / verify first / exclude

| Use now | Verify first | Exclude |
|---|---|---|
| Gift-card values 230–1.100 (5 steps), e-mail delivery, "De la" + optional message ≤500 chars, 180 days, online purchase and use, no return/refund/cancel, no COD | Gift card partial use / balance; use in the app or in the shop | Any newsletter incentive, discount, sample or welcome voucher |
| Gift box 20 lei, "Cutie cadou (+20 lei)", on 100 ml / travel / sample sets / gel | Gift box on body creams; what one box holds; gift message or gift receipt | "Voucher cadou" 150 RON (active, distribution unknown) |
| Coffret as Morph's "Seturi Morph cadou", stock from data | The gift-card graphic as an image | All expired seasonal mechanics (§3) |
| YNF blind-set sentence (Morph's) | "Scrisoarea Morph" as a label | Delivery dates, "arrives by", holiday cut-offs |
| Sample sets 12 × 2,5 ml, Discovery 24 × 8 ml, Travel 2×8 ml | Discovery "toate parfumurile" (24 vs 26); sample-set lists | Gift exchange, gift receipt or return by the recipient |
| Free delivery from 750 lei (as displayed); no weekend delivery | Free shipping via the Morph app after February 2026 (C23) | An integrated or simulated newsletter form |
| Link to Morph's newsletter page, Morph's promise and unsubscribe wording | Double opt-in, sending platform | A Finder "gift mode" or e-mailed result |
| Finder link as concept navigation | | Burlat and Fil Rouge on `/cadouri` (unresolved IA) |
| | | Identifiable people; images with offer text |

---

## 8. Proposed scope for C4.3b

In scope, and nothing else:

1. **`app/cadouri/page.tsx` + `cadouri.module.css`**: the structure in §4.3, reusing existing components (`ProductVisual`, `Niche`, `AddToCart`, `BlindPair`, `Ext`/`MorphQuote`). No new component unless the three-answer shelf needs one small presentational one.
2. **Data**: `scripts/snapshot.mjs` stores the gift card's variation values (`gift[].values`). `npm run snapshot` is re-run; the diff must show only that field plus any real price or stock change, reported. No room fragrance is added to the snapshot.
3. **Gift box consistency**:
   - Use `giftBox.price` instead of the hard-coded `20` in `app/cadouri/page.tsx` and `PurchaseBlock.tsx`.
   - The cart drawer offers the box only when the cart holds an item type Morph offers it on (100 ml, travel, sample set, gel).
   - One box line per boxed item, so unticking one does not remove the others. If this proves larger than a local change, it is reported and left for later.
4. **Footer newsletter band**: `components/Footer.tsx` + CSS, link-out only, per §6.
5. **Nav**: the Cadouri panel labels follow the new order (`Știu ce poartă`, `Nu știu încă`, `O surpriză`, `Gift card`, `După buget`). No change to other nav items.
6. **Smoke**: checks that `/cadouri` shows the five gift-card values from data, the Finder link, the Coffret sub-block and the external newsletter link; that no `<form>` or `input[type=email]` exists in the footer or on `/cadouri`; that "voucher" does not appear on `/cadouri`.
7. **Docs**: `docs/design/phase-c4-3b-gifting.md` and one line in `CLAUDE.md`.

Out of scope: checkout, gift messages on physical orders, any form, seasonal chapters, Burlat and Fil Rouge, Finder question changes, Morph Points, the app, new photography or downloads.

---

## 9. Questions for the owner

1. **Newsletter label**: keep Morph's "Newsletter Morph", or approve "Scrisoarea Morph" as a concept label?
2. **Newsletter placement**: sitewide footer band only (recommended), or also a line at the end of `/cadouri` and `/jurnal`?
3. **Coffret on `/cadouri`**: a sub-block with up to three in-stock boxes plus a link (recommended), or only a link to `/parfumuri/corp#coffret`?
4. **Active "Voucher cadou" (150 RON, until 29 Oct 2026)**: confirm that it stays out of the concept.
5. **Finder sentence** in §4.4: approve the wording, or drop the Finder link from `/cadouri`?
6. **Gift card visual**: typographic values on walnut without Morph's card graphic (recommended), or show the graphic?
7. **Budget index** at the end (recommended), or keep it at the top as today?
8. **Seasonal chapters**: none in C4.3b. Should a seasonal mechanism be planned later, and if so, only from live Morph campaigns?
9. **Room fragrances (Burlat, Fil Rouge)**: stay out of gifting until their place in the IA is decided?

---

## 10. Source list (checked 2026-09-25)

- https://morphparfum.ro/ (home: menu, slides, "Seturi Morph cadou")
- https://morphparfum.ro/gift-card-morph-parfum
- https://morphparfum.ro/gift-box
- https://morphparfum.ro/morph-zeta-parfum-100ml, /set-travel-morph-zeta, /set-layering-parfum-morph-limitless-2x8ml, /morph-set-zeta, /morph-zeta-set-parfum-si-gel-de-dus, /morph-set-esantioane-luxury-collection, /set-mini-parfumuri-morph-discovery-travel-24-parfumuri-8ml, /morph-zeta-gel-de-dus-200-ml (gift-box checkbox)
- https://morphparfum.ro/wp-json/wc/store/v1/products (105 products, pages 1–2; `?slug=gift-card-morph-parfum`, `?slug=gift-box`)
- https://morphparfum.ro/abonare-newsletter (copy and form markup)
- https://morphparfum.ro/politica-de-confidentialitate
- https://morphparfum.ro/termeni-si-conditii
- https://morphparfum.ro/politica-de-retur
- https://morphparfum.ro/termeni-voucher-cadou
- Earlier sources relied on: `docs/research/morph-romania-campaign-archive.md` (C4.0, 2026-09-25), `docs/design/phase-05-5-content-opportunity-map.md` (2026-09-24)
