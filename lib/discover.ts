// Lenses for Descoperă: the same 26 perfumes regrouped by one attribute at a time. Every grouping reads a field
// that exists in the Store API snapshot; nothing is scored or inferred.
import { perfumes, FAMILY_GROUPS, familyGroup, familyNotes, COLLECTIONS, ALL_BY_COLLECTION, inCollection, lei, type Perfume } from './catalog';

export type LensId = 'familie' | 'nota' | 'anotimp' | 'intensitate' | 'colectie';
export const LENSES: { id: LensId; label: string; hint: string }[] = [
  { id: 'familie', label: 'Familie', hint: 'Cinci familii olfactive, fiecare descrisă prin notele care apar cel mai des în parfumurile ei.' },
  { id: 'nota', label: 'Notă', hint: 'Unde apare o notă în evoluția fiecărui parfum: la deschidere, în inimă sau în bază.' },
  { id: 'anotimp', label: 'Anotimp', hint: 'Anotimpurile indicate de Morph. Un parfum poate apărea în mai multe.' },
  { id: 'intensitate', label: 'Intensitate și durată', hint: 'Intensitatea și longevitatea declarate de Morph, de la discret la persistent.' },
  { id: 'colectie', label: 'Colecție', hint: 'Cele trei colecții Morph, cu concentrația și prețul lor.' },
];

export type Group = { id: string; title: string; line: string; items: Perfume[] };

export const norm = (t: string) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ţ/g, 't').trim();
const SEASONS = [['Primăvară', 'Primăvară'], ['Vară', 'Vară'], ['Toamnă', 'Toamnă'], ['Iarnă', 'Iarnă']] as const;
const TIERS = [['top', 'La deschidere'], ['heart', 'În inimă'], ['base', 'În bază']] as const;

/** Most frequent notes (merged by accent-free spelling), for the note lens chips. */
export function topNotes(n = 14) {
  const count = new Map<string, { name: string; c: number }>();
  for (const p of perfumes) for (const note of [...p.notes.top, ...p.notes.heart, ...p.notes.base]) {
    const k = norm(note);
    count.set(k, { name: count.get(k)?.name ?? note.toLowerCase(), c: (count.get(k)?.c ?? 0) + 1 });
  }
  return [...count.values()].sort((a, b) => b.c - a.c).slice(0, n).map(x => x.name);
}

export const hasNote = (note: string) => (n: string) => !!note && norm(n).includes(norm(note));

export function groups(lens: LensId, note: string): Group[] {
  switch (lens) {
    case 'familie':
      return FAMILY_GROUPS.map(g => ({ id: g.id, title: g.name, line: familyNotes(g.id).join(', '), items: perfumes.filter(p => familyGroup(p)?.id === g.id) }));
    case 'nota': {
      const m = hasNote(note);
      return TIERS.map(([k, title]) => ({ id: k, title, line: '', items: note ? perfumes.filter(p => p.notes[k].some(m)) : [] }));
    }
    case 'anotimp':
      return SEASONS.map(([v, title]) => ({ id: norm(title), title, line: '', items: perfumes.filter(p => p.season.includes(v)) }));
    case 'intensitate': {
      const cells: [string | null, string][] = [['Medie', '8-10 h'], ['Medie', '10-12 h'], ['Puternic', '8-10 h'], ['Puternic', '10-12 h'], [null, '8-10 h'], [null, '10-12 h']];
      return cells.map(([i, l]) => ({
        id: `${i ?? 'nespecificat'}-${l}`, title: `${i ?? 'Intensitate nespecificată'}, ${l.replace('-', '–')}`, line: '',
        items: perfumes.filter(p => p.intensity === i && p.longevity === l),
      })).filter(g => g.items.length);
    }
    case 'colectie':
      return ALL_BY_COLLECTION.map(c => ({ id: c, title: COLLECTIONS[c].name, line: `${COLLECTIONS[c].type}, ${[...new Set(inCollection(c).map(p => p.price))].sort().map(lei).join(' sau ')}`, items: inCollection(c) }));
  }
}
