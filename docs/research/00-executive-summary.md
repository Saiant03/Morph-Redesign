# 00 — Executive summary (Phase 01: research and strategic discovery)

Date: 2026-09-24. Scope: research only; no design or code. The detail and evidence are in files 01–08; sources are in `sources.md`, skills in `skill-registry.md`.

## 1. Executive summary

Morph is an Italian niche house (Naples, 2002, Andrea Angelino) whose Romanian official store and Bucharest boutique (Casa Morph) run on WordPress + WooCommerce, built with the Breakdance page builder. The product is strong and distinctive: a twisted Bormioli bottle, saturated juice colors, high concentrations, unisex, and a founding idea of synesthesia (scent = color = emotion). The store already contains an unusually complete discovery toolkit:
- rich attribute data;
- a weighted quiz;
- travel 2×8 ml sizes and sample sets;
- 12 blind layering sets ("Your Next Form");
- loyalty points and Certilogo authentication;
- a boutique whose staff customers praise by name.

The problem is that none of these parts connect, and the interface is the page builder's, not Morph's. **The opportunity is to turn existing assets into one journey (Find → Try → Own → Layer) with an identity built from Morph's own product truths: color, form and layering.** The work is mostly connecting and designing, not inventing features.

## 2. Current Morph diagnosis

- **Structure:** 9 mixed top-level nav items; trial products hidden under "Seturi"; 12 flat filter facets with 14+ family values and note lists of 30–50 entries.
- **Pages:** cards carry no scent signal. PDPs don't offer the travel size, sample or layering partner. On mobile the price and CTA sit below the fold. The homepage runs ≈12,000 px on mobile, with about 45% SEO text.
- **Tools:** quiz results end at "Vezi parfumul" with no explanation, price or next step. Layering exists only inside the box.
- **Trust and data:** 0 product reviews on 105 products. Contradictory facts (concentration 20% / 30% / 25–35%, collection sizes, set contents). Key trial SKUs out of stock.
- **Visual:** a serif logo next to three unrelated sans UI fonts, default link blue, and generic builder components. Motion is limited to sliders.
- **Tech:** about 160–180 scripts and 230–370 requests per page.
- **Strengths to keep:** the product, the sensory copy, the attribute data, the quiz logic, the blind sets, Certilogo, the boutique, express payments, RO/EN and the SEO base.

## 3. Key UX opportunities

1. One connected discovery journey: the finder result explains the match and offers try / buy / pair.
2. Families first (5 customer-worded families), notes through search, and a scent descriptor on every card.
3. A PDP built around wear over time, with classification tags (family · intensity · longevity) from existing data.
4. Layering as a system: pairing pages, a composer, and a QR "blind reveal" for Your Next Form boxes.
5. Designed mobile: buy box first, sticky actions, short homepage.
6. The boutique online: book a consultation, or reserve to try in store.

## 4. Key commercial opportunities

- A **free-shipping threshold nudge**: the 690 lei bottle sits below the 750 RON threshold, so suggest a travel size or sample.
- **Trial → full conversion**: trial on every PDP, plus a credit-back discovery set (subject to margin).
- **Layering → two bottles** through the blind reveal and pairing pages.
- **Same-scent ritual bundles** (gel, cream, room) and a **gift hub** backed by the existing seasonal SEO.
- **Product reviews**, **visible loyalty**, and **back-in-stock + alternatives** for the 18 out-of-stock SKUs.

## 5. Awwwards-derived principles

- One signature moment per page type; everything else quiet.
- Motion explains state changes, not decoration.
- Conventional, fast core store; spectacle only in bounded modules or campaigns (award-level stores run on Shopify, WordPress and Webflow; WebGL lives in campaign microsites).
- Product truth drives the art direction.
- Every signature interaction must have a touch-native form.

Detail in 02.

## 6. Competitive patterns

- Story before spec, with a scannable note list kept close.
- Trial as a first-class category.
- Credit-back discovery sets at about half of the houses.
- Simple 4-family taxonomies (Diptyque, D.S. & Durga).
- Same-scent cross-sell.
- Only Jo Malone and Escentric treat layering as a system, and nobody pairs it with a blind reveal or with color.

Morph's differentiators: its data depth, a working quiz, colored juice, blind layering and a physical boutique. Detail in 04.

## 7. Web builder / technology findings

