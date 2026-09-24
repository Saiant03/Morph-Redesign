import { type Perfume, familyGroup, hours, descriptor, travelFor, lei } from '@/lib/catalog';
import s from './Product.module.css';

/** The scent signal every listing carries: notes, family, longevity; optional trial format. */
export function ProductMeta({ p, travel = false, className = '' }: { p: Perfume; travel?: boolean; className?: string }) {
  const fam = familyGroup(p);
  const t = travel ? travelFor(p) : null;
  return (
    <div className={`${s.meta} ${className}`}>
      <p className={s.desc}>{descriptor(p)}</p>
      <p className={s.tags}>
        {fam && <span>{fam.name}</span>}
        {hours(p) && <span className="num">{hours(p)}</span>}
        {t && <span>Travel 2×8 ml, {lei(t.price)}</span>}
      </p>
    </div>
  );
}
