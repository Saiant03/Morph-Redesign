import Link from 'next/link';
import Image from 'next/image';
import { HeroCampaign } from '@/components/HeroCampaign';
import { CollectionWorlds } from '@/components/CollectionWorlds';
import { Lookbook } from '@/components/Lookbook';
import { ProductVisual } from '@/components/ProductVisual';
import { Reveal } from '@/components/Reveal';
import { OpenNow } from '@/components/OpenNow';
import {
  perfumes, FAMILY_GROUPS, familyGroup, familyNotes, bestsellerMix, bySlug, bodyFor, BODY_KIND, travelFor, sampleSets, discoverySets,
  layeringSets, lei, FREE_SHIPPING, BOUTIQUE, HERO_SLUG, productHref, sampleName,
} from '@/lib/catalog';
import s from './home.module.css';

// The ritual example: a perfume Morph sells as perfume, shower gel and body cream.
const RITUAL = 'morph-zeta-parfum-100ml';

/**
 * Home as a campaign in six movements (docs/design/phase-05-5-creative-upgrade-plan.md §8):
 * entrance · three worlds · most chosen · form · rituals · the shop. Each has its own anatomy.
 */
export default function Home() {
  const withTravel = perfumes.filter(p => travelFor(p));
  const samples = sampleSets.filter(x => x.inStock);
  const discovery = discoverySets().find(x => x.inStock);
  const picks = bestsellerMix(5, [HERO_SLUG]);
  const ritual = bySlug(RITUAL);
  const ritualBody = bodyFor(ritual).filter(b => b.kind === 'gel' || b.kind === 'cream');

  return (
    <>
      {/* 1 ENTRANCE: the motto and one bottle standing in the dark room */}
      <HeroCampaign />

      {/* 2 THREE WORLDS: Morph's campaigns as the environment of each collection */}
      <CollectionWorlds />

      {/* 3 MOST CHOSEN: a lookbook, one bottle per spread */}
      <section className={`band ${s.lookBand}`} data-tone="dark" aria-labelledby="alese-titlu">
        <h2 id="alese-titlu" className={`wrap t-1 ${s.lookTitle}`}>Cele mai alese</h2>
        <Lookbook items={picks} />
      </section>

      {/* 4 FORM: the Bormioli bottle, one image cropped to the glass */}
      <section className={`band ${s.form}`} aria-labelledby="forma-titlu">
        <div className={`wrap ${s.formGrid}`}>
          <Reveal crop className={s.formImage}>
            <Image src="/morph/campaign/luxury-flatlay.avif" alt="Sticle Morph Luxury, una peste alta: sticla răsucită de la Bormioli Luigi" fill sizes="(max-width: 899px) 100vw, 60vw" />
          </Reveal>
          <div className={s.formText}>
            <p className="label muted">Obiectul</p>
            <h2 id="forma-titlu" className="t-1">Echilibru și mișcare continuă.</h2>
            <p className="t-lede">Sticla Morph vine de la Bormioli Luigi. E răsucită, spune Morph, ca să exprime „ideea de echilibru și mișcare continuă”.</p>
            <dl className={s.facts}>
              <div><dt className="label muted">Casa</dt><dd>Napoli, fondată în 2002 de Andrea Angelino</dd></div>
              <div><dt className="label muted">Parfumurile</dt><dd>{perfumes.length}, toate unisex</dd></div>
              <div><dt className="label muted">Formate</dt><dd>100 ml; travel 2×8 ml pentru {withTravel.length} dintre ele</dd></div>
            </dl>
          </div>
        </div>
      </section>

      {/* 5 RITUALS: discover by notes, compose two, wear one scent in three textures */}
      <section className={`band ${s.rituals}`} aria-labelledby="ritualuri-titlu">
        <div className="wrap">
          <h2 id="ritualuri-titlu" className={`t-display ${s.ritualsTitle}`}>Trei ritualuri</h2>
          <div className={s.ritualGrid}>
            <article className={s.ritual} aria-labelledby="r-descopera">
              <p className="label muted">Descoperă</p>
              <h3 id="r-descopera" className="t-2">Cinci familii, scrise în note.</h3>
              <ul className={s.familyList}>
                {FAMILY_GROUPS.map(g => (
                  <li key={g.id}>
                    <Link href={`/parfumuri?familie=${g.id}`}>
                      <span className={s.familyName}>{g.name}</span>
                      <span className="t-small muted">{familyNotes(g.id, 3).join(', ')}</span>
                      <span className="t-micro muted num">{perfumes.filter(p => familyGroup(p)?.id === g.id).length}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/descopera/finder" className="btn btn-secondary">Fragrance Finder, 7 întrebări</Link>
            </article>

            <article className={s.ritual} aria-labelledby="r-layering">
              <p className="label muted">Layering</p>
              <div className={s.ritualImage}>
                <Image src="/morph/campaign/ynf-box-in-hand.avif" alt="Cutia Your Next Form deschisă, cu două flacoane de 8 ml, ținută în mână" fill sizes="(max-width: 899px) 100vw, 32vw" />
              </div>
              <h3 id="r-layering" className="t-2">Două parfumuri, a treia formă.</h3>
              <p className="muted">Your Next Form: {layeringSets.length} seturi blind de 2×8 ml, {lei(layeringSets[0].price)}. „Identitatea parfumurilor este dezvăluită doar la deschiderea cutiei.”</p>
              <p className={s.links}><Link className="link" href="/layering">Compune o pereche</Link><Link className="link" href="/layering/your-next-form">Your Next Form</Link></p>
            </article>

            <article className={s.ritual} aria-labelledby="r-corp">
              <p className="label muted">Baie & Corp</p>
              <ul className={s.textures} aria-label={`${ritual.shortName} în trei texturi`}>
                <li><ProductVisual p={ritual} sizes="120px" alt="" className={s.texture} /><span className="t-micro">Parfum</span></li>
                {ritualBody.map(b => (
                  <li key={b.slug}><span className={`niche-sm ${s.texture}`}>{b.image && <Image src={b.image} alt="" fill sizes="120px" />}</span><span className="t-micro">{BODY_KIND[b.kind].name}</span></li>
                ))}
              </ul>
              <h3 id="r-corp" className="t-2">Același parfum, în trei texturi.</h3>
              <p className="muted">Cremele de corp Morph sunt, spune Morph, „perfecte pentru a fi utilizate împreună cu parfumul preferat”. {ritual.shortName}: gel de duș {lei(ritualBody.find(b => b.kind === 'gel')?.price ?? 0)}, cremă {lei(ritualBody.find(b => b.kind === 'cream')?.price ?? 0)}.</p>
              <p className={s.links}><Link className="link" href="/parfumuri/corp">Baie & Corp</Link><Link className="link" href={productHref(ritual)}>{ritual.shortName}</Link></p>
            </article>
          </div>
        </div>
      </section>

      {/* 6 THE SHOP: a walnut room; the two ways to try before the bottle */}
      <section className={`band ${s.shop}`} data-tone="wood" aria-labelledby="magazin-titlu">
        <div className={`wrap ${s.shopGrid}`}>
          <div className={s.shopText}>
            <p className="label muted">București</p>
            <h2 id="magazin-titlu" className="t-display">Magazinul Morph</h2>
            <p className="t-lede">{BOUTIQUE.address}</p>
            <OpenNow />
            <p className="t-small muted num">{BOUTIQUE.hours.join(' · ')}</p>
            <Link className="btn" href={BOUTIQUE.href}>Vizitează magazinul</Link>
          </div>
          <div className={s.tryPair}>
            <h3 className={`label ${s.tryHead}`}>Încearcă înainte de sticlă</h3>
            <div className={s.try}>
              <p className={s.tryName}>Acasă</p>
              <ul className={`${s.tryList} t-small`}>
                <li><span>Travel 2×8 ml, același parfum</span><span className="num">{lei(travelFor(withTravel[0])!.price)}</span></li>
                {samples.map(x => <li key={x.slug}><span>{sampleName(x.slug)}</span><span className="num">{lei(x.price)}</span></li>)}
                {discovery && <li><span>Discovery Travel, toate colecțiile</span><span className="num">{lei(discovery.price)}</span></li>}
              </ul>
              <Link className="link t-small" href="/descopera#incearca">Toate formatele de încercare</Link>
            </div>
            <div className={s.try}>
              <p className={s.tryName}>În magazin</p>
              <p className="t-small">Pe piele, cu echipa Morph alături. Ce marchezi online „De încercat în magazin” rămâne pe o listă pe care o arăți pe telefon.</p>
            </div>
            <ul className={`${s.trust} t-small`}>
              <li><span className="label muted">Original</span><span>Cod Certilogo pe fiecare cutie, verificabil online.</span></li>
              <li><span className="label muted">Livrare</span><span>Gratuită de la {lei(FREE_SHIPPING)}. Card, Apple Pay sau Google Pay.</span></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
