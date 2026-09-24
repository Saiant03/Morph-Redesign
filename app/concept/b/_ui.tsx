'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/shared/Logo';
import { addToCart, useCart } from '@/components/shared/cart';
import { type Perfume, lei, familyGroup } from '@/lib/catalog';
import s from './forma.module.css';

const NAV = [
  { href: '/concept/b/collection', label: 'Parfumuri' },
  { href: '/concept/b/home#descopera', label: 'Descoperă' },
  { href: '/concept/b/home#layering', label: 'Layering' },
  { href: '/concept/b/home#cadouri', label: 'Cadouri' },
  { href: '/concept/b/home#casa-morph', label: 'Casa Morph' },
];

export function Header({ current }: { current?: string }) {
  const { count, last, total } = useCart();
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(false);
  useEffect(() => { if (!last) return; setToast(true); const t = setTimeout(() => setToast(false), 2600); return () => clearTimeout(t); }, [last]);
  return (
    <header className={s.header}>
      <div className={s.wrap}>
        <div className={s.headerInner}>
          <nav className={s.nav} aria-label="Principal">
            {NAV.map(n => <Link key={n.label} href={n.href} aria-current={current === n.label ? 'page' : undefined}>{n.label}</Link>)}
          </nav>
          <Link href="/concept/b/home" className={s.logo} aria-label="Morph — acasă"><Logo /></Link>
          <div className={s.utils}>
            <span className={s.utilsDesk}><button type="button">Caută</button></span>
            <span className={s.utilsDesk}><button type="button">Cont</button></span>
            <button type="button">Coș [<span className={s.bagCount}>{count}</span>]</button>
            <button type="button" className={s.menuBtn} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Închide' : 'Meniu'}</button>
          </div>
        </div>
      </div>
      <nav className={s.mobileNav} data-open={open} aria-label="Principal mobil">
        {NAV.map(n => <Link key={n.label} href={n.href} onClick={() => setOpen(false)}>{n.label}</Link>)}
      </nav>
      <div className={s.toast} data-show={toast} role="status" aria-live="polite">{last && <>Adăugat: {last.name}, {last.format}. Total {lei(total)}.</>}</div>
    </header>
  );
}

/** A frame sheared like the bottle. Monochrome until hovered: color only appears in the glass. */
export function Tile({ p }: { p: Perfume }) {
  const fam = familyGroup(p);
  return (
    <article className={`${s.tile} ${s.hasColor}`} data-flip-id={p.slug}>
      <Link href={`/concept/b/product?p=${p.slug}`} className={`${s.tileFrame} ${s.shear}`} aria-label={p.shortName}>
        <img className={s.mono} src={p.images[0]} alt={p.name} width={768} height={960} loading="lazy" />
      </Link>
      <h3 className={`${s.tileName} ${s.compressed}`}><Link href={`/concept/b/product?p=${p.slug}`}>{p.shortName}</Link></h3>
      <div className={s.tileRow}>
        <span>{fam?.name ?? '—'} · {p.longevity?.replace('-', '–') ?? '—'}</span>
        <span>{lei(p.price)}</span>
      </div>
      {p.inStock
        ? <button type="button" className={s.tileAdd} onClick={() => addToCart({ name: p.shortName, price: p.price, format: '100 ml' })}>Adaugă 100 ml</button>
        : <span className={s.muted}>Stoc epuizat</span>}
    </article>
  );
}

export function Footer() {
  return (
    <footer className={s.wrap}>
      <div className={s.footer}>
        <span>Morph Parfum România — magazin oficial. Concept de redesign, prototip privat.</span>
        <span>Livrare · Retur · Certilogo · Contact · ANPC</span>
      </div>
    </footer>
  );
}
