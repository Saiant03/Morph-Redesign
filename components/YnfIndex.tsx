'use client';
import { useRef, useState } from 'react';
import { type Offer, lei, offerItem, stateKey } from '@/lib/catalog';
import { AddToCart } from './AddToCart';
import { Niche } from './ProductVisual';
import { BlindPair } from './BlindPair';
import s from './YnfIndex.module.css';

/** Morph's accord text: the product copy without its "Descoperă X, unul dintre…" opener. */
const accord = (o: Offer) => (o.summary.match(/[^.!?]+[.!?]+/g) ?? [o.summary]).slice(1).join(' ').trim() || o.summary;

/**
 * Your Next Form (docs/design/phase-c3-5-layering-ynf.md): the twelve states as one typographic line, and the
 * chosen state's sealed box beside it. What is known (state, Morph's accord, format, price, stock) is shown; the two
 * fragrances are not, anywhere in the DOM: the two niches stay unlit. Each state is a link (?stare=), so the choice
 * works without JS and can be shared; with JS it changes in place. Only the chosen set is rendered in full.
 */
export function YnfIndex({ sets, initial }: { sets: Offer[]; initial: string }) {
  const [active, setActive] = useState(initial);
  const panel = useRef<HTMLDivElement>(null);
  const a = sets.find(o => stateKey(o) === active) ?? sets[0];

  function pick(e: React.MouseEvent<HTMLAnchorElement>, key: string) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    setActive(key);
    window.history.replaceState(null, '', `?stare=${key}`);
    // on phones the box sits under the line of names: bring its top into view if it is below the fold
    const r = panel.current?.getBoundingClientRect();
    if (r && r.top > innerHeight - 120) panel.current?.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  return (
    <div className={s.split}>
      <ol className={s.states} aria-label={`Cele ${sets.length} stări Your Next Form`}>
        {sets.map(o => {
          const k = stateKey(o);
          return (
            <li key={o.slug}>
              <a href={`?stare=${k}#stari`} aria-current={k === stateKey(a) ? 'true' : undefined} aria-controls="ynf-cutia" onClick={e => pick(e, k)}>
                {o.state}{!o.inStock && <span className={s.out}> · epuizat</span>}
              </a>
            </li>
          );
        })}
      </ol>

      <div id="ynf-cutia" ref={panel} className={s.box} aria-labelledby="ynf-stare">
        <div className={s.boxObjects}>
          <Niche src={a.image} alt={`Cutia setului ${a.state}`} sizes="(max-width: 899px) 60vw, 22vw" className={s.boxVisual} />
          <figure className={s.inside}>
            <BlindPair className={s.pair} />
            <figcaption className="t-micro muted">Înăuntru: două parfumuri de 8 ml, fără nume până la deschidere.</figcaption>
          </figure>
        </div>
        <div className={s.boxText} key={a.slug}>
          <h3 id="ynf-stare" className={s.name} aria-live="polite">{a.state}</h3>
          <p className={s.accord}>{accord(a)}</p>
          <p className="t-small"><b className="num">{lei(a.price)}</b> · set blind 2×8 ml · <span className={a.inStock ? undefined : 'muted'}>{a.inStock ? 'în stoc' : 'stoc epuizat'}</span></p>
          <div className={s.actions}>
            {a.inStock
              ? <AddToCart items={[offerItem(a, `Your Next Form ${a.state}`, 'Set blind 2×8 ml')]}>Adaugă {a.state} în coș <span className="num">{lei(a.price)}</span></AddToCart>
              : <a className="btn btn-secondary" href={a.url}>Anunță-mă pe morphparfum.ro</a>}
            <a className="link t-small" href={a.url}>Pagina setului pe morphparfum.ro</a>
          </div>
        </div>
      </div>
    </div>
  );
}
