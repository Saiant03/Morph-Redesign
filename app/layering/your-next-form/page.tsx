import Link from 'next/link';
import { PageHead } from '@/components/PageHead';
import { SectionNav } from '@/components/SectionNav';
import { YnfIndex } from '@/components/YnfIndex';
import { LAYERING_NAV } from '@/lib/nav';
import { layeringSets, lei, BOUTIQUE } from '@/lib/catalog';
import s from './ynf.module.css';

export const metadata = { title: 'Your Next Form' };

export default function Page() {
  const inStock = layeringSets.filter(x => x.inStock).length;
  return (
    <div className={s.page} data-tone="dark"><div className="wrap">
      <PageHead id="ynf-titlu" title="Your Next Form" crumbs={[{ href: '/layering', label: 'Layering' }, { label: 'Your Next Form' }]}
        lede={`${layeringSets.length} seturi de layering create de Morph, în ediție limitată. Două parfumuri de 8 ml, fără nume: afli care sunt abia când deschizi cutia.`}
        meta={<>2×8 ml, <span className="num">{lei(layeringSets[0].price)}</span> setul. {inStock} din {layeringSets.length} în stoc.</>}>
        <SectionNav label="Layering" items={LAYERING_NAV} current="/layering/your-next-form" />
      </PageHead>

      <section className={s.how} aria-label="Cum funcționează">
        <div><h2 className="t-3">Ce știi dinainte</h2><p className="muted">Numele stării (Limitless, Fearless, Hypnotic…) și acordul descris de Morph: notele în jurul cărora e construită combinația.</p></div>
        <div><h2 className="t-3">Ce afli la deschidere</h2><p className="muted">Cele două parfumuri. „Fiind un blind set, identitatea parfumurilor este dezvăluită doar la deschiderea cutiei.” Instrucțiunile și ordinea de aplicare sunt în cutie.</p></div>
        <div><h2 className="t-3">De ce așa</h2><p className="muted">Deviza Morph e „evoluție constantă și Metamorfoză prin parfum”. Setul blind o ia literal: următoarea formă a semnăturii tale, aleasă după stare, nu după nume.</p></div>
      </section>

      <YnfIndex sets={layeringSets} />

      <section className={`section ${s.next}`} aria-labelledby="dupa">
        <h2 id="dupa" className="t-2">După cutie</h2>
        <div>
          <h3 className="t-3">Îți știi deja parfumurile?</h3>
          <p className="muted">Compune-ți singur o pereche din cele 26 și vezi cum se suprapun notele.</p>
          <Link className="btn btn-secondary" href="/layering">Deschide compozitorul</Link>
        </div>
        <div>
          <h3 className="t-3">Vrei să încerci în magazin?</h3>
          <p className="muted">Magazinul Morph, {BOUTIQUE.address}. {BOUTIQUE.hours.join(', ')}.</p>
          <Link className="btn btn-secondary" href={BOUTIQUE.href}>Vezi magazinul</Link>
        </div>
      </section>
    </div></div>
  );
}
