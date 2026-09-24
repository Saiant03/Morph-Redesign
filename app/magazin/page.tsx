import Link from 'next/link';
import { OpenNow } from '@/components/OpenNow';
import { TryListPanel } from '@/components/TryListPanel';
import { ProductVisual } from '@/components/ProductVisual';
import { inCollection, COLLECTIONS, ALL_BY_COLLECTION, BOUTIQUE, FREE_SHIPPING, lei, bySlug, collectionHref, perfumes } from '@/lib/catalog';
import s from './magazin.module.css';

export const metadata = { title: BOUTIQUE.name };

const tel = (n: string) => `tel:+40${n.replace(/\s/g, '').slice(1)}`;
// One object per collection, set into the wall like the boutique's display niches.
const WALL = ['morph-iconic-parfum-100ml', 'morph-indomable-parfum-100ml', 'morph-oud-mafia-100ml'];

export default function Page() {
  return (
    <>
      {/* The room: an art wall with three lit niches, and the practical facts beside it */}
      <section className={s.room} data-tone="wood" aria-labelledby="casa-titlu">
        <div className={`wrap ${s.roomGrid}`}>
          <div className={s.roomText}>
            <nav className="t-small muted" aria-label="Breadcrumb"><Link href="/">Morph</Link> / <span aria-current="page">Magazinul</span></nav>
            <h1 id="casa-titlu" className="t-display">Magazinul Morph</h1>
            <p className="t-lede">Magazinul oficial Morph din București. Aici parfumurile găsite și compuse pe ecran se încearcă pe piele, cu echipa Morph alături.</p>
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
            <h2 className="t-2">{BOUTIQUE.address.replace(', București', '')}<span className="muted">, București</span></h2>
            <OpenNow />
            <dl className={s.hours}>
              <div><dt className="label muted">Luni–vineri</dt><dd className="num">12:00–20:00</dd></div>
              <div><dt className="label muted">Sâmbătă–duminică</dt><dd className="num">10:00–18:00</dd></div>
            </dl>
            <div className={s.actions}>
              <a className="btn" href={BOUTIQUE.maps} target="_blank" rel="noopener">Deschide în hărți</a>
              <a className="btn btn-secondary" href={tel(BOUTIQUE.phone)}>Sună la magazin <span className="num">{BOUTIQUE.phone}</span></a>
            </div>
            <p className="t-small muted">Comenzi online: <a className="link num" href={tel(BOUTIQUE.onlineOrders.phone)}>{BOUTIQUE.onlineOrders.phone}</a>, {BOUTIQUE.onlineOrders.hours}. E-mail: <a className="link" href={`mailto:${BOUTIQUE.email}`}>{BOUTIQUE.email}</a>.</p>
          </div>
        </div>
      </section>

      {/* Why the visit: only what is verified */}
      <section className="band" aria-labelledby="de-ce">
        <div className="wrap">
          <div className={s.head}>
            <h2 id="de-ce" className="t-1">De ce să vii</h2>
            <p className="muted">Pe ecran vezi sticla și notele. Parfumul, însă, se desfășoară pe piele, în ore.</p>
          </div>
          <ol className={s.reasons}>
            <li>
              <span className="label muted num">01</span>
              <h3 className="t-2">Pe piele, în timp</h3>
              <p className="muted">Parfumurile Morph țin, după datele Morph, între 8 și 12 ore. Deschiderea, inima și baza se simt una după alta, nu pe o mostră de hârtie.</p>
            </li>
            <li>
              <span className="label muted num">02</span>
              <h3 className="t-2">Cu echipa Morph</h3>
              <p className="muted">Recenziile Google ale magazinului (159 la momentul auditului) vorbesc mai ales despre oamenii din magazin și despre alegerea parfumului cu ajutorul lor.</p>
            </li>
            <li>
              <span className="label muted num">03</span>
              <h3 className="t-2">Toate cele trei colecții</h3>
              <p className="muted">
                {ALL_BY_COLLECTION.map((c, i) => <span key={c}>{i ? ', ' : ''}<Link className="link" href={collectionHref(c)}>{COLLECTIONS[c].name}</Link> ({inCollection(c).length})</span>)}. {perfumes.length} de parfumuri unisex.
              </p>
            </li>
            <li>
              <span className="label muted num">04</span>
              <h3 className="t-2">Layering, pe loc</h3>
              <p className="muted">Adu perechea compusă online și încearc-o pe piele înainte de travel-uri sau sticle. <Link className="link" href="/layering">Compune o pereche</Link></p>
            </li>
          </ol>
        </div>
      </section>

      {/* Digital → physical: the visitor's own selection */}
      <section className={`band ${s.listBand}`} aria-labelledby="lista">
        <div className={`wrap ${s.listGrid}`}>
          <div className={s.listText}>
            <h2 id="lista" className="t-1">Selecția ta</h2>
            <p className="muted">Parfumurile și perechile marcate „De încercat în magazin” în Finder, Descoperă sau Layering. Lista rămâne doar în acest browser; o deschizi pe telefon în magazin.</p>
          </div>
          <TryListPanel />
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
            <p className="t-small muted">Toate parfumurile Morph sunt unisex. Livrare gratuită de la {lei(FREE_SHIPPING)} pentru comenzile online; există și programul de fidelitate Morph Points.</p>
          </div>
        </div>
      </section>
    </>
  );
}
