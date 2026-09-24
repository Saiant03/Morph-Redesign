'use client';
import { useRef, useState } from 'react';
import { type Perfume } from '@/lib/catalog';
import { ProductVisual } from './ProductVisual';
import s from './ProductGallery.module.css';

/** One native scroll-snap track for all sizes: swipe on touch, thumbnails on desktop. */
export function ProductGallery({ p }: { p: Perfume }) {
  const [i, setI] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const go = (k: number) => { const t = track.current; if (t) t.scrollTo({ left: k * t.clientWidth, behavior: 'smooth' }); };
  return (
    <div className={s.gallery}>
      <div ref={track} className={s.track} onScroll={e => setI(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))} tabIndex={0} aria-label={`Imagini ${p.shortName}`}>
        {p.images.map((_, k) => (
          <ProductVisual key={k} p={p} image={k} priority={k === 0} vt={k === 0} sizes="(max-width: 899px) 100vw, 56vw" className={s.slide}
            alt={k === 0 ? p.name : `${p.shortName}, ambalaj, imaginea ${k + 1}`} />
        ))}
      </div>
      {p.images.length > 1 && (
        <div className={s.thumbs} role="group" aria-label="Alege imaginea">
          {p.images.map((_, k) => (
            <button key={k} type="button" aria-pressed={k === i} onClick={() => go(k)} aria-label={`Imaginea ${k + 1} din ${p.images.length}`}>
              <ProductVisual p={p} image={k} sizes="72px" alt="" className={s.thumb} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
