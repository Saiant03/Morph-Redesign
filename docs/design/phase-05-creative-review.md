# Phase 05 — Creative director review

Done on the built concept (`next build` + `next start`), from the captures in `captures/phase-05/` (1440, 1024, 390 and overlay states), before and after the targeted fixes listed at the end. Judged against the Phase 05 brief, not against Phase 03–04.

## The fifteen questions

1. **Does it feel like a fragrance house?** Yes, more than any previous phase. The first viewport is a campaign (Morph's motto, one bottle, a museum label with its three notes), not a product database. The weakest point is the stone reading chapters, which are clean but closer to a well-made store than to a house.
2. **Does the product feel like a luxury object?** Yes. The lit niche gives every packshot the same staging, from the 800px hero to the 32px buy-bar thumbnail. The Les Exclusifs smoked bottles and the Luxury label bands read as materials, not colors. Limit: 768px packshots on white; close crops blur.
3. **Materially connected to the boutique?** Yes in atmosphere: dark room, walnut vitrines, lit recesses, a single burgundy wall on Casa Morph. It is an interpretation, not a portrait: without boutique photography the page cannot show the real space.
4. **Authored rather than templated?** Mostly. The niche, the museum label, the finder shelf that lights up, the layering score with its seam and echoes, and the unlit niches for blind sets are specific to this concept. The filter bar and the footer are still conventional.
5. **Pomelli DNA visible without being literal?** Yes: monochrome tones, editorial serif, precision labels, metamorphosis as behaviour (light coming up, light changing with time, bottles lighting as answers narrow). No butterflies, smoke or melting objects.
6. **Metamorphosis through behaviour?** Yes, in four places: the entrance (the niche unmasks, then its light comes up), time on skin (the light warms and lowers from opening to base), the finder (the shelf narrows by light), the composer (notes recompose opening → base on every change).
7. **Color supporting, not dominating?** Yes. Removing `--glow` changes no section's meaning. What color remains is the packaging in Morph's own photographs, which is product truth.
8. **Layering as composition, not color mixing?** Yes. Two objects, notes set against each other by tier, shared notes on the seam, echoes across tiers, formats and prices, and the statement that a visitor's pair is a visualisation, not a Morph recommendation.
9. **Discovery as fragrance discovery?** Largely. Groups are titled in notes and filled with bottles, the preview leads with the object and the descriptor. The lens row itself is still a UI control.
10. **Does the homepage create desire?** The hero, the three vitrines and "Cele mai alese" do. The families index is informative more than desirable.
11. **Does the PDP create confidence?** Yes: object, name, notes, format tiles and CTA in the first mobile viewport, family / intensity / time on skin, Morph's own description as a quote, Certilogo and the boutique near the CTA. Still missing: reviews (Morph has none) and real close-ups.
12. **Discover, try, buy naturally?** Yes. Try is two explicit paths (acasă / în persoană) on Home and Descoperă; every preview and result pairs buy with try; the cart shows objects and quantities.
13. **Premium without animation?** Yes (checked with reduced motion in the smoke test): all states are static and complete; the dim layer and reveals never hide content.
14. **What still looks generic?** The filter bar (search + chips + sort + view), the `PageHead` on Descoperă and the Finder, the footer, the Descoperă lens buttons, the promo row inside the index.
15. **What should be pushed further?** Real photography (sculptural glass, the twist in raking light, boutique interiors) to replace the packshots in the hero, the "Obiectul" chapter and Casa Morph; one campaign image per collection vitrine; a named, Morph-approved pairing or a blind-reveal page for Your Next Form; a less conventional collection filter.

## Targeted changes made from this review

- Hero headline overflowed its column at 1440 ("Metamorfoză"): display size capped for the hero; lede and CTAs anchored to the bottom of the column so the text and the niche share one height.
- The same Zeta image appeared in the hero, the "Obiectul" chapter and the default composer: the chapter now uses Morph's angled Antigua Bay shot (the twist is visible), the home composer defaults to Animal + Tonkatonic, and the vitrine and boutique wall no longer repeat bottles shown in adjacent chapters.
- Wood grain read as literal stripes with a visible tile seam: contrast lowered, frequency widened, the texture now stretches over the band (no seam).
- Several spacings were silently lost because the global `.wrap` shorthand beat module margins/paddings on the same element (PDP story, collection head, finder result, search overlay): fixed by specificity, documented in the design system.
- `Reveal` never fired because a clip-path'd target never reports an intersection: it now observes an unclipped wrapper.
- Search dropped fast keystrokes after `/`: the input is focused synchronously and its previous query selected.
- Families line wrapped into a one-word column (a module selector targeted a global class): given its own class.
- Seasons read "Primavară" from the Store API: shown as "Primăvară".
- Mobile home was 11,047px: the classification line, the Your Next Form list and half the boutique wall are hidden on phones, and the composer's score header (which repeated the names under the objects) is hidden on phones. Now 10,521px: still longer than Phase 03 (≈7,000px) because of the added object and boutique chapters; below the live site (≈12,000px). Next candidate to shorten: the families index on phones.
- Tabular period spacing ("1 . 250 lei") removed: lining figures without tabular spacing.

## Verdict

The concept now has a point of view that is Morph's, not a template's: objects in light, rooms in material, discovery in fragrance language. It is not finished work for a pitch until the photography exists; the system is built so that a real shoot drops into the niche without layout changes.
