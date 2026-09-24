'use client';
import { useSyncExternalStore } from 'react';

// Mock cart for the concept: in memory, per page view. No checkout, no persistence.
export type CartItem = { key: string; name: string; format: string; price: number; color?: string };
type State = { items: CartItem[]; open: boolean };

let state: State = { items: [], open: false };
const subs = new Set<() => void>();
const set = (next: State) => { state = next; subs.forEach(f => f()); };
const EMPTY: State = { items: [], open: false };

export const cart = {
  add(items: CartItem[]) { set({ items: [...state.items, ...items], open: true }); },
  remove(i: number) { set({ ...state, items: state.items.filter((_, k) => k !== i) }); },
  open() { set({ ...state, open: true }); },
  close() { set({ ...state, open: false }); },
};

export function useCart() {
  const s = useSyncExternalStore(f => (subs.add(f), () => subs.delete(f)), () => state, () => EMPTY);
  return { ...s, count: s.items.length, total: s.items.reduce((n, i) => n + i.price, 0) };
}
