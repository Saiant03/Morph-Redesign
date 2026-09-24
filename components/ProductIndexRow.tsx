'use client';
import Link from 'next/link';
import { useId, useState } from 'react';
import { type Perfume, COLLECTIONS, familyGroup, hours, descriptor, lei, productHref, travelFor, fullItem } from '@/lib/catalog';
import { ProductVisual } from './ProductVisual';
import { NotePyramid } from './NotePyramid';
import { AddToCart } from './AddToCart';
import s from './ProductIndex.module.css';

/** One fragrance as an index line: the object, its name, notes, family, time on skin, price. Hover/focus drives the preview. */
export function ProductIndexRow({ p, active, onActivate, eager, showCollection }: { p: Perfume; active: boolean; onActivate: () => void; eager?: boolean; showCollection: boolean }) {
  const [open, setOpen] = useState(false);
  const detail = useId();
  const travel = travelFor(p);
  return (
    <li className={`${s.row} ${p.inStock ? '' : s.soldout}`} data-flip-id={p.slug} data-active={active} onMouseEnter={onActivate} onFocus={onActivate}>
      <Link href={productHref(p)} className={s.thumb} tabIndex={-1} aria-hidden>
        <ProductVisual p={p} sizes="72px" alt="" priority={eager} className={s.thumbVisual} />
      </Link>
      <div className={s.nameCell}>
        <h2 className={s.name}><Link href={productHref(p)}>{p.shortName}</Link></h2>
        {showCollection && <span className="label muted">{COLLECTIONS[p.collection].name}</span>}
      </div>
      <p className={s.notes}>{descriptor(p)}{travel && <span className="t-micro muted"><br />Și travel 2×8 ml, {lei(travel.price)}</span>}</p>
      <p className={`${s.fam} t-small`}>{familyGroup(p)?.name ?? '—'}<br /><span className="muted num">{hours(p) ?? '—'}</span></p>
      <p className={`${s.priceCell} t-small`}>
        <b className="num">{lei(p.price)}</b><br />
        <span className={p.inStock ? 'muted' : s.out}>{p.inStock ? 'În stoc' : 'Stoc epuizat'}</span>
      </p>
      <div className={s.act}>
        {p.inStock
          ? <AddToCart className="btn btn-sm btn-secondary" items={[fullItem(p)]} aria-label={`Adaugă ${p.shortName} 100 ml în coș`}>Adaugă</AddToCart>
          : <Link href={productHref(p)} className="t-small link">Anunță-mă</Link>}
      </div>
      <button type="button" className={s.more} aria-expanded={open} aria-controls={detail} onClick={() => setOpen(!open)}>
        <span className="sr-only">Detalii {p.shortName}</span><span aria-hidden>{open ? '−' : '+'}</span>
      </button>
      <div id={detail} className={s.detail} hidden={!open}>
        <NotePyramid p={p} />
        <p className="t-small muted">Intensitate {p.intensity?.toLowerCase() ?? 'nespecificată'}{travel ? `. Travel 2×8 ml, ${lei(travel.price)}` : ''}.</p>
        <Link href={productHref(p)} className="link t-small">Vezi parfumul</Link>
      </div>
    </li>
  );
}
