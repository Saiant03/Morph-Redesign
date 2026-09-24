'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { perfumes, bySlug, travelFor, samplesFor, layeringSets, lei, familyGroup, hours, productHref, COLLECTIONS, ALL_BY_COLLECTION, type Perfume } from '@/lib/catalog';
import { scentTokens } from '@/lib/scent';
import { pairKey } from '@/lib/tryList';
import { ProductVisual } from './ProductVisual';
import { AddToCart } from './AddToCart';
import { TryToggle } from './TryToggle';
import { TIERS } from './NotePyramid';
import s from './LayeringComposer.module.css';

type Slot = 0 | 1;
type Props = { first: string; second: string; heading: string; headingId: string; intro?: string; detail?: boolean };

const norm = (t: string) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ţ/g, 't').trim();
const TIER_WORD = { top: 'deschidere', heart: 'inimă', base: 'bază' } as const;

/** Notes present in both pyramids (same wording), with the tier where each perfume carries them. */
function sharedNotes(A: Perfume, B: Perfume) {
  const where = (p: Perfume) => new Map(TIERS.flatMap(t => p.notes[t.key].map(n => [norm(n), { name: n, tier: t.key }] as const)));
  const a = where(A), b = where(B);
  return [...a.entries()].filter(([k]) => b.has(k)).map(([k, v]) => ({ name: v.name, a: v.tier, b: b.get(k)!.tier }));
}

/**
 * Signature interaction. Each fragrance is a column of three strata (opening, heart, base) in its own color.
 * The two columns slide together; where they overlap, the strata multiply into the layered result, tier by tier.
 * On phones the columns turn into three horizontal bands (same logic, readable at 390px, no hover needed).
 * A visitor-chosen pair is a visualisation, never presented as a Morph recommendation.
 * `detail` (the /layering page) adds URL state, what the two share, formats and prices for both.
 */
