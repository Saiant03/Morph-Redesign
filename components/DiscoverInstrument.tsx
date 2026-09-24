'use client';
import Link from 'next/link';
import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Flip } from 'gsap/Flip';
import { gsap, reducedMotion, EASE } from '@/lib/motion';
import { bySlug, COLLECTIONS, concentration, hours, lei, productHref, familyGroup } from '@/lib/catalog';
import { scentTokens } from '@/lib/scent';
import { LENSES, groups, topNotes, hasNote, type LensId } from '@/lib/discover';
import { ProductVisual } from './ProductVisual';
import { NotePyramid } from './NotePyramid';
import { AddToCart } from './AddToCart';
import { TryOffer } from './TryOffer';
import { TryToggle } from './TryToggle';
import s from './DiscoverInstrument.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(Flip);

const NOTES = topNotes();

/**
 * Descoperă: one lens at a time regroups the 26 colors (Flip shows where each scent moves). Selecting a scent opens
 * its preview: beside the groups on desktop, directly under the chosen group on phones. State lives in the URL.
 */
export function DiscoverInstrument({ initial }: { initial: { lens: LensId; note: string; slug: string | null } }) {
  const [lens, setLens] = useState<LensId>(initial.lens);
  const [note, setNote] = useState(initial.note);
  const [sel, setSel] = useState<{ slug: string; group: string } | null>(initial.slug ? { slug: initial.slug, group: '' } : null);
  const board = useRef<HTMLDivElement>(null);
  const flip = useRef<Flip.FlipState | null>(null);
  const noteId = useId();
  const list = useMemo(() => groups(lens, note), [lens, note]);

  function change(fn: () => void) {
    if (board.current && !reducedMotion()) flip.current = Flip.getState(board.current.querySelectorAll('[data-flip-id]'));
    fn();
  }

  useEffect(() => {
    const q = new URLSearchParams({ lentila: lens });
    if (lens === 'nota' && note) q.set('nota', note);
    if (sel) q.set('parfum', sel.slug);
    window.history.replaceState(null, '', `${window.location.pathname}?${q}`);
  }, [lens, note, sel]);

  useLayoutEffect(() => {
    if (!flip.current) return;
    Flip.from(flip.current, {
      duration: 0.5, ease: EASE.inOut, absolute: true, prune: true,
      onEnter: els => gsap.fromTo(els, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, delay: 0.2 }),
      onLeave: els => gsap.to(els, { autoAlpha: 0, duration: 0.18 }),
    });
    flip.current = null;
  }, [list]);

  // where the preview sits on phones: after the group the scent was chosen from (or the first group holding it)
  const at = sel ? Math.max(0, list.findIndex(g => g.id === sel.group && g.items.some(p => p.slug === sel.slug)), list.findIndex(g => g.items.some(p => p.slug === sel.slug))) : -1;
  const seen = new Set<string>();
  const current = LENSES.find(l => l.id === lens)!;
  const total = new Set(list.flatMap(g => g.items.map(p => p.slug))).size;

  return (
    <div className={s.instrument}>
      <div className={s.lenses} role="group" aria-label="Explorează după">
        {LENSES.map(l => (
          <button key={l.id} type="button" className={s.lens} aria-pressed={lens === l.id} onClick={() => change(() => setLens(l.id))}>{l.label}</button>
        ))}
      </div>
      <p className={`${s.hint} t-small muted`} aria-live="polite">{current.hint}</p>

      {lens === 'nota' && (
        <div className={s.notes}>
          <label htmlFor={noteId} className="sr-only">Caută o notă</label>
          <input id={noteId} type="search" value={note} placeholder="Caută o notă, de exemplu iris" autoComplete="off" onChange={e => change(() => setNote(e.target.value))} />
          <div className={s.noteChips} role="group" aria-label="Note frecvente">
            {NOTES.map(n => <button key={n} type="button" className={s.noteChip} aria-pressed={note === n} onClick={() => change(() => setNote(n))}>{n}</button>)}
          </div>
          <p className="t-small" aria-live="polite">{note ? (total ? <><b>{note}</b> apare în <span className="num">{total}</span> {total === 1 ? 'parfum' : 'parfumuri'}.</> : <>Nicio notă „{note}” în parfumurile Morph.</>) : 'Alege o notă.'}</p>
        </div>
      )}

      <div ref={board} className={s.board}>
        {list.map((g, gi) => (
          <section key={g.id} className={s.group} style={{ order: gi * 2 }} aria-labelledby={`g-${g.id}`}>
            <header className={s.groupHead}>
              <h3 id={`g-${g.id}`} className="t-3">{g.title} <span className="num muted t-small">{g.items.length}</span></h3>
              {g.line && <p className="t-small muted">{g.line}</p>}
            </header>
            {g.items.length === 0 ? <p className="t-small muted">Niciun parfum.</p> : (
              <ul className={s.keys}>
                {g.items.map(p => {
                  const id = seen.has(p.slug) ? undefined : (seen.add(p.slug), p.slug);
                  const on = sel?.slug === p.slug;
                  return (
                    <li key={p.slug} data-flip-id={id}>
                      <button type="button" className={s.key} aria-pressed={on} aria-controls="previzualizare" data-soldout={!p.inStock}
                        style={{ '--scent': scentTokens(p).scent } as React.CSSProperties}
                        onClick={() => setSel(on ? null : { slug: p.slug, group: g.id })}>
                        <i aria-hidden />
                        <span>{p.shortName}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        ))}
        <Preview slug={sel?.slug ?? null} order={at >= 0 ? at * 2 + 1 : list.length * 2} mark={lens === 'nota' ? hasNote(note) : undefined} onClose={() => setSel(null)} />
      </div>
    </div>
  );
}

function Preview({ slug, order, mark, onClose }: { slug: string | null; order: number; mark?: (n: string) => boolean; onClose: () => void }) {
  if (!slug) {
    return (
      <aside id="previzualizare" className={`${s.preview} ${s.previewEmpty}`} style={{ order }} aria-label="Previzualizare">
        <p className="t-3">Alege o culoare.</p>
        <p className="t-small muted">Fiecare culoare e un parfum Morph. Vezi notele, intensitatea, prețul și cum îl încerci.</p>
      </aside>
    );
  }
  const p = bySlug(slug);
  const fam = familyGroup(p);
  return (
    <aside id="previzualizare" className={s.preview} style={{ order }} aria-label={`Previzualizare ${p.shortName}`}>
      <Link href={productHref(p)} tabIndex={-1} aria-hidden className={s.previewLink}><ProductVisual p={p} sizes="(max-width: 899px) 100vw, 34vw" alt="" className={s.previewVisual} /></Link>
      <div className={s.previewHead}>
        <h2 className="t-2"><Link href={productHref(p)}>{p.shortName}</Link></h2>
        <p className="t-small muted">{COLLECTIONS[p.collection].name}, {concentration(p)?.toLowerCase()}{fam ? `, ${fam.name.toLowerCase()}` : ''}{!p.inStock && ', stoc epuizat'}</p>
        <button type="button" className={`text-btn link t-small ${s.close}`} onClick={onClose}>Închide</button>
      </div>
      <NotePyramid p={p} mark={mark} />
      <dl className={s.facts}>
        <div><dt>Intensitate</dt><dd>{p.intensity ?? '—'}</dd></div>
        <div><dt>Longevitate</dt><dd className="num">{hours(p) ?? '—'}</dd></div>
        <div><dt>100 ml</dt><dd className="num">{lei(p.price)}</dd></div>
      </dl>
      <div className={s.actions}>
        {p.inStock
          ? <AddToCart items={[{ key: p.slug, name: p.shortName, format: '100 ml', price: p.price, color: scentTokens(p).scent }]}>Adaugă 100 ml <span className="num">{lei(p.price)}</span></AddToCart>
          : <Link className="btn" href={productHref(p)}>Anunță-mă</Link>}
        <TryOffer p={p} />
      </div>
      <p className={s.links}>
        <Link className="link t-small" href={productHref(p)}>Pagina parfumului</Link>
        <Link className="link t-small" href={`/layering?a=${p.slug}`}>Compune în Layering</Link>
        <TryToggle id={p.slug} name={p.shortName} />
      </p>
    </aside>
  );
}
