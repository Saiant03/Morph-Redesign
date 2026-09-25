'use client';
import { useSyncExternalStore } from 'react';

// Mock cart for the concept: in memory, per page view. No checkout, no persistence.
// Lines are merged by key; adding the same key again raises its quantity.
// A line with `of` belongs to another line (the gift box of a bottle): it goes when that line goes, never outnumbers it.
export type CartItem = { key: string; name: string; format: string; price: number; of?: string };
export type CartLine = CartItem & { qty: number };
type State = { items: CartLine[]; open: boolean };

let state: State = { items: [], open: false };
const subs = new Set<() => void>();
const set = (next: State) => { state = next; subs.forEach(f => f()); };
const EMPTY: State = { items: [], open: false };

export const cart = {
  add(items: CartItem[]) {
    const next = [...state.items];
    for (const i of items) {
      const k = next.findIndex(x => x.key === i.key);
      if (k >= 0) next[k] = { ...next[k], qty: next[k].qty + 1 };
      else next.push({ ...i, qty: 1 });
    }
    set({ items: next, open: true });
  },
  setQty(key: string, qty: number) {
    const own = state.items.find(x => x.key === key);
    const cap = own?.of ? state.items.find(x => x.key === own.of)?.qty ?? 0 : Infinity;
    const q = Math.min(qty, cap);
    const items = state.items
      .map(x => (x.key === key ? { ...x, qty: q } : x.of === key ? { ...x, qty: Math.min(x.qty, q) } : x))
      .filter(x => x.qty > 0);
    set({ ...state, items });
  },
  remove(key: string) { set({ ...state, items: state.items.filter(x => x.key !== key && x.of !== key) }); },
  open() { set({ ...state, open: true }); },
  close() { set({ ...state, open: false }); },
};

export function useCart() {
  const s = useSyncExternalStore(f => (subs.add(f), () => subs.delete(f)), () => state, () => EMPTY);
  return { ...s, count: s.items.reduce((n, i) => n + i.qty, 0), total: s.items.reduce((n, i) => n + i.price * i.qty, 0) };
}
