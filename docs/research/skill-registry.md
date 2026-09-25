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

### Skill stack round (2026-09-24)

Same inspection procedure as above: shallow clone into the scratchpad, SKILL.md read, bundled scripts grepped for network, subprocess, environment and file-write calls, URL inventory, hidden-Unicode scan (zero-width, bidi, BOM, tag characters), prompt-injection patterns, license. No installer or script was run. Files were copied verbatim; the diff against the source is clean except where noted.

**Local change applied to four skills:** one frontmatter line, `disable-model-invocation: true`, added to `design-taste-frontend`, `humanizer`, `stop-slop` and `design-md`. Claude Code then no longer loads them by description match; they run only when the owner invokes them (`/humanizer` etc.) or asks for them by name, in which case the SKILL.md is read directly. Reason: these four have broad triggers (any frontend page, any prose) and would otherwise compete with the Morph art direction, or with each other (Humanizer and Stop Slop on the same text).

### design-taste-frontend
| Field | Value |
|---|---|
| Source | https://github.com/Leonxlnx/taste-skill, `skills/taste-skill/` (the folder is named `taste-skill`, the skill `design-taste-frontend`; v2) |
| Commit | `c184364c58658b2f131b4ae8bd3d206cabb3deee` (2026-09-23) |
| License | MIT (`LICENSE` copied) |
| Copied | `SKILL.md`, `LICENSE`. Not copied: the other 12 skills in the repo (v1, brutalist, soft, minimalist, image generation, brandkit, stitch …), `skill.sh`, examples, research |
| Inspected | SKILL.md (87 KB) searched for commands, URLs, injection patterns and hidden characters: none of concern. No scripts. No hooks |
| Invocation | On demand only (`disable-model-invocation`) |
| Use in Morph | Composition, hierarchy, spacing and motion critique; checking a new layout for generic AI patterns. Advisory: Morph's materials, type, object presentation, navigation and transitions win on any conflict. Its image-placeholder and "infer a direction" rules do not apply; the direction is fixed in `docs/design/` |

### humanizer
| Field | Value |
|---|---|
| Source | https://github.com/spuvr/humanizer (root `SKILL.md`) |
| Commit | `0d5a8cf82bc36232b79afafd4993ca4f8226c8bd` (2026-05-16) |
| License | MIT, stated in `README.md` (the repo has no LICENSE file); `README.md` copied to keep the license statement |
| Copied | `SKILL.md`, `README.md`. Not copied: `Testing/`, `BENCHMARK/` |
| Inspected | Prose-only skill: no scripts, commands, URLs or hooks; hidden characters: none |
| Invocation | On demand only |
| Use in Morph | Marketing, editorial and UX copy, human-facing docs. Never code, JSON/YAML, product data, prices, notes, legal text. Meaning and facts stay unchanged |

### stop-slop
| Field | Value |
|---|---|
| Source | https://github.com/hardikpandya/stop-slop |
| Commit | `8da1f030185bdfe8471220585162991eaeb970e9` (2026-03-18) |
| License | MIT (`LICENSE` copied) |
| Copied | `SKILL.md`, `references/` (3 files), `LICENSE` |
| Inspected | No scripts or hooks; one URL (author homepage in metadata); hidden characters: none |
| Invocation | On demand only |
| Use in Morph | Explicit AI-pattern review of copy, design docs and reports. Pick either this or Humanizer for a given text, never both |

### diagram-design
| Field | Value |
|---|---|
| Source | https://github.com/cathrynlavery/diagram-design, `skills/diagram-design/` |
| Commit | `dc1ace47b99a419e42d01a03cb6ace5346efa8ae` (2026-09-19), skill version 2.6 |
| License | MIT (`LICENSE` copied) plus `THIRD_PARTY_LICENSES.md` (Tabler Icons MIT, Simple Icons CC0) |
| Copied | The whole skill folder (3.6 MB: `SKILL.md`, 57 references, 174 example/template HTML assets, 4 Python scripts). Not copied: repo tooling, plugin manifests for other agents, docs |
| Inspected | The 4 scripts (`self_check.py`, `drawio_extract.py`, `excalidraw_extract.py`, `mermaid_extract.py`) are standard-library only: they parse local files and print; no network, no subprocess, no writes outside the given output. The one BOM hit is a `lstrip("\ufeff")` literal. 5 asset HTML files carry the skill's own inline motion controller; no remote scripts (only Google Fonts links) |
| Invocation | Auto by description (narrow trigger: a diagram is requested) |
| Use in Morph | Architecture, journey, dependency and flow diagrams in `docs/`. Never application UI; nothing enters the app bundle |

