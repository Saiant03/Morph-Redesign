// Navigation (docs/design/phase-b5-asset-transition.md). Five primary items, as in docs/research/06; the rest of
// Morph's structure sits one level down, grouped under the item it belongs to, never beside it:
// Baie & Corp and Seturi under Parfumuri (as on morphparfum.ro), Despre Morph and the Jurnal under the shop.
// `children` is the item's own section nav (SectionNav on its pages); `groups` is the header panel / mobile sheet.
export type NavLink = { href: string; label: string; ext?: boolean };
export type NavItem = { href: string; label: string; match?: RegExp; children?: NavLink[]; groups: { title: string; links: NavLink[] }[] };

// The Journal (phase C4.1b): three entries in the concept; Morph's full blog stays on morphparfum.ro, linked from it.
export const JOURNAL = '/jurnal';

export const NAV: NavItem[] = [
  {
    href: '/parfumuri', label: 'Parfumuri', match: /^\/(parfumuri|morph[-_])/,
    groups: [
      { title: 'Colecții', links: [{ href: '/parfumuri', label: 'Toate parfumurile' }, { href: '/parfumuri/les-exclusifs', label: 'Les Exclusifs' }, { href: '/parfumuri/luxury', label: 'Luxury' }, { href: '/parfumuri/ice', label: 'Ice' }] },
      { title: 'Baie & Corp', links: [{ href: '/parfumuri/corp', label: 'Geluri de duș și creme de corp' }, { href: '/parfumuri/corp#ritualuri', label: 'Ritualul fiecărui parfum' }] },
      // Morph's sets are three intents (research 01 §11); each link goes to the page that serves it (phase C2)
      { title: 'Seturi', links: [{ href: '/parfumuri/corp#coffret', label: 'Coffret: parfum cu gel sau cremă' }, { href: '/descopera#travel', label: 'Travel Editions 2×8 ml' }, { href: '/descopera#incearca', label: 'Mostre și Discovery' }, { href: '/layering/your-next-form', label: 'Seturi layering Your Next Form' }] },
    ],
  },
  {
    href: '/descopera', label: 'Descoperă',
    children: [{ href: '/descopera', label: 'Explorează' }, { href: '/descopera/finder', label: 'Fragrance Finder' }],
    groups: [{ title: 'Descoperă', links: [{ href: '/descopera#familii', label: 'Cinci familii' }, { href: '/descopera#note', label: 'Notele, de la A la Z' }, { href: '/descopera/finder', label: 'Fragrance Finder' }, { href: '/descopera#incearca', label: 'Încearcă înainte de sticlă' }] }],
  },
  {
    href: '/layering', label: 'Layering',
    children: [{ href: '/layering', label: 'Compune' }, { href: '/layering/your-next-form', label: 'Your Next Form' }],
    groups: [{ title: 'Layering', links: [{ href: '/layering', label: 'Compune o pereche' }, { href: '/layering/your-next-form', label: 'Your Next Form' }] }],
  },
  {
    href: '/cadouri', label: 'Cadouri',
    // in the page's order (phase C4.3b): the buyer's certainty first, the budget index last
    groups: [{ title: 'Cadouri', links: [{ href: '/cadouri#sticla', label: 'Știu ce poartă' }, { href: '/cadouri#descoperire', label: 'Nu știu încă' }, { href: '/cadouri#surpriza', label: 'O surpriză' }, { href: '/cadouri#card', label: 'Gift card' }, { href: '/cadouri#buget', label: 'După buget' }] }],
  },
  {
    href: '/magazin', label: 'Magazinul', match: /^\/(magazin|jurnal|despre-noi)(\/|$)/,
    groups: [
      { title: 'Magazinul', links: [{ href: '/magazin', label: 'Magazinul Morph din București' }, { href: '/magazin#certilogo', label: 'Autenticitate Certilogo' }] },
      { title: 'Morph', links: [{ href: '/despre-noi', label: 'Despre Morph' }, { href: JOURNAL, label: 'Jurnal' }] },
    ],
  },
];
export const LAYERING_NAV = NAV[2].children!;
