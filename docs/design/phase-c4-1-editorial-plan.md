# Phase C4.1a — Editorial selection and page plan

Date: 2026-09-25. Documentation only. No UI, articles, images or asset downloads, and no changes to `data/assets.json` or the site. This plan turns the C4.0 archive (`docs/research/morph-romania-campaign-archive.md`, cited below as **Archive** with its campaign IDs C01–C33) into a bounded scope for the Journal, Despre Morph / Maison and the perfumers. It ends with a C4.1b scope for approval.

Repository state checked before writing: branch `main`, HEAD `55a510a` (C4.0), clean working tree.

## Labels

Evidence (same as the Archive):
- **[F]** stated by an official Morph source that was read;
- **[T]** a third-party claim;
- **[I]** an inference;
- **[?]** unresolved, or sources conflict.

Copy (new in this plan):
- **[M]** Morph's own wording, used verbatim, with its source URL and date;
- **[C]** connective copy written for the concept: labels, captions, dates as text, link labels, one-line ledes. [C] copy states only facts already labelled [F]. It never adds claims, adjectives about quality, or anything attributed to Morph.

Rule carried over from CLAUDE.md: images with identifiable people are not used until the owner explicitly agrees. They stay `pending`.

---

## 1. Decisions in brief

1. **The Journal launches with three pieces**: two genuine Morph articles and one campaign page built from Morph material. Nothing is written from scratch.
   - J1 *Your Next Form: Noua colecție Morph dedicată Layering-ului*: Morph article, verbatim.
   - J2 *Primul workshop Morph dedicat Layering-ului*: Morph article, verbatim.
   - J3 *Primitivo*: campaign page (a concept editorial treatment of Morph's launch slides and product text).
2. **Routes**: `/jurnal` (index) and `/jurnal/[slug]`. Morph articles keep Morph's slug. The campaign page gets a short concept slug.
3. **Despre Morph / Maison is a separate, later step (C4.1c)** at `/despre-noi` (Morph's existing URL), titled "Despre Morph". It holds only verified brand facts and object-only imagery. The perfumers are a section of it, not a separate page.
4. **Perfumers**: only attributions that a Morph source states are shown: five perfumes, four perfumers (§5.2). The Carbonnel/Carbonell conflict stays open, and the Gate 17 credit waits for the owner's decision.
5. **The Ice image correction** (§7) is one alt text and two provenance entries. It is scheduled into C4.1b because J3 cites the same shoot.

---

## 2. How the plan fits the current site

[F] Checked in the repository on 2026-09-25:

| Surface | Now | Consequence for C4.1 |
|---|---|---|
| Nav (`lib/nav.ts`) | Magazinul → group "Morph": "Despre Morph" → `/magazin#povestea`; "Jurnal" → `JOURNAL = 'https://morphparfum.ro/blog/'` (external, `ext: true`) | The Jurnal link becomes internal `/jurnal`. Despre Morph stays on `/magazin#povestea` until C4.1c. |
| Header (`components/SiteHeader.tsx`) | Comment and `Item` render external links with "↗" and an sr-only note | No change needed; the link simply stops being external. |
| Footer (`components/Footer.tsx`) | "Despre Morph" column: Povestea → `/magazin#povestea`, "Jurnal ↗" → `JOURNAL` | Jurnal → `/jurnal`, without the arrow. |
| Smoke (`scripts/smoke.mjs`, lines 223–234) | Asserts the Jurnal link is `https://morphparfum.ro/blog/` with `target="_blank"` | This check must be updated in C4.1b, or it will fail. |
| `app/[slug]` | Product catch-all at root (Morph's product slugs) | Journal pages cannot use Morph's root-level post URLs, so they live under `/jurnal/`. A static `app/jurnal` segment takes precedence over `[slug]`. |
| `/magazin#povestea` (`app/magazin/page.tsx`) | One paragraph: Napoli 2002, Andrea Angelino, Bormioli, motto | Stays as it is until C4.1c; then it links to `/despre-noi`. |
| Home (`app/page.tsx`) | No Journal section. "Forma" already uses `luxury-flatlay.avif` and the Napoli/Bormioli facts. | C4.1b adds no Journal teaser to home (§8). Despre must not repeat the home "Forma" image. |
| Images already in use | `ynf-box-in-hand` (home, `/layering`), `ynf-boxes` (`/layering/your-next-form`), `extract-still-life` (`/descopera`), `bottle-row` (`/parfumuri`), the three collection campaigns | The Journal reuses some of these. §4 notes each repeat. |

The Phase 05.5 plan (§14.1) and research 06 (Editorial) already set the principles: Morph-original posts first, no feed, stock-looking lead images never used as brand imagery, and every URL kept. This plan applies them. Research 06's four categories (Povești, Ghiduri, Layering, Cadouri) are deferred, since three items do not need categories.

---

## 3. Verification added in C4.1a

This round was narrow: only the sources that selected pages depend on were re-read. All were read-only on 2026-09-25, and the working files stayed in the scratchpad.

| Source | What it adds or corrects |
|---|---|
| `wp-json/wp/v2/posts/43913`, `43904`, `43898` (full text) | J1 and J2 text confirmed verbatim. Both were published 2026-07-16 and not modified since. J2 still gives no date, venue or guest count. |
| `wp-json/wp/v2/media/43914`, `43907`, `43899` | Lead images. J1: `2026/07/your-next-form-slide.avif`. J2: `2026/07/workshop-morph-slide.avif` (identifiable participants → pending). The layering guide uses `2026/07/layering-parfum-slide.avif` (= concept `ynf-box-in-hand`). |
| `wp-json/wp/v2/pages?slug=despre-noi` | Text re-read; page last modified 2025-10-18. It still calls Gate 17 "cea mai nouă creație" (Primitivo is newer) and gives Ice "4 referințe" (the API has 5). |
| https://en.morphparfum.com/maison/ | Three paragraphs, English only (quoted in §5.1). The company is Drean Srl, Via dei Mille 40, Napoli (footer) [F]. |
| https://en.morphparfum.com/nose-perfumer/ | Seven names with biographies, and no perfume attributions [F]. **The Carbonnel/Carbonell conflict is inside this page**: the heading reads "Christian Carbonell", while the body reads "Christian Carbonnel … Director of Carbonnel S.A." [F]. The Nyberg biography switches between "her" and "His" [F]. |
| Store API, all 105 products, descriptions searched for perfumer names | Primitivo: "creat de Mathieu Nardin" [F]. **This upgrades the Archive's [T] (C16) to [F].** Gate 17 body cream: "inspirată de parfumul semnat de Christian Carbonnel" [F]. No other product names a perfumer. |
| `wp-json/wp/v2/posts` (all 45), searched for perfumer and founder names | Antigua Bay → Arturetto Landi; Oud Mafia → Véronique Nyberg; Tonkatonic → Mathieu Nardin; the founder story in "Istoria parfumului" (§5.1, §5.2). |
| YouTube RSS `@MorphParfumRomania` | "New Morph Fragrance - Gate 17" (https://www.youtube.com/shorts/4Smei6-E0Sk): "signed by the Nose Christian Carbonnel". "Bold elegance with Morph Tonkatonic!" (https://www.youtube.com/watch?v=WbnuSEFS_A8): "signed by Nose Mathieu Nardin" [F]. |
| `public/morph/campaign/ice-campaign.avif`, viewed at 1200 px | Two gloved hands: one pours sand, the other holds a bottle labelled PRIMITIVO; a third gloved hand holds a **blotter strip** (with a QR code). The frame shows **no vial**. The current alt text and the `assets.json` subject both say "vial"/"fiolă" (§7). |

---

## 4. Journal

### 4.1 Structure

| Route | Content | Notes |
|---|---|---|
| `/jurnal` | Index | Title "Jurnal" (the existing nav label). One-line lede [C]. Three entries, then one link to Morph's full blog. |
| `/jurnal/your-next-form-noua-colectie-morph-dedicata-layering-ului` | J1, Morph article | Morph's slug unchanged, so production can map it 1:1 to the live URL. |
| `/jurnal/primul-workshop-morph-dedicat-layering-ului-cum-a-prins-viata-universul-your-next-form` | J2, Morph article | Morph's slug unchanged. |
| `/jurnal/primitivo` | J3, campaign page | Concept slug. Morph published no campaign name, so none is invented. |

**Entry types, always labelled on the index and in the article head:**
- **"Articol Morph"**: Morph's text, verbatim. The head carries the publication date and "Publicat pe morphparfum.ro ↗" with the source URL.
- **"Campanie"**: a concept page assembled from Morph's campaign images and Morph's product text. Each [M] block carries its source, and the page states that its layout is the concept's: "Pagină a conceptului, din imaginile și textele Morph." [C].

**Index composition** (no feed, no grid of equal cards):
- Entries in date order: J1 and J2 (16 Jul 2026), then J3 (Sep 2025).
- Each entry: type label, date, title, a one-line excerpt [M] (the article's first sentence, or for J3 the product description's first sentence), and one image.
- J1 and J2 share a date and a subject. The index shows them as a pair, the article and the event, rather than two separate cards.
- Closing line: "Toate articolele Morph sunt pe morphparfum.ro ↗" [C], linking https://morphparfum.ro/blog/.
- Lede [C], proposed: "Lansări, campanii și povești Morph, fiecare cu sursa ei." The owner may reword it.

**Article template** (from Phase 05.5 §14.1): text column 62–68ch. A full-bleed lead appears only when the image is a Morph image with `concept` status. Products named in the article appear as a small shelf (existing components) in the margin on desktop and inline on mobile. Morph's own headings are kept as the article's headings.

**Verbatim rule.** Morph articles are reproduced in full, typos included, with no silent edits. Where a passage is dated or points to something that no longer holds, the text stays and a separate [C] note beside it states the fact. A sentence is omitted only when it is a dead or misleading call to action, and the omission is marked "[…]".

### 4.2 J1 — Your Next Form: Noua colecție Morph dedicată Layering-ului

- **Type**: Articol Morph.
- **Purpose**: Morph's own statement of the layering concept, the 12 identities and the staged launch. It anchors the Journal in the brand's newest collection and gives the concept's `/layering/your-next-form` page its source.
- **Source**: https://morphparfum.ro/your-next-form-noua-colectie-morph-dedicata-layering-ului (post 43913, published 2026-07-16, unmodified) [F]; Archive C28.
- **Key verified facts** [F]:
  - 12 combinations and identities. Their names are listed in the text.
  - Staged pre-launch: 11–13 Jul (Magnetic, Fearless, Addictive, Euphoric), 18–20 Jul (Untamed, Unforgettable, Mysterious, Desired), 25–27 Jul (Hypnotic, Irresistible, Reckless, Limitless).
  - Pre-launch offer: during those weekends, an online purchase of a 100 ml perfume or a Limited Edition Set earned a YNF set, while stocks lasted.
  - Official launch: 1 August.
  - Closing line: "Your Next Form. Identity, Layer by Layer."
- **Sections**: Morph's own headings, in order: (intro) → "Ce se întâmplă atunci când două parfumuri se întâlnesc?" → "12 identități. 12 forme." → "O colecție dezvăluită în trei etape" → "Acces exclusiv înainte de lansare" → "Official Launch: 1 August" → "Who Do You Choose to Be?" [M].
- **Concept additions** [C]:
  - Head note: "Publicat de Morph pe 16 iulie 2026, înainte de lansarea din 1 august."
  - Beside "Acces exclusiv…": "Oferta de pre-lansare s-a încheiat pe 27 iulie 2026." (the last weekend Morph names).
  - "Citește aici Termenii și Condițiile Campaniei." is replaced by "[…]", because the link points to the general terms, which contain no YNF terms (Archive C28).
  - End: link to `/layering/your-next-form` ("Cele 12 seturi") and to J2.
- **Candidate assets**:

  | Asset | Status | Use |
  |---|---|---|
  | `ynf-boxes.avif` (`2026/07/layering-slide-2.avif`, in the concept) | concept | Lead image. The content map (§2) records Morph's lead `your-next-form-slide` as the same box-grid shot; confirm the two files match at implementation. It is also the head of `/layering/your-next-form`, so the repeat is accepted as Morph's own choice of lead. |
  | 12 YNF set packshots (`public/morph/set-layering-parfum-morph-*-2x8ml-0.avif`) | product | A row of identities under "12 identități. 12 forme." |
  | `2026/07/your-next-form-1.avif` (torso in a black suit, two vials, face out of frame) | concept candidate (Archive §5) | Optional inline image, **only after** a full-size check for tattoos, rings or other identifying marks. Not downloaded yet. |
  | `2026/07/your-next-form-2.avif` | **not documented** | Appears in the article but is not described in the Archive. Verify first. |
  | `2026/07/your-next-form-3.avif` (woman, band of shadow across the eyes) | pending (identifiable) | Excluded. |

- **Image concerns**: the article's inline images are served at 225×300 in the post. Full sizes need checking before any use larger than that.
- **Missing evidence** [?]: the YNF campaign terms; how the 12 identities map to perfume pairs (Morph withholds this by design, and the concept keeps it hidden).

### 4.3 J2 — Primul workshop Morph dedicat Layering-ului

- **Type**: Articol Morph.
- **Purpose**: the only documented Morph event with a described mechanic (blindfold → recreate → reveal). It is the origin of the "sense first, name last" idea that the concept's YNF page mirrors.
- **Source**: https://morphparfum.ro/primul-workshop-morph-dedicat-layering-ului-cum-a-prins-viata-universul-your-next-form (post 43904, published 2026-07-16) [F]; Archive C29.
- **Key verified facts** [F]:
  - Guests were blindfolded and smelled one of the 12 layerings.
  - They then tried to recreate it by testing, comparing and changing the application order.
  - The identity names were revealed only at the end.
  - The workshop was "primul contact al invitaților cu universul Your Next Form".
  - The post, published 16 Jul, describes the workshop in the past tense.
- **Not stated by Morph, so never stated by the concept** [?]: the date, venue, number of guests, who the guests were, and whether workshops recur.
- **Sections**: Morph's headings: (intro) → "O experiență construită în jurul instinctului" → "De la memorie olfactivă la propria combinație" → "Momentul în care identitățile au fost dezvăluite" → "Your Next Form începe aici" [M].
- **Concept additions** [C]:
  - Head note: "Publicat de Morph pe 16 iulie 2026."
  - The final paragraph ("Începând cu 1 august…") keeps its tense, with the note "Colecția e disponibilă din 1 august 2026."
  - End links: `/layering/your-next-form` and J1.
- **Candidate assets**:

  | Asset | Status | Use |
  |---|---|---|
  | `workshop-3.avif` (notes cards, vials, blotters; hands only; 750×1000) | concept, already in `public/morph/campaign` | Lead, at column width. The resolution does not allow full-bleed, so the template's non-full-bleed variant is used. |
  | `workshop-4.avif` (YNF box in hand; 1000×705) | concept, already local | Inline, beside the "reveal" section. |
  | `workshop-morph-slide.avif` (Morph's lead), `workshop-morph-1.avif`, `workshop-morph-2.avif` | pending (identifiable participants; Archive C29, §8) | Excluded. `workshop-slide` and `workshop-2` are not yet in `assets.json`; add them as `pending` in C4.1b (§8). |

- **Image concerns**: the participants are guests, not models, so their consent is separate from Morph's own blog use (Archive §8). Only hands-only frames are used.

### 4.4 J3 — Primitivo (campaign page)

- **Type**: Campanie, a concept editorial treatment. **It is not a Morph article**: Morph published no post or campaign name for this launch.
- **Purpose**:
  - It shows the strongest 2025 visual thread (the lab rig and raw elements), which is also the closest to the concept's art direction (Archive §4.1, §4.2).
  - It gives the Ice room's image its true origin (§7), which the Journal is the natural place to tell.
  - It is object-only, with no rights exposure in the frames selected.
- **Sources** [F]:
  - Product page https://morphparfum.ro/morph-primitivo-eau-de-parfum-unisex, via the Store API: description, notes, and "creat de Mathieu Nardin".
  - Media library slides `2025/09/Primitivo-Slider-Morph.avif` and `2025/10/Primitivo-Morph-Slider-2.avif`.
  - Archive C16 and C25.
- **Key verified facts** [F]:
  - The product record was created 2025-09-26, in "Parfumuri colecția Ice" and "Nou".
  - Notes: top Chimion, Trandafir Lani; heart Lapte de smochine, Sublimolidă; base Patchouli Gayo, Acord de Oud.
  - Perfumer: Mathieu Nardin (Store API; also the blog post of 2026-01-18, https://morphparfum.ro/cadou-8-martie-mama-iubita-parfum).
  - The 2026 "Colecția Ice" home slide is a crop of `Primitivo-Slider-Morph` (Archive C16).
- **Sections**:
  1. Opening: `Primitivo-Morph-Slider-2` (the bottle between rocks) at full bleed. Title "Primitivo" [M: the product name]. Dek: "Imaginează-ți vântul ridicând nisipul, umbrele și lumina dansând peste peisaje sălbatice…" [M, Store API].
  2. Morph's description paragraph ("Primitivo captează această energie primară… Primitivo este parfumul celor care caută o prezență olfactivă puternică, sofisticată și cu caracter.") [M].
  3. `Primitivo-Slider-Morph` (the lab rig) at full width. Caption [C]: "Campania de lansare Primitivo. Pe morphparfum.ro din septembrie 2025. Un decupaj din același cadru deschide camera Ice." The date rests on the product record [F]; the wording avoids a launch day that Morph never published.
  4. Notes in time order (the existing tier component) [M data]. Credit: "Creat de Mathieu Nardin" [M, Store API].
  5. Buy and try shelf (existing components) and a link to `/parfumuri/ice` [C].
- **Candidate assets**:

  | Asset | Status | Use |
  |---|---|---|
  | `2025/10/Primitivo-Morph-Slider-2.avif` | concept candidate (Archive §5) | Opening. |
  | `2025/09/Primitivo-Slider-Morph.avif` | concept candidate (Archive §5) | Section 3. |
  | Primitivo packshots (`public/morph/morph-primitivo-eau-de-parfum-unisex-0..2.avif`) | product | Shelf. |
  | `2025/10/Primitivo-Morph-Slider-3.avif` (figure in fire) | pending (partly identifiable) | Excluded. |

- **Image concerns**: both slides were viewed only at contact-sheet size in C4.0. Before download, check them at full size for baked-in text or logos beyond the bottle label. If a slide carries promotional text, it becomes reference-only and the page uses the other slide plus the packshots. Photographer and ownership (Morph Italy or the Romanian operator) are unknown (Archive §8).
- **Excluded wording**:
  - The Facciamo l'Amore line "Primitivo evocă libertatea unui spirit neîmblânzit" [F]: it appears under "Pentru el", and the gendered framing contradicts the unisex positioning (Archive C22).
  - Fragrantica's 2026 launch year [T].
  - Any campaign title.
- **Missing evidence** [?]: the official campaign name, if any; live dates of the slides; whether the Romanian release preceded the international one (Archive C16).

---

## 5. Despre Morph / Maison (C4.1c, separate from the Journal)

### 5.1 Page plan: `/despre-noi`, titled "Despre Morph"

**Purpose**: one short editorial page with verified brand facts only, replacing the single paragraph at `/magazin#povestea`. The route keeps Morph's live URL (Phase 05.5 §14.1: keep every URL). The label stays "Despre Morph", as confirmed by the owner, and the page stays under Magazinul in the nav and in the footer.

| # | Section | Verified content [M/F] | Source | Candidate asset |
|---|---|---|---|---|
| 1 | Napoli, 2002 | "Morph Parfum este un brand italian fondat în 2002 la Napoli de Andrea Angelino" [M] | https://morphparfum.ro/despre-noi | `n8-editorial.avif` (concept, local; 2560×1440). It is also Morph's own About image (`Despre-noi-Morph-N8-1.avif`). |
| 2 | Metamorfoza | "Morph was born as an experimental olfactory space, a "movement" inherently dedicated to innovation, change... to Metamorphosis." [M, English, set with `lang="en"`] and the motto "Metamorfoză prin parfum" (already used in the concept) | https://en.morphparfum.com/maison/ | none (type only) |
| 3 | Sticla | "Produsă de Bormioli Luigi… forma ei exprimă ideea de echilibru și mișcare continuă." [M] | despre-noi | `black-bottle.avif` (concept, local, not used elsewhere). Not `luxury-flatlay`, which the home "Forma" already uses. |
| 4 | Laboratorul | "…felul în care combină estetica italiană cu precizia laboratorului." [M] | despre-noi | the Primitivo rig frame, if cleared for J3, as a link to J3 rather than a repeat |
| 5 | Parfumierii | §5.2 | §5.2 | none (type only) |
| 6 | Colecțiile | Links to the three rooms, each with its campaign image already in use | concept routes | existing `CAMPAIGN` images |
| 7 | Magazinul din București | Link to `/magazin` | existing | none |

**Held out until Morph gives one figure or confirms** [?]:
- The concentration "25–35%" [F on despre-noi]. It conflicts with other Morph figures (research 01).
- The collection counts: despre-noi says 13/8/4, the API has 13/8/5 and the quiz config 11/8/6 (research 01).
- "Formula este lucrată manual".
- Gate 17 as "cea mai nouă creație" (outdated).
- "Produse exclusiv o dată pe an" for the LE sets, which contradicts February sales (Archive C17).

**Verify first**: the founder narrative in "Istoria parfumului" (2024-11-20, https://morphparfum.ro/istoria-parfumului-o-calatorie-in-jurul-lumii-printre-arome-si-povesti) [F, Morph-authored]:
- Andrea Angelino, "fiul unui muncitor siderurgic", chose perfume over a legal career;
- he opened "o mică parfumerie în Napoli, în 2002";
- Morph Parfum was born "într-o zi călduroasă de octombrie" (year not stated);
- his team: "un artist optic, doi parfumieri renumiți (unul italian, unul francez) și doi specialiști în marketing".

The story is Morph's, but it sits inside a generic SEO article, adds personal details about a real person, and blurs the founding date: the shop opened in 2002, and the brand's October is undated. Use it only after the owner confirms. Meanwhile, the About line (Napoli, 2002, Andrea Angelino) is enough.

**Excluded for now**:
- The Gate 17 launch event gallery (15 images; identifiable guests; `pending`; Archive C07).
- `animal-editorial` (models; `pending`).
- The pastel Gate 17 world (off-direction; Archive §4.2).
- "Synesthesia" as a brand pillar: it is a colour-first idea that the Phase 05 direction explicitly moved away from (CLAUDE.md, brand direction).
- morphparfum.com imagery: not inspected for rights or provenance.

### 5.2 The Noses: attributions and the spelling conflict

**What Morph states** [F]:
- en.morphparfum.com/nose-perfumer lists seven perfumers with English biographies: Douglas Morel, Sofia Bardelli, Luca Maffei, Arturetto Landi, Veronique Nyberg, Mathieu Nardin, Christian Carbonell/Carbonnel. The page attributes no perfume to anyone.
- The RO blog post of 2024-11-11 (https://morphparfum.ro/concentratie-de-parfum-diferentele-dintre-parfum-eau-de-parfum-si-eau-de-toilette) lists six of them, misspelling "Mathieu Nardi" and omitting Carbonnel.

**Perfume attributions found in Morph's own sources** (only these may be shown):

| Perfume | Perfumer (as Morph spells it) | Morph sources | Status |
|---|---|---|---|
| Tonkatonic | Mathieu Nardin | Blog 2024-12-18 "Creat de Nose Mathieu Nardin" (https://morphparfum.ro/idei-de-cadouri-de-craciun-40-idei-pentru-a-crea-amintiri-deosebite); blog 2024-11-20 with a short biography (https://morphparfum.ro/note-de-parfumuri-cele-mai-dorite-parfumuri-ale-sezonului); blog 2025-10-21 (https://morphparfum.ro/cadouri-de-craciun); YouTube https://www.youtube.com/watch?v=WbnuSEFS_A8 | use |
| Primitivo | Mathieu Nardin | Store API product description; blog 2026-01-18 (https://morphparfum.ro/cadou-8-martie-mama-iubita-parfum) | use |
| Antigua Bay | Arturetto Landi | Blog 2025-03-31 (https://morphparfum.ro/parfumurile-contrafacute-iluzia-aromei-si-pericolele-ascunse); blog 2024-11-20 (note-de-parfumuri, above) | use |
| Oud Mafia | Véronique Nyberg (accented here; "Veronique" on the Noses page) | Blog 2025-03-03 (https://morphparfum.ro/ce-inseamna-parfum-de-nisa-intra-in-lumea-exclusivista-a-parfumeriei) | use, spelled "Véronique Nyberg" as in the attribution source; note the variant |
| Gate 17 | Christian **Carbonnel** / **Carbonell** [?] | Gate 17 body cream (Store API): "semnat de Christian Carbonnel"; YouTube https://www.youtube.com/shorts/4Smei6-E0Sk: "Christian Carbonnel"; Noses page: heading "Christian Carbonell", body "Christian Carbonnel … Carbonnel S.A." | **verify first** |
| Disumano | Douglas Morel | Fragrantica snippet only [T] (Archive C02) | exclude |

**The spelling conflict, recorded without a choice.**
- "Carbonnel" (double n, single l) appears in the Store API cream description, the YouTube description, and the Noses page biography, both for the name and for the company "Carbonnel S.A.".
- "Carbonell" (single n, double l) appears only as the Noses page heading.
- [I] The heading looks like the outlier, but this plan does not choose. The owner decides, ideally with Morph's confirmation, before any Gate 17 credit is shown.

**Proposed perfumers section** (C4.1c):
- Heading "Parfumierii" [C].
- One line [C]: "Parfumierii care semnează parfumurile Morph, așa cum îi numește Morph."
- Then only the four perfumers with a Morph attribution, each with their perfume(s) linked to the PDP. Carbonnel/Carbonell is added once the owner resolves the spelling.
- The other perfumers (Morel, Bardelli, Maffei) are listed by name only as "Colaborează cu Morph" [C, based on the Noses list], with no perfume.
- A link to the English biographies on en.morphparfum.com ↗.

**Biographies are not reproduced in C4.1c**, for three reasons:
- they exist only in English, so a Romanian version would be concept wording;
- they contain third-party claims (Takasago, Francis Kurkdjian, MANE, Robertet, ISIPCA, Carbonnel S.A.) that Morph wrote but that this project has not checked;
- the Nyberg text is internally inconsistent.

If the owner wants biographies, they are quoted in English with `lang="en"`, verbatim, with the source link, and the Nyberg paragraph is limited to its first sentence.

**PDP credits** (same step): a single line "Creat de …" [C label + M name] on the four attributed PDPs, citing the Morph source in the data file. No credit appears on any other perfume, and none is inferred from the perfumer lists.

---

## 6. Use now / verify first / exclude for now

**Use now** (C4.1b):
- J1 and J2 text [M], verbatim, with the dated [C] notes (§4.2, §4.3).
- The Primitivo product text, notes and credit [M] (J3).
- Images already in the concept: `ynf-boxes`, `workshop-3`, `workshop-4`, the 12 YNF packshots, the Primitivo packshots.
- `Primitivo-Slider-Morph` and `Primitivo-Morph-Slider-2`, once a full-size check shows no baked-in text (§4.4).
- The Ice provenance correction (§7).

**Verify first**:
- The Gate 17 perfumer spelling (§5.2).
- `your-next-form-1` (identifying marks) and `your-next-form-2` (content unknown).
- The founder narrative in "Istoria parfumului" (§5.1).
- The despre-noi figures: concentration, counts, "o dată pe an" (§5.1).
- "Layering parfum: ce este și cum combini două parfumuri…" (2026-07-16, https://morphparfum.ro/layering-parfum-ce-este-si-cum-combini-doua-parfumuri-pentru-o-semnatura-olfactiva-unica). It is a genuine Morph article, but it repeats J1 and J2 almost paragraph for paragraph. Its three-step method ("Alege un parfum de bază", "Completează-l…", "Lasă parfumul să evolueze") [M] fits the `/layering` "cum aplici" moment better than a fourth Journal entry. Owner's call.
- Naughty or Nice (C20): the only whole-catalogue character campaign, but its two official product lists conflict, and the blog lead may be generated (Archive C20). Candidate for a seasonal `/cadouri` chapter after the lists are reconciled, not for the Journal launch.
- Facciamo l'Amore (C22): a strong object-only image (the shattered-glass heart) and a real mechanic (the love letters). The copy is gendered ("pentru ea / pentru el"), and the campaign is seasonal and expired. Candidate for `/cadouri` as a dated past example.
- The Morph campaign sequence 2022 → 2026 (Archive §7, item 1) as an index strip. It needs several reference-only slides at full size and a decision on which pre-2025 frames are object-only.

**Exclude for now**:
- **Generic or stock-heavy blog posts**, e.g. "Cum testezi un parfum înainte să îl cumperi" (2025-12-27): generic advice voice, a first-person "Îți arăt", "Promitivo" misspelled, no lead image of Morph's. Also:
  - "Parfumuri unisex: ce sunt" (2025-09-09), which mostly discusses other brands (CK One, Baccarat Rouge 540);
  - "Perfume layering: cum se aplică" (2025-06-26), which pairs across scents (Indomable gel + Tonkatonic cream) against the concept's ritual of one scent in three textures;
  - "Seturi Discovery" (2025-08-08), whose lead is the tote-bag promo slide;
  - the gendered listicles, zodiac, skin-care, 8 Martie and Valentine's gift lists (content map §3).

  Their lead images look like stock or generated imagery [I], or are promo slides with baked-in text. The posts stay reachable on Morph's blog through the index link.
- **Material with people**: the Gate 17 event gallery and banner, the workshop slide and images 1–2, `your-next-form-3`, Morph Friday, HNY, the LE model slide, Primitivo slider 3, `animal-editorial`, and all creator content (Cristian Pandia, Simina Stroe, "Antonia", `laviniastoicaofficial`). Reason: the owner's standing rule, and creator and guest consent (Archive §8).
- **Unclear provenance or meaning**:
  - the morphparfum.com "a new form is emerging" teaser (C32; meaning unknown, not Romanian);
  - "Bamboo Limited Edition" (Facebook hashtag only, not in the RO API);
  - the Instagram-only material (5 of ~1,114 RO posts verified; Archive §6);
  - the Italian retailer history (C33).
- **Promotions and terms** (C08, C11, C12, C18, C19, C23, C27, C31): mechanics with dates and baked-in text. They are not editorial and must never read as current offers.
- **The Disumano film and portrait**: identifiable models; film rights unknown (C02).
- **Third-party claims**: Fragrantica years and credits [T], the Jovoy and ShoppingMap interviews (not watched).

---

## 7. Correction: `ice-campaign.avif` is from the Primitivo shoot

**Finding** (Archive §2 item 5, C16; re-checked in §3):
- `public/morph/campaign/ice-campaign.avif` (source `2026/03/colectia-ice-slide.avif`, Morph's 2026 "Colecția Ice" home slide) is a crop of `2025/09/Primitivo-Slider-Morph.avif`.
- The bottle in the gloved hand is labelled PRIMITIVO.
- The frame shows a hand pouring sand, a bottle held in a gloved hand, and a blotter strip held in another. It shows no vial.
- Using it for the Ice room stays valid: it is Morph's own Ice slide, and Primitivo is an Ice perfume. Only the descriptions are inexact.

**Current uses in the repository**:

| File | Use | What is inexact |
|---|---|---|
| `data/assets.json` (entries `ice-campaign.avif`, `ice-campaign-m.avif`) | provenance | subject "Ice campaign: gloved lab hands, sand, vial": no link to the Primitivo shoot, and "vial" is wrong |
| `lib/campaign.ts` (`CAMPAIGN.ice.alt`) | alt text for every use below | "mâini în mănuși de laborator, nisip, o fiolă și o sticlă Ice": "o fiolă" is wrong; "o sticlă Ice" hides that the bottle is Primitivo |
| `components/CollectionWorlds.tsx` | home "Trei lumi", desktop sticky image (`alt=""`, decorative) and mobile `CampaignPicture` (uses the alt) | inherits the alt |
| `app/parfumuri/CollectionPage.tsx` | `/parfumuri/ice` room image | inherits the alt |
| `components/SearchOverlay.tsx` | collection thumbnail (mobile crop, `alt=""`) | none visible |

The C4.0 references in `CLAUDE.md` and the Archive are already correct.

**Smallest accurate correction** (for C4.1b, no visual change):
1. `lib/campaign.ts`: set `CAMPAIGN.ice.alt` to "Campania Morph Ice: mâini în mănuși de laborator, nisip care curge, o fâșie de testare și sticla Primitivo". Keep `pos` and `posM`. Check the mobile crop (`ice-campaign-m.avif`) at full size first. If the bottle is not in that crop, the mobile alt needs its own text, which means a `altM` field; add it only if needed.
2. `data/assets.json`: set both Ice entries' `subject` to "Colecția Ice home slide (2026/03): a crop of the Primitivo launch shoot (2025/09/Primitivo-Slider-Morph.avif): gloved hands, falling sand, blotter strip, Primitivo bottle". Add `"campaign": "C16 Primitivo launch; C25 collection slides"`. Status stays `concept`.
3. No crop, layout or room change. Recrediting the Ice room as "Primitivo" in visible copy is not needed; J3 tells the story.

---

## 8. Proposed C4.1b scope (Journal only, for approval)

**In scope**:
1. **Content data**:
   - A deterministic script, `npm run journal` (`scripts/journal.mjs`), reads posts 43913 and 43904 from `wp-json/wp/v2/posts/<id>`. It stores title, date, slug, source URL and the body as ordered blocks (heading, paragraph) in `data/journal.json`, with no rewriting.
   - J3 is assembled from `data/catalog.json` (the Primitivo record) plus a small hand-written entry in the same file for the [C] captions.
   - Each block carries `voice: "morph" | "concept"`, so [M] and [C] can be distinguished in code and in review.
2. **Routes**: `app/jurnal/page.tsx` (index) and `app/jurnal/[slug]/page.tsx` (three static params), using the §4.1 template, the existing type scale and components (shelf, tiers, buy/try). No new motion system; the existing `<ViewTransition>` conventions apply only if an image is shared with the index.
3. **Assets**:
   - `npm run assets` gains `Primitivo-Slider-Morph.avif` and `Primitivo-Morph-Slider-2.avif` as `concept` (after the full-size check in §4.4).
   - `workshop-morph-slide.avif` and `workshop-morph-2.avif` are added as `pending`, not downloaded.
   - No other downloads. `your-next-form-1` and `-2` wait for §6 "verify first".
4. **Navigation**:
   - `JOURNAL` → `/jurnal`, with `ext` removed in `lib/nav.ts`.
   - The footer "Jurnal ↗" → "Jurnal" at `/jurnal`.
   - The `SiteHeader.tsx` comment is updated.
   - One link from `/layering/your-next-form` to J2 ("Cum a început: workshopul Morph") [C].
5. **The Ice correction** in §7 (alt text and two `assets.json` entries).
6. **Tests**:
   - Update the smoke check at `scripts/smoke.mjs:223–234`.
   - Add checks for `/jurnal` (three entries, each with a type label and a source link), for each article (the Morph source link and the "Articol Morph" or "Campanie" label are present; no image marked `pending` is rendered), and for the Ice alt text.
7. **Documentation**: `docs/design/phase-c4-1b-journal.md` and one line in `CLAUDE.md`.

**Out of scope for C4.1b** (they become C4.1c or later, each on request):
- Despre Morph / Maison (`/despre-noi`), the perfumers section and the PDP credits (§5).
- A Journal teaser on home, and Journal categories.
- The campaign-archive strip, seasonal chapters on `/cadouri`, and the layering guide on `/layering`.
- Any image with people; Instagram material.

**Open questions for the owner before C4.1b**:
1. Approve the three launch pieces, or swap one (e.g. the layering guide instead of J2).
2. The index lede wording (§4.1).
3. Carbonnel or Carbonell (blocks only C4.1c; recorded here so it is not forgotten).
4. Whether the founder narrative from "Istoria parfumului" may be used in C4.1c.
5. Whether the concept may reproduce Morph articles in full, as proposed, or should show an excerpt with "Citește pe morphparfum.ro". Full reproduction matches how the concept already uses Morph's product texts.
