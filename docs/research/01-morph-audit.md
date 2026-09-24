# 01 — Morph audit (morphparfum.ro)

Audit date: 2026-09-24. Method: rendered pages in Chromium (Playwright, desktop 1440px + iPhone 13 emulation), raw HTML inspection, sitemaps, the public WooCommerce Store API (`/wp-json/wc/store/v1/products`, 105 visible products), and the source of the public quiz script. Screenshots and raw extracts live outside the repo (reproducible with `.claude/skills/site-capture`).

Labels: **[F]** observed fact, **[I]** interpretation, **[R]** design recommendation. Load times were measured through a proxy + request interception and are **not** valid performance numbers; request and script counts are.

---

## 1. Brand positioning

- [F] Italian niche house, "fondat în 2002 la Napoli de Andrea Angelino" (Despre noi). Founding idea stated on the homepage: olfactory **synesthesia**, "Fiecare creație Morph îmbină mirosuri, culori și emoții".
- [F] morphparfum.ro is the **official Romanian store** ("Magazin oficial"), with a physical boutique, **Casa Morph**, at Piața Alexandru Lahovari nr. 5, București. The Certilogo copy refers to "circuitul oficial Morph Parfum Italia". The legal relationship between the Romanian operator and the Italian brand (distributor, licensee, subsidiary) was not verified.
- [F] Every fragrance is unisex. The price tiers are 690 lei (Luxury, 100 ml) and 790 lei (Les Exclusifs, Ice and some newer references).
- [F] Bottle by Bormioli Luigi; the copy says its twisted form "exprimă ideea de echilibru și mișcare continuă".
- [F] Brand lines in use: "YOUR NEXT FORM", "Identity, layer by layer", and "deviza Morph: evoluție constantă și Metamorfoză prin parfum" (Ice copy).
- [I] The brand already owns three strong ideas (synesthesia, transformation and layering-as-identity), but the site expresses them only in copy, never in the experience.

## 2. Product architecture

- [F] 105 purchasable products in the Store API. Category counts: Parfumuri de nișă 49, Seturi 20, Baie & Corp 18, Set travel 15, Luxury 13, Layering 12, Creme de corp 12, Set parfum+cremă 11, Set parfum+gel 8, Geluri de duș 8, Parfumuri de cameră 8, Les Exclusifs 8, Ice 5, Eșantioane 3.
- [F] Formats: 100 ml bottle (the only full size offered), travel 2×8 ml per scent, layering blind set 2×8 ml (230 lei), collection sample sets (260 lei), Discovery Travel set 22×8 ml (1.250 lei), shower gel 200 ml, body cream 200 ml, perfume+gel and perfume+cream sets, room sprays and diffusers (Burlat, Fil Rouge, 100 ml–1.5 l, with refills), and a gift card.
- [F] Out of stock at audit time (18 SKUs), including the **Discovery Travel set**, the collection sample set "MORPH ESANTIOANE PARFUMURI", "BLIND SET 6 SAMPLES + 1 TRAVEL", most perfume+cream sets and two Luxury perfumes (Malaga, Arles).
- [F] Every product has `review_count: 0`. There are no product-level reviews.
- [F] The rich attribute data already exists per product: top/mid/base notes, type, season, occasion, intensity, longevity, popularity, style and olfactive family ("Încadrare parfum"). Example Zeta: Gourmand, Medie, 8–10 h, Elegant.
- [F] Copy and data contradict each other:
  - concentration is "până la 30%" (home), "15–20%" (Luxury page) and "25–35%" (Despre noi);
  - collection sizes are 13/8/4 (Despre noi), 11/8/6 (quiz config) and 13/8/5 (API);
  - the Discovery set is "24 parfumuri" in the sitemap/URL and 22 in the copy and API;
  - Layering is "12 seturi" in the copy, 9 on the listing and 12 in the API;
  - Zeta is "toamnă și iarnă" in the PDP copy while its attribute also lists Primăvară.
