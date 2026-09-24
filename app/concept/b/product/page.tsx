import Link from 'next/link';
import { Header, Footer, Tile } from '../_ui';
import { Stage, Buy, Composer } from '../_interactive';
import { perfumes, bySlug, COLLECTIONS, concentration, familyGroup, travelFor, samplesFor, related, noteStory, section, HERO_SLUG, BOUTIQUE, FREE_SHIPPING, lei } from '@/lib/catalog';
import s from '../forma.module.css';

export const metadata = { title: 'B — Forma · Produs' };
const first = (t: string, n: number) => (t.match(/[^.!?]+[.!?]+/g) || [t]).slice(0, n).join(' ').trim();

export default async function Product({ searchParams }: { searchParams: Promise<{ p?: string }> }) {
  const { p: slug } = await searchParams;
  const p = perfumes.find(x => x.slug === slug) ?? bySlug(HERO_SLUG);
  const story = noteStory(p);
  const desc = section(p, /^Descriere/i);
  const season = section(p, /^Sezon/i);
  const partner = related(p, 6).find(r => travelFor(r)) ?? related(p, 1)[0] ?? perfumes.find(x => x.slug !== p.slug)!;
  const tiers = [['Deschidere', p.notes.top, story.top], ['Inimă', p.notes.heart, story.heart], ['Bază', p.notes.base, story.base]] as const;
  return (
    <>
      <Header current="Parfumuri" />
      <main className={s.wrap}>
        <div className={s.pdp}>
          <Stage p={p} />
          <div className={s.sheet}>
            <div className={s.sheetTop}>
              <nav aria-label="Breadcrumb"><Link href="/concept/b/collection">Parfumuri</Link> / <Link href={`/concept/b/collection?c=${p.collection}`}>{COLLECTIONS[p.collection].name}</Link></nav>
              <span>{p.inStock ? 'În stoc' : 'Stoc epuizat'}</span>
            </div>
            <p style={{ margin: 0, fontSize: 30, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{lei(p.price)} <span className={s.muted} style={{ fontSize: 15, fontWeight: 400 }}>{concentration(p)}, 100 ml</span></p>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.4, fontWeight: 500 }}>{first(p.summary, 2)}</p>
            <dl className={s.specs}>
              <dt>Colecție</dt><dd>{COLLECTIONS[p.collection].name}</dd>
              <dt>Concentrație</dt><dd>{concentration(p)}</dd>
              <dt>Volum</dt><dd>100 ml · unisex</dd>
              <dt>Familie</dt><dd>{p.family ?? '—'}{familyGroup(p) && familyGroup(p)!.name !== p.family ? ` (${familyGroup(p)!.name})` : ''}</dd>
              <dt>Intensitate</dt><dd>{p.intensity ?? '—'}</dd>
              <dt>Longevitate</dt><dd>{p.longevity?.replace('-', '–') ?? '—'}</dd>
              <dt>Deschidere</dt><dd>{p.notes.top.join(', ') || '—'}</dd>
              <dt>Inimă</dt><dd>{p.notes.heart.join(', ') || '—'}</dd>
              <dt>Bază</dt><dd>{p.notes.base.join(', ') || '—'}</dd>
            </dl>
            <Buy p={p} travel={travelFor(p)} samples={samplesFor(p)} />
            <ul className={s.assure}>
              <li>Livrare gratuită peste {lei(FREE_SHIPPING)} · Certificat Certilogo</li>
              <li>Consultanță și testare în {BOUTIQUE.name}, {BOUTIQUE.address}</li>
            </ul>
          </div>
        </div>

        <section className={s.block} aria-labelledby="note">
          <div className={s.head}><h2 id="note" className={s.compressed}>Structura</h2><p>Descrierile notelor sunt ale Morph.</p></div>
          <div className={s.notes}>
            {tiers.map(([label, n, st]) => (
              <div key={label} className={s.noteRow}>
                <span>{label}</span>
                <h3 className={s.compressed}>{n.join(', ')}</h3>
                <p>{st ? first(st.body, 2) : ''}</p>
              </div>
            ))}
          </div>
        </section>

        {desc && (
          <section className={`${s.block} ${s.quote}`} aria-label="Povestea parfumului">
            <blockquote>{first(desc.body, 5)}</blockquote>
            <aside>{season ? first(season.body, 2) : null}</aside>
          </section>
        )}

        <section className={s.block} aria-label="Layering"><Composer first={p.slug} second={partner.slug} title={`${p.shortName} +`} /></section>

        <section className={s.block} aria-labelledby="rel">
          <div className={s.head}><h2 id="rel" className={s.compressed}>Aceeași familie</h2><p>Parfumuri cu aceeași încadrare olfactivă.</p></div>
          <div className={s.repeat}>{related(p, 4).map(r => <Tile key={r.slug} p={r} />)}</div>
        </section>
      </main>
      <Footer />
    </>
  );
}