- GSAP is fully free (Webflow-owned) and is the common motion layer across stacks.
- Webflow is strong visually but weak for Morph's commerce needs. Framer has no native commerce.
- Shopify is strong (RON supported, Checkout Extensibility now mandatory) but means a full migration. Hydrogen churns quickly.
- The public WooCommerce Store API on morphparfum.ro exposes the full catalog: the concept can use real data.

Detail in 03.

## 8. Proposed information architecture

Primary navigation: **Parfumuri · Descoperă · Layering · Cadouri · Casa Morph**, plus search, account with points, and a cart with shipping progress. Collections are explained as worlds, families are the primary filter, sets are split by intent (ritual / trial / layering), the finder result is a shareable page, and pairing pages get permanent URLs. Every existing URL is preserved or redirected. Detail in 06.

## 9. Three creative directions (none chosen)

- **A. Cromatic**: the synesthetic atlas. Each scent is its juice color; a quiet gallery UI; color blending for layering. Low–medium risk.
- **B. Forma**: the twist. A geometry derived from the Bormioli bottle, a sculptural monochrome with color only in the glass, one refraction hero. High risk.
- **C. Strata**: your next form. Translucent layers, scroll as time on skin, the composer and blind reveal at the center. Medium risk.

Detail in 07.

## 10. Preliminary technical recommendation

- **Concept:** Next.js (App Router, TypeScript) + GSAP, reading a read-only snapshot of Morph's Store API catalog, with a mock cart, deployed to a private preview.
- **Production (to confirm with Morph):** the leading hypothesis is headless WooCommerce + Next.js (keeps orders, points and integrations). The budget alternative is a hand-built WordPress theme without Breakdance. Shopify only if Morph wants to leave WordPress for operational reasons.

Detail in 08.

## 11. Recommended skill set

Imported verbatim from pinned commits after inspection:
- `frontend-design` (Anthropic, Apache 2.0);
- `gsap-core`, `gsap-scrolltrigger`, `gsap-performance` (GreenSock, MIT).

Local: `site-capture` (Playwright capture behind the proxy) and `push-main`.

Deferred: webapp-testing, gsap-react/plugins, Vercel react-best-practices / web-design-guidelines. Detail in `skill-registry.md`.

## 12. Risks / unknowns

- **Who decides**: the relationship between the Romanian operator, the Italian brand and the agency Levitate is unverified. The proposal's audience and approval path depend on it.
- **Operations**: couriers, invoicing, COD, loyalty balances, Certilogo and boutique stock sync are unknown in detail and constrain the production choice.
- **Data**: juice colors and layering-set contents are not in the API (the sets are blind) and must be curated or provided by Morph.
- **Assets**: the concept can use existing packshots. Each direction ultimately needs a new photo shoot (color fields, caustics, or mist and skin).
- **Blocked research**: Aesop, Jo Malone and Phlur could only be read through search snippets. Some Awwwards items were listed but not verified. Platform prices come from secondary sources.
- **Not tested**: checkout (no test order), search quality, real performance metrics (proxy interference), accessibility audit.
- **SEO**: about 90 posts and bilingual URLs; any IA change needs a redirect map and preserved content.
- **Legal/brand**: the concept uses Morph's name, product data and images. It must stay a private proposal, not a public site.

## 13. Concrete next steps for Phase 02

1. **Decisions from you**: which direction(s) to prototype (all three at test-screen depth is recommended), the presentation format, and whether contact with Morph or Levitate is possible to answer the operational questions in §12.
2. **Data foundation**: a snapshot script (Store API → `data/catalog.json`), a curated `colors.json` (juice colors sampled from the packshots), a `families.json` 5-family mapping, `pairings.json` (known set descriptions, unknown contents marked), and a single verified facts sheet (concentrations, counts).
3. **Scaffold**: Next.js + TypeScript + GSAP in the repo, design tokens as CSS variables, a performance budget and a reduced-motion policy. Then add `gsap-react` and `gsap-plugins` skills.
4. **Direction test screens** (per direction): home first viewport, mobile PDP, layering composer. Compare using the criteria in 07.
5. **Pick a direction**, then build the 8-screen concept scope from 06, including the finder result and cart drawer states.
6. **QA loop**: `site-capture` at 390 / 768 / 1440 px, Lighthouse, contrast checks per juice color, keyboard and reduced motion.
7. **Proposal narrative**: diagnosis (01), opportunity (05), the concept walkthrough, and a production path with phases (08).
