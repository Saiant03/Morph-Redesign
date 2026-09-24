import Image from 'next/image';
import { type Perfume } from '@/lib/catalog';
import { scentVars } from '@/lib/scent';
import s from './Product.module.css';

type Props = { p: Perfume; image?: number; sizes: string; priority?: boolean; className?: string; alt?: string };

/**
 * A fragrance in its niche. The light is tinted, faintly, by the scent (--glow) and interpolates when the
 * fragrance in the niche changes. The bottle is the object; the color is only the light around it.
 */
export function ProductVisual({ p, image = 0, sizes, priority, className = '', alt }: Props) {
  return (
    <div className={`${s.visual} ${className}`} style={scentVars(p)}>
      <Image src={p.images[image] ?? p.images[0]} alt={alt ?? p.name} fill sizes={sizes} priority={priority} className={s.bottle} />
    </div>
  );
}

/** Any Morph object (travel box, sample set, blind set) in the same niche, in neutral light. */
export function Niche({ src, alt, sizes, className = '', priority }: { src: string | null; alt: string; sizes: string; className?: string; priority?: boolean }) {
  return (
    <div className={`${s.visual} ${className}`}>
      {src && <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={s.bottle} />}
    </div>
  );
}
