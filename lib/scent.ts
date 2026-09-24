// Scent color tokens. Every fragrance color in the UI is derived here from data/colors.json
// (sampled bottle colors + documented overrides). Components never hard-code a scent color.
import type { Perfume, CollectionId } from './catalog';
import { perfumes, tone } from './catalog';

export const PAPER = '#edeeeb';
export const INK = '#1b1c1d';

const rgb = (h: string) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const hex = (a: number[]) => '#' + a.map(v => Math.round(v).toString(16).padStart(2, '0')).join('');

/** sRGB mix, w = share of `a`. */
export const mix = (a: string, b: string, w: number) => hex(rgb(a).map((v, i) => v * w + rgb(b)[i] * (1 - w)));

function luminance(h: string) {
  const [r, g, b] = rgb(h).map(c => c / 255).map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG 2.x contrast ratio. */
export function contrast(a: string, b: string) {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}

/** Ink or paper, whichever reads better on `bg`. */
export const textOn = (bg: string) => (contrast(INK, bg) >= contrast(PAPER, bg) ? INK : PAPER);

/** Lighten `c` toward paper until ink or paper text reaches `min` on it. */
function readable(c: string, min = 4.5) {
  let w = 1;
  let out = c;
  while (Math.max(contrast(INK, out), contrast(PAPER, out)) < min && w > 0) {
    w -= 0.04;
    out = mix(c, PAPER, w);
  }
  return out;
}

export type ScentTokens = {
  /** raw identity color: swatches, bars, strata. Never a text background at full strength. */
  scent: string;
  /** the scent's field: product image background; ink text on it is >= 7:1 for all 26 scents */
  field: string;
  /** scent color darkened until it reads as text on paper (>= 4.5:1) */
  ink: string;
  /** three tiers for opening / heart / base, light to full; each passes 4.5:1 with its text color */
  tiers: [string, string, string];
};

export function scentTokens(p: Perfume): ScentTokens {
  const id = tone(p).identity;
  let ink = id;
  for (let w = 0; contrast(ink, PAPER) < 4.5 && w <= 1; w += 0.05) ink = mix(INK, id, w);
  return {
    scent: id,
    field: mix(id, PAPER, 0.36),
    ink,
    tiers: [mix(id, PAPER, 0.3), mix(id, PAPER, 0.62), readable(id)],
  };
}

/** Inline CSS custom properties for a scope that belongs to one fragrance. */
export function scentVars(p: Perfume): React.CSSProperties {
  const t = scentTokens(p);
  return { '--scent': t.scent, '--scent-field': t.field, '--scent-ink': t.ink } as React.CSSProperties;
}

/**
 * A collection's accent is not one color: it is the ordered strip of its members' colors,
 * rendered as hard stops (no gradient blending).
 */
export function chord(list: Perfume[]) {
  const step = 100 / list.length;
  return `linear-gradient(90deg, ${list.map((p, i) => `${tone(p).identity} ${(i * step).toFixed(2)}% ${((i + 1) * step).toFixed(2)}%`).join(', ')})`;
}

export const collectionChord = (id: CollectionId) => chord(perfumes.filter(p => p.collection === id));
