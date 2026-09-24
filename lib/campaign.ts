import type { CollectionId } from './catalog';

// Morph's own campaign for each collection (public/morph/campaign, provenance in data/assets.json).
// Framing (phase-b5-asset-transition.md): `pos` is the focal point of the landscape frame, `posM` of Morph's portrait
// crop. `side` puts the home card over the part of the photograph that holds no subject; `align` lowers it when
// the subject sits high on that side (Ice: the bottle in the gloved hand, top right).
export const CAMPAIGN: Record<CollectionId, { src: string; mobile: string; alt: string; pos: string; posM: string; side: 'left' | 'right'; align?: 'end' }> = {
  'les-exclusifs': { src: '/morph/campaign/les-exclusifs-campaign.avif', mobile: '/morph/campaign/les-exclusifs-campaign-m.avif', alt: 'Campania Morph Les Exclusifs: o panteră neagră ține în fălci o sticlă Les Exclusifs', pos: '62% 32%', posM: '60% 38%', side: 'left' },
  luxury: { src: '/morph/campaign/luxury-campaign.avif', mobile: '/morph/campaign/luxury-campaign-m.avif', alt: 'Campania Morph Luxury: sticle legate cu frânghie roșie', pos: '0% 12%', posM: '50% 45%', side: 'right' },
  ice: { src: '/morph/campaign/ice-campaign.avif', mobile: '/morph/campaign/ice-campaign-m.avif', alt: 'Campania Morph Ice: mâini în mănuși de laborator, nisip, o fiolă și o sticlă Ice', pos: '70% 6%', posM: '50% 22%', side: 'right', align: 'end' },
};

// "All perfumes": Morph's row of bottles with their reflections
export const ALL_ROOM = { src: '/morph/campaign/bottle-row.avif', alt: 'Sticle Morph așezate în rând, cu reflexiile lor', pos: '50% 45%' };
