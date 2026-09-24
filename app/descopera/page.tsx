import Link from 'next/link';
import Image from 'next/image';
import { PageHead } from '@/components/PageHead';
import { SectionNav } from '@/components/SectionNav';
import { DiscoverInstrument } from '@/components/DiscoverInstrument';
import { AddToCart } from '@/components/AddToCart';
import { Niche } from '@/components/ProductVisual';
import { OpenNow } from '@/components/OpenNow';
import { ObjectShelf } from '@/components/ObjectShelf';
import { DESCOPERA_NAV } from '@/lib/nav';
import { LENSES, topNotes, type LensId } from '@/lib/discover';
import { perfumes, HERO_SLUG, bySlug, MORPH_SAYS, travelSets, sampleSets, travelFor, lei, FREE_SHIPPING, productHref, BOUTIQUE, TRIAL, travelItem, offerItem, type Offer } from '@/lib/catalog';
import { QUESTIONS } from '@/lib/finder';
import s from './descopera.module.css';

export const metadata = { title: 'Descoperă' };

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const lens = (LENSES.find(l => l.id === sp.lentila)?.id ?? 'familie') as LensId;
  const note = typeof sp.nota === 'string' ? sp.nota.slice(0, 40) : topNotes()[0];
  const slug = typeof sp.parfum === 'string' && perfumes.some(p => p.slug === sp.parfum) ? sp.parfum : HERO_SLUG;

  const withTravel = perfumes.filter(p => travelFor(p));
  // the travel chapter's example: the house's hero scent, as bottle and as its travel box
  const hero = bySlug(HERO_SLUG), heroTravel = travelFor(hero)!;
  const offers = [...sampleSets, ...travelSets.filter(t => TRIAL[t.slug])].sort((a, b) => Number(b.inStock) - Number(a.inStock) || a.price - b.price);

  return (
    <div className="wrap">
      <PageHead id="descopera-titlu" title="Descoperă" crumbs={[{ href: '/', label: 'Morph' }, { label: 'Descoperă' }]}
        lede="Găsește-ți parfumul după familie, notă, anotimp sau intensitate, apoi încearcă-l acasă sau în magazin, înainte de sticla de 100 ml."
        meta={`${perfumes.length} de parfumuri. Atributele sunt cele publicate de Morph pentru fiecare parfum.`}>
        <SectionNav label="Descoperă" items={DESCOPERA_NAV} current="/descopera" />
      </PageHead>

      <section className={s.finder} aria-labelledby="finder-titlu">
        <h2 id="finder-titlu" className="t-2">Nu știi de unde să pornești?</h2>
        <p className="muted">Fragrance Finder: {QUESTIONS.length} întrebări despre prezență, anotimp și ocazie. Primești două sau trei parfumuri, cu motivul pentru fiecare.</p>
        <Link className="btn" href="/descopera/finder">Începe Fragrance Finder</Link>
      </section>

      <section className="section" aria-labelledby="exploreaza">
        <h2 id="exploreaza" className={`t-1 ${s.h}`}>Explorează</h2>
        <DiscoverInstrument initial={{ lens, note, slug }} />
      </section>

      <section id="incearca" className="section" aria-labelledby="incearca-titlu">
        <div className={s.head}>
          <h2 id="incearca-titlu" className="t-1">Încearcă înainte de sticlă</h2>
          <p className="muted">Un parfum se alege pe piele, în câteva zile. Acasă, cu formatele mici Morph; în persoană, în {BOUTIQUE.short} din București. Stocul e cel de la data instantaneului.</p>
        </div>

        <div id="travel" className={s.travel}>
          <div className={s.travelIntro}>
            <h3 className="t-2">Travel Editions</h3>
            <p className="t-small muted">Același parfum, în două flacoane de 8 ml, <span className="num">{lei(travelFor(withTravel[0])!.price)}</span>. Există pentru {withTravel.length} din cele {perfumes.length} de parfumuri.</p>
            <p className={s.travelQuote}>„{MORPH_SAYS.travel}” <span className="t-micro muted">Morph, Despre noi</span></p>
          </div>
          <div className={s.travelShelf}>
            <ObjectShelf p={hero} size="chapter" sizes="(max-width: 599px) 58vw, 26vw" label={`${hero.shortName}: sticla și Travel Editions`} items={[
              { key: hero.slug, src: hero.images[0], kind: 'Parfum', line: `100 ml · ${lei(hero.price)}`, of: hero.shortName },
              { key: heroTravel.slug, src: heroTravel.image!, kind: 'Travel', line: `2×8 ml · ${lei(heroTravel.price)}`, of: hero.shortName },
            ]} />
          </div>
          <ul className={s.travelList}>
            {withTravel.map(p => {
              const t = travelFor(p)!;
              return (
                <li key={p.slug}>
                  <span className={`niche-sm ${s.travelImg}`} aria-hidden><Image src={t.image ?? p.images[0]} alt="" fill sizes="40px" /></span>
                  <Link className={s.travelName} href={productHref(p)}>{p.shortName}</Link>
                  <AddToCart className="text-btn link t-small muted" items={[travelItem(p, t)]} aria-label={`Adaugă ${p.shortName} travel 2×8 ml în coș`}>Adaugă</AddToCart>
                </li>
              );
            })}
          </ul>
        </div>

        <ol className={s.offers}>{offers.map(o => <OfferRow key={o.slug} o={o} />)}</ol>

        <div className={s.person} data-tone="wood">
          <div>
            <p className="label muted">În persoană</p>
            <h3 className="t-2">{BOUTIQUE.name}</h3>
          </div>
          <div>
            <p>{BOUTIQUE.address}</p>
            <OpenNow />
            <p className="t-small muted num">{BOUTIQUE.hours.join(' · ')}</p>
          </div>
          <Link className="btn btn-secondary" href={BOUTIQUE.href}>Vezi magazinul</Link>
        </div>
        <p className={`${s.threshold} t-small muted`}>Livrarea e gratuită de la {lei(FREE_SHIPPING)}. O sticlă de {lei(Math.min(...perfumes.map(p => p.price)))} plus un travel trece pragul.</p>
      </section>

      <section className={`section ${s.next}`} aria-labelledby="mai-departe">
        <h2 id="mai-departe" className="t-2">Ai găsit unul? Adaugă-i un al doilea strat.</h2>
        <p className="muted">În Layering alegi două parfumuri și vezi cum se așază notele lor, etapă cu etapă, cu prețul pentru amândouă.</p>
        <Link className="btn btn-secondary" href="/layering">Deschide Layering</Link>
      </section>
    </div>
  );
}

function OfferRow({ o }: { o: Offer }) {
  const d = TRIAL[o.slug] ?? { name: o.name, what: '' };
  return (
    <li className={`${s.offer} ${o.inStock ? '' : s.soldout}`}>
      <Niche src={o.image} alt="" sizes="120px" className={s.offerVisual} />
      <div>
        <h3 className={s.offerName}>{d.name}</h3>
        <p className="t-small muted">{d.what}</p>
      </div>
      <p className="t-small"><b className="num">{lei(o.price)}</b><br /><span className="muted">{o.inStock ? 'În stoc' : 'Stoc epuizat'}</span></p>
      <div>
        {o.inStock
          ? <AddToCart className="btn btn-sm btn-secondary" items={[offerItem(o, d.name, 'Set de încercare')]} aria-label={`Adaugă ${d.name} în coș, ${lei(o.price)}`}>Adaugă</AddToCart>
          : <a className="t-small link" href={o.url}>Pe morphparfum.ro</a>}
      </div>
    </li>
  );
}
