import Link from 'next/link';
import { PageHead } from '@/components/PageHead';
import { OpenNow } from '@/components/OpenNow';
import { TryListPanel } from '@/components/TryListPanel';
import { perfumes, inCollection, COLLECTIONS, ALL_BY_COLLECTION, BOUTIQUE, FREE_SHIPPING, lei } from '@/lib/catalog';
import { chord, collectionChord } from '@/lib/scent';
import s from './casa.module.css';

export const metadata = { title: 'Casa Morph' };

const tel = (n: string) => `tel:+40${n.replace(/\s/g, '').slice(1)}`;

export default function Page() {
  return (
    <div className="wrap">
      <PageHead id="casa-titlu" title="Casa Morph" crumbs={[{ href: '/', label: 'Morph' }, { label: 'Casa Morph' }]}
        lede="Boutique-ul Morph din București. Locul unde parfumurile găsite și combinate pe ecran se încearcă pe piele, cu echipa Morph alături." />

      {/* The boutique: where it is, when it is open, how to reach it */}
      <section className={s.visit} aria-labelledby="vizita">
        <ul className={s.wall} aria-label="Colecțiile Morph, după culorile parfumurilor">
          {ALL_BY_COLLECTION.map(c => <li key={c} style={{ background: collectionChord(c) }}><Link href={`/parfumuri/${c}`}>{COLLECTIONS[c].name}</Link></li>)}
        </ul>
        <div className={s.visitInfo}>
          <h2 id="vizita" className="t-2">{BOUTIQUE.address.replace(', București', '')}<span className="muted">, București</span></h2>
          <OpenNow />
          <dl className={s.hours}>
            <div><dt>Luni–vineri</dt><dd className="num">12:00–20:00</dd></div>
            <div><dt>Sâmbătă–duminică</dt><dd className="num">10:00–18:00</dd></div>
          </dl>
          <div className={s.actions}>
            <a className="btn" href={BOUTIQUE.maps} target="_blank" rel="noopener">Deschide în hărți</a>
            <a className="btn btn-secondary" href={tel(BOUTIQUE.phone)}>Sună la boutique, <span className="num">{BOUTIQUE.phone}</span></a>
          </div>
          <p className="t-small muted">Comenzi online: <a className="link num" href={tel(BOUTIQUE.onlineOrders.phone)}>{BOUTIQUE.onlineOrders.phone}</a>, {BOUTIQUE.onlineOrders.hours}. E-mail: <a className="link" href={`mailto:${BOUTIQUE.email}`}>{BOUTIQUE.email}</a>.</p>
        </div>
      </section>

      {/* Digital → physical: the visitor's own list */}
      <section className="section" aria-labelledby="lista">
        <div className={s.head}>
          <h2 id="lista" className="t-2">Ce vii să încerci</h2>
          <p className="muted">Parfumurile și combinațiile marcate „De încercat în Casa Morph” în Finder, Descoperă sau Layering apar aici. Lista rămâne doar în acest browser; o deschizi pe telefon în boutique.</p>
        </div>
        <TryListPanel />
      </section>

      {/* What is in the boutique, in the system's own terms */}
      <section className="section" aria-labelledby="in-boutique">
        <div className={s.head}>
          <h2 id="in-boutique" className="t-2">De ce merită drumul</h2>
          <p className="muted">Un parfum se alege pe piele, în timp. Pe ecran vezi culoarea și notele; în boutique le simți evoluția.</p>
        </div>
        <div className={s.reasons}>
          <div>
            <h3 className="t-3">Colecțiile Morph</h3>
            <ul className={s.colls}>
              {ALL_BY_COLLECTION.map(c => (
                <li key={c}><span style={{ background: collectionChord(c) }} aria-hidden /><Link className="link" href={`/parfumuri/${c}`}>{COLLECTIONS[c].name}</Link> <span className="muted t-small">{COLLECTIONS[c].type.toLowerCase()}, {inCollection(c).length}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="t-3">Consilierea echipei</h3>
            <p className="muted">Recenziile Google ale magazinului (159 la momentul auditului) vorbesc mai ales despre oamenii din boutique și despre alegerea parfumului cu ajutorul lor.</p>
          </div>
          <div>
            <h3 className="t-3">Layering, pe loc</h3>
            <p className="muted">Adu combinația compusă online și încearc-o pe piele înainte de travel-uri sau sticle.</p>
            <Link className="link t-small" href="/layering">Compune o combinație</Link>
          </div>
        </div>
      </section>

      {/* Certilogo */}
      <section id="certilogo" className="section" aria-labelledby="certilogo-titlu">
        <div className={s.head}>
          <h2 id="certilogo-titlu" className="t-2">Original, verificabil</h2>
          <p className="muted">Fiecare parfum Morph cumpărat de pe site-ul oficial sau de la partenerii autorizați are un cod Certilogo unic pe ambalaj.</p>
        </div>
        <ol className={s.steps}>
          <li><span className="num t-micro muted">01</span><p>Caută codul Certilogo sau QR-ul dedicat pe cutia parfumului.</p></li>
          <li><span className="num t-micro muted">02</span><p>Intră pe <a className="link" href="https://www.certilogo.com" target="_blank" rel="noopener">certilogo.com</a> sau scanează QR-ul cu telefonul.</p></li>
          <li><span className="num t-micro muted">03</span><p>Introdu codul sau scanează pentru verificare.</p></li>
          <li><span className="num t-micro muted">04</span><p>Primești confirmarea că parfumul e original și vine din circuitul oficial Morph Parfum Italia.</p></li>
        </ol>
      </section>

      {/* The house */}
      <section className={`section ${s.story}`} aria-labelledby="povestea">
        <h2 id="povestea" className="t-2">Morph, din Napoli</h2>
        <p className="t-lede">Casă italiană de nișă, fondată în 2002 la Napoli de Andrea Angelino, pornind de la sinestezie: fiecare creație îmbină mirosuri, culori și emoții. Sticla, de la Bormioli Luigi, e răsucită ca să exprime „echilibru și mișcare continuă”.</p>
        <span className={s.palette} style={{ background: chord(perfumes) }} aria-hidden />
        <p className="t-small muted">Toate parfumurile Morph sunt unisex. Livrare gratuită de la {lei(FREE_SHIPPING)} pentru comenzile online; există și programul de fidelitate Morph Points.</p>
      </section>
    </div>
  );
}
