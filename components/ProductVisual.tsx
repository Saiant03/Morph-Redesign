import Image from 'next/image';
import { type Perfume } from '@/lib/catalog';
import { scentVars } from '@/lib/scent';
import s from './Product.module.css';

type Props = { p: Perfume; image?: number; sizes: string; priority?: boolean; className?: string; alt?: string };

/**
 * The bottle on its own color. The packshots are on white, so they sit on the scent field with `multiply`.
 * The field color comes from data (lib/scent.ts) and interpolates when the scope's --scent-field changes.
 */
export function ProductVisual({ p, image = 0, sizes, priority, className = '', alt }: Props) {
  return (
    <div className={`${s.visual} ${className}`} style={scentVars(p)}>
      <Image src={p.images[image] ?? p.images[0]} alt={alt ?? p.name} fill sizes={sizes} priority={priority} className={s.bottle} />
    </div>
  );
}
