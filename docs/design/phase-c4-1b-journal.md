# Phase C4.1b — Journal

Date: 2026-09-25. Implements the Journal scope of `phase-c4-1-editorial-plan.md` (§4, §7, §8). Where the owner's decisions for this phase differ from that plan, the owner's decisions apply. Out of scope, and not started: `/despre-noi`, the perfumers section, PDP credits, C4.2, a home Journal teaser, and categories.

Starting state: `main` at `1dbe399` (C4.1a), clean working tree.

## Owner decisions applied (they replace the plan where they differ)

- Three entries: J1 Your Next Form, J2 the layering workshop, J3 Primitivo.
- Index lede: "Lansări, campanii și povești Morph, fiecare cu sursa ei."
- **J1 and J2 are not reproduced.** Each page carries a short attributed Morph excerpt, a concept-written summary of verified facts, the publication date, and "Citește articolul integral pe morphparfum.ro" (twice: in the head and after the summary). This replaces the plan's verbatim rule (§4.1), Morph's headings as sections, and the "[…]" treatment.
- **J3 is a concept campaign page**, labelled "Campanie · pagină a conceptului", with the lede "Pagină a conceptului, din imaginile și textele Morph despre Primitivo. Nu e un articol Morph." It carries **no date**: no launch date is derived from a media filename or from the product's creation date. The images are captioned "Imagine Morph asociată parfumului Primitivo", never "campania de lansare".
- No Gate 17 perfumer credit and no founder narrative. Carbonnel/Carbonell stays open.

## Routes

