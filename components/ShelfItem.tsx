'use client';
import Link from 'next/link';
import { ViewTransition } from 'react';
import { type Perfume, productHref } from '@/lib/catalog';
import { pick, usePicked, indexHolds } from '@/lib/pick';
import { ProductVisual } from './ProductVisual';

/**
 * One bottle on the collection shelf. The item is `shelf-<slug>` (between collections it moves along the shelf,
 * leaves or arrives); the bottle inside it is `obj-<slug>`, so into its product page it becomes the stage. In a
 * room change (type 'room') the bottle takes the shelf's classes, so item and bottle move as one.
 * `children`: the item's label (it then names the link); without it the link is named by the fragrance alone.
 */
export function ShelfItem({ p, className, nicheClassName, sizes = '120px', children }: { p: Perfume; className: string; nicheClassName: string; sizes?: string; children?: React.ReactNode }) {
  const toProduct = !indexHolds(usePicked(), p.slug);
  return (
    <ViewTransition name={`shelf-${p.slug}`} share="shelf" enter="shelf-in" exit="shelf-out" default="none">
      <Link href={productHref(p)} className={className} aria-label={children ? undefined : p.shortName} onClick={() => pick(p.slug, 'shelf')}>
        <ViewTransition name={toProduct ? `obj-${p.slug}` : undefined} share={{ room: 'shelf', default: 'morph' }} enter={{ room: 'shelf-in', default: 'none' }} exit={{ room: 'shelf-out', default: 'none' }} default="none">
          <ProductVisual p={p} sizes={sizes} alt="" className={nicheClassName} />
        </ViewTransition>
        {children ?? <span className="t-micro" aria-hidden>{p.shortName}</span>}
      </Link>
    </ViewTransition>
  );
}
