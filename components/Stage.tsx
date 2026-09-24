import Image from 'next/image';
import { ViewTransition } from 'react';
import { type Perfume, objectBox } from '@/lib/catalog';
import { scentVars } from '@/lib/scent';
import s from './Stage.module.css';

type Props = { p: Perfume; image?: number; sizes: string; priority?: boolean; className?: string; alt?: string; vt?: boolean };

/**
 * A fragrance at monument scale: standing on a glass shelf in the room's key light, with its reflection.
 * The foot of the bottle sits exactly on the shelf line because the packshot's object box is measured
 * (scripts/objects.mjs). The scent's --glow tints the light by 14%, as in the niche; nothing else is coloured.
 */
export function Stage({ p, image = 0, sizes, priority, className = '', alt, vt }: Props) {
  const src = p.images[image] ?? p.images[0];
  const box = objectBox(src);
  const vars = {
    ...scentVars(p),
    '--ar': box ? `${box.w} / ${box.h}` : '4 / 5',
    '--foot': box?.bottom ?? 0.88,
    '--ol': box?.left ?? 0.28,
    '--ow': box ? box.right - box.left : 0.44,
  } as React.CSSProperties;
  const stage = (
    <div className={`${s.stage} ${className}`} style={vars}>
      <span className={s.shelf} aria-hidden />
      <span className={s.refl} aria-hidden><Image src={src} alt="" fill sizes={sizes} className={s.img} /></span>
      <span className={s.obj}>
        <span className={s.contact} aria-hidden />
        <Image src={src} alt={alt ?? p.name} fill sizes={sizes} priority={priority} className={s.img} />
      </span>
    </div>
  );
  return vt ? <ViewTransition name={`obj-${p.slug}`} share="morph" default="none">{stage}</ViewTransition> : stage;
}
