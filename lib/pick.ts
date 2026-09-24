'use client';
import { useSyncExternalStore } from 'react';

/**
 * On a collection page a bottle appears twice: on the shelf and in the index (row or gallery card). Only one of
 * them may carry its shared name (obj-<slug>) into the product page, so the one the visitor clicks takes it.
 * The shelf holds it by default, so returning from a product page lands the bottle back on its shelf.
 */
type Picked = { slug: string; from: 'shelf' | 'index' } | null;
let picked: Picked = null;
const subs = new Set<() => void>();
export const pick = (slug: string, from: 'shelf' | 'index') => { picked = { slug, from }; subs.forEach(f => f()); };
export const usePicked = () => useSyncExternalStore(f => (subs.add(f), () => subs.delete(f)), () => picked, () => null);
export const indexHolds = (p: Picked, slug: string) => p?.from === 'index' && p.slug === slug;
