'use client';
import Link from 'next/link';
import { type Perfume, type CollectionId, type Offer, ALL_BY_COLLECTION, COLLECTIONS, collectionHref, descriptor, lei, sampleName } from '@/lib/catalog';
import { ShelfItem } from './ShelfItem';
import s from './Vitrine.module.css';

const SIZES = '(max-width: 599px) 50vw, (max-width: 899px) 34vw, (max-width: 1199px) 25vw, 20vw';

/**
 * The index as a walnut cabinet (docs/design/phase-c1-product-index.md): every bottle in its own pool of light
 * on a continuous glass shelf, one shelf per collection. Rows are balanced in CSS (--n), so every shelf is full.
 * Each bottle is a ShelfItem: it keeps shelf-<slug> for room changes and obj-<slug> into its product page.
 */
export function Vitrine({ shown, grouped, only, trial }: { shown: Perfume[]; grouped: boolean; only: CollectionId | null; trial: Offer[] | null }) {
  const groups = grouped
    ? ALL_BY_COLLECTION.map(c => ({ c, list: shown.filter(p => p.collection === c) })).filter(g => g.list.length)
    : [{ c: only, list: shown }];
  return (
    <div className={s.band} data-tone="wood">
      <div className="wrap">
        {groups.map(({ c, list }) => (
          <section key={c ?? 'toate'} className={s.group} aria-labelledby={grouped && c ? `vitrina-${c}` : undefined}>
            {grouped && c && (
              <header className={s.head}>
                <h2 id={`vitrina-${c}`} className={s.title}>{COLLECTIONS[c].name}</h2>
                <p className={`${s.meta} t-small`}>
                  <span className="muted">{COLLECTIONS[c].type} · <span className="num">{list.length}</span> {list.length === 1 ? 'parfum' : 'parfumuri'}</span>
                  <Link href={collectionHref(c)} className="link" transitionTypes={['room']}>Intră în {COLLECTIONS[c].name}</Link>
                </p>
              </header>
            )}
            <ul className={s.shelf} style={{ '--n': list.length } as React.CSSProperties} aria-label={`Vitrina ${c ? COLLECTIONS[c].name : 'Morph'}`}>
              {list.map(p => (
                <li key={p.slug} data-flip-id={p.slug} className={p.inStock ? undefined : s.soldout}>
                  <ShelfItem p={p} className={s.item} nicheClassName={s.niche} sizes={SIZES}>
                    <div className={s.label}>
                      <h3 className={s.name}>{p.shortName}</h3>
                      <span className={s.notes}>{descriptor(p)}</span>
                      <span className={`${s.price} num`}>{lei(p.price)} <span className="muted">· 100 ml{p.inStock ? '' : ' · stoc epuizat'}</span></span>
                    </div>
                  </ShelfItem>
                </li>
              ))}
            </ul>
          </section>
        ))}
        {trial && trial.length > 0 && (
          <aside className={s.promo} aria-label="Încearcă înainte de sticlă">
            <p className="t-3">Nu știi de unde să începi?</p>
            <p className="t-small muted">Încearcă mostrele acasă, apoi alege sticla de 100 ml.</p>
            <p className={s.promoLinks}>
              {trial.map(o => <a key={o.slug} className="btn btn-sm btn-secondary" href={o.url}>{sampleName(o.slug)}, {lei(o.price)}</a>)}
              <Link className="btn btn-sm btn-secondary" href="/descopera/finder">Fragrance Finder</Link>
            </p>
          </aside>
        )}
      </div>
    </div>
  );
}
