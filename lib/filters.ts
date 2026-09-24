import { type Perfume, familyGroup, travelFor } from './catalog';

export type Sort = 'recomandate' | 'longevitate' | 'pret' | 'az';
export type View = 'vitrina' | 'index';
export type Filters = { q: string; familie: string | null; intensitate: string | null; longevitate: string | null; travel: boolean; stoc: boolean; sort: Sort; view: View };

export const DEFAULT_FILTERS: Filters = { q: '', familie: null, intensitate: null, longevitate: null, travel: false, stoc: false, sort: 'recomandate', view: 'vitrina' };

const norm = (t: string) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/** Parse URL params (server or client) into filters; unknown values fall back to defaults. */
export function parseFilters(sp: Record<string, string | string[] | undefined>): Filters {
  const one = (k: string) => (typeof sp[k] === 'string' ? (sp[k] as string) : null);
  const sort = one('sort');
  return {
    q: one('q') ?? '',
    familie: one('familie'),
    intensitate: one('intensitate'),
    longevitate: one('longevitate'),
    travel: one('travel') === '1',
    stoc: one('stoc') === '1',
    sort: (['longevitate', 'pret', 'az'] as const).find(x => x === sort) ?? 'recomandate',
    view: one('vedere') === 'index' ? 'index' : 'vitrina',
  };
}

export function toQuery(f: Filters) {
  const q = new URLSearchParams();
  if (f.q) q.set('q', f.q);
  if (f.familie) q.set('familie', f.familie);
  if (f.intensitate) q.set('intensitate', f.intensitate);
  if (f.longevitate) q.set('longevitate', f.longevitate);
  if (f.travel) q.set('travel', '1');
  if (f.stoc) q.set('stoc', '1');
  if (f.sort !== 'recomandate') q.set('sort', f.sort);
  if (f.view !== 'vitrina') q.set('vedere', f.view);
  return q.toString();
}

export const activeCount = (f: Filters) => [f.q, f.familie, f.intensitate, f.longevitate, f.travel || null, f.stoc || null].filter(Boolean).length;

/** Search covers names and every note (research 06: notes move from filters to search). */
export function apply(items: Perfume[], f: Filters) {
  const q = norm(f.q.trim());
  const list = items.filter(p =>
    (!q || norm([p.shortName, ...p.notes.top, ...p.notes.heart, ...p.notes.base].join(' ')).includes(q)) &&
    (!f.familie || familyGroup(p)?.id === f.familie) &&
    (!f.intensitate || p.intensity === f.intensitate) &&
    (!f.longevitate || p.longevity === f.longevitate) &&
    (!f.travel || !!travelFor(p)) &&
    (!f.stoc || p.inStock),
  );
  const h = (p: Perfume) => parseInt(p.longevity?.split('-')[1] ?? '0');
  if (f.sort === 'az') list.sort((a, b) => a.shortName.localeCompare(b.shortName, 'ro'));
  if (f.sort === 'pret') list.sort((a, b) => a.price - b.price || a.shortName.localeCompare(b.shortName, 'ro'));
  if (f.sort === 'longevitate') list.sort((a, b) => h(b) - h(a));
  if (f.sort === 'recomandate') list.sort((a, b) => Number(b.inStock) - Number(a.inStock) || Number(b.bestseller) - Number(a.bestseller));
  return list;
}
