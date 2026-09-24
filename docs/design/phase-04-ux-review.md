# Phase 04 — UX review

Each new journey walked as a visitor would, on the built pages (1440, 1024, 390), with the captures in `captures/phase-04/`. No overall ranking; each journey is judged on its own terms. Changes made because of this review are listed at the end.

## Journey 1 — Fragrance Finder → result

**Starting point** home ("Găsește-ți parfumul"), Descoperă, header → Descoperă → Fragrance Finder, empty collection results.
**User goal** "I don't know Morph; tell me where to start."
**Discovery** seven of Morph's questions; the palette narrows as they answer; each answer shows which scents Morph tagged with it.
**Decision** the match with its bottle, notes, price, and a line per answer saying whether Morph tagged the perfume with it.
**Action** add 100 ml, or try travel / sample set, or open the top two in the composer, or add to the Casa Morph list.

1. Purpose obvious? Yes: title, lede ("la final vezi de ce…, cât costă și cum îl încerci") and the first question are in the first viewport.
2. Next step obvious? Yes. The result's first action pair is buy and try, with prices, before any explanation.
3. Uniquely Morph? Yes: Morph's questions, Morph's tags, the scents' own colors as the answer chords and the narrowing palette.
4. Connected to the catalog? Yes: results link to PDPs, alternatives, and the composer; the reasons are catalog-backed.
5. Trying easier? Yes: the trial option sits next to the buy button, with the right format (travel vs sample set) chosen from data.
6. Purchase easier? Yes: the live finder never shows a price; here price and add are in the first mobile viewport.
7. Reason to explore layering? Yes: the result page composes the top two results.
8. Useful without animation? Yes; only the question entrance and palette widths animate.
9. Mobile preserves the concept? Yes: palette becomes a band above the question, answers are 60px rows; the result puts both CTAs in the first viewport.
10. Generic / unnecessary? The seven questions still ask about personality ("Rebel", "Ambițios") with a mood vocabulary Morph chose; that is Morph's content, kept as-is. The answer chords for mood questions are less meaningful than for olfactive/season ones.

## Journey 2 — Descoperă

**Starting point** header Descoperă; home "Încearcă" links; empty-state links.
**User goal** "Show me what Morph has in a way I can reason about" or "I want something with vanilla / for autumn / long-lasting."
**Discovery** a lens regroups the 26 colors; the note lens shows where a note sits (opening, heart, base) in each perfume.
**Decision** the preview: notes (searched note underlined), intensity, longevity, price.
**Action** add 100 ml, try (travel or samples), product page, compose in Layering, add to the Casa Morph list; lower on the page, every trial format with stock.

1. Purpose obvious? Yes: the lede names the lenses and the trial step.
2. Next step obvious? Yes on desktop (preview preselected). On phones, tapping a color opens the preview right below its group.
3. Uniquely Morph? Mostly: the color keys and the note-position view come from Morph's data. The lens buttons themselves are a common pattern.
4. Connected to the catalog? Yes: preview → PDP, and the lenses reuse the family groups and URL-state approach of `/parfumuri`.
5. Trying easier? Yes: the full trial list (including sold-out items stated as such) is on this page instead of under "Seturi".
6. Purchase easier? Yes: price and add in the preview; no PDP visit needed to buy.
7. Reason to explore layering? A direct "Compune în Layering" from each preview, and the closing band.
8. Without animation? Yes; Flip only helps track movement.
9. Mobile? Yes: lenses scroll horizontally, keys are a 3-column grid of 44px+ targets, preview inline.
10. Generic / unnecessary? The season lens is weak (21 of 26 are "Toamnă"); kept because it is a real Morph attribute people shop by. "Ocazie" deliberately left out.

## Journey 3 — Layering composer

**Starting point** header Layering; "Deschide în Layering" from home, PDP and finder result; "Compune în Layering" from Descoperă.
**User goal** "What happens if I wear these two together, and how do I get them?"
**Discovery** two slots, the strata columns (desktop) or bands (phones) overlap tier by tier; merged notes per tier.
**Decision** "Ce au în comun" (shared notes, families, intensity, longevity, seasons) and the formats table.
**Action** both travels (or the sample sets), both bottles, copy the link, add the pair to the Casa Morph list, or switch to Your Next Form.

