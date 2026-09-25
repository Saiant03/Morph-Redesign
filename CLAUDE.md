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

## Skill-uri

Registrul, cu sursa și limitele fiecăruia: `docs/research/skill-registry.md`. Nu se folosesc toate la fiecare task. Se alege skill-ul potrivit și se citește doar SKILL.md-ul lui, plus referințele de care e nevoie. Bibliotecile de referință nu se încarcă întregi.

- UI: `impeccable` (critică, polish, audit responsive și motion), `ui-ux-pro-max` (doar regulile UX/accesibilitate, interogări țintite), `/design-taste-frontend` (compoziție, ierarhie; doar consultativ).
- Text pentru oameni: `/humanizer` (voce naturală) sau `/stop-slop` (curățarea tiparelor AI), niciodată amândouă pe același text. Nu se folosesc pe cod, date structurate, date de produs sau text legal.
- `diagram-design`: doar când e nevoie de o diagramă (în `docs/`). `frontend-slides`: doar pentru prezentări.
- Review UI: `web-design-guidelines` (regulile Vercel, copie fixată în `references/`). QA interactiv: `webapp-testing` (Python Playwright, neinstalat; implicit rămân `npm run smoke` și `site-capture`). `mcp-builder`: doar dacă se construiește un server MCP.
- Din anthropics/skills, doar la cerere: `canvas-design`, `algorithmic-art`, `theme-factory`, `web-artifacts-builder`, `doc-coauthoring`, `internal-comms`, `slack-gif-creator`. Nu intră în site.
- `/design-md`: doar pentru un DESIGN.md derivat din implementarea Morph și din `docs/design/`.
- Understand Anything (neinstalat) și awesome-design-md: referințe externe; când se folosesc, vezi registrul.
- Skill-urile marcate cu `/` pornesc doar la cerere. Dacă proprietarul le numește în text, se citește direct `.claude/skills/<nume>/SKILL.md`.
- Direcția artistică Morph din `docs/design/` are prioritate față de orice skill.
- Munca mecanică se face cu scripturi deterministe sau cu modele mai ieftine. Fluxurile cu mai mulți agenți se folosesc doar când aduc un câștig real.

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
- Denumire (confirmată de proprietar): „Casa Morph” nu se folosește în experiența pentru clienți. Magazinul fizic = „Magazinul Morph din București”; în meniul principal rămâne „Magazinul”. „Despre Morph” apare momentan doar în footer.
- Imagini cu persoane identificabile (Gate 17, editorialul Animal și oricare altele) nu se folosesc până la acordul explicit al proprietarului. Rămân `pending` în `data/assets.json`. Faza B continuă fără ele.
- 2026-09-24: Faza A (sistemul creativ) încheiată: magazinul redenumit („Magazinul Morph din București”, nav „Magazinul”, `/magazin`, redirect din `/casa-morph`), nuc pe panouri și granulație generate cu `npm run materials`, tokeni de lumină (`--key-*`), tranziții de pagină cu `<ViewTransition>` (header fix, intrare „relight”, sticla partajată listă → produs), titlul hero legat de coloană (testat 320–1920 px), imaginile de campanie Morph în `public/morph/campaign` (`npm run assets`, proveniență în `data/assets.json`). Document: `docs/design/phase-a-creative-system.md`. Urmează Faza B doar la cerere.
- 2026-09-24: Faza B (homepage și commerce de bază) încheiată: `Stage` (sticla pe raft de sticlă, cu reflexie, poziționată după măsurători, `npm run objects`), home în șase momente (campaniile Morph ca medii sticky, lookbook, Forma, Trei ritualuri, magazinul), camera colecției cu tranziție de stare (`room-image`, `room-title`, `shelf-<slug>`), Baie & Corp (`/parfumuri/corp`, capitolul „Ritualul” pe PDP, date în snapshot), căutare și coș redesenate. Skill importat: `ui-ux-pro-max` (doar regulile UX; design-system-ul lui e respins). Document: `docs/design/phase-b-core-commerce.md`. Urmează Faza C doar la cerere.
- 2026-09-24: Faza B.5 (asset + tranziții) încheiată. Documentul este `docs/design/phase-b5-asset-transition.md`.
  - Încadrare: focal points pe imagine în `lib/campaign.ts` (`pos`, `posM`); cardurile din „Trei lumi” stau pe partea fără subiect; scena sticky pornește de la 1200 px, iar tabletele primesc cadrul întreg.
  - Navigație: 5 itemi primari, cu panouri pe nivelul 2 (`lib/nav.ts`). Seturi e sub Parfumuri. Despre Morph și Jurnalul sunt sub Magazinul. Despre Morph nu apare în meniul principal. Jurnalul duce la blogul Morph (extern).
  - 3D: nu se face din imaginile publice (există o singură vedere frontală). Zeta are dovada 2.5D (`npm run lightmask`, `ObjectLight`).
  - Tranziții: fotografia intră din home în camera colecției, sticla din raft devine scena de pe PDP, iar camerele colecțiilor sunt statice.
  - Test: `npm run smoke`, 28 de verificări.
