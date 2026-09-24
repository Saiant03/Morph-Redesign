# 08 — Technical direction (preliminary)

There are two separate decisions:
1. What to build the **concept** in: the proposal we show Morph.
2. What we would recommend for **production**, if Morph commissions it.

Conflating them is the usual mistake. The concept must be credible, interactive and cheap to change. Production must fit Morph's operations (WooCommerce, loyalty, RO couriers and invoicing, COD, Certilogo, bilingual SEO).

Scores: 1 (poor) – 5 (excellent), relative to *this* project. They are judgments based on 03, not measurements.

## Options compared

| Criterion | A. Next.js custom (headless) | B. Webflow | C. Framer | D1. Shopify OS 2.0 theme | D2. Shopify Hydrogen | D3. Headless Woo + Next.js | D4. WordPress custom theme (no builder) |
|---|---|---|---|---|---|---|---|
| Visual freedom | 5 | 4 | 4 | 3 | 5 | 5 | 4 |
| Interaction / motion (stateful: finder, composer, filters) | 5 | 3 | 3 | 3 | 5 | 5 | 3 |
| Responsive quality | 5 | 4 | 4 | 4 | 5 | 5 | 4 |
| Performance (achievable) | 5 | 4 | 4 | 4 | 5 | 5 | 3 |
| SEO | 5 | 4 | 3 | 4 | 5 | 5 | 5 |
| CMS / content editing | 2 (needs a headless CMS) | 5 | 4 | 4 | 3 | 4 (WP admin stays) | 5 |
| Commerce fit for Morph | depends on backend | 2 | 1 | 4 | 4 | 4 | 5 |
| Migration effort for Morph | — | high | high | high (data, plugins, redirects) | high + ongoing | medium | low |
| Maintainability | 4 | 4 | 4 | 4 | 2 (fast breaking releases) | 3 (two systems) | 3 |
| Developer experience | 5 | 3 | 3 | 3 | 4 | 4 | 2 |
| Client handoff | 2 | 5 | 5 | 4 | 2 | 3 | 4 |
| Scalability (EU markets later) | 4 | 3 | 2 | 5 (Markets) | 5 | 3 | 3 |

## Recommendation: concept

**Build the concept as a Next.js (App Router) + TypeScript app, with GSAP (ScrollTrigger, Flip, SplitText) for motion. It reads Morph's real catalog read-only from the public WooCommerce Store API, snapshotted to JSON at build time. The cart is a local mock.**

Why:
- The signature ideas (finder result logic, layering composer, color blends, filter reflow, time-scrub) are **stateful**. Visual builders handle them poorly (03).
- Real product data (names, prices, notes, attributes, images) makes the proposal feel like Morph's store, not a mockup, at almost no cost. The snapshot avoids hammering Morph's server and keeps the demo stable.
- The component and design-token system built here can carry into production under D3 or A, and as reference under D1 or D4.
- It deploys as a private preview URL for the presentation.
- Lenis and Motion are optional and are decided per the chosen direction. Three.js only if Direction B is chosen, and only for one bounded hero.

Guardrails:
- Performance budget from day one (LCP < 2.5 s on 4G mobile, JS for the core pages kept small, motion lazy-loaded).
- `prefers-reduced-motion` respected everywhere.
- No production credentials; Store API reads only.
- Morph product images are used only in the private concept, and shipped from the snapshot, not hot-linked.

## Recommendation: production (preliminary, not final)

Decision drivers that **must be confirmed with Morph first**:
1. Who owns and operates the site: the Romanian entity, the Italian brand, or the agency Levitate.
2. Budget and internal technical capacity.
3. Required integrations: couriers, invoicing (e.g. SmartBill or Oblio; unknown), COD, loyalty balances, Certilogo, ERP or stock sync with the boutique.
4. International plans (a single RO market, or EU).
5. Appetite for a platform migration.

Current ranking given what we know:

1. **D3 — Headless WooCommerce + Next.js.** Keeps orders, customers, points, integrations and admin workflows; delivers the concept's front end almost unchanged; lowest data migration. Cost: bespoke cart, checkout and account plus hosting two systems. *Leading hypothesis if Morph wants the full experience.*
2. **D4 — WordPress custom theme without Breakdance** (+ GSAP, View Transitions as an enhancement). Cheapest and keeps everything. It can reach a high standard (Serotoninn is WordPress). Motion across page loads is weaker, and stateful features become islands of JS. *Best if the budget is limited.*
3. **D1 — Shopify OS 2.0 custom theme.** Worth it only if Morph also wants to leave WordPress for operational reasons (reliability, EU Markets). A full migration and SEO redirect project.
4. **A with Medusa / D2 Hydrogen.** Not justified at Morph's scale.
5. **B Webflow / C Framer.** Not suitable as the store of record here. Framer or Webflow could host a campaign microsite if one is ever needed.

## Architecture sketch for the concept

```
Store API (read-only) ──snapshot script──► data/catalog.json (+ derived: families, colors, pairings)
                                              │
Next.js App Router ── Server Components (pages, SEO, data) ── Client islands (finder, composer, filters, cart drawer)
       │                                                        │
   design tokens (CSS variables)                          GSAP / Flip / ScrollTrigger (lazy)
       │
   Preview deploy (private URL)
```

- `data/`: a catalog snapshot plus a hand-curated `colors.json` (the juice color per scent, sampled from photos and verified), `families.json` (the 5-family mapping), `pairings.json` (Your Next Form contents need Morph input, since the sets are blind).
- Locales: RO first, EN later.
- Testing: Playwright visual captures at 390 / 768 / 1440 px (see `.claude/skills/site-capture`), Lighthouse for performance and accessibility.

## Open technical questions

- Does the Store API expose everything we need (juice colors: no; pairing contents: no; stock: yes)? The missing data will be curated by hand and marked clearly.
- Image rights and quality: the packshots are fine for a concept; new photography is out of scope for the concept unless Morph provides it.
- Hosting and deploy target for the private preview (e.g. Vercel). To confirm with the user before creating accounts or deploying.
