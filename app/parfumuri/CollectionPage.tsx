import Link from 'next/link';
import { ProductIndex } from '@/components/ProductIndex';
import { SectionNav } from '@/components/SectionNav';
import { ProductVisual } from '@/components/ProductVisual';
import { perfumes, inCollection, COLLECTIONS, ALL_BY_COLLECTION, sampleSets, collectionHref, productHref, lei, type CollectionId } from '@/lib/catalog';
import { parseFilters } from '@/lib/filters';
import s from './collection.module.css';

type SP = Record<string, string | string[] | undefined>;

/** Shared by /parfumuri (all) and /parfumuri/[colectie]. The head is the collection's vitrine: every bottle on one shelf. */
export function CollectionPage({ id, searchParams }: { id: CollectionId | null; searchParams: SP }) {
  const items = id ? inCollection(id) : perfumes;
  const prices = [...new Set(items.map(p => p.price))].sort((a, b) => a - b);
  const trial = sampleSets.filter(x => x.inStock && (!id || (id === 'luxury' ? /luxury/.test(x.slug) : /exclusifs|ice/.test(x.slug))));
  return (
    <>
      <section className={s.room} data-tone="wood" aria-labelledby="colectie-titlu">
        <div className={`wrap ${s.head}`}>
          <div>
            <nav className={`${s.crumb} t-small muted`} aria-label="Breadcrumb">
              <Link href="/">Morph</Link><span aria-hidden>/</span>{id ? <><Link href="/parfumuri">Parfumuri</Link><span aria-hidden>/</span><span aria-current="page">{COLLECTIONS[id].name}</span></> : <span aria-current="page">Parfumuri</span>}
            </nav>
            <h1 id="colectie-titlu" className="t-display">{id ? COLLECTIONS[id].name : 'Parfumuri'}</h1>
          </div>
          <div className={s.intro}>
            <p className="t-lede">{id ? COLLECTIONS[id].line : 'Toate parfumurile Morph, unisex, în trei colecții: Les Exclusifs, Luxury și Ice.'}</p>
            <dl className={s.facts}>
              {id && <div><dt className="label muted">Concentrație</dt><dd>{COLLECTIONS[id].type}</dd></div>}
              <div><dt className="label muted">Parfumuri</dt><dd className="num">{items.length}, toate unisex</dd></div>
              <div><dt className="label muted">100 ml</dt><dd className="num">{prices.map(lei).join(' sau ')}</dd></div>
            </dl>
          </div>
        </div>
        <div className={s.shelfWrap}>
          <ul className={`${s.shelf} wrap`} data-dense={items.length > 14} aria-label={`Vitrina ${id ? COLLECTIONS[id].name : 'Morph'}`}>
            {items.map(p => (
              <li key={p.slug}>
                <Link href={productHref(p)} className={s.shelfItem} aria-label={p.shortName}>
                  <ProductVisual p={p} sizes="120px" alt="" className={s.shelfNiche} />
                  <span className="t-micro" aria-hidden>{p.shortName}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className="wrap">
        <SectionNav label="Colecții" current={collectionHref(id ?? undefined)} items={[{ href: '/parfumuri', label: 'Toate' }, ...ALL_BY_COLLECTION.map(c => ({ href: collectionHref(c), label: COLLECTIONS[c].name }))]} />
        <ProductIndex items={items} initial={parseFilters(searchParams)} trial={trial} />
      </div>
    </>
  );
}
