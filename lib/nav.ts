// Navigation (docs/design/phase-b5-asset-transition.md). Five primary items, as in docs/research/06; the rest of
// Morph's structure sits one level down, grouped under the item it belongs to, never beside it:
// Baie & Corp and Seturi under Parfumuri (as on morphparfum.ro), Despre Morph and the Jurnal under the shop.
// `children` is the item's own section nav (SectionNav on its pages); `groups` is the header panel / mobile sheet.
export type NavLink = { href: string; label: string; ext?: boolean };
export type NavItem = { href: string; label: string; match?: RegExp; children?: NavLink[]; groups: { title: string; links: NavLink[] }[] };

// Morph's journal stays on morphparfum.ro: the concept has no article pages, and none are invented.
export const JOURNAL = 'https://morphparfum.ro/blog/';

export const NAV: NavItem[] = [
  {
    href: '/parfumuri', label: 'Parfumuri', match: /^\/(parfumuri|morph[-_])/,
    groups: [
      { title: 'Colecții', links: [{ href: '/parfumuri', label: 'Toate parfumurile' }, { href: '/parfumuri/les-exclusifs', label: 'Les Exclusifs' }, { href: '/parfumuri/luxury', label: 'Luxury' }, { href: '/parfumuri/ice', label: 'Ice' }] },
      { title: 'Baie & Corp', links: [{ href: '/parfumuri/corp', label: 'Geluri de duș și creme de corp' }] },
      { title: 'Seturi', links: [{ href: '/parfumuri/corp', label: 'Parfum cu gel sau cremă' }, { href: '/descopera#incearca', label: 'Travel 2×8 ml și mostre' }, { href: '/layering/your-next-form', label: 'Seturi layering Your Next Form' }] },
    ],
  },
  {
    href: '/descopera', label: 'Descoperă',
    children: [{ href: '/descopera', label: 'Explorează' }, { href: '/descopera/finder', label: 'Fragrance Finder' }],
    groups: [{ title: 'Descoperă', links: [{ href: '/descopera', label: 'Explorează familiile' }, { href: '/descopera/finder', label: 'Fragrance Finder' }, { href: '/descopera#incearca', label: 'Încearcă înainte de sticlă' }] }],
  },
  {
    href: '/layering', label: 'Layering',
    children: [{ href: '/layering', label: 'Compune' }, { href: '/layering/your-next-form', label: 'Your Next Form' }],
    groups: [{ title: 'Layering', links: [{ href: '/layering', label: 'Compune o pereche' }, { href: '/layering/your-next-form', label: 'Your Next Form' }] }],
  },
  {
    href: '/cadouri', label: 'Cadouri',
    groups: [{ title: 'Cadouri', links: [{ href: '/cadouri', label: 'După buget' }, { href: '/cadouri#sticla', label: 'Dacă știi parfumul' }, { href: '/cadouri#descoperire', label: 'Dacă nu știi încă' }, { href: '/cadouri#card', label: 'Gift card' }] }],
  },
  {
    href: '/magazin', label: 'Magazinul',
    groups: [
      { title: 'Magazinul', links: [{ href: '/magazin', label: 'Magazinul Morph din București' }, { href: '/magazin#certilogo', label: 'Autenticitate Certilogo' }] },
      { title: 'Morph', links: [{ href: '/magazin#povestea', label: 'Despre Morph' }, { href: JOURNAL, label: 'Jurnal', ext: true }] },
    ],
  },
];
export const DESCOPERA_NAV = NAV[1].children!;
export const LAYERING_NAV = NAV[2].children!;
