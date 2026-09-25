'use client';
import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import {
  perfumes, bySlug, travelFor, samplesFor, layeringSets, lei, familyGroup, hours, productHref, COLLECTIONS, ALL_BY_COLLECTION,
  fullItem, travelItem, sampleName, BOUTIQUE, type Perfume,
} from '@/lib/catalog';
import { pairKey } from '@/lib/tryList';
import { norm } from '@/lib/discover';
import { PairStage } from './Stage';
import { AddToCart } from './AddToCart';
import { TryToggle } from './TryToggle';
import { TIERS } from './NotePyramid';
import s from './LayeringComposer.module.css';

type Slot = 0 | 1;
type Tier = (typeof TIERS)[number]['key'];
type Pair = [string | null, string | null];

const TIER_WORD = { top: 'deschidere', heart: 'inimă', base: 'bază' } as const;
const SLOT = ['A', 'B'] as const;
const SLOT_ROLE = ['primul strat', 'al doilea strat'] as const;

/** Notes present in both pyramids (same wording after accent folding), with the tier where each perfume carries them. */
function sharedNotes(A: Perfume, B: Perfume) {
  const where = (p: Perfume) => new Map(TIERS.flatMap(t => p.notes[t.key].map(n => [norm(n), { name: n, tier: t.key as Tier }] as const)));
  const a = where(A), b = where(B);
  return [...a.entries()].filter(([k]) => b.has(k)).map(([k, v]) => ({ key: k, name: v.name, a: v.tier, b: b.get(k)!.tier }));
}

/** One tier of the pair: what only A carries, what both carry in this tier (the seam), what only B carries. */
function voices(A: Perfume | null, B: Perfume | null, t: Tier) {
  const bKeys = new Set(B?.notes[t].map(norm) ?? []);
  const meet = A ? A.notes[t].filter(n => bKeys.has(norm(n))) : [];
  const meetKeys = new Set(meet.map(norm));
  const only = (p: Perfume | null) => p?.notes[t].filter(n => !meetKeys.has(norm(n))) ?? [];
  return { a: only(A), meet, b: only(B) };
}

