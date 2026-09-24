'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/shared/Logo';
import { addToCart, useCart } from '@/components/shared/cart';
import { type Perfume, tone, descriptor, familyGroup, travelFor, lei } from '@/lib/catalog';
import s from './cromatic.module.css';

const NAV = [
  { href: '/concept/a/collection', label: 'Parfumuri' },
  { href: '/concept/a/home#descopera', label: 'Descoperă' },
  { href: '/concept/a/home#layering', label: 'Layering' },
  { href: '/concept/a/home#cadouri', label: 'Cadouri' },
  { href: '/concept/a/home#casa-morph', label: 'Casa Morph' },
];

export function Header({ current }: { current?: string }) {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <header className={s.header}>
      <div className={`${s.wrap} ${s.headerInner}`}>
        <Link href="/concept/a/home" className={s.logo} aria-label="Morph — acasă"><Logo /></Link>
        <nav className={s.nav} aria-label="Principal">
          {NAV.map(n => <Link key={n.label} href={n.href} aria-current={current === n.label ? 'page' : undefined}>{n.label}</Link>)}
        </nav>
        <div className={s.utils}>
          <span className={s.utilsDesk}><button type="button">Caută</button></span>
          <span className={s.utilsDesk}><button type="button">Cont</button></span>
          <button type="button" className={s.bag}>Coș <span className={s.bagCount}>{count}</span></button>
          <button type="button" className={s.menuBtn} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Închide' : 'Meniu'}</button>
        </div>
      </div>
      <nav className={s.mobileNav} data-open={open} aria-label="Principal mobil">
        {NAV.map(n => <Link key={n.label} href={n.href} onClick={() => setOpen(false)}>{n.label}</Link>)}
      </nav>
      <Toast />
    </header>
  );
}

function Toast() {
  const { last, total } = useCart();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!last) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), 2600);
    return () => clearTimeout(t);
  }, [last]);
  return (
    <div className={s.toast} data-show={show} role="status" aria-live="polite">
      {last && <>Adăugat: {last.name}, {last.format}. Total coș {lei(total)}.</>}
    </div>
  );
}

export function Card({ p, priority = false }: { p: Perfume; priority?: boolean }) {
  const t = tone(p);
  const travel = travelFor(p);
  const fam = familyGroup(p);
  return (
    <article className={`${s.card} ${p.inStock ? '' : s.soldout}`} style={{ '--sw': t.identity } as React.CSSProperties} data-flip-id={p.slug}>
      <Link href={`/concept/a/product?p=${p.slug}`} className={s.cardField} aria-label={`${p.shortName}, detalii`}>
        <span className={s.cardDot} aria-hidden />
        {!p.inStock && <span className={s.cardFlag}>Stoc epuizat</span>}
        <img className={s.cardImg} src={p.images[0]} alt={p.name} width={768} height={960} loading={priority ? 'eager' : 'lazy'} />
      </Link>
      <div>
        <Link href={`/concept/a/product?p=${p.slug}`} className={s.cardName}>{p.shortName}</Link>
      </div>
      <p className={s.cardDesc}>{descriptor(p)}</p>
      <div className={s.cardMeta}>
        {fam && <span>{fam.name}</span>}
        {p.longevity && <span>{p.longevity.replace('-', '–')}</span>}
        {travel && <span>Travel 2×8 ml · {lei(travel.price)}</span>}
      </div>
      <div className={s.cardFoot}>
        <span className={s.price}>{lei(p.price)} <span className={s.muted} style={{ fontWeight: 400, fontSize: 13 }}>· 100 ml</span></span>
        {p.inStock ? (
          <button type="button" className={s.add} onClick={() => addToCart({ name: p.shortName, price: p.price, format: '100 ml' })}>Adaugă</button>
        ) : (
          <button type="button" className={s.add}>Anunță-mă</button>
        )}
      </div>
    </article>
  );
}

export function Footer() {
  return (
    <footer className={`${s.wrap}`}>
      <div className={s.footer}>
        <span>Morph Parfum România — magazin oficial. Concept de redesign, prototip privat.</span>
        <span>Livrare · Retur · Certilogo · Contact · ANPC</span>
      </div>
    </footer>
  );
}
