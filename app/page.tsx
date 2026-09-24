import Link from 'next/link';
import { HeroCampaign } from '@/components/HeroCampaign';
import { FeaturedFocus } from '@/components/FeaturedFocus';
import { LayeringComposer } from '@/components/LayeringComposer';
import { ProductVisual, Niche } from '@/components/ProductVisual';
import { Reveal } from '@/components/Reveal';
import { OpenNow } from '@/components/OpenNow';
import {
  perfumes, inCollection, COLLECTIONS, ALL_BY_COLLECTION, FAMILY_GROUPS, familyGroup, familyNotes, bestsellerMix, bySlug,
  travelFor, sampleSets, discoverySets, layeringSets, lei, FREE_SHIPPING, BOUTIQUE, collectionHref, productHref, sampleName,
} from '@/lib/catalog';
import s from './home.module.css';

// One object per collection for the collection vitrines (bestsellers from the snapshot).
const COLLECTION_FACE = { 'les-exclusifs': 'morph-n8-parfum-100ml', luxury: 'morph-vision-parfum-100ml', ice: 'morph-tonkatonic-100ml' } as const;
// The boutique wall: a few of the objects waiting in Bucharest (from all three collections).
const WALL = ['morph-too-parfum-100ml', 'morph-pure-soul-parfum-100ml', 'morph-oud-mafia-100ml', 'morph-kolonaki-parfum-100ml', 'morph-miyazawa-parfum-100ml', 'morph-gate-17-100ml'];

