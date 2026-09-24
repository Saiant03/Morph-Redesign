'use client';
import { useMemo, useRef, useState, useLayoutEffect } from 'react';
import { Flip, gsap, reducedMotion } from '@/components/shared/useMotion';
import { type Perfume, FAMILY_GROUPS, familyGroup, tone, type Offer, lei } from '@/lib/catalog';
import { Card } from './_ui';
import s from './cromatic.module.css';

type Sort = 'recomandate' | 'longevitate' | 'az';

export function CollectionGrid({ items, promo }: { items: Perfume[]; promo: Offer | null }) {
  const [fam, setFam] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>('recomandate');
  const grid = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);

  const groups = FAMILY_GROUPS.map(g => ({ ...g, list: items.filter(p => familyGroup(p)?.id === g.id) })).filter(g => g.list.length);
  const shown = useMemo(() => {
    let list = fam ? items.filter(p => familyGroup(p)?.id === fam) : [...items];
    if (sort === 'az') list.sort((a, b) => a.shortName.localeCompare(b.shortName));
    if (sort === 'longevitate') list.sort((a, b) => parseInt(b.longevity || '0') - parseInt(a.longevity || '0'));
    if (sort === 'recomandate') list.sort((a, b) => Number(b.inStock) - Number(a.inStock) || Number(b.bestseller) - Number(a.bestseller));
    return list;
  }, [items, fam, sort]);

  function change(fn: () => void) {
    if (grid.current && !reducedMotion()) flipState.current = Flip.getState(grid.current.querySelectorAll('[data-flip-id]'));
    fn();
  }
  useLayoutEffect(() => {
    if (!flipState.current) return;
    Flip.from(flipState.current, { duration: 0.6, ease: 'power3.inOut', absolute: true, stagger: 0.015,
      onEnter: els => gsap.fromTo(els, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.5 }),
      onLeave: els => gsap.to(els, { autoAlpha: 0, duration: 0.25 }) });
    flipState.current = null;
  }, [shown]);

  return (
    <>
      <div className={s.toolbar}>
        <div className={s.chips} role="group" aria-label="Familie olfactivă">
          <button type="button" className={s.chip} aria-pressed={fam === null} onClick={() => change(() => setFam(null))}>Toate <small>{items.length}</small></button>
          {groups.map(g => (
            <button key={g.id} type="button" className={s.chip} aria-pressed={fam === g.id} onClick={() => change(() => setFam(fam === g.id ? null : g.id))}>
              <i style={{ '--sw': tone(g.list[0]).identity } as React.CSSProperties} />{g.name} <small>{g.list.length}</small>
            </button>
          ))}
        </div>
        <label className={s.sortWrap}>Ordonează
          <select className={s.select} style={{ height: 38 }} value={sort} onChange={e => change(() => setSort(e.target.value as Sort))}>
            <option value="recomandate">Recomandate</option>
            <option value="longevitate">Longevitate</option>
            <option value="az">Nume A–Z</option>
          </select>
        </label>
      </div>
      <div ref={grid} className={s.grid} aria-live="polite">
        {shown.map((p, i) => (
          <FragmentWithPromo key={p.slug} index={i} promo={!fam && i === 5 ? promo : null}><Card p={p} priority={i < 3} /></FragmentWithPromo>
        ))}
      </div>
    </>
  );
}

function FragmentWithPromo({ children, promo, index }: { children: React.ReactNode; promo: Offer | null; index: number }) {
  return (
    <>
      {children}
      {promo && (
        <aside className={s.promo} data-flip-id="promo" data-index={index}>
          <div>
            <p style={{ marginBottom: 12 }}>Nu știi de unde să începi?</p>
            <h3 className={s.h3} style={{ color: 'inherit' }}>Setul de mostre {/luxury/.test(promo.slug) ? 'Luxury' : 'Les Exclusifs & Ice'}</h3>
          </div>
          <div>
            <div className={s.promoPrice}>{lei(promo.price)}</div>
            <p style={{ margin: '6px 0 18px' }}>Încearcă mostrele acasă, apoi alege sticla de 100 ml.</p>
            <a className={s.btn} href={promo.url}>Vezi setul</a>
          </div>
        </aside>
      )}
    </>
  );
}
