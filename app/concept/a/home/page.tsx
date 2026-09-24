import Link from 'next/link';
import { Header, Footer, Card } from '../_ui';
import { Hero } from '../_hero';
import { Composer } from '../_composer';
import { COLLECTIONS, ALL_BY_COLLECTION, inCollection, tone, onColor, bestsellerMix, travelSets, sampleSets, layeringSets, lei, BOUTIQUE, FREE_SHIPPING, perfumes } from '@/lib/catalog';
import s from '../cromatic.module.css';

export const metadata = { title: 'A — Cromatic · Home' };

export default function Home() {
  const minFull = Math.min(...perfumes.map(p => p.price));
  const maxFull = Math.max(...perfumes.map(p => p.price));
  const travelFrom = Math.min(...travelSets.filter(t => /2x8|set-travel/.test(t.slug)).map(t => t.price));
  const samples = sampleSets.filter(x => x.inStock);
  const picks = bestsellerMix(4, ['morph-zeta-parfum-100ml']);

  return (
    <>
      <Header />
      <main>
        <Hero />

        <section className={`${s.wrap} ${s.section}`} aria-labelledby="colectii">
          <div className={s.sectionHead}>
            <h2 id="colectii" className={s.h2}>Trei colecții, trei registre de culoare</h2>
            <p>Les Exclusifs trece din negru în chihlimbar. Luxury poartă câte o culoare pe etichetă. Ice e mat și pastelat. Treci peste o culoare pentru nume.</p>
          </div>
          {ALL_BY_COLLECTION.map(c => {
            const list = inCollection(c);
            return (
              <div key={c} className={s.collRow}>
                <div className={s.collName}><h3 className={s.h3}>{COLLECTIONS[c].name}</h3></div>
                <p className={s.collMeta}>{COLLECTIONS[c].type} · {list.length} parfumuri<br />{COLLECTIONS[c].line}</p>
                <div className={s.chord}>
                  {list.map(p => {
                    const col = tone(p).identity;
                    return (
                      <Link key={p.slug} href={`/concept/a/product?p=${p.slug}`} style={{ '--sw': col, '--on': onColor(col) } as React.CSSProperties} aria-label={p.shortName}>
                        <span>{p.shortName}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <p style={{ marginTop: 24 }}><Link href="/concept/a/collection" className={s.textLink}>Vezi colecția Luxury</Link></p>
        </section>

        <section id="descopera" className={`${s.wrap} ${s.section}`} aria-labelledby="drum">
          <div className={s.sectionHead}>
            <h2 id="drum" className={s.h2}>De la prima mostră la al doilea strat</h2>
            <p>Ce face consultantul din Casa Morph, pe pași: afli ce ți se potrivește, încerci, alegi, apoi combini.</p>
          </div>
          <div className={s.journey}>
            <div className={s.step}>
              <span className={s.stepNum}>1</span><h3 className={s.h3}>Găsește</h3>
              <p className={s.stepBody}>Șapte întrebări despre prezență, anotimp și ocazie. Primești două sau trei parfumuri potrivite.</p>
              <a href="https://morphparfum.ro/quiz" className={s.stepOffer}><b>Fragrance Finder</b> <span className={s.textLink}>Începe</span></a>
            </div>
            <div className={s.step}>
              <span className={s.stepNum}>2</span><h3 className={s.h3}>Încearcă</h3>
              <p className={s.stepBody}>Înainte de o sticlă de 100 ml, poartă parfumul câteva zile.</p>
              <span className={s.stepOffer}><b>Travel 2×8 ml</b> de la {lei(travelFrom)}<br /><b>Set de mostre</b> {samples.map(x => lei(x.price)).filter((v, i, a) => a.indexOf(v) === i).join(' / ')}, câte unul pe colecție</span>
            </div>
            <div className={s.step}>
              <span className={s.stepNum}>3</span><h3 className={s.h3}>Alege</h3>
              <p className={s.stepBody}>Sticla de 100 ml, cu autenticitate verificabilă prin Certilogo.</p>
              <span className={s.stepOffer}><b>100 ml</b> {lei(minFull)} – {lei(maxFull)}</span>
            </div>
            <div className={s.step}>
              <span className={s.stepNum}>4</span><h3 className={s.h3}>Combină</h3>
              <p className={s.stepBody}>Două parfumuri purtate împreună devin o a treia semnătură.</p>
              <span className={s.stepOffer}><b>Your Next Form</b> {layeringSets.length} seturi blind, {lei(layeringSets[0].price)}</span>
            </div>
          </div>
        </section>

        <section id="layering" className={`${s.wrap} ${s.section}`} aria-label="Layering">
          <Composer first="morph-zeta-parfum-100ml" second="morph-vapor-parfum-100ml" />
        </section>

        <section id="cadouri" className={`${s.wrap} ${s.section}`} aria-labelledby="best">
          <div className={s.sectionHead}>
            <h2 id="best" className={s.h2}>Cele mai alese</h2>
            <p>Bestsellerurile Morph, fiecare cu culoarea sticlei lui.</p>
          </div>
          <div className={s.cards}>{picks.map(p => <Card key={p.slug} p={p} />)}</div>
        </section>

        <section id="casa-morph" className={`${s.wrap} ${s.section}`} aria-labelledby="casa">
          <div className={s.sectionHead}>
            <h2 id="casa" className={s.h2}>Casa Morph, București</h2>
            <p>Parfumurile se pot încerca și în boutique, cu ajutorul echipei.</p>
          </div>
          <div className={s.trust}>
            <div><h3 className={s.h3}>{BOUTIQUE.address}</h3><p>{BOUTIQUE.hours.join(' · ')}</p></div>
            <div><h3 className={s.h3}>Original, verificabil</h3><p>Fiecare parfum are un cod Certilogo care confirmă online că provine din circuitul oficial Morph.</p></div>
            <div><h3 className={s.h3}>Livrare gratuită</h3><p>Pentru comenzile de peste {lei(FREE_SHIPPING)}. Plata cu cardul, Apple Pay sau Google Pay.</p></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