- [I] Product-data governance is a prerequisite for any premium redesign: contradictions like these cost more trust on a luxury site than an average layout does.

## 3. Collections

- [F] There are three collections.
  - **Les Exclusifs**: extrait, "prima colecție", oriental/floral/woody.
  - **Luxury**: Eau de Parfum Intense, "opulență modernă".
  - **Ice**: "cea mai nouă", experimental, "Metamorfoză".
- [F] "Your Next Form" is a fourth line, made only of layering sets.
- [I] The collection names describe concentration and marketing tier rather than an olfactive or emotional world. A shopper cannot predict how a Luxury scent differs from an Ice scent.

## 4. Navigation

- [F] The desktop header has 9 top-level items: Parfumuri ▾, Baie & Corp ▾, Seturi ▾, Layering, Quiz, Devino membru ▾, Gift Card, Informații ▾, Blog, plus search, account and cart icons. Mobile uses a hamburger menu with the same icons.
- [F] The top-level items mix categories, features (Quiz), programs (membership), a single product (Gift Card) and utility content (Informații).
- [F] Parfumuri ▾ contains Luxury, Les Exclusifs, Ice, Parfumuri de cameră and Bestsellers. Seturi ▾ contains the parfum+cremă set, the parfum+gel set, Eșantioane and Mini parfumuri.
- [I] Samples and minis sit under "Seturi", which hides the trial path. Room fragrance sits under "Parfumuri".
- [F] A floating US-flag language toggle (TranslatePress) sits bottom-left on every page.

## 5. Homepage

- [F] Order of sections:
  1. a full-width slider hero (the layering campaign photo, the caption "NEW: YOUR NEXT FORM │ THE LAYERING COLLECTION" and a "DISPONIBILĂ ACUM" CTA);
  2. a carousel of 10 circular category icons;
  3. an H1 "MORPH PARFUM ROMÂNIA" followed by a layering-set carousel;
  4. 4 bestsellers;
  5. a very long SEO text block (Universul Morph, the collections, Experiența completă, CertiLogo, a 6-question FAQ);
  6. the footer.
- [F] The page is 7,198 px tall on desktop and ≈12,000 CSS px on mobile. Roughly the lower 45% is plain text.
- [F] The first mobile visit shows a cookie banner covering ≈70% of the viewport. The hero crops the product.
- [I] The homepage works as a category router plus an SEO container. It does not introduce the brand's world, the three collections or the finder in any visual way. The strongest asset (the campaign photography) appears only in the slider.

## 6. Product listing pages (PLP)

- [F] Each PLP has an H1, breadcrumb, a short SEO intro, a "FILTRARE PRODUSE" button and a sort select. The grid is 3 columns on desktop with 12 per page and numbered pagination. A long SEO article (on the Luxury page, "Cum alegi un parfum de lux în funcție de context", scent-by-context lists) sits below the grid.
- [F] Cards show a packshot on white, the full product name ("Morph Cruda Eau de Parfum Unisex 100 ml"), the price and an "ADAUGĂ ÎN COȘ" button. There is no scent descriptor, family, collection marker, sample/travel option or hover state.
- [F] The filter is WP Grid Builder with 12 facets: note de bază/mijloc/vârf (about 30–50 values each, "+ arată încă 23/33/40"), tip, sezon, ocazie, intensitate, longevitate, popularitate, stil and încadrare. Încadrare has more than 14 values, many used by a single product (Floral-oriental 1, Lemnos-citric 1, Marin-ozonic 1 …).
- [I] The data is deep but the taxonomy is fragmented. Families have no hierarchy, and the note lists are too long to be useful as filters.
- [I] "Popularitate" is an internal merchandising attribute, not a customer need.

## 7. Product detail page (PDP) — sample: Morph Zeta

