'use client';
import { useEffect, useState } from 'react';

// Mock cart for the prototypes: in-memory, per page view. No checkout, no persistence.
export type CartItem = { name: string; price: number; format: string };
const EVT = 'morph:cart';
let items: CartItem[] = [];

export function addToCart(item: CartItem) {
  items = [...items, item];
  window.dispatchEvent(new CustomEvent(EVT, { detail: { items, last: item } }));
}

export function useCart() {
  const [state, set] = useState<{ items: CartItem[]; last: CartItem | null }>({ items, last: null });
  useEffect(() => {
    const on = (e: Event) => set((e as CustomEvent).detail);
    window.addEventListener(EVT, on);
    return () => window.removeEventListener(EVT, on);
  }, []);
  const total = state.items.reduce((s, i) => s + i.price, 0);
  return { ...state, count: state.items.length, total };
}