- 2026-09-24: Faza C1 (indexul de parfumuri) încheiată: vitrina de nuc devine vederea implicită a `/parfumuri` și a camerelor colecțiilor (un raft luminat pe colecție, câte o lumină pe sticlă, etichetă cu nume, note, preț; rânduri echilibrate în CSS). Vederea „Index” rămâne (`?vedere=index`); galeria de carduri a fost scoasă. Măștile 2.5D există acum pentru toate cele 26 de parfumuri. Skill importat: `impeccable` (oficial, fără hook-uri; binarul e în `.gitignore`). Document: `docs/design/phase-c1-product-index.md`. Test: `npm run smoke`, 31 de verificări. C2–C4 doar la cerere.
- 2026-09-24: Faza C2 (Baie & Corp, Coffret, Travel) încheiată: `/parfumuri/corp` devine cameră (fereastra = Zeta parfum + gel + cremă pe un raft de sticlă, ritualurile pe piatră, Coffret pe nuc, „Alte seturi Morph”). Componenta nouă `ObjectShelf` (mai multe obiecte ale aceluiași parfum pe un raft, o lumină); `Ritual` o folosește pe PDP, pe pagina produsului de corp și în cameră. Produsele de corp și seturile au pagini la slug-urile Morph (`/[slug]`, 65 de pagini). Seturi în nav: Coffret → `/parfumuri/corp#coffret`, Travel Editions → `/descopera#travel`, Mostre → `/descopera#incearca`, Your Next Form. Fără `/seturi`. Geluri cu mască 2.5D; creme și cutii fără. Document: `docs/design/phase-c2-bath-body-ritual.md`. Test: `npm run smoke`, 37 de verificări. C3–C4 doar la cerere.
- 2026-09-25: Faza C3 (Descoperă + Fragrance Finder) încheiată: `/descopera` = deschidere (natura moartă N8 Morph) → Cinci familii (câte un obiect pe `Stage`, notele frecvente ca linkuri spre vitrina căutată, lumină CSS pe notă) → Notele (4 recurente + index A–Z de 101) → Finder-ul ca bandă de noapte cu prima întrebare Morph (formular GET) → Încearcă (neschimbat din C2). Instrumentul cu lentile a fost scos. Finder: o întrebare pe ecran, radio-uri native, Continuă/Înapoi, pasul în URL (`pas`), funcționează fără JS; orizontul celor 23 de sticle etichetate (`FinderHorizon`) se stinge după scor, iar sticla rezultatului trece în scena rezultatului (`obj-<slug>`) și apoi pe PDP. Logica Morph (întrebări, etichete, ponderi, `results()`) neschimbată. Document: `docs/design/phase-c3-discover-finder.md`. Test: `npm run smoke`, 45 de verificări. C3.5 și C4 doar la cerere.
- 2026-09-25: Faza C3.5 (Layering + Your Next Form) încheiată: `/layering` = studio de compoziție: `PairStage` (în `Stage.tsx`) pune A și B pe un singur raft de sticlă, B un pas în spate, sticla suprapusă, câte o lumină pe parfum (`screen` unde se întâlnesc), geometria din măsurători (`cqh`). Slot-urile A/B stau pe raft; lista celor 26 e un grup de radio-uri care previzualizează live pe raft (pe desktop ia locul coloanei de lectură). Citire: ce ai ales → ce au în comun (propoziție din date) → cum diferă (etapele, butoane Deschidere/Inimă/Bază care coboară lumina) → Încearcă / Sticlele / Perechea ta. URL `?a=&b=` păstrat; valoare goală = slot gol („Golește raftul”). `/layering/your-next-form`: cutiile sigilate Morph + ce știi / ce afli, cele 12 stări ca un singur rând tipografic (`?stare=`, merge fără JS), doar setul ales randat, niciun nume de parfum în pagină. Reticle, Chisle și UI Skills nu sunt instalate; QA runtime cu Playwright. Document: `docs/design/phase-c3-5-layering-ynf.md`. Test: `npm run smoke`, 50 de verificări (pe server proaspăt). C4 și C5 doar la cerere.
- 2026-09-25: Faza C3.5.1 (polish de motion) încheiată. Layering: la schimbarea unei sticle lumina slotului coboară, sticla veche iese (220 ms), cea nouă urcă prin sticla raftului în poziția măsurată (720 ms, fără overshoot), lumina revine după ea; cealaltă sticlă alunecă (FLIP) dacă se mută. Etapele: lumina merge pe `--ease-light` 900 ms, B la 70 ms după A. Notele: 7 parfumuri (între ele Nudo și Axum) au un atribut de note gol în Store API, dar Morph publică etapa în descriere („Note de bază: …”); `lib/catalog.ts` completează doar etapa goală din descriere, fără să schimbe snapshot-ul. `/magazin`: camera de nuc se aprinde din întuneric (`shop-light`), nu mai apare translucidă peste piatră. `enter` pe `<ViewTransition>` nu rulează la navigația Next (doar perechile cu nume). Document: `docs/design/phase-c3-5-1-motion-polish.md`. Test: `npm run smoke`, 54 de verificări (pe server proaspăt). C4 doar la cerere.
- 2026-09-25: Faza C4.0 (doar cercetare, fără cod) încheiată: arhiva de campanii și de brand Morph România, în `docs/research/morph-romania-campaign-archive.md`. Conține 33 de campanii și activări (2022–2026), cu date, mecanici și surse. Instagram e în spatele login-ului: s-au verificat 11 postări, restul e gol documentat. Slide-ul „Ice” (`ice-campaign.avif`) e din ședința foto Primitivo (2025). Corecția în `data/assets.json` nu e aplicată. C4.1–C4.3 doar la cerere.
- 2026-09-25: Faza C4.1a (doar plan editorial, fără cod) încheiată: `docs/design/phase-c4-1-editorial-plan.md`. Jurnalul pornește cu trei piese: două articole Morph reproduse integral (Your Next Form, workshopul de layering) și o pagină de campanie Primitivo, la `/jurnal` și `/jurnal/[slug]`. Despre Morph (`/despre-noi`) și parfumierii sunt pași separați (C4.1c). Atribuiri Morph verificate: Tonkatonic și Primitivo → Mathieu Nardin, Antigua Bay → Arturetto Landi, Oud Mafia → Véronique Nyberg; Gate 17 așteaptă decizia Carbonnel/Carbonell. Alt-ul imaginii Ice e greșit („fiolă”; e o fâșie de testare și sticla Primitivo): corecția e în C4.1b. C4.1b doar la cerere.
- 2026-09-25: Faza C4.1b (Jurnalul) încheiată: `/jurnal` + trei intrări în `/jurnal/[slug]`. J1 și J2 sunt „Articol Morph” (slug-urile Morph): fragment scurt atribuit, rezumat scris de concept, data, link „Citește articolul integral pe morphparfum.ro”; nu se reproduc integral. J3 `/jurnal/primitivo` e „Campanie · pagină a conceptului”, fără dată, cu imagini „asociate parfumului Primitivo”. Vocile sunt separate: textul Morph doar din `data/journal.json` (`npm run journal`: două postări + textul Primitivo din snapshot, doar metadate și fragmente), textul conceptului în `lib/journal.ts`. Imagini noi: `ynf-lead`, `primitivo-rig`, `primitivo-rocks`; `workshop-3` nu se folosește (numele scris de mână al unui participant); `workshop-slide`/`workshop-2` adăugate ca `pending`. Jurnalul din nav și footer duce la `/jurnal`; `/layering/your-next-form` are link spre J2. Alt-ul Ice e corectat (fâșie de testare, sticla Primitivo; decupajul de telefon nu are nisip). Document: `docs/design/phase-c4-1b-journal.md`. Test: `npm run smoke`, 58 de verificări; cele 6 timeout-uri pe `/descopera` apar și pe `1dbe399` (mediul, `/_next/image` blocat în Chromium). C4.1c doar la cerere.
- 2026-09-25: Faza C4.1c (Despre Morph + parfumieri) încheiată: `/despre-noi` („Despre Morph”, sub Magazinul): Napoli 2002, Metamorfoza (citatul Maison în engleză, `lang="en"`, cu traducere marcată „pentru concept”), Sticla (Bormioli Luigi), Laboratorul (link spre `/jurnal/primitivo`), Parfumierii, Colecțiile, Magazinul, Surse. Imagini: `n8-editorial` (decupaj din același cadru ca imaginea paginii Despre noi Morph), `black-bottle`, campaniile existente. Nav și footer → `/despre-noi`; `/magazin#povestea` rămâne și duce spre pagină. Creditele „Creat de …” doar pe Tonkatonic și Primitivo (Mathieu Nardin), Antigua Bay (Arturetto Landi), Oud Mafia (Véronique Nyberg), cu sursele Morph în `data/perfumers.json` (`lib/perfumers.ts`); Gate 17 (Carbonnel/Carbonell) și Disumano (Morel, doar Fragrantica) sunt în `withheld`, nepublicate. Fără biografii și fără alte nume de pe pagina The Noses. `Ext`/`MorphQuote` mutate în `components/Ext.tsx`. Titlul J2 din Jurnal: partea de după două puncte pe al doilea rând, cuvintele cu cratimă nu se rup (doar afișare; textul complet neschimbat). Document: `docs/design/phase-c4-1c-about-perfumers.md`. Test: `npm run smoke`, 62 de verificări, toate trecute pe server proaspăt (fără timeout-urile `/descopera` de data trecută). C4.2 doar la cerere.
- 2026-09-25: Faza C4.2a (doar cercetare, fără cod) încheiată: `docs/design/phase-c4-2-store-reviews-plan.md`. Verificat pe 2026-09-25: adresa (Contact: „Sector 1”), programul (L–V 12–20, S–D 10–18, neschimbat), telefoanele, linkul Maps al Morph (`maps.app.goo.gl/BtVSJc4s7KvkUQh57`). Google Maps: 4,5 din 223 de recenzii; widget-ul Trustindex de pe site e înghețat („159”, recenzii din aug–sep 2025, fără linkuri). Recenzii de produs: 0 (105 produse). Morph nu publică nicio imagine a magazinului. Decizie propusă: link spre Google + o frază-rezumat, fără citate și fără numele angajaților; cifra agregată doar datată și cu acordul proprietarului. C4.2b doar la cerere.
- Skill-urile externe se importă doar după inspecție și se înregistrează în `docs/research/skill-registry.md`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
