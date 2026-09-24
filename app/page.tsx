import Link from 'next/link';
import Image from 'next/image';
import { ScentAtlas } from '@/components/ScentAtlas';
import { CollectionPreview } from '@/components/CollectionPreview';
import { ProductCard } from '@/components/ProductCard';
import { LayeringComposer } from '@/components/LayeringComposer';
import {
  perfumes, inCollection, COLLECTIONS, ALL_BY_COLLECTION, FAMILY_GROUPS, familyGroup, familyNotes, bestsellerMix,
  travelFor, sampleSets, discoverySets, layeringSets, lei, FREE_SHIPPING, BOUTIQUE, collectionHref, productHref,
} from '@/lib/catalog';
import { collectionChord, scentTokens } from '@/lib/scent';
import s from './home.module.css';

export default function Home() {
  const withTravel = perfumes.filter(p => travelFor(p));
  const samples = sampleSets.filter(x => x.inStock);
  const discovery = discoverySets().find(x => x.inStock);
  const picks = bestsellerMix(4, ['morph-zeta-parfum-100ml']);
  const lux = inCollection('luxury')[0].price;

  return (
    <>
      <ScentAtlas />

      {/* What Morph sells: three collections, each read as the chord of its colors */}
      <section className={`wrap ${s.collections}`} aria-labelledby="colectii">
        <h2 id="colectii" className="sr-only">Colecțiile Morph</h2>
        {ALL_BY_COLLECTION.map(c => {
          const list = inCollection(c);
          return (
            <Link key={c} href={collectionHref(c)} className={s.coll}>
              <span className={s.collChord} style={{ background: collectionChord(c) }} aria-hidden />
              <span className="t-3">{COLLECTIONS[c].name}</span>
              <span className="t-small">{COLLECTIONS[c].line}</span>
              <span className="t-small muted">{COLLECTIONS[c].type}, {list.length} parfumuri, <span className="num">{lei(list[0].price)}</span></span>
            </Link>
          );
        })}
      </section>

      {/* FIND */}
      <section id="gaseste" className="wrap section" aria-labelledby="gaseste-titlu">
        <div className={s.head}>
          <h2 id="gaseste-titlu" className="t-2">Găsește-ți familia</h2>
          <p className="muted">Cinci familii olfactive, fiecare cu gama ei de culori. Notele de sub nume sunt cele care apar cel mai des în familia respectivă.</p>
        </div>
        {FAMILY_GROUPS.map(g => {
          const list = perfumes.filter(p => familyGroup(p)?.id === g.id);
          return (
            <CollectionPreview key={g.id} title={g.name} href={`/parfumuri?familie=${g.id}`} count={list.length} items={list}>
              {familyNotes(g.id).join(', ')}
            </CollectionPreview>
          );
        })}
        <div className={s.finder}>
          <p className="t-3">Nu știi de unde să pornești?</p>
          <p className="muted">Șapte întrebări despre prezență, anotimp și ocazie. Primești două sau trei parfumuri potrivite.</p>
          <Link href="/descopera/finder" className="btn btn-secondary">Începe Fragrance Finder</Link>
        </div>
      </section>

      {/* TRY */}
      <section id="incearca" className="wrap section" aria-labelledby="incearca-titlu">
        <div className={s.head}>
          <h2 id="incearca-titlu" className="t-2">Încearcă înainte de sticlă</h2>
          <p className="muted">Un parfum se alege pe piele, în câteva zile. Morph are deja formatele pentru asta.</p>
        </div>
        <div className={s.offers}>
          <article className={s.offer}>
            <div className={s.offerVisual}><Image src="/morph/set-travel-morph-zeta-0.avif" alt="Set travel Morph Zeta, 2×8 ml" fill sizes="(max-width: 899px) 100vw, 33vw" /></div>
            <h3 className="t-3">Travel 2×8 ml</h3>
            <p className="t-small muted">Același parfum, în două flacoane de 8 ml. Există pentru {withTravel.length} din cele {perfumes.length} de parfumuri.</p>
            <ul className={s.travelList} aria-label="Parfumuri cu variantă travel">
              {withTravel.map(p => (
                <li key={p.slug}><Link href={productHref(p)} className={s.travelChip}><span className="swatch" style={{ '--scent': scentTokens(p).scent } as React.CSSProperties} />{p.shortName}</Link></li>
              ))}
            </ul>
            <p className={`${s.price} num`}>{lei(travelFor(withTravel[0])!.price)}</p>
          </article>
          {samples.map(x => (
            <article key={x.slug} className={s.offer}>
              <div className={s.offerVisual}><Image src={x.image!} alt="" fill sizes="(max-width: 899px) 100vw, 33vw" /></div>
              <h3 className="t-3">Setul de mostre {/luxury/.test(x.slug) ? 'Luxury' : 'Les Exclusifs & Ice'}</h3>
              <p className="t-small muted">Mostre din întreaga colecție, ca să compari acasă înainte de 100 ml.</p>
              <p className={s.offerFoot}><span className={`${s.price} num`}>{lei(x.price)}</span> <a className="link t-small" href={x.url}>Vezi setul</a></p>
            </article>
          ))}
        </div>
        <p className={`${s.threshold} t-small`}>
          Livrarea e gratuită de la {lei(FREE_SHIPPING)}. O sticlă Luxury ({lei(lux)}) împreună cu un travel trece pragul.
          {discovery && <> Pentru toată gama: <a className="link" href={discovery.url}>setul Discovery Travel</a>, {lei(discovery.price)}.</>}
        </p>
      </section>

      {/* BUY */}
      <section id="cumpara" className="wrap section" aria-labelledby="cumpara-titlu">
        <div className={s.head}>
          <h2 id="cumpara-titlu" className="t-2">Cele mai alese</h2>
          <p className="muted">Bestsellerurile Morph, din toate cele trei colecții.</p>
        </div>
        <div className={s.cards}>{picks.map(p => <ProductCard key={p.slug} p={p} />)}</div>
      </section>

      {/* COMBINE */}
      <section id="combina" className="wrap section" aria-labelledby="combina-titlu">
        <LayeringComposer first="morph-zeta-parfum-100ml" second="morph-vapor-parfum-100ml" heading="Două parfumuri, a treia formă" headingId="combina-titlu" />
        <div className={s.ynf}>
          <p className="t-small muted"><Link className="link" href="/layering/your-next-form">Your Next Form</Link>, seturile blind de layering Morph:</p>
          <ul className="t-small muted">{layeringSets.map(x => <li key={x.slug}>{x.state}</li>)}</ul>
        </div>
      </section>

      {/* Casa Morph and trust */}
      <section id="casa-morph" className="wrap section" aria-labelledby="casa-titlu">
        <div className={s.head}>
          <h2 id="casa-titlu" className="t-2">Casa Morph, București</h2>
          <p className="muted">Parfumurile se pot încerca în boutique, cu echipa Morph alături. <Link className="link" href="/casa-morph">Vezi Casa Morph</Link></p>
        </div>
        <div className={s.trust}>
          <div><h3 className="t-3">{BOUTIQUE.address}</h3><p className="muted">{BOUTIQUE.hours.join(', ')}</p></div>
          <div><h3 className="t-3">Original, verificabil</h3><p className="muted">Fiecare parfum are un cod Certilogo care confirmă online că vine din circuitul oficial Morph.</p></div>
          <div><h3 className="t-3">Livrare și plată</h3><p className="muted">Livrare gratuită de la {lei(FREE_SHIPPING)}. Card, Apple Pay sau Google Pay.</p></div>
          <div><h3 className="t-3">Morph Points</h3><p className="muted">Programul de fidelitate Morph, în contul tău de client.</p></div>
        </div>
      </section>
    </>
  );
}
