'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { cart, useCart } from '@/lib/cart';
import s from './SiteHeader.module.css';

// Primary navigation from docs/research/06. Only Parfumuri has its own route in the concept;
// the others point to the homepage section that carries them, or to Morph's live page.
export const NAV = [
  { href: '/parfumuri', label: 'Parfumuri' },
  { href: '/#incearca', label: 'Descoperă' },
  { href: '/#combina', label: 'Layering' },
  { href: 'https://morphparfum.ro/gift-card-morph-parfum', label: 'Cadouri' },
  { href: '/#casa-morph', label: 'Casa Morph' },
];

export function SiteHeader() {
  const path = usePathname() || '/';
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const inShop = path !== '/';

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
            <Link key={n.label} href={n.href} aria-current={n.label === 'Parfumuri' && inShop ? 'page' : undefined}>{n.label}</Link>
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
          {NAV.map(n => <li key={n.label}><Link href={n.href} onClick={() => setOpen(false)}>{n.label}</Link></li>)}
        </ul>
      </nav>
    </header>
  );
}