- [F] Buy box:
  - gallery (bottle + 2 packaging shots), breadcrumb, title and price;
  - social proof "1 produs vândut în ultimele 24 ore";
  - short description and one note per tier (vârf / mijloc / bază);
  - "Cutie cadou (+20 lei)" checkbox and "ADAUGĂ ÎN COȘ";
  - Apple Pay, Google Pay and Stripe Link;
  - 4 trust tiles: Plată securizată, Protecția datelor, Certificat Certilogo 100% original, Transport gratuit peste 750 RON.
- [F] Below the buy box: "DESPRE PRODUS" with long flat sections (a paragraph per note, Sezon și ocazii, Destinație / Utilizator, Descriere, FAQ), then "Produse similare", then "Părerea clienților".
- [F] The PDP is missing:
  - a size choice (100 ml only);
  - a link to the matching travel 2×8 ml or sample;
  - layering pairings;
  - a collection context;
  - a visual intensity/longevity/family display, although the data exists as attributes;
  - product reviews.
- [F] The copy is strong and sensory ("Prima impresie? Cacao fierbinte turnată pe piele…").
- [F] On mobile the first viewport shows only the breadcrumb, the title and the top of the image. Price and CTA are below the fold.
- [F] The page loads ~180 script tags and ~370 requests.
- [F] An H3 "Vrei să te anunțăm când revine în stoc?" is present in the DOM even though the API reports Zeta in stock. It is likely a hidden back-in-stock widget.
- [I] The single 690 lei price is below the 750 RON free-shipping threshold, so a one-bottle Luxury order pays shipping. That creates a natural slot for a travel/sample add-on to cross the threshold.

## 8. Fragrance Finder (Quiz)

- [F] It is a custom plugin (`wp-content/plugins/morph-quiz`) on its own `/quiz` page with a "DESCOPERĂ PARFUMUL CARE TE REPREZINTĂ / ÎNCEPE QUIZ-UL" intro.
- [F] 7 single-choice questions:
  1. Ce prezență vrei să ai?
  2. Ce te reprezintă cel mai bine?
  3. Ce univers olfactiv te atrage?
  4. Unde îl vei purta cel mai des?
  5. Cât de prezent vrei să fie parfumul?
  6. Care este sezonul tău?
  7. Ce experiență cauți? (a collection or "Oricare")
- [F] Logic: a weighted tag match (mood 5, personality 5, olfactive 4, occasion 4, projection 3, season 2, collection 4) over about 24 hand-tagged perfumes. It returns 2 results within the chosen collection, or 3 results from different collections for "Oricare". It pushes a GTM event on completion.
- [F] Each result card shows the collection badge, "Recomandarea principală" / "Alternativa ideală", the image, the name and a "Vezi parfumul" link. There is no price, no reason for the match, no sample/travel CTA, no layering suggestion, no way to save or email the result, and the card never mentions the boutique consultation.
- [I] The logic is a sound base (explicit, explainable tags). The weak part is the result: it ends at a link instead of a decision-support moment (why, try, pair, buy).

## 9. Layering experience

- [F] `/layering` lists the "Your Next Form" blind sets. Each set is 2×8 ml at 230 lei and is named for a state: Limitless, Reckless, Irresistible, Hypnotic, Desired, Mysterious, Unforgettable, Untamed, Magnetic, Fearless, Euphoric, Addictive.
- [F] The PDP copy says "Fiind un blind set, identitatea parfumurilor este dezvăluită doar la deschiderea cutiei". Instructions and application order come inside the box. The copy describes the resulting accord (e.g. Limitless: trandafir, oud, lapte de smochine, tuberoză).
- [F] Supporting content: blog posts on layering technique and a first layering workshop.
- [F] Missing online:
  - a way to layer two full-size scents the customer already owns;
  - any pairing suggestion on perfume PDPs;
  - any link from a set back to its two component perfumes after purchase.
- [I] The blind mechanic is a real, ownable idea (surprise, ritual, "next form"), but the site stops at the box. The online experience of layering does not exist yet.

## 10. Samples / discovery products

