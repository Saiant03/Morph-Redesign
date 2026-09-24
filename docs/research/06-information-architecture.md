# 06 — Proposed information architecture

Goal: support **brand discovery** and **fast shopping** equally. This is a proposal to validate with Morph (especially the family mapping and naming). Romanian labels are shown because the site is Romanian-first; EN mirrors them.

## Primary navigation (5 + utilities)

```
MORPH   Parfumuri   Descoperă   Layering   Cadouri   Casa Morph        [Caută] [Cont·puncte] [Coș]
```

| Item | Job | Contents |
|---|---|---|
| **Parfumuri** | Fast shopping | All perfumes; by **family**; by **collection** (Les Exclusifs / Luxury / Ice, each explained as a world); Noutăți; Bestsellers; *Corp & Casă* (gel, cream, room spray, diffusers, refills) as the "ritual" group |
| **Descoperă** | Trial and guidance | Fragrance Finder; Mostre & Discovery (sample sets, travel 2×8 ml, discovery set, credit-back rules); "Cum alegi" guides |
| **Layering** | Signature system | Your Next Form (blind sets); Combinații (named pairing pages); Compune (the composer); Cum aplici (application order) |
| **Cadouri** | Gifting intent | By budget; by recipient/mood; Seturi ritual (perfume + gel / cream); Gift card; gift box and message info |
| **Casa Morph** | Brand and trust | Povestea (Naples 2002, synesthesia, Bormioli); Boutique București (hours, map, **book a consultation**); Jurnal (editorial); Autenticitate (Certilogo); Membru (Morph Points) |

Utilities: search (always visible on mobile), account with the points balance, cart with free-shipping progress, RO/EN in the header (replaces the floating flag).

**Removed from the top level:** Quiz (moved to Descoperă and surfaced contextually everywhere), Devino membru (moved to the account and Casa Morph), Gift Card (moved to Cadouri), Informații (moved to the footer), Blog (becomes Jurnal under Casa Morph).

## Secondary navigation

