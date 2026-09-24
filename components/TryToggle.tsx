'use client';
import { tryList, useTryList } from '@/lib/tryList';

/** Adds a perfume (or a layering pair) to the visitor's own list for Casa Morph. Stored only in this browser. */
export function TryToggle({ id, name, className = 'text-btn link t-small' }: { id: string; name: string; className?: string }) {
  const list = useTryList();
  const on = list.includes(id);
  return (
    <button type="button" className={className} aria-pressed={on} onClick={() => tryList.toggle(id)}
      aria-label={on ? `${name} e pe lista pentru Casa Morph. Scoate de pe listă` : `Adaugă ${name} pe lista de încercat în Casa Morph`}>
      {on ? 'Pe lista pentru Casa Morph ✓' : 'De încercat în Casa Morph'}
    </button>
  );
}
