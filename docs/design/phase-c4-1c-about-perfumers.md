# Phase C4.1c — Despre Morph and perfumer credits

Date: 2026-09-25. Implements §5 of `phase-c4-1-editorial-plan.md`: `/despre-noi`, the perfumers section and the PDP credits, plus one typography fix on a C4.1b Journal title. Out of scope, and not started: C4.2, a Journal redesign, perfumer biographies, a Gate 17 credit.

Starting state: `main` at `3e8a6c6` (C4.1b), clean working tree.

## Sources re-read on 2026-09-25

| Source | What was checked |
|---|---|
| `wp-json/wp/v2/pages?slug=despre-noi` (page 21148, modified 2025-10-18) and the rendered https://morphparfum.ro/despre-noi | The quoted sentences, verbatim. The page's own images: `2025/03/Despre-noi-Morph-N8-1.avif` (700×600) is a crop of the same frame as the concept's `n8-editorial.avif` (checked visually). The rest of the page is the Gate 17 launch gallery (people; excluded). |
| https://en.morphparfum.com/maison/ | The first paragraph, verbatim (English). |
| https://en.morphparfum.com/nose-perfumer/ | Seven names, English biographies, no perfume attributions. The Carbonnel/Carbonell conflict is still inside the page: heading "Christian Carbonell", body "Christian Carbonnel … Carbonnel S.A.". Nyberg is spelled "Veronique" here. |
| The five attribution sources below, via `wp-json/wp/v2/posts?slug=…` and the Store API | Each credit sentence, verbatim. |

## Despre Morph (`/despre-noi`)

Morph's live URL is kept. Breadcrumb Magazinul / Despre Morph; the header marks Magazinul (`lib/nav.ts` `match` now includes `despre-noi`).

| # | Chapter | Morph's words (quoted, with source) | Concept text | Image |
|---|---|---|---|---|
| — | Head | — | Lede "Casa italiană de parfumuri de nișă din Napoli, spusă din textele Morph."; rule "Citatele sunt ale Morph, cu sursa lor. Traducerea și restul textului sunt scrise pentru concept." | `n8-editorial` full width (hands and two painted jackets; no faces). Caption: a crop of the same frame opens Morph's About page. |
| 1 | Napoli, 2002 | The About page's first sentence (Napoli, 2002, Andrea Angelino). | Three facts: city, year, founder. | — |
| 2 | Metamorfoza (dark band) | The Maison sentence, in English, `lang="en"`. | A translation labelled "Traducere pentru concept", in the grotesk. | — |
| 3 | Sticla | "Produsă de Bormioli Luigi … echilibru și mișcare continuă." | — | `black-bottle` (Iconic on white, its box; not used elsewhere). Home "Forma" keeps `luxury-flatlay`. |
| 4 | Laboratorul | "Morph Parfum a devenit cunoscut […] pentru felul în care combină estetica italiană cu precizia laboratorului." The elision drops "extractele sale persistente, calitatea constantă". | One line describing the Primitivo images (lab rig, gloved hands) with a link to `/jurnal/primitivo`, not a repeat of the image. | — |
| 5 | Parfumierii (`#parfumieri`) | — | See below. | Small lit bottles (`ProductVisual`, `alt=""`; the name is the link text). |
| 6 | Colecțiile | — | Name and type per collection, linked to its room. No counts. | The three existing `CAMPAIGN` images with their existing alts. |
| 7 | Magazinul Morph din București (walnut band) | — | Address, link to `/magazin`. | — |
| — | Surse | — | The three pages, the About page's modified date, the check date. | — |

Morph's words use the existing `MorphQuote` (now `components/Ext.tsx`, moved from `app/jurnal/Ext.tsx` because three areas use it). It gained a `lang` prop (English quotes get “ ” instead of „ ”). `Ext` now names the destination host in its screen-reader note, so links to en.morphparfum.com no longer say "pe morphparfum.ro".

Held out, as the plan and the owner require: the "Istoria parfumului" founder narrative; the 25–35% concentration; "formula este lucrată manual"; the collection counts (13/8/4 on the page vs 13/8/5 in the API); Gate 17 as "cea mai nouă creație"; the once-a-year LE sets; "Morph continuă să lucreze cu parfumieri italieni și francezi" (not selected in C4.1a); the motto "Metamorfoză prin parfum" (its Romanian source is the Ice copy, not re-read in this round); the Gate 17 launch gallery, `animal-editorial`, and any morphparfum.com imagery.

Navigation: header panel "Despre Morph" and the footer "Povestea" → `/despre-noi`. `/magazin#povestea` stays (the anchor may be linked from elsewhere) and now ends with a link "Despre Morph: Napoli, sticla, parfumierii".

## Perfumers

Data: `data/perfumers.json`, hand-maintained, read by `lib/perfumers.ts`. Each credit keeps every Morph source with its URL, kind (post or product id), publication date and the exact sentence. The first source is the one linked on the page.

