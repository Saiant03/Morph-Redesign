# Phase 04 — Journey expansion (find → try → buy → combine)

Phase 03 built the storefront (home, collections, PDP) in the A Cromatic + C Strata system. Phase 04 adds the five supporting experiences that turn Morph's existing tools into one journey, using only the real snapshot data. No new visual language: every page is built from the Phase 03 tokens and components, plus six small components documented in `phase-03-design-system.md` (section "Phase 04 additions").

Captures: `captures/phase-04/` (`*-desktop-*` 1440, `*-mobile-*` iPhone 13 / 390, `*-tablet-top` 1024, `layering-mobile-bands.png`).

## Routes

| Route | Experience | Rendering |
|---|---|---|
| `/descopera` | Discover: lens instrument + trial formats + finder entry | dynamic (`?lentila=&nota=&parfum=`) |
| `/descopera/finder` | Fragrance Finder, Morph's 7 questions | dynamic (`?q1…q7=&pas=`) |
| `/descopera/finder/rezultat` | Finder result: match, reasons, try / buy / combine | dynamic (`?q1…q7=`, shareable) |
| `/layering` | Layering composer (full mode) + Your Next Form entry | dynamic (`?a=&b=`, shareable) |
| `/layering/your-next-form` | The 12 blind sets as an index | static |
| `/casa-morph` | Boutique, visitor's try list, Certilogo, the house | static (open-now and list are client-side) |

Unchanged: `/`, `/parfumuri`, `/parfumuri/[colectie]`, `/[slug]`. Their links to Morph's live quiz, `/layering` and the boutique now point to the concept routes.

## Navigation

Top level stays the five IA items from research 06: **Parfumuri · Descoperă · Layering · Cadouri · Casa Morph**. Descoperă and Layering are now real routes; Casa Morph too. Cadouri still leaves for Morph's gift-card page (no gift hub in scope).

Second level without a mega-menu: `SectionNav` under the page head (Descoperă: Explorează, Fragrance Finder; Layering: Compune, Your Next Form; the collection switcher on `/parfumuri` now uses the same component). In the mobile sheet the second-level items are indented under their parent. `aria-current` follows the path (product pages count as Parfumuri). Source: `lib/nav.ts`.

## Data dependencies (single sources)

| Data | Source | Notes |
|---|---|---|
| Perfumes, prices, stock, notes, family, intensity, longevity, season | `data/catalog.json` (Store API snapshot, Phase 02) | unchanged |
| Travel, sample, discovery, blind and layering sets | same snapshot | unchanged |
| Finder questions, per-perfume tags, weights, product IDs | **new** `data/finder.json`, from `npm run finder` (`scripts/finder.mjs`) | Downloaded from Morph's public quiz script (`/wp-content/plugins/morph-quiz/assets/quiz.js`); object literals converted to JSON as text, **nothing executed**. Joined to the catalog by Morph's own product IDs (23 of 23 map) |
| Scent colors | `lib/scent.ts` (Phase 03) | unchanged |
| Boutique facts | `BOUTIQUE` in `lib/catalog.ts` | extended with phone, online-order line, e-mail and per-day hours, all as printed in the morphparfum.ro footer/contact page (checked 2026-09-24) |
| Visitor's try list | `localStorage` only (`lib/tryList.ts`) | never sent anywhere |

No price or product fact is written by hand in a page; pages read it from the snapshot.

## 1. Finder and finder result

**Logic.** `lib/finder.ts` reproduces Morph's `selectResults()` exactly: weighted tag match (mood 5, personality 5, olfactive 4, occasion 4, projection 3, season 2, collection 4), ties broken by Morph's catalog order, two results inside a chosen collection, one per collection for "Oricare". Checked with the answer set seductive / sophisticated / oriental / events / moderate / autumn / any → Zeta (6 of 6 tags), Primitivo, A21.

**Flow.** One question at a time, Morph's own copy and order, auto-advance after 220 ms (Morph's value), back and jump via the seven progress strata, focus moves to the new question heading. Answers live in the URL, so reload and back work.
- Beside each answer, a small chord of the perfumes Morph tagged with it, with a count. Stated under the list: the colors are Morph's tagging.
- Beside the questions, the palette of the 23 tagged perfumes; each bar's width is its current score, so the selection visibly narrows with each answer. "Cele mai apropiate acum" names the current top three (live region). On phones the palette is a thin band above the question.

