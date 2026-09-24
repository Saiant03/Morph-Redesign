import Link from 'next/link';
import { Header, Footer, Card } from '../_ui';
import { Stage, Buy, Composer, TimeOnSkin } from '../_interactive';
import { perfumes, bySlug, COLLECTIONS, concentration, familyGroup, travelFor, samplesFor, related, section, HERO_SLUG, BOUTIQUE, FREE_SHIPPING, lei } from '@/lib/catalog';
import s from '../strata.module.css';

export const metadata = { title: 'C — Strata · Produs' };
const first = (t: string, n: number) => (t.match(/[^.!?]+[.!?]+/g) || [t]).slice(0, n).join(' ').trim();

export default async function Product({ searchParams }: { searchParams: Promise<{ p?: string }> }) {
  const { p: slug } = await searchParams;
  const p = perfumes.find(x => x.slug === slug) ?? bySlug(HERO_SLUG);
  const desc = section(p, /^Descriere/i);
  const season = section(p, /^Sezon/i);
  const partner = related(p, 6).find(r => travelFor(r)) ?? related(p, 1)[0] ?? perfumes.find(x => x.slug !== p.slug)!;
  return (
    <>
      <Header current="Parfumuri" />
      <main>
        <div className={s.wrap}>
          <div className={s.pdpHero}>
            <Stage p={p} />
            <div className={s.pdpInfo}>
              <nav className={s.crumb} style={{ margin: 0 }} aria-label="Breadcrumb"><Link href="/concept/c/collection">Parfumuri</Link> · <Link href={`/concept/c/collection?c=${p.collection}`}>{COLLECTIONS[p.collection].name}</Link></nav>
              <h1 className={s.serif}>{p.shortName}</h1>
              <p className={s.sub}>{concentration(p)} · unisex · 100 ml · <b style={{ color: 'var(--ink)', fontWeight: 500 }}>{lei(p.price)}</b></p>
              <p style={{ margin: 0, fontSize: 17 }}>{first(p.summary, 2)}</p>
              <div className={s.facts}>
                <div className={s.fact}><span>Familie</span><b>{p.family ?? '—'}</b></div>
                <div className={s.fact}><span>Intensitate</span><b>{p.intensity ?? '—'}</b></div>
                <div className={s.fact}><span>Longevitate</span><b>{p.longevity?.replace('-', '–') ?? '—'}</b></div>
              </div>
              <Buy p={p} travel={travelFor(p)} samples={samplesFor(p)} />
              <ul className={s.assure}>
                <li>Livrare gratuită peste {lei(FREE_SHIPPING)} · Certificat Certilogo</li>
                <li>Consultanță și testare în {BOUTIQUE.name}, {BOUTIQUE.address}</li>
              </ul>
            </div>
          </div>
        </div>

        <TimeOnSkin p={p} />

        {desc && (
          <section className={`${s.wrap} ${s.section}`} aria-label="Povestea parfumului">
            <div className={s.story}><blockquote className={s.serif}>{first(desc.body, 4)}</blockquote><aside>{season ? first(season.body, 2) : null}</aside></div>
          </section>
        )}

        <section className={`${s.wrap} ${s.section}`} aria-label="Layering"><Composer first={p.slug} second={partner.slug} title={`${p.shortName}, cu încă un strat`} /></section>

        <section className={`${s.wrap} ${s.section}`} aria-labelledby="rel">
          <div className={s.head}><h2 id="rel" className={s.serif}>Aceeași familie{familyGroup(p) ? `: ${familyGroup(p)!.name.toLowerCase()}` : ''}</h2><p>Parfumuri cu aceeași încadrare olfactivă.</p></div>
          <div className={s.cards}>{related(p, 4).map(r => <Card key={r.slug} p={r} />)}</div>
        </section>
      </main>
      <Footer />
    </>
  );
}
