import Link from 'next/link';
import { Header, Footer, Tile } from '../_ui';
import { Hero, Band } from '../_motion';
import { Composer } from '../_interactive';
import { bySlug, inCollection, bestsellerMix, travelSets, sampleSets, layeringSets, lei, BOUTIQUE, FREE_SHIPPING, perfumes, HERO_SLUG } from '@/lib/catalog';
import s from '../forma.module.css';

export const metadata = { title: 'B — Forma · Home' };

export default function Home() {
  const travelFrom = Math.min(...travelSets.filter(t => /2x8|set-travel/.test(t.slug)).map(t => t.price));
  const sample = sampleSets.find(x => x.inStock)!;
  const prices = perfumes.map(p => p.price);
  const band = [
    { id: 'les-exclusifs' as const, p: bySlug('morph-animal-parfum-100ml'), count: inCollection('les-exclusifs').length },
    { id: 'luxury' as const, p: bySlug('morph-vapor-parfum-100ml'), count: inCollection('luxury').length },
    { id: 'ice' as const, p: bySlug('morph_disumano_parfum_100ml'), count: inCollection('ice').length },
  ];
  return (
    <>
      <Header />
      <main>
        <Hero p={bySlug(HERO_SLUG)} />

        <section className={`${s.wrap} ${s.section}`} aria-labelledby="col">
          <div className={s.head}><h2 id="col" className={s.compressed}>Trei colecții</h2><p>Aceeași sticlă răsucită, trei concentrații și trei caractere. Culoarea apare când treci peste sticlă.</p></div>
          <Band items={band} />
        </section>

        <section id="descopera" className={`${s.wrap} ${s.section}`} aria-labelledby="drum">
          <div className={s.head}><h2 id="drum" className={s.compressed}>Patru pași</h2><p>Cum alegi un parfum de nișă online: afli, încerci, alegi, combini.</p></div>
          <table className={s.table}>
            <thead><tr><th>Pas</th><th>Ce faci</th><th>Format</th><th>Preț</th><th /></tr></thead>
            <tbody>
              <tr><td><span className={`${s.stepName} ${s.compressed}`}>Găsește</span></td><td>Șapte întrebări: prezență, univers olfactiv, ocazie, anotimp.</td><td>Fragrance Finder</td><td>—</td><td><a href="https://morphparfum.ro/quiz">Începe <span className={s.arrow} /></a></td></tr>
              <tr><td><span className={`${s.stepName} ${s.compressed}`}>Încearcă</span></td><td>Poartă parfumul câteva zile înainte de sticlă.</td><td>Travel 2×8 ml<br />Set de mostre</td><td>de la {lei(travelFrom)}<br />{lei(sample.price)}</td><td><Link href="/concept/b/collection">Vezi <span className={s.arrow} /></Link></td></tr>
              <tr><td><span className={`${s.stepName} ${s.compressed}`}>Alege</span></td><td>Sticla Morph, verificabilă prin Certilogo.</td><td>100 ml</td><td>{lei(Math.min(...prices))} – {lei(Math.max(...prices))}</td><td><Link href="/concept/b/collection">Parfumuri <span className={s.arrow} /></Link></td></tr>
              <tr><td><span className={`${s.stepName} ${s.compressed}`}>Combină</span></td><td>Două parfumuri purtate împreună.</td><td>Your Next Form, {layeringSets.length} seturi blind</td><td>{lei(layeringSets[0].price)}</td><td><a href="#layering">Compune <span className={s.arrow} /></a></td></tr>
            </tbody>
          </table>
        </section>

        <section id="layering" className={`${s.wrap} ${s.section}`} aria-label="Layering">
          <Composer first="morph-zeta-parfum-100ml" second="morph-vapor-parfum-100ml" />
        </section>

        <section id="cadouri" className={`${s.wrap} ${s.section}`} aria-labelledby="best">
          <div className={s.head}><h2 id="best" className={s.compressed}>Cele mai alese</h2><p>Bestsellerurile Morph din fiecare colecție.</p></div>
          <div className={s.repeat}>{bestsellerMix(4, [HERO_SLUG]).map(p => <Tile key={p.slug} p={p} />)}</div>
        </section>

        <section id="casa-morph" className={`${s.wrap} ${s.section}`} aria-labelledby="casa">
          <div className={s.head}><h2 id="casa" className={s.compressed}>Casa Morph</h2><p>Boutique-ul din București: consultanță și testare.</p></div>
          <p className={`${s.address} ${s.compressed}`}>Piața Alexandru Lahovari 5</p>
          <div className={s.trustRow}>
            <div><b>Program</b><p>{BOUTIQUE.hours.join(' · ')}</p></div>
            <div><b>Certilogo</b><p>Fiecare parfum are un cod care confirmă online proveniența din circuitul oficial Morph.</p></div>
            <div><b>Livrare gratuită</b><p>Peste {lei(FREE_SHIPPING)}. Card, Apple Pay, Google Pay.</p></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
