# Morph-Redesign

Fișier de memorie pentru Claude. Se încarcă automat la începutul fiecărei sesiuni. Aici se adaugă regulile și deciziile care trebuie reținute între sesiuni.

## Git

Proiect cu un singur proprietar. `main` e sursa de adevăr.

- Se lucrează direct pe `main`. Fără branch-uri de feature, decât dacă proprietarul le cere explicit. (Fazele 02 și 03 au fost pe branch-uri cerute explicit; ambele sunt acum în `main`.)
- Dacă sesiunea pornește pe alt branch (de ex. `claude/...`), treci pe `main` înainte de orice modificare: `git fetch origin main && git checkout main && git pull origin main`.
- La finalul fiecărei faze încheiate:
  1. verifică build-ul;
  2. rulează testele / QA relevante;
  3. revizuiește modificările;
  4. actualizează documentația necesară;
  5. commit cu toată munca încheiată pe `main`.
- Un singur commit clar și descriptiv pe fază.
- Nu se rescriu și nu se resetează commit-uri existente fără instrucțiune explicită. Niciodată force-push.
- Înainte de modificări distructive: `git status` și păstrarea muncii existente.
- Procedura de commit/push: skill-ul `push-main` (`.claude/skills/push-main/SKILL.md`).

## Stil de răspuns

- Română, concis, direct, fără umplutură și fără emoji.
- Mai întâi răspunsul, apoi detaliile, doar dacă e nevoie de ele.
- Faptele confirmate se separă de presupuneri. Codul se verifică înainte de a face afirmații despre el.

## Cod

- Schimbarea minimă necesară. Nu se rescrie cod care funcționează.
- Fără abstracții, dependențe sau comentarii inutile.
- La debugging: cauza reală, explicată scurt, apoi fix-ul.

## Proiect

Concept de redesign pentru https://morphparfum.ro (propunere profesională către Morph). Nu e site-ul de producție și nu se publică.

Sursa de adevăr pentru cercetare: `docs/research/`. Începe cu `00-executive-summary.md`; nu redescoperi fapte deja documentate acolo. `raw/` conține notițele brute ale subagenților, iar fișierele 01–08 au prioritate față de ele.

Fapte-cheie (verificate 2026-09-24):
- Morph e un brand italian de nișă (Napoli, 2002, Andrea Angelino). morphparfum.ro e magazinul oficial din România, cu un magazin fizic în București (Piața Alexandru Lahovari 5; pe site-ul live: „magazinul din București”).
- Stack actual: WordPress + WooCommerce + Breakdance. Store API public: `https://morphparfum.ro/wp-json/wc/store/v1/products`. Doar citire, fără credențiale.
- Captură de pagini: skill-ul `site-capture`.

## Decizii și context

- Nu avem acces la nimeni de la Morph sau de la Levitate. Întrebările operaționale rămân ipoteze documentate, nu se presupun răspunsuri.

- 2026-09-24: Faza 01 (cercetare) încheiată. Nu s-a ales încă direcția creativă (A Cromatic / B Forma / C Strata) și nici stack-ul de producție.
- 2026-09-24: Faza 02 încheiată. Există 9 ecrane prototip: `/concept/{a|b|c}/{home|collection|product}`, construite cu Next.js 16 + GSAP pe snapshot-ul din `data/`. Documentele sunt în `docs/design/`. Direcția finală nu e aleasă.
- Date: `npm run snapshot` (Store API) și `npm run colors` (culorile sticlelor). Nu se inventează prețuri, produse sau afirmații de brand.
- 2026-09-24: Faza 03: direcția aleasă e hibridul A Cromatic + C Strata (plus indexul de colecție din B ca pattern). Sursa de adevăr: `docs/design/phase-03-design-system.md` și `phase-03-consolidation.md`. Rute: `/`, `/parfumuri`, `/parfumuri/[colectie]`, `/[slug]`. Adusă în `main` prin fast-forward.
- 2026-09-24: Faza 04 încheiată: `/descopera`, `/descopera/finder` (+ `/rezultat`), `/layering`, `/layering/your-next-form`, `/casa-morph`. Logica finder-ului e a Morph (`data/finder.json`, `npm run finder`, script public parsat, neexecutat). Documente: `docs/design/phase-04-journey-expansion.md`, `phase-04-ux-review.md`.
- 2026-09-24: **Direcție de brand (după boutique-ul fizic și Pomelli Business DNA). Suprascrie rolul culorii din Faza 03.** Morph nu se reprezintă în primul rând printr-un sistem de culoare.
  - Teritoriu: meșteșug artizanal, inovație olfactivă, identitate personală, calitate premium, metamorfoză suprarealistă, precizie științifică, rafinament editorial, eleganță avangardistă.
  - Repere fizice: lemn închis la culoare, sticlă, reflexii, lumină dramatică/caldă, sculptură, materialitate, artă, lux intim.
  - Principiu digital: PRODUS + FORMĂ + MATERIE + LUMINĂ + PARFUM + TRANSFORMARE.
  - Culoarea derivată din parfum e doar accent atmosferic, nu taxonomie și nu limbaj vizual principal.
  - Niciodată familii olfactive reprezentate în principal ca palete de culori. Niciodată catalogul ca sistem de culori. Niciodată layering-ul ca amestec de vopsea.
- 2026-09-24: Faza 05 încheiată: reset de direcție artistică. Sistem: nișa luminată (produsul în lumină), tonuri piatră / noapte / nuc, un perete burgund doar pe pagina magazinului, Newsreader pentru nume și capitole. Culoarea parfumului = doar `--glow` (14% în lumina nișei). Paginile noi: `/cadouri`, căutare overlay. Documente: `docs/design/phase-05-design-system.md`, `phase-05-art-direction-reset.md`, `phase-05-creative-review.md`. Test: `npm run smoke` (server pornit).
- 2026-09-24: Faza 05.5 (doar strategie, fără cod): planul de upgrade creativ în `docs/design/phase-05-5-creative-upgrade-plan.md`, cu `phase-05-5-awwwards-reference-map.md` și `phase-05-5-content-opportunity-map.md`. Ideea: o singură cameră luminată care își schimbă starea (tranziții, obiect persistent, campaniile Morph ca medii). Roadmap A–E; urmează Faza A doar la cererea proprietarului.
- Denumire: „Casa Morph” nu se folosește în experiența pentru clienți (decizia proprietarului). Propunere: „Magazinul Morph din București”, de confirmat.
- 2026-09-24: Faza A (sistemul creativ) încheiată: magazinul redenumit („Magazinul Morph din București”, nav „Magazinul”, `/magazin`, redirect din `/casa-morph`), nuc pe panouri și granulație generate cu `npm run materials`, tokeni de lumină (`--key-*`), tranziții de pagină cu `<ViewTransition>` (header fix, intrare „relight”, sticla partajată listă → produs), titlul hero legat de coloană (testat 320–1920 px), imaginile de campanie Morph în `public/morph/campaign` (`npm run assets`, proveniență în `data/assets.json`). Document: `docs/design/phase-a-creative-system.md`. Urmează Faza B doar la cerere.
- Skill-urile externe se importă doar după inspecție și se înregistrează în `docs/research/skill-registry.md`.
