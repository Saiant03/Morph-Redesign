import Image from 'next/image';
import { ViewTransition } from 'react';
import { TAGGED } from '@/lib/finder';
import { scentVars } from '@/lib/scent';
import s from './FinderHorizon.module.css';

/**
 * The 23 perfumes Morph tagged in its Fragrance Finder, standing in one continuous lit recess (plan §12, "the shelf
 * as a horizon"). `levels` (0–1 per slug, the share of the best current score) sets how much light each keeps:
 * the ones that match the answers so far stay lit, the others dim and lower (FINDER → NARROW). Without levels all
 * are lit. `landing`: the result's object, which alone keeps its light and carries obj-<slug> into the result stage.
 * Decorative: the same information is in text next to it.
 */
export function FinderHorizon({ levels, landing, className = '' }: { levels?: Record<string, number>; landing?: string | null; className?: string }) {
  return (
    <ul className={`${s.horizon} ${className}`} aria-hidden data-landing={landing ? '' : undefined}>
      {TAGGED.map(({ p }) => {
        const w = landing ? (p.slug === landing ? 1 : 0) : levels ? (levels[p.slug] ?? 0) : 1;
        const niche = <span className={s.niche}><Image src={p.images[0]} alt="" fill sizes="(max-width: 599px) 24px, 96px" /></span>;
        return (
          <li key={p.slug} style={{ ...scentVars(p), '--w': w } as React.CSSProperties} data-off={w === 0 ? '' : undefined}>
            {landing === p.slug ? <ViewTransition name={`obj-${p.slug}`} share="morph" default="none">{niche}</ViewTransition> : niche}
          </li>
        );
      })}
    </ul>
  );
}