export function LayeringComposer({ first, second, heading, headingId, intro, detail = false }: Props) {
  const [pair, setPair] = useState<[string, string]>([first, second]);
  const [open, setOpen] = useState<Slot | null>(null);
  const [joined, setJoined] = useState(true);
  const [copied, setCopied] = useState(false);
  const slotRefs = [useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null)];
  const pickerId = useId();
  const [A, B] = pair.map(bySlug) as [Perfume, Perfume];
  const [tA, tB] = [scentTokens(A), scentTokens(B)];
  const query = `a=${A.slug}&b=${B.slug}`;

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    setJoined(false);
    setCopied(false);
    if (detail) window.history.replaceState(null, '', `${window.location.pathname}?${query}`);
    const t = setTimeout(() => setJoined(true), 380);
    return () => clearTimeout(t);
  }, [pair, detail, query]);

  function choose(slot: Slot, slug: string) {
    setPair(prev => (slot === 0 ? [slug, prev[1]] : [prev[0], slug]));
    setOpen(null);
    slotRefs[slot].current?.focus();
  }

  async function copy() {
    try { await navigator.clipboard.writeText(window.location.href); setCopied(true); } catch { setCopied(false); }
  }

  const travelA = travelFor(A), travelB = travelFor(B);
  const missing = [travelA ? null : A, travelB ? null : B].filter(Boolean) as Perfume[];
  const shared = sharedNotes(A, B);
  const seasons = A.season.filter(x => B.season.includes(x));
  const [fA, fB] = [familyGroup(A), familyGroup(B)];

  return (
    <div className={s.composer} data-detail={detail} style={{ '--a': tA.scent, '--b': tB.scent } as React.CSSProperties}>
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
        {/* phone layout: tiers as rows, A from the left, B from the right, the overlap in the middle */}
        <div className={s.bands}>
          <p className={s.bandNames}><span>{A.shortName}</span><span className={s.sum}>împreună</span><span>{B.shortName}</span></p>
          {TIERS.map((t, i) => (
            <div key={t.key} className={s.band}>
              <span className={s.bandLabel}>{t.label}</span>
              <span className={s.track}>
                <i className={s.bandA} style={{ backgroundColor: tA.tiers[i], transitionDelay: `${i * 120}ms` }} />
                <i className={s.bandB} style={{ backgroundColor: tB.tiers[i], transitionDelay: `${i * 120}ms` }} />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={s.panel}>
        <h2 id={headingId} className="t-2">{heading}</h2>
        <p className="muted">{intro ?? 'Layering înseamnă două parfumuri purtate împreună. Alege două și vezi cum se suprapun, de la deschidere la bază.'}</p>

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
                <span className={`t-small link ${s.slotAction}`}>{open === k ? 'Închide' : 'Schimbă'}</span>
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

        {detail && (
          <dl className={s.compare}>
            <div>
              <dt>Note comune</dt>
              <dd>{shared.length ? shared.map(n => `${n.name} (${TIER_WORD[n.a]}${n.a === n.b ? ' la amândouă' : ` / ${TIER_WORD[n.b]}`})`).join(', ') : 'Niciuna în notele publicate: fiecare strat aduce altceva.'}</dd>
            </div>
            <div>
              <dt>Familii</dt>
              <dd>{fA && fB && fA.id === fB.id ? `Amândouă ${fA.name.toLowerCase()}` : `${fA?.name ?? 'nespecificată'} și ${fB?.name.toLowerCase() ?? 'nespecificată'}`}</dd>
            </div>
            <div>
              <dt>Intensitate, longevitate</dt>
              <dd>{A.shortName}: {A.intensity?.toLowerCase() ?? 'nespecificată'}, <span className="num">{hours(A) ?? '—'}</span>. {B.shortName}: {B.intensity?.toLowerCase() ?? 'nespecificată'}, <span className="num">{hours(B) ?? '—'}</span>.</dd>
            </div>
            <div>
              <dt>Anotimpuri comune</dt>
              <dd>{seasons.length ? seasons.join(', ') : 'Niciunul în datele Morph'}</dd>
            </div>
          </dl>
        )}
        <p className="t-micro muted">Combinația ta: o vizualizare a celor două compoziții după notele publicate de Morph, nu o recomandare Morph.</p>

        {detail && (
          <table className={s.formats}>
            <caption className="sr-only">Formate și prețuri</caption>
            <thead><tr><th scope="col"><span className="sr-only">Parfum</span></th><th scope="col">100 ml</th><th scope="col">Travel 2×8 ml</th></tr></thead>
            <tbody>
              {[A, B].map(p => {
                const t = travelFor(p);
                return (
                  <tr key={p.slug}>
                    <th scope="row"><span className="swatch" style={{ '--scent': scentTokens(p).scent } as React.CSSProperties} /><Link className="link" href={productHref(p)}>{p.shortName}</Link></th>
                    <td className="num">{lei(p.price)}{!p.inStock && <span className="muted">, epuizat</span>}</td>
                    <td className="num">{t ? lei(t.price) : <span className="muted">nu există</span>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

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
                <span key={o!.slug}>{i ? ' sau ' : ''}<a className="link" href={o!.url}>setul de mostre {/luxury/.test(o!.slug) ? 'Luxury' : 'Les Exclusifs & Ice'}</a> ({lei(o!.price)}{o!.inStock ? '' : ', epuizat'})</span>
              ))}.
            </p>
          )}
          {detail && A.inStock && B.inStock && (
            <AddToCart className="btn btn-secondary" items={[A, B].map(p => ({ key: p.slug, name: p.shortName, format: '100 ml', price: p.price, color: scentTokens(p).scent }))}>
              Ambele sticle de 100 ml, {lei(A.price + B.price)}
            </AddToCart>
          )}
          <p className={s.links}>
            {detail
              ? <button type="button" className="text-btn link t-small" onClick={copy}>{copied ? 'Link copiat' : 'Copiază linkul combinației'}</button>
              : <Link className="link t-small" href={`/layering?${query}`}>Deschide în Layering</Link>}
            <TryToggle id={pairKey(A.slug, B.slug)} name={`${A.shortName} + ${B.shortName}`} />
          </p>
          <span className="sr-only" aria-live="polite">{copied ? 'Linkul combinației a fost copiat.' : ''}</span>
          <p className="t-small muted">
            Sau lasă-te surprins: <Link className="link" href="/layering/your-next-form">Your Next Form</Link>, {layeringSets.length} combinații create de Morph,
            dezvăluite abia la deschiderea cutiei. 2×8 ml, {lei(layeringSets[0].price)}.
          </p>
        </div>
      </div>
    </div>
  );
}
