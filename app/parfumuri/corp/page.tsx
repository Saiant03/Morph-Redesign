import Link from 'next/link';
import { ViewTransition } from 'react';
import { SectionNav } from '@/components/SectionNav';
import { Ritual, ritualObjects, separate } from '@/components/Ritual';
import { Niche } from '@/components/ProductVisual';
import { ROOM_TABS } from '../CollectionPage';
import {
  ritualPerfumes, bodyItems, bySlug, COLLECTIONS, lei, bodyHref, HERO_SLUG, MORPH_SAYS, BODY_KIND,
  travelSets, travelFor, perfumes, sampleSets, layeringSets, giftBox, TRIAL, type BodyItem,
} from '@/lib/catalog';
import room from '../collection.module.css';
import s from './corp.module.css';

export const metadata = { title: 'Baie & Corp' };

const SET_SIZES = '(max-width: 599px) 46vw, (max-width: 899px) 30vw, 17vw';

/**
 * Baie & Corp as a room of the same world (docs/design/phase-c2-bath-body-ritual.md). Its window is not a
 * photograph but one scent standing in its three textures on the night stage; below, every scent's ritual on a
 * stone shelf, then Morph's Coffret sets in the walnut cabinet, then the other sets Morph sells, each where it is
 * served. Only Morph's own words link body and perfume.
 */
