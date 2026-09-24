import Link from 'next/link';
import { PageHead } from '@/components/PageHead';
import { ProductVisual, Niche } from '@/components/ProductVisual';
import { AddToCart } from '@/components/AddToCart';
import { BlindPair } from '@/components/BlindPair';
import {
  perfumes, inCollection, COLLECTIONS, ALL_BY_COLLECTION, bestsellerMix, travelFor, sampleSets, discoverySets, layeringSets, TRIAL,
  lei, productHref, collectionHref, offerItem, fullItem, sampleName,
} from '@/lib/catalog';
import s from './cadouri.module.css';

export const metadata = { title: 'Cadouri' };

const GIFT_BOX = 20; // "Cutie cadou (+20 lei)", offered on morphparfum.ro PDPs
// Gift card facts as published by Morph (research 01 §12). Amounts are not in the snapshot, so none are shown.
const GIFT_CARD_URL = 'https://morphparfum.ro/gift-card-morph-parfum';

export default function Page() {
  const picks = bestsellerMix(3);
  const withTravel = perfumes.filter(p => travelFor(p));
  const travelPrice = travelFor(withTravel[0])!.price;
  const samples = sampleSets.filter(x => x.inStock);
  const discovery = discoverySets().find(x => x.inStock);
  const ynfIn = layeringSets.filter(x => x.inStock);
  const priceOf = (c: (typeof ALL_BY_COLLECTION)[number]) => [...new Set(inCollection(c).map(p => p.price))];

  const budget = [
    { price: travelPrice, what: `Travel 2×8 ml din ${withTravel.length} parfumuri, sau un set Your Next Form (${ynfIn.length} în stoc)`, href: '#descoperire' },
    ...(samples.length ? [{ price: samples[0].price, what: `${samples.length === 1 ? 'Setul' : 'Seturile'} de mostre: ${samples.map(x => sampleName(x.slug).replace('Setul de mostre ', '')).join(', ')}`, href: '#descoperire' }] : []),
    ...[...new Set(perfumes.map(p => p.price))].sort((a, b) => a - b).map(v => ({
      price: v, what: `Sticla de 100 ml: ${ALL_BY_COLLECTION.filter(c => priceOf(c).includes(v)).map(c => COLLECTIONS[c].name).join(', ')}. Cutie cadou +${GIFT_BOX} lei`, href: '#sticla',
    })),
    ...(discovery ? [{ price: discovery.price, what: 'Discovery Travel: toate colecțiile în flacoane de 8 ml', href: '#descoperire' }] : []),
  ];

  return (
    <>
      <div className="wrap">
        <PageHead id="cadouri-titlu" title="Cadouri" crumbs={[{ href: '/', label: 'Morph' }, { label: 'Cadouri' }]}
          lede="Un parfum e greu de ghicit pentru altcineva. Morph are câte un format pentru fiecare grad de certitudine: sticla, dacă știi parfumul; o descoperire, dacă nu; un gift card, dacă preferi să aleagă singur."
          meta="Prețurile și stocul sunt cele din instantaneul catalogului Morph." />

        <section className={s.budget} aria-labelledby="buget">
          <h2 id="buget" className="label muted">După buget</h2>
          <ol>
            {budget.map(b => (
              <li key={b.price + b.what}>
                <a href={b.href} className={s.budgetRow}>
                  <span className={`${s.budgetPrice} num`}>{lei(b.price)}</span>
                  <span>{b.what}</span>
                </a>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* 1. You know the fragrance */}
      <section id="sticla" className="band" aria-labelledby="sticla-titlu">
        <div className="wrap">
          <div className={s.head}>
            <h2 id="sticla-titlu" className="t-1">Dacă știi parfumul</h2>
            <p className="muted">Sticla de 100 ml, cu cutia cadou Morph (+{GIFT_BOX} lei, se bifează pe pagina parfumului). Cele mai alese, din fiecare colecție:</p>
          </div>
          <ul className={s.objects}>
            {picks.map(p => (
              <li key={p.slug} className={s.object}>
                <Link href={productHref(p)} className={s.objectLink}>
                  <ProductVisual p={p} sizes="(max-width: 899px) 80vw, 30vw" alt="" className={s.objectNiche} />
                  <span className="label muted">{COLLECTIONS[p.collection].name}</span>
                  <span className={s.objectName}>{p.shortName}</span>
                </Link>
                <p className={s.objectFoot}>
                  <span className="num">{lei(p.price)}</span>
                  {p.inStock && <AddToCart className="btn btn-sm btn-secondary" items={[fullItem(p)]} aria-label={`Adaugă ${p.shortName} 100 ml în coș`}>Adaugă</AddToCart>}
                </p>
              </li>
            ))}
          </ul>
          <p className={s.more}>{ALL_BY_COLLECTION.map(c => <Link key={c} className="link" href={collectionHref(c)}>Toată colecția {COLLECTIONS[c].name}</Link>)}</p>
        </div>
      </section>

      {/* 2. You don't know it yet */}
      <section id="descoperire" className={`band ${s.discover}`} aria-labelledby="descoperire-titlu">
        <div className="wrap">
          <div className={s.head}>
            <h2 id="descoperire-titlu" className="t-1">Dacă nu știi încă</h2>
            <p className="muted">Formatele mici îl lasă pe cel care primește să aleagă pe piele. Toate sunt produse Morph, cu stocul de la data instantaneului.</p>
          </div>
          <ul className={s.sets}>
            {discovery && <SetItem o={discovery} name={TRIAL[discovery.slug].name} what={TRIAL[discovery.slug].what} format="Set travel" />}
            {samples.map(o => <SetItem key={o.slug} o={o} name={TRIAL[o.slug].name} what={TRIAL[o.slug].what} format="Set de mostre" />)}
            <li className={s.set}>
              <Niche src="/morph/set-travel-morph-zeta-0.avif" alt="Set travel Morph Zeta" sizes="(max-width: 899px) 80vw, 24vw" className={s.setNiche} />
              <h3 className={s.setName}>Travel 2×8 ml</h3>
              <p className="t-small muted">Un singur parfum, în două flacoane de 8 ml. Există pentru {withTravel.length} parfumuri: {withTravel.map(p => p.shortName).join(', ')}.</p>
              <p className={s.setFoot}><span className="num">{lei(travelPrice)}</span><Link className="link t-small" href="/descopera#incearca">Alege parfumul</Link></p>
            </li>
          </ul>
        </div>
      </section>

      {/* 3. A surprise, composed by Morph */}
      <section className="band" data-tone="dark" aria-labelledby="surpriza-titlu">
        <div className={`wrap ${s.surprise}`}>
          <BlindPair className={s.blind} />
          <div className={s.surpriseText}>
            <h2 id="surpriza-titlu" className="t-1">O surpriză</h2>
            <p className="t-lede">Your Next Form: {layeringSets.length} seturi blind de layering, fiecare cu două parfumuri de 8 ml. Nici cel care dăruiește, nici cel care primește nu știe ce e înăuntru până la deschiderea cutiei.</p>
            <p className="t-small muted">{layeringSets.map(x => x.state).join(', ')}. <span className="num">{lei(layeringSets[0].price)}</span> setul, {ynfIn.length} din {layeringSets.length} în stoc.</p>
            <Link className="btn" href="/layering/your-next-form">Alege o stare</Link>
          </div>
        </div>
      </section>

      {/* 4. Gift card */}
      <section id="card" className="band" data-tone="wood" aria-labelledby="card-titlu">
        <div className={`wrap ${s.card}`}>
          <h2 id="card-titlu" className="t-1">Gift card Morph</h2>
          <dl className={s.cardFacts}>
            <div><dt className="label muted">Cum ajunge</dt><dd>Pe e-mail, cumpărat online</dd></div>
            <div><dt className="label muted">Valabilitate</dt><dd className="num">180 de zile</dd></div>
            <div><dt className="label muted">Plata</dt><dd>Online; nu se poate plăti ramburs</dd></div>
          </dl>
          <div className={s.cardAct}>
            <a className="btn btn-secondary" href={GIFT_CARD_URL}>Gift card pe morphparfum.ro</a>
            <p className="t-micro muted">Valorile disponibile sunt pe pagina Morph; nu fac parte din instantaneul acestui concept.</p>
          </div>
        </div>
      </section>
    </>
  );
}

function SetItem({ o, name, what, format }: { o: (typeof sampleSets)[number]; name: string; what: string; format: string }) {
  return (
    <li className={s.set}>
      <Niche src={o.image} alt={name} sizes="(max-width: 899px) 80vw, 24vw" className={s.setNiche} />
      <h3 className={s.setName}>{name}</h3>
      <p className="t-small muted">{what}</p>
      <p className={s.setFoot}>
        <span className="num">{lei(o.price)}</span>
        {o.inStock ? <AddToCart className="btn btn-sm btn-secondary" items={[offerItem(o, name, format)]} aria-label={`Adaugă ${name} în coș, ${lei(o.price)}`}>Adaugă</AddToCart> : <span className="t-small muted">Stoc epuizat</span>}
      </p>
    </li>
  );
}
