'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/shared/Logo';
import { addToCart, useCart } from '@/components/shared/cart';
import { type Perfume, lei, descriptor, familyGroup, travelFor, veilTint } from '@/lib/catalog';
import s from './strata.module.css';

const NAV = [
  { href: '/concept/c/collection', label: 'Parfumuri' },
  { href: '/concept/c/home#descopera', label: 'Descoperă' },
  { href: '/concept/c/home#layering', label: 'Layering' },
  { href: '/concept/c/home#cadouri', label: 'Cadouri' },
  { href: '/concept/c/home#casa-morph', label: 'Casa Morph' },
];


export function Header({ current }: { current?: string }) {
  const { count, last, total } = useCart();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [toast, setToast] = useState(false);
  useEffect(() => { const on = () => setSolid(window.scrollY > 40); on(); window.addEventListener('scroll', on, { passive: true }); return () => window.removeEventListener('scroll', on); }, []);
  useEffect(() => { if (!last) return; setToast(true); const t = setTimeout(() => setToast(false), 2600); return () => clearTimeout(t); }, [last]);
  return (
    <header className={s.header} data-solid={solid || open}>
      <div className={`${s.wrap} ${s.headerInner}`}>
        <Link href="/concept/c/home" className={s.logo} aria-label="Morph — acasă"><Logo /></Link>
        <nav className={s.nav} aria-label="Principal">
          {NAV.map(n => <Link key={n.label} href={n.href} aria-current={current === n.label ? 'page' : undefined}>{n.label}</Link>)}
        </nav>
        <div className={s.utils}>
          <span className={s.utilsDesk}><button type="button">Caută</button></span>
          <span className={s.utilsDesk}><button type="button">Cont</button></span>
          <button type="button">Coș<span className={s.pill}>{count}</span></button>
          <button type="button" className={s.menuBtn} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Închide' : 'Meniu'}</button>
        </div>
      </div>
      <nav className={s.mobileNav} data-open={open} aria-label="Principal mobil">
        {NAV.map(n => <Link key={n.label} href={n.href} onClick={() => setOpen(false)}>{n.label}</Link>)}
      </nav>
      <div className={s.toast} data-show={toast} role="status" aria-live="polite">{last && <>Adăugat: {last.name}, {last.format} · total {lei(total)}</>}</div>
    </header>
  );
}

/** Card: bottle on its own soft tint; an information veil rises over the image on hover (always open on mobile). */
export function Card({ p }: { p: Perfume }) {
  const travel = travelFor(p);
  return (
    <article className={`${s.card} ${p.inStock ? '' : s.soldout}`} data-flip-id={p.slug}>
      <div className={s.cardMedia} style={{ '--tint': veilTint(p) } as React.CSSProperties}>
        <Link href={`/concept/c/product?p=${p.slug}`} aria-label={`${p.shortName}, detalii`}>
          <img src={p.images[0]} alt={p.name} width={768} height={960} loading="lazy" />
        </Link>
        {!p.inStock && <span className={s.flag}>Stoc epuizat</span>}
      </div>
      <div className={s.cardVeil}>
          <div className={s.cardTop}>
            <Link href={`/concept/c/product?p=${p.slug}`} className={`${s.cardName} ${s.serif}`}>{p.shortName}</Link>
            <span className={s.cardPrice}>{lei(p.price)}</span>
          </div>
          <p className={s.cardDesc}>{descriptor(p)}</p>
          <p className={s.cardDesc}>{[familyGroup(p)?.name, p.longevity?.replace('-', '–')].filter(Boolean).join(' · ')}{travel ? ` · travel ${lei(travel.price)}` : ''}</p>
          <div className={s.cardActions}>
            <span>100 ml</span>
            {p.inStock
              ? <button type="button" onClick={() => addToCart({ name: p.shortName, price: p.price, format: '100 ml' })}>Adaugă</button>
              : <button type="button">Anunță-mă</button>}
          </div>
      </div>
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