| Route | Content |
|---|---|
| `/jurnal` | Index: title, approved lede, J1 + J2 as a pair (one date, one subject: the collection and the workshop), J3 under "Campanii", then "Toate articolele Morph sunt pe morphparfum.ro ↗" (https://morphparfum.ro/blog/). |
| `/jurnal/your-next-form-noua-colectie-morph-dedicata-layering-ului` | J1, Articol Morph (Morph's slug kept). |
| `/jurnal/primul-workshop-morph-dedicat-layering-ului-cum-a-prins-viata-universul-your-next-form` | J2, Articol Morph (Morph's slug kept). |
| `/jurnal/primitivo` | J3, Campanie (concept slug). |

`app/jurnal` is a static segment, so it takes precedence over the product catch-all `app/[slug]`. `dynamicParams = false`: only these three slugs exist.

## The two voices

- **Morph** (`data-voice="morph"`): always a `<figure>` with a `<blockquote cite>` in the serif between „ ”, followed by who said it, where, and a link to the source. The text comes only from `data/journal.json`.
- **Concept**: everything else, in the grotesk: the type labels, ledes, the "Pe scurt" summary (introduced as "Rezumat scris pentru concept, doar din ce spune articolul."), the dated notes, captions and alt text. It lives in `lib/journal.ts`. The index meta line states the rule: "Citatele sunt ale Morph, cu sursa lor; restul textului e scris pentru concept."

Morph wording actually shown:
- J1 (post 43913, paragraph 3, sentences 2–5): „Atunci când două parfumuri se întâlnesc, ia naștere o nouă energie. O nouă stare. O nouă perspectivă asupra modului în care alegi să te exprimi. O nouă formă.”
- J2 (post 43904, paragraph 4, sentences 2–3): „Atunci când nu mai vezi flaconul și nu mai citești numele parfumului, alegerea devine mult mai sinceră. Rămâne doar emoția pe care o transmite parfumul și felul în care acesta rezonează cu tine.”
- J3 (Store API product text): the first paragraph of the description, its last sentence, and "creat de Mathieu Nardin" from the summary. Notes come from the existing `NotePyramid`.
- The J1 titles are Morph's titles; the J1 stage ledger (dates and the four names per weekend) restates facts from the article.

Concept notes (dated facts): J1 "Oferta de pre-lansare s-a încheiat pe 27 iulie 2026." and "Colecția e disponibilă din 1 august 2026."; J2 "Morph nu publică data, locul sau numărul invitaților." and the same availability line.

## Data: `npm run journal`

`scripts/journal.mjs` reads exactly two records, `wp-json/wp/v2/posts/43913` and `/43904` (`_fields=id,date,modified,slug,link,title,content`), and the Primitivo record already in `data/catalog.json`. The article body is parsed in memory, and only the following is written to `data/journal.json`:
- the source metadata: post or product id, URL, API URL, slug, title, published and modified dates (snapshot date for J3);
- each excerpt with its position (`p`, `s` for the posts; a named position for J3) and `voice: "morph"`.

No article body, heading list or image is stored. The script is deterministic: two consecutive runs produced byte-identical output. There is no crawler: adding an entry means adding a post id and an excerpt position.

## Images

| Image | Where | Status | Check |
|---|---|---|---|
| `ynf-lead.avif` (new; `2026/07/your-next-form-slide.avif`, Morph's J1 lead, 1920×1353) | J1 lead, index | concept | Box grid with state names; no people, no promo text. A different frame from `ynf-boxes` (the plan's assumption that they matched was wrong), so the Your Next Form page head is not repeated. |
| `workshop-4.avif` (existing) | J2 lead, index | concept | A hand holding an open YNF box. A plain ring, no face. |
| `primitivo-rocks.avif` (new; `2025/10/Primitivo-Morph-Slider-2.avif`, 1920×1080) | J3 opening, full bleed; index | concept | Checked at full size: bottle between rocks, no people, no text beyond the bottle label. |
| `primitivo-rig.avif` (new; `2025/09/Primitivo-Slider-Morph.avif`, 1920×1080) | J3, full width | concept | Checked at full size, in quadrants: five gloved hands and bare wrists, no faces, tattoos or jewellery; the blotter strip has a QR code, and there is no text beyond the bottle label. Suitable. |
| Primitivo packshot (existing) | J3 `Stage`, linked to the PDP (`obj-<slug>` transition) | product | |

Each caption links to the file in Morph's media library (`imageSource()` reads `data/assets.json`; it only returns images with `concept` status).

**Not used:**
- `workshop-3.avif`: the plan proposed it as J2's lead, but the "Your Next Form awaits" card in it carries a **participant's handwritten name** (already noted in C3). It is still `concept` in `assets.json` and now carries a note; it is used nowhere.
- `workshop-slide.avif` and `workshop-2.avif`: added to `assets.json` as `pending` (identifiable guests). They are not downloaded.
- `your-next-form-1`, `-2` and `-3`: not added and not downloaded. `-1` and `-2` wait for the content and identifying-details check; `-3` shows an identifiable person.
- `Primitivo-Morph-Slider-3` (figure in fire): not added.

## Ice correction

`ice-campaign-m.avif` was checked at full size (745×1000). It shows the Primitivo bottle on a gloved palm, a blotter strip in another gloved hand, a lab clamp, and a dark block at the bottom. **It shows no sand.** The landscape frame shows sand, the blotter strip and the bottle.

- `lib/campaign.ts`: the alt text is now "Imaginea Morph a colecției Ice: mâini în mănuși de laborator țin o fâșie de testare și sticla Primitivo".
  - One `<img>` inside `<picture>` serves both crops, and an `alt` cannot change by media query without client JavaScript. The text therefore names only what **both** crops show, which makes it accurate on phones as well; it is not a separate mobile alt.
  - "Campania" and "fiolă" were removed.
- `data/assets.json`: both Ice entries have exact subjects (the mobile one records "no sand in this crop") and `"campaign": "C16 Primitivo; C25 collection slides"`. The phrase "launch shoot" is not used.
- The image, the crop, `pos`/`posM`, the layout and the room transition are unchanged.

## Navigation

- `lib/nav.ts`: `JOURNAL = '/jurnal'` (internal, no `ext`); `MORPH_BLOG` holds the external blog URL. The Magazinul item's `match` now includes `/jurnal`, so the header marks Magazinul on the Journal pages.
- Footer: "Jurnal" → `/jurnal`, without the arrow.
- `SiteHeader.tsx`: comment generalised; the external-link rendering stays for any future `ext` link.
- `/layering/your-next-form`: "Cum a început: workshopul Morph de layering" → J2, in the ledger under Morph's quote.

## Verification

- `npx tsc --noEmit`: clean. `npm run build`: 84 static pages, including the 3 Journal pages.
- Screenshots at 1440 px and iPhone 13, with reduced motion, for all four pages: no horizontal overflow and no console errors. One fix came out of this review: the J3 quote had inherited the column's 48 px gap between Morph's text and its attribution.
- `npm run smoke` on a fresh production server: 54 existing checks plus 4 new ones.
  - All Journal, nav, YNF and Ice checks pass.
  - 6 checks fail, all with `page.goto` timeouts on `/descopera` and `/descopera/finder`. The cause is that `/_next/image` requests from headless Chromium never complete (curl serves them in 30 ms).
  - **The same failure reproduces on an untouched build of `1dbe399`** (4 timeouts on the same pages). It is a problem of this environment, not a C4.1b regression. It was not fixed here.
- New and updated checks:
  - nav: the Jurnal link is `/jurnal` in the same tab, and the footer links it;
  - `/jurnal`: three entries, each with its type label and a `target=_blank` source link, the approved lede, one link to Morph's blog;
  - each entry at desktop and phone width: the type label in the head, the source link, a Morph quotation, "Citește articolul integral…" and the date (articles) or the concept label (campaign), no horizontal overflow, and no `img`/`source` referring to any `pending` asset, to `your-next-form-1/2/3` or to `workshop-3`;
  - `/layering/your-next-form` → J2 link;
  - the Ice alt on `/parfumuri/ice` and on the home card (phone): contains "sticla Primitivo" and "fâșie de testare", and no "fiol".

## Limitations

- J2's lead is now `workshop-4` rather than a table shot, because the only hands-only table image carries a handwritten name.
- Morph publishes no date, venue or guest count for the workshop, and the page says so.
- The Primitivo images' photographer and ownership (Morph Italy or the Romanian operator) remain unknown (Archive §8).
- The Journal excerpts depend on the positions in `scripts/journal.mjs`. If Morph edits a post, `npm run journal` picks up the new sentence at the same position, so review the diff of `data/journal.json` after a run.
