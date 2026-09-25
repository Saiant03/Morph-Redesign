// Shared data layer. Everything here comes from the Store API snapshot
// (data/catalog.json) or sampled bottle colors (data/colors.json). Nothing is invented; missing values stay null.
import catalog from '@/data/catalog.json';
import colors from '@/data/colors.json';
import objects from '@/data/objects.json';
import lightmasks from '@/data/lightmasks.json';

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

/** Body & Bath and the perfume + body sets, linked to their perfume (`scent`) by Morph's product name. */
export type BodyKind = 'gel' | 'cream' | 'set-gel' | 'set-cream';
export type BodyItem = Offer & { kind: BodyKind; scent: string | null };

const fixNote = (n: string) => n.replace(/\bavola\b/g, 'Avola');
// Seven perfumes (Axum, Nudo, Antigua Bay, Malaga, Umhh, Iconic: base; Kolonaki: heart) have an empty note attribute
// in the Store API while Morph's own description lists that tier ("Note de bază: …"). Only an empty tier is filled
// from it; a published attribute is never replaced (docs/design/phase-c3-5-1-motion-polish.md).
const TIER_HEAD = { top: /^Note de v[âa]rf:/i, heart: /^Note de mijloc:/i, base: /^Note de baz[ăa]:/i };
const fromText = (p: Perfume, t: keyof typeof TIER_HEAD) => {
  const h = p.sections.find(x => TIER_HEAD[t].test(x.heading))?.heading ?? '';
  return h.replace(TIER_HEAD[t], '').replace(/\.\s*$/, '').split(',').map(n => n.trim()).filter(Boolean).map(n => n.charAt(0).toUpperCase() + n.slice(1));
};
const tier = (p: Perfume, t: keyof typeof TIER_HEAD) => (p.notes[t].length ? p.notes[t] : fromText(p, t)).map(fixNote);
// "Primavară" is spelled so in the Store API; shown with its diacritic.
export const perfumes = (catalog.perfumes as Perfume[]).map(p => ({ ...p, season: p.season.map(x => (x === 'Primavară' ? 'Primăvară' : x)), notes: { top: tier(p, 'top'), heart: tier(p, 'heart'), base: tier(p, 'base') } }));
export const travelSets = catalog.travel as Offer[];
export const sampleSets = catalog.samples as Offer[];
export const layeringSets = catalog.layering as Offer[];
/** A Your Next Form set's key in the URL (?stare=): its state, lower case. */
export const stateKey = (o: Offer) => (o.state ?? o.slug).toLowerCase();
export const snapshotAt = catalog.snapshotAt;
export const bodyItems = catalog.body as BodyItem[];
export const giftBox = (catalog.gift as (Offer & { range: number[] | null })[]).find(g => g.slug === 'gift-box') ?? null;
// the gift card's fixed amounts come from the snapshot (`values`, since phase C4.3b); `range` is the API's min–max
export const giftCard = (catalog.gift as (Offer & { range: number[] | null; values?: number[] | null })[]).find(g => /gift-card/.test(g.slug)) ?? null;

export const BODY_KIND: Record<BodyKind, { name: string; format: string }> = {
  gel: { name: 'Gel de duș', format: 'Gel de duș, 200 ml' },
  cream: { name: 'Cremă de corp', format: 'Cremă de corp, 200 ml' },
  'set-gel': { name: 'Set parfum și gel de duș', format: 'Set 100 ml + gel 200 ml' },
  'set-cream': { name: 'Set parfum și cremă de corp', format: 'Set 100 ml + cremă 200 ml' },
};
/** The body products Morph sells for a perfume, in ritual order: gel, cream, then the sets. */
export function bodyFor(p: Perfume) {
  const order: BodyKind[] = ['gel', 'cream', 'set-gel', 'set-cream'];
  return bodyItems.filter(b => b.scent === p.slug).sort((a, z) => order.indexOf(a.kind) - order.indexOf(z.kind));
}
/** Perfumes that have at least one body product, in catalog order. */
export const ritualPerfumes = () => perfumes.filter(p => bodyItems.some(b => b.scent === p.slug));
/** A body product keeps Morph's own URL (research 06: preserve URLs), like the perfumes. */
export const bodyHref = (b: BodyItem) => `/${b.slug}`;
export const bodyBySlug = (slug: string) => bodyItems.find(b => b.slug === slug && b.scent) ?? null;
export const isSet = (b: BodyItem) => b.kind === 'set-gel' || b.kind === 'set-cream';
// Morph's own lines (morphparfum.ro, Despre noi), quoted verbatim where they are used.
export const MORPH_SAYS = {
  creams: 'Concepute pentru a oferi hidratare profundă și o aromă persistentă, aceste creme sunt perfecte pentru a fi utilizate împreună cu parfumul preferat Morph, accentuând persistența acestuia și creând un efect olfactiv unic.',
  creamSets: 'Pentru ocaziile cu adevărat speciale, casa Morph oferă seturi în ediție limitată formate din cremă + parfum, produse exclusiv o dată pe an, în preajma sărbătorilor de iarnă.',
  travel: 'Pentru cei care iubesc călătoriile, Morph a creat seturile travel, concepute pentru a transforma fiecare deplasare într-o experiență olfactivă de neuitat.',
};

