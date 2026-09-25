# Phase C4.2b: the Bucharest store page

Date: 2026-09-25. Base: `main` at `6d5148a` (C4.2a plan). Scope: `/magazin` and the store line on product pages, following `phase-c4-2-store-reviews-plan.md` §6 and §8, with the owner's decisions below. C4.3 not started.

## Owner decisions applied

1. Reviews: one link to Morph's Google Maps place, plus one neutral sentence written by the concept and labelled as its summary. No quotes, reviewer names or staff names. Store reviews appear only on `/magazin`, never on a PDP.
2. No figures: "4,5", "223" and the old "159" appear nowhere on the page. The linked source shows its current figures.
3. No store photography. The walnut room and its art wall stay a digital interpretation built from Morph packshots (one bottle per collection). Nothing is captioned as the shop, and there is no Gate 17 or workshop imagery.
4. Piața Romană metro: **omitted**. From this environment the station can be seen on the map, but no walking route could be checked. Morph's Maps link already gives transit and walking directions on any device, so a metro line would not add enough to justify an unverified claim.
5. PDP: "Îl poți încerca în magazinul Morph, Piața …" became "Parfumurile Morph se pot testa în magazinul din București." This is Morph's general FAQ statement, with the link to `/magazin`. It no longer promises a tester for the product on screen.

## Sources (all rechecked 2026-09-25)

| Fact on the page | Source |
|---|---|
| "Piața Alexandru Lahovari nr 5, Sector 1, București" | https://morphparfum.ro/contact ("Unde ne puteți găsi") |
| Shop hours "L – V 12:00 – 20:00", "S – D 10:00 – 18:00" | Footer on every page ("Program Casa Morph") |
| Online-order hours "L – V 09:00 – 17:00", "S – D Închis" | Footer ("Program comenzi online") |
| "Contact magazin 0733 400 949"; "Comenzi Online 0799 400 949"; "Asistență clienți +40 799.400.949"; info@morphparfum.ro | Footer, Contact page |
| Map and reviews destination `https://maps.app.goo.gl/BtVSJc4s7KvkUQh57` → Google place "Morph Parfum Romania" (place id `0x40b1ff4e7fb0fc33:0x619c8f68fd43f65b`) | The link on Morph's Contact page; the redirect was checked with `curl -I` |
| FAQ answer quoted in "Cum încerci" | https://morphparfum.ro/ (FAQ "Pot testa parfumurile Morph înainte să cumpăr?") |
| The three method lines | TLDR of https://morphparfum.ro/cum-testezi-un-parfum-inainte-sa-il-cumperi, quoted verbatim and split into three sentences. The article's drafting note is not quoted |
| Review summary | C4.2a §5.2: of the 10 distinct reviews read, 6 mention in-store advice |

## What changed

- `lib/catalog.ts` `BOUTIQUE`:
  - Hours now have a single source, `SHOP_HOURS` (days, label, from, to). `schedule`, the `hours` strings (home, Descoperă, finder result, YNF) and `open` (the "open now" line) are all derived from it, so none of them is hard-coded any more.
  - Also added: `district: 'Sector 1'`, `maps` and `reviews` pointing to Morph's place link, and online-order hours with "S–D închis".
