import Link from 'next/link';
import { ProductIndex } from '@/components/ProductIndex';
import { SectionNav } from '@/components/SectionNav';
import { perfumes, inCollection, COLLECTIONS, ALL_BY_COLLECTION, sampleSets, collectionHref, type CollectionId } from '@/lib/catalog';
import { chord } from '@/lib/scent';
import { parseFilters } from '@/lib/filters';
import s from './collection.module.css';

type SP = Record<string, string | string[] | undefined>;

/** Shared by /parfumuri (all) and /parfumuri/[colectie]. */
export function CollectionPage({ id, searchParams }: { id: CollectionId | null; searchParams: SP }) {
  const items = id ? inCollection(id) : perfumes;
  const prices = [...new Set(items.map(p => p.price))].sort((a, b) => a - b);
  const trial = sampleSets.filter(x => x.inStock && (!id || (id === 'luxury' ? /luxury/.test(x.slug) : /exclusifs|ice/.test(x.slug))));
  return (
    <div className="wrap">
      <section className={s.head} aria-labelledby="colectie-titlu">
        <div>
          <nav className={`${s.crumb} t-small muted`} aria-label="Breadcrumb">
            <Link href="/">Morph</Link><span aria-hidden>/</span>{id ? <><Link href="/parfumuri">Parfumuri</Link><span aria-hidden>/</span><span aria-current="page">{COLLECTIONS[id].name}</span></> : <span aria-current="page">Parfumuri</span>}
          </nav>
          <h1 id="colectie-titlu" className="t-display">{id ? COLLECTIONS[id].name : 'Parfumuri'}</h1>
        </div>
        <div className={s.intro}>
          <p className="t-lede">{id ? COLLECTIONS[id].line : 'Toate parfumurile Morph, unisex, în trei colecții. Fiecare culoare de mai jos e o sticlă.'}</p>
          <p className="t-small muted">{id ? `${COLLECTIONS[id].type}, ` : ''}{items.length} parfumuri, 100 ml, <span className="num">{prices.map(p => `${p} lei`).join(' sau ')}</span></p>
          <span className={s.chord} style={{ background: chord(items) }} aria-hidden />
        </div>
      </section>
      <SectionNav label="Colecții" current={collectionHref(id ?? undefined)} items={[{ href: '/parfumuri', label: 'Toate' }, ...ALL_BY_COLLECTION.map(c => ({ href: collectionHref(c), label: COLLECTIONS[c].name }))]} />
      <ProductIndex items={items} initial={parseFilters(searchParams)} trial={trial} />
    </div>
  );
}
