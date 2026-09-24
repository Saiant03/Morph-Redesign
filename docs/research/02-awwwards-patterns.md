# 02 — Awwwards patterns

Method: Awwwards category pages (e-commerce, fashion, beauty), individual `/sites/<slug>` credit pages, and live-site fetches where reachable (2026-09-24). Collected by a research subagent and reviewed here. One correction was applied: the subagent assumed Morph is an "inspired-by" retailer. It is not (see 01 §1). Recommendations were rewritten accordingly.

Labels: **[F]** observed on the cited page, **[I]** interpretation. Every site URL is in `sources.md`.

## Studied sites

| Site | Award (date) | Category | Studio / stack [F from credits] | Why it matters |
|---|---|---|---|---|
| Rahasya Fragrances | HM, Nov 2024 | E-commerce, luxury | ssood / Shopify | Closest recent niche-fragrance comparison; narrative-first scent pages |
| Dedcool | HM, Jul 2021 | E-commerce | Willa Creative / Shopify | Fragrance DTC |
| The Fragrance Conservatory | HM, Feb 2020 | Editorial, WebGL | TRY DIG / React, Three.js | Fragrance education as an experience |
| BlackPepper (CDG Parfum) | SOTD, Jan 2017 | Promotional | 84.Paris | Ingredient-led narrative structure (dated stack) |
| DG Beauty – Dolce | SOTD, Jun 2024 | Beauty, promotional | MONOGRID | Launch microsite (now retired) |
| DG Beauty Gift Finder (2024, 2026) | HM, Dec 2024 / Jul 2026 | Beauty, e-commerce | AQuest; MONOGRID (Vue, GSAP, WebGL) | Guided finder, direct analog to the Morph quiz |
| Gucci Beauty Wishes | SOTD, Dec 2023 | E-commerce, beauty | MONOGRID / Contentful | Shoppable seasonal gift experience |
| Serotoninn | SOTD + Dev + E-com Honors, Aug 2026 | Fashion e-commerce | BL/S + Artycoders / WordPress, GSAP, Swiper | Award-level commerce **on WordPress**: grid, quick-add, category counts |
| Coutumes | Nominee, Sep 2026 | Fashion e-commerce | index / Shopify | Configurator, trust info in the buy flow |
| Cecilie Bahnsen | HM, Jul 2026 | Fashion e-commerce | Signifly / Shopify | Editorial restraint |
| Brunello Cucinelli AI | SOTD, Jul 2026 | Luxury e-commerce | makemepulse | Intent-led "pageless" shopping (experimental) |
| MIU MIU – A House that we shaped | SOTD, Aug 2026 | Luxury, WebGL | Merci Michel | Immersive campaign kept off the main shop |
| Deep Beauty (KIKO × Ogilvy) | SOTD, Jun 2025 | Beauty | AQuest | WebGL exhibition + sound (campaign) |
| Aardvark Book Club | SOTD + E-com Honors, Aug 2026 | E-commerce | FUTURE THREE / Webflow, GSAP, Barba | Scroll-driven "unboxing" reveal |
| Decathlon Yestalgia | SOTD + Dev, Aug 2026 | E-commerce capsule | index / GSAP | Capsule collection with its own visual register |
| KŌSA | HM, Aug 2026 | Experimental e-commerce | Hello-World / Squarespace | Low-budget stack can still place |

Gaps [F]: no fragrance brand appeared as a 2024–2026 Site of the Day in the fetched listings. The current signal comes from beauty and luxury-fashion commerce. Lacoste entries and Scooshy were seen in listings only and were not verified.

## Structural finding

[I, from credits] Award-level **core stores** run on ordinary commerce platforms (Shopify, WordPress/WooCommerce for Serotoninn, Webflow for Aardvark). Heavy WebGL and 3D sits almost entirely in **campaign microsites** on separate subdomains (MIU MIU, Deep Beauty, DG Beauty). Winning sites put their craft into type, image direction, grid, transitions and a few signature moments, not into a 3D-first storefront.

## Patterns

Format: **What it does / Why it works / Where for Morph / Risks / Don't copy**. Each carries a class, P = design principle, G = gimmick or conditional.

