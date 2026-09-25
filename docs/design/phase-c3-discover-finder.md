# Phase C3: Descoperă and the Fragrance Finder

Scope: `/descopera`, `/descopera/finder`, `/descopera/finder/rezultat`, and the discovery links that serve them (the Descoperă group in the nav, one search entry). C3.5, C4 and C5 have not started. The header, the vitrine (C1), Baie & Corp (C2), Layering and the transition architecture were not redesigned. Captures are in `captures/phase-c3/`.

The journey the three routes now carry:

understand how Morph describes a perfume → explore families and notes → ask for help → the Finder → the result → the product page.

## Before: Impeccable critique

The critique ran with the official Impeccable skill (`critique`), with the design review and the browser/detector pass in two isolated subagents. The static detector found nothing. The URL detector's findings were mostly global chrome (closed nav panels, the off-canvas cart). What the review found:

1. **Descoperă was a tool, not an introduction.** It had a row of five lenses, 14 note chips plus a search box, 26 thumbnails of 104 px in groups, and a permanent preview column. That made more than four choices visible at every decision point. The preview opened on Zeta even when the note lens said "iris", and Zeta has no iris.
2. **It did three jobs at once**, at 5,113 px on desktop and 7,865 px on a phone: explore, try (12 travel rows and 6 offers), and Layering.
3. **The Finder read as a survey.** It had indexed rows (01–05), counts beside every answer, a 23-thumbnail scoreboard, and the large page header repeated on every step. At 1440 × 900 the fifth answer fell below the fold.
4. **Result page bug on phones.** `.main.main` (12 columns) beat the mobile `.main` override, so the content column was 229 px out of 390 px and the buttons wrapped.
5. **The result ended on checklists.** It had three "why" tables, a facts grid, the pyramid, a full embedded Layering composer, then a form-style recap.
6. **Kept:** Morph's questions and logic, URL state, the result hero (a large lit object and a clear purchase), and honest stock and trial information.

## Information architecture

| Route | Before | After |
|---|---|---|
| `/descopera` | PageHead + Finder strip + lens instrument + Încearcă + Layering | opening → Cinci familii → Notele → Fragrance Finder (night band) → Încearcă (unchanged, from C2) → Layering line |
| `/descopera/finder` | PageHead + stacked answers + thumbnail grid | one room: steps with the answers given, one question, the horizon of bottles |
| `/descopera/finder/rezultat` | hero + alternatives + composer + recap | night stage → De ce → the other results → recap and the shop on walnut |

- **Removed from Descoperă:** the lens instrument (`components/DiscoverInstrument.*`) and its URL state (`?lentila=`, `?nota=`, `?parfum=`). Old links still open the page. The season, intensity and collection lenses were dropped:
  - season: 21 of 26 perfumes are "Toamnă", so it does not discriminate (the Phase 04 review already said so);
  - intensity: 7 of 26 perfumes have none declared;
  - occasion: all 26 carry "Ocazii speciale" and "Seară", so it cannot tell perfumes apart;
  - collection: it is the main axis of `/parfumuri`.
- **Kept on Descoperă:** "Încearcă înainte de sticlă" (`#incearca`, `#travel`) exactly as C2 built it, because the nav's Seturi links and search land there.
- **Nav:** the Descoperă panel now reads Cinci familii (`#familii`) · Notele, de la A la Z (`#note`) · Fragrance Finder · Încearcă înainte de sticlă. The five primary items are unchanged. Search gains one page entry, "Notele parfumurilor Morph, de la A la Z".
- **SectionNav** (Explorează / Fragrance Finder) is no longer shown on these two pages. Descoperă has its own path list; the Finder has a breadcrumb.

## Discovery model (`lib/discover.ts`)

Everything comes from the Store API snapshot. Nothing is scored.

