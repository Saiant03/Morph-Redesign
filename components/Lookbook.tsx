'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { type Perfume, COLLECTIONS, concentration, familyGroup, hours, lei, productHref, fullItem, travelFor, firstSentences } from '@/lib/catalog';
import { Stage } from './Stage';
import { NotePyramid } from './NotePyramid';
import { AddToCart } from './AddToCart';
import s from './Lookbook.module.css';

/**
 * "Cele mai alese" as a lookbook: one bottle per spread at monument scale, its name overlapping the stage,
 * Morph's own line and the three tiers beside it. Native horizontal scroll with snap (swipe, trackpad, keys),
 * plus previous/next buttons and a live count; no autoplay. PRODUCT → REVEAL: the spread that leaves lowers out
 * of its light, the one that arrives rises into it (CSS, off under reduced motion).
 */
export function Lookbook({ items }: { items: Perfume[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = track.current;
    if (!t) return;
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setI(+(e.target as HTMLElement).dataset.i!)), { root: t, threshold: 0.6 });
    t.querySelectorAll('[data-i]').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (k: number) => {
    const t = track.current;
    const el = t?.querySelector<HTMLElement>(`[data-i="${Math.max(0, Math.min(items.length - 1, k))}"]`);
    if (t && el) t.scrollTo({ left: el.offsetLeft - t.offsetLeft, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  return (
    <div className={s.book}>
      <div className={`wrap ${s.bar}`}>
        <p className="label muted">Bestsellerurile Morph, din toate cele trei colecții</p>
        <div className={s.controls}>
          <span className="t-small num" aria-live="polite">{i + 1} / {items.length}</span>
          <button type="button" onClick={() => go(i - 1)} disabled={i === 0} aria-label="Parfumul anterior">←</button>
          <button type="button" onClick={() => go(i + 1)} disabled={i === items.length - 1} aria-label="Parfumul următor">→</button>
        </div>
      </div>
      <div ref={track} className={s.track} tabIndex={0} role="region" aria-label="Cele mai alese, derulează orizontal">
        {items.map((p, k) => {
          const fam = familyGroup(p);
          const travel = travelFor(p);
          return (
            <article key={p.slug} data-i={k} className={s.spread} data-active={k === i} aria-roledescription="parfum" aria-label={`${k + 1} din ${items.length}: ${p.shortName}`}>
              <Link href={productHref(p)} className={s.stageLink} tabIndex={-1} aria-hidden>
                <Stage p={p} sizes="(max-width: 899px) 100vw, 46vw" vt alt="" className={s.stage} />
              </Link>
              <h3 className={s.name}><Link href={productHref(p)}>{p.shortName}</Link></h3>
              <div className={s.info}>
                <p className="label muted">{COLLECTIONS[p.collection].name} · {concentration(p)}</p>
                <p className={s.line}>{firstSentences(p.summary, 1)}</p>
                <div className={s.formula}><NotePyramid p={p} /></div>
                <dl className={s.facts}>
                  <div><dt className="label muted">Familie</dt><dd>{fam?.name ?? '—'}</dd></div>
                  <div><dt className="label muted">Intensitate</dt><dd>{p.intensity ?? '—'}</dd></div>
                  <div><dt className="label muted">Pe piele</dt><dd className="num">{hours(p) ?? '—'}</dd></div>
                </dl>
                <div className={s.buy}>
                  <AddToCart items={[fullItem(p)]} className={`btn ${s.cta}`} aria-label={`Adaugă ${p.shortName} 100 ml în coș`}>Adaugă 100 ml <span className="num">{lei(p.price)}</span></AddToCart>
                  <p className="t-small muted">{travel ? <>Sau travel 2×8 ml, <span className="num">{lei(travel.price)}</span>. </> : null}<Link className="link" href={productHref(p)}>Descoperă {p.shortName}</Link></p>
                </div>
              </div>
              {p.images[1] && <div className={`niche-sm ${s.second}`} aria-hidden><Image src={p.images[1]} alt="" fill sizes="160px" /></div>}
            </article>
          );
        })}
      </div>
    </div>
  );
}
