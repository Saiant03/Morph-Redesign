'use client';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Flip } from 'gsap/Flip';
import { gsap, reducedMotion, EASE } from '@/lib/motion';
import { type Perfume, type Offer, bySlug, COLLECTIONS, concentration, hours, lei, productHref, travelFor } from '@/lib/catalog';
import { scentTokens } from '@/lib/scent';
import { type Filters, apply, toQuery, activeCount } from '@/lib/filters';
import { FilterBar } from './FilterBar';
import { ProductIndexRow } from './ProductIndexRow';
import { ProductCard } from './ProductCard';
import { ProductVisual } from './ProductVisual';
import { NotePyramid } from './NotePyramid';
import { AddToCart } from './AddToCart';
import s from './ProductIndex.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(Flip);

/** Collection browsing: an editorial index with a live preview (B's pattern in A's color language), or a gallery. */
export function ProductIndex({ items, initial, trial }: { items: Perfume[]; initial: Filters; trial: Offer[] }) {
  const [f, setF] = useState(initial);
  const shown = useMemo(() => apply(items, f), [items, f]);
  const [active, setActive] = useState(shown.find(p => p.inStock)?.slug ?? items[0].slug);
  const list = useRef<HTMLDivElement>(null);
  const flip = useRef<Flip.FlipState | null>(null);

  function set(next: Partial<Filters>) {
    if (list.current && !reducedMotion()) flip.current = Flip.getState(list.current.querySelectorAll('[data-flip-id]'));
    setF(prev => ({ ...prev, ...next }));
  }

  useEffect(() => {
    const q = toQuery(f);
    window.history.replaceState(null, '', `${window.location.pathname}${q ? `?${q}` : ''}`);
  }, [f]);

  useLayoutEffect(() => {
    if (!flip.current) return;
    Flip.from(flip.current, {
      duration: 0.45, ease: EASE.inOut, absolute: true, nested: true, prune: true,
      onEnter: els => gsap.fromTo(els, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, delay: 0.15 }),
      onLeave: els => gsap.to(els, { autoAlpha: 0, duration: 0.18 }),
    });
    flip.current = null;
  }, [shown, f.view]);

  const multi = new Set(items.map(p => p.collection)).size > 1;
  const promoAt = activeCount(f) === 0 && shown.length > 6 ? 5 : -1;
  const a = bySlug(active);

  return (
    <>
      <FilterBar items={items} f={f} set={set} shown={shown.length} />
      <div ref={list} className={s.body}>
        {shown.length === 0 ? (
          <div className={s.empty}>
            <p className="t-3">Niciun parfum nu corespunde acestor filtre.</p>
            <p className="muted">Scoate un filtru sau încearcă o notă mai generală, de exemplu „vanilie” sau „lemn”. Poți porni și de la <Link className="link" href="/descopera/finder">Fragrance Finder</Link>.</p>
          </div>
        ) : f.view === 'index' ? (
          <div className={s.split}>
            <ol className={s.list}>
              {shown.map((p, i) => (
                <FragmentRow key={p.slug} promo={i === promoAt ? trial : null}>
                  <ProductIndexRow p={p} active={p.slug === active} onActivate={() => setActive(p.slug)} eager={i < 6} showCollection={multi} />
                </FragmentRow>
              ))}
            </ol>
            <Preview p={shown.some(x => x.slug === active) ? a : shown[0]} />
          </div>
        ) : (
          <div className={s.gallery}>{shown.map(p => <div key={p.slug} data-flip-id={p.slug}><ProductCard p={p} sizes="(max-width: 899px) 50vw, 30vw" /></div>)}</div>
        )}
      </div>
    </>
  );
}

function FragmentRow({ children, promo }: { children: React.ReactNode; promo: Offer[] | null }) {
  return (
    <>
      {children}
      {promo && promo.length > 0 && (
        <li className={s.promo} data-flip-id="promo">
          <p className="t-3">Nu știi de unde să începi?</p>
          <p className="t-small muted">Încearcă mostrele acasă, apoi alege sticla de 100 ml.</p>
          <p className={s.promoLinks}>
            {promo.map(o => <a key={o.slug} className="btn btn-sm btn-secondary" href={o.url}>Setul de mostre {/luxury/.test(o.slug) ? 'Luxury' : 'Les Exclusifs & Ice'}, {lei(o.price)}</a>)}
          </p>
        </li>
      )}
    </>
  );
}

/** Sticky preview: the field interpolates to the hovered scent's color; notes shown as strata. */
function Preview({ p }: { p: Perfume }) {
  const t = scentTokens(p);
  const travel = travelFor(p);
  return (
    <aside className={s.preview} aria-label={`Previzualizare ${p.shortName}`}>
      <Link href={productHref(p)} tabIndex={-1} aria-hidden><ProductVisual p={p} sizes="34vw" alt="" className={s.previewVisual} /></Link>
      <div className={s.previewHead}>
        <h2 className="t-2">{p.shortName}</h2>
        <p className="t-small muted">{COLLECTIONS[p.collection].name}, {concentration(p)}</p>
      </div>
      <NotePyramid p={p} />
      <dl className={s.facts}>
        <div><dt>Intensitate</dt><dd>{p.intensity ?? '—'}</dd></div>
        <div><dt>Longevitate</dt><dd className="num">{hours(p) ?? '—'}</dd></div>
        <div><dt>100 ml</dt><dd className="num">{lei(p.price)}</dd></div>
      </dl>
      <div className={s.previewActions}>
        <Link href={productHref(p)} className="btn btn-secondary">Vezi parfumul</Link>
        {p.inStock && <AddToCart items={[{ key: p.slug, name: p.shortName, format: '100 ml', price: p.price, color: t.scent }]}>Adaugă în coș</AddToCart>}
      </div>
      {travel && <p className="t-small muted">Există și travel 2×8 ml, {lei(travel.price)}.</p>}
    </aside>
  );
}