- **Opening.** One sentence on how Morph describes a perfume (notes in the order you smell them on the skin), and the path through the page with real counts: 5 groups / 26 perfumes, 101 notes, 7 questions. Beside it is Morph's own still life of N8 behind ribbed glass (the authored image moment), with the line „estetica italiană cu precizia laboratorului” from Despre noi (quoted as recorded in `phase-05-5-content-opportunity-map.md` §4).
- **Cinci familii.** One chapter per family. The five families are the concept's proposed grouping of Morph's own "Încadrare" values (`FAMILY_GROUPS`), and the page says so. Each chapter shows its Morph values ("Încadrarea Morph: Lemnos-oriental, Floral-oriental"). The object and the text alternate sides.
  - **The object:** the family's first in-stock bestseller, in catalog order, on the existing `Stage` (with `obj-<slug>`, so it morphs into its product page). Ice bottles are clear and pale and barely read on the stone stage, so an Ice bottle stands there only when the family has nothing else in stock. Leads: Vapor, Cruda, Umhh, N8, Vision (Proaspăt has only Antigua Bay and Vision).
  - **The words:** the three most frequent notes in the family (`familyNotes`) in italic serif. Every note is a link to the vitrine searched for it (`/parfumuri?q=<note>`, the existing search over names and notes).
  - **The facts, computed:** count and collections, intensities present (plus how many have none declared), longevities present, Morph's classification values.
  - **The other perfumes** as small lit objects with names, each linking to its product page. Then "Toate cele N în vitrină" → `/parfumuri?familie=<id>` (the existing filter).
  - **The light grammar:** hovering or focusing a note keeps the bottles that carry it lit and dims the others, the stage object included. This is pure CSS (`:has()` over `data-k` / `data-n`), so the page stays a server component. It is an addition, never the only way to the information: the note link itself leads to the filtered vitrine.
- **Notele.**
  - **The four recurring notes** (by the number of perfumes that carry them) as a typographic spread. For each one, the perfumes that carry it, each with the tier it sits in (deschidere / inimă / bază), each linked to its product page.
  - **The full index** of all 101 notes, A to Z, behind one `<details>`. Notes are merged by accent-free spelling, with Morph's spelling shown. Each links to the searched vitrine, with the number of perfumes that carry it exactly.

## Descoperă → Finder

The Finder is not a CTA at the bottom of the page. After the notes, the page turns into the night room, the room the Finder itself lives in.
- On the left: what the Finder asks, in Morph's categories, and what you get.
- On the right: **Morph's first question with its four answers.** Each answer is a submit button of a GET form (`/descopera/finder?q1=<tag>&pas=2`), so choosing one opens the Finder at question 2 with the first answer already given. It works without JavaScript.
- Along the floor: the horizon of the 23 tagged bottles, all lit, with the three untagged perfumes named.

## The Finder: logic preserved

Unchanged in `lib/finder.ts` and `data/finder.json`:
- the seven questions and their answers, as Morph wrote them;
- the tags per perfume;
- the weights (mood 5, personality 5, olfactive 4, occasion 4, projection 3, season 2, collection 4);
- `score()`, `results()`: two results inside a chosen collection, one per collection for "Oricare", with ties broken in catalog order as in Morph's `selectResults()`;
- `reasons()`.

No question, tag, weight or rule was added or changed. The only addition is on the client: `results()` is also called in the browser to know which bottle stays lit at the end.

## The Finder: experience (`components/FinderFlow.tsx`)

- **One room, one question.**
  - The night tone. The breadcrumb and a small "Fragrance Finder" title stand where the huge page header used to be.
  - The question is in the serif at up to 76 px. The answers are a typographic list of native radios, with a drawn mark that fills when chosen (a shape, not only light) and the label in italic.
  - Morph's descriptions appear under the collection answers.
  - After you choose, one line says how many of the 23 perfumes Morph tagged with that answer. It replaces the counts beside every answer.
- **Continuă / Înapoi.**
  - Choosing no longer auto-advances. You choose, the room answers (the light changes), then Continuă moves on.
  - Înapoi returns with your answer kept. The last button reads "Vezi rezultatul".
  - The radios are `required`, so Continuă without an answer stays on the question (native validation).
- **The steps.** Seven rows: number, Morph's category, and the answer given, in italic. Answered steps are links back to that question. On phones the steps become a seven-part bar; the names stay for screen readers.
- **URL and reload.** Answers and the step live in the URL (`?q1=…&pas=3`). A reload, a shared link or a "Schimbă" link from the result lands on the same question with the same answers.
- **Without JavaScript.** It is a GET form with the other answers as hidden inputs. Every Continuă loads the next step from the server, and the last one loads the result.

