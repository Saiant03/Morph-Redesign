import Link from 'next/link';
import { PageHead } from '@/components/PageHead';
import { ProductVisual, Niche } from '@/components/ProductVisual';
import { AddToCart } from '@/components/AddToCart';
import { BlindPair } from '@/components/BlindPair';
import { Ext, MorphQuote } from '@/components/Ext';
import {
  perfumes, COLLECTIONS, ALL_BY_COLLECTION, bestsellerMix, travelFor, sampleSets, discoverySets, layeringSets, bodyItems, BODY_KIND,
  giftBox, giftCard, TRIAL, FREE_SHIPPING, snapshotAt, lei, productHref, collectionHref, offerItem, fullItem, bodyItem,
  type BodyItem, type Offer,
} from '@/lib/catalog';
import s from './cadouri.module.css';

export const metadata = { title: 'Cadouri' };

// Morph's own words, verified 2026-09-25 (docs/design/phase-c4-3-gifting-newsletter-plan.md §2)
const MORPH = 'https://morphparfum.ro/';
const SETS_LINE = 'Seturi Morph cadou – Seturi elegante de parfum unisex, pregătite special pentru a fi oferite drept cadou.';
const BLIND_LINE = 'Fiind un blind set, identitatea parfumurilor este dezvăluită doar la deschiderea cutiei, iar instrucțiunile complete de layering și ordinea de aplicare sunt incluse în interior.';
const TERMS = 'https://morphparfum.ro/termeni-si-conditii';

const range = (xs: number[]) => {
  const lo = Math.min(...xs), hi = Math.max(...xs);
  return lo === hi ? lei(lo) : `${lo.toLocaleString('ro-RO')}–${lei(hi)}`;
};
const scentOf = (b: BodyItem) => perfumes.find(p => p.slug === b.scent)!;

