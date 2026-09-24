'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { search, useSearchOpen } from '@/lib/search';
import {
  perfumes, FAMILY_GROUPS, familyGroup, familyNotes, COLLECTIONS, travelSets, sampleSets, layeringSets, TRIAL, bestsellerMix,
  descriptor, lei, productHref, collectionHref, ALL_BY_COLLECTION, type Perfume,
} from '@/lib/catalog';
import { norm, topNotes } from '@/lib/discover';
import { TIERS } from './NotePyramid';
import s from './SearchOverlay.module.css';

const PAGES = [
  { href: '/descopera/finder', label: 'Fragrance Finder', words: 'finder quiz test intrebari recomandare gaseste' },
  { href: '/layering', label: 'Layering: compune două parfumuri', words: 'layering combina doua pereche strat' },
  { href: '/layering/your-next-form', label: 'Your Next Form: seturile blind', words: 'your next form blind set layering surpriza' },
  { href: '/descopera#incearca', label: 'Încearcă înainte de sticlă', words: 'mostre esantioane travel incearca proba discovery' },
  { href: '/cadouri', label: 'Cadouri', words: 'cadou cadouri gift card cutie' },
  { href: '/magazin', label: 'Magazinul Morph din București', words: 'magazin boutique bucuresti adresa program lahovari' },
  { href: '/magazin#certilogo', label: 'Verificare Certilogo', words: 'certilogo original autentic verificare cod' },
];
const OFFERS = [
  ...[...travelSets, ...sampleSets].filter(o => TRIAL[o.slug]).map(o => ({ o, name: TRIAL[o.slug].name, href: '/descopera#incearca' })),
  ...layeringSets.map(o => ({ o, name: `Your Next Form ${o.state}`, href: '/layering/your-next-form' })),
];
const TIER_WORD = { top: 'deschidere', heart: 'inimă', base: 'bază' } as const;
const SUGGESTED = topNotes(8);

function find(q: string) {
  const k = norm(q);
  if (!k) return null;
  const byName = perfumes.filter(p => norm(p.shortName).includes(k) || norm(COLLECTIONS[p.collection].name).includes(k));
  const byNote = perfumes
    .map(p => ({ p, hits: TIERS.flatMap(t => p.notes[t.key].filter(n => norm(n).includes(k)).map(n => ({ n, tier: t.key }))) }))
    .filter(x => x.hits.length && !byName.includes(x.p));
  const fams = FAMILY_GROUPS.filter(g => norm(g.name).includes(k) || g.members.some(m => norm(m).includes(k)));
  const offers = OFFERS.filter(x => norm(x.name).includes(k) || (k.length > 3 && norm(x.o.name).includes(k)));
  const pages = PAGES.filter(x => norm(x.label).includes(k) || x.words.includes(k));
  return { byName, byNote, fams, offers, pages, total: byName.length + byNote.length + fams.length + offers.length + pages.length };
}

