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
 */
export function ShelfItem({ p, className, nicheClassName }: { p: Perfume; className: string; nicheClassName: string }) {
  const toProduct = !indexHolds(usePicked(), p.slug);
  return (
    <ViewTransition name={`shelf-${p.slug}`} share="shelf" enter="shelf-in" exit="shelf-out" default="none">
      <Link href={productHref(p)} className={className} aria-label={p.shortName} onClick={() => pick(p.slug, 'shelf')}>
        <ViewTransition name={toProduct ? `obj-${p.slug}` : undefined} share={{ room: 'shelf', default: 'morph' }} enter={{ room: 'shelf-in', default: 'none' }} exit={{ room: 'shelf-out', default: 'none' }} default="none">
          <ProductVisual p={p} sizes="120px" alt="" className={nicheClassName} />
        </ViewTransition>
        <span className="t-micro" aria-hidden>{p.shortName}</span>
      </Link>
    </ViewTransition>
  );
}