export default function Page() {
  const hero = bySlug(HERO_SLUG);
  // rituals with all three textures first, so the shelves of two keep together at the end
  const list = ritualPerfumes().map(p => ({ p, n: ritualObjects(p).length })).sort((a, z) => z.n - a.n).map(x => x.p);
  const gels = bodyItems.filter(b => b.kind === 'gel').length, creams = bodyItems.filter(b => b.kind === 'cream').length;
  const coffret = (['set-gel', 'set-cream'] as const).map(k => ({ k, sets: bodyItems.filter(b => b.kind === k && b.scent) }));
  const withTravel = perfumes.filter(p => travelFor(p));
  const samples = sampleSets.filter(x => x.inStock);

  return (
    <>
      <section className={room.room} aria-labelledby="corp-titlu">
        <ViewTransition name="room-image" share={{ 'enter-room': 'room-enter', default: 'room' }} default="none">
          <div className={s.window} data-tone="dark">
            <div className="wrap">
              <Ritual p={hero} size="monument" />
            </div>
          </div>
        </ViewTransition>
        <div className={`wrap ${room.plateRow}`}>
          <div className={room.plate}>
            <nav className={`${room.crumb} t-small muted`} aria-label="Breadcrumb"><Link href="/">Morph</Link><span aria-hidden>/</span><Link href="/parfumuri">Parfumuri</Link><span aria-hidden>/</span><span aria-current="page">Baie & Corp</span></nav>
            <ViewTransition name="room-title" share="room-title" default="none">
              <h1 id="corp-titlu" className={`t-display ${room.title}`}>Baie & Corp</h1>
            </ViewTransition>
            <p className="t-lede">Același parfum în trei texturi: parfumul de 100 ml, gelul de duș și crema de corp. Deasupra, {hero.shortName}.</p>
            <p className="label muted num">{list.length} parfumuri · {gels} geluri de duș · {creams} creme de corp</p>
          </div>
          <SectionNav label="Colecții" current="/parfumuri/corp" items={ROOM_TABS} types={['room']} />
        </div>
      </section>

      <section id="ritualuri" className={`wrap ${s.rituals}`} aria-labelledby="ritualuri-titlu">
        <div className={s.intro}>
          <h2 id="ritualuri-titlu" className={s.h2}>Ritualurile</h2>
          <figure className={s.quote}>
            <blockquote><p>„{MORPH_SAYS.creams}”</p></blockquote>
            <figcaption className="t-micro muted">Despre cremele de corp, pagina Despre noi, morphparfum.ro</figcaption>
          </figure>
        </div>
        <nav className={s.index} aria-label="Ritualurile, după parfum">
          {list.map(p => <a key={p.slug} href={`#ritual-${p.slug}`}>{p.shortName}</a>)}
        </nav>
        <ul className={s.groups}>
          {list.map(p => (
            <li key={p.slug} id={`ritual-${p.slug}`} className={s.group} aria-labelledby={`r-${p.slug}`}>
              <header className={s.groupHead}>
                <h3 id={`r-${p.slug}`} className={s.name}>{p.shortName}</h3>
                <p className="t-small muted">{COLLECTIONS[p.collection].name}</p>
              </header>
              {/* the hero scent is already on the window; its shelf here keeps no transition names */}
              <Ritual p={p} size="room" vt={p.slug !== hero.slug} />
            </li>
          ))}
        </ul>
      </section>

      <section id="coffret" className={s.coffret} data-tone="wood" aria-labelledby="coffret-titlu">
        <div className="wrap">
          <div className={s.intro}>
            <div className={s.coffretHead}>
              <h2 id="coffret-titlu" className={s.h2}>Coffret</h2>
              <p className="muted">Parfumul de 100 ml și gelul de duș sau crema de corp de 200 ml ale aceluiași parfum, în aceeași cutie.</p>
            </div>
            <figure className={s.quote}>
              <blockquote><p>„{MORPH_SAYS.creamSets}”</p></blockquote>
              <figcaption className="t-micro muted">Despre seturile cu cremă, pagina Despre noi, morphparfum.ro</figcaption>
            </figure>
          </div>
          {coffret.map(({ k, sets }) => (
            <div key={k} className={s.setGroup}>
              <div className={s.setHead}>
                <h3 className={s.setTitle}>{k === 'set-gel' ? 'Parfum și gel de duș' : 'Parfum și cremă de corp'}</h3>
                <p className="t-small muted num">{sets.filter(b => b.inStock).length} din {sets.length} în stoc</p>
              </div>
              <ul className={s.sets} style={{ '--n': sets.length } as React.CSSProperties} aria-label={BODY_KIND[k].name}>
                {sets.map(b => <SetItem key={b.slug} b={b} />)}
              </ul>
            </div>
          ))}
          {giftBox && <p className={`${s.gift} t-small`}>Cutia cadou Morph, {lei(giftBox.price)}, se adaugă din coș. Pentru cineva care își alege singur parfumul: <Link className="link" href="/cadouri#card">gift card</Link>.</p>}
        </div>
      </section>

      <section className={`wrap ${s.more}`} aria-labelledby="seturi-titlu">
        <h2 id="seturi-titlu" className={s.h2}>Alte seturi Morph</h2>
        <ul className={s.moreList}>
          <li>
            <Link href="/descopera#travel" className={s.moreLink}><span className={s.moreName}>Travel Editions</span><span className="t-small muted">Același parfum în două flacoane de 8 ml, pentru drum. {withTravel.length} parfumuri.</span><span className="num t-small">{lei(travelSets.find(t => /2x8/.test(t.slug))!.price)}</span></Link>
          </li>
          <li>
            <Link href="/descopera#incearca" className={s.moreLink}><span className={s.moreName}>Mostre și Discovery</span><span className="t-small muted">{samples.map(x => TRIAL[x.slug]?.name).filter(Boolean).join(', ')}; Discovery Travel în flacoane de 8 ml.</span><span className="num t-small">de la {lei(Math.min(...samples.map(x => x.price)))}</span></Link>
          </li>
          <li>
            <Link href="/layering/your-next-form" className={s.moreLink}><span className={s.moreName}>Your Next Form</span><span className="t-small muted">{layeringSets.length} seturi layering blind, 2×8 ml.</span><span className="num t-small">{lei(layeringSets[0].price)}</span></Link>
          </li>
        </ul>
      </section>
    </>
  );
}

/** A Coffret box in its recess on the walnut wall; into its own page the box becomes the stage. */
function SetItem({ b }: { b: BodyItem }) {
  const p = bySlug(b.scent!);
  const sum = separate(p, b);
  return (
    <li className={b.inStock ? undefined : s.soldout}>
      <Link href={bodyHref(b)} className={s.setItem}>
        <ViewTransition name={`obj-${b.slug}`} share="morph" default="none">
          <Niche src={b.image} alt="" sizes={SET_SIZES} className={s.niche} />
        </ViewTransition>
        <span className={s.setLabel}>
          <span className={s.setName}><span className="sr-only">{BODY_KIND[b.kind].name}, </span>{p.shortName}</span>
          <span className="t-micro num">{lei(b.price)}{sum && sum > b.price ? <span className="muted"> · <span className={s.nowrap}>separat {lei(sum)}</span></span> : null}{b.inStock ? '' : <span className="muted"> · <span className={s.nowrap}>stoc epuizat</span></span>}</span>
        </span>
      </Link>
    </li>
  );
}
