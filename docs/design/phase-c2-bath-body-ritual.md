# Phase C2: Baie & Corp, Coffret, Travel as one ritual

Scope: Morph's non-perfume commerce (shower gels, body creams, perfume + body sets, Travel Editions) and the paths that lead to it: `/parfumuri/corp`, the body product pages, the "Ritualul" chapter on perfume pages, the Travel chapter on `/descopera`, the Seturi navigation and search. C3 and C4 have not started. The header, the transition architecture, the vitrine (C1), the home page and the stage were not redesigned. Captures are in `captures/phase-c2/`.

## Content sources

Everything shown comes from these sources. Nothing was invented.

| Source | Used for |
|---|---|
| Store API snapshot (`data/catalog.json`, 2026-09-24) | 8 gels, 12 creams, 8 perfume + gel sets, 11 perfume + cream sets, each linked to its perfume by Morph's own product name (`scent`); prices, stock, Morph's short descriptions; 12 travel 2×8 ml sets; gift box (20 lei) |
| morphparfum.ro, Despre noi (read 2026-09-24) | Three sentences, quoted verbatim (`MORPH_SAYS` in `lib/catalog.ts`): the creams "perfecte pentru a fi utilizate împreună cu parfumul preferat Morph"; the cream + perfume sets are a limited edition "produse exclusiv o dată pe an, în preajma sărbătorilor de iarnă"; the travel sets "concepute pentru a transforma fiecare deplasare într-o experiență olfactivă de neuitat" |
| morphparfum.ro menu | Seturi = Set parfum și cremă · Set parfum și gel de duș · Eșantioane · Mini parfumuri (research 01 §4) |
| morphparfum.com menu (read 2026-09-24) | Morph's own international names: **Bagno & Corpo** (Body Cream, Shower Gel), **Coffret collection** (EDP + Shower Gel, EDP + Body Cream), **Travel Editions**, **Discovery Kit**, Gift Card. The concept uses "Coffret" and "Travel Editions" because they are Morph's own terms |

The relationship between perfume and body is the one Morph's catalogue has. Every body product belongs to exactly one perfume. The 12 scents with body products are the only ones shown. Animal, Montmartre, Nudo and Vision have a cream and no gel, so their shelves hold two objects. No scent was given a body product it does not have, and cross-scent body layering is not suggested.

## Before: Impeccable critique

Run with the official Impeccable skill (`critique`): the design review and the detector ran as two isolated subagents, and the detector found nothing. Findings on the Phase B page:

1. **It read as a category page.** 12 identical rows, each with three framed 200 × 267 px thumbnails (113 × 150 on a phone), all on the same beige.
2. **Objects had no presence.** In a 3:4 frame, a cream jar filled about 140 × 70 px. The perfume and the gel stood at the same height. Sets were lines of text, although Morph sells them as boxes.
3. **41 add buttons** (29 "Adaugă" and 12 "Adaugă setul"). C1 had removed exactly this pattern from the perfume index.
4. **No fixed slots.** Scents without a gel moved the perfume into another column. Out-of-stock tiles sat about 20 px lower.
5. **No atmosphere.** No window, no walnut, no use of `--glow`. Coming from the /parfumuri tab it felt like a drop from a gallery to a spreadsheet.

Kept: the "same scent, three textures" framing, the honest "separat X lei" line, Morph's own cream quote, and the Ritual chapter's place on the perfume page.

## Information architecture

- **Baie & Corp stays a room of Parfumuri**, the fifth tab after Toate · Les Exclusifs · Luxury · Ice. Room change and room title transitions are unchanged.
- **Body products get pages at Morph's own URLs** (`/morph-zeta-gel-de-dus-200-ml`, `/morph-crema-de-corp-n8`, `/morph-set-zeta`), served by the existing `/[slug]` route: 26 perfumes plus 39 body products and sets, all SSG. Research 06 asks for URLs to be preserved, and a body product needs somewhere to be bought once the room drops its buttons.
- **No `/seturi` page.** "Seturi" covers three intents that already have homes. The nav's Seturi group now links to them directly:

