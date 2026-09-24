// Morph's own Fragrance Finder, reused as-is: questions, per-perfume tags and weights come from data/finder.json
// (snapshot of the public quiz script, scripts/finder.mjs). The scoring below reproduces Morph's selectResults().
import finder from '@/data/finder.json';
import { perfumes, type Perfume, type CollectionId } from './catalog';

export type Category = 'mood' | 'personality' | 'olfactive' | 'occasion' | 'projection' | 'season' | 'collection';
export type Answer = { label: string; tag: string; description?: string };
export type Question = { id: string; label: string; category: Category; answers: Answer[] };
type Tagged = { slug: string; name: string; collection: 'luxury' | 'ice' | 'exclusive' } & Partial<Record<Exclude<Category, 'collection'>, string[]>>;

export const QUESTIONS = finder.questions as Question[];
export const WEIGHTS = finder.weights as Record<Category, number>;
export const finderSnapshotAt = finder.snapshotAt;

const COLL: Record<Tagged['collection'], CollectionId> = { luxury: 'luxury', ice: 'ice', exclusive: 'les-exclusifs' };
const ids = finder.productIds as Record<string, number>;

/** Tagged perfumes joined to the catalog by Morph's own product IDs, in the quiz's catalog order (its tie-break). */
export const TAGGED = (finder.perfumes as Tagged[])
  .map(t => ({ tags: t, p: perfumes.find(p => p.id === ids[t.slug]) }))
  .filter((x): x is { tags: Tagged; p: Perfume } => !!x.p);

/** Catalog perfumes the finder never returns (no tags in Morph's config). */
export const UNTAGGED = perfumes.filter(p => !TAGGED.some(x => x.p.slug === p.slug));

export type Answers = Partial<Record<string, string>>; // question id -> tag

const valid = (q: Question, tag?: string | null) => (tag && q.answers.some(a => a.tag === tag) ? tag : undefined);

export function parseAnswers(sp: Record<string, string | string[] | undefined>): Answers {
  const out: Answers = {};
  for (const q of QUESTIONS) {
    const v = valid(q, typeof sp[q.id] === 'string' ? (sp[q.id] as string) : null);
    if (v) out[q.id] = v;
  }
  return out;
}
export const complete = (a: Answers) => QUESTIONS.every(q => a[q.id]);
export const answersQuery = (a: Answers) => new URLSearchParams(QUESTIONS.filter(q => a[q.id]).map(q => [q.id, a[q.id]!])).toString();

function has(t: Tagged, cat: Category, tag: string) {
  return cat === 'collection' ? t.collection === tag : (t[cat] ?? []).includes(tag);
}

export function score(t: Tagged, a: Answers) {
  return QUESTIONS.reduce((n, q) => n + (a[q.id] && has(t, q.category, a[q.id]!) ? WEIGHTS[q.category] : 0), 0);
}

const ranked = (list: typeof TAGGED, a: Answers) =>
  list.map((x, i) => ({ ...x, score: score(x.tags, a), i })).sort((m, n) => n.score - m.score || m.i - n.i);

/** Same selection as Morph's quiz: two results inside the chosen collection, or one per collection for "any". */
export function results(a: Answers) {
  const coll = a.q7 ?? 'any';
  if (coll !== 'any') {
    const scored = ranked(TAGGED.filter(x => x.tags.collection === coll), a);
    if (!scored.length) return [];
    const levels = [...new Set(scored.map(x => x.score))];
    const first = scored.filter(x => x.score === levels[0]);
    const second = levels.length > 1 ? scored.filter(x => x.score === levels[1]) : [];
    return (first.length >= 2 ? first.slice(0, 2) : [first[0], ...second.slice(0, 1)]).slice(0, 2);
  }
  const seen = new Set<string>();
  return ranked(TAGGED, a).filter(x => (seen.has(x.tags.collection) ? false : (seen.add(x.tags.collection), true))).slice(0, 3);
}

/** Why a perfume came up: each answer, and whether Morph tagged the perfume with it. */
export function reasons(t: Tagged, a: Answers) {
  return QUESTIONS.filter(q => a[q.id] && a[q.id] !== 'any').map(q => {
    const ans = q.answers.find(x => x.tag === a[q.id])!;
    return { question: q.label, category: CATEGORY_LABEL[q.category], answer: ans.label, matched: has(t, q.category, ans.tag), weight: WEIGHTS[q.category] };
  });
}

/** Perfumes Morph tagged with a given answer (used to color the answers). */
export const taggedWith = (q: Question, tag: string) => TAGGED.filter(x => has(x.tags, q.category, tag)).map(x => x.p);

/** Short names for the answer categories, used when explaining a match. */
export const CATEGORY_LABEL: Record<Category, string> = {
  mood: 'Prezență', personality: 'Personalitate', olfactive: 'Univers olfactiv', occasion: 'Unde îl porți',
  projection: 'Cât de prezent', season: 'Anotimp', collection: 'Colecție',
};

export const collectionOf = (t: Tagged) => COLL[t.collection];
