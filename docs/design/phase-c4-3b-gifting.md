# Phase C4.3b — Gifts and the Morph newsletter

Implements `phase-c4-3-gifting-newsletter-plan.md` with the owner's decisions on §9 (2026-09-25):

1. The label is Morph's own, "Newsletter Morph".
2. The newsletter is a compact band in the footer that links to Morph's form. The concept has no form.
3. Coffret gets a block on `/cadouri`: up to three sets in stock and a link to all of them.
4. The 150 RON voucher stays out.
5. The Finder link keeps the owner's sentence word for word.
6. The gift-card values are typographic, on walnut, without Morph's card graphic.
7. The budget index goes last.
8. There are no seasonal chapters.
9. Burlat and Fil Rouge stay out.

## `/cadouri`

Order:
1. Head.
2. **"Cât de bine știi parfumul cuiva?"**: three answers as anchors (bottle / sample set / "Gift card" on walnut). Nothing is stored.
3. **Dacă știi ce poartă**: three bottles, the vitrine and collection links, and the gift box with its image.
4. **Coffret** (walnut):
   - Morph's line "Seturi Morph cadou – …" (home page), quoted.
   - Stock per kind, from data.
   - Up to three in-stock sets, alternating gel and cream.
   - "Toate seturile Coffret" → `/parfumuri/corp#coffret`.
5. **Dacă nu știi încă**:
   - "Ai o bănuială?" with the owner's sentence and a link to `/descopera/finder`.
   - Travel 2×8 ml, the two sample sets ("Mini sticle de 2,5 ml, cu pulverizator", no count and no list, because Morph's lists conflict) and Discovery Travel 24 × 8 ml.
6. **O surpriză** (night): Your Next Form, with Morph's blind-set sentence quoted instead of the old paraphrase.
7. **Gift card Morph** (walnut):
   - The five values from the snapshot.
   - Delivery by e-mail with "De la" and an optional message of up to 500 characters.
   - Bought and used only online.
   - Valid 180 days from issue.
   - Cannot be returned, refunded or cancelled; no cash on delivery.
   - An outbound button, plus the date the conditions were checked.
8. **După buget**: one row per format; Travel and Your Next Form are no longer merged. The Coffret ranges and the gift card are included.
9. A practical line: free delivery from 750 lei (as displayed by Morph), no weekend delivery, holiday delays and a link to Morph's terms. It gives no delivery date.

Removed:
- The concept lede presented as a Morph fact.
- The "amounts not in the snapshot" note.
- The hard-coded gift-box price.

## Data

`scripts/snapshot.mjs` now stores the gift card's fixed amounts as `gift[].values`, read from the "Alege suma" attribute. `npm run snapshot` on 2026-09-25 changed only `snapshotAt` and this field: `[230, 360, 690, 790, 1100]`, plus `null` for the gift box. No price or stock changed, and no room fragrance was added.

## Gift box

Morph offers "Cutie cadou (+20 lei)" on the 100 ml bottle, the travel 2×8 ml, the sample sets and the gel. It is not offered on Your Next Form, Coffret or Discovery Travel. Creams were not checked, so they are excluded.

- `lib/catalog.ts`:
  - `boxable(key)` holds that list.
  - `boxItem(key, name)` builds the line `cutie:<key>`, with `of: key`.
  - `imageFor` recognises the prefix.
- `lib/cart.ts`: a line with `of` belongs to its parent. Removing the parent removes its box, and a box never outnumbers its parent: `setQty` clamps it in both directions.
- `CartDrawer`:
  - The single cart-wide checkbox (key `cutie`) is gone.
  - Each eligible line has its own checkbox, named after the line.
  - Unticking one leaves the others.
  - The box line is not listed separately; it shows "× n" when there are several.
- `PurchaseBlock`: the price comes from `giftBox`. The box is offered for the format chosen (100 ml or travel), with a key per item.
- `/parfumuri/corp#coffret`: the sentence no longer says the box "is added from the cart" to a Coffret. It says the Coffret comes in its own box and names where the gift box is offered.

## Footer

"Newsletter Morph", Morph's promise quoted from `/abonare-newsletter`, and "Abonează-te pe morphparfum.ro" (external). Under it, Morph's unsubscribe sentence and a link to its privacy policy.

There is no field, form, incentive or success state. The vertical spacing of the band and of the concept note is scoped to `.footer`, because `.wrap` resets margin and padding. The note's missing top spacing was an existing bug.

## Navigation

The Cadouri panel follows the page: Știu ce poartă · Nu știu încă · O surpriză · Gift card · După buget.

## Tests

`npm run smoke`:
- The old `/cadouri` check was replaced. It now covers the three answers, Coffret 1–3 plus its link, the Finder link and sentence, the five values from data, "180 de zile" exactly once, no image in `#card`, budget last, no "voucher", "Burlat" or "Fil Rouge", and no form or e-mail field on `/cadouri` or in the footer.
- New: the footer links to `/abonare-newsletter` in a new tab, with no invented label or incentive.
- New: one independent box per eligible line. Unticking one leaves the other and lowers the subtotal by 20 lei, the box goes with its line, and a Coffret gets no box.
- The mobile sheet also checks "Știu ce poartă".

The Impeccable detector (`detect`) on the changed files flags only `transition: width` on the cart's shipping bar, which predates this phase.
