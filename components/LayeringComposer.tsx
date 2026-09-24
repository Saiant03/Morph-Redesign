'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import {
  perfumes, bySlug, travelFor, samplesFor, layeringSets, lei, familyGroup, hours, productHref, COLLECTIONS, ALL_BY_COLLECTION,
  fullItem, travelItem, sampleName, type Perfume,
} from '@/lib/catalog';
import { pairKey } from '@/lib/tryList';
import { norm } from '@/lib/discover';
import { ProductVisual } from './ProductVisual';
import { AddToCart } from './AddToCart';
import { TryToggle } from './TryToggle';
import { TIERS } from './NotePyramid';
import s from './LayeringComposer.module.css';

type Slot = 0 | 1;
type Props = { first: string; second: string; heading: string; headingId: string; intro?: string; detail?: boolean };
type Tier = (typeof TIERS)[number]['key'];

const TIER_WORD = { top: 'deschidere', heart: 'inimă', base: 'bază' } as const;

/** Notes present in both pyramids (same wording after accent folding), with the tier where each perfume carries them. */
function sharedNotes(A: Perfume, B: Perfume) {
  const where = (p: Perfume) => new Map(TIERS.flatMap(t => p.notes[t.key].map(n => [norm(n), { name: n, tier: t.key as Tier }] as const)));
  const a = where(A), b = where(B);
  return [...a.entries()].filter(([k]) => b.has(k)).map(([k, v]) => ({ key: k, name: v.name, a: v.tier, b: b.get(k)!.tier }));
}

/**
 * The composition studio (signature interaction). Two fragrances stand as objects in their niches; between them,
 * their published notes are set against each other tier by tier, in the order they unfold on skin:
 * opening against opening, heart against heart, base against base. Notes both carry in the same tier meet on the seam.
 * LAYERING → COMPOSITION: on every change the tiers recompose in time order (opening first, base last).
 * A visitor-chosen pair is a visualisation, never presented as a Morph recommendation.
 * `detail` (the /layering page) adds URL state, what the two share, formats and prices for both.
 */