/** SEARCH → OVERLAY: a full-screen, keyboard-first search over names, notes, families, formats and pages. */
export function SearchOverlay() {
  const open = useSearchOpen();
  const [q, setQ] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const last = useRef<Element | null>(null);
  const id = useId();
  const r = useMemo(() => find(q), [q]);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.key === '/' && !open && !/INPUT|TEXTAREA|SELECT/.test(t.tagName)) { e.preventDefault(); search.open(); }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    last.current = document.activeElement;
    input.current?.focus();
    input.current?.select();
    document.documentElement.style.overflow = 'hidden';
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') search.close();
      if (e.key === 'Tab' && panel.current) {
        const els = [...panel.current.querySelectorAll<HTMLElement>('a[href], button, input')].filter(x => x.offsetParent);
        const [first, end] = [els[0], els[els.length - 1]];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); end.focus(); }
        else if (!e.shiftKey && document.activeElement === end) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', key);
    return () => {
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', key);
      (last.current as HTMLElement | null)?.focus?.();
    };
  }, [open]);

  const go = () => search.close();

  return (
    <div className={s.root} data-open={open} aria-hidden={!open} inert={!open}>
      <div ref={panel} className={s.panel} role="dialog" aria-modal="true" aria-label="Caută">
        <div className={`wrap ${s.bar}`}>
          <label htmlFor={id} className="label muted">Caută un parfum, o notă sau un format</label>
          <div className={s.field}>
            <input ref={input} id={id} type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="de exemplu vanilie, Zeta, travel" autoComplete="off" spellCheck={false} />
            <button type="button" className={`${s.close} link`} onClick={go}>Închide</button>
          </div>
        </div>

        <div className={`wrap ${s.body}`}>
          <p className="sr-only" aria-live="polite">{r ? (r.total ? `${r.total} rezultate` : 'Niciun rezultat') : ''}</p>
          {!r && <Suggestions setQ={setQ} go={go} />}
          {r && r.total === 0 && (
            <div className={s.none}>
              <p className="t-2">Nimic pentru „{q}”.</p>
              <p className="muted">Caută după o notă (iris, oud, vanilie), un nume sau o colecție. Sau lasă Fragrance Finder să întrebe în locul tău.</p>
              <p className={s.links}>
                <Link className="btn btn-secondary" href="/descopera/finder" onClick={go}>Fragrance Finder</Link>
                <Link className="btn btn-secondary" href="/descopera" onClick={go}>Familiile olfactive</Link>
              </p>
            </div>
          )}
          {r && r.total > 0 && (
            <div className={s.results}>
              {r.byName.length > 0 && (
                <section className={s.group} aria-label="Parfumuri">
                  <h2 className="label muted">Parfumuri <span className="num">{r.byName.length}</span></h2>
                  <ul className={s.products}>{r.byName.slice(0, 8).map(p => <Row key={p.slug} p={p} go={go} line={descriptor(p)} />)}</ul>
                </section>
              )}
              {r.byNote.length > 0 && (
                <section className={s.group} aria-label="După notă">
                  <h2 className="label muted">Cu nota căutată <span className="num">{r.byNote.length}</span></h2>
                  <ul className={s.products}>
                    {r.byNote.slice(0, 10).map(x => (
                      <Row key={x.p.slug} p={x.p} go={go} line={x.hits.map(h => `${h.n} (${TIER_WORD[h.tier]})`).join(', ')} />
                    ))}
                  </ul>
                </section>
              )}
              <div className={s.side}>
                {r.fams.length > 0 && (
                  <section className={s.group} aria-label="Familii">
                    <h2 className="label muted">Familii</h2>
                    <ul className={s.plain}>
                      {r.fams.map(g => (
                        <li key={g.id}><Link href={`/parfumuri?familie=${g.id}`} onClick={go}><span className="serif">{g.name}</span><span className="t-small muted">{familyNotes(g.id).join(', ')}</span></Link></li>
                      ))}
                    </ul>
                  </section>
                )}
                {r.offers.length > 0 && (
                  <section className={s.group} aria-label="Seturi și formate">
                    <h2 className="label muted">Seturi și formate</h2>
                    <ul className={s.plain}>
                      {r.offers.slice(0, 6).map(x => (
                        <li key={x.o.slug}><Link href={x.href} onClick={go}><span>{x.name}</span><span className="t-small muted num">{lei(x.o.price)}{x.o.inStock ? '' : ', epuizat'}</span></Link></li>
                      ))}
                    </ul>
                  </section>
                )}
                {r.pages.length > 0 && (
                  <section className={s.group} aria-label="Pagini">
                    <h2 className="label muted">Pagini</h2>
                    <ul className={s.plain}>{r.pages.map(x => <li key={x.href}><Link href={x.href} onClick={go}><span>{x.label}</span></Link></li>)}</ul>
                  </section>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ p, go, line }: { p: Perfume; go: () => void; line: string }) {
  return (
    <li>
      <Link href={productHref(p)} className={s.row} onClick={go}>
        <span className={`niche-sm ${s.thumb}`} aria-hidden><Image src={p.images[0]} alt="" fill sizes="56px" /></span>
        <span className={s.rowText}>
          <span className={s.rowName}>{p.shortName}</span>
          <span className="t-small muted">{line}</span>
        </span>
        <span className="t-small muted">{COLLECTIONS[p.collection].name}<br /><span className="num">{lei(p.price)}</span></span>
      </Link>
    </li>
  );
}

function Suggestions({ setQ, go }: { setQ: (v: string) => void; go: () => void }) {
  return (
    <div className={s.suggest}>
      <section className={s.group} aria-label="Note căutate des">
        <h2 className="label muted">Note din parfumurile Morph</h2>
        <p className={s.notes}>{SUGGESTED.map(n => <button key={n} type="button" onClick={() => setQ(n)}>{n}</button>)}</p>
      </section>
      <section className={s.group} aria-label="Colecții">
        <h2 className="label muted">Colecții</h2>
        <ul className={s.plain}>
          {ALL_BY_COLLECTION.map(c => (
            <li key={c}><Link href={collectionHref(c)} onClick={go}><span className="serif">{COLLECTIONS[c].name}</span><span className="t-small muted">{COLLECTIONS[c].type}, {perfumes.filter(p => p.collection === c).length} parfumuri</span></Link></li>
          ))}
        </ul>
      </section>
      <section className={s.group} aria-label="Cele mai alese">
        <h2 className="label muted">Cele mai alese</h2>
        <ul className={s.products}>{bestsellerMix(4).map(p => <Row key={p.slug} p={p} go={go} line={familyGroup(p)?.name ?? ''} />)}</ul>
      </section>
    </div>
  );
}
