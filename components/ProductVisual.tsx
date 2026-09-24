import Image from 'next/image';
import { ViewTransition } from 'react';
import { type Perfume } from '@/lib/catalog';
import { scentVars } from '@/lib/scent';
import s from './Product.module.css';

type Props = { p: Perfume; image?: number; sizes: string; priority?: boolean; className?: string; alt?: string; vt?: boolean };

/**
 * A fragrance in its niche. The light is tinted, faintly, by the scent (--glow) and interpolates when the
 * fragrance in the niche changes. The bottle is the object; the color is only the light around it.
 */
export function ProductVisual({ p, image = 0, sizes, priority, className = '', alt, vt }: Props) {
  const visual = (
    <div className={`${s.visual} ${className}`} style={scentVars(p)}>
      <Image src={p.images[image] ?? p.images[0]} alt={alt ?? p.name} fill sizes={sizes} priority={priority} className={s.bottle} />
    </div>
  );
  // PAGE → STATE, shared object (T2): the same bottle keeps its identity between a list and its product page.
  // Only one `vt` visual per slug may be on a page at a time; the name must be unique.
  return vt ? <ViewTransition name={`obj-${p.slug}`} share="morph" default="none">{visual}</ViewTransition> : visual;
}

/** Any Morph object (travel box, sample set, blind set) in the same niche, in neutral light. */
export function Niche({ src, alt, sizes, className = '', priority }: { src: string | null; alt: string; sizes: string; className?: string; priority?: boolean }) {
  return (
    <div className={`${s.visual} ${className}`}>
      {src && <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={s.bottle} />}
    </div>
  );
}