### 1. Restrained UI, product carries color (P)
- **What it does:** a two-tone UI (e.g. #2B1F1C/#F1EEEC at DG Dolce, #F1EDE7/#282828 at Cucinelli) lets the product and photography carry the color.
- **Why it works:** less noise, and hierarchy comes from the image.
- **Where for Morph:** a quiet UI where **juice colors** become the accent system, one scent at a time.
- **Risks:** it turns cold and generic without strong image direction.
- **Don't copy:** the specific palettes, or cream + serif by default.

### 2. Story before spec on fragrance pages (P)
- **What it does:** Rahasya leads with narrative, and the notes follow.
- **Why it works:** scent cannot be sampled online, so the story gives the shopper a mental model first.
- **Where for Morph:** Morph PDP copy already does this; structure it (story → notes as time → wear data).
- **Risks:** burying the notes frustrates experienced buyers.
- **Don't copy:** removing the scannable note list.

### 3. Guided finder as its own branded flow (P)
- **What it does:** the DG Beauty Gift Finder does "3 steps"; the 2026 version is conversational.
- **Why it works:** it turns a large catalog into a few decisions.
- **Where for Morph:** keep the quiz as a dedicated flow, and make the result explain the match and offer try / pair / buy.
- **Risks:** "AI" framing over rules-based logic hurts credibility.
- **Don't copy:** the chat UI as the default.

### 4. Scroll-driven reveal tied to a real ritual (P, conditional)
- **What it does:** Aardvark stages "every page feels like an unboxing".
- **Why it works:** anticipation, mapped onto a real physical act.
- **Where for Morph:** the **blind layering box** (the reveal *is* the product) and discovery sets.
- **Risks:** cost and mobile performance; it needs an image-sequence fallback.
- **Don't copy:** running it on every PDP.

### 5. Ingredient-led narrative arc (P)
- **What it does:** BlackPepper is structured around its 4 ingredients.
- **Why it works:** composition is the product.
- **Where for Morph:** Morph has named provenance (cacao Chuao, migdale Avola, ambră gri); notes can unfold top → heart → base as scroll, matching how scent evolves on skin.
- **Risks:** it needs real ingredient imagery.
- **Don't copy:** the 2017 jQuery/Pixi stack.

### 6. Minimal chrome, editorial image (P)
- **What it does:** Cecilie Bahnsen and Coutumes use large images and quiet navigation.
- **Why it works:** the brand world is what the visitor remembers.
- **Where for Morph:** collection worlds and campaign pages.
- **Risks:** SKU findability; "shop all" must stay one click away.

### 7. Quick-add with inline variant on grid (P)
- **What it does:** Serotoninn cards carry inline sizes and a quick-add.
- **Why it works:** fewer clicks for decided shoppers.
- **Where for Morph:** the card toggles **100 ml / travel 2×8 ml** and adds directly.
- **Risks:** hover-only affordances die on mobile.
- **Don't copy:** relying on hover alone.

### 8. Category tiles with counts (P)
- **What it does:** Serotoninn shows item counts on category tiles.
- **Why it works:** it sets expectations before the click.
- **Where for Morph:** collection and family entry points ("Gourmand · 7").
- **Risks:** counts have to stay live.

### 9. Section numbering as wayfinding (G unless the content is a sequence)
- **What it does:** Serotoninn numbers its sections [01]–[07].
- **Where for Morph:** valid only for true sequences (the notes timeline, the finder steps, the layering order of application).
- **Don't copy:** decorative numbering.

### 10. Intent-led, pageless AI shopping (G / experimental)
- **What it does:** Brunello Cucinelli replaces navigation with an agent.
- **Where for Morph:** at most, a free-text "describe what you like" entry into the finder.
- **Risks:** cost and trust.
- **Don't copy:** replacing navigation.

### 11. Immersive WebGL environment (G for the core shop, P for a campaign)
- **What it does:** MIU MIU and Deep Beauty build explorable 3D spaces, always off the main shop.
- **Where for Morph:** possibly one seasonal campaign; never the purchase path.

### 12. Loader as a brand moment (G unless scoped)
- **What it does:** DG Dolce and Serotoninn use branded loaders.
- **Where for Morph:** a first-visit homepage entry only, under 1.5 s and skippable. Never on PLP, PDP or checkout.

### 13. Capsule pages with their own register (P)
- **What it does:** Decathlon Yestalgia gives a capsule its own look.
- **Where for Morph:** each Your Next Form drop or seasonal selection could get a distinct art direction inside the same system.
- **Risks:** a second design language to maintain.

### 14. Motion tied to configuration (P)
- **What it does:** Coutumes uses variable type in its configurator.
- **Where for Morph:** the layering composer, where motion shows the *result of a choice* (two colors and two note sets merging).
- **Don't copy:** decorative variable type.

### 15. Cultural specificity threaded through the site (P)
- **What it does:** Rahasya carries its Indian identity sitewide.
- **Where for Morph:** Italian origin (Naples, Bormioli) plus a Bucharest boutique. The story is Italian craft, experienced locally.
- **Risks:** kitsch (tricolore, clichés).

### 16. Reassurance at the decision point (P)
- **What it does:** Coutumes puts returns, warranty and shipping in the buy flow.
- **Where for Morph:** Certilogo, shipping threshold, "try first" and boutique contact near the CTA, as quiet text, not badge clutter.

### 17. Mood/genre discovery grid (P)
- **What it does:** Aardvark uses genre tiles.
- **Where for Morph:** "shop by family" or by mood (the quiz already has mood tags).
- **Risks:** a taxonomy that isn't consistent across the site.

### 18. Footer as a real sitemap + incentive signup (P, hygiene)
- **What it does:** Coutumes and Serotoninn.
- **Where for Morph:** an incentive such as a free sample with the first order.

## Gimmicks to avoid

1. A 3D or WebGL world as the main storefront.
2. A chat UI replacing navigation.
3. Hover-only interactions and cursor trails with no touch equivalent.
4. Blocking or repeated loaders.
5. Scroll-reveal fade-up on every section; numbering and labels as decoration.
6. Smooth-scroll hijacking that breaks native scroll, find-in-page or accessibility, unless it is tuned and respects `prefers-reduced-motion`.

## Principles to carry forward

1. **One signature moment per page type**, everything else quiet.
2. **Motion explains state change** (filter → grid reflow, pairing → blend, note → next note), not decoration.
3. **The core store stays conventional and fast**; spectacle lives in bounded modules.
4. **Product truth drives the art direction.** Morph's own facts (bottle twist, juice color, blind box, note evolution) are the raw material.
5. **Mobile first for motion.** Every signature interaction needs a touch-native form.
