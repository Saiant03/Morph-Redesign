'use client';
import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';
import { perfumes, bySlug, travelFor, samplesFor, layeringSets, lei, COLLECTIONS, ALL_BY_COLLECTION, type Perfume } from '@/lib/catalog';
import { scentTokens } from '@/lib/scent';
import { ProductVisual } from './ProductVisual';
import { AddToCart } from './AddToCart';
import { TIERS } from './NotePyramid';
import s from './LayeringComposer.module.css';

type Slot = 0 | 1;

/**
 * Signature interaction. Each fragrance is a column of three strata (opening, heart, base) in its own color.
 * The two columns slide together; where they overlap, the strata multiply into the layered result, tier by tier.
 * A visitor-chosen pair is a visualisation, never presented as a Morph recommendation.
 */
export function LayeringComposer({ first, second, heading, headingId }: { first: string; second: string; heading: string; headingId: string }) {
  const [pair, setPair] = useState<[string, string]>([first, second]);
  const [open, setOpen] = useState<Slot | null>(null);
  const [joined, setJoined] = useState(true);
  const slotRefs = [useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null)];
  const pickerId = useId();
  const [A, B] = pair.map(bySlug) as [Perfume, Perfume];
  const [tA, tB] = [scentTokens(A), scentTokens(B)];

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    setJoined(false);
    const t = setTimeout(() => setJoined(true), 380);
    return () => clearTimeout(t);
  }, [pair]);

  function choose(slot: Slot, slug: string) {
    setPair(prev => (slot === 0 ? [slug, prev[1]] : [prev[0], slug]));
    setOpen(null);
    slotRefs[slot].current?.focus();
  }

  const travelA = travelFor(A), travelB = travelFor(B);
  const missing = [travelA ? null : A, travelB ? null : B].filter(Boolean) as Perfume[];

  return (
    <div className={s.composer} style={{ '--a': tA.scent, '--b': tB.scent } as React.CSSProperties}>
      <div className={s.stage} data-joined={joined} aria-hidden>
        <ol className={s.axis}>{TIERS.map(t => <li key={t.key}>{t.label}</li>)}</ol>
        {[tA, tB].map((t, k) => (
          <div key={k} className={`${s.column} ${k ? s.colB : s.colA}`}>
            {t.tiers.map((c, i) => <span key={i} style={{ backgroundColor: c, transitionDelay: `${i * 120}ms` }} />)}
          </div>
        ))}
        {[A, B].map((p, k) => (
          <div key={k} className={s.bottle} style={{ left: k ? '59%' : '23%' }}>
            <Image src={p.images[0]} alt="" fill sizes="120px" />
          </div>
        ))}
        <div className={s.names}>
          <span>{A.shortName}</span><span className={s.sum}>{A.shortName} + {B.shortName}</span><span>{B.shortName}</span>
        </div>
      </div>

      <div className={s.panel}>
        <h2 id={headingId} className="t-2">{heading}</h2>
        <p className="muted">Layering înseamnă două parfumuri purtate împreună. Alege două și vezi cum se suprapun, de la deschidere la bază.</p>

        <div className={s.slots}>
          {([0, 1] as Slot[]).map(k => {
            const p = k ? B : A;
            return (
              <button key={k} ref={slotRefs[k]} type="button" className={s.slot} aria-expanded={open === k} aria-controls={pickerId}
                onClick={() => setOpen(open === k ? null : k)}>
                <ProductVisual p={p} sizes="64px" alt="" className={s.slotVisual} />
                <span className={s.slotText}>
                  <span className="t-micro muted">{k ? 'Al doilea strat' : 'Primul strat'}</span>
                  <span className={s.slotName}>{p.shortName}</span>
                </span>
                <span className="t-small link">{open === k ? 'Închide' : 'Schimbă'}</span>
              </button>
            );
          })}
        </div>

        <div id={pickerId} className={s.picker} hidden={open === null}>
          {open !== null && ALL_BY_COLLECTION.map(c => (
            <div key={c} role="group" aria-label={`${open ? 'Al doilea strat' : 'Primul strat'}, ${COLLECTIONS[c].name}`} className={s.pickGroup}>
              <span className="t-micro muted">{COLLECTIONS[c].name}</span>
              <div className={s.chips}>
                {perfumes.filter(p => p.collection === c).map(p => {
                  const other = pair[open ? 0 : 1] === p.slug;
                  return (
                    <button key={p.slug} type="button" className={s.chip} aria-pressed={pair[open] === p.slug} disabled={other}
                      title={other ? 'Deja ales ca celălalt strat' : undefined} onClick={() => choose(open, p.slug)}>
                      <span className="swatch" style={{ '--scent': scentTokens(p).scent } as React.CSSProperties} />{p.shortName}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <dl className={s.result} aria-live="polite">
          {TIERS.map((t, i) => (
            <div key={t.key} className={s.resultRow} style={{ '--ta': tA.tiers[i], '--tb': tB.tiers[i] } as React.CSSProperties}>
              <dt>{t.label}</dt>
              <dd>
                {A.notes[t.key].map(n => <span key={'a' + n} className={s.note}><i style={{ background: tA.scent }} />{n}</span>)}
                {B.notes[t.key].map(n => <span key={'b' + n} className={s.note}><i style={{ background: tB.scent }} />{n}</span>)}
              </dd>
            </div>
          ))}
        </dl>
        <p className="t-micro muted">Combinația ta: o vizualizare a celor două compoziții, nu o recomandare Morph.</p>

        <div className={s.buy}>
          {travelA && travelB ? (
            <AddToCart items={[
              { key: travelA.slug, name: A.shortName, format: 'Travel 2×8 ml', price: travelA.price, color: tA.scent },
              { key: travelB.slug, name: B.shortName, format: 'Travel 2×8 ml', price: travelB.price, color: tB.scent },
            ]}>Încearcă-le pe amândouă în travel, {lei(travelA.price + travelB.price)}</AddToCart>
          ) : (
            <p className="t-small">
              {missing.map(p => p.shortName).join(' și ')} {missing.length > 1 ? 'nu au' : 'nu are'} variantă travel. Se {missing.length > 1 ? 'pot' : 'poate'} încerca din{' '}
              {[...new Set(missing.map(p => samplesFor(p)).filter(Boolean))].map((o, i) => (
                <span key={o!.slug}>{i ? ' sau ' : ''}<a className="link" href={o!.url}>setul de mostre {/luxury/.test(o!.slug) ? 'Luxury' : 'Les Exclusifs & Ice'}</a> ({lei(o!.price)})</span>
              ))}.
            </p>
          )}
          <p className="t-small muted">
            Sau lasă-te surprins: <a className="link" href="https://morphparfum.ro/layering">Your Next Form</a>, {layeringSets.length} combinații create de Morph,
            dezvăluite abia la deschiderea cutiei. 2×8 ml, {lei(layeringSets[0].price)}.
          </p>
        </div>
      </div>
    </div>
  );
}
