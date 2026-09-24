import Link from 'next/link';
import { Header, Footer } from '../_ui';
import { CollectionGrid } from '../_interactive';
import { COLLECTIONS, inCollection, tone, sampleSets, type CollectionId } from '@/lib/catalog';
import s from '../strata.module.css';

export const metadata = { title: 'C — Strata · Colecție' };

export default async function Collection({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  const { c } = await searchParams;
  const id = (c && c in COLLECTIONS ? c : 'luxury') as CollectionId;
  const items = inCollection(id);
  const promo = sampleSets.find(x => x.inStock && (id === 'luxury' ? /luxury/.test(x.slug) : /exclusifs|ice/.test(x.slug))) ?? null;
  const prices = [...new Set(items.map(p => p.price))];
  const veils = items.filter(p => p.inStock).slice(0, 4);
  return (
    <>
      <Header current="Parfumuri" />
      <main className={s.wrap}>
        <section className={s.collIntro}>
          <div className={s.introVeils} aria-hidden>{veils.map((p, i) => <span key={p.slug} style={{ left: `${i * 22}%`, background: tone(p).identity }} />)}</div>
          <div>
            <nav className={s.crumb} aria-label="Breadcrumb"><Link href="/concept/c/home">Morph</Link> · Parfumuri</nav>
            <h1 className={s.layered}><span className={s.l1}>{COLLECTIONS[id].name}</span><span className={`${s.l2} ${s.serif}`} style={{ fontSize: 'clamp(40px, 5vw, 84px)', marginTop: '-0.1em' }}>{COLLECTIONS[id].type}</span></h1>
          </div>
          <div>
            <p style={{ fontSize: 18 }}>{COLLECTIONS[id].line}</p>
            <p className={s.muted}>{items.length} parfumuri unisex · 100 ml, {prices.map(p => `${p} lei`).join(' / ')}</p>
          </div>
        </section>
        <CollectionGrid items={items} promo={promo} />
        <nav style={{ display: 'flex', gap: 28, marginTop: 120 }} aria-label="Alte colecții">
          {(Object.keys(COLLECTIONS) as CollectionId[]).filter(k => k !== id).map(k => <Link key={k} href={`/concept/c/collection?c=${k}`} className={s.serif} style={{ fontSize: 40 }}>{COLLECTIONS[k].name}</Link>)}
        </nav>
      </main>
      <Footer />
    </>
  );
}