export function LayeringComposer({ first, second, heading, headingId, intro, detail = false }: Props) {
  const [pair, setPair] = useState<[string, string]>([first, second]);
  const [open, setOpen] = useState<Slot | null>(null);
  const [copied, setCopied] = useState(false);
  const slotRefs = [useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null)];
  const pickerId = useId();
  const [A, B] = pair.map(bySlug) as [Perfume, Perfume];
  const query = `a=${A.slug}&b=${B.slug}`;

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    setCopied(false);
    if (detail) window.history.replaceState(null, '', `${window.location.pathname}?${query}`);
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
  const sharedKeys = new Set(shared.map(n => n.key));
  const seasons = A.season.filter(x => B.season.includes(x));
  const [fA, fB] = [familyGroup(A), familyGroup(B)];

  return (
    <div className={s.composer} data-detail={detail}>
      <div className={s.head}>
        <h2 id={headingId} className="t-1">{heading}</h2>
        <p className="muted">{intro ?? 'Layering înseamnă două parfumuri purtate unul peste altul. Alege-le și vezi cum se așază notele lor, de la deschidere la bază.'}</p>
      </div>

      <div className={s.studio}>
        {([0, 1] as Slot[]).map(k => {
          const p = k ? B : A;
          return (
            <div key={k} className={`${s.object} ${k ? s.objB : s.objA}`}>
              <Link href={productHref(p)} tabIndex={-1} aria-hidden className={s.nicheLink}>
                <ProductVisual p={p} sizes="(max-width: 899px) 45vw, 22vw" alt="" className={s.niche} />
              </Link>
              <button ref={slotRefs[k]} type="button" className={s.slot} aria-expanded={open === k} aria-controls={pickerId} onClick={() => setOpen(open === k ? null : k)}>
                <span className="label muted">{k ? 'Al doilea strat' : 'Primul strat'}</span>
                <span className={s.slotName}>{p.shortName}</span>
                <span className="t-small link">{open === k ? 'Închide lista' : 'Schimbă parfumul'}</span>
              </button>
            </div>
          );
        })}

        <div className={s.score}>
          <div className={s.scoreHead} aria-hidden>
            <span>{A.shortName}</span><span className="label muted">împreună</span><span>{B.shortName}</span>
          </div>
          <dl className={s.tiers} aria-live="polite" aria-label={`Notele pentru ${A.shortName} și ${B.shortName}, pe etape`}>
          {TIERS.map((t, i) => {
            const meet = A.notes[t.key].filter(n => B.notes[t.key].some(m => norm(m) === norm(n)));
            const meetKeys = new Set(meet.map(norm));
            const only = (p: Perfume) => p.notes[t.key].filter(n => !meetKeys.has(norm(n)));
            return (
              <div key={t.key} className={s.tier} style={{ '--i': i } as React.CSSProperties}>
                <dt className="label muted"><span className="num" aria-hidden>{i + 1}</span> {t.label}</dt>
                <dd key={query} className={s.voices}>
                  <span className={s.a}><span className="sr-only">{A.shortName}: </span>{only(A).map(n => <Note key={n} n={n} shared={sharedKeys.has(norm(n))} />)}</span>
                  <span className={s.seam}>{meet.length ? <><span className="sr-only">Amândouă: </span>{meet.map(n => <em key={n}>{n}</em>)}</> : null}</span>
                  <span className={s.b}><span className="sr-only">{B.shortName}: </span>{only(B).map(n => <Note key={n} n={n} shared={sharedKeys.has(norm(n))} />)}</span>
                </dd>
              </div>
            );
          })}
          </dl>
          <p className={`${s.time} t-micro muted`} aria-hidden><span>Aplicare</span><span className="num">{hours(A) && hours(B) ? `${hours(A)} / ${hours(B)} pe piele` : ''}</span></p>
        </div>
      </div>

      <div id={pickerId} className={s.picker} hidden={open === null}>
        {open !== null && (
          <>
            <p className="t-small muted">Alege {open ? 'al doilea strat' : 'primul strat'}:</p>
            {ALL_BY_COLLECTION.map(c => (
              <div key={c} role="group" aria-label={`${open ? 'Al doilea strat' : 'Primul strat'}, ${COLLECTIONS[c].name}`} className={s.pickGroup}>
                <span className="label muted">{COLLECTIONS[c].name}</span>
                <div className={s.shelf}>
                  {perfumes.filter(p => p.collection === c).map(p => {
                    const other = pair[open ? 0 : 1] === p.slug;
                    return (
                      <button key={p.slug} type="button" className={s.pick} aria-pressed={pair[open] === p.slug} disabled={other}
                        title={other ? 'Deja ales ca celălalt strat' : undefined} onClick={() => choose(open, p.slug)}>
                        <span className={`niche-sm ${s.pickImg}`} aria-hidden><Image src={p.images[0]} alt="" fill sizes="56px" /></span>
                        <span>{p.shortName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <div className={s.after}>
        {detail && (
          <dl className={s.compare}>
            <div>
              <dt className="label muted">Note comune</dt>
              <dd>{shared.length ? shared.map(n => `${n.name} (${TIER_WORD[n.a]}${n.a === n.b ? ' la amândouă' : ` / ${TIER_WORD[n.b]}`})`).join(', ') : 'Niciuna în notele publicate: fiecare strat aduce altceva.'}</dd>
            </div>
            <div>
              <dt className="label muted">Familii</dt>
              <dd>{fA && fB && fA.id === fB.id ? `Amândouă ${fA.name.toLowerCase()}` : `${fA?.name ?? 'Nespecificată'} și ${fB?.name.toLowerCase() ?? 'nespecificată'}`}</dd>
            </div>
            <div>
              <dt className="label muted">Intensitate, longevitate</dt>
              <dd>{A.shortName}: {A.intensity?.toLowerCase() ?? 'nespecificată'}, <span className="num">{hours(A) ?? '—'}</span>. {B.shortName}: {B.intensity?.toLowerCase() ?? 'nespecificată'}, <span className="num">{hours(B) ?? '—'}</span>.</dd>
            </div>
            <div>
              <dt className="label muted">Anotimpuri comune</dt>
              <dd>{seasons.length ? seasons.join(', ') : 'Niciunul în datele Morph'}</dd>
            </div>
          </dl>
        )}

        {detail && (
          <table className={s.formats}>
            <caption className="sr-only">Formate și prețuri</caption>
            <thead><tr><th scope="col"><span className="sr-only">Parfum</span></th><th scope="col" className="label muted">100 ml</th><th scope="col" className="label muted">Travel 2×8 ml</th></tr></thead>
            <tbody>
              {[A, B].map(p => {
                const t = travelFor(p);
                return (
                  <tr key={p.slug}>
                    <th scope="row"><Link className="link" href={productHref(p)}>{p.shortName}</Link></th>
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
            <AddToCart items={[travelItem(A, travelA), travelItem(B, travelB)]}>Încearcă-le pe amândouă în travel <span className="num">{lei(travelA.price + travelB.price)}</span></AddToCart>
          ) : (
            <p className="t-small">
              {missing.map(p => p.shortName).join(' și ')} {missing.length > 1 ? 'nu au' : 'nu are'} variantă travel. Se {missing.length > 1 ? 'pot' : 'poate'} încerca din{' '}
              {[...new Set(missing.map(p => samplesFor(p)).filter(Boolean))].map((o, i) => (
                <span key={o!.slug}>{i ? ' sau ' : ''}<a className="link" href={o!.url}>{sampleName(o!.slug).toLowerCase()}</a> ({lei(o!.price)}{o!.inStock ? '' : ', epuizat'})</span>
              ))}.
            </p>
          )}
          {detail && A.inStock && B.inStock && (
            <AddToCart className="btn btn-secondary" items={[fullItem(A), fullItem(B)]}>Ambele sticle de 100 ml <span className="num">{lei(A.price + B.price)}</span></AddToCart>
          )}
          <p className={s.links}>
            {detail
              ? <button type="button" className="text-btn link t-small" onClick={copy}>{copied ? 'Link copiat' : 'Copiază linkul combinației'}</button>
              : <Link className="link t-small" href={`/layering?${query}`}>Deschide în Layering</Link>}
            <TryToggle id={pairKey(A.slug, B.slug)} name={`${A.shortName} + ${B.shortName}`} />
          </p>
          <span className="sr-only" aria-live="polite">{copied ? 'Linkul combinației a fost copiat.' : ''}</span>
        </div>

        <div className={s.notes}>
          <p className={`${s.disclaimer} t-small`}>Aceasta este o vizualizare a celor două compoziții după notele publicate de Morph, nu o recomandare Morph.</p>
          <p className="t-small muted">
            Combinații create de Morph: <Link className="link" href="/layering/your-next-form">Your Next Form</Link>, {layeringSets.length} seturi blind,
            dezvăluite abia la deschiderea cutiei. 2×8 ml, <span className="num">{lei(layeringSets[0].price)}</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

function Note({ n, shared }: { n: string; shared: boolean }) {
  return <span className={shared ? s.echo : undefined}>{n}{shared && <span className="sr-only"> (o au amândouă)</span>}</span>;
}
