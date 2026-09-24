# Skill registry

Skills live in `.claude/skills/`. Imported skills are copied **verbatim** from a pinned commit, with their license file. Local skills are authored for this project. Rule: a small, high-quality set; import only what a current or next phase needs.

Inspection procedure applied to every candidate:
1. Shallow `git clone` into the scratchpad (outside the repo). No install, no build, no scripts executed.
2. Read every SKILL.md in full.
3. Scan for URLs, shell commands, credential/env access, "ignore previous" style prompt injection, HTML comments and hidden Unicode (zero-width and tag characters).
4. Inventory any bundled scripts and read them.
5. Confirm the license.
6. Diff the copied file against the source to prove it is unmodified.

## Imported

### frontend-design
| Field | Value |
|---|---|
| Source repository | anthropics/skills (identical copy in anthropics/claude-plugins-official `plugins/frontend-design`) |
| Source URL | https://github.com/anthropics/skills/tree/main/skills/frontend-design |
| Commit | `34040c9c568585f6929bedeaad110ad08f079624` (2026-09-10) |
| License | Apache 2.0 (`LICENSE.txt` included) |
| Relevance | Phases 7+: distinctive art direction, avoiding templated "AI" aesthetics, type and color planning, self-critique loop. Directly matches the brief's "not a generic luxury perfume website" requirement |
| Inspected | Full SKILL.md; external URLs: none; commands: none; hidden characters: none |
| Scripts present / executed | No / No |
| Known limitations | General web design guidance, no commerce/UX specifics. Some rules (no all-caps labels, no numbered markers unless the content is a sequence) must be weighed against Morph's existing brand usage |
| Date added | 2026-09-24 |

### gsap-core, gsap-scrolltrigger, gsap-performance
| Field | Value |
|---|---|
| Source repository | greensock/gsap-skills (official, GreenSock) |
| Source URL | https://github.com/greensock/gsap-skills/tree/main/skills |
| Commit | `aed9cfd3277740755f6bfc1155c7aa645403b760` (2026-04-21) |
| License | MIT (`LICENSE` copied into each skill folder) |
| Relevance | GSAP is the common motion layer for every candidate stack (Next.js, WordPress theme, Webflow and Shopify all use it; it is free since 2025). Core tween API + `matchMedia` for reduced motion, ScrollTrigger for scroll choreography, performance rules for the mobile budget |
| Inspected | All 3 SKILL.md files in full. URLs only to gsap.com docs. The repo also contains the other SKILL.md files, `examples/` (Vite/React/Vue/Nuxt demo apps with package.json), plugin manifests and brand SVGs. None of those were copied or run |
| Scripts present / executed | Demo apps exist in the repo, not in the imported skills / No |
| Known limitations | The descriptions tell the agent to "recommend GSAP" by default (a vendor bias; the choice stays ours per 08). The ScrollTrigger containerAnimation example has a typo (`Max.max` should be `Math.max`). React-specific cleanup lives in `gsap-react`, which is not imported yet |
| Date added | 2026-09-24 |

### ui-ux-pro-max
| Field | Value |
|---|---|
| Source repository | nextlevelbuilder/ui-ux-pro-max-skill (third party, requested by the owner in Phase B) |
| Source URL | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/tree/main/.claude/skills/ui-ux-pro-max |
| Commit | `dcc40ff5133ef78276117db0cc34e7b83cc8aeba` (2026-09-21), skill version 2.13.0 |
| License | MIT (`LICENSE` copied into the skill folder) |
| Relevance | Searchable UX guidelines (119), accessibility and interaction rules, stack notes for Next.js/React; used for targeted `--domain ux` queries in Phase B |
| Inspected | Full SKILL.md and both references; all 5 Python scripts read for network, subprocess, environment and file access: they read local CSVs only, with no network or subprocess calls; files are written only with `--persist` (to `design-system/`, never used here). URLs in the scripts only build Google Fonts links. Hidden Unicode scan over every file: none. No prompt-injection patterns. The repo also contains a CLI (`cli/`), other skills (banner, brand, design-system, slides, ui-styling) with their own scripts, galleries and screenshots; none were copied or run |
| Copied | `SKILL.md`, `references/`, `data/` (3.1 MB of CSV/JSON), `scripts/*.py` (not `scripts/tests/`), `LICENSE`; diff against the source: identical |
| Scripts present / executed | Yes / `scripts/search.py` only, for read-only queries (`--domain ux`, one `--design-system` run without `--persist`) |
| Known limitations | The `--design-system` output is generic and conflicts with the Morph direction (gold accent, Cormorant/Montserrat, feature-card grids, "liquid glass" blur, `back.out` stagger); it was rejected. Treat only the UX/accessibility rules as input, and never persist its output. Some queries return no match (e.g. cart drawer) |
| Date added | 2026-09-24 |