/** Where the object sits inside a packshot (fractions), measured by scripts/objects.mjs. */
export type ObjectBox = { w: number; h: number; top: number; bottom: number; left: number; right: number };
export const objectBox = (src: string) => (objects as Record<string, ObjectBox>)[src] ?? null;
// 2.5D object: the packshots cut out by scripts/lightmask.mjs (all 26 perfumes since Phase C1) take light on the glass
export const lightMask = (src: string) => (lightmasks as string[]).includes(src) ? `/morph/objects/${src.split('/').pop()!.replace(/\.\w+$/, '')}-mask.png` : null;

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
// Shop facts as published in the morphparfum.ro footer and contact page (checked 2026-09-25).
// Naming: the live site calls it "magazinul din București"; "Casa Morph" is not used customer-facing (owner decision).
/** The shop's published hours (Morph footer, "Program Casa Morph"), the one source for every hours line */
const hh = (h: number) => `${String(h).padStart(2, '0')}:00`;
const SHOP_HOURS = [
  { days: 'L–V', label: 'Luni–vineri', from: 12, to: 20 },
  { days: 'S–D', label: 'Sâmbătă–duminică', from: 10, to: 18 },
].map(r => ({ ...r, time: `${hh(r.from)}–${hh(r.to)}` }));
/** Google Maps place linked from Morph's Contact page ("Morph Parfum Romania"); its reviews are about the shop */
const SHOP_MAPS = 'https://maps.app.goo.gl/BtVSJc4s7KvkUQh57';

export const BOUTIQUE = {
  name: 'Magazinul Morph din București',
  /** in a sentence: "în magazinul Morph, Piața …" */
  short: 'magazinul Morph',
  href: '/magazin',
  address: 'Piața Alexandru Lahovari nr. 5, București',
  district: 'Sector 1',
  schedule: SHOP_HOURS,
  hours: SHOP_HOURS.map(r => `${r.days} ${r.time}`),
  /** opening hours by weekday (0 = Sunday), for the "open now" line */
  open: [0, 1, 2, 3, 4, 5, 6].map(d => { const r = SHOP_HOURS[d % 6 ? 0 : 1]; return [r.from, r.to]; }) as [number, number][],
  phone: '0733 400 949',
  onlineOrders: { phone: '0799 400 949', hours: 'L–V 09:00–17:00, S–D închis' },
  email: 'info@morphparfum.ro',
  maps: SHOP_MAPS,
  reviews: SHOP_MAPS,
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
export const bodyItem = (b: BodyItem, p: Perfume) => ({ key: b.slug, name: p.shortName, format: BODY_KIND[b.kind].format, price: b.price });

/** Morph offers "Cutie cadou (+20 lei)" only on some product pages (checked 2026-09-25, docs/design/phase-c4-3-gifting-newsletter-plan.md §2.2):
 *  the 100 ml bottle, the single-scent travel 2×8 ml, the sample sets and the shower gels. Not on Your Next Form,
 *  Coffret or Discovery Travel; body creams were not checked, so they are left out. */
export const boxable = (key: string) =>
  perfumes.some(p => p.slug === key) || sampleSets.some(o => o.slug === key) || bodyItems.some(b => b.slug === key && b.kind === 'gel') ||
  travelSets.some(t => t.slug === key && !/discovery|blind/.test(t.slug));
/** The gift box of one cart line: its own line, tied to that line (lib/cart.ts), so each box is ticked on its own. */
export const boxItem = (key: string, name: string) => ({ key: `cutie:${key}`, of: key, name: 'Cutie cadou', format: `pentru ${name}`, price: giftBox!.price });

/** Image for a cart line: the bottle for a perfume, the box for a set. */
export function imageFor(key: string) {
  if (key.startsWith('cutie:')) return giftBox?.image ?? null;
  const p = perfumes.find(x => x.slug === key);
  if (p) return p.images[0];
  return [...travelSets, ...sampleSets, ...layeringSets, ...bodyItems, ...(catalog.gift as Offer[])].find(o => o.slug === key)?.image ?? null;
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
