# Morph-Redesign

Fișier de memorie pentru Claude. Se încarcă automat la începutul fiecărei sesiuni. Aici se adaugă regulile și deciziile care trebuie reținute între sesiuni.

## Git

- Se lucrează doar pe `main`. Fără branch-uri noi și fără PR-uri, decât dacă se cere explicit.
- Dacă sesiunea pornește pe alt branch (de ex. `claude/...`), treci pe `main` înainte de orice modificare: `git fetch origin main && git checkout main && git pull origin main`.
- Commit și push direct pe `main`. Procedura: skill-ul `push-main` (`.claude/skills/push-main/SKILL.md`).

## Stil de răspuns

- Română, concis, direct, fără umplutură și fără emoji.
- Mai întâi răspunsul, apoi detaliile, doar dacă e nevoie de ele.
- Faptele confirmate se separă de presupuneri. Codul se verifică înainte de a face afirmații despre el.

## Cod

- Schimbarea minimă necesară. Nu se rescrie cod care funcționează.
- Fără abstracții, dependențe sau comentarii inutile.
- La debugging: cauza reală, explicată scurt, apoi fix-ul.

## Decizii și context

(de completat pe parcurs)