| Perfume | Credit | Sources (all Morph, re-read 2026-09-25) |
|---|---|---|
| Tonkatonic | Mathieu Nardin | Post 21969 (2024-11-20) "Tonkatonic poartă semnătura lui Mathieu Nardin"; post 18326 (2024-12-18) "Creat de Nose Mathieu Nardin"; post 38915 (2025-10-21) "Creat de parfumerul Mathieu Nardin". |
| Primitivo | Mathieu Nardin | Product description (Store API 38315) "creat de Mathieu Nardin"; post 41095 (2026-01-18), same sentence. |
| Antigua Bay | Arturetto Landi | Post 35633 (2025-03-31) "creație semnată de maestrul parfumier Arturetto Landi"; post 21969 "creată de talentatul maestru parfumier Arturetto Landi". |
| Oud Mafia | Véronique Nyberg | Post 35645 (2025-03-03) "creații semnate de parfumierul Véronique Nyberg" (the sentence closes the Oud Mafia paragraph). Spelled with the accent, as in the attribution source; the Noses page writes "Veronique". |

On `/despre-noi`: three perfumers, four perfumes, each with "Sursa Morph ↗". No biographies: one line points to the Noses page ("numește mai mulți parfumieri și le publică biografiile, în engleză"). The other Noses names (Morel, Bardelli, Maffei, Carbonnel/Carbonell) are not listed, which avoids choosing a spelling and avoids placing Morel next to the Disumano question.

On the PDPs: one line under the collection line, "Creat de {perfumer} · Sursa Morph ↗", marked `data-credit`; the name links to `/despre-noi#parfumieri`. It renders only when `creditFor(slug)` returns a record. Primitivo's summary already says "creat de Mathieu Nardin" in Morph's text; the credit line is the structured version of the same fact.

`withheld` in the data (never rendered):
- **Gate 17**: Carbonnel in the Gate 17 body cream description and YouTube short 4Smei6-E0Sk; Carbonell only as the Noses page heading, whose body says Carbonnel. [I] the heading looks like the outlier; not decided. Waits for the owner, ideally with Morph's confirmation.
- **Disumano → Douglas Morel**: Fragrantica only [T]. Excluded.

## C4.1b correction: the workshop title

Problem: on `/jurnal` the J2 title ran to five lines at `t-2` in the narrow column; on its page, at 1440 px and on phones, "Layering-" ended a line and "ului:" started the next.

Fix (J2 only, `titleBreak: true` in `lib/journal.ts`; `app/jurnal/Title.tsx`):
- the part after the colon becomes a second line at 0.64 em;
- hyphenated words are wrapped in a `white-space: nowrap` span.

The text is unchanged: `textContent` of the heading, the document title, the metadata, the data file and the source attribution all carry the full official title. J1 and J3 are untouched. Checked at 1440, 1024 and 390 px (iPhone 13).

## Verification

- `npx tsc --noEmit`: clean. `npm run build` from a clean `.next`: 85 static pages (84 + `/despre-noi`).
- Screenshots (reduced motion) of `/despre-noi` at 1440 and iPhone 13, the Journal pair and the J2 head at both widths, the Tonkatonic and Oud Mafia PDPs: no horizontal overflow, no console errors.
- `npm run smoke` on a fresh production server: **62 checks, all passed** (58 existing + 4 new). The `/descopera` image timeouts reported in C4.1b did not occur in this environment on either run; nothing was changed for them.
- New checks:
  - nav panel and footer link `/despre-noi`; no `/magazin#povestea` link remains; `/magazin` links to `/despre-noi`;
  - `/despre-noi` at desktop and phone: h1, Magazinul marked current, the three sources open in a new tab, the Maison quote has `lang="en"`, the translation is labelled, the perfumer names equal the data file, each perfume has its first source link, none of the held-out phrases or withheld names appear (`Carbonnel/Carbonell`, `Morel`, `25–35`, "cea mai nouă creație", "o dată pe an", "siderurgic", "lucrată manual", the collection counts), every image has an `alt`, no pending or event images, no overflow;
  - all 26 perfume PDPs fetched: exactly the four credited pages have one `data-credit` line with the right name and source; the other 22 have none, no "Creat de", and no Carbonnel/Carbonell or Douglas Morel;
  - J2 title at 1440, 1024 and phone, on its page and on the index: full text preserved, no hyphenated word split across lines, document title starts with the full title.

## Remaining uncertainties

- Gate 17 perfumer spelling (Carbonnel/Carbonell): open.
- The Nyberg biography on the Noses page switches between "her" and "His"; not used.
- "Istoria parfumului" founder story: not used until the owner confirms.
- The About page's figures (concentration, counts, "o dată pe an") remain unreconciled.
- The Romanian source of the motto "Metamorfoză prin parfum" was not re-read in this round; the motto is still used on home and `/magazin` from earlier phases.
