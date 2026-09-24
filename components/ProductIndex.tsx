'use client';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Flip } from 'gsap/Flip';
import { gsap, reducedMotion, EASE } from '@/lib/motion';
import { type Perfume, type Offer, type CollectionId, bySlug, COLLECTIONS, concentration, hours, lei, productHref, travelFor, fullItem, sampleName } from '@/lib/catalog';
import { type Filters, DEFAULT_FILTERS, apply, toQuery, activeCount, parseFilters } from '@/lib/filters';
import { FilterBar } from './FilterBar';
import { ProductIndexRow } from './ProductIndexRow';
import { Vitrine } from './Vitrine';
import { ProductVisual } from './ProductVisual';
import { NotePyramid } from './NotePyramid';
import { AddToCart } from './AddToCart';
import s from './ProductIndex.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(Flip);

/**
 * Collection browsing: the cabinet of objects (default, grouped by collection on /parfumuri), or an editorial
 * index with a live preview in a niche.
 * The filters live in the URL but are read on the client, so the collection pages stay static (prefetched whole,
 * no server render between the click and the room change).
 */
export function ProductIndex({ id, items, trial }: { id: CollectionId | null; items: Perfume[]; trial: Offer[] }) {
  const [f, setF] = useState<Filters>(DEFAULT_FILTERS);
  const shown = useMemo(() => apply(items, f), [items, f]);
  const [active, setActive] = useState(shown.find(p => p.inStock)?.slug ?? items[0].slug);
  const list = useRef<HTMLDivElement>(null);
  const flip = useRef<Flip.FlipState | null>(null);

  function set(next: Partial<Filters>) {
    if (list.current && !reducedMotion()) flip.current = Flip.getState(list.current.querySelectorAll('[data-flip-id]'));
    setF(prev => ({ ...prev, ...next }));
  }

  useLayoutEffect(() => {
    const url = parseFilters(Object.fromEntries(new URLSearchParams(window.location.search)));
    if (toQuery(url)) setF(url);
  }, []);

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
  const promo = activeCount(f) === 0 && shown.length > 6;
  const promoAt = promo ? 5 : -1;
  const a = bySlug(active);

  const cabinet = shown.length > 0 && f.view === 'vitrina';
  // the bar keeps one place in the tree (switching views never remounts it) and is sticky within its wrap:
  // over the index it follows the list; over the cabinet it stays in the stone room
  return (
    <div ref={list}>
      <div className="wrap">
        <FilterBar items={items} f={f} set={set} shown={shown.length} />
        {!cabinet && (
          <div className={s.body}>
            {shown.length === 0 ? (
              <div className={s.empty}>
                <p className="t-3">Niciun parfum nu corespunde acestor filtre.</p>
                <p className="muted">Scoate un filtru sau încearcă o notă mai generală, de exemplu „vanilie” sau „lemn”. Poți porni și de la <Link className="link" href="/descopera/finder">Fragrance Finder</Link>.</p>
              </div>
            ) : (
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
            )}
          </div>
        )}
      </div>
      {cabinet && <Vitrine shown={shown} grouped={multi} only={id} trial={promo ? trial : null} />}
    </div>
  );
}

function FragmentRow({ children, promo }: { children: React.ReactNode; promo: Offer[] | null }) {
  return (
    <>
      {children}
      {promo && promo.length > 0 && (
        <li className={s.promo} data-flip-id="promo">
          <p className="t-2">Nu știi de unde să începi?</p>
          <p className="t-small muted">Încearcă mostrele acasă, apoi alege sticla de 100 ml.</p>
          <p className={s.promoLinks}>
            {promo.map(o => <a key={o.slug} className="btn btn-sm btn-secondary" href={o.url}>{sampleName(o.slug)}, {lei(o.price)}</a>)}
              <Link className="btn btn-sm btn-secondary" href="/descopera/finder">Fragrance Finder</Link>
          </p>
        </li>
      )}
    </>
  );
}

/** Sticky preview: the hovered fragrance comes into the niche; its notes as a formula. */
function Preview({ p }: { p: Perfume }) {
  const travel = travelFor(p);
  return (
    <aside className={s.preview} aria-label={`Previzualizare ${p.shortName}`}>
      <Link href={productHref(p)} tabIndex={-1} aria-hidden><ProductVisual p={p} sizes="34vw" alt="" className={s.previewVisual} /></Link>
      <div className={s.previewHead}>
        <p className="label muted">{COLLECTIONS[p.collection].name} · {concentration(p)}</p>
        <h2 className={s.previewName}>{p.shortName}</h2>
      </div>
      <NotePyramid p={p} />
      <dl className={s.facts}>
        <div><dt className="label muted">Intensitate</dt><dd>{p.intensity ?? '—'}</dd></div>
        <div><dt className="label muted">Pe piele</dt><dd className="num">{hours(p) ?? '—'}</dd></div>
        <div><dt className="label muted">100 ml</dt><dd className="num">{lei(p.price)}</dd></div>
      </dl>
      <div className={s.previewActions}>
        <Link href={productHref(p)} className="btn btn-secondary">Vezi parfumul</Link>
        {p.inStock && <AddToCart items={[fullItem(p)]}>Adaugă în coș</AddToCart>}
      </div>
      {travel && <p className="t-small muted">Există și travel 2×8 ml, {lei(travel.price)}.</p>}
    </aside>
  );
}
