import Link from 'next/link';
import { Header, Footer } from '../_ui';
import { CollectionIndex } from '../_interactive';
import { COLLECTIONS, inCollection, sampleSets, type CollectionId } from '@/lib/catalog';
import s from '../forma.module.css';

export const metadata = { title: 'B — Forma · Colecție' };

export default async function Collection({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  const { c } = await searchParams;
  const id = (c && c in COLLECTIONS ? c : 'luxury') as CollectionId;
  const items = inCollection(id);
  const promo = sampleSets.find(x => x.inStock && (id === 'luxury' ? /luxury/.test(x.slug) : /exclusifs|ice/.test(x.slug))) ?? null;
  const prices = [...new Set(items.map(p => p.price))];
  return (
    <>
      <Header current="Parfumuri" />
      <main className={s.wrap}>
        <section className={s.collTop}>
          <h1 className={s.compressed}>{COLLECTIONS[id].name}</h1>
          <div className={s.collSpec}>
            <p style={{ fontSize: 18, fontWeight: 500 }}>{COLLECTIONS[id].line}</p>
            <dl className={s.specs}>
              <dt>Concentrație</dt><dd>{COLLECTIONS[id].type}</dd>
              <dt>Parfumuri</dt><dd>{items.length}, unisex</dd>
              <dt>100 ml</dt><dd>{prices.map(p => `${p} lei`).join(' / ')}</dd>
            </dl>
          </div>
        </section>
        <CollectionIndex items={items} promo={promo} />
        <nav style={{ display: 'flex', gap: 24, marginTop: 64 }} aria-label="Alte colecții">
          {(Object.keys(COLLECTIONS) as CollectionId[]).filter(k => k !== id).map(k => (
            <Link key={k} href={`/concept/b/collection?c=${k}`} className={s.compressed} style={{ fontSize: 44 }}>{COLLECTIONS[k].name}</Link>
          ))}
        </nav>
      </main>
      <Footer />
    </>
  );
}
