import Link from 'next/link';
import { Header, Footer } from '../_ui';
import { CollectionGrid } from '../_grid';
import { COLLECTIONS, inCollection, tone, sampleSets, type CollectionId } from '@/lib/catalog';
import s from '../cromatic.module.css';

export const metadata = { title: 'A — Cromatic · Colecție' };

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
        <section className={s.collHero}>
          <div>
            <nav className={s.crumb} aria-label="Breadcrumb"><Link href="/concept/a/home">Morph</Link><span>/</span><span>Parfumuri</span></nav>
            <h1 className={s.display}>{COLLECTIONS[id].name}</h1>
          </div>
          <div>
            <p className={s.lede} style={{ marginTop: 0 }}>{COLLECTIONS[id].line}</p>
            <p className={s.muted} style={{ margin: '0 0 14px' }}>{COLLECTIONS[id].type} · {items.length} parfumuri · 100 ml, {prices.map(p => `${p} lei`).join(' / ')}</p>
            <div className={s.collChord} aria-hidden>{items.map(p => <span key={p.slug} style={{ '--sw': tone(p).identity } as React.CSSProperties} />)}</div>
          </div>
        </section>
        <CollectionGrid items={items} promo={promo} />
        <nav style={{ display: 'flex', gap: 24, marginTop: 72, fontSize: 15 }} aria-label="Alte colecții">
          {(Object.keys(COLLECTIONS) as CollectionId[]).filter(k => k !== id).map(k => (
            <Link key={k} href={`/concept/a/collection?c=${k}`} className={s.textLink}>{COLLECTIONS[k].name}</Link>
          ))}
        </nav>
      </main>
      <Footer />
    </>
  );
}