**Result page** (the Phase 01 gap: the live result ends at "Vezi parfumul"):
- Main match: bottle on its field, name as h1 with "Potrivirea principală", collection and concentration, the three-note descriptor.
- BUY and TRY side by side: "Adaugă 100 ml în coș · price" and the trial offer (`TryOffer`: travel 2×8 ml if Morph sells one, otherwise the collection sample set, or "epuizat" with Morph's link). Out of stock: "Stoc epuizat. Anunță-mă" to the PDP.
- **Why**: every answer, marked as matched or not against Morph's tags ("Morph l-a etichetat cu 6 din cele 6 răspunsuri ale tale"). No personality claims beyond Morph's own tags.
- Family, intensity, longevity (missing intensity shows "Nespecificată"), the note pyramid.
- Alternatives with the same structure, compressed.
- COMBINE: the layering composer with the first two results, labelled as a visualisation; "Deschide în Layering" keeps the pair.
- Answers summary with "Schimbă" per question (`?pas=N`), restart, a Casa Morph bridge, and the provenance line (source script, date, weight range, and the three perfumes the finder never returns: Malaga, Arles, Pure Soul — untagged in Morph's config).

## 2. Descoperă

An editorial instrument, not a filter panel: one lens at a time regroups the 26 colors.

| Lens | Field | Groups |
|---|---|---|
| Familie | `family` → 5 proposed groups (Phase 03) | 5, each with its most frequent notes |
| Notă | every note, accent-insensitive substring | La deschidere / În inimă / În bază: where the note sits in each perfume's development (the Strata reading of discovery). Search + the 14 most frequent notes as chips |
| Anotimp | `season` | 4 (a perfume can be in several; stated) |
| Intensitate și durată | `intensity` × `longevity` | only the combinations that exist, plus "Intensitate nespecificată" honestly |
| Colecție | `collection` | 3, with concentration and price |

"Ocazie" was not used: every perfume carries "Ocazii speciale" and "Seară", so it discriminates nothing.

Keys are buttons (color bar + always-visible name), not hover targets. Selecting one opens the preview: bottle, pyramid (the searched note is underlined), intensity / longevity / price, add 100 ml, `TryOffer`, product page, "Compune în Layering" (`/layering?a=slug`), try-list toggle. Desktop: sticky preview on the right, Zeta preselected so the panel is never empty. Phones: the preview opens in place under the group it was chosen from (CSS `order`, no duplicate DOM), with a close button. GSAP Flip shows scents moving between groups on lens change (skipped under reduced motion). State in the URL.

Below: the finder entry, and **Încearcă înainte de sticlă** — every trial product Morph sells with price and truthful stock (travel for 12 of 26 perfumes, 2 sample sets in stock, Discovery Travel 24 in stock; the older sample set, the Discovery 22 and the blind 6+1 set shown as sold out with Morph's link), plus the free-shipping arithmetic.

## 3. Layering

`LayeringComposer` gained a `detail` mode used on `/layering`:
- URL state `?a=&b=` (invalid or duplicate slugs fall back), "Copiază linkul combinației": every pair is a permanent, shareable URL (the IA's pairing pages, without inventing named pairings).
- **Ce au în comun**: shared notes with the tier in each perfume, the two families, intensity and longevity side by side, shared seasons. All read from data; "Niciuna în notele publicate" when there is nothing in common.
- **Formats table**: 100 ml price and stock, travel price or "nu există", for both.
- Actions: try both in travel (or the relevant sample sets), both 100 ml bottles when both are in stock, try-list toggle, and Your Next Form as Morph's own curated alternative.
- The label "o vizualizare … nu o recomandare Morph" stays on every instance.

**Mobile redesign (all instances):** the stage no longer shrinks the desktop columns. Order becomes heading → two slots side by side → stage → result. The stage turns into three horizontal bands (opening / heart / base): A enters from the left, B from the right, the multiplied overlap in the middle third is the layered result — same logic as desktop, readable at 390 px, driven by explicit taps.

Embedded instances (home, PDP, finder result) get "Deschide în Layering".

## 4. Your Next Form

What is public, and nothing else: 12 limited-edition sets, 2×8 ml, 230 lei, blind ("Fiind un blind set, identitatea parfumurilor este dezvăluită doar la deschiderea cutiei"), instructions and application order inside the box, each named for a state and described by Morph's accord sentence. Contents are not shown, inferred or matched to perfumes.

- Three short columns: what you know beforehand, what you learn when you open it, why (Morph's motto "evoluție constantă și Metamorfoză prin parfum").
- The 12 sets in the collection-index pattern (rows + sticky preview with the box packshot and Morph's full copy; thumbnails on phones). Add to cart, stock, link to Morph's page.
- `BlindStrata`: the composer's two strata columns drawn **without color**. In this system color always means a known scent; a blind set has none until opened. This ties the page to the composer without looking like a campaign microsite.
- Next steps: the composer (you already know your scents) and Casa Morph.

## 5. Casa Morph

Only verified facts: address, boutique hours, online-order phone and hours, boutique phone, e-mail, Certilogo process (Morph's four steps, verbatim meaning), the Google-review count from the audit (159) and what those reviews talk about (staff advice), Naples 2002 / Andrea Angelino / synesthesia / Bormioli bottle, unisex, free shipping from 750 lei, Morph Points exists.

- Visit block: the three collections as a labelled color wall (links to the collections), address, **open now** line computed from the published hours in Bucharest time, hours, "Deschide în hărți" and "Sună la boutique".
- **Ce vii să încerci**: the visitor's own list, built with "De încercat în Casa Morph" toggles in the finder result, Descoperă and the composer (perfumes and pairs). Stored only in the browser; framed as something to show on your phone, not a reservation.
- Why the visit, Certilogo, the house.

Not built because not verified: booking, consultations as a bookable service, events, workshops, staff names, boutique stock, boutique photography.

## Relationship to find → try → buy → combine

| From | Find | Try | Buy | Combine |
|---|---|---|---|---|
| Finder result | the match and why | TryOffer beside the CTA | 100 ml CTA with price | composer with the top two |
| Descoperă | lenses, note position | TryOffer in preview, full trial list | add 100 ml in preview | "Compune în Layering" |
| Layering | pick any two | both travels / sample sets | both bottles | shared notes, URL |
| Your Next Form | the 12 states | the set is the trial (2×8 ml) | add set | Morph-curated pair |
| Casa Morph | — | on skin, with the try list | — | pairs on the list |

## Interaction and motion

GSAP only for the Descoperă Flip (added to the two Phase 03 uses). Everything else is CSS: finder question entrance (640 ms), palette re-weighting (flex-grow 640 ms), composer bands (900 ms). No scroll-linked motion, no pinning. Reduced motion: Flip skipped, CSS collapsed; every state is readable static.

## Deviations from the design system

None in tokens, type or color. Additions (documented in the design system): `PageHead`, `SectionNav`, `TryOffer`, `TryToggle`, `BlindStrata`, `DiscoverInstrument`, `.text-btn`, `NotePyramid` `mark`, composer `detail` mode and mobile bands. The one conscious extension of the color rule: `BlindStrata` uses outline and a 6% ink tint where a scent color would be, to say "unknown scent".

## Verification

- `next build` passes (36 pages: 6 new routes). `tsc --noEmit` clean.
- `site-capture` 1440 + 390 on all 6 new routes: no console errors, no horizontal overflow. 768 and 1024 with reduced motion: no overflow.
- Playwright smoke test: full finder run → result URL → Zeta; add from result opens the cart; try list persists to Casa Morph; open-now line; `pas=3` edit; note lens URL, count line, highlighted note; composer pair from URL, change updates URL, invalid slugs fall back; mobile preview sits under its group; mobile bands visible. 0 console errors.
- Mobile finder result (390×664 content area): both "Adaugă 100 ml" and the travel CTA are in the first viewport.
- Not run: Lighthouse, screen reader, real devices.

## Remaining limitations

- The finder's tags are Morph's as published; three perfumes have none. Tag vocabulary includes values no question asks (e.g. "charismatic"), ignored as in Morph's script.
- Family grouping is still our 5-group proposal; "Gourmand" contains perfumes whose Morph family value is Gourmand even when their notes read otherwise (data, not a bug).
- Shared-note detection is exact wording after accent folding: "Trandafir" and "Trandafir de Damasc" are different notes, and related materials (e.g. two ambers) are not linked.
- Cart, notify form and try list are mocks; no checkout, account, points, or Certilogo lookup.
- Your Next Form contents and a blind-reveal page need Morph's decision; boutique assortment, booking and photography need Morph's input.
- Travel/sample stock is the 2026-09-24 snapshot.
