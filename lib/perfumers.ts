import data from '@/data/perfumers.json';
import { bySlug } from './catalog';

// Perfumer credits (docs/design/phase-c4-1c-about-perfumers.md): only what a Morph source states, with the source.
// `withheld` lists the attributions that are known but not shown; nothing reads it except the smoke test and the docs.
export type Credit = (typeof data.credits)[number];

export const NOSES_URL = data.noses;
export const creditFor = (slug: string): Credit | null => data.credits.find(c => c.slug === slug) ?? null;

/** the credited perfumers, in the order of data/perfumers.json, each with their perfumes */
export const PERFUMERS = [...new Set(data.credits.map(c => c.perfumer))].map(name => ({
  name,
  works: data.credits.filter(c => c.perfumer === name).map(c => ({ p: bySlug(c.slug), source: c.sources[0] })),
}));
