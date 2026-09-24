// Shared data layer. Everything here comes from the Store API snapshot
// (data/catalog.json) or sampled bottle colors (data/colors.json). Nothing is invented; missing values stay null.
import catalog from '@/data/catalog.json';
import colors from '@/data/colors.json';

export type CollectionId = 'les-exclusifs' | 'luxury' | 'ice';

export type Perfume = {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  collection: CollectionId;
  price: number;
  inStock: boolean;
  bestseller: boolean;
  type: string | null;
  notes: { top: string[]; heart: string[]; base: string[] };
  family: string | null;
  intensity: string | null;
  longevity: string | null;
  season: string[];
  occasion: string[];
  style: string | null;
  summary: string;
  sections: { heading: string; body: string }[];
  images: string[];
  url: string;
};

export type Offer = { id: number; slug: string; name: string; price: number; inStock: boolean; image: string | null; summary: string; url: string; state?: string | null };

export type Tone = { juice: string; accent: string | null; identity: string };

const fixNote = (n: string) => n.replace(/\bavola\b/g, 'Avola');
// "Primavară" is spelled so in the Store API; shown with its diacritic.
export const perfumes = (catalog.perfumes as Perfume[]).map(p => ({ ...p, season: p.season.map(x => (x === 'Primavară' ? 'Primăvară' : x)), notes: { top: p.notes.top.map(fixNote), heart: p.notes.heart.map(fixNote), base: p.notes.base.map(fixNote) } }));
export const travelSets = catalog.travel as Offer[];
export const sampleSets = catalog.samples as Offer[];
export const layeringSets = catalog.layering as Offer[];
export const snapshotAt = catalog.snapshotAt;

export const COLLECTIONS: Record<CollectionId, { name: string; type: string; line: string }> = {
  // `line` paraphrases Morph's own collection copy (homepage "Colecțiile Morph")
  'les-exclusifs': { name: 'Les Exclusifs', type: 'Extract de parfum', line: 'Prima colecție Morph. Note orientale, florale și lemnoase.' },
  luxury: { name: 'Luxury', type: 'Eau de Parfum Intense', line: 'Opulență modernă: acorduri ambrate, condimentate, dulci sau lemnoase.' },
  ice: { name: 'Ice', type: 'Eau de Parfum Intense', line: 'Cea mai nouă colecție: esențe fresh împletite cu note profunde.' },
};

// Proposed 5-family grouping (docs/research/06). Maps Morph's own "Încadrare parfum" values.
export const FAMILY_GROUPS: { id: string; name: string; members: string[] }[] = [
  { id: 'gourmand', name: 'Gourmand', members: ['Gourmand', 'Lemnos-gourmand'] },
  { id: 'ambrat', name: 'Ambrat', members: ['Lemnos-oriental', 'Floral-oriental', 'Oriental', 'Ambrat'] },
  { id: 'lemnos', name: 'Lemnos', members: ['Lemnos', 'Lemnos-condimentat', 'Lemnos-mosc'] },
  { id: 'floral', name: 'Floral', members: ['Floral', 'Floral-pudrat'] },
  { id: 'proaspat', name: 'Proaspăt', members: ['Lemnos-citric', 'Marin-ozonic', 'Citric', 'Aromatic'] },
];

export function familyGroup(p: Perfume) {
  return FAMILY_GROUPS.find(g => p.family && g.members.includes(p.family)) ?? null;
}

export function tone(p: Perfume): Tone {
  const c = (colors as Record<string, Tone>)[p.slug];
  return c ?? { juice: '#c9c3b5', accent: null, identity: '#c9c3b5' };
}

export const bySlug = (slug: string) => perfumes.find(p => p.slug === slug)!;
export const inCollection = (id: CollectionId) => perfumes.filter(p => p.collection === id);
export const bestsellers = () => perfumes.filter(p => p.bestseller);
/** Bestsellers interleaved across collections, so a row shows the range. */
export function bestsellerMix(n: number, exclude: string[] = []) {
  const pools = (['luxury', 'les-exclusifs', 'ice'] as CollectionId[]).map(c => bestsellers().filter(p => p.collection === c && p.inStock && !exclude.includes(p.slug)));
  const out: Perfume[] = [];
  for (let i = 0; out.length < n && i < 20; i++) for (const pool of pools) if (pool[i] && out.length < n) out.push(pool[i]);
  return out;
}

/** The travel 2×8 ml set for a perfume, only if Morph actually sells one. */
export function travelFor(p: Perfume): Offer | null {
  const key = p.shortName.toLowerCase().replace(/\s+/g, '-');
  return travelSets.find(t => t.slug.includes(key) && /2x8|set-travel/.test(t.slug)) ?? null;
}

export function samplesFor(p: Perfume): Offer | null {
  if (p.collection === 'luxury') return sampleSets.find(s => /luxury/.test(s.slug)) ?? null;
  return sampleSets.find(s => /exclusifs|ice/.test(s.slug)) ?? null;
}

/** Same proposed family, same collection first. Attribute-based, not a Morph recommendation. */
export function related(p: Perfume, n = 3) {
  const g = familyGroup(p);
  const pool = perfumes.filter(x => x.slug !== p.slug && x.inStock && g && familyGroup(x)?.id === g.id);
  pool.sort((a, b) => Number(b.collection === p.collection) - Number(a.collection === p.collection));
  return pool.slice(0, n);
}

export const lei = (n: number) => `${n.toLocaleString('ro-RO')} lei`;
export const FREE_SHIPPING = 750; // RON, as shown on morphparfum.ro PDPs

