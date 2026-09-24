import Link from 'next/link';
import { type Perfume, lei, productHref } from '@/lib/catalog';
import { scentTokens } from '@/lib/scent';
import { ProductVisual } from './ProductVisual';
import { ProductMeta } from './ProductMeta';
import { AddToCart } from './AddToCart';
import s from './Product.module.css';

export function ProductCard({ p, sizes = '(max-width: 899px) 72vw, 25vw' }: { p: Perfume; sizes?: string }) {
  return (
    <article className={`${s.card} ${p.inStock ? '' : s.soldout}`}>
      <Link href={productHref(p)} className={s.cardLink}>
        <ProductVisual p={p} sizes={sizes} alt="" className={s.cardVisual} />
        {!p.inStock && <span className={s.flag}>Stoc epuizat</span>}
        <h3 className={s.cardName}>{p.shortName}</h3>
      </Link>
      <ProductMeta p={p} travel />
      <div className={s.cardFoot}>
        <span className="num"><b className={s.price}>{lei(p.price)}</b> <span className="muted t-small">100 ml</span></span>
        {p.inStock
          ? <AddToCart className="btn btn-sm btn-secondary" items={[{ key: p.slug, name: p.shortName, format: '100 ml', price: p.price, color: scentTokens(p).scent }]} aria-label={`Adaugă ${p.shortName} 100 ml în coș`}>Adaugă</AddToCart>
          : <Link href={productHref(p)} className="t-small link">Anunță-mă</Link>}
      </div>
    </article>
  );
}