### Motion (the existing vocabulary)

| Moment | What moves | Timing |
|---|---|---|
| choosing an answer | the horizon: bottles keep light in proportion to their current score; the others dim, grey and lower 4 px (FINDER → NARROW) | `--d-slow` (640 ms), `--ease-inout` |
| every answer | the room's key light rises (`--key`, 0.35 → 1) | `--d-light` (1400 ms) |
| next question | the question enters, 12 px and opacity | 640 ms, `--ease-out` |
| last answer | every bottle goes dark except the result's; after 480 ms that bottle (`obj-<slug>`) travels into the result stage | T2 morph, unchanged |

Nothing else animates. There is no bounce, blur, particles or cursor effect. Under reduced motion, the global rule removes every transition and view-transition animation, the navigation to the result happens at once, and the smoke test confirms no running animations.

## Result: the reason model

- **The object.** The first result stands on the night stage at monument scale (`Stage` with `obj-<slug>`). The Finder's lit bottle lands here, and from here the same bottle lands on the product page (the stage is a link to it, and so is "Intră în pagina parfumului"). The stage is capped at 560 px wide, so Morph's 768 × 960 packshots are not blown up past their resolution.
- **What the result says.** The name, then one sentence from the selection rule: "Finder-ul Morph îți propune Zeta și încă două parfumuri, câte unul din fiecare colecție" (or "și încă un parfum din Luxury"). Then collection · concentration · 100 ml, the real notes line, buy and try with prices.
- **De ce Zeta** is a museum label. Each answer gets one row: Morph's category, your answer, and "etichetat așa" or "nu e etichetat așa", with a filled or empty mark. It comes straight from `reasons()`: whether Morph tagged the perfume with that answer. There are no psychological statements, no personality claims and no scores.
  - When the collection answer was "Oricare", a line says it does not count, which explains "6 din 6" out of seven questions.
  - Beside it: family, intensity, time on skin and availability from the Store API, and the three tiers.
- **Multiple results.** They are shown in the order `results()` returns them, under "Din celelalte colecții" ("Oricare") or "Tot din Luxury" (a chosen collection), each labelled by its collection. Each shows how many of your answers Morph tagged it with, and which ones.
  - When its score equals the first result's, it says "La fel de aproape de răspunsurile tale ca Zeta". Order between equal scores is only Morph's catalog order, and the page does not pretend otherwise.
  - No number, ranking or winner was added.
