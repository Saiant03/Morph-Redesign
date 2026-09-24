import type { CollectionId } from './catalog';

// Morph's own campaign for each collection (public/morph/campaign, provenance in data/assets.json).
// `side`: the text card sits where the photograph leaves room; `pos` keeps the subject in frame when cropped.
export const CAMPAIGN: Record<CollectionId, { src: string; mobile: string; alt: string; pos: string; side: 'left' | 'right' }> = {
  'les-exclusifs': { src: '/morph/campaign/les-exclusifs-campaign.avif', mobile: '/morph/campaign/les-exclusifs-campaign-m.avif', alt: 'Campania Morph Les Exclusifs: o panteră neagră ține în fălci o sticlă Les Exclusifs', pos: '30% 50%', side: 'right' },
  luxury: { src: '/morph/campaign/luxury-campaign.avif', mobile: '/morph/campaign/luxury-campaign-m.avif', alt: 'Campania Morph Luxury: sticle legate cu frânghie roșie', pos: '50% 40%', side: 'left' },
  ice: { src: '/morph/campaign/ice-campaign.avif', mobile: '/morph/campaign/ice-campaign-m.avif', alt: 'Campania Morph Ice: mâini în mănuși de laborator, nisip, o fiolă și o sticlă Ice', pos: '60% 40%', side: 'left' },
};