- `app/magazin/page.tsx`:
  - **Sosirea**: unchanged motion. The lede no longer claims a team service. The address is an `<address>` with a non-breaking "nr. 5". Hours are rendered from `BOUTIQUE.schedule`. The actions are "Deschide în Google Maps" (new tab, announced to screen readers) and "Sună la magazin". The online-order phone and hours sit under Morph's label "Comenzi online și asistență clienți", kept separate from the shop phone and followed by the e-mail. A micro-note says the hours are Morph's and that Morph publishes no holiday hours.
  - **Cum încerci** replaces "De ce să vii": the FAQ answer as a `MorphQuote` with its source, then the three lines of Morph's guide (`data-voice="morph"`, `blockquote cite`) with "Citește ghidul".
  - **Selecția ta**: the component is unchanged. One added sentence says the list reserves nothing and does not show what is on the shelf, and a new line links to `/descopera#incearca` (testing sets, Travel Editions: the FAQ's second route).
  - **Recenzii despre magazin**: a single quiet section on stone, with the summary sentence, one link ("Citește recenziile magazinului pe Google Maps ↗") and the date of the summary. No widget, stars, figures or structured data.
  - Certilogo (`#certilogo`) and "Morph, din Napoli" (link to `/despre-noi`) are unchanged and now come after the visit content.
  - Removed: reason 02 (the "159" count and "mostly about the people"), reason 03 ("Toate cele trei colecții", which implied stock), reasons 01 and 04 (replaced by Morph's own method), and the generic map-search URL.
- `app/[slug]/page.tsx:83`: the testing line (decision 5).
- `magazin.module.css`: added styles for the address, contact list, FAQ quote, method and review line; removed `.reasons`.
- `scripts/smoke.mjs`: two checks.
  - `/magazin`, run at 1440 px and on iPhone 13 with reduced motion: address with sector; both schedule times; the online-order line with "S–D închis"; both `tel:` links; the Maps button (href, new tab, ≥ 44 px); the section label "Recenzii despre magazin"; exactly one review link (Morph's place, `target="_blank"`, `rel="noopener"`); no iframe, widget or stars; none of `159`, `223`, `4,5`, `★`, staff names, "Toate cele trei colecții", "De ce să vii" or the old map search; no `AggregateRating`; the FAQ and guide source links; `#certilogo`; the link to try at home; practical text ≥ 13 px (the uppercase system `.label` aside); no horizontal overflow.
  - Hours and PDPs: `/` and `/descopera` show the same hours; three PDPs carry the new line and no review wording.

## Skills used

- `impeccable`, in scoped-refinement mode (no PRODUCT.md; the incumbent system is the authority): the craft floor, a batched desktop and phone review, and `impeccable detect` on the changed files, which returned no findings. The review found four problems, all fixed: the "5" of the address orphaned on phones (now a non-breaking space plus `text-wrap: balance`), the default `figure`/`blockquote` indent on the FAQ quote, the shop phone listed twice (button plus a list row; the row was removed), and the review date note wrapping into the link line (now its own line).
- `web-design-guidelines` (the pinned copy): curly quotes, a non-breaking space in the address, and `.num` numerals on hours and phones. No further findings.
- `site-capture` was not needed: Morph's pages were read as text with `curl`, and the concept was captured with Playwright.

## Verification

- `npx tsc --noEmit`: clean.
- `rm -rf .next && next build`: clean, 85 static pages.
- `npm run smoke` on a fresh server: 64 checks.
  - Final run, after the last CSS fix: **64 passed, 0 failed**.
  - The three development runs before it had 4, 2 and 6 `page.goto: Timeout` failures on `/descopera` and the finder (Travel Editions, Descoperă, Descoperă → Finder, Finder checks). They came alongside two failures of my own new check, since fixed: the label compared as uppercase `innerText`, and a threshold that caught the 11.5 px system `.label`. In the last of those runs, every `/magazin` and PDP check passed, as did "no console errors".
- The intermittent failures are not caused by C4.2b.
  - The untouched baseline `6d5148a`, built clean and run on a fresh server, fails 4 of the same group (58 ok out of 62). Which checks in the group fail changes from run to run.
  - Root cause, reproduced in isolation: when a request to `/_next/image` is aborted while the image is still being optimized, that image and width stay stuck in Next 16.3.6's optimizer. Every later request for the same key hangs until the server restarts. `curl` without AVIF/WebP in `Accept` still gets an answer, because that is a different cache key.
  - An earlier smoke check closes its page while small thumbnails are loading. `/descopera` then waits on a hung thumbnail and never reaches `networkidle`. This also explains the "6 timeouts" noted in C4.1b.
  - The fix belongs to the test harness or the image config, not to this phase, so it was left out.

## Limitations and pending items

- No photographs of the store; the brief in `photography-direction.md` stands.
- No metro, parking, access or holiday-hours information: Morph publishes none of it.
- The summary sentence reflects reviews read on 2026-09-25 and has to be re-read if the page is refreshed later.
- The finder result still says "Parfumurile de mai sus se pot încerca în magazin", which is the same per-product implication, outside this phase's files. It should get the PDP treatment in a later pass.
- The Trustindex widget on Morph's site is still frozen at "159". That is the site's problem, not this concept's.
- The smoke harness is sensitive to the image-optimizer hang described above.
