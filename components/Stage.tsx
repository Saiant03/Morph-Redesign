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

type Pair = [Perfume | null, Perfume | null];
/** A slot's change on the pair stage: which slot, a counter (restarts the light's CSS animation), what stood there. */
export type PairChange = { slot: 0 | 1; n: number; from: Pair };

/** The pair's geometry in stage heights: each bottle's measured box, its centre on the shelf and its foot. */
function pairLayout([A, B]: Pair) {
  // an empty slot takes the other bottle's measure, so choosing it later does not move the one already standing
  const other = (A ?? B)?.images[0] ?? '';
  const g = [standing(A?.images[0] ?? other, PAIR.h), standing(B?.images[0] ?? other, PAIR.h * PAIR.depth)];
  const gap = (g[0].visible + g[1].visible) / 2 - PAIR.overlap * Math.min(g[0].visible, g[1].visible);
  const shift = (g[1].visible - g[0].visible) / 4;
  return { g, centers: [-gap / 2 - shift, gap / 2 - shift], feet: [PAIR.shelf, PAIR.shelf - PAIR.lift] };
}

/**
 * Layering (docs/design/phase-c3-5-layering-ynf.md): two fragrances on one glass shelf, each in its own key light.
 * A stands in front, B a step behind (smaller, its foot a little higher on the glass) and the glass overlaps by a
 * fifth of the narrower bottle. The two pools of light overlap between them (screen): light adds, nothing is mixed.
 * Both bottles are set to the same measured object height, because Morph's packshots are framed at two scales.
 * An empty slot keeps its place on the shelf, unlit.
 * `change` (phase-c3-5-1-motion-polish.md): the slot's light dips, the bottle that stood there sinks out of it, the
 * new one rises from under the glass into its place and the light comes back up with it; the other bottle glides to
 * its new place. `leaving`: the bottle going out, rendered only while it leaves.
 */
export function PairStage({ pair, tier = 'top', change = null, leaving = false, className = '', sizes }: {
  pair: Pair; tier?: 'top' | 'heart' | 'base'; change?: PairChange | null; leaving?: boolean; className?: string; sizes: string;
}) {
  const { g, centers, feet } = pairLayout(pair);
  const prev = change ? pairLayout(change.from) : null;
  const beat = change ? (change.n % 2 ? 'a' : 'b') : undefined;
  const r = (n: number) => n.toFixed(2);
  const place = (k: 0 | 1, o: ReturnType<typeof standing>, x: number) => ({
    '--x': r(x - o.off - o.w / 2), '--top': r(feet[k] - o.b.bottom * o.box), '--h': r(o.box), '--ar': o.ar,
    '--foot': o.b.bottom, '--ol': o.b.left, '--ow': o.b.right - o.b.left,
  });
  const out = change && leaving ? change.from[change.slot] : null;
  return (
    <div className={`${s.pair} ${className}`} data-tier={tier} style={{ '--shelf': `${PAIR.shelf}%` } as React.CSSProperties}>
      <span className={s.shelf} aria-hidden />
      {([0, 1] as const).map(k => {
        const p = pair[k], o = g[k], h = k ? PAIR.h * PAIR.depth : PAIR.h;
        // the changed slot's light dips and comes back; the other slot's light glides with its bottle
        const dx = prev && change!.slot !== k ? prev.centers[k] - centers[k] : 0;
        return (
          <span key={`pool${k}`} className={s.pool} data-off={p ? undefined : ''} aria-hidden
            data-dip={change?.slot === k ? beat : undefined} data-glide={Math.abs(dx) > 0.05 ? beat : undefined}
            style={{ ...(p ? scentVars(p) : {}), '--dx': r(dx), '--x': r(centers[k]), '--y': r(feet[k] - h * 0.52), '--pw': r(o.visible * 2.1), '--ph': r(h * 1.45) } as React.CSSProperties} />
        );
      })}
      {/* B first: A, in front, is painted over it; the bottle leaving its slot is painted under the one arriving */}
      {([1, 0] as const).map(k => {
        const p = pair[k];
        const going = out && change!.slot === k && out.slug !== p?.slug ? out : null;
        const dx = prev && change!.slot !== k ? prev.centers[k] - centers[k] : 0;
        return [
          going && (() => {
            const o = prev!.g[k], src = going.images[0];
            return (
              <span key={`out-${going.slug}`} className={`${s.pairObj} ${k ? s.behind : ''}`} style={place(k, o, prev!.centers[k]) as React.CSSProperties} data-leave="" aria-hidden>
                <span className={`${s.refl} ${s.pairRefl}`}><Image src={src} alt="" fill sizes={sizes} className={s.img} /></span>
                <span className={s.pairFrame}><span className={s.contact} /><Image src={src} alt="" fill sizes={sizes} className={s.img} /></span>
              </span>
            );
          })(),
          p && (() => {
            const src = p.images[0], o = g[k], mask = lightMask(src);
            const vars = { ...place(k, o, centers[k]), '--dx': r(dx) } as React.CSSProperties;
            return (
              <span key={p.slug} className={`${s.pairObj} ${k ? s.behind : ''}`} style={vars} data-lit={mask ? '' : undefined}
                data-rise={change?.slot === k && change.from[k]?.slug !== p.slug ? '' : undefined} data-glide={Math.abs(dx) > 0.05 ? beat : undefined}>
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
          })(),
        ];
      })}
    </div>
  );
}