### frontend-slides
| Field | Value |
|---|---|
| Source | https://github.com/zarazhangrui/frontend-slides, `plugins/frontend-slides/skills/frontend-slides/` (identical to the repo-root copy) |
| Commit | `9906a34d640d2111f724544cbc50f7f130569ae1` (2026-06-23) |
| License | MIT (`LICENSE` copied) |
| Copied | `SKILL.md`, style presets, animation patterns, HTML template, `viewport-base.css`, `bold-template-pack/`, `scripts/extract-pptx.py` |
| **Removed** | `scripts/deploy.sh` (installs the Vercel CLI globally and publishes the deck to Vercel; this concept must not be published) and `scripts/export-pdf.sh` (runs `npm install playwright` and `npx playwright install chromium` in a temp dir, against this environment's rule). SKILL.md still mentions both; for PDF export use the preinstalled Chromium through `site-capture`-style Playwright instead |
| Inspected | `extract-pptx.py` reads a .pptx with python-pptx and writes images/JSON to the given output dir only |
| Invocation | Auto by description (narrow trigger: a presentation is requested) |
| Use in Morph | Pitch or case-study deck for the proposal to Morph. Its presets and slide styling never enter the website |

### design-md
| Field | Value |
|---|---|
| Source | https://github.com/google-labs-code/stitch-skills, `plugins/stitch-utilities/skills/design-md/` |
| Commit | `0337446dadde6f8c94210444e2aa9d546126480f` (2026-08-17) |
| License | Apache 2.0 (repo `LICENSE` copied) |
| Copied | `SKILL.md`, `README.md`, `examples/DESIGN.md`, `LICENSE` |
| Inspected | No scripts or hooks. The frontmatter `allowed-tools` lists `stitch*:*`, `Read`, `Write`, `web_fetch`; no Stitch MCP server is configured here, so only Read/Write apply. It fetches Stitch screens by default |
| Invocation | On demand only |
| Use in Morph | Only the DESIGN.md format and section structure. Source is the Morph implementation (`app/globals.css`, components) and `docs/design/phase-05-design-system.md`, `phase-a-creative-system.md`, `phase-c1-product-index.md`; not a Stitch project and not a generic template. Must also record materials, object treatment, motion and anti-patterns (color is an accent only). No DESIGN.md exists yet |

### Retained, checked again (2026-09-24)
- **ui-ux-pro-max**: installed copy is from `dcc40ff`, which is still the upstream HEAD of nextlevelbuilder/ui-ux-pro-max-skill (the original; forks exist). Diff against upstream: identical apart from the added `LICENSE`. Tracked `scripts/__pycache__/*.pyc` files (runtime cache from the Phase B queries) were removed from Git and `__pycache__/` added to `.gitignore`.
- **impeccable**: installed copy (skill 4.3.1 via the official installer) kept. Upstream's in-repo `.claude/skills/impeccable` at the same commit differs slightly (unreleased edits after the npm release); no update needed. Still no hooks in `.claude/settings*.json`, no `.claude/agents/`; `scripts/bin/` and `update-check.json` remain gitignored.

## External references (not vendored)

| Resource | Source @ commit | License | Why not in the repo | How to use |
|---|---|---|---|---|
| Understand Anything | https://github.com/Egonex-AI/Understand-Anything @ `6df3065` (2026-09-12), plugin 2.9.7 | MIT | Egonex-AI is the upstream: the README credits the original author Lum1104 and `github.com/Lum1104/Understand-Anything` resolves to the same HEAD (transferred repo, not a fork). It is a full Claude Code plugin, not a standalone skill: `/understand` needs a pnpm TypeScript workspace built on first run (`pnpm install && pnpm --filter @understand-anything/core build`, tree-sitter WASM), dispatches up to 5 subagents per batch, and ships hooks (PostToolUse on every Bash call; a SessionStart hook that tells the agent to rebuild a stale graph "without asking"). Vendoring means committing the external repo wholesale | Not installed. When the repo becomes hard to reason about, the owner installs it for one session with `/plugin marketplace add Egonex-AI/Understand-Anything`, keeps `autoUpdate` off, runs `/understand` once, and adds `.understand-anything/` to `.gitignore`. Reuse an existing `.understand-anything/` or `.ua/` graph instead of rebuilding. For normal tasks, read the relevant files directly |
| awesome-design-md | https://github.com/VoltAgent/awesome-design-md @ `f696123` (2026-09-21) | MIT | A reference library of 74 DESIGN.md files describing other brands; copying it would import unrelated identities | For a specific visual problem, clone it into the scratchpad, read only the relevant references, extract the principle, adapt it to Morph. Nothing is copied into the repo without a named reason and attribution |

## Named but not available (Phase C3.5, 2026-09-25)

Reticle (runtime visual QA), Chisle (context reduction) and "UI Skills" were named in the C3.5 brief. None is in `.claude/skills/` and none has been through the inspection above, so none was installed. Runtime QA used scripted Node Playwright sessions (the `site-capture` setup); context was kept small by reading only the files and skill sections needed.

## Not provided

Skill #11 was not provided, so no installation was attempted.

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

Apart from ui-ux-pro-max and impeccable (both requested by the owner), no third-party (non-vendor) skill repositories were imported. (Updated 2026-09-24: the owner then requested the skill stack above; each item went through the same inspection.) The official vendor sources covered the needs, and unvetted community skill aggregators add risk without a clear gain.
