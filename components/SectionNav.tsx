import Link from 'next/link';
import s from './SectionNav.module.css';

/**
 * Second-level navigation inside a section (collections, Descoperă, Layering). Same look everywhere.
 * `types`: view-transition types for the change (the collection tabs pass 'room': the room changes state in place).
 */
export function SectionNav({ label, items, current, types }: { label: string; items: { href: string; label: string }[]; current: string; types?: string[] }) {
  return (
    <nav className={s.nav} aria-label={label}>
      {items.map(i => <Link key={i.href} href={i.href} transitionTypes={types} aria-current={i.href === current ? 'page' : undefined}>{i.label}</Link>)}
    </nav>
  );
}
