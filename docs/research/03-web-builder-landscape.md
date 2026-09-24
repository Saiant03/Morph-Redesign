# 03 — Web builder and frontend landscape (September 2026)

Sources are official docs and pricing pages where reachable, secondary trade sources otherwise (flagged). URLs are in `sources.md`. Collected by a research subagent. Load-bearing facts were cross-checked against the gsap-skills repo and a direct inspection of morphparfum.ro. Prices change often, so re-verify before quoting to a client.

## Baseline: what Morph runs today [F]

- WordPress + WooCommerce, pages built with the **Breakdance** builder.
- FlyingPress (cache), TranslatePress (RO/EN), YITH Points & Rewards (loyalty), WP Grid Builder (filters), Trustindex (Google reviews), Certilogo, WooCommerce Stripe (Apple/Google Pay, Link), a UPS live-rate plugin, Rank Math SEO, and a custom `morph-quiz` plugin.
- Built and maintained by the agency Levitate ("Powered by Levitate" in the footer; Levitate IT in the schema).
- The public **WooCommerce Store API** (`/wp-json/wc/store/v1/products`) returns the full visible catalog with attributes. A concept can therefore use real product data read-only, without scraping HTML.

## Platforms

### Webflow
- [F] Webflow acquired GSAP in 2024. Since 2025-04-30 all of GSAP, including SplitText, ScrollSmoother, Flip and MorphSVG, is free for commercial use. Since mid-2025, "Interactions with GSAP" provides visual timeline and scroll/pin/scrub editing in the Designer.
- [F, secondary] Ecommerce plans after the May 2026 pricing update: Standard ~$29/mo (500 items, 2% fee), Plus ~$74/mo, Advanced ~$212/mo (annual billing).
- **Good at:** editorial layout, CMS, visual motion authoring, client self-editing.
- **Bad at:** deep commerce (loyalty points, Romanian invoicing/courier integrations, complex promotions), checkout customization, a thin app ecosystem. Morph depends on several of these today.
- **Concept:** strong. **Production for Morph:** weak unless commerce moves elsewhere.

### Framer
- [F] No native e-commerce. Commerce needs third-party plugins such as Framer Commerce, which proxy Shopify. The CMS is capped (Pro: 10 collections / 2,500 items per the secondary source). React code components are supported.
- **Good at:** fast, polished marketing and editorial pages; AI drafting.
- **Bad at:** being a store of record.
- **Concept:** fast for a brand site, poor for commerce UX prototyping (cart, filters, finder logic). **Production:** a brand layer at most.

### Shopify (Online Store 2.0)
- [F] Romania is a supported Shopify Payments country; Markets handles multi-currency and multi-language. Checkout customization now works only through **Checkout Extensibility** (UI Extensions, Functions, Branding API). The non-Plus deadline for thank-you and order-status pages was 2026-08-26.
- **Good at:** commerce depth, ecosystem, hosted checkout, reliability.
- **Bad at:** the design ceiling inside Liquid sections compared with custom code; the checkout look is constrained.
- **Migration cost for Morph [I]:** move 105 products, bilingual content, blog and URLs (SEO redirects), customers and points balance, Certilogo, RO invoicing and couriers (unverified which Morph uses), and the quiz.

### Shopify Hydrogen / Oxygen (headless)
- [F, secondary] Moved from Remix to React Router v7. Release 2026.4 introduced breaking changes (Storefront API proxy, consent mode, deprecation of `@shopify/remix-oxygen`).
- **Good at:** full design freedom on Shopify commerce.
- **Bad at:** the upgrade cadence, which needs permanent developer capacity. [I] Too heavy for Morph's likely team size.

### Headless WooCommerce + Next.js
- [F, secondary] Possible through the WooCommerce REST API and the Store API (cart and checkout endpoints). There is no first-party headless framework. [F] The Store API is live on morphparfum.ro.
- **Good at:** keeps orders, customers, points, plugins and SEO URLs; lowest data migration.
- **Bad at:** cart, checkout and account are bespoke engineering; many plugin features (points UI, Certilogo, filters) must be rebuilt as components; two systems to host.

### Rebuilt WordPress theme (no page builder)
- [I] This option was not in the subagent brief but is a real one: keep WooCommerce and replace Breakdance with a hand-built theme (block theme or classic PHP templates) plus GSAP.
- **Good at:** the cheapest production path; keeps all plugins and data; Serotoninn (SOTD, Aug 2026) shows WordPress + GSAP can reach award level.
- **Bad at:** the PHP/WordPress developer experience; motion across page loads (no client-side routing unless View Transitions or Barba are used).

### Medusa / Saleor
- [F, secondary] Medusa is TypeScript/Node, fast-moving, and fits small to mid brands. Saleor is Python/GraphQL and heavier to operate.
- [I] Neither is justified for Morph: a green-field backend migration with no clear gain over WooCommerce or Shopify.

### Next.js / React
- [F] Next.js 16 (Oct 2025) is the active line, 16.3 shipped Aug 2026, App Router with React 19.2. `next/image` does on-demand optimization.
- **Good at:** full control of layout, motion and route transitions, a component design system, performance tooling.
- **Bad at:** content editing needs a CMS; every change needs a developer.

## Motion stack

| Tool | Status [F] | Role [I] |
|---|---|---|
| GSAP 3 (+ScrollTrigger, SplitText, Flip) | Free incl. commercial, all plugins | Scroll choreography, timelines, text splitting, Flip for grid/filter state changes |
| Lenis | `lenis` package, darkroom.engineering | Optional smooth scroll; must respect reduced motion and not break native behaviour |
| Motion (ex-Framer Motion) | Independent, motion.dev, WAAPI-based | React UI state animation (drawers, presence, layout) |
| View Transitions API | Same-document: Chrome 111+, Safari 18+, Firefox 144+. Cross-document: Chromium + Safari 18.2+, not Firefox | Progressive enhancement for route transitions |
| Three.js / R3F | De facto 3D on award sites | One bounded hero or bottle moment at most, with a video/image fallback |

## AI-assisted builders
- [F, secondary] v0 (frontend React/shadcn), Lovable, Bolt (full-stack prototypes); Webflow AI cannot create Interactions; Framer's Wireframer generates drafts.
- [I] Useful for throwaway scaffolding; not for the art-directed build. Their output converges on the generic look the brief asks us to avoid.

## How agencies build award-level commerce now [I, from credits]
- Core store on a standard platform (Shopify is most common; WordPress and Webflow also appear).
- A custom front end (Next or Nuxt) where the brand needs control. GSAP + Lenis for motion. Three.js only for hero or campaign moments.
- Campaign microsites are separate from the shop.
- Performance counts as part of the craft.

## What this means for the concept vs. production

| Question | Answer [I] |
|---|---|
| Best tool for a **concept** that must feel real (finder logic, filters, layering composer, cart states, motion) | Custom code (Next.js + GSAP) against Morph's real Store API data (read-only), static mock cart |
| Where visual builders limit us | Stateful interactions (finder, composer, filter reflow), data-driven motion, performance control, design-system rigour |
| Where custom code adds value | Signature interactions, motion tied to state, a component system reusable in production |
| Commerce constraints on design | Hosted checkout (Shopify) caps checkout styling; Woo headless frees it but costs engineering; any path must keep Apple/Google Pay, COD and RO couriers |
| Production decision | Deferred to 08 and to Morph's operational constraints |