export const concentration = (p: Perfume) =>
  p.type === 'Extract de parfum' ? 'Extract de parfum' : p.type === 'Apă intensă de parfum' ? 'Eau de Parfum Intense' : p.type;

/** One-line descriptor from real notes, e.g. "Cacao din Venezuela, ambră gri, migdală amară de Avola". */
export function descriptor(p: Perfume) {
  const all = [...p.notes.top, ...p.notes.heart, ...p.notes.base];
  return all
    .slice(0, 3)
    .map((n, i) => (i === 0 ? n : n.charAt(0).toLowerCase() + n.slice(1)))
    .join(', ')
    .replace(/\bavola\b/, 'Avola');
}

export function section(p: Perfume, match: RegExp) {
  return p.sections.find(s => match.test(s.heading)) ?? null;
}

/** Morph's own paragraph for each note tier, if present in the product description. */
export function noteStory(p: Perfume) {
  return {
    top: section(p, /^Note de vârf/i),
    heart: section(p, /^Note de mijloc/i),
    base: section(p, /^Note de bază/i),
  };
}

export const HERO_SLUG = 'morph-zeta-parfum-100ml';
// Shop facts as published in the morphparfum.ro footer and contact page (checked 2026-09-24).
// Naming: the live site calls it "magazinul din București"; "Casa Morph" is not used customer-facing (owner decision).
export const BOUTIQUE = {
  name: 'Magazinul Morph din București',
  /** in a sentence: "în magazinul Morph, Piața …" */
  short: 'magazinul Morph',
  href: '/magazin',
  address: 'Piața Alexandru Lahovari nr. 5, București',
  hours: ['L–V 12:00–20:00', 'S–D 10:00–18:00'],
  /** opening hours by weekday (0 = Sunday), for the "open now" line */
  open: [[10, 18], [12, 20], [12, 20], [12, 20], [12, 20], [12, 20], [10, 18]] as [number, number][],
  phone: '0733 400 949',
  onlineOrders: { phone: '0799 400 949', hours: 'L–V 09:00–17:00' },
  email: 'info@morphparfum.ro',
  maps: 'https://www.google.com/maps/search/?api=1&query=Pia%C8%9Ba+Alexandru+Lahovari+5+Bucure%C8%99ti',
};

export const ALL_BY_COLLECTION: CollectionId[] = ['les-exclusifs', 'luxury', 'ice'];

export const productHref = (p: Perfume) => `/${p.slug}`;
export const collectionHref = (id?: CollectionId) => (id ? `/parfumuri/${id}` : '/parfumuri');

/** Family description built from data: the notes that occur most often across the family's perfumes. */
export function familyNotes(id: string, n = 3) {
  const count = new Map<string, number>();
  for (const p of perfumes.filter(x => familyGroup(x)?.id === id))
    for (const note of [...p.notes.top, ...p.notes.heart, ...p.notes.base]) {
      const k = note.toLowerCase();
      count.set(k, (count.get(k) ?? 0) + 1);
    }
  return [...count.entries()].sort((a, b) => b[1] - a[1]).slice(0, n).map(([k]) => k);
}

export const firstSentences = (t: string, n: number) => (t.match(/[^.!?]+[.!?]+/g) || [t]).slice(0, n).join(' ').trim();

/** Discovery offers Morph sells (in stock or not), for the trial path. */
export const discoverySets = () => travelSets.filter(t => /discovery/.test(t.slug));

export const hours = (p: Perfume) => (p.longevity ? p.longevity.replace('-', '–') : null);

/** Cart line builders (the cart finds its image by key through imageFor). */
export const fullItem = (p: Perfume) => ({ key: p.slug, name: p.shortName, format: '100 ml', price: p.price });
export const travelItem = (p: Perfume, t: Offer) => ({ key: t.slug, name: p.shortName, format: 'Travel 2×8 ml', price: t.price });
export const offerItem = (o: Offer, name: string, format: string) => ({ key: o.slug, name, format, price: o.price });

/** Image for a cart line: the bottle for a perfume, the box for a set. */
export function imageFor(key: string) {
  const p = perfumes.find(x => x.slug === key);
  if (p) return p.images[0];
  return [...travelSets, ...sampleSets, ...layeringSets].find(o => o.slug === key)?.image ?? null;
}

/** Display names for Morph's trial products, from their own product names and descriptions. */
export const TRIAL: Record<string, { name: string; what: string }> = {
  'morph-set-esantioane-les-exclusifs-ice-collections': { name: 'Mostre Les Exclusifs & Ice', what: 'Setul de mostre al celor două colecții.' },
  'morph-set-esantioane-luxury-collection': { name: 'Mostre Luxury', what: 'Setul de mostre al colecției Luxury.' },
  'morph-set-esantioane': { name: 'Eșantioane parfumuri', what: 'Setul de eșantioane anterior.' },
  'set-mini-parfumuri-morph-discovery-travel-24-parfumuri-8ml': { name: 'Discovery Travel, 24 × 8 ml', what: 'Luxury, Les Exclusifs și Ice împreună, în flacoane de 8 ml.' },
  'morph-discovery-travel-set-mini-parfumuri': { name: 'Discovery Travel, 22 × 8 ml', what: '22 de parfumuri în format travel de 8 ml.' },
  'blind-set-6-samples-1-travel': { name: 'Blind set: 6 mostre + 1 travel', what: 'Mostre de 2,5 ml și un travel, fără să știi care sunt până deschizi cutia.' },
};
export const sampleName = (slug: string) => `Setul de mostre ${/luxury/.test(slug) ? 'Luxury' : 'Les Exclusifs & Ice'}`;
