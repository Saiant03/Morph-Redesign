import Link from 'next/link';
import Image from 'next/image';
import { PageHead } from '@/components/PageHead';
import { SectionNav } from '@/components/SectionNav';
import { YnfIndex } from '@/components/YnfIndex';
import { LAYERING_NAV } from '@/lib/nav';
import { layeringSets, lei, BOUTIQUE, stateKey } from '@/lib/catalog';
import s from './ynf.module.css';

export const metadata = { title: 'Your Next Form' };

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { stare } = await searchParams;
  const initial = layeringSets.find(o => stateKey(o) === stare) ? (stare as string) : stateKey(layeringSets[0]);
  const inStock = layeringSets.filter(x => x.inStock).length;
  return (
    <div className={s.page} data-tone="dark"><div className="wrap">
      <PageHead id="ynf-titlu" title="Your Next Form" crumbs={[{ href: '/layering', label: 'Layering' }, { label: 'Your Next Form' }]}
        lede={`${layeringSets.length} seturi de layering create de Morph, în ediție limitată. Două parfumuri de 8 ml, fără nume: afli care sunt abia când deschizi cutia.`}
        meta={<>2×8 ml, <span className="num">{lei(layeringSets[0].price)}</span> setul. {inStock} din {layeringSets.length} în stoc.</>}>
        <SectionNav label="Layering" items={LAYERING_NAV} current="/layering/your-next-form" />
      </PageHead>

      <section className={s.known} aria-labelledby="ce-stii">
        <figure className={s.boxes}>
          <Image src="/morph/campaign/ynf-boxes.avif" alt="Cutii Your Next Form închise, cu numele stărilor pe ele: Untamed, Magnetic, Fearless" fill sizes="(max-width: 899px) 100vw, 58vw" priority />
        </figure>
        <div className={s.ledger}>
          <div>
            <h2 id="ce-stii" className="t-3">Ce știi dinainte</h2>
            <ul className={s.facts}>
              <li>Starea, scrisă pe cutie</li>
              <li>Acordul, descris de Morph</li>
              <li>Două flacoane de 8 ml</li>
              <li><span className="num">{lei(layeringSets[0].price)}</span></li>
            </ul>
          </div>
          <div>
            <h2 className="t-3">Ce afli la deschidere</h2>
            <ul className={`${s.facts} ${s.unknown}`}>
              <li>Cele două parfumuri</li>
              <li>Instrucțiunile și ordinea de aplicare</li>
            </ul>
          </div>
          <blockquote className={s.quote}>
            <p>„Fiind un blind set, identitatea parfumurilor este dezvăluită doar la deschiderea cutiei.”</p>
            <footer className="t-small muted">Morph, pagina fiecărui set</footer>
          </blockquote>
          <p className="muted t-small">Deviza Morph e „evoluție constantă și Metamorfoză prin parfum”. Setul blind o ia literal: următoarea formă a semnăturii tale, aleasă după stare, nu după nume.</p>
        </div>
      </section>

      <section id="stari" className={`section ${s.index}`} aria-labelledby="alege-stare">
        <h2 id="alege-stare" className="t-2">Alege o stare</h2>
        <YnfIndex sets={layeringSets} initial={initial} />
      </section>

      <section className={`section ${s.next}`} aria-labelledby="dupa">
        <h2 id="dupa" className="t-2">După cutie</h2>
        <div>
          <h3 className="t-3">Îți știi deja parfumurile?</h3>
          <p className="muted">Compune-ți singur o pereche din cele 26 și vezi cum se așază notele, etapă cu etapă.</p>
          <Link className="btn btn-secondary" href="/layering">Compune o pereche</Link>
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
