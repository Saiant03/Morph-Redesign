// Primary navigation from docs/research/06: five items, two of them with a second level shown as a
// SectionNav on their pages and indented in the mobile sheet. Cadouri stays on Morph's live gift card page.
export const NAV: { href: string; label: string; match?: RegExp; children?: { href: string; label: string }[] }[] = [
  { href: '/parfumuri', label: 'Parfumuri', match: /^\/(parfumuri|morph[-_])/ },
  { href: '/descopera', label: 'Descoperă', children: [{ href: '/descopera', label: 'Explorează' }, { href: '/descopera/finder', label: 'Fragrance Finder' }] },
  { href: '/layering', label: 'Layering', children: [{ href: '/layering', label: 'Compune' }, { href: '/layering/your-next-form', label: 'Your Next Form' }] },
  { href: 'https://morphparfum.ro/gift-card-morph-parfum', label: 'Cadouri' },
  { href: '/casa-morph', label: 'Casa Morph' },
];
export const DESCOPERA_NAV = NAV[1].children!;
export const LAYERING_NAV = NAV[2].children!;
