import Link from 'next/link';
import { ViewTransition } from 'react';
import { SectionNav } from '@/components/SectionNav';
import { Ritual } from '@/components/Ritual';
import { ROOM_TABS } from '../CollectionPage';
import { ritualPerfumes, bodyItems, COLLECTIONS, descriptor, productHref } from '@/lib/catalog';
import s from './corp.module.css';

export const metadata = { title: 'Baie & Corp' };

/**
 * Body & Bath as the ritual of a scent, not a product category: every perfume Morph also sells as a shower gel
 * and/or a body cream, with its textures side by side and the sets that combine them. Only Morph's own link
 * between body and perfume is stated (About: the creams are made to be worn with the perfume).
 */
export default function Page() {
  const list = ritualPerfumes();
  const gels = bodyItems.filter(b => b.kind === 'gel').length, creams = bodyItems.filter(b => b.kind === 'cream').length;
  return (
    <>
      <section className={s.head} aria-labelledby="corp-titlu">
        <div className={`wrap ${s.headGrid}`}>
          <div className={s.plate}>
            <nav className={`${s.crumb} t-small muted`} aria-label="Breadcrumb"><Link href="/">Morph</Link><span aria-hidden>/</span><Link href="/parfumuri">Parfumuri</Link><span aria-hidden>/</span><span aria-current="page">Baie & Corp</span></nav>
            <ViewTransition name="room-title" share="room-title" default="none">
              <h1 id="corp-titlu" className="t-display">Baie & Corp</h1>
            </ViewTransition>
            <p className="t-lede">Același parfum, în trei texturi: gel de duș, cremă de corp și parfumul de 100 ml.</p>
            <p className="label muted num">{list.length} parfumuri · {gels} geluri de duș · {creams} creme de corp · 200 ml</p>
          </div>
          <figure className={s.quote}>
            <blockquote><p>Cremele de corp sunt „perfecte pentru a fi utilizate împreună cu parfumul preferat Morph, accentuând persistența acestuia”.</p></blockquote>
            <figcaption className="t-micro muted">Din pagina Despre noi, morphparfum.ro</figcaption>
          </figure>
          <SectionNav label="Colecții" current="/parfumuri/corp" items={ROOM_TABS} types={['room']} />
        </div>
      </section>

      <ol className={`wrap ${s.rituals}`}>
        {list.map(p => (
            <li key={p.slug} className={s.ritual}>
              <div className={s.name}>
                <h2 className="t-2"><Link href={productHref(p)}>{p.shortName}</Link></h2>
                <p className="label muted">{COLLECTIONS[p.collection].name}</p>
                <p className="t-small muted">{descriptor(p)}</p>
              </div>
              <div className={s.set}><Ritual p={p} /></div>
            </li>
        ))}
      </ol>
    </>
  );
}