- [F] The trial options are two collection sample sets (260 lei; one sold out), per-scent travel 2×8 ml sets, the Discovery Travel 22×8 ml (1.250 lei, sold out) and a "Blind set 6 samples + 1 travel" (sold out).
- [F] Trial products are filed under Seturi and are not linked from PDPs. No credit-back mechanic was observed; the terms were not checked.
- [I] For a 690–790 lei blind purchase online, the trial path is the main conversion lever, and it is currently hidden and partly out of stock.

## 11. Sets

- [F] Perfume+shower gel and perfume+cream sets per scent. The About page describes the cream sets as a once-a-year holiday limited edition. Travel 2×8 sets and layering sets complete the range.
- [I] Seturi mixes gifting bundles, trial formats and layering, three different intents under one label.

## 12. Gift experience

- [F] Gift card: online only, delivered by email, valid 180 days, no cash-on-delivery. Gift box +20 lei on the PDP. Many seasonal gift blog posts (Valentine's, 8 Martie, Crăciun, Paște, Sfânta Maria).
- [F] There is no gift hub, gift finder, gift-by-budget or gift message flow.

## 13. Mobile UX

- [F] The header has a logo, search, account, cart and hamburger. The cookie banner dominates the first view.
- [F] PDP price and CTA sit below the first viewport. The homepage runs ≈12,000 px, mostly single-column text after the product rows.
- [F] The floating language flag overlaps content in the bottom-left.
- [I] Mobile is a stacked desktop, not a designed mobile experience.

## 14. Editorial content

- [F] About 45 Romanian blog posts, mirrored in English. The mix is SEO listicles ("parfumuri femei care atrag bărbații", "ce parfumuri bărbați plac femeilor"), education (concentrations, niche vs designer, pH and scent, how long a perfume lasts), seasonal gifting, brand news (Your Next Form, the workshop, Morph Points) and off-topic skin-care posts (dry/dehydrated skin).
- [I] The gendered SEO posts contradict the unisex positioning. The editorial layer serves search traffic, not the brand.

## 15. Storytelling

- [F] The story exists in text: founder, Naples, synesthesia, Bormioli bottle, "Metamorfoză", "Your Next Form". PDP copy is evocative. No photography, film or interaction carries it. Ingredient provenance (cacao Chuao, migdale Avola) is mentioned in copy only.
- [I] The raw material for storytelling is good; the medium is missing.

## 16. Search / discovery

- [F] There is a header search (Breakdance search form). Discovery happens through category pages, the filter panel, the quiz and bestsellers.
- [I] Search behaviour was not tested in depth. That remains an open item.

## 17. Cart / checkout (visible parts)

- [F] Mini-cart (Breakdance). Stripe payments with Apple Pay, Google Pay and Link on the PDP. UPS live rates plugin. Gift-card rules exclude cash on delivery, which implies COD exists. The online-order service runs L–V 09–17.
- [F] Loyalty: "Devino membru" / Morph Points (YITH Points & Rewards).
- [I] Checkout was not walked through (no test order placed). Payment and courier options need confirmation from Morph.

## 18. Trust signals

- [F] Certilogo authenticity (explained on the homepage and on its own page), a Google-reviews widget ("BUN, pe baza a 159 de recenzii", reviews mostly praising **boutique staff** by name), the physical boutique address and hours, ANPC link, return policy, payment and data tiles, a reseller program.
- [I] The strongest trust asset (human, expert consultation at Casa Morph) is invisible online apart from the reviews.

## 19. Conversion paths

- [F] Home → category → PDP → cart; Home → layering carousel → add to cart; Quiz → result → PDP; Blog → (weak) product links.
- [I] There is no path Quiz → try (sample) → own (bottle) → layer (pair). Each tool is a dead end.

## 20–27. Visual language and UI

- [F] **Logo**: a classical serif wordmark "MORPH" with a calligraphic swash over the M.
- [F] **Typography** (computed styles): body Poppins 300 at 18px, grey rgb(101,99,109); headings Roboto 700 uppercase at 32px; the cookie layer in Noto Sans. That is three unrelated sans families, none connected to the serif logo.
- [F] **Color**: UI in black/white/greys with background rgb(253,252,253). Default link blue rgb(0,144,255) leaks in 128 places. The products are highly saturated: each bottle carries its own juice color (Zeta yellow, Vapor teal, Kolonaki red box, Pure Soul green …).
- [F] **Photography**: packshots on white for the catalog; one art-directed campaign (the layering box in hands on black); packaging shots on the PDP.
- [F] **Spacing / components**: Breakdance defaults, square black buttons with uppercase labels, Swiper carousels, circle category icons, generic trust-tile icons.
- [F] **Motion**: slider transitions and carousels only.
- [F] **Density**: product areas are sparse, text areas dense (long SEO blocks at 18px light grey).
- [I] The visual system is the page builder's, not Morph's. The logo, the bottle geometry and the juice colors are distinctive; the interface ignores all three.

## 28. UX friction (summary)

1. Nine mixed top-level nav items hide the trial path under "Seturi".
2. Filter facets are too many and too flat; family values are fragmented.
3. Cards carry no scent signal, so every comparison needs a PDP visit.
4. PDPs do not offer the travel/sample of the same scent or a layering pair.
5. Quiz results end without explanation, price or next step.
6. Mobile PDP: price and CTA below the fold; homepage ≈12k px.
7. Content contradictions (concentration, counts) undercut the premium claim.
8. Key trial products are out of stock with no alternative shown.
9. Heavy page-builder output (~160–180 scripts, 230–370 requests per page).

## 29. Opportunities (detail in 05)

- Turn the existing parts (quiz logic, attribute data, travel sizes, blind layering sets, boutique expertise) into one connected journey.
- Use the juice colors plus the synesthesia origin as a real design system, not decoration.
- Give layering a digital form: pairings on PDPs, a composer, and permanent URLs per pairing.
- Put the trial path first for a high-ticket blind online purchase.
- Bring Casa Morph (people, consultation, booking) online as a trust and conversion asset.

## 30. Strengths to preserve

- The product itself: a distinctive twisted Bormioli bottle, strong juice colors, high concentration, unisex.
- Sensory PDP copy (story plus provenance of notes).
- Attribute data per product (a ready foundation for filters, finder and pairing).
- Explainable quiz logic.
- The blind layering sets and the "Your Next Form" idea.
- Certilogo authenticity, the physical boutique, Google reviews, loyalty points, Apple/Google Pay.
- Bilingual RO/EN content and a large SEO body (URLs and rankings must survive any migration).

---

## PRESERVE / IMPROVE / REMOVE / RESTRUCTURE / CREATE

| | Items |
|---|---|
| **PRESERVE** | Bottle and juice-color identity; sensory PDP copy; the attribute dataset; quiz scoring logic; blind layering sets and "Your Next Form"; Certilogo; Casa Morph; loyalty; express payments; RO/EN; existing URLs/SEO equity |
| **IMPROVE** | PLP cards (scent descriptor, family, collection, travel option); PDP hierarchy (buy box above the fold on mobile, notes as a time sequence, intensity/longevity visual); quiz results (why, price, try, pair); filter UX (family first, notes as search); photography consistency; performance budget |
| **REMOVE** | Default link blue; three unrelated UI fonts; long SEO walls on the homepage (move to dedicated pages); the floating flag widget; fake-urgency style copy ("1 produs vândut în ultimele 24 ore") pending a decision; gendered SEO posts that contradict unisex |
| **RESTRUCTURE** | Primary navigation (see 06); samples/travel out of "Seturi" into Discovery; room and body under a "Corp & Casă" ritual group; olfactive families collapsed into a small hierarchy; collections explained as worlds |
| **CREATE** | A discovery journey (finder → sample → bottle → layer); a layering pairing system with URLs and a composer; a gift hub; boutique consultation booking; product reviews; a single source of truth for product facts |
