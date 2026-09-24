# Sources

All sources were accessed on 2026-09-24 unless noted. Quality tiers:
- **P**: primary (official site or docs, or direct observation);
- **S**: secondary (trade press, aggregators);
- **SN**: search snippet only (the page blocked fetching).

Raw notes with per-claim citations: `raw/awwwards.md`, `raw/competitors.md`, `raw/platforms.md`.

## Morph (P, direct observation)

- https://morphparfum.ro/ plus the RO pages audited: /parfumuri, /luxury, /les-exclusifs, /ice, /layering, /quiz, /morph-zeta-parfum-100ml, /set-layering-parfum-morph-limitless-2x8ml, /morph-discovery-travel-set-mini-parfumuri, /set-morph, /set-morph/set-esantioane-parfumuri, /despre-noi, /gift-card-morph-parfum, /spring-selection-2026
- https://morphparfum.ro/en/
- Sitemaps: https://morphparfum.ro/sitemap_index.xml (page, post, product, product_cat)
- Store API: https://morphparfum.ro/wp-json/wc/store/v1/products (105 visible products)
- Quiz script: https://morphparfum.ro/wp-content/plugins/morph-quiz/assets/quiz.js
- https://morphparfum.ro/robots.txt

## Awwwards (P for award/credit pages; live sites where fetched)

Category listings: https://www.awwwards.com/websites/e-commerce/ · /websites/fashion/ · /websites/beauty/

Site pages (`https://www.awwwards.com/sites/…`): rahasya-fragrances, dedcool, the-fragrance-conservatory, blackpepper, d-g-beauty-dolce, dg-beauty-my-lip-stylo, dg-beauty-gift-finder, dolce-gabbanabeauty-giftfinder, gucci-beauty-wishes, serotoninn, coutumes, cecilie-bahnsen, brunello-cucinelli-ai-e-com, miu-miu-a-house-that-we-shaped, deep-beauty, aardvark-book-club, decathlon-yestalgia, kosa. Listed only and not verified: lacoste-ace-breaker, lacoste-polo-factory, scooshy-fragrance-perfume-reviews.

Live sites fetched: rahasyafragrances.com, serotoninn.com, coutumes.com, giftfinder.dolcegabbana.com, aardvarkbookclub.com.

## Competitors (P unless marked)

- Byredo: https://www.byredo.com/ · /us_en/c/perfume/personal-fragrances/view-all-collection · /us_en/p/gypsy-water-eau-de-parfum
- Le Labo: https://www.lelabofragrances.com/fine-fragrances-2.html · /santal-33-147.html · /santal-33-1212.html · /discovery-sets/classic-collection/discovery-set/17-50ml-8.html
- Aesop (SN, 403): https://www.aesop.com/library/a-guide-to-fragrance.html
- Diptyque: https://us.diptyqueparis.com/en-us · /collections/eaux-de-parfum · /collections/fragrance-discovery-sets · /products/eau-de-parfum-philosykos-philop75cv1
- Frama: https://www.framacph.com/ · https://us.framacph.com/collections/perfume · /collections/fragrance-finder
- Matière Première: https://matiere-premiere.com/ · /en/collections/see-all-parfum · /products/metal-lavender
- Maison Crivelli: https://maisoncrivelli.us/ · /products/coffret-decouverte (the .com root hit a redirect loop)
- D.S. & Durga: https://www.dsanddurga.com/ · /collections/shop-all · /products/durga
- Jo Malone (SN, 403): jomalone.com /scent-layering, /scent-pairing
- Escentric Molecules: https://www.escentric.com/en-us
- Phlur (SN, 403): https://phlur.com/products/membership
- Juliette Has A Gun: https://us.juliettehasagun.com/

## Platforms and technology

Official (P):
- Webflow: https://webflow.com/blog/gsap-becomes-free · https://webflow.com/blog/webflow-interactions-with-gsap · https://help.webflow.com/hc/en-us/articles/42832301823635 · https://help.webflow.com/hc/en-us/articles/51059955082387 · https://webflow.com/pricing
- GSAP: https://gsap.com/pricing/ · https://gsap.com/blog/webflow-GSAP/
- Framer: https://www.framer.com/pricing · https://www.framer.com/cms/ · https://www.framer.com/community/marketplace/plugins/framer-commerce/
- Shopify: https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries/romania · https://help.shopify.com/en/manual/markets/getting-started/localization · https://help.shopify.com/en/manual/international/pricing · https://shopify.dev/docs/storefronts/themes/markets/multiple-currencies-languages · https://hydrogen.shopify.dev/updates · https://www.shopify.com/pricing
- Next.js: https://nextjs.org/blog/next-16 · https://nextjs.org/blog/next-16-3 · https://nextjs.org/docs/app/getting-started/images
- React: https://react.dev/blog/2025/10/01/react-19-2
- Motion: https://motion.dev/docs/react
- Lenis: https://github.com/darkroomengineering/lenis
- React Three Fiber: https://github.com/pmndrs/react-three-fiber
- View Transitions: https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API · https://caniuse.com/view-transitions

Secondary (S), to be re-verified before client-facing numbers:
- Shopify checkout: fudge.ai, ecosire.com, flatlineagency.com, huptechweb.com (Checkout Extensibility dates)
- Hydrogen: weaverse.io, ontapgroup.com (2026.4 breaking changes)
- Commerce comparisons: vendure.io, linearloop.io, kanopylabs.com, netguru.com (Medusa, Saleor); blazecommerce.io, creaytic.com (headless Woo)
- Pricing and AI builders: joinamply.com, thecssagency.com, managed-code.com (Webflow/Framer pricing and AI); uibakery.io, blog.tooljet.com, lovable.dev (AI builders; the last is self-interested)
- Motion and 3D: tympanus.net/codrops (SplitText), utsubo.com (Three.js award sites, Cartier case), emotion-agency.com

## Skills (P, inspected at pinned commits; see skill-registry.md)

- https://github.com/anthropics/skills @ 34040c9c568585f6929bedeaad110ad08f079624
- https://github.com/anthropics/claude-plugins-official @ 6bfd4e0c6d3da6050984fa5ed8281d915fa7ed69
- https://github.com/anthropics/claude-code @ d78be9481b889e11186ec4578b4f5e9301396e25
- https://github.com/greensock/gsap-skills @ aed9cfd3277740755f6bfc1155c7aa645403b760
- https://github.com/vercel-labs/agent-skills @ 063bee94c3f4df8453406c830b0a7df0f2860278

## Phase 05.5 (2026-09-24)

Morph (F, fetched): https://morphparfum.ro/despre-noi, /blog, /contact, /abonare-newsletter, /colectie, /spring-selection-2026, /cum-testezi-un-parfum-inainte-sa-il-cumperi; WordPress REST `wp-json/wp/v2/posts` (45 RO posts) and `wp-json/wp/v2/media` (1,017 items; searched by keyword); Store API `wc/store/v1/products` (105 products; Body & Bath, sets, gift card, gift box). Detail in `docs/design/phase-05-5-content-opportunity-map.md`.

Awwwards (F, fetched): https://www.awwwards.com/websites/fragrance/, /websites/beauty/, /websites/fashion/, /websites/e-commerce/, /sites/abel-fragrance, /sites/annatwelve-fragrances, /sites/the-tuscan-journey-begins, /sites/omr-beauty, /sites/essentiality-of-beauty, /sites/lacoste-ace-breaker, /inspiration/perfume-product-page, /inspiration/fragrance-finder-kayali. Detail in `docs/design/phase-05-5-awwwards-reference-map.md`.
