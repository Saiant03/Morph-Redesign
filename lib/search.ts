'use client';
import { useSyncExternalStore } from 'react';

// Open state of the search overlay, shared by the header button and the overlay.
let open = false;
const subs = new Set<() => void>();
const set = (v: boolean) => { open = v; subs.forEach(f => f()); };
export const search = { open: () => set(true), close: () => set(false) };
export const useSearchOpen = () => useSyncExternalStore(f => (subs.add(f), () => subs.delete(f)), () => open, () => false);
