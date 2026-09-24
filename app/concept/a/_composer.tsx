'use client';
import { useEffect, useState } from 'react';
import { perfumes, bySlug, tone, travelFor, layeringSets, lei, COLLECTIONS, ALL_BY_COLLECTION, descriptor } from '@/lib/catalog';
import { addToCart } from '@/components/shared/cart';
import s from './cromatic.module.css';

/**
 * Signature A: two panes of colored glass slide together; where they overlap, the colors multiply into a third.
 * This visualises a combination the visitor chooses. It is not a Morph pairing recommendation.
 */
export function Composer({ first, second, title = 'Două culori, a treia formă.' }: { first: string; second: string; title?: string }) {
  const [a, setA] = useState(first);
  const [b, setB] = useState(second);
  const [joined, setJoined] = useState(false);
  useEffect(() => { setJoined(false); const t = setTimeout(() => setJoined(true), 450); return () => clearTimeout(t); }, [a, b]);
  const A = bySlug(a), B = bySlug(b);
  const tA = travelFor(A), tB = travelFor(B);
  const sets = layeringSets.filter(x => x.inStock).length;

  const options = ALL_BY_COLLECTION.map(c => (
    <optgroup key={c} label={COLLECTIONS[c].name}>
      {perfumes.filter(p => p.collection === c).map(p => <option key={p.slug} value={p.slug}>{p.shortName}</option>)}
    </optgroup>
  ));

  return (
    <div className={s.composer}>
      <div className={s.panes} data-joined={joined} aria-hidden>
        <div className={`${s.pane} ${s.paneA}`} style={{ backgroundColor: tone(A).identity }} />
        <div className={`${s.pane} ${s.paneB}`} style={{ backgroundColor: tone(B).identity }} />
        <span className={s.overlapLabel}>{A.shortName} + {B.shortName}</span>
        <span className={s.paneLabel} style={{ left: '14%' }}>{A.shortName}</span>
        <span className={s.paneLabel} style={{ right: '14%' }}>{B.shortName}</span>
      </div>
      <div className={s.composerText}>
        <h2 className={s.h2}>{title}</h2>
        <p className={s.muted} style={{ margin: 0 }}>Layering înseamnă două parfumuri purtate împreună. Alege două și vezi-le culorile suprapuse.</p>
        <div className={s.pickers}>
          <label className={s.picker}>Primul strat<select className={s.select} value={a} onChange={e => setA(e.target.value)}>{options}</select></label>
          <label className={s.picker}>Al doilea strat<select className={s.select} value={b} onChange={e => setB(e.target.value)}>{options}</select></label>
        </div>
        <p style={{ margin: 0, fontSize: 15 }}>
          <b style={{ fontWeight: 500 }}>{A.shortName}</b> <span className={s.muted}>{descriptor(A)}</span><br />
          <b style={{ fontWeight: 500 }}>{B.shortName}</b> <span className={s.muted}>{descriptor(B)}</span>
        </p>
        {a === b ? (
          <p className={s.blendNote}>Alege două parfumuri diferite.</p>
        ) : tA && tB ? (
          <button type="button" className={s.btn} style={{ alignSelf: 'start' }}
            onClick={() => { addToCart({ name: A.shortName, price: tA.price, format: 'Travel 2×8 ml' }); addToCart({ name: B.shortName, price: tB.price, format: 'Travel 2×8 ml' }); }}>
            Încearcă-le în travel · {lei(tA.price + tB.price)}
          </button>
        ) : (
          <p className={s.blendNote}>Pentru {[tA ? null : A.shortName, tB ? null : B.shortName].filter(Boolean).join(' și ')} nu există variantă travel; se poate încerca din setul de mostre al colecției.</p>
        )}
        <p className={s.blendNote}>Sau lasă-te surprins: {sets} seturi Your Next Form, combinații create de Morph, 2×8 ml, {lei(layeringSets[0].price)}.</p>
      </div>
    </div>
  );
}
