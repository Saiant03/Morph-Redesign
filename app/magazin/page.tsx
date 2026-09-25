import Link from 'next/link';
import { OpenNow } from '@/components/OpenNow';
import { TryListPanel } from '@/components/TryListPanel';
import { ProductVisual } from '@/components/ProductVisual';
import { Ext, MorphQuote } from '@/components/Ext';
import { COLLECTIONS, BOUTIQUE, FREE_SHIPPING, lei, bySlug, collectionHref } from '@/lib/catalog';
import s from './magazin.module.css';

export const metadata = { title: BOUTIQUE.name };

const tel = (n: string) => `tel:+40${n.replace(/\s/g, '').slice(1)}`;
// One object per collection, set into the wall like the boutique's display niches.
const WALL = ['morph-iconic-parfum-100ml', 'morph-indomable-parfum-100ml', 'morph-oud-mafia-100ml'];
// Morph's words on trying, checked 2026-09-25: the FAQ on the home page and the TLDR of its testing guide
const FAQ = 'https://morphparfum.ro/';
const GUIDE = 'https://morphparfum.ro/cum-testezi-un-parfum-inainte-sa-il-cumperi';
const METHOD = [
  { label: 'Puține', text: 'Testează maximum 2–3 parfumuri pe sesiune.' },
  { label: 'Hârtie, apoi piele', text: 'Începe pe blotter ca să filtrezi rapid, apoi pune doar 1–2 pe piele. Nu freca încheieturile.' },
  { label: 'Timp', text: 'Nu decide în primele 5 minute. Așteaptă 20–30 de minute pentru inimă și câteva ore pentru baza reală.' },
];