- Footer columns: Magazin (shipping, returns, payment, COD, order tracking), Ajutor (FAQ, contact, ANPC/SOL, Certilogo check), Casa Morph (boutique, program, reselleri), Legal (T&C, confidențialitate, cookies), plus newsletter with an incentive (a free sample on the first order, subject to Morph's decision).
- In-page: sticky sub-navigation on long pages (PDP sections, collection worlds).

## Collection structure

- **Collection** = world or tier (Les Exclusifs: extrait; Luxury: EDP intense; Ice: experimental). Each collection page opens with a short explanation of what makes it different (concentration, character) and a "which one is for me" comparison, then the grid.
- **Family** = olfactive character, the primary discovery axis. Proposal: collapse today's 14+ values into **5 customer-worded families**, each with a one-line sensory description and a color range.

| Proposed family | Absorbs current values (to verify per product) |
|---|---|
| Gourmand | Gourmand |
| Lemnos (woody) | Lemnos, Lemnos-condimentat |
| Ambrat / Oriental | Lemnos-oriental, Floral-oriental, ambery/spicy values |
| Floral | Floral, Floral-pudrat |
| Proaspăt (fresh) | Lemnos-citric, Marin-ozonic, citrus values |

- **Mood** = emotional character, the language of the quiz and layering. It is a tag on products and pairings, not a navigation axis.

## Product discovery

- The grid card shows the image (the bottle, which carries the juice color), the name without the redundant "Eau de Parfum Unisex 100 ml", a one-line descriptor ("Cacao, ambră gri, migdală amară"), family and collection markers, the price, a **100 ml / Travel 2×8** toggle and a quick add.
- The **"Nu știi de unde să începi?"** entry to the finder appears on every PLP (a row or card inside the grid, not a pop-up).
- Comparison of 2–3 perfumes side by side (notes, intensity, longevity, family). This is cheap given the existing attributes. Phase 2 decides whether it is in scope.

## Search

- Instant search over products, **notes** (moved out of the filters: "vanilie" → the scents with vanilla), families, pairings and journal articles.
- Zero-result state offers the finder and the families.
- Suggestions show juice-color swatches.

## Filtering

| Level | Facets |
|---|---|
| Primary (chips above the grid) | Family (5), Collection (3), Format (100 ml / travel / sets) |
| Secondary (panel) | Intensity, Longevity, Season, Occasion, Price |
| Via search | Individual notes |
| Removed | "Popularitate" (becomes the sort order "Populare") |

State changes animate (Flip-style reflow) so the visitor sees what changed. The URL holds the filter state (shareable, SEO-safe canonical rules).

## Fragrance Finder

- Keep the 7-question weighted logic, rewrite the copy, and add optional "scents I already like" and "for me / as a gift" branches.
- The result page shows the primary match and an alternative, **why** each fits (the matched tags in plain words), wear data, price, **Try it (travel/sample)** and **Buy 100 ml**, a suggested **layering partner**, and a save/email option. It also offers "Vorbește cu Casa Morph" (booking or chat).
- The result is a URL (shareable, re-openable).

## Layering

- `/layering`: the concept → Your Next Form sets → combinations → composer → application order.
- **Pairing pages** `/layering/<pairing-slug>`: the two scents, the resulting character, application order, and buy options (the blind set if one exists, travel pair, full sizes).
- **Composer**: choose A + B, see the blend (color + notes over time), get the named pairing or "your combination", and add it to the cart.
- **Blind reveal** `/reveal/<set>` (QR in the box): reveal, instructions, full sizes. It needs Morph's operational buy-in.
- Every perfume PDP gets a "Se potrivește cu" section with 2–3 pairings.

## Samples

- They live in Descoperă → Mostre & Discovery, with clear formats and prices, what's inside each set, and the credit rules if adopted.
- They appear on every PDP (the travel or sample option right under the buy button), in the finder results, and in the cart as a threshold helper.
- Out-of-stock sets show the closest alternative plus a notify-me option.

## Sets

Split by intent:
- **Ritual** (perfume + gel / cream) under Cadouri and on the PDP ("Completează ritualul");
- **Trial** (sample, travel, discovery) under Descoperă;
- **Layering** (Your Next Form) under Layering.

## Editorial (Jurnal)

- Categories: Povești (brand, founder, ingredients), Ghiduri (choosing, concentration, application), Layering, Cadouri (seasonal).
- Every article links to products and pairings and is linked from them.
- Off-brand and contradictory posts (gendered listicles, skin-care posts) get reviewed with Morph's SEO data before any removal or redirect.

## About

Casa Morph → Povestea: founder and Naples 2002, the synesthesia idea, Bormioli glass, concentration (a single verified figure), the three collections, the boutique team. Authenticity (Certilogo) is a subsection, not a homepage wall of text.

## Cart

- A drawer on add (not a page redirect) with a free-shipping progress bar, a "add a travel size" suggestion when below the threshold, a gift box / message toggle, points earned, and a Certilogo note.
- Express pay (Apple/Google Pay) is kept. Checkout is platform-dependent (see 08).

## Page inventory for the concept (Phase 02 scope proposal)

1. Home
2. Parfumuri PLP with filters
3. PDP (the perfume)
4. Finder flow + result
5. Layering hub + composer + one pairing page
6. Descoperă / Mostre
7. Casa Morph story + boutique
8. Cart drawer and states

Plus mobile variants of every screen.

## Sitemap (compact)

```
/
├─ /parfumuri (+ ?familie=&colectie=&format=)
│  ├─ /parfumuri/les-exclusifs | /luxury | /ice
│  ├─ /parfumuri/noutati | /bestsellers
│  ├─ /corp-si-casa (geluri, creme, parfum de cameră, rezerve)
│  └─ /<produs>                       (existing product slugs preserved)
├─ /descopera
│  ├─ /descopera/finder  → /descopera/finder/rezultat/<id>
│  └─ /descopera/mostre
├─ /layering
│  ├─ /layering/your-next-form
│  ├─ /layering/<combinatie>
│  ├─ /layering/compune
│  └─ /reveal/<set>
├─ /cadouri (buget, destinatar, seturi ritual, gift card)
├─ /casa-morph (poveste, boutique, autenticitate, membru)
│  └─ /jurnal/<articol>
└─ /cont, /cos, /checkout, legal pages
```

URL changes to existing pages need a 301 map built from the current sitemaps (20 pages, 90 posts, 166 products, 36 categories, RO/EN).
