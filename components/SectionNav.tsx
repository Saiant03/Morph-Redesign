import Link from 'next/link';
import s from './SectionNav.module.css';

/** Second-level navigation inside a section (collections, Descoperă, Layering). Same look everywhere. */
export function SectionNav({ label, items, current }: { label: string; items: { href: string; label: string }[]; current: string }) {
  return (
    <nav className={s.nav} aria-label={label}>
      {items.map(i => <Link key={i.href} href={i.href} aria-current={i.href === current ? 'page' : undefined}>{i.label}</Link>)}
    </nav>
  );
}
