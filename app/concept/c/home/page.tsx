import Link from 'next/link';
import { Header, Footer, Card } from '../_ui';
import { Hero, Composer } from '../_interactive';
import { bySlug, inCollection, bestsellerMix, travelSets, sampleSets, layeringSets, lei, BOUTIQUE, FREE_SHIPPING, perfumes, COLLECTIONS, HERO_SLUG, veilTint, type CollectionId } from '@/lib/catalog';
import s from '../strata.module.css';

export const metadata = { title: 'C — Strata · Home' };

const SHEETS: { id: CollectionId; bottles: string[] }[] = [
  { id: 'les-exclusifs', bottles: ['morph-animal-parfum-100ml', 'morph-n8-parfum-100ml'] },
  { id: 'luxury', bottles: ['morph-vapor-parfum-100ml', 'morph-kolonaki-parfum-100ml'] },
  { id: 'ice', bottles: ['morph_disumano_parfum_100ml', 'morph-tonkatonic-100ml'] },
];

export default function Home() {
  const travelFrom = Math.min(...travelSets.filter(t => /2x8|set-travel/.test(t.slug)).map(t => t.price));
  const sample = sampleSets.find(x => x.inStock)!;
  const prices = perfumes.map(p => p.price);
  const layerTints = ['#ece7e3', '#e6dbd6', '#dccdc5', '#d3c1b7'];
  return (
    <>
      <Header />
      <main>
        <Hero p={bySlug(HERO_SLUG)} />

        <section className={`${s.wrap} ${s.section}`} aria-labelledby="col">
          <div className={s.head}><h2 id="col" className={s.serif}>Trei colecții, suprapuse</h2><p>Les Exclusifs, Luxury și Ice. Aceeași casă, trei concentrații și trei temperamente.</p></div>
          <div className={s.sheets}>
            {SHEETS.map(({ id, bottles }) => {
              const bs = bottles.map(bySlug);
              return (
                <Link key={id} href={`/concept/c/collection?c=${id}`} className={s.sheet} style={{ '--tint': `${veilTint(bs[0], 0.34)}e6` } as React.CSSProperties}>
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <h3 className={s.serif}>{COLLECTIONS[id].name}</h3>
                    <p>{COLLECTIONS[id].type}. {COLLECTIONS[id].line}</p>
                  </div>
                  <div className={s.sheetBottles} aria-hidden>{bs.map(b => <img key={b.slug} src={b.images[0]} alt="" width={768} height={960} loading="lazy" />)}</div>
                  <span className={s.sheetFoot}>{inCollection(id).length} parfumuri · vezi colecția</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section id="descopera" className={`${s.wrap} ${s.section}`} aria-labelledby="drum">
          <div className={s.head}><h2 id="drum" className={s.serif}>Un parfum se alege în straturi</h2><p>Afli ce ți se potrivește, încerci, alegi sticla, apoi adaugi un al doilea strat.</p></div>
          <div className={s.layers}>
            {[
              { t: 'Găsește', p: 'Șapte întrebări despre prezență, univers olfactiv, ocazie și anotimp.', o: <a href="https://morphparfum.ro/quiz" style={{ textDecoration: 'underline' }}>Fragrance Finder</a> },
              { t: 'Încearcă', p: 'Poartă parfumul câteva zile, acasă, înainte de sticla de 100 ml.', o: <>Travel 2×8 ml de la {lei(travelFrom)} · mostre {lei(sample.price)}</> },
              { t: 'Alege', p: 'Sticla Morph, cu autenticitate verificabilă prin Certilogo.', o: <>100 ml · {lei(Math.min(...prices))} – {lei(Math.max(...prices))}</> },
              { t: 'Combină', p: 'Două parfumuri purtate împreună devin o a treia semnătură.', o: <>Your Next Form · {layeringSets.length} seturi · {lei(layeringSets[0].price)}</> },
            ].map((x, i) => (
              <div key={x.t} className={s.layer} style={{ '--tint': layerTints[i], zIndex: 4 - i } as React.CSSProperties}>
                <small>Stratul {i + 1}</small>
                <h3 className={s.serif}>{x.t}</h3>
                <p>{x.p}</p>
                <span className={s.offer}>{x.o}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="layering" className={`${s.wrap} ${s.section}`} aria-label="Layering">
          <Composer first="morph-zeta-parfum-100ml" second="morph-vapor-parfum-100ml" />
        </section>

        <section id="cadouri" className={`${s.wrap} ${s.section}`} aria-labelledby="best">
          <div className={s.head}><h2 id="best" className={s.serif}>Cele mai alese</h2><p>Bestsellerurile Morph din fiecare colecție.</p></div>
          <div className={s.cards}>{bestsellerMix(4, [HERO_SLUG]).map(p => <Card key={p.slug} p={p} />)}</div>
        </section>

        <section id="casa-morph" className={`${s.wrap} ${s.section}`} aria-labelledby="casa">
          <div className={s.boutique}>
            <h2 id="casa" className={s.serif}>Casa Morph, București. Parfumul se alege pe piele.</h2>
            <div>
              <p>{BOUTIQUE.address}<br />{BOUTIQUE.hours.join(' · ')}</p>
              <p>Fiecare parfum are cod Certilogo: autenticitatea se verifică online.</p>
              <p>Livrare gratuită peste {lei(FREE_SHIPPING)}. Card, Apple Pay, Google Pay.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