### impeccable
| Field | Value |
|---|---|
| Source repository | pbakaus/impeccable (official; npm package `impeccable` points to the same repository) |
| Source URL | https://github.com/pbakaus/impeccable |
| Commit | `edb9c7fbcba158fb6236bd043d6cba18d9cde8d3` (2026-09-24); installer `impeccable@4.1.0`, skill version 4.3.1, engine 0.1.5 |
| License | Apache 2.0 (`LICENSE` copied into the skill folder; `NOTICE.md` credits ehmo/platform-design-skills, MIT, for the iOS/Android references) |
| Relevance | Phase C1: critique before and after the `/parfumuri` redesign, the craft-floor checklist, and the deterministic detector (`scripts/impeccable detect`) |
| Installed | With the documented installer (`npx impeccable install --providers=claude --scope=project`), run first in a scratch directory. Only `.claude/skills/impeccable/` was copied into the repo. **Not** copied: the Claude Code hooks it writes to `.claude/settings.local.json` (a detector after every Edit/Write and on Stop) and its four subagents in `.claude/agents/` |
| Inspected | SKILL.md and the critique, polish and craft-floor references in full; URL scan of every markdown file (localhost, pinned github.com fixtures, impeccable.style docs, one design.md spec on raw.githubusercontent.com); hidden Unicode scan: none; no prompt-injection patterns. The launcher (`scripts/impeccable`, sh) was read: it runs a native engine binary, downloading it once from the project's GitHub releases (`engine-v<version>`) with a checksum check |
| Scripts present / executed | Yes / the launcher: `context`, `detect --json` (read-only). The 16 MB engine binary is gitignored (`scripts/bin/`) and fetched by the launcher on first run |
| Known limitations | Its generative defaults (bold "out-of-distribution" direction, PRODUCT.md/DESIGN.md setup, interactive questions, two subagents per critique) are not used; Morph's art direction in `docs/design/` wins. Used for critique, craft floor and detector only. The detector returned no findings on the C1 files, so it adds little beyond the manual review for this codebase |
| Date added | 2026-09-24 |

## Local (authored for this project)

| Skill | Purpose | Scripts | Date |
|---|---|---|---|
| push-main | Commit and push directly to `main` (the repo rule: no branches or PRs) | none | 2026-09-24 |
| site-capture | Desktop and mobile screenshots plus a structural JSON extract of any URL; works behind the sandbox proxy without disabling TLS | `capture.mjs` (written here, tested on morphparfum.ro/ice) | 2026-09-24 |

## Evaluated, not imported (yet)

| Candidate | Source @ commit | Why not now | Revisit when |
|---|---|---|---|
| webapp-testing | anthropics/skills @ 34040c9 (Apache 2.0) | Clean (read `with_server.py`: starts local servers via `subprocess` with `shell=True`, polls the port, runs a command, terminates). It assumes Python Playwright, which is not installed; `site-capture` covers the need with Node Playwright | Concept app has interactive flows to test (Phase 2 QA) |
| gsap-react, gsap-plugins (Flip, SplitText), gsap-timeline, gsap-frameworks, gsap-utils | greensock/gsap-skills @ aed9cfd | Stack not chosen; avoid unused context | After the Phase 2 stack decision (gsap-react + gsap-plugins likely) |
| react-best-practices | vercel-labs/agent-skills @ 063bee9 | Only relevant if Next.js is confirmed | Concept build starts |
| web-design-guidelines | vercel-labs/agent-skills @ 063bee9 | Fetches its rules from a remote URL at run time (the content can change after review); prefer a pinned local copy of the guidelines if adopted | UI review pass in Phase 2 |
| web-artifacts-builder, theme-factory, canvas-design, brand-guidelines | anthropics/skills | Aimed at claude.ai artifacts or Anthropic branding; not relevant | — |
| claude-code plugins (feature-dev, code-review, security-guidance …) | anthropics/claude-code @ d78be94 | General dev workflow, largely covered by built-in skills in this environment | If a specific gap appears |

Apart from ui-ux-pro-max and impeccable (both requested by the owner), no third-party (non-vendor) skill repositories were imported. The official vendor sources covered the needs, and unvetted community skill aggregators add risk without a clear gain.
