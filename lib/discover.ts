// Descoperă (Phase C3): the family chapters and the notes index. Everything is read from the Store API snapshot;
// nothing is scored or inferred. The five families are the concept's proposed grouping of Morph's own
// "Încadrare parfum" values (FAMILY_GROUPS, docs/research/06), and are labelled as such on the page.
import { perfumes, FAMILY_GROUPS, familyGroup, familyNotes, COLLECTIONS, ALL_BY_COLLECTION, type Perfume } from './catalog';

export const norm = (t: string) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ţ/g, 't').trim();

const TIERS = [['top', 'deschidere'], ['heart', 'inimă'], ['base', 'bază']] as const;
export type Tier = (typeof TIERS)[number][1];

/** Most frequent notes (merged by accent-free spelling), suggested in search. */
export function topNotes(n = 14) {
  const count = new Map<string, { name: string; c: number }>();
  for (const p of perfumes) for (const note of [...p.notes.top, ...p.notes.heart, ...p.notes.base]) {
    const k = norm(note);
    count.set(k, { name: count.get(k)?.name ?? note.toLowerCase(), c: (count.get(k)?.c ?? 0) + 1 });
  }
  return [...count.values()].sort((a, b) => b.c - a.c).slice(0, n).map(x => x.name);
}

/** A note opens the vitrine searched for it (the /parfumuri search covers names and every note). */
export const noteHref = (note: string) => `/parfumuri?q=${encodeURIComponent(note)}`;

export type Family = {
  id: string; name: string; notes: string[]; items: Perfume[]; lead: Perfume;
  /** Morph's own classification values inside this group */
  morph: string[]; intensity: string; longevity: string; collections: string;
};

const joinRo = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} și ${xs[xs.length - 1]}`);

export function families(): Family[] {
  return FAMILY_GROUPS.map(g => {
    const items = perfumes.filter(p => familyGroup(p)?.id === g.id);
    // the family's object: its first in-stock bestseller, in catalog order. Ice bottles are clear and pale, and on
    // the stone stage they barely read, so an Ice bottle stands here only when the family has nothing else in stock.
    const pick = (xs: Perfume[]) => xs.find(p => p.inStock && p.bestseller) ?? xs.find(p => p.inStock);
    const lead = pick(items.filter(p => p.collection !== 'ice')) ?? pick(items) ?? items[0];
    const int = [...new Set(items.map(p => p.intensity).filter(Boolean))] as string[];
    const unspecified = items.filter(p => !p.intensity).length;
    const lon = ([...new Set(items.map(p => p.longevity).filter(Boolean))] as string[]).sort((a, b) => parseInt(a) - parseInt(b));
    return {
      id: g.id, name: g.name, notes: familyNotes(g.id), items, lead,
      morph: [...new Set(items.map(p => p.family!))],
      intensity: int.length
        ? `${joinRo(int.map(x => x.toLowerCase()))}${unspecified ? `; ${unspecified} fără intensitate declarată` : ''}`
        : 'nedeclarată',
      longevity: lon.map(x => x.replace('-', '–')).join(' sau '),
      collections: joinRo(ALL_BY_COLLECTION.filter(c => items.some(p => p.collection === c)).map(c => COLLECTIONS[c].name)),
    };
  });
}

export type NoteEntry = { key: string; name: string; where: { p: Perfume; tier: Tier }[] };

/** Every note in the catalog, merged by accent-free spelling (Morph's spelling kept for display). */
export function notesIndex(): NoteEntry[] {
  const map = new Map<string, NoteEntry>();
  for (const p of perfumes) for (const [k, tier] of TIERS) for (const note of p.notes[k]) {
    const key = norm(note);
    const e = map.get(key) ?? { key, name: note.charAt(0).toLowerCase() + note.slice(1), where: [] };
    if (!e.where.some(w => w.p.slug === p.slug)) e.where.push({ p, tier });
    map.set(key, e);
  }
  return [...map.values()].sort((a, b) => a.key.localeCompare(b.key, 'ro'));
}

/** The notes that recur most across the house (by the number of perfumes that carry them). */
export const recurringNotes = (n = 8) => [...notesIndex()].sort((a, b) => b.where.length - a.where.length || a.key.localeCompare(b.key, 'ro')).slice(0, n);
