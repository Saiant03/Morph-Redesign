'use client';
import { useSyncExternalStore } from 'react';

// Mock cart for the concept: in memory, per page view. No checkout, no persistence.
// Lines are merged by key; adding the same key again raises its quantity.
export type CartItem = { key: string; name: string; format: string; price: number };
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
    set({ ...state, items: qty > 0 ? state.items.map(x => (x.key === key ? { ...x, qty } : x)) : state.items.filter(x => x.key !== key) });
  },
  remove(key: string) { set({ ...state, items: state.items.filter(x => x.key !== key) }); },
  open() { set({ ...state, open: true }); },
  close() { set({ ...state, open: false }); },
};

export function useCart() {
  const s = useSyncExternalStore(f => (subs.add(f), () => subs.delete(f)), () => state, () => EMPTY);
  return { ...s, count: s.items.reduce((n, i) => n + i.qty, 0), total: s.items.reduce((n, i) => n + i.price * i.qty, 0) };
}