1. Purpose obvious? Yes: "Compune" + one sentence on what the columns mean.
2. Next step obvious? Yes: the travel pair button carries the total price.
3. Uniquely Morph? Yes: it only works because every Morph scent has its own color and a published three-tier pyramid; the blind alternative is Morph's own product.
4. Catalog? Yes: every slug is a PDP; the URL is a pairing page.
5. Trying? Yes: travel pair by default, sample sets when a travel does not exist.
6. Purchase? Yes: two buy paths with totals.
7. Layering reason? It is the layering page; the shared-notes line gives a concrete reason to try a pair.
8. Without animation? Yes: the overlap is a static state.
9. Mobile? Redesigned, not scaled: slots side by side, then the band view, then notes.
10. Generic / unnecessary? The desktop axis labels still repeat the result list (noted in Phase 03). The combination has no name of its own; naming visitor pairs would be inventing.

### Signature interaction check

| Criterion | Assessment |
|---|---|
| Memorable | Two colors becoming a third, tier by tier, is a single clear image; the bands make it hold on phones |
| Useful | Shared notes, formats and prices answer the practical questions; the URL keeps the result |
| Morph-specific | Colors and pyramids are Morph's data; the blind sets are the curated counterpart |
| Understandable | One sentence of instruction; tier labels on both layouts; no hover required |
| Commercially connected | Two priced actions and Your Next Form in every instance |

What it does not do, on purpose: predict how the pair smells, rate it, or call it recommended.

## Journey 4 — Your Next Form

**Starting point** Layering sub-nav, the band under the composer, home, the composer's "lasă-te surprins".
**User goal** "What are these sets and which one should I pick without knowing what's inside?"
**Discovery** how the blind mechanic works; the 12 states with Morph's accord notes.
**Decision** state name + accord notes + price + stock.
**Action** add a set; or go to the composer if they know their scents; or Casa Morph.

1. Purpose obvious? Yes: lede + the three columns.
2. Next step obvious? Yes: every row has "Adaugă" with price.
3. Uniquely Morph? Yes; the colorless strata say "blind" in the composer's language.
4. Catalog? Linked to the composer and to Morph's set pages; deliberately not linked to perfumes (blind).
5. Trying? The set is itself a 2×8 ml trial of two scents.
6. Purchase? One tap per set, price visible.
7. Layering? It is Morph's layering line; the composer is one click away.
8. Without animation? Yes.
9. Mobile? Rows with thumbnail, name, notes, price, add.
10. Generic / unnecessary? The box packshots are near-identical; the preview image adds little beyond the name on the box.

## Journey 5 — Casa Morph

**Starting point** header Casa Morph; PDP assurance line; finder result bridge; footer links; the try-list toggles.
**User goal** "Where is it, is it open, can I try what I found?"
**Discovery** address, open-now, hours, the visitor's own list.
**Decision** go / call / show the list in store.
**Action** maps, call, remove items from the list, Certilogo.

1. Purpose obvious? Yes.
2. Next step obvious? Yes: "Deschide în hărți" and "Sună la boutique".
3. Uniquely Morph? The try list and the collection color wall connect it to the rest; without boutique photography it is still the least visual page.
4. Catalog? Collections linked; list items link to PDPs and pairs to the composer.
5. Trying? That is its role; the list carries what the visitor found online.
6. Purchase? Indirect by design.
7. Layering? Pairs on the list link back to the composer.
8. Without animation? No animation.
9. Mobile? Actions full-width, wall shortened, list rows compact.
10. Generic / unnecessary? "De ce merită drumul" is short on proof; it only states what is verified (reviews talk about the staff). A consultation booking would help but is not verified as a service.

## Targeted improvements made from this review

- Finder page: removed the header chord (the palette beside the questions already shows it).
- Descoperă: preview preselected (Zeta) so the desktop panel never opens empty; removed the duplicate "Explorează după" label under the "Explorează" heading.
- Casa Morph: removed the third repetition of the address from the page head; the color wall now labels and links its three collections instead of being decoration.
- Your Next Form rows: show Morph's own note phrase for the accord ("Cu note de bergamotă, iris…") instead of the marketing sentence, falling back to it for the three sets whose copy names no notes.
- Composer on phones: rebuilt as bands with slots first (initial build scaled the desktop stage).

## Still open

- Photography (boutique, ingredients) for Casa Morph and Your Next Form.
- Mood-question chords: consider hiding them for mood/personality questions after testing with users.
- The home page still lists the 12 set names inline; could become one link once Your Next Form is established.
