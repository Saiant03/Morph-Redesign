import Image from 'next/image';
import { ViewTransition } from 'react';
import { type Perfume, objectBox, lightMask } from '@/lib/catalog';
import { ObjectLight } from './ObjectLight';
import { scentVars } from '@/lib/scent';
import s from './Stage.module.css';

// `src`/`id`: another object of the same scent (a body product) on the scent's stage, named obj-<id> for its own page
type Props = { p: Perfume; image?: number; src?: string; id?: string; sizes: string; priority?: boolean; className?: string; alt?: string; vt?: boolean };

/**
 * A fragrance at monument scale: standing on a glass shelf in the room's key light, with its reflection.
 * The foot of the bottle sits exactly on the shelf line because the packshot's object box is measured
 * (scripts/objects.mjs). The scent's --glow tints the light by 14%, as in the niche; nothing else is coloured.
 */
export function Stage({ p, image = 0, src: other, id = p.slug, sizes, priority, className = '', alt, vt }: Props) {
  const src = other ?? p.images[image] ?? p.images[0];
  const box = objectBox(src);
  const mask = lightMask(src);
  const vars = {
    ...scentVars(p),
    '--ar': box ? `${box.w} / ${box.h}` : '4 / 5',
    '--foot': box?.bottom ?? 0.88,
    '--ol': box?.left ?? 0.28,
    '--ow': box ? box.right - box.left : 0.44,
  } as React.CSSProperties;
  const stage = (
    <div className={`${s.stage} ${className}`} style={vars} data-lit={mask ? '' : undefined}>
      <span className={s.shelf} aria-hidden />
      <span className={s.refl} aria-hidden><Image src={src} alt="" fill sizes={sizes} className={s.img} /></span>
      <span className={s.obj}>
        <span className={s.contact} aria-hidden />
        <Image src={src} alt={alt ?? p.name} fill sizes={sizes} priority={priority} className={s.img} />
      </span>
      {mask && <ObjectLight mask={mask} className={s.glint} />}
    </div>
  );
  return vt ? <ViewTransition name={`obj-${id}`} share="morph" default="none">{stage}</ViewTransition> : stage;
}

// the object height of the front bottle (A) and the shelf line, in stage heights (cqh); B stands a step behind
const PAIR = { h: 66, shelf: 88, depth: 0.87, lift: 3.5, overlap: 0.3 };
const DEFAULT_BOX = { w: 768, h: 960, top: 0.1, bottom: 0.88, left: 0.26, right: 0.72 };

/** One object's geometry from its measured box: the packshot is scaled so the bottle itself is `h` tall. */
function standing(src: string, h: number) {
  const b = objectBox(src) ?? DEFAULT_BOX;
  const box = h / (b.bottom - b.top), ar = b.w / b.h, w = box * ar;
  return { b, box, ar, w, visible: w * (b.right - b.left), off: ((b.left + b.right) / 2 - 0.5) * w };
}

/**
 * Layering (docs/design/phase-c3-5-layering-ynf.md): two fragrances on one glass shelf, each in its own key light.
 * A stands in front, B a step behind (smaller, its foot a little higher on the glass) and the glass overlaps by a
 * fifth of the narrower bottle. The two pools of light overlap between them (screen): light adds, nothing is mixed.
 * Both bottles are set to the same measured object height, because Morph's packshots are framed at two scales.
 * An empty slot keeps its place on the shelf, unlit. `rise`: the slot just changed (its bottle rises into the light).
 */
export function PairStage({ pair, tier = 'top', rise = null, className = '', sizes }: {
  pair: [Perfume | null, Perfume | null]; tier?: 'top' | 'heart' | 'base'; rise?: 0 | 1 | null; className?: string; sizes: string;
}) {
  const [A, B] = pair;
  // an empty slot takes the other bottle's measure, so choosing it later does not move the one already standing
  const other = (A ?? B)?.images[0] ?? '';
  const g = [standing(A?.images[0] ?? other, PAIR.h), standing(B?.images[0] ?? other, PAIR.h * PAIR.depth)];
  const gap = (g[0].visible + g[1].visible) / 2 - PAIR.overlap * Math.min(g[0].visible, g[1].visible);
  const shift = (g[1].visible - g[0].visible) / 4;
  const centers = [-gap / 2 - shift, gap / 2 - shift];
  const feet = [PAIR.shelf, PAIR.shelf - PAIR.lift];
  const r = (n: number) => n.toFixed(2);
  return (
    <div className={`${s.pair} ${className}`} data-tier={tier} style={{ '--shelf': `${PAIR.shelf}%` } as React.CSSProperties}>
      <span className={s.shelf} aria-hidden />
      {([0, 1] as const).map(k => {
        const p = pair[k], o = g[k], h = k ? PAIR.h * PAIR.depth : PAIR.h;
        return (
          <span key={`pool${k}`} className={s.pool} data-off={p ? undefined : ''} aria-hidden
            style={{ ...(p ? scentVars(p) : {}), '--x': r(centers[k]), '--y': r(feet[k] - h * 0.52), '--pw': r(o.visible * 2.1), '--ph': r(h * 1.45) } as React.CSSProperties} />
        );
      })}
      {/* B first: A, in front, is painted over it */}
      {([1, 0] as const).map(k => {
        const p = pair[k];
        if (!p) return null;
        const src = p.images[0], o = g[k], mask = lightMask(src);
        const vars = {
          '--x': r(centers[k] - o.off - o.w / 2), '--top': r(feet[k] - o.b.bottom * o.box), '--h': r(o.box), '--ar': o.ar,
          '--foot': o.b.bottom, '--ol': o.b.left, '--ow': o.b.right - o.b.left,
        } as React.CSSProperties;
        return (
          <span key={p.slug} className={`${s.pairObj} ${k ? s.behind : ''}`} style={vars} data-rise={rise === k ? '' : undefined} data-lit={mask ? '' : undefined}>
            <span className={`${s.refl} ${s.pairRefl}`} aria-hidden><Image src={src} alt="" fill sizes={sizes} className={s.img} /></span>
            <ViewTransition name={`obj-${p.slug}`} share="morph" default="none">
              <span className={s.pairFrame}>
                <span className={s.contact} aria-hidden />
                <Image src={src} alt="" fill sizes={sizes} className={s.img} />
              </span>
            </ViewTransition>
            {mask && <ObjectLight mask={mask} className={`${s.glint} ${s.pairGlint}`} mode="hover" />}
          </span>
        );
      })}
    </div>
  );
}