- **The embedded Layering composer was replaced by one line**, "Compune Zeta cu Primitivo în Layering" (`/layering?a=&b=`). Layering itself is untouched.
- **The close.** The recap with "Schimbă" per answer (44 px targets), the shop on walnut (address, open now, hours), and the source note (Morph's quiz, snapshot date, weight range, untagged perfumes).

## After: Impeccable pass

- **Static detector.** It found `transition: padding` on four hover and selected states (the path list, the first-question answers, the Finder answers, the steps). They now move their content with `translate` instead. The detector is clean on `app/descopera`, `FinderFlow` and `FinderHorizon`.
- **Critique.** It ran as two isolated subagents: a design review, and browser evidence with the URL detector. The first attempt stopped at the session rate limit and was run again.
  - Verdict: "mostly specific". The Finder room, the dimming horizon and the bottle landing on the stage read as Morph. Nielsen 31/40, up from 27. The Finder itself passes the cognitive-load checks.
  - Browser evidence: no overflow and no clipping at the five widths. Muted text is 6.65:1 on night and 5.5:1 on stone. The horizon sits inside the first viewport at 1440 × 900.
  - The URL detector's contrast findings on the walnut and night surfaces are false positives (measured 13:1 and 6.4:1). The rest of what it flagged is global chrome (nav panels, the footer line).

Fixed in one batch:
1. **Missing spacing between the result's sections.** `.wrap`'s margin and padding shorthands reset the module's `margin-top` at equal specificity. Fixed with a doubled class (`.why.why`), the pattern the project already uses. The Descoperă horizon had the same issue.
2. **Too dense before the Finder.** The notes spread went from eight to four recurring notes; the other 97 stay in the A–Z index.
3. **Kickers above headings.** "În persoană" above the shop's name on Descoperă is gone, with one line under the name instead. On the result, the collection line now sits under an alternative's name, not above it.
4. **The step list and "1 / 7" said the same thing.** The counter now shows only on phones, where the steps become a bar.
5. **Two primary styles on the result.** The alternatives' "Adaugă" buttons are now secondary, so the page has one filled primary button, on the first result.
6. **Result stage on a tablet.** It filled the first screen and upscaled the packshot. It is now capped at 60svh under 900 px.
7. **Tap targets on phones.** The perfume links under the recurring notes, the A–Z links and "Toate cele N în vitrină" now have larger targets.

Considered and left as is:
- **The travel list and offers in "Încearcă"** (about 18 add buttons): C2 kept them as the tool for choosing a trial format, and the nav's Seturi links land there.
- **The pools of light in the horizon.** The review called them geometric halos at small sizes. A single strip read as a bright band of thumbnails on night (the first version), and a light without pools lets the multiplied packshots sink into the dark. The pools stay, fading into the room's tone.
- **The step list as a "stepper".** It carries the answers given, so it doubles as the consultation record and the way back. The numbers stay, because the sequence is the information.
- **"etichetat așa / nu e etichetat așa".** It is plain about what the match is (Morph's tags), and a softer wording would claim more.
- **Descoperă's length** (about 8,900 px at 1440). Most of it is the kept C2 Încearcă chapter and the five family chapters, each with its own object.
- **The keyboard route past the nav.** From the skip link without activating it, Tab passes 29 links in the closed nav panels before the first radio. This is global header behaviour, outside this phase; activating the skip link reaches the first radio in two stops.

## Assets and provenance

No new asset was imported. The page uses one Morph image already in `public/morph/campaign` and `data/assets.json`:

| File | Source (morphparfum.ro uploads) | Size | Status | Used for |
|---|---|---|---|---|
| `extract-still-life.avif` | `2024/12/Ce-inseamna-extract-de-parfum-…avif` (blog lead) | 1200 × 800 | concept | Descoperă opening, cropped 5:4 on the bottle and its reflection |

Considered and not used:
- `workshop-3.avif`: blotters and a Your Next Form card. It belongs to Layering, and the card carries a participant's handwritten name.
- `bottle-row.avif`: already the head of the "Toate" room.

All product objects are the existing packshots and masks.

## Skills used

| Skill | How |
|---|---|
| `impeccable` | `critique` before and after (two isolated subagents each: design review; detector and browser evidence). `craft-floor` read before editing. Static `detect` after the build (fixed, then clean) |
| `ui-ux-pro-max` | not loaded. Its UX rules applied here (native radios, visible focus, 44 px targets, no hover-only information, reduced motion) are already in the Impeccable craft floor and the project's own rules |
| `/stop-slop` | the new connective copy: opening, family and notes intros, Finder intro, result sentences. Active voice, no em dashes, no filler. `/humanizer` was not used on the same text |
| `/design-taste-frontend`, `/understand-anything`, `/design-md`, `diagram-design`, `frontend-slides` | not used: the architecture was small enough to read directly, and no diagram or DESIGN.md change was needed |

## Responsive

| Width | Descoperă | Finder | Result |
|---|---|---|---|
| 1920 | object and text side by side; notes 4 columns | steps in 3 columns, question in 8; horizon cells ≈ 104 px | stage capped at 560 px, info beside |
| 1440 | same | whole room, horizon included, in 900 px of height | stage and info in the first viewport |
| 1024 | same; A–Z index 4 columns | steps take 4 columns, question 7 | as desktop, alternatives stack |
| 768 | a chapter becomes object + name/notes side by side, facts and objects under it; notes 2 columns | one column: title, step bar, horizon, question, sticky actions | one column; stage capped at 60svh |
| 390 | as 768; the four recurring notes in 2 columns at 28 px | step bar, horizon at 46 px, 58 px answer rows, Continuă sticky at the bottom | square stage, name at 72 px, the reasons wrap to two lines per answer |

No horizontal overflow at 390 / 768 / 1024 / 1440 / 1920 on the three routes (smoke sweep, including a Finder step URL and a result URL). Nothing depends on hover.

## Accessibility

- **Descoperă:** one `h1`. Families are `h3` under "Cinci familii" (`h2`); notes are `h3` under "Notele".
- **Finder:** `h1` "Fragrance Finder", with the question as `h2`. On every step change focus moves to the question.
- **Controls:** native radios in a `radiogroup` named by the question. Arrows choose and Enter continues. Focus shows as an outline around the whole answer row.
- **Result:** the matched / not matched state is carried by words, not by the mark alone.
- The horizon is `aria-hidden`; its information is in the text beside it.

## Intentional non-changes

- Finder questions, answers, tags, weights, selection and the "why" source.
- The Încearcă chapter, the Travel shelf, the offers and the shop block on Descoperă (C2).
- Layering and its composer, the vitrine, Baie & Corp, the header, `Stage`, `ObjectLight`, `ObjectShelf`, `ProductVisual`, and the view-transition CSS.
- The search overlay's behaviour (one page entry added).

## Verification

- `tsc --noEmit` clean. `next build` passes; `/descopera` is now static.
- `npm run smoke`: 45 checks, all passing. New or changed checks:
  - **Descoperă:** five family chapters on stages, 4 recurring notes, more than 90 notes in the A–Z index, the first question, the 23-bottle horizon, the Încearcă chapter still present.
  - **Exploration:** hovering a note dims exactly the bottles without it, and the note opens the vitrine searched for it with a count. The family link opens the filtered vitrine.
  - **Descoperă → Finder:** an answer on Descoperă opens question 2 with it recorded.
  - **Continuă / Înapoi / reload:** no advance without an answer, Înapoi keeps the answer, a reload keeps the step, the horizon dims.
  - **Keyboard:** arrows choose, the focus ring shows on the row, Enter continues, focus lands on question 2.
  - **Transitions:** Finder → result carries `obj-morph-zeta-parfum-100ml` into the stage, and result → product carries it on to the product stage.
  - **Selection:** three results for "Oricare", two for Luxury. An incomplete result offers to continue at the right question.
  - **Reduced motion and no JavaScript:** the full path under reduced motion (no running animations), and the last step and result without JavaScript.
  - Updated: the finder path uses radios and Continuă; the try-list check starts from the result page, since the Descoperă preview is gone. The overflow sweep adds the Finder step and result URLs.
- Captures (`captures/phase-c3/`):
  - before: `before-discover-desktop.jpg`, `before-finder-desktop.jpg`, `before-result-desktop.jpg`;
  - after: `discover-desktop(-top).jpg`, `discover-mobile.jpg`, `discover-note-hover.jpg`, `finder-question-desktop.jpg`, `finder-question-mobile.jpg`, `finder-landing.jpg` (the last answer: one bottle lit before it travels), `result-desktop(-top).jpg`, `result-mobile.jpg`.
- Not run: Safari, Firefox, real devices, screen reader, Lighthouse.

## Known limitations

- **Family leads are chosen by a rule**, not an editorial choice by Morph. N8 leads Floral and is also the opening photograph.
- **Merging by spelling is not full normalisation.** It merges accent variants only. Morph's own variants stay separate ("pachouli" and "patchouli", "mosc" and "mosc alb"), and a note's vitrine search matches by substring ("mosc" also finds "mosc alb").
- **The family notes can be broad.** They are the most frequent notes in each group. "Lemn de santal" leads Gourmand because it is frequent there, not because Morph calls it gourmand.
- **The Finder cannot recommend every perfume.** Three perfumes (Malaga, Arles, Pure Soul) have no Finder tags in Morph's configuration and never appear as a result; the page says so.
- **The horizon on phones is 15 px per bottle.** It reads as a band of light, not as recognisable objects.
- The final 480 ms pause before the result exists so the last light change is seen; under reduced motion it is zero.
