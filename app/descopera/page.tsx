import Link from 'next/link';
import Image from 'next/image';
import { PageHead } from '@/components/PageHead';
import { SectionNav } from '@/components/SectionNav';
import { DiscoverInstrument } from '@/components/DiscoverInstrument';
import { AddToCart } from '@/components/AddToCart';
import { DESCOPERA_NAV } from '@/lib/nav';
import { LENSES, topNotes, type LensId } from '@/lib/discover';
import { perfumes, HERO_SLUG, travelSets, sampleSets, travelFor, lei, FREE_SHIPPING, productHref, type Offer } from '@/lib/catalog';
import { chord, scentTokens } from '@/lib/scent';
import { QUESTIONS } from '@/lib/finder';
import s from './descopera.module.css';

export const metadata = { title: 'Descoperă' };

// Display names and contents for Morph's trial products, taken from their own product names and descriptions.
const TRIAL: Record<string, { name: string; what: string }> = {
  'morph-set-esantioane-les-exclusifs-ice-collections': { name: 'Mostre Les Exclusifs & Ice', what: 'Setul de mostre al celor două colecții.' },
  'morph-set-esantioane-luxury-collection': { name: 'Mostre Luxury', what: 'Setul de mostre al colecției Luxury.' },
  'morph-set-esantioane': { name: 'Eșantioane parfumuri', what: 'Setul de eșantioane anterior.' },
  'set-mini-parfumuri-morph-discovery-travel-24-parfumuri-8ml': { name: 'Discovery Travel, 24 × 8 ml', what: 'Luxury, Les Exclusifs și Ice împreună, în flacoane de 8 ml.' },
  'morph-discovery-travel-set-mini-parfumuri': { name: 'Discovery Travel, 22 × 8 ml', what: '22 de parfumuri în format travel de 8 ml.' },
  'blind-set-6-samples-1-travel': { name: 'Blind set: 6 mostre + 1 travel', what: 'Mostre de 2,5 ml și un travel, fără să știi care sunt până deschizi cutia.' },
};

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const lens = (LENSES.find(l => l.id === sp.lentila)?.id ?? 'familie') as LensId;
  const note = typeof sp.nota === 'string' ? sp.nota.slice(0, 40) : topNotes()[0];
  const slug = typeof sp.parfum === 'string' && perfumes.some(p => p.slug === sp.parfum) ? sp.parfum : HERO_SLUG;

  const withTravel = perfumes.filter(p => travelFor(p));
  const offers = [...sampleSets, ...travelSets.filter(t => TRIAL[t.slug])].sort((a, b) => Number(b.inStock) - Number(a.inStock) || a.price - b.price);

  return (
    <div className="wrap">
      <PageHead id="descopera-titlu" title="Descoperă" crumbs={[{ href: '/', label: 'Morph' }, { label: 'Descoperă' }]}
        lede="Găsește-ți parfumul după familie, notă, anotimp sau intensitate, apoi încearcă-l înainte de sticla de 100 ml."
        meta={`${perfumes.length} de parfumuri, fiecare cu culoarea lui. Atributele sunt cele publicate de Morph pentru fiecare parfum.`} chord={chord(perfumes)}>
        <SectionNav label="Descoperă" items={DESCOPERA_NAV} current="/descopera" />
      </PageHead>

      <section className={s.finder} aria-labelledby="finder-titlu">
        <h2 id="finder-titlu" className="t-3">Nu știi de unde să pornești?</h2>
        <p className="muted">Fragrance Finder: {QUESTIONS.length} întrebări despre prezență, anotimp și ocazie. Primești două sau trei parfumuri, cu motivul pentru fiecare.</p>
        <Link className="btn" href="/descopera/finder">Începe Fragrance Finder</Link>
      </section>

      <section className="section" aria-labelledby="exploreaza">
        <h2 id="exploreaza" className={`t-2 ${s.h}`}>Explorează</h2>
        <DiscoverInstrument initial={{ lens, note, slug }} />
      </section>

      <section id="incearca" className="section" aria-labelledby="incearca-titlu">
        <div className={s.head}>
          <h2 id="incearca-titlu" className="t-2">Încearcă înainte de sticlă</h2>
          <p className="muted">Un parfum se alege pe piele, în câteva zile. Formatele Morph de încercare, cu stocul de la data instantaneului.</p>
        </div>
        <div className={s.travel}>
          <div>
            <h3 className="t-3">Travel 2×8 ml</h3>
            <p className="t-small muted">Același parfum, în două flacoane de 8 ml, <span className="num">{lei(travelFor(withTravel[0])!.price)}</span>. Există pentru {withTravel.length} din cele {perfumes.length} de parfumuri.</p>
          </div>
          <ul className={s.travelList}>
            {withTravel.map(p => {
              const t = travelFor(p)!;
              return (
                <li key={p.slug}>
                  <span className="swatch" style={{ '--scent': scentTokens(p).scent } as React.CSSProperties} />
                  <Link className="link" href={productHref(p)}>{p.shortName}</Link>
                  <AddToCart className="text-btn link t-small muted" items={[{ key: t.slug, name: p.shortName, format: 'Travel 2×8 ml', price: t.price, color: scentTokens(p).scent }]} aria-label={`Adaugă ${p.shortName} travel 2×8 ml în coș`}>Adaugă</AddToCart>
                </li>
              );
            })}
          </ul>
        </div>
        <ol className={s.offers}>{offers.map(o => <OfferRow key={o.slug} o={o} />)}</ol>
        <p className={`${s.threshold} t-small`}>Livrarea e gratuită de la {lei(FREE_SHIPPING)}. O sticlă de {lei(Math.min(...perfumes.map(p => p.price)))} plus un travel trece pragul.</p>
      </section>

      <section className={`section ${s.next}`} aria-labelledby="mai-departe">
        <h2 id="mai-departe" className="t-3">Ai găsit unul? Adaugă-i un al doilea strat.</h2>
        <p className="muted">În Layering alegi două parfumuri și vezi cum se suprapun, tier cu tier, cu prețul pentru amândouă.</p>
        <Link className="btn btn-secondary" href="/layering">Deschide Layering</Link>
      </section>
    </div>
  );
}

function OfferRow({ o }: { o: Offer }) {
  const d = TRIAL[o.slug] ?? { name: o.name, what: '' };
  return (
    <li className={`${s.offer} ${o.inStock ? '' : s.soldout}`}>
      <div className={s.offerVisual} aria-hidden>{o.image && <Image src={o.image} alt="" fill sizes="96px" />}</div>
      <div>
        <h3 className={s.offerName}>{d.name}</h3>
        <p className="t-small muted">{d.what}</p>
      </div>
      <p className="t-small"><b className="num">{lei(o.price)}</b><br /><span className="muted">{o.inStock ? 'În stoc' : 'Stoc epuizat'}</span></p>
      <div>
        {o.inStock
          ? <AddToCart className="btn btn-sm btn-secondary" items={[{ key: o.slug, name: d.name, format: 'Set de încercare', price: o.price }]} aria-label={`Adaugă ${d.name} în coș, ${lei(o.price)}`}>Adaugă</AddToCart>
          : <a className="t-small link" href={o.url}>Pe morphparfum.ro</a>}
      </div>
    </li>
  );
}