export default function Home() {
  const withTravel = perfumes.filter(p => travelFor(p));
  const samples = sampleSets.filter(x => x.inStock);
  const discovery = discoverySets().find(x => x.inStock);
  const picks = bestsellerMix(5);
  const lux = inCollection('luxury')[0].price;
  const antigua = bySlug('morph-antigua-bay-parfum-100ml');
  const n8 = bySlug('morph-n8-parfum-100ml');

  return (
    <>
      {/* IMAGE: the campaign */}
      <HeroCampaign />

      {/* OBJECT: the bottle as a sculpted piece */}
      <section className={`band ${s.object}`} aria-labelledby="obiect-titlu">
        <div className={`wrap ${s.objectGrid}`}>
          <Reveal className={s.objectMain}><ProductVisual p={antigua} image={2} sizes="(max-width: 899px) 100vw, 44vw" alt="Sticla Morph Antigua Bay, înclinată, cu forma răsucită vizibilă" className={s.objectNiche} /></Reveal>
          <Reveal className={s.objectSecond}><ProductVisual p={n8} image={0} sizes="(max-width: 899px) 60vw, 20vw" alt="Sticla Morph N8, din colecția Les Exclusifs" className={s.objectNiche} /></Reveal>
          <div className={s.objectText}>
            <p className="label muted">Obiectul</p>
            <h2 id="obiect-titlu" className="t-1">Echilibru și mișcare continuă.</h2>
            <p className="t-lede">Sticla Morph vine de la Bormioli Luigi. E răsucită, spune Morph, ca să exprime „ideea de echilibru și mișcare continuă”.</p>
            <dl className={s.facts}>
              <div><dt className="label muted">Casa</dt><dd>Napoli, fondată în 2002 de Andrea Angelino</dd></div>
              <div><dt className="label muted">Parfumurile</dt><dd>{perfumes.length}, toate unisex</dd></div>
              <div><dt className="label muted">Formate</dt><dd>100 ml; travel 2×8 ml pentru {withTravel.length} dintre ele</dd></div>
            </dl>
          </div>
        </div>
      </section>

      {/* COLLECTION: three vitrines in a wood wall */}
      <section className="band" data-tone="wood" aria-labelledby="colectii-titlu">
        <div className="wrap">
          <div className={s.head}>
            <h2 id="colectii-titlu" className="t-1">Trei colecții</h2>
            <p className="muted">Diferă prin concentrație și prin caracter. Fiecare vitrină deschide colecția ei.</p>
          </div>
          <ul className={s.vitrines}>
            {ALL_BY_COLLECTION.map(c => {
              const list = inCollection(c);
              const face = bySlug(COLLECTION_FACE[c]);
              const prices = [...new Set(list.map(p => p.price))];
              return (
                <li key={c}>
                  <Link href={collectionHref(c)} className={s.vitrine}>
                    <ProductVisual p={face} sizes="(max-width: 899px) 80vw, 30vw" alt="" className={s.vitrineNiche} />
                    <span className={s.vitrineName}>{COLLECTIONS[c].name}</span>
                    <span className="t-small">{COLLECTIONS[c].line}</span>
                    <span className="label muted">{COLLECTIONS[c].type} · {list.length} parfumuri · <span className="num">{prices.map(lei).join(' / ')}</span></span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* FRAGRANCE: the most chosen, one at a time */}
      <section className="band" aria-labelledby="alese-titlu">
        <div className="wrap">
          <div className={s.head}>
            <h2 id="alese-titlu" className="t-1">Cele mai alese</h2>
            <p className="muted">Bestsellerurile Morph, din toate cele trei colecții. Alege un nume ca să-l aduci în vitrină.</p>
          </div>
          <FeaturedFocus items={picks} />
        </div>
      </section>

      {/* FRAGRANCE language: families by their notes, not by a swatch */}
      <section className={`band ${s.familiesBand}`} aria-labelledby="familii-titlu">
        <div className="wrap">
          <div className={s.head}>
            <h2 id="familii-titlu" className="t-1">Găsește-ți familia</h2>
            <p className="muted">Cinci familii olfactive. Sub fiecare nume, notele care apar cel mai des în parfumurile ei și încadrările Morph pe care le reunește.</p>
          </div>
          <ol className={s.families}>
            {FAMILY_GROUPS.map(g => {
              const list = perfumes.filter(p => familyGroup(p)?.id === g.id);
              const members = [...new Set(list.map(p => p.family!))];
              return (
                <li key={g.id} className={s.family}>
                  <h3 className={s.familyName}><Link href={`/parfumuri?familie=${g.id}`}>{g.name}</Link></h3>
                  <p className={s.familyNotes}>{familyNotes(g.id, 4).join(', ')}</p>
                  <p className={`${s.familyMeta} t-small muted`}>Încadrări Morph: {members.join(', ')}. <span className="num">{list.length}</span> parfumuri.</p>
                  <ul className={s.familyObjects} aria-label={`Câteva parfumuri ${g.name}`}>
                    {list.slice(0, 3).map(p => (
                      <li key={p.slug}><Link href={productHref(p)} aria-label={p.shortName}><ProductVisual p={p} sizes="80px" alt="" className={s.mini} /><span className="t-micro">{p.shortName}</span></Link></li>
                    ))}
                  </ul>
                  <Link href={`/parfumuri?familie=${g.id}`} className={`${s.familyLink} link t-small`}>Toate cele {list.length}</Link>
                </li>
              );
            })}
          </ol>
          <div className={s.finder}>
            <p className="t-2">Nu știi de unde să pornești?</p>
            <p className="muted">Fragrance Finder: șapte întrebări despre prezență, anotimp și ocazie, cu logica Morph. La final vezi de ce ți se potrivește parfumul, cât costă și cum îl încerci.</p>
            <Link href="/descopera/finder" className="btn">Începe Fragrance Finder</Link>
          </div>
        </div>
      </section>

      {/* DISCOVERY: try at home, try in person */}
      <section id="incearca" className="band" aria-labelledby="incearca-titlu">
        <div className="wrap">
          <div className={s.head}>
            <h2 id="incearca-titlu" className="t-1">Încearcă înainte de sticlă</h2>
            <p className="muted">Un parfum se alege pe piele, în câteva zile. Morph are formatele pentru acasă și un boutique în București.</p>
          </div>
          <div className={s.tryGrid}>
            <article className={s.tryHome}>
              <Niche src="/morph/set-travel-morph-zeta-0.avif" alt="Set travel Morph Zeta, două flacoane de 8 ml" sizes="(max-width: 899px) 100vw, 30vw" className={s.tryNiche} />
              <div className={s.tryText}>
                <p className="label muted">Acasă</p>
                <h3 className="t-2">Travel 2×8 ml</h3>
                <p className="muted">Același parfum în două flacoane de 8 ml, <span className="num">{lei(travelFor(withTravel[0])!.price)}</span>. Există pentru {withTravel.length} din cele {perfumes.length} de parfumuri.</p>
                <ul className={s.tryList}>
                  {samples.map(x => <li key={x.slug}><span>{sampleName(x.slug)}</span><span className="num">{lei(x.price)}</span></li>)}
                  {discovery && <li><span>Discovery Travel, toate colecțiile</span><span className="num">{lei(discovery.price)}</span></li>}
                </ul>
                <Link className="link t-small" href="/descopera#incearca">Toate formatele de încercare</Link>
              </div>
            </article>
            <article className={s.tryShop} data-tone="wood">
              <p className="label muted">În persoană</p>
              <h3 className="t-2">{BOUTIQUE.name}</h3>
              <p>{BOUTIQUE.address}</p>
              <OpenNow />
              <p className="t-small muted num">{BOUTIQUE.hours.join(' · ')}</p>
              <p className="muted t-small">Parfumurile se încearcă pe piele, cu echipa Morph alături. Ce marchezi online „De încercat în Casa Morph” îți rămâne pe listă.</p>
              <Link className="btn btn-secondary" href="/casa-morph">Vezi Casa Morph</Link>
            </article>
          </div>
          <p className={`${s.threshold} t-small muted`}>Livrarea e gratuită de la {lei(FREE_SHIPPING)}. O sticlă Luxury ({lei(lux)}) împreună cu un travel trece pragul.</p>
        </div>
      </section>

      {/* LAYERING: the composition studio */}
      <section className="band" data-tone="dark" aria-labelledby="combina-titlu">
        <div className="wrap">
          <LayeringComposer first="morph-animal-parfum-100ml" second="morph-tonkatonic-100ml" heading="Două parfumuri, a treia formă." headingId="combina-titlu"
            intro="Identity, layer by layer. Alege două parfumuri Morph și vezi cum se așază notele lor una peste alta: deschiderea peste deschidere, baza peste bază." />
          <p className={`${s.ynf} t-small muted`}>Your Next Form: {layeringSets.map(x => x.state).join(', ')}.</p>
        </div>
      </section>

      {/* BOUTIQUE */}
      <section className="band" data-tone="wood" aria-labelledby="casa-titlu">
        <div className={`wrap ${s.house}`}>
          <div className={s.houseText}>
            <p className="label muted">București</p>
            <h2 id="casa-titlu" className="t-1">Casa Morph</h2>
            <p className="t-lede">Boutique-ul Morph din Piața Alexandru Lahovari. Aici parfumurile găsite pe ecran se încearcă pe piele.</p>
            <ul className={s.trust}>
              <li><span className="label muted">Original</span><span>Cod Certilogo pe fiecare cutie, verificabil online.</span></li>
              <li><span className="label muted">Livrare</span><span>Gratuită de la {lei(FREE_SHIPPING)}. Card, Apple Pay sau Google Pay.</span></li>
              <li><span className="label muted">Fidelitate</span><span>Morph Points, în contul de client.</span></li>
            </ul>
            <Link className="btn" href="/casa-morph">Vizitează Casa Morph</Link>
          </div>
          <ul className={s.wall} aria-label="Câteva dintre parfumurile Morph">
            {WALL.map(slug => {
              const p = bySlug(slug);
              return <li key={slug}><Link href={productHref(p)} aria-label={p.shortName}><ProductVisual p={p} sizes="(max-width: 899px) 30vw, 14vw" alt="" className={s.wallNiche} /></Link></li>;
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
