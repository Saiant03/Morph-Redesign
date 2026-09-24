'use client';
import { useId, useState } from 'react';
import { type Perfume, FAMILY_GROUPS, familyGroup } from '@/lib/catalog';
import { type Filters, type Sort, DEFAULT_FILTERS, activeCount } from '@/lib/filters';
import s from './FilterBar.module.css';

type Props = { items: Perfume[]; f: Filters; set: (next: Partial<Filters>) => void; shown: number };

const INTENSITY = ['Medie', 'Puternic'];
const LONGEVITY = ['8-10 h', '10-12 h'];

/** Families first (research 06); intensity, longevity, format and stock in a secondary panel; notes through search. */
export function FilterBar({ items, f, set, shown }: Props) {
  const [more, setMore] = useState(false);
  const panel = useId();
  const families = FAMILY_GROUPS.map(g => ({ ...g, list: items.filter(p => familyGroup(p)?.id === g.id) })).filter(g => g.list.length);
  const secondary = [f.intensitate, f.longevitate, f.travel || null, f.stoc || null].filter(Boolean).length;
  const n = activeCount(f);

  return (
    <div className={s.bar} id="filtre">
      <div className={s.row}>
        <label className={s.search}>
          <span className="sr-only">Caută un parfum sau o notă</span>
          <input id="cauta" type="search" placeholder="Caută un parfum sau o notă" value={f.q} onChange={e => set({ q: e.target.value })} autoComplete="off" />
        </label>
        <div className={s.chips} role="group" aria-label="Familie olfactivă">
          <button type="button" className={s.chip} aria-pressed={!f.familie} onClick={() => set({ familie: null })}>Toate <span className="num">{items.length}</span></button>
          {families.map(g => (
            <button key={g.id} type="button" className={s.chip} aria-pressed={f.familie === g.id} onClick={() => set({ familie: f.familie === g.id ? null : g.id })}>
              {g.name} <span className="num">{g.list.length}</span>
            </button>
          ))}
        </div>
        <div className={s.tools}>
          <button type="button" className={s.tool} aria-expanded={more} aria-controls={panel} onClick={() => setMore(!more)}>
            Filtre{secondary ? <span className="num"> ({secondary})</span> : null}
          </button>
          <label className={s.tool}>
            <span className="sr-only">Ordonează</span>
            <select value={f.sort} onChange={e => set({ sort: e.target.value as Sort })}>
              <option value="recomandate">Recomandate</option>
              <option value="longevitate">Longevitate</option>
              <option value="pret">Preț crescător</option>
              <option value="az">Nume A–Z</option>
            </select>
          </label>
          <div className={s.view} role="group" aria-label="Vedere">
            <button type="button" aria-pressed={f.view === 'vitrina'} onClick={() => set({ view: 'vitrina' })}>Vitrină</button>
            <button type="button" aria-pressed={f.view === 'index'} onClick={() => set({ view: 'index' })}>Index</button>
          </div>
        </div>
      </div>

      <div id={panel} className={s.panel} hidden={!more}>
        <fieldset>
          <legend>Intensitate</legend>
          {INTENSITY.map(v => <button key={v} type="button" className={s.chip} aria-pressed={f.intensitate === v} onClick={() => set({ intensitate: f.intensitate === v ? null : v })}>{v}</button>)}
        </fieldset>
        <fieldset>
          <legend>Longevitate</legend>
          {LONGEVITY.map(v => <button key={v} type="button" className={`${s.chip} num`} aria-pressed={f.longevitate === v} onClick={() => set({ longevitate: f.longevitate === v ? null : v })}>{v.replace('-', '–')}</button>)}
        </fieldset>
        <fieldset>
          <legend>Format și stoc</legend>
          <label className={s.check}><input type="checkbox" checked={f.travel} onChange={e => set({ travel: e.target.checked })} />Are variantă travel 2×8 ml</label>
          <label className={s.check}><input type="checkbox" checked={f.stoc} onChange={e => set({ stoc: e.target.checked })} />Doar în stoc</label>
        </fieldset>
      </div>

      <p className={`${s.status} t-small`} aria-live="polite">
        <span><span className="num">{shown}</span> {shown === 1 ? 'parfum' : 'parfumuri'}</span>
        {n > 0 && <button type="button" className="link" onClick={() => set({ ...DEFAULT_FILTERS, sort: f.sort, view: f.view })}>Șterge filtrele</button>}
      </p>
    </div>
  );
}
