'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { cart, useCart } from '@/lib/cart';
import { NAV } from '@/lib/nav';
import s from './SiteHeader.module.css';

const isCurrent = (n: (typeof NAV)[number], path: string) =>
  n.href.startsWith('/') && (n.match ? n.match.test(path) : path === n.href || path.startsWith(n.href + '/'));

export function SiteHeader() {
  const path = usePathname() || '/';
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);

  return (
    <header className={s.header} data-open={open}>
      <div className={`wrap ${s.inner}`}>
        <Link href="/" className={s.logo} aria-label="Morph, pagina principală"><Logo /></Link>
        <nav className={s.nav} aria-label="Principal">
          {NAV.map(n => (
            <Link key={n.label} href={n.href} aria-current={isCurrent(n, path) ? 'page' : undefined}>{n.label}</Link>
          ))}
        </nav>
        <div className={s.utils}>
          <Link href="/parfumuri#cauta" className={s.util}>Caută</Link>
          <button type="button" className={s.util} onClick={cart.open} aria-label={`Coș, ${count} ${count === 1 ? 'produs' : 'produse'}`}>
            Coș <span className={`${s.count} num`}>{count}</span>
          </button>
          <button type="button" className={`${s.util} ${s.menuBtn}`} aria-expanded={open} aria-controls="meniu" onClick={() => setOpen(!open)}>
            {open ? 'Închide' : 'Meniu'}
          </button>
        </div>
      </div>
      <nav id="meniu" className={s.sheet} aria-label="Meniu" hidden={!open}>
        <ul className="wrap">
          {NAV.map(n => (
            <li key={n.label}>
              <Link href={n.href} onClick={() => setOpen(false)} aria-current={isCurrent(n, path) ? 'page' : undefined}>{n.label}</Link>
              {n.children && (
                <ul className={s.sub}>
                  {n.children.slice(1).map(c => <li key={c.href}><Link href={c.href} onClick={() => setOpen(false)}>{c.label}</Link></li>)}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