| Nav link (Parfumuri → Seturi) | Destination | What is there |
|---|---|---|
| Coffret: parfum cu gel sau cremă | `/parfumuri/corp#coffret` | the 19 perfume + body sets, on the walnut wall |
| Travel Editions 2×8 ml | `/descopera#travel` | the new Travel chapter; 12 scents |
| Mostre și Discovery | `/descopera#incearca` | sample sets, Discovery Travel, blind set (unchanged) |
| Seturi layering Your Next Form | `/layering/your-next-form` | unchanged |

- Baie & Corp gained a second link, "Ritualul fiecărui parfum" (`/parfumuri/corp#ritualuri`). The five primary items are unchanged.
- The Baie & Corp room closes with **"Alte seturi Morph"**: the three other set intents, each with its real count and price, linking to the page above. This is the set landing point, inside an existing room.
- Search: body results open their own page, not the room. "Coffret" and "Travel Editions" are pages in the index, and each per-scent travel set is searchable ("Travel Editions Zeta").
- On `/cadouri`, the Travel card's "Alege parfumul" now goes to `#travel`.

## Baie & Corp: the room

The same room grammar as the collections: a window, a plate crossing its lower edge, the tabs. The content below has its own rhythm, in three materials.

1. **The window is an object, not a photograph.** Morph has no body campaign imagery, so the window is the night stage with one scent standing in its three textures on one glass shelf: Zeta perfume, shower gel and body cream, at monument scale (the bottle ≈ 385 px tall at 1440, ≈ 450 at 1920). This is the page's authored moment, and C1 has nothing like it: one pool of light, three different objects on one line. It keeps the `room-image` name, so a tab change still changes the room in place.
2. **Ritualurile, on stone.** Every scent has its own short glass shelf and its own light, two scents to a row. The order is perfume → gel → cream. The name sits above in Newsreader, with the collection beside it. The page reads as scents, not as a grid of products: the product type is the object's silhouette (tall glass bottle, glass gel bottle, squat black jar) plus one serif word under it. Shelves with all three textures come first, the four pairs last. Under the heading, an index of the 12 scent names jumps to each shelf.
3. **Coffret, on walnut.** Morph's line about the sets, then two shelves ("Parfum și gel de duș" 8, "Parfum și cremă de corp" 11). Each open box stands in its own lit recess, as in the vitrine, since this is where Morph's gift objects live. Each label carries the stock count and "separat X lei", computed from the data. Rows are balanced from the count (11 at four a row stand 4 · 4 · 3). Then one sentence about the gift box (20 lei, from the cart) and the gift card.
4. **Alte seturi Morph**: three lines (Travel Editions, Mostre și Discovery, Your Next Form), each with its real price.

No kickers, no badges, no add-to-cart on objects. The one metadata line is the count under the title.

## The shared shelf: `ObjectShelf`

A new component, because none of the existing ones puts several objects on one line. It adds no new object system.

