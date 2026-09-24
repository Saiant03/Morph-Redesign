# Phase 05.5 — Awwwards reference map

Organised by technique, not by site. No ranking and no scores. For each technique: references, the principle to extract, why it could fit Morph, complexity, risk, and what not to copy. Research 02 already covers 16 award sites in detail; this map adds what was re-checked on 2026-09-24 and focuses on the techniques the owner asked for.

Verification markers:
- **[A]** award page fetched on 2026-09-24 (award, date, studio, stack as listed there).
- **[02]** documented in `docs/research/02-awwwards-patterns.md` (fetched 2026-09-24 in Phase 01).
- **[K]** widely known live site used as a pattern reference; not re-verified in this session. Treat the described behaviour as something to check before citing it to Morph.

Sites re-checked this session [A]: Abel Fragrance (HM, 3 Jul 2025, Studio Almond, Shopify + GSAP; scent selector, bundle builder), Annatwelve Fragrances (SOTD, 2 Aug 2020, Adoratorio, Vue + GSAP + WebGL; Italian luxury fragrance, black/white/grey), Weekend Max Mara "The Tuscan Journey Begins" (SOTD, 13 Sep 2026, MONOGRID, WebGL + GSAP + Vue; Italian craftsmanship as an interactive journey), Essentiality of Beauty (L'Oréal, HM, 24 Sep 2025, Soleil Noir, Nuxt; horizontal gallery, quiz cards), OMR Beauty (HM, 3 Feb 2026, Panagora, Shopify Plus; product presentation, black/white), KAYALI fragrance finder (Awwwards inspiration element, studio Radiant, Shopify), BlackPepper / CDG Parfum product page (inspiration element, 84.Paris). Awwwards category listings for fragrance, beauty, fashion and e-commerce were read to confirm there is still no fragrance Site of the Day in 2025–2026; the fragrance category's latest entry is Abel (HM, 2025).

Structural finding (unchanged from 02, reconfirmed): award-level **stores** run on ordinary platforms (Shopify, WordPress, Webflow) and put their craft into image direction, type, grid, transitions and one or two signature moments. Full WebGL worlds live in campaign microsites (MIU MIU, Weekend Max Mara, Deep Beauty, DG Beauty), off the purchase path.

---

## PRODUCT PRESENTATION

**References**: Annatwelve [A] (Italian fragrance, monochrome staging of the bottle); Abel Fragrance [A] (clean photographic product cards on off-white, product as the only color); Rahasya [02]; DG Beauty – Dolce [02]; Aardvark Book Club [02] (scroll "unboxing"); Apple product pages [K] (one object, huge, lit, rotating through states as you scroll); Bottega Veneta [K] (high-resolution close-ups of material next to the object).

- **Pattern**: the object as sculpture: one product per viewport at a scale that exceeds "card", lit from a clear direction, standing on a surface, with detail crops of material as a counterpoint.
- **Why it works**: scale and light signal value; the eye reads the object's form before reading any text.
- **Why for Morph**: the twisted Bormioli bottle is a designed object and the juice is visible through glass. Monument scale plus a glass shelf with reflection turns a packshot into a piece (plan §10, §8.3).
- **Complexity**: low–medium in CSS (stage, reflection, light tokens); the ceiling is image resolution.
- **Risk**: 768×960 packshots blur above ≈700 css px; needs the MUST HAVE shoot for full effect.
- **What not to copy**: 3D-rotating product models (Morph has no 3D asset and faking one is worse than a good photograph); Apple's scroll-pinned rotation sequences (scroll-jacking).

## PAGE TRANSITIONS

**References**: Aardvark Book Club [02] (Webflow + GSAP + Barba: page changes feel like one continuous object being handled); Serotoninn [02] (WordPress + GSAP, commerce with transitions); Annatwelve [A] (overlay menu animation, horizontal project transitions); the View Transitions API pattern used by many 2025–2026 editorial sites [K] (shared elements between list and detail).

- **Pattern**: persistent frame + shared element: the header never leaves, and the element you clicked becomes the hero of the next page.
- **Why it works**: it removes the "blank → new page" gap and tells the user where they are.
- **Why for Morph**: "Metamorfoză prin parfum": the same room changing state (plan §20). The bottle as the shared element is product truth.
- **Complexity**: medium; high if emulated in JS without the API.
- **Risk**: App Router integration (experimental flag), back/forward edge cases, low-end devices.
- **What not to copy**: full-screen curtain wipes and logo interstitials between every page; transitions longer than ~550 ms.

## EDITORIAL STORYTELLING

**References**: Weekend Max Mara, The Tuscan Journey Begins [A] (Italian craftsmanship turned into a journey; campaign, not store); Essentiality of Beauty [A] (a book about beauty turned into horizontal chapters); BlackPepper / CDG [02] (a fragrance told through its ingredients); The Fragrance Conservatory [02] (fragrance education as an experience); Aesop [K] (writing as the brand; editorial and product on equal footing).

- **Pattern**: chapters with changing anatomy; an argument told in a sequence of scenes, each with one idea and one image.
- **Why it works**: it gives a reason to scroll that is not "more products".
- **Why for Morph**: Morph has the pieces (Naples 2002, Bormioli, three collections with real campaigns, Gate 17 launch, the layering workshop); the home "six movements" and the "Despre Morph" story use them (plan §8, §14.2).
- **Complexity**: low–medium (content and layout, little code).
- **Risk**: inventing narrative to fill chapters; only verified facts are allowed.
- **What not to copy**: WebGL journeys and sound for the store; the Tuscan-journey kind of illustration-led microsite belongs to a campaign, not to the shop.

## NAVIGATION

**References**: Cecilie Bahnsen [02] (quiet navigation, editorial image leads); Coutumes [02] (clear commerce navigation inside an art-directed site); Annatwelve [A] (full overlay menu); Brunello Cucinelli AI [02] (intent-led, experimental).

- **Pattern**: a quiet, persistent header whose tone follows the chapter under it; a full overlay menu on mobile that is itself a small editorial page (collections with a campaign crop, the finder, the shop).
- **Why it works**: navigation is always available but never competes with the image.
- **Why for Morph**: Phase 05 already has the tone-following header; the overlay menu can carry the three campaigns and the shop's open-now line.
- **Complexity**: low.
- **Risk**: hiding shopping paths behind the menu.
- **What not to copy**: pageless AI navigation; hidden hamburger on desktop.

## DISCOVERY

**References**: DG Beauty Gift Finder 2024 and 2026 [02]; KAYALI fragrance finder by Radiant [A, inspiration element]; Abel scent selector [A]; Aardvark genre tiles [02]; Diptyque and D.S. & Durga four-family systems [research 04].

- **Pattern**: discovery that is not a filter panel: a guided finder with an explained result, families written in sensory language, and a small number of entry points that each lead to objects.
- **Why it works**: it turns a catalog into a few meaningful choices and keeps the product in view.
- **Why for Morph**: Morph has a working weighted quiz and deep attribute data; the plan's family chapters, notes index and finder horizon make discovery about notes and objects (plan §11–12).
- **Complexity**: medium.
- **Risk**: over-designing into a game; the finder must stay fast (7 questions).
- **What not to copy**: chat UIs as the default; "AI" framing of rules-based logic; Frama's finder that is only a static page (research 04).

## MOTION

**References**: DG Beauty – Dolce [02] (branded loader); Serotoninn [02] (GSAP transitions in commerce); Annatwelve [A] (developer award for animation on a minimal fragrance site); Aardvark [02].

- **Pattern**: a small vocabulary of motions, each bound to one role (entry, product reveal, state change), repeated consistently rather than a new effect per section.
- **Why it works**: users learn the grammar; the site feels authored rather than decorated.
- **Why for Morph**: the loader's grammar (lines rise, light comes up, object settles) becomes the root of every other motion (plan §23).
- **Complexity**: medium (discipline more than code).
- **Risk**: role creep; everything must stay under 900 ms except the loader.
- **What not to copy**: fade-up on every section (research 02 gimmick 5); cursor trails; smooth-scroll libraries that break native scroll.

## MOBILE

**References**: Serotoninn [02] (commerce details that work on touch); OMR Beauty [A] (mobile product presentation on Shopify Plus); Essentiality of Beauty [A] (horizontal navigation adapted to mobile).

- **Pattern**: signatures redesigned for thumb and portrait: swipe with snap instead of scroll-driven horizontals, tabs for time instead of scrub, objects stacked side by side instead of overlapping.
- **Why it works**: the moment survives; nothing depends on hover or precise pointer movement.
- **Why for Morph**: most traffic is presumably mobile [I]; the owner's clipping issue shows breakpoints must be designed, not scaled (plan §24).
- **Complexity**: medium.
- **Risk**: long pages (home is 10,521 px today).
- **What not to copy**: desktop sticky stages forced onto phones.

## TYPOGRAPHY

**References**: Cecilie Bahnsen [02] (restraint); Annatwelve [A] (minimal type in a black/white/grey system); Essentiality of Beauty [A] (editorial book typography on screen); Coutumes [02] (type used in a configurator, only where it shows a choice).

- **Pattern**: extreme scale contrast (very large names, very small measured labels, a quiet body), with one expressive face and one working face.
- **Why it works**: hierarchy without boxes; names become images.
- **Why for Morph**: fragrance names (Zeta, Animal, Gate 17, Disumano) are short and strong at display size; the serif logo is Morph's own.
- **Complexity**: low.
- **Risk**: excessive serif; clipping at large sizes (the "Metamorfoză" case).
- **What not to copy**: variable-font gimmicks; all-caps luxury spacing everywhere.

## IMAGE TREATMENT

**References**: Weekend Max Mara [A] and MIU MIU [02] (campaign imagery as environment); Cecilie Bahnsen [02] (large image, minimal chrome); Bottega Veneta [K] (material close-ups beside products); Morph's own campaigns (content map §1): surreal, precise, editorial.

- **Pattern**: images as places rather than pictures in frames: full-bleed environments, hard crops for detail, one image at a time, crossfades under light.
- **Why it works**: the brand world is what visitors remember (research 02 pattern 6).
- **Why for Morph**: Morph already produced the right images (panther, red rope, lab hands, fragmented portrait); using them as environments is the fastest leap in quality available without a shoot (plan §8–9).
- **Complexity**: low–medium.
- **Risk**: image rights; resolution for crops (1920 px campaigns cannot be cropped hard).
- **What not to copy**: duotone or tinted treatments that recolour the product; image grids of equal cards.

## MATERIALITY

**References**: Deep Beauty [02] (WebGL exhibition, as a boundary of what not to do in a store); Abel Fragrance [A] (warm off-white and charcoal as quiet materials); Apple [K] (light and surface rendered with gradients rather than textures); Aesop store design as reflected on its site [K] (materials photographed, never faked).

- **Pattern**: materials suggested by light, edges and very low-contrast texture; real materials come from photography.
- **Why it works**: the eye accepts a surface when light and edges are right; texture detail matters less.
- **Why for Morph**: the boutique is dark wood, glass and warm light; a panelled, lit walnut and a glass shelf carry that without a stretched photo (plan §21).
- **Complexity**: medium (a bake script and careful tuning).
- **Risk**: fake-wood wallpaper effect; banding on gradients.
- **What not to copy**: 3D rooms; skeuomorphic wood photos; animated noise.

## E-COMMERCE

**References**: Serotoninn [02] (quick add, counts, WordPress); Coutumes [02] (reassurance in the buy flow); OMR Beauty [A] (replatformed beauty commerce); Abel Fragrance [A] (scent selector + bundle builder on Shopify); Aardvark [02] (e-commerce honors with a ritual reveal).

- **Pattern**: art-directed pages around a conventional, fast buy path: format selection, price in the CTA, reassurance at the decision point, bundles built from real products.
- **Why it works**: spectacle never costs the sale.
- **Why for Morph**: the plan keeps the Phase 05 buy-path rules and adds same-scent ritual sets (Body & Bath) and a gift journey from real products (plan §14.3, §15).
- **Complexity**: low–medium.
- **Risk**: bundles that imply a saving without checking prices.
- **What not to copy**: stacked gift-with-purchase thresholds; fake-urgency copy.

---

## Examples by the owner's specific questions

| Question | Examples | Principle for Morph |
|---|---|---|
| Product presented like sculpture | Annatwelve [A], Apple product pages [K], Rahasya [02] | one object, one light, a surface, scale beyond "card" |
| Meaningful page transitions | Aardvark [02], Serotoninn [02], View-Transitions editorial sites [K] | persistent frame + shared object |
| Sections with changing environments | Weekend Max Mara [A], MIU MIU [02], Decathlon Yestalgia [02] (a capsule with its own register) | collections as rooms relit by Morph's campaigns |
| Editorial integrated into commerce | Aesop [K], Essentiality of Beauty [A], The Fragrance Conservatory [02] | guides placed where the decision happens, not in a feed |
| Subtle but memorable motion | DG Beauty – Dolce loader [02], Annatwelve [A] | one grammar (light comes up) reused at every scale |
| Discovery beyond filters | DG Beauty Gift Finder [02], KAYALI finder [A], Abel scent selector [A], Aardvark genres [02] | families in notes, a notes index, a finder whose result explains itself |

## What not to take from any reference

- Another brand's visual identity: palettes, type pairings, layouts that make a site recognisable (research 02 and 04 list the ones closest to Morph's territory).
- WebGL environments, sound, games (Lacoste Ace Breaker is a game; it is out of scope for a fragrance store).
- Autoplaying carousels, pop-up newsletter modals, loaders on every page.
- Any pattern that hides the price, the format or the add-to-cart.
