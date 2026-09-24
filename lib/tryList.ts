'use client';
import { useSyncExternalStore } from 'react';

// "De încercat în magazin": the visitor's own shortlist, kept only in this browser (localStorage).
// An entry is a perfume slug, or two slugs joined by "+" for a layering pair. Nothing is sent anywhere.
const KEY = 'morph-concept-try';
let items: string[] = [];
let loaded = false;
const subs = new Set<() => void>();

function load() {
  if (loaded || typeof window === 'undefined') return;
  loaded = true;
  try { items = JSON.parse(localStorage.getItem(KEY) ?? '[]'); } catch { items = []; }
}
function save(next: string[]) {
  items = next;
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* private mode: keep in memory */ }
  subs.forEach(f => f());
}

export const pairKey = (a: string, b: string) => `${a}+${b}`;

export const tryList = {
  toggle(key: string) { load(); save(items.includes(key) ? items.filter(k => k !== key) : [...items, key]); },
  remove(key: string) { load(); save(items.filter(k => k !== key)); },
};

const EMPTY: string[] = [];
export function useTryList() {
  return useSyncExternalStore(f => (subs.add(f), () => subs.delete(f)), () => (load(), items), () => EMPTY);
}
