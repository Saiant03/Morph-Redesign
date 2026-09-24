import Image from 'next/image';
import { ViewTransition } from 'react';
import { type Perfume, lightMask, objectBox } from '@/lib/catalog';
import { ObjectLight } from './ObjectLight';
import { scentVars } from '@/lib/scent';
import s from './Product.module.css';

// `vt`: true names the bottle obj-<slug>; 'idle' keeps the boundary (so the image never remounts) without the name.
type Props = { p: Perfume; image?: number; sizes: string; priority?: boolean; className?: string; alt?: string; vt?: boolean | 'idle' };

/**
 * A fragrance in its niche. The light is tinted, faintly, by the scent (--glow) and interpolates when the
 * fragrance in the niche changes. The bottle is the object; the color is only the light around it.
 */
export function ProductVisual({ p, image = 0, sizes, priority, className = '', alt, vt }: Props) {
  const src = p.images[image] ?? p.images[0];
  const mask = lightMask(src);
  const box = mask ? objectBox(src) : null;
  const light = box ? { '--ol': box.left, '--ow': box.right - box.left } : {};
  const visual = (
    <div className={`${s.visual} ${className}`} style={{ ...scentVars(p), ...light } as React.CSSProperties} data-lit={mask ? '' : undefined}>
      <Image src={src} alt={alt ?? p.name} fill sizes={sizes} priority={priority} className={s.bottle} />
      {mask && <ObjectLight mask={mask} className={s.glint} mode="hover" />}
    </div>
  );
  // PAGE → STATE, shared object (T2): the same bottle keeps its identity between a list and its product page.
  // Only one `vt` visual per slug may be on a page at a time; the name must be unique.
  return vt ? <ViewTransition name={vt === true ? `obj-${p.slug}` : undefined} share="morph" default="none">{visual}</ViewTransition> : visual;
}

/** Any Morph object (travel box, sample set, blind set) in the same niche, in neutral light. */
export function Niche({ src, alt, sizes, className = '', priority }: { src: string | null; alt: string; sizes: string; className?: string; priority?: boolean }) {
  return (
    <div className={`${s.visual} ${className}`}>
      {src && <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={s.bottle} />}
    </div>
  );
}
