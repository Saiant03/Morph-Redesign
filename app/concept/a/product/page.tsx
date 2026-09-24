import Link from 'next/link';
import { Header, Footer, Card } from '../_ui';
import { Gallery, BuyBox } from '../_buy';
import { Composer } from '../_composer';
import { perfumes, bySlug, tone, mix, onColor, COLLECTIONS, concentration, familyGroup, travelFor, samplesFor, related, noteStory, section, HERO_SLUG, BOUTIQUE, FREE_SHIPPING, lei } from '@/lib/catalog';
import s from '../cromatic.module.css';

export const metadata = { title: 'A — Cromatic · Produs' };

const firstSentences = (t: string, n: number) => (t.match(/[^.!?]+[.!?]+/g) || [t]).slice(0, n).join(' ').trim();

export default async function Product({ searchParams }: { searchParams: Promise<{ p?: string }> }) {
  const { p: slug } = await searchParams;
  const p = perfumes.find(x => x.slug === slug) ?? bySlug(HERO_SLUG);
  const t = tone(p);
  const fam = familyGroup(p);
  const story = noteStory(p);
  const desc = section(p, /^Descriere/i);
  const season = section(p, /^Sezon/i);
  const partner = related(p, 6).find(r => travelFor(r)) ?? related(p, 1)[0] ?? perfumes.find(x => x.slug !== p.slug)!;
  // three steps of the same hue: opening lighter, base at full strength (a visual convention, not data)
  const ramp = [
    { label: 'Deschidere', notes: p.notes.top, bg: mix(t.identity, '#edeeeb', 0.35) },
    { label: 'Inimă', notes: p.notes.heart, bg: mix(t.identity, '#edeeeb', 0.68) },
    { label: 'Bază', notes: p.notes.base, bg: t.identity },
  ];

  return (
    <>
      <Header current="Parfumuri" />
      <main className={s.wrap} style={{ '--a-c': t.identity } as React.CSSProperties}>
        <div className={s.pdp}>
          <Gallery p={p} />
          <div className={s.pdpInfo}>
            <div>
              <nav className={s.crumb} aria-label="Breadcrumb">
                <Link href="/concept/a/collection">Parfumuri</Link><span>/</span>
                <Link href={`/concept/a/collection?c=${p.collection}`}>{COLLECTIONS[p.collection].name}</Link>
              </nav>
              <h1 className={s.pdpTitle}>{p.shortName}</h1>
              <p className={s.pdpSub}>{concentration(p)} · unisex · 100 ml · {lei(p.price)}</p>
            </div>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.45 }}>{firstSentences(p.summary, 2)}</p>
            <div className={s.specs}>
              <div className={s.spec}><span>Familie</span><b>{p.family ?? '—'}</b></div>
              <div className={s.spec}><span>Intensitate</span><b>{p.intensity ?? '—'}</b></div>
              <div className={s.spec}><span>Longevitate</span><b>{p.longevity?.replace('-', '–') ?? '—'}</b></div>
            </div>
            <div className={s.ramp} aria-label="Note, în ordinea în care apar">
              {ramp.map(r => (
                <div key={r.label} className={s.rampStep} style={{ background: r.bg, color: onColor(r.bg) }}>
                  <span>{r.label}</span>{r.notes.join(', ') || '—'}
                </div>
              ))}
            </div>
            <BuyBox p={p} travel={travelFor(p)} samples={samplesFor(p)} />
            <ul className={s.assure}>
              <li>Livrare gratuită peste {lei(FREE_SHIPPING)} · Certificat Certilogo</li>
              <li>Consultanță și testare în {BOUTIQUE.name}, {BOUTIQUE.address}</li>
            </ul>
          </div>
        </div>

        {desc && (
          <section className={`${s.pdpBlock} ${s.story}`} aria-label="Povestea parfumului">
            <blockquote>{firstSentences(desc.body, 4)}</blockquote>
            <aside>{season ? firstSentences(season.body, 2) : null}</aside>
          </section>
        )}

        <section className={s.pdpBlock} aria-labelledby="note">
          <div className={s.sectionHead}><h2 id="note" className={s.h2}>Cum evoluează pe piele</h2><p>Descrierile notelor sunt ale Morph.</p></div>
          <div className={s.notesGrid}>
            {([['Deschidere', story.top, p.notes.top], ['Inimă', story.heart, p.notes.heart], ['Bază', story.base, p.notes.base]] as const).map(([label, st, n], k) => (
              <div key={label} className={s.noteCol} style={{ '--sw': ramp[k].bg } as React.CSSProperties}>
                <span className={s.muted} style={{ fontSize: 13 }}>{label}</span>
                <h3 className={s.h3}>{n.join(', ')}</h3>
                {st && <p>{firstSentences(st.body, 2)}</p>}
              </div>
            ))}
          </div>
        </section>

        <section className={s.pdpBlock} aria-label="Layering">
          <Composer first={p.slug} second={partner.slug} title={`${p.shortName} și încă un strat`} />
        </section>

        <section className={s.pdpBlock} aria-labelledby="rel">
          <div className={s.sectionHead}><h2 id="rel" className={s.h2}>Tot din familia {fam?.name.toLowerCase() ?? 'aceasta'}</h2><p>Parfumuri cu aceeași încadrare olfactivă.</p></div>
          <div className={s.cards}>{related(p, 4).map(r => <Card key={r.slug} p={r} />)}</div>
        </section>
      </main>
      <Footer />
    </>
  );
}