const list = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} și ${xs[xs.length - 1]}`);
const lower = (n: string) => n.charAt(0).toLowerCase() + n.slice(1);

/**
 * Compune (docs/design/phase-c3-5-layering-ynf.md): the composition studio. Two fragrances stand on one glass shelf
 * (PairStage), A in front, B a step behind. Beside them, their published notes are read tier by tier: opening against
 * opening, heart against heart, base against base; notes both carry in one tier meet on the seam. The time axis is
 * three buttons (one per tier): the key light lowers from opening to base and, on wide screens, the tier's notes
 * stand on the glass beside their bottle. Every tier stays in the DOM and readable; nothing depends on scroll.
 * The pair lives in the URL (?a=&b=; empty values are empty slots). A visitor's pair is a visualisation, never
 * presented as a Morph recommendation.
 */
export function LayeringComposer({ first, second, headingId }: { first: string | null; second: string | null; headingId: string }) {
  const [pair, setPair] = useState<Pair>([first, second]);
  const [open, setOpen] = useState<Slot | null>(null);
  const [tier, setTier] = useState<Tier>('top');
  const [rise, setRise] = useState<Slot | null>(null);
  const [copied, setCopied] = useState(false);
  const slotRefs = [useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null)];
  const pickerRef = useRef<HTMLDivElement>(null);
  const pickerId = useId();
  const [A, B] = pair.map(x => (x ? bySlug(x) : null)) as [Perfume | null, Perfume | null];
  const both = A && B ? ([A, B] as const) : null;
  const query = `a=${A?.slug ?? ''}&b=${B?.slug ?? ''}`;

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    setCopied(false);
    window.history.replaceState(null, '', `${window.location.pathname}?${query}`);
  }, [query]);

  // opening the shelf of names puts focus on the chosen name (or the first free one), as a radio group expects
  useEffect(() => {
    if (open === null) return;
    const el = pickerRef.current?.querySelector<HTMLInputElement>('input:checked') ?? pickerRef.current?.querySelector<HTMLInputElement>('input:not(:disabled)');
    el?.focus({ preventScroll: true });
    // on a phone the list opens under the slots, below the fold: bring its top into view
    const r = pickerRef.current?.getBoundingClientRect();
    if (r && r.top > innerHeight - 160) pickerRef.current?.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }, [open]);

  function choose(slot: Slot, slug: string) {
    setPair(prev => (slot === 0 ? [slug, prev[1]] : [prev[0], slug]));
    setRise(slot);
  }
  function close(slot: Slot) {
    setOpen(null);
    slotRefs[slot].current?.focus();
  }
  function clear() {
    setPair([null, null]);
    setOpen(null);
    setTier('top');
    slotRefs[0].current?.focus();
  }
  async function copy() {
    try { await navigator.clipboard.writeText(window.location.href); setCopied(true); } catch { setCopied(false); }
  }

  const here = voices(A, B, tier);

  return (
    <div className={s.composer} data-open={open !== null || undefined} data-empty={!A && !B || undefined}>
      <div className={s.room}>
        <div className={s.stageWrap}>
          <PairStage pair={[A, B]} tier={tier} rise={rise} sizes="(max-width: 899px) 70vw, 32vw" className={s.stage} />
          {/* the tier on the glass (wide screens): the same notes as the strata list, which carries them for everyone */}
          <div className={s.onGlass} aria-hidden key={`${query}|${tier}`}>
            <span className={s.glassA}>{here.a.map(n => <span key={n}>{n}</span>)}</span>
            <span className={s.glassMeet}>{here.meet.map(n => <em key={n}>{n}</em>)}</span>
            <span className={s.glassB}>{here.b.map(n => <span key={n}>{n}</span>)}</span>
          </div>
        </div>

        <div className={s.slots}>
          {([0, 1] as Slot[]).map(k => {
            const p = k ? B : A;
            const f = p && familyGroup(p);
            return (
              <button key={k} ref={slotRefs[k]} type="button" className={s.slot} data-slot={SLOT[k]} aria-expanded={open === k} aria-controls={pickerId}
                onClick={() => (open === k ? close(k) : setOpen(k))}>
                <span className={s.slotHead}><span className={s.letter} aria-hidden>{SLOT[k]}</span><span className="sr-only">{`Parfumul ${SLOT[k]}, ${SLOT_ROLE[k]}: `}</span>
                  <span className={s.slotName}>{p ? p.shortName : 'Alege parfumul'}</span></span>
                <span className={`${s.slotMeta} t-small muted`}>
                  {p ? [f?.name ?? 'familie nespecificată', p.intensity ? `intensitate ${p.intensity.toLowerCase()}` : null, hours(p)?.replace(' ', '\u00a0')].filter(Boolean).join(' · ') : SLOT_ROLE[k]}
                </span>
                <span className={`${s.slotAct} t-small`}>{open === k ? 'Închide lista' : p ? 'Schimbă' : 'Alege din cele 26'}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div id={pickerId} ref={pickerRef} className={s.picker} hidden={open === null}
        onKeyDown={e => { if (e.key === 'Escape' && open !== null) { e.preventDefault(); close(open); } }}>
        {open !== null && (
          <fieldset className={s.pickSet}>
            <legend className={s.pickLegend}>Alege parfumul {SLOT[open]}, {SLOT_ROLE[open]}</legend>
            <div className={s.pickCols}>
              {ALL_BY_COLLECTION.map(c => (
                <fieldset key={c} className={s.pickGroup}>
                  <legend className="label muted">{COLLECTIONS[c].name}</legend>
                  {perfumes.filter(p => p.collection === c).map(p => {
                    const other = pair[open ? 0 : 1] === p.slug;
                    return (
                      <label key={p.slug} className={s.pick} data-other={other || undefined}>
                        <input type="radio" name={`${pickerId}-slot`} value={p.slug} checked={pair[open] === p.slug} disabled={other}
                          onChange={() => choose(open, p.slug)} />
                        <span className={s.pickName}>{p.shortName}</span>
                        {other && <span className="t-micro muted">deja {SLOT[open ? 0 : 1]}</span>}
                      </label>
                    );
                  })}
                </fieldset>
              ))}
            </div>
            <button type="button" className="btn btn-sm btn-secondary" onClick={() => close(open)}>Gata</button>
          </fieldset>
        )}
      </div>

      <div className={s.read}>
        <h2 id={headingId} className={s.pairName}>
          {both ? <>{both[0].shortName} <span className={s.plus} aria-hidden>+</span><span className="sr-only"> și </span> {both[1].shortName}</> : 'Compune'}
        </h2>
        <Together A={A} B={B} />

        <ol className={s.strata} aria-label="Notele perechii, de la deschidere la bază">
          {TIERS.map((t, i) => {
            const v = voices(A, B, t.key);
            return (
              <li key={t.key} className={s.stratum} data-on={tier === t.key} style={{ '--i': i } as React.CSSProperties}>
                <button type="button" className={s.stop} aria-pressed={tier === t.key} onClick={() => setTier(t.key)}>
                  <span className="num" aria-hidden>{i + 1}</span> {t.label}
                </button>
                <p className={s.voices} key={query}>
                  <span className={s.a}>{A && <span className="sr-only">{A.shortName}: </span>}{v.a.map(n => <span key={n}>{n}</span>)}</span>
                  <span className={s.seam}>{v.meet.length ? <><span className="sr-only">Amândouă: </span>{v.meet.map(n => <em key={n}>{n}</em>)}</> : null}</span>
                  <span className={s.b}>{B && <span className="sr-only">{B.shortName}: </span>}{v.b.map(n => <span key={n}>{n}</span>)}</span>
                </p>
              </li>
            );
          })}
        </ol>
        <p className={`${s.hint} t-small muted`}>
          {both ? 'Alege o etapă: lumina coboară pe raft de la deschidere la bază.' : 'Aici vezi notele, etapă cu etapă, după ce alegi parfumurile.'}
          {both && hours(both[0]) && hours(both[1]) ? <> Pe piele, după Morph: {both[0].shortName} <span className="num">{hours(both[0])}</span>, {both[1].shortName} <span className="num">{hours(both[1])}</span>.</> : null}
        </p>
      </div>

      <div className={s.act}>
        {both ? <Act A={both[0]} B={both[1]} copied={copied} copy={copy} clear={clear} /> : (
          <p className="t-small muted">Alege două parfumuri ca să vezi formatele și prețurile perechii.{' '}
            {(A || B) && <button type="button" className="text-btn link" onClick={clear}>Golește raftul</button>}</p>
        )}
      </div>
    </div>
  );
}

/** What the pair shares, as a sentence from Morph's data: notes first, then family and season. */
function Together({ A, B }: { A: Perfume | null; B: Perfume | null }) {
  if (!A || !B) {
    return <p className={s.together}>{!A && !B ? 'Alege două parfumuri: primul stă în față, al doilea în spatele lui.' : 'Alege și al doilea parfum: stă în spatele primului.'}</p>;
  }
  const shared = sharedNotes(A, B);
  const [fA, fB] = [familyGroup(A), familyGroup(B)];
  const seasons = A.season.filter(x => B.season.includes(x));
  const where = (n: (typeof shared)[number]) => (n.a === n.b ? `${TIER_WORD[n.a]} la amândouă` : `${TIER_WORD[n.a]} la ${A.shortName}, ${TIER_WORD[n.b]} la ${B.shortName}`);
  return (
    <div className={s.togetherWrap}>
      <p className={s.together}>
        {shared.length ? <>Se întâlnesc în {list(shared.map(n => lower(n.name)))}.</> : 'Nicio notă comună în notele publicate: fiecare strat aduce altceva.'}
      </p>
      <p className="t-small muted">
        {shared.length > 0 && <>{shared.map(n => `${n.name}: ${where(n)}`).join('. ')}. </>}
        {fA && fB && fA.id === fB.id ? `Amândouă ${fA.name.toLowerCase()}.` : `${fA?.name ?? 'Familie nespecificată'} și ${fB?.name.toLowerCase() ?? 'familie nespecificată'}.`}{' '}
        {seasons.length ? `Anotimp comun în datele Morph: ${seasons.join(', ').toLowerCase()}.` : 'Niciun anotimp comun în datele Morph.'}
      </p>
    </div>
  );
}

/** Try, buy, keep: the pair's real formats and prices, then the statement and Morph's own blind sets. */
function Act({ A, B, copied, copy, clear }: { A: Perfume; B: Perfume; copied: boolean; copy: () => void; clear: () => void }) {
  const [tA, tB] = [travelFor(A), travelFor(B)];
  const missing = [tA ? null : A, tB ? null : B].filter(Boolean) as Perfume[];
  return (
    <>
      <section className={s.col} aria-labelledby="incearca-perechea">
        <h3 id="incearca-perechea" className="t-3">Încearcă perechea</h3>
        {tA && tB ? (
          <AddToCart items={[travelItem(A, tA), travelItem(B, tB)]}>Ambele în travel 2×8 ml <span className="num">{lei(tA.price + tB.price)}</span></AddToCart>
        ) : (
          <p className="t-small">
            {missing.map(p => p.shortName).join(' și ')} {missing.length > 1 ? 'nu au' : 'nu are'} variantă travel. Se {missing.length > 1 ? 'pot' : 'poate'} încerca din{' '}
            {[...new Set(missing.map(p => samplesFor(p)).filter(Boolean))].map((o, i) => (
              <span key={o!.slug}>{i ? ' sau ' : ''}<a className="link" href={o!.url}>{sampleName(o!.slug).toLowerCase()}</a> ({lei(o!.price)}{o!.inStock ? '' : ', epuizat'})</span>
            ))}.
          </p>
        )}
        <p className="t-small muted">Sau pe piele, în {BOUTIQUE.short}, {BOUTIQUE.address}.</p>
        <p className={s.links}><TryToggle id={pairKey(A.slug, B.slug)} name={`${A.shortName} + ${B.shortName}`} /><Link className="link t-small" href={BOUTIQUE.href}>Magazinul din București</Link><Link className="link t-small" href="/descopera#incearca">Alte formate de încercare</Link></p>
      </section>

      <section className={s.col} aria-labelledby="sticlele">
        <h3 id="sticlele" className="t-3">Sticlele de 100 ml</h3>
        <table className={s.formats}>
          <caption className="sr-only">Formate și prețuri pentru {A.shortName} și {B.shortName}</caption>
          <thead><tr><th scope="col"><span className="sr-only">Parfum</span></th><th scope="col" className="label muted">100 ml</th><th scope="col" className="label muted">Travel</th></tr></thead>
          <tbody>
            {[A, B].map((p, k) => {
              const t = travelFor(p);
              return (
                <tr key={p.slug}>
                  <th scope="row"><span className={s.rowLetter} aria-hidden>{SLOT[k]}</span><Link className="link" href={productHref(p)}>{p.shortName}</Link></th>
                  <td className="num">{lei(p.price)}{!p.inStock && <span className="muted"> · epuizat</span>}</td>
                  <td className="num">{t ? lei(t.price) : <span className="muted">nu există</span>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {A.inStock && B.inStock
          ? <AddToCart className="btn btn-secondary" items={[fullItem(A), fullItem(B)]}>Ambele sticle <span className="num">{lei(A.price + B.price)}</span></AddToCart>
          : <p className="t-small muted">{[A, B].filter(p => !p.inStock).map(p => p.shortName).join(' și ')} e momentan epuizat în magazinul online.</p>}
      </section>

      <section className={s.col} aria-labelledby="perechea">
        <h3 id="perechea" className="t-3">Perechea ta</h3>
        <p className={`${s.disclaimer} t-small`}>Compoziția arată notele publicate de Morph. Nu e o recomandare Morph și nu îți spune cum miroase perechea.</p>
        <p className={s.links}>
          <button type="button" className="text-btn link t-small" onClick={copy}>{copied ? 'Link copiat' : 'Copiază linkul perechii'}</button>
          <button type="button" className="text-btn link t-small" onClick={clear}>Golește raftul</button>
        </p>
        <span className="sr-only" aria-live="polite">{copied ? 'Linkul perechii a fost copiat.' : ''}</span>
        <p className="t-small muted">Perechi compuse de Morph: <Link className="link" href="/layering/your-next-form">Your Next Form</Link>, {layeringSets.length} seturi blind de 2×8 ml, <span className="num">{lei(layeringSets[0].price)}</span>.</p>
      </section>
    </>
  );
}
