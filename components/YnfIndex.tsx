'use client';
import Image from 'next/image';
import { useState } from 'react';
import { type Offer, lei, firstSentences } from '@/lib/catalog';
import { AddToCart } from './AddToCart';
import { BlindStrata } from './BlindStrata';
import s from './YnfIndex.module.css';

/** Morph's accord sentence: the product copy without its "Descoperă X, unul dintre…" opener. */
const accord = (o: Offer) => (o.summary.match(/[^.!?]+[.!?]+/g) ?? [o.summary]).slice(1).join(' ').trim() || o.summary;

/** Morph's own phrase naming the accord's notes ("cu note de…" / "construită în jurul…"), when the copy has one. */
const notesOf = (o: Offer) => {
  const m = o.summary.match(/(cu note[^.]*|construită în jurul[^.]*)(?:\.|$)/)?.[1]?.trim();
  return m ? m.charAt(0).toUpperCase() + m.slice(1) + '.' : null;
};

/** The twelve blind sets as a collection index (same pattern as /parfumuri): rows, and a preview on desktop. */
export function YnfIndex({ sets }: { sets: Offer[] }) {
  const [active, setActive] = useState(sets[0].slug);
  const a = sets.find(x => x.slug === active) ?? sets[0];
  return (
    <div className={s.split}>
      <ol className={s.list} aria-label="Seturile Your Next Form">
        {sets.map(o => (
          <li key={o.slug} className={s.row} data-active={o.slug === active} onMouseEnter={() => setActive(o.slug)} onFocus={() => setActive(o.slug)}>
            <BlindStrata className={s.strip} />
            <div className={s.thumb} aria-hidden>{o.image && <Image src={o.image} alt="" fill sizes="72px" />}</div>
            <h2 className={s.name}><a href={o.url}>{o.state}</a></h2>
            <p className={s.accord}>{notesOf(o) ?? firstSentences(accord(o), 1)}</p>
            <p className={`${s.price} t-small`}><b className="num">{lei(o.price)}</b><br /><span className="muted">{o.inStock ? 'În stoc' : 'Stoc epuizat'}</span></p>
            <div className={s.act}>
              {o.inStock
                ? <AddToCart className="btn btn-sm btn-secondary" items={[{ key: o.slug, name: `Your Next Form ${o.state}`, format: 'Set blind 2×8 ml', price: o.price }]} aria-label={`Adaugă setul ${o.state} în coș, ${lei(o.price)}`}>Adaugă</AddToCart>
                : <a className="t-small link" href={o.url}>Anunță-mă</a>}
            </div>
          </li>
        ))}
      </ol>
      <aside className={s.preview} aria-label={`Previzualizare ${a.state}`}>
        <div className={s.previewVisual}>{a.image && <Image src={a.image} alt={`Cutia setului ${a.state}`} fill sizes="34vw" />}</div>
        <h2 className="t-2">{a.state}</h2>
        <p>{accord(a)}</p>
        <p className="t-small muted">Set blind, 2×8 ml. Parfumurile se dezvăluie la deschiderea cutiei.</p>
        <div className={s.previewActions}>
          {a.inStock && <AddToCart items={[{ key: a.slug, name: `Your Next Form ${a.state}`, format: 'Set blind 2×8 ml', price: a.price }]}>Adaugă în coș <span className="num">{lei(a.price)}</span></AddToCart>}
          <a className="link t-small" href={a.url}>Pagina setului pe morphparfum.ro</a>
        </div>
      </aside>
    </div>
  );
}
