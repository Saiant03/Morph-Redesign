import Link from 'next/link';
import Image from 'next/image';
import { PageHead } from '@/components/PageHead';
import { SectionNav } from '@/components/SectionNav';
import { LayeringComposer } from '@/components/LayeringComposer';
import { LAYERING_NAV } from '@/lib/nav';
import { perfumes, travelFor, layeringSets, lei } from '@/lib/catalog';
import s from './layering.module.css';

export const metadata = { title: 'Layering' };

const DEFAULT: [string, string] = ['morph-zeta-parfum-100ml', 'morph-vapor-parfum-100ml'];
const valid = (v: unknown) => (typeof v === 'string' && perfumes.some(p => p.slug === v) ? v : null);

/**
 * The pair in the URL: no parameters show Morph's hero pair; an empty value is an empty slot (after "Golește
 * raftul"); an unknown slug falls back to the default for that slot; B never repeats A.
 */
function readPair(sp: Record<string, string | string[] | undefined>): [string | null, string | null] {
  if (sp.a === undefined && sp.b === undefined) return DEFAULT;
  const slot = (v: string | string[] | undefined, d: string) => (v === '' ? null : valid(v) ?? d);
  const a = slot(sp.a, DEFAULT[0]);
  let b = slot(sp.b, DEFAULT[1]);
  if (b && b === a) b = a === DEFAULT[1] ? DEFAULT[0] : DEFAULT[1];
  return [a, b];
}

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [a, b] = readPair(await searchParams);
  const travel = perfumes.filter(p => travelFor(p));
  const ynfIn = layeringSets.filter(x => x.inStock).length;
  return (
    <div className={s.page} data-tone="dark">
      <div className="wrap">
        <PageHead id="layering-titlu" title="Layering" crumbs={[{ href: '/', label: 'Morph' }, { label: 'Layering' }]}
          lede="Identity, layer by layer. Două parfumuri Morph purtate unul peste altul devin o a treia formă. Compune-ți perechea din cele 26 sau alege una creată de Morph."
          meta={<>Încerci perechea în travel 2×8 ml ({travel.length} parfumuri, <span className="num">{lei(travelFor(travel[0])!.price)}</span> fiecare) sau într-un set Your Next Form (<span className="num">{lei(layeringSets[0].price)}</span>).</>}>
          <SectionNav label="Layering" items={LAYERING_NAV} current="/layering" />
        </PageHead>

        <section className={s.composer} aria-labelledby="compune">
          <LayeringComposer key={`${a}|${b}`} first={a} second={b} headingId="compune" />
        </section>

        <section className={`section ${s.ynf}`} aria-labelledby="ynf-titlu">
          <figure className={s.ynfImage}>
            <Image src="/morph/campaign/ynf-box-in-hand.avif" alt="Cutia Your Next Form deschisă, cu două flacoane de 8 ml, ținută în mână" fill sizes="(max-width: 899px) 100vw, 50vw" />
          </figure>
          <div className={s.ynfText}>
            <h2 id="ynf-titlu" className="t-1">Sau lasă compoziția în seama Morph</h2>
            <p className="muted">Your Next Form: {layeringSets.length} perechi compuse de Morph, în ediție limitată, fiecare cu două parfumuri de 8 ml. Știi starea și acordul; parfumurile le afli abia când deschizi cutia.</p>
            <p className="t-small"><span className="num">{lei(layeringSets[0].price)}</span> setul, {ynfIn} din {layeringSets.length} în stoc.</p>
            <Link className="btn" href="/layering/your-next-form">Alege o stare</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