export default function Page() {
  const picks = bestsellerMix(3);
  const lead = bestsellerMix(1, picks.map(p => p.slug))[0] ?? picks[0];
  const withTravel = perfumes.filter(p => travelFor(p)?.inStock);
  const travelPrice = travelFor(withTravel[0])!.price;
  const samples = sampleSets.filter(x => x.inStock);
  const discovery = discoverySets().find(x => x.inStock);
  const ynfIn = layeringSets.filter(x => x.inStock);
  const bottles = perfumes.filter(p => p.inStock).map(p => p.price);
  const coffret = (['set-gel', 'set-cream'] as const).map(k => ({ k, sets: bodyItems.filter(b => b.kind === k && b.scent) }));
  // up to three boxes in stock, taking the two kinds in turn
  const inStock = coffret.map(c => c.sets.filter(b => b.inStock));
  const coffretPicks = [0, 1, 2].flatMap(i => inStock.map(l => l[i])).filter(Boolean).slice(0, 3) as BodyItem[];
  const cardValues = giftCard?.values ?? null;
  const explore = [travelPrice, ...(ynfIn.length ? [ynfIn[0].price] : []), ...samples.map(x => x.price), ...(discovery ? [discovery.price] : [])];

  // the budget index: one row per real format, never two formats merged because they cost the same
  const budget: { price: number; label: string; what: string; href: string }[] = [
    { price: travelPrice, label: lei(travelPrice), what: `Travel 2×8 ml, unul din ${withTravel.length} parfumuri`, href: '#descoperire' },
    ...(ynfIn.length ? [{ price: ynfIn[0].price, label: lei(ynfIn[0].price), what: `Your Next Form, set blind de layering 2×8 ml (${ynfIn.length} din ${layeringSets.length} stări în stoc)`, href: '#surpriza' }] : []),
    ...(samples.length ? [{ price: samples[0].price, label: lei(samples[0].price), what: `Set de mostre: ${samples.map(x => TRIAL[x.slug].name.replace('Mostre ', '')).join(' sau ')}`, href: '#descoperire' }] : []),
    ...[...new Set(perfumes.filter(p => p.inStock).map(p => p.price))].map(v => ({
      price: v, label: lei(v), what: `Sticla de 100 ml: ${ALL_BY_COLLECTION.filter(c => perfumes.some(p => p.collection === c && p.price === v)).map(c => COLLECTIONS[c].name).join(', ')}`, href: '#sticla',
    })),
    ...coffret.filter(c => c.sets.some(b => b.inStock)).map(({ k, sets }) => {
      const prices = sets.filter(b => b.inStock).map(b => b.price);
      return { price: Math.min(...prices), label: range(prices), what: `Coffret ${k === 'set-gel' ? 'parfum și gel de duș' : 'parfum și cremă de corp'}`, href: '#coffret' };
    }),
    ...(discovery ? [{ price: discovery.price, label: lei(discovery.price), what: 'Discovery Travel, 24 de flacoane de 8 ml', href: '#descoperire' }] : []),
    ...(giftCard ? [{ price: giftCard.range?.[0] ?? giftCard.price, label: range(cardValues ?? giftCard.range ?? [giftCard.price]), what: 'Gift card Morph, valoarea o alegi tu', href: '#card' }] : []),
  ].sort((a, b) => a.price - b.price);

  return (
    <>
      <div className="wrap">
        <PageHead id="cadouri-titlu" title="Cadouri" crumbs={[{ href: '/', label: 'Morph' }, { label: 'Cadouri' }]}
          lede="Un parfum e greu de ghicit pentru altcineva. Alege după cât de bine îl cunoști."
          meta={`Prețurile și stocul sunt cele din instantaneul catalogului Morph din ${new Date(snapshotAt).toLocaleDateString('ro-RO')}.`} />

        {/* the buyer's question first; the three answers are anchors, nothing is stored */}
        <section className={s.ask} aria-labelledby="intrebare">
          <h2 id="intrebare" className="t-1">Cât de bine știi parfumul cuiva?</h2>
          <ul className={s.answers}>
            <li>
              <a href="#sticla" className={s.answer}>
                <ProductVisual p={lead} sizes="(max-width: 899px) 60vw, 26vw" alt="" className={s.answerNiche} />
                <span className={s.answerName}>Știu ce poartă</span>
                <span className="t-small muted">Sticla de 100 ml sau un coffret · de la <span className="num">{lei(Math.min(...bottles))}</span></span>
              </a>
            </li>
            <li>
              <a href="#descoperire" className={s.answer}>
                <Niche src={samples[0]?.image ?? discovery?.image ?? null} alt="" sizes="(max-width: 899px) 60vw, 26vw" className={s.answerNiche} />
                <span className={s.answerName}>Am o bănuială sau nu știu deloc</span>
                <span className="t-small muted">Formate mici și seturi · <span className="num">{range(explore)}</span></span>
              </a>
            </li>
            {giftCard && (
              <li>
                <a href="#card" className={s.answer}>
                  <span className={`${s.answerNiche} ${s.cardObject}`} data-tone="wood" aria-hidden><span>Gift card</span></span>
                  <span className={s.answerName}>Prefer să aleagă singur</span>
                  <span className="t-small muted">Gift card pe e-mail · <span className="num">{range(cardValues ?? giftCard.range ?? [giftCard.price])}</span></span>
                </a>
              </li>
            )}
          </ul>
        </section>
      </div>

      {/* 1. You know what they wear */}
      <section id="sticla" className="band" aria-labelledby="sticla-titlu">
        <div className="wrap">
          <div className={s.head}>
            <h2 id="sticla-titlu" className="t-1">Dacă știi ce poartă</h2>
            <p className="muted">Sticla de 100 ml. Cele mai alese, din fiecare colecție:</p>
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
          <p className={s.more}>
            <Link className="link" href="/parfumuri">Caută parfumul în vitrină</Link>
            {ALL_BY_COLLECTION.map(c => <Link key={c} className="link" href={collectionHref(c)}>Colecția {COLLECTIONS[c].name}</Link>)}
          </p>
          {giftBox && (
            <div className={s.box}>
              <Niche src={giftBox.image} alt="Cutia cadou Morph, albă, cu logo-ul Morph" sizes="120px" className={s.boxNiche} />
              <p className="t-small">Cutia cadou Morph, <span className="num">+{lei(giftBox.price)}</span>, se bifează pe pagina parfumului sau în coș. Morph o oferă la sticla de 100 ml, la travel, la mostre și la gel.</p>
            </div>
          )}
        </div>
      </section>

      {/* 1b. Coffret: Morph's own gift sets */}
      {coffretPicks.length > 0 && (
        <section id="coffret" className="band" data-tone="wood" aria-labelledby="coffret-titlu">
          <div className="wrap">
            <div className={s.head}>
              <div>
                <h2 id="coffret-titlu" className="t-1">Coffret</h2>
                <p className="muted">Parfumul de 100 ml și gelul de duș sau crema de corp ale aceluiași parfum, în cutia lor.</p>
              </div>
              <MorphQuote className={s.quote} text={SETS_LINE} cite="Pagina principală, morphparfum.ro" href={MORPH} />
            </div>
            <p className={`${s.counts} t-small muted num`}>
              {coffret.map(({ k, sets }) => `${BODY_KIND[k].name}: ${sets.filter(b => b.inStock).length} din ${sets.length} în stoc`).join(' · ')}
            </p>
            <ul className={s.sets}>
              {coffretPicks.map(b => {
                const p = scentOf(b);
                return (
                  <li key={b.slug} className={s.set}>
                    <Link href={`/${b.slug}`} className={s.objectLink}>
                      <Niche src={b.image} alt="" sizes="(max-width: 899px) 80vw, 30vw" className={s.setNiche} />
                      <span className="label muted">{BODY_KIND[b.kind].name}</span>
                      <span className={s.setName}>{p.shortName}</span>
                    </Link>
                    <p className={s.setFoot}>
                      <span className="num">{lei(b.price)}</span>
                      <AddToCart className="btn btn-sm btn-secondary" items={[bodyItem(b, p)]} aria-label={`Adaugă ${BODY_KIND[b.kind].name} ${p.shortName} în coș, ${lei(b.price)}`}>Adaugă</AddToCart>
                    </p>
                  </li>
                );
              })}
            </ul>
            <p className={s.more}><Link className="link" href="/parfumuri/corp#coffret">Toate seturile Coffret</Link></p>
          </div>
        </section>
      )}

      {/* 2. You don't know it yet */}
      <section id="descoperire" className={`band ${s.discover}`} aria-labelledby="descoperire-titlu">
        <div className="wrap">
          <div className={s.head}>
            <h2 id="descoperire-titlu" className="t-1">Dacă nu știi încă</h2>
            <p className="muted">Formatele mici îl lasă pe cel care primește să aleagă pe piele. Toate sunt produse Morph.</p>
          </div>

          <div className={s.hunch}>
            <h3 className="t-2">Ai o bănuială?</h3>
            <p>Explorează Fragrance Finder gândindu-te la persoana căreia îi alegi cadoul. Rezultatul te poate orienta; verifică formatul și disponibilitatea parfumului înainte de a alege.</p>
            <Link className="btn btn-secondary" href="/descopera/finder">Fragrance Finder</Link>
          </div>

          <ul className={s.sets}>
            <li className={s.set}>
              <Niche src="/morph/set-travel-morph-zeta-0.avif" alt="Set travel Morph Zeta" sizes="(max-width: 899px) 80vw, 24vw" className={s.setNiche} />
              <h3 className={s.setName}>Travel 2×8 ml</h3>
              <p className="t-small muted">Un singur parfum, în două flacoane de 8 ml. Există pentru {withTravel.length} parfumuri: {withTravel.map(p => p.shortName).join(', ')}.</p>
              <p className={s.setFoot}><span className="num">{lei(travelPrice)}</span><Link className="link t-small" href="/descopera#travel">Alege parfumul</Link></p>
            </li>
            {samples.map(o => <SetItem key={o.slug} o={o} name={TRIAL[o.slug].name} what={`${TRIAL[o.slug].what} Mini sticle de 2,5 ml, cu pulverizator.`} format="Set de mostre" />)}
            {discovery && <SetItem o={discovery} name={TRIAL[discovery.slug].name} what={TRIAL[discovery.slug].what} format="Set travel" />}
          </ul>
        </div>
      </section>

      {/* 3. A surprise, composed by Morph */}
      <section id="surpriza" className="band" data-tone="dark" aria-labelledby="surpriza-titlu">
        <div className={`wrap ${s.surprise}`}>
          <BlindPair className={s.blind} />
          <div className={s.surpriseText}>
            <h2 id="surpriza-titlu" className="t-1">O surpriză</h2>
            <p className="t-lede">Your Next Form: {layeringSets.length} stări, fiecare un set de două parfumuri de 8 ml, gândite să fie purtate împreună.</p>
            <MorphQuote className={s.quote} text={BLIND_LINE} cite="Descrierea seturilor Your Next Form, morphparfum.ro" href={layeringSets[0].url} />
            <p className="t-small muted">{layeringSets.map(x => x.state).join(', ')}. <span className="num">{lei(layeringSets[0].price)}</span> setul, {ynfIn.length} din {layeringSets.length} în stoc.</p>
            <Link className="btn" href="/layering/your-next-form">Alege o stare</Link>
          </div>
        </div>
      </section>

      {/* 4. Gift card: sold on morphparfum.ro only */}
      {giftCard && (
        <section id="card" className="band" data-tone="wood" aria-labelledby="card-titlu">
          <div className={`wrap ${s.card}`}>
            <div className={s.cardHead}>
              <h2 id="card-titlu" className="t-1">Gift card Morph</h2>
              <p className={`${s.values} num`} aria-label="Valori">
                {(cardValues ?? giftCard.range ?? [giftCard.price]).map((v, i, a) => (
                  <span key={v}>{v.toLocaleString('ro-RO')}{i === a.length - 1 ? ' lei' : ''}</span>
                ))}
              </p>
              {!cardValues && <p className="t-micro muted">Interval de valori; sumele exacte sunt pe pagina Morph.</p>}
            </div>
            <dl className={s.cardFacts}>
              <div><dt className="label muted">Cum ajunge</dt><dd>Pe e-mail, la adresa celui care îl primește, cu „De la” și un mesaj opțional de până la 500 de caractere</dd></div>
              <div><dt className="label muted">Unde se folosește</dt><dd>Se cumpără și se folosește doar online, pe morphparfum.ro</dd></div>
              <div><dt className="label muted">Valabilitate</dt><dd><span className="num">180 de zile</span> de la emitere</dd></div>
              <div><dt className="label muted">Condiții</dt><dd>Nu poate fi returnat, rambursat sau anulat. Nu se poate plăti ramburs.</dd></div>
            </dl>
            <div className={s.cardAct}>
              <Ext className="btn btn-secondary" href={giftCard.url}>Cumpără gift card-ul pe morphparfum.ro</Ext>
              <p className="t-micro muted">Condițiile Morph de pe pagina gift card-ului, verificate pe 25.09.2026.</p>
            </div>
          </div>
        </section>
      )}

      {/* 5. The budget index, as a reference at the end */}
      <div className="wrap">
        <section id="buget" className={s.budget} aria-labelledby="buget-titlu">
          <h2 id="buget-titlu" className="label muted">După buget</h2>
          <ol>
            {budget.map(b => (
              <li key={b.what}>
                <a href={b.href} className={s.budgetRow}>
                  <span className={`${s.budgetPrice} num`}>{b.label}</span>
                  <span>{b.what}</span>
                </a>
              </li>
            ))}
          </ol>
        </section>
        <p className={`${s.practical} t-small muted`}>
          Livrarea e gratuită de la <span className="num">{lei(FREE_SHIPPING)}</span>, cum afișează Morph. Morph nu livrează sâmbăta și duminica, iar în perioada sărbătorilor livrarea poate dura mai mult; costul exact apare la finalizarea comenzii. <Ext href={TERMS}>Termenii Morph</Ext>
        </p>
      </div>
    </>
  );
}

function SetItem({ o, name, what, format }: { o: Offer; name: string; what: string; format: string }) {
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
