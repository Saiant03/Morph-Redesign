'use client';
import { tryList, useTryList } from '@/lib/tryList';

/** Adds a perfume (or a layering pair) to the visitor's own list for the shop. Stored only in this browser. */
export function TryToggle({ id, name, className = 'text-btn link t-small' }: { id: string; name: string; className?: string }) {
  const list = useTryList();
  const on = list.includes(id);
  return (
    <button type="button" className={className} aria-pressed={on} onClick={() => tryList.toggle(id)}
      aria-label={on ? `${name} e pe lista pentru magazin. Scoate de pe listă` : `Adaugă ${name} pe lista de încercat în magazin`}>
      {on ? 'Pe lista pentru magazin ✓' : 'De încercat în magazin'}
    </button>
  );
}
