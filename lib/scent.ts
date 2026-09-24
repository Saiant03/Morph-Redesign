// Scent color as atmosphere (Phase 05). A fragrance's sampled color (data/colors.json) only tints the light inside
// the niche its bottle sits in. It is never a swatch, a taxonomy, a navigation device or a layout color.
import type { Perfume } from './catalog';
import { tone } from './catalog';

/** The niche's light without a fragrance in it (also the @property initial value of --glow in globals.css). */
export const LIGHT = '#f4efe7';

const rgb = (h: string) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const hex = (a: number[]) => '#' + a.map(v => Math.round(v).toString(16).padStart(2, '0')).join('');

/** sRGB mix, w = share of `a`. */
export const mix = (a: string, b: string, w: number) => hex(rgb(a).map((v, i) => v * w + rgb(b)[i] * (1 - w)));

/**
 * --glow for a scope that holds one fragrance: the niche's light tinted 14% by the scent's sampled identity color
 * (label band for Luxury bottles that have one, otherwise the juice). The juice colors the light, not the page.
 */
export function scentVars(p: Perfume): React.CSSProperties {
  return { '--glow': mix(tone(p).identity, LIGHT, 0.14) } as React.CSSProperties;
}
