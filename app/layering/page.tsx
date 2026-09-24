import Link from 'next/link';
import { PageHead } from '@/components/PageHead';
import { SectionNav } from '@/components/SectionNav';
import { LayeringComposer } from '@/components/LayeringComposer';
import { BlindStrata } from '@/components/BlindStrata';
import { LAYERING_NAV } from '@/lib/nav';
import { perfumes, travelFor, layeringSets, lei, BOUTIQUE } from '@/lib/catalog';
import { chord } from '@/lib/scent';
import s from './layering.module.css';

export const metadata = { title: 'Layering' };

const DEFAULT: [string, string] = ['morph-zeta-parfum-100ml', 'morph-vapor-parfum-100ml'];
const valid = (v: unknown) => (typeof v === 'string' && perfumes.some(p => p.slug === v) ? v : null);

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const a = valid(sp.a) ?? DEFAULT[0];
  const b = valid(sp.b) && sp.b !== a ? (sp.b as string) : a === DEFAULT[1] ? DEFAULT[0] : DEFAULT[1];
  const travel = perfumes.filter(p => travelFor(p));
  const ynfIn = layeringSets.filter(x => x.inStock).length;
  return (
    <div className="wrap">
      <PageHead id="layering-titlu" title="Layering" crumbs={[{ href: '/', label: 'Morph' }, { label: 'Layering' }]}
        lede="Identity, layer by layer. Două parfumuri Morph purtate unul peste altul devin o a treia formă. Compune-ți combinația din cele 26 sau alege una creată de Morph."
        meta={<>Încerci perechea în travel 2×8 ml ({travel.length} parfumuri, <span className="num">{lei(travelFor(travel[0])!.price)}</span> fiecare) sau într-un set Your Next Form (<span className="num">{lei(layeringSets[0].price)}</span>).</>}
        chord={chord(perfumes)}>
        <SectionNav label="Layering" items={LAYERING_NAV} current="/layering" />
      </PageHead>

      <section className={s.composer} aria-labelledby="compune">
        <LayeringComposer key={`${a}|${b}`} detail first={a} second={b} heading="Compune" headingId="compune"
          intro="Alege primul și al doilea strat. Coloanele se suprapun tier cu tier: deschiderea peste deschidere, baza peste bază. Linkul păstrează combinația." />
      </section>

      <section className={`section ${s.ynf}`} aria-labelledby="ynf-titlu">
        <BlindStrata className={s.blind} />
        <div className={s.ynfText}>
          <h2 id="ynf-titlu" className="t-2">Sau lasă compoziția în seama Morph</h2>
          <p className="muted">Your Next Form: {layeringSets.length} seturi de layering în ediție limitată, fiecare cu două parfumuri de 8 ml. Nu știi care sunt până nu deschizi cutia; știi doar starea și acordul pe care îl descrie Morph. De aceea aici nu au culoare.</p>
          <p className="t-small">{ynfIn} din {layeringSets.length} în stoc, <span className="num">{lei(layeringSets[0].price)}</span> setul.</p>
          <Link className="btn" href="/layering/your-next-form">Vezi cele {layeringSets.length} seturi</Link>
        </div>
      </section>

      <section className={`section ${s.try}`} aria-labelledby="pe-piele">
        <h2 id="pe-piele" className="t-3">Pe piele, nu pe ecran</h2>
        <p className="muted">Vizualizarea arată cum se așază notele publicate, nu cum miroase combinația. O verifici în travel acasă sau direct în {BOUTIQUE.name}, {BOUTIQUE.address}.</p>
        <p className={s.tryLinks}><Link className="link" href="/descopera#incearca">Toate formatele de încercare</Link><Link className="link" href="/casa-morph">Casa Morph</Link></p>
      </section>
    </div>
  );
}
