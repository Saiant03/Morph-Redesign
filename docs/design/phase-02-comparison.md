# Phase 02 — Comparison of A / B / C

No score, no ranking, no winner. The observations come from the built screens and their captures (`docs/design/captures/`). Where a point is a judgment rather than an observation, it reads as one.

## Structured comparison

| Dimension | A — Cromatic | B — Forma | C — Strata |
|---|---|---|---|
| **Brand fit** | Builds on Morph's stated founding idea (scents, colors, emotions) and on the most visible product fact: colored bottles. Italian-gallery calm fits "niche" without borrowing luxury clichés. The serif logo sits comfortably beside a neutral grotesk | Builds on the bottle's twist and the name (*morphē*, form). Strong object focus. The giant grotesk "MORPH" competes with the serif wordmark: the brand name appears in two unrelated typefaces | Carries Morph's current campaign line ("Identity, layer by layer", Your Next Form) through the whole experience. The most emotional and the closest to how Morph already markets layering |
| **Distinctiveness** | High and specific: a color index of all 26 scents is not something reference brands can adopt, since most sell clear or neutral glass. Risk of being read as "colorful DTC" if restraint slips | Highest visual distinctiveness. Sheared frames + width-axis type + monochrome-until-hover are unmistakable. Architecture-studio aesthetics are known in fashion, less so in fragrance | Medium. Translucency and serif italics are common in beauty; the distinctiveness comes from the behavior (veils = note tiers, time phases, merged pyramids), not from the look |
| **Product presentation** | Best color fidelity: the bottle sits on its own tint; packaging and label colors read clearly. Packshots on white blend well via `multiply` | The object as sculpture: large, cropped, monochrome, then color "in the glass" on the PDP. The strongest luxury-object feel; less information about color and juice at a glance | Softest: bottles on tinted mist behind veils. Beautiful on the PDP; on the home hero the bottle stays partly veiled until you scroll, so product clarity is lower at first glance |
| **Shopping clarity** | Clear: conventional card grid with descriptor, family, longevity, travel option, price, add. Filters are obvious chips. PDP buy box is plain | Very clear on desktop: the collection index is the fastest scan of the three (a table of name, notes, family, longevity, price, add). The PDP spec sheet is exhaustive. On mobile, rows with thumbnails stay usable | Good once in: a persistent buy bar on the PDP, an always-open card veil on mobile. On desktop, card details are hidden until hover (name and price stay visible). Longer scroll to reach the same information |
| **Storytelling** | Implicit, through color. Morph's copy is used but set quietly; the notes ramp tells "time" through hue steps | Typographic: notes as huge words, a spec-sheet voice. Story reads as a manifesto rather than an atmosphere | Strongest narrative: the scent is told in time (opening → heart → base) with Morph's own paragraphs, pinned and paced. The homepage explains layering before selling it |
| **Mobile viability** | Strong. The color index becomes a horizontal snap strip; the grid is 2 columns; the composer stacks; a sticky buy bar appears after scroll | Good after fixes. The width-axis type scales well, and the index becomes rows with sheared thumbnails. The giant title under the PDP frame costs vertical space, so price comes later than in A/C | Good after fixes. Pinning is disabled on mobile (phases become buttons), veils become normal text, the buy bar is always visible. Backdrop blur is the main performance risk on low-end phones |
| **Interaction potential** | Color as a data layer: index, family colors, pairing blends. It extends naturally to the finder result ("your color"), gift hub and new launches (each launch brings its own color) | Index/preview, hover color reveal, shear transitions. It extends to a comparison tool (spec sheets side by side) and to an architectural product configurator. Less natural for playful features | The richest: time scrub, merged pyramids, blind-reveal staging, saved "your next form". It extends best to layering pairings, the post-purchase QR reveal and the finder |
| **Motion potential** | Low-key by nature: color transitions, reflow. Hard to overdo; also hard to make "wow" | High-impact but bounded: the width-axis animation and shear settle are signature moments; WebGL refraction is a natural next step | Highest: scrubbed timelines and veils. It also carries the most risk of motion fatigue and scroll-jacking complaints |
| **Scalability** | Excellent. The system is data-driven (color per SKU); body care, room scents and new collections plug in with their own colors. Needs a color governance rule (who sets a new product's color) | Good for perfumes. Harder for non-bottle products (gels, creams, diffusers, gift cards) whose shapes don't carry the twist; monochrome can make them look alike | Good. Tints derive from juice colors, and layers work for any product type. The editorial pacing needs content (paragraphs per note) for every SKU, which Morph has for perfumes, not for all body products |
| **Implementation complexity** | Lowest. CSS `@property` color transitions, `multiply` blending, Flip. Contrast checks per color are the main ongoing work | Medium. `clip-path` shears, a variable-font axis, a sticky preview. WebGL (if added) raises it significantly. Needs a careful mobile fallback for every sheared layout | Medium–high. Pinned ScrollTriggers, backdrop-filter, synchronising buttons with scroll, reduced-motion paths. Most QA across browsers and devices |
| **Risk** | Reads as playful or DTC if type and space get busy; color accessibility (text on ~25 tints); depends on the bottle colors staying distinctive in future launches | Brand-identity conflict (grotesk "MORPH" vs serif logo); can feel cold for a scent brand; usability depends on discipline in keeping geometry out of the shop pages; photography dependence (studio light) | Closest to generic "dreamy beauty" if the layer logic is diluted; performance of blur on mobile; long scroll slows fast shoppers; depends on new mist and skin imagery to feel premium |

## Self-critique (as creative director)

### A — Cromatic
1. **Distinctive:** the color index. Twenty-six real bottle colors as the navigation of the whole catalog; the collection "chords".
2. **Generic:** the card grid and the text-heavy lower homepage (journey, boutique) could belong to any calm e-commerce site.
3. **Most Morph-specific:** color sampled from Morph's own bottles; the claim "mirosuri, culori, emoții" is Morph's founding line.
4. **Commercially strong:** clear cards with travel option and price, a PDP buy box with the threshold nudge, the sample set in the grid.
5. **Difficult to use:** hovering the index on desktop swaps the hero quickly. It is fine for exploration, but a visitor may not realise the swatches are scents until they read the hint.
6. **Over-designed:** little. The glass-pane composer is on the edge of a diagram.
7. **Memorable interaction:** sweeping across the index and watching the field change color.
8. **Remove:** the explanatory hint under the index (design should make it obvious); the duplicated collection text in the homepage rows.
9. **Push further:** color as information everywhere (finder result as a color, cart items tinted, family color ranges on the collection page); a proper color-matched photo shoot.
10. **Would prevent it becoming the system:** if future Morph launches use similar colors, or if Morph's brand team sees color as seasonal rather than per scent. Contrast rules on ~25 tints must be formalised.

### B — Forma
1. **Distinctive:** sheared frames, width-axis type, color only in glass. Nothing in fragrance e-commerce looks like this.
2. **Generic:** the spec tables echo architecture and fashion studio sites. Distinctive in category, familiar across categories.
3. **Most Morph-specific:** the 7° twist taken from the Bormioli bottle; the bottle as a design object.
4. **Commercially strong:** the collection index is the fastest shopping view of all three; the PDP spec sheet answers every factual question.
5. **Difficult to use:** monochrome images hide the one thing that distinguishes the Luxury scents at a glance (their color); the gallery mode needs hover to see color, which doesn't exist on touch.
6. **Over-designed:** the giant "MORPH" in a second typeface; the huge PDP title below the frame on mobile.
7. **Memorable interaction:** row hover → the bottle appears in color in the sheared frame; the wordmark compressing on load.
8. **Remove:** the typographic "MORPH" (use the real logo or a Morph-owned display face); monochrome on touch devices.
9. **Push further:** a refraction or caustics hero (the "color only in glass" idea done with light); a side-by-side compare built on the spec sheet.
10. **Would prevent it becoming the system:** the conflict with Morph's existing serif identity, the coldness for a sensory product, and the weak fit for body and home products.

### C — Strata
1. **Distinctive:** the behavior. Veils are the note tiers, the PDP moves through time, the composer merges two real pyramids.
2. **Generic:** the look (serif italics, mist tones, frosted glass) is common in beauty.
3. **Most Morph-specific:** "Identity, layer by layer" and Your Next Form as the organising idea; layering as structure rather than a blog topic.
4. **Commercially strong:** the always-visible buy bar; the merged pyramid makes the travel-pair CTA feel logical.
5. **Difficult to use:** the pinned home hero delays content for fast visitors; card details hidden behind hover on desktop.
6. **Over-designed:** the pinned home hero (the time idea belongs on the PDP, not twice); the overlapping journey "layers".
7. **Memorable interaction:** the time-on-skin section and the merged note pyramid.
8. **Remove:** the pinned home hero (replace with a static layered composition); the overlapping journey cards.
9. **Push further:** the blind-reveal page for Your Next Form; pairing pages with merged pyramids; real mist and skin photography.
10. **Would prevent it becoming the system:** blur performance on mobile, the risk of drifting into generic "dreamy beauty", and dependence on long-form content for every product.

## Strongest elements

| A — Cromatic | B — Forma | C — Strata |
|---|---|---|
| Color index as catalog navigation | Collection index with hover preview | Time on skin (opening → heart → base) |
| Per-scent tint field for packshots | Spec-sheet PDP (complete, scannable) | Merged note pyramid in the composer |
| Family chips with color, collection chords | 7° shear as a brand geometry | Persistent buy bar on long pages |
| Calm, legible grid and buy box | Width-axis type as a form idea | Layering as the organising principle |

## Hybrid opportunities (for the decision, not decided)

1. **A's color system + C's layering and time behavior.** Color identifies each scent; the PDP tells it over time; the composer blends two colors *and* merges two pyramids. The two are technically compatible (both use the same color data) and they cover each other's weak points: A lacks narrative, C lacks visual specificity.
2. **B's collection index inside A or C.** The index/preview view is the strongest shopping view regardless of direction; it could be an alternative "list" view within the chosen system.
3. **B's shear as a single signature detail** (image masks, transitions) inside A or C, instead of a whole system. It keeps the bottle geometry without the brand-type conflict.
4. **C's persistent buy bar and time section as PDP standards** for any direction.

## Recommended next decision for the project owner

Choose one of these paths for Phase 03:
- **(a)** a single direction as-is;
- **(b)** hybrid 1 (A + C, optionally with B's index as a list view);
- **(c)** another round on two directions.

In any case, decide two supporting points at the same time: whether the Morph serif wordmark stays the only brand typeface (it rules B's wordmark in or out), and whether a new photo shoot is part of the proposal (every direction depends on it to look finished).