export default function Page() {
  return (
    <>
      {/* The room: an art wall with three lit niches, and the practical facts beside it. data-enter: arriving here,
          the walnut room is lit up from dark (globals.css, shop-light) */}
      <section className={s.room} data-tone="wood" data-enter="shop" aria-labelledby="casa-titlu">
        <div className={`wrap ${s.roomGrid}`}>
          <div className={s.roomText}>
            <nav className="t-small muted" aria-label="Breadcrumb"><Link href="/">Morph</Link> / <span aria-current="page">Magazinul</span></nav>
            <h1 id="casa-titlu" className="t-display">Magazinul Morph</h1>
            <p className="t-lede">Magazinul oficial Morph din București. Parfumurile găsite și compuse pe ecran se încearcă aici pe piele.</p>
          </div>
          <div className={s.artWall} aria-label="Câte un parfum din fiecare colecție">
            {WALL.map((slug, i) => {
              const p = bySlug(slug);
              return (
                <Link key={slug} href={collectionHref(p.collection)} className={s.wallNiche} style={{ '--k': i } as React.CSSProperties}>
                  <ProductVisual p={p} sizes="(max-width: 899px) 30vw, 14vw" alt={`${p.shortName}, ${COLLECTIONS[p.collection].name}`} className={s.niche} />
                  <span className="label">{COLLECTIONS[p.collection].name}</span>
                </Link>
              );
            })}
          </div>
          <div className={s.visit}>
            <address className={s.address}>
              <h2 className="t-2">{BOUTIQUE.address.replace(', București', '').replace('nr. ', 'nr.\u00a0')}</h2>
              <p className="muted">{BOUTIQUE.district}, București</p>
            </address>
            <OpenNow />
            <dl className={s.hours} aria-label="Programul magazinului">
              {BOUTIQUE.schedule.map(r => <div key={r.days}><dt className="label muted">{r.label}</dt><dd className="num">{r.time}</dd></div>)}
            </dl>
            <div className={s.actions}>
              <a className="btn" href={BOUTIQUE.maps} target="_blank" rel="noopener">Deschide în Google Maps<span className="sr-only"> (se deschide într-o filă nouă)</span></a>
              <a className="btn btn-secondary" href={tel(BOUTIQUE.phone)}>Sună la magazin <span className="num">{BOUTIQUE.phone}</span></a>
            </div>
            <dl className={`${s.contact} t-small`}>
              <div><dt className="muted">Comenzi online și asistență clienți</dt><dd><a className="link num" href={tel(BOUTIQUE.onlineOrders.phone)}>{BOUTIQUE.onlineOrders.phone}</a>, <span className="num">{BOUTIQUE.onlineOrders.hours}</span></dd></div>
              <div><dt className="muted">E-mail</dt><dd><a className="link" href={`mailto:${BOUTIQUE.email}`}>{BOUTIQUE.email}</a></dd></div>
            </dl>
            <p className="t-micro muted">Programul și contactele, după site-ul Morph. Morph nu publică un program de sărbători: sună la magazin înainte.</p>
          </div>
        </div>
      </section>

      {/* How to try: Morph's words, quoted and linked */}
      <section className="band" aria-labelledby="cum-incerci">
        <div className="wrap">
          <div className={s.head}>
            <h2 id="cum-incerci" className="t-1">Cum încerci</h2>
            <MorphQuote className={s.faq} href={FAQ}
              text="Da. Le poți testa în magazinul din București sau prin seturi de testare și mini variante travel. Testarea pe piele este cea mai corectă metodă de alegere."
              cite={<>Morph, la întrebarea „Pot testa parfumurile Morph înainte să cumpăr?”. <Ext href={FAQ}>Sursa</Ext></>} />
          </div>
          <figure className={s.method} data-voice="morph">
            <ol className={s.steps}>
              {METHOD.map((m, i) => (
                <li key={m.label}><span className="label muted"><span className="num">0{i + 1}</span> · {m.label}</span><blockquote cite={GUIDE}><p>{m.text}</p></blockquote></li>
              ))}
            </ol>
            <figcaption className="t-small muted">Din ghidul Morph „Cum testezi un parfum înainte să îl cumperi”. <Ext href={GUIDE}>Citește ghidul</Ext></figcaption>
          </figure>
        </div>
      </section>

      {/* Digital → physical: the visitor's own selection */}
      <section className={`band ${s.listBand}`} aria-labelledby="lista">
        <div className={`wrap ${s.listGrid}`}>
          <div className={s.listText}>
            <h2 id="lista" className="t-1">Selecția ta</h2>
            <p className="muted">Parfumurile și perechile marcate „De încercat în magazin” în Finder, Descoperă sau Layering. Lista rămâne doar în acest browser; o deschizi pe telefon în magazin. Nu rezervă nimic și nu arată ce e pe raft în ziua vizitei.</p>
            <p className="t-small muted">Acasă, cu seturi de testare și Travel Editions: <Link className="link" href="/descopera#incearca">Încearcă înainte de sticlă</Link></p>
          </div>
          <TryListPanel />
        </div>
      </section>

      {/* Store reviews: one source link and a summary in the concept's voice; no quotes, names, figures or stars */}
      <section className={s.reviews} aria-labelledby="recenzii">
        <div className="wrap">
          <h2 id="recenzii" className="label muted">Recenzii despre magazin</h2>
          <p>Cine scrie despre magazin pe Google vorbește des despre sfaturile primite la alegerea parfumului. Recenziile sunt despre magazin, nu despre un parfum anume.</p>
          <p className="t-small"><Ext href={BOUTIQUE.reviews}>Citește recenziile magazinului pe Google Maps</Ext></p>
          <p className="t-micro muted">Rezumat al conceptului, după recenziile citite pe 25 septembrie 2026.</p>
        </div>
      </section>

      {/* Certilogo */}
      <section id="certilogo" className="band" aria-labelledby="certilogo-titlu">
        <div className="wrap">
          <div className={s.head}>
            <h2 id="certilogo-titlu" className="t-1">Original, verificabil</h2>
            <p className="muted">Fiecare parfum Morph cumpărat de pe site-ul oficial sau de la partenerii autorizați are un cod Certilogo unic pe ambalaj.</p>
          </div>
          <ol className={s.steps}>
            <li><span className="label muted num">01</span><p>Caută codul Certilogo sau QR-ul dedicat pe cutia parfumului.</p></li>
            <li><span className="label muted num">02</span><p>Intră pe <a className="link" href="https://www.certilogo.com" target="_blank" rel="noopener">certilogo.com</a> sau scanează QR-ul cu telefonul.</p></li>
            <li><span className="label muted num">03</span><p>Introdu codul sau scanează pentru verificare.</p></li>
            <li><span className="label muted num">04</span><p>Primești confirmarea că parfumul e original și vine din circuitul oficial Morph Parfum Italia.</p></li>
          </ol>
        </div>
      </section>

      {/* The house */}
      <section id="povestea" className="band" data-tone="dark" aria-labelledby="povestea-titlu">
        <div className={`wrap ${s.story}`}>
          <h2 id="povestea-titlu" className="t-1">Morph, din Napoli</h2>
          <div>
            <p className="t-lede">Casă italiană de nișă, fondată în 2002 la Napoli de Andrea Angelino. Sticla, de la Bormioli Luigi, e răsucită ca să exprime „echilibru și mișcare continuă”. Deviza casei: „evoluție constantă și Metamorfoză prin parfum”.</p>
            <p><Link className="link" href="/despre-noi">Despre Morph: Napoli, sticla, parfumierii</Link></p>
            <p className="t-small muted">Toate parfumurile Morph sunt unisex. Livrare gratuită de la {lei(FREE_SHIPPING)} pentru comenzile online; există și programul de fidelitate Morph Points.</p>
          </div>
        </div>
      </section>
    </>
  );
}
