'use client';
import Link from 'next/link';
import { useId, useRef, useState } from 'react';
import { gsap, reducedMotion, EASE } from '@/lib/motion';
import { type Perfume, COLLECTIONS, concentration, familyGroup, hours, lei, productHref, fullItem, travelFor } from '@/lib/catalog';
import { ProductVisual } from './ProductVisual';
import { NotePyramid } from './NotePyramid';
import { AddToCart } from './AddToCart';
import s from './FeaturedFocus.module.css';

/**
 * "Cele mai alese": one object at a time. The names are the index; choosing one brings its bottle into the
 * niche (PRODUCT → FOCUS: the old object sinks and fades, the new one rises as the light re-tints).
 * Price and purchase stay beside the object.
 */
export function FeaturedFocus({ items }: { items: Perfume[] }) {
  const [i, setI] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const target = useRef(0);
  const panel = useId();
  const p = items[i];
  const fam = familyGroup(p);
  const travel = travelFor(p);

  function pick(k: number) {
    if (k === target.current) return;
    target.current = k;
    const el = stage.current;
    if (!el || reducedMotion()) return setI(k);
    const parts = el.querySelectorAll('[data-swap], img');
    gsap.killTweensOf(parts);
    gsap.to(parts, { autoAlpha: 0, y: 12, duration: 0.2, ease: 'power2.in', stagger: 0.02, onComplete: () => {
      setI(target.current);
      requestAnimationFrame(() => gsap.fromTo(el.querySelectorAll('[data-swap], img'), { autoAlpha: 0, y: -14 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: EASE.out, stagger: 0.05 }));
    } });
  }

  return (
    <div className={s.focus}>
      <ol className={s.index} aria-label="Cele mai alese">
        {items.map((x, k) => (
          <li key={x.slug}>
            <button type="button" className={s.name} aria-pressed={k === i} aria-controls={panel} onClick={() => pick(k)}>
              <span className="label muted num" aria-hidden>{String(k + 1).padStart(2, '0')}</span>
              <span className={s.nameText}>{x.shortName}</span>
              <span className="t-small muted">{COLLECTIONS[x.collection].name}</span>
            </button>
          </li>
        ))}
      </ol>

      <div ref={stage} id={panel} className={s.stage} role="region" aria-label="Parfumul din vitrină" aria-live="polite">
        <Link href={productHref(p)} className={s.visualLink} tabIndex={-1} aria-hidden>
          <ProductVisual p={p} sizes="(max-width: 899px) 100vw, 40vw" alt="" className={s.visual} />
        </Link>
        <div className={s.info}>
          <div data-swap>
            <p className="label muted">{COLLECTIONS[p.collection].name} · {concentration(p)}</p>
            <h3 className={s.title}><Link href={productHref(p)}>{p.shortName}</Link></h3>
          </div>
          <div data-swap><NotePyramid p={p} /></div>
          <dl className={s.facts} data-swap>
            <div><dt className="label muted">Familie</dt><dd>{fam?.name ?? '—'}</dd></div>
            <div><dt className="label muted">Intensitate</dt><dd>{p.intensity ?? 'Nespecificată'}</dd></div>
            <div><dt className="label muted">Pe piele</dt><dd className="num">{hours(p) ?? '—'}</dd></div>
          </dl>
          <div className={s.buy} data-swap>
            <AddToCart items={[fullItem(p)]} className={`btn ${s.cta}`}>Adaugă 100 ml <span className="num">{lei(p.price)}</span></AddToCart>
            <p className="t-small muted">{travel ? <>Sau încearcă-l în travel 2×8 ml, <span className="num">{lei(travel.price)}</span>. </> : null}<Link className="link" href={productHref(p)}>Pagina parfumului</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
