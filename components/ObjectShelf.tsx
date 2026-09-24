import Link from 'next/link';
import Image from 'next/image';
import { ViewTransition } from 'react';
import { type Perfume, objectBox, lightMask } from '@/lib/catalog';
import { ObjectLight } from './ObjectLight';
import { scentVars } from '@/lib/scent';
import s from './ObjectShelf.module.css';

export type ShelfObject = {
  key: string;
  src: string;
  /** what the object is (serif), e.g. "Gel de duș"; the line under it carries format and price */
  kind: string;
  line: string;
  /** read before the kind by screen readers, so eight "Gel de duș" links stay distinct */
  of?: string;
  href?: string;
  /** obj-<vt> into the object's own page */
  vt?: string;
  soldOut?: boolean;
};

/**
 * Several objects of one scent standing together on one glass shelf, in one pool of light (docs/design/
 * phase-c2-bath-body-ritual.md): perfume, shower gel and body cream; or the bottle and its travel box. Every object
 * keeps Morph's own packshot framing; its foot is set on the shelf line from the measured box (data/objects.json),
 * and the white margins beside it are trimmed, so a squat jar and a tall bottle share one line at their own heights.
 * Glass objects with a silhouette mask take the 2.5D light (ObjectLight), others stand in the light as they are.
 * `current`: the object whose page this is (no link, no transition name).
 */
export function ObjectShelf({ p, items, size = 'room', sizes, label, current }: { p: Perfume; items: ShelfObject[]; size?: 'monument' | 'room' | 'chapter'; sizes: string; label: string; current?: string }) {
  return (
    <ul className={`${s.shelf} ${s[size]}`} style={{ ...scentVars(p), '--k': items.length, '--fmax': Math.max(...items.map(o => objectBox(o.src)?.bottom ?? 0.88)) } as React.CSSProperties} aria-label={label}>
      {items.map(o => {
        const box = objectBox(o.src);
        const mask = lightMask(o.src);
        const ar = box ? box.w / box.h : 0.8;
        const vars = {
          '--ar': ar, '--foot': box?.bottom ?? 0.88,
          '--ol': box?.left ?? 0.2, '--ow': box ? box.right - box.left : 0.6,
        } as React.CSSProperties;
        const frame = (
          <span className={s.frame}>
            <span className={s.contact} aria-hidden />
            <Image src={o.src} alt="" fill sizes={sizes} className={s.img} />
          </span>
        );
        const body = (
          <>
            <span className={s.cell} data-lit={mask ? '' : undefined}>
              {o.vt && o.key !== current ? <ViewTransition name={`obj-${o.vt}`} share="morph" default="none">{frame}</ViewTransition> : frame}
              {mask && <ObjectLight mask={mask} className={s.glint} mode="hover" />}
            </span>
            <span className={s.label}>
              <span className={s.kind}>{o.of && <span className="sr-only">{o.of}, </span>}{o.kind}</span>
              <span className={`${s.line} num`}>{o.line}{o.soldOut ? <span className="muted"> · stoc epuizat</span> : null}</span>
            </span>
          </>
        );
        return (
          <li key={o.key} className={o.soldOut ? s.soldout : undefined} style={vars}>
            {o.href && o.key !== current
              ? <Link href={o.href} className={s.item}>{body}</Link>
              : <span className={s.item} aria-current={o.key === current ? 'page' : undefined}>{body}</span>}
          </li>
        );
      })}
    </ul>
  );
}
