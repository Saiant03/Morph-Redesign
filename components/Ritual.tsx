import Link from 'next/link';
import Image from 'next/image';
import { ProductVisual } from './ProductVisual';
import { AddToCart } from './AddToCart';
import { type Perfume, bodyFor, bodyItems, BODY_KIND, lei, productHref, fullItem, bodyItem } from '@/lib/catalog';
import s from './Ritual.module.css';

/**
 * One scent in its textures: shower gel, body cream and the 100 ml perfume standing side by side, then the sets
 * Morph sells that combine them (with the separate price only when the set costs less). Shared by the product
 * page ("Ritualul") and /parfumuri/corp.
 */
export function Ritual({ p }: { p: Perfume }) {
  const body = bodyFor(p);
  const single = body.filter(b => b.kind === 'gel' || b.kind === 'cream');
  const sets = body.filter(b => b.kind === 'set-gel' || b.kind === 'set-cream');
  return (
    <div className={s.ritual}>
      <ul className={s.textures}>
        {single.map(b => (
          <li key={b.slug} className={b.inStock ? '' : s.out}>
            <span className={`niche-sm ${s.obj}`}>{b.image && <Image src={b.image} alt={`${BODY_KIND[b.kind].name} ${p.shortName}`} fill sizes="160px" />}</span>
            <span className={s.kind}>{BODY_KIND[b.kind].name}</span>
            <span className="t-small num">200 ml · {lei(b.price)}</span>
            {b.inStock
              ? <AddToCart className="btn btn-sm btn-secondary" items={[bodyItem(b, p)]} aria-label={`Adaugă ${BODY_KIND[b.kind].name.toLowerCase()} ${p.shortName} în coș`}>Adaugă</AddToCart>
              : <span className="t-small muted">Stoc epuizat</span>}
          </li>
        ))}
        <li>
          <Link href={productHref(p)} aria-label={`${p.shortName}, parfum 100 ml`}><ProductVisual p={p} sizes="160px" alt="" className={s.obj} /></Link>
          <span className={s.kind}>Parfum</span>
          <span className="t-small num">100 ml · {lei(p.price)}</span>
          {p.inStock
            ? <AddToCart className="btn btn-sm btn-secondary" items={[fullItem(p)]} aria-label={`Adaugă ${p.shortName} 100 ml în coș`}>Adaugă</AddToCart>
            : <span className="t-small muted">Stoc epuizat</span>}
        </li>
      </ul>
      {sets.length > 0 && (
        <ul className={`${s.sets} t-small`}>
          {sets.map(b => {
            const part = bodyItems.find(x => x.scent === p.slug && x.kind === (b.kind === 'set-gel' ? 'gel' : 'cream'));
            const sum = part ? p.price + part.price : null;
            return (
              <li key={b.slug}>
                <span>{BODY_KIND[b.kind].name}</span>
                <span className="num">{lei(b.price)}{sum && sum > b.price ? <span className="muted"> · separat {lei(sum)}</span> : null}</span>
                {b.inStock
                  ? <AddToCart className="text-btn link" items={[bodyItem(b, p)]} aria-label={`Adaugă ${BODY_KIND[b.kind].name.toLowerCase()} ${p.shortName} în coș`}>Adaugă setul</AddToCart>
                  : <span className="muted">Stoc epuizat</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