- Each object is Morph's packshot, unchanged. `data/objects.json` gives the object box inside the frame. The foot is set on the shelf line, and the packshot's white margins beside the object are trimmed from the cell, so a jar and a bottle stand close, as on a real shelf. Heights follow Morph's framing: the perfume stands tallest, the gel shorter, the jar squat.
- One pool of light per shelf, tinted by the scent's `--glow` (the only use of colour). It lights only the objects' row and ends at the shelf line, so labels sit on the room's own tone: light on night, dark on stone.
- The packshots multiply into the room itself. The shelf is deliberately not `isolation: isolate`: the frames reach past the shelf's box, and inside an isolated group their white showed as white rectangles.
- **2.5D where the imagery supports it.** The 8 shower gels are glass like the bottles, so `npm run lightmask` now also accepts body slugs, and all 8 have masks (checked by eye on a contact sheet: they follow the glass; N8 and Tonkatonic, being pale, have small holes near the base, where the streak has already faded). Creams (opaque black jars) and sets (boxes) get no mask and no light, because a streak on them would be fake. `ObjectLight` is reused unchanged, in `hover` mode.
- Hover and keyboard focus lift the object off the glass (the vitrine's `translateY(-2.5%) scale(1.035)`) and underline its name. Reduced motion: no lift, and `ObjectLight` does not attach.
- Link names read as "Zeta, Gel de duș 200 ml · 240 lei" (the scent is in a visually hidden prefix), so eight gel links stay distinct.
- `npm run objects` now also measures the 15 travel boxes. The existing 107 measurements are identical.

Reused unchanged: `ObjectLight`, `Stage` (two optional props, `src` and `id`, put a body object on its scent's stage and name it `obj-<slug>`), `Niche` (the Coffret recesses), `SectionNav`, the room classes of the collection page.

## Perfume ↔ body relationship

`Ritual` (`components/Ritual.tsx`) is the one component for it, and it is used in three places:

| Where | What it shows |
|---|---|
| Perfume page, "Ritualul N8" | the shelf (perfume marked as the current page, not a link; the gel and cream link to their pages), then the Coffret lines with price and "separat" |
| Body product page | the same shelf, with the current gel/cream marked; the perfume links back to its page |
| Baie & Corp | the window (monument) and the 12 room shelves (without the Coffret lines, which have their own section) |

The kicker ("Baie & Corp") above the chapter's heading was removed. The chapter's link goes to that scent's shelf in the room (`#ritual-<slug>`).

**Body product page** (`app/[slug]/BodyProduct.tsx`): the object on its scent's stage (same light as the perfume). Then the name of the scent, the type and format, and the perfume's notes, labelled "Notele parfumului Zeta" (the gel's own notes are not published). Then the price ("separat X lei" for a set), one "Adaugă în coș" button (or "Stoc epuizat" with Morph's page), and Morph's own description, verbatim and attributed. Cream sets also carry Morph's line about the yearly edition. Below that is the scent's ritual.

## Travel

A small chapter inside "Încearcă înainte de sticlă" on `/descopera`, anchored `#travel` and named Travel Editions, as Morph names it. The Zeta bottle and its travel box stand on one shelf ("the same scent, carried out of the house"), beside Morph's quoted sentence on the travel sets, the price and the count (12 of 26). The 12 scents stay as a list with one add per scent, and each thumbnail is now the scent's own travel box, not its bottle. The list is the choosing tool, so its buttons stay. It sits on the discovery page because Morph's travel sets are both the trial format and the portable one.

## Transitions

The architecture is unchanged: the same `obj-<slug>` names and `morph` share, now used by more objects.

| Path | Continuity |
|---|---|
| Baie & Corp shelf → gel / cream page | the object morphs into its stage |
| Coffret box → set page | the box morphs into its stage |
| Perfume page ritual → gel / cream page | the object morphs into its stage |
| Body page ritual → perfume page | the bottle morphs into the perfume's stage |
| Collection tab → Baie & Corp | room change in place (`room-image`, `room-title`), as between collections |
| Nav / "Alte seturi" → Travel, Coffret | anchor navigation, no shared object (none is meaningful) |

Names stay unique on every page: the room's Zeta shelf carries no names because the window holds them, and on its own page an object is marked current and unnamed.

## Responsive

| Width | Window | Rituals | Coffret |
|---|---|---|---|
| 1920 | bottle ≈ 450 px | 2 per row, shelves ≈ 330 px tall | 4 · 4 and 6 · 5 |
| 1440 | bottle ≈ 385 px | 2 per row | 4 · 4 and 4 · 4 · 3 |
| 1024 | bottle ≈ 260 px | 2 per row | 4 · 4 and 4 · 4 · 3 |
| 768 | bottle ≈ 225 px | 2 per row (labels 16 px) | 3 · 3 · 2 and 3 · 3 · 3 · 2 |
| 390 | bottle ≈ 170 px, light bleeds to the screen edges | 1 per row | 2 per row |

- Long names ("Cremă de corp", "Travel Editions") wrap inside their column. Column widths follow the object or its label, whichever is wider.
- Nothing depends on hover. On touch, objects stand in still light and the whole object and label is the target.
- No horizontal overflow at 390 / 768 / 1024 / 1440 / 1920 on the room, a gel, a cream, a set and the perfume page (in the smoke sweep).

## After: Impeccable pass

The detector (`impeccable detect`) found nothing on the changed files. An independent design review (a subagent that did not see the implementation notes) screenshotted every new state at 1440 and 390. It judged the window and the Coffret wall part of the /parfumuri world, with no unblended packshots, no clipping and no overflow. Fixed in one batch:

1. Section padding lost on `#ritualuri` and "Alte seturi" (the global `.wrap` shorthand won at equal specificity).
2. Body page on a phone: the credit "Din descrierea Morph" rendered above the text it credits (a shared `order` rule).
3. Hard light edges: the pool ended in a line in mid-air beyond the glass. The glass edge now runs as wide as the light and fades with it, and the grey band under the labels is gone.
4. On 1440 × 900 the H1 sat below the first screen (y = 1009). The monument is shorter and the H1 is now in view.
5. Headroom on the stone shelves (about 80 px between name and bottles) is now zero. The Coffret lines are centred under their shelf. The Travel shelf's two objects now behave the same (neither is a link) and no longer repeat the heading.
6. Flexibility: an index of the 12 scents under "Ritualurile" jumps to each shelf, because the phone page is long.
7. Coffret link names now name the set type, "stoc epuizat" no longer wraps, and the stock count is out of the heading.

Considered and left as is:
- The twelve stone shelves repeat the same three labels. That repetition is the ritual itself (the same three textures, scent after scent). The object silhouettes and the scent's light carry the difference.
- The travel list keeps one "Adaugă" per scent, because it is the tool for choosing.
- Seven of the eleven cream sets are sold out and still shown, muted. Morph says the cream sets are a yearly edition, and that sentence stands beside them.
- A Vision set page repeats its notes (the descriptor, then Morph's own "Note de vârf…" text). Morph's text is quoted as published.
- The footer rule under the last link row predates C2.

## Verification

- `tsc --noEmit` is clean. `next build` passes, and `/[slug]` now prerenders 65 pages.
- `npm run smoke`: 37 checks. New checks:
  - the room: the window holds three textures, 12 rituals, Animal as a real pair, Coffret 8 + 11, no add buttons, all feet on one line (±2 px);
  - room gel → gel page morph, add at 240 lei, ritual → perfume morph;
  - perfume page → cream page morph on a phone;
  - Coffret set → set page with the separate price and Morph's line;
  - every Seturi nav link reaches its target;
  - Travel shelf and the 12 scents;
  - keyboard focus and hover lift, reduced motion still.

  The nav and overflow checks were updated. The overflow sweep now covers 1920 px and the body pages.
- Not run: Safari, Firefox, real devices, screen reader, Lighthouse.

## Known limitations

- Relative scale comes from Morph's packshot framing, not from measured dimensions. The gel may be taller than the 100 ml bottle in reality.
- The cream packshots are framed differently (Tonkatonic's is taller), so jars differ slightly in size between shelves.
- Body descriptions are Morph's, verbatim. Some are uneven: Vapor's cream and Tonkatonic's cream have none, and N8's cream text reads as the perfume's story.
- Stock is the snapshot's. Morph's .com lists Animal Travel as sold out, while the .ro snapshot has it in stock; the concept follows the .ro data.
- Room fragrances (Parfumuri de cameră) stay out: they are not in the snapshot.
- The monument always shows Zeta, the house's hero scent. It does not rotate.
