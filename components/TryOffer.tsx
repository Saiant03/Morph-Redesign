import { type Perfume, travelFor, samplesFor, lei, travelItem, offerItem, sampleName } from '@/lib/catalog';
import { AddToCart } from './AddToCart';

/**
 * The TRY step for one perfume, from what Morph actually sells: its travel 2×8 ml if it exists,
 * otherwise the sample set of its collection (in stock → add, sold out → said so, with Morph's page).
 */
export function TryOffer({ p, className = 'btn btn-secondary' }: { p: Perfume; className?: string }) {
  const travel = travelFor(p);
  if (travel) {
    return (
      <AddToCart className={className} items={[travelItem(p, travel)]} aria-label={`Adaugă ${p.shortName} travel 2×8 ml în coș, ${lei(travel.price)}`}>
        Încearcă travel 2×8 ml <span className="num">{lei(travel.price)}</span>
      </AddToCart>
    );
  }
  const set = samplesFor(p);
  if (!set) return null;
  return set.inStock ? (
    <AddToCart className={className} items={[offerItem(set, sampleName(set.slug), 'Mostre')]} aria-label={`Adaugă ${sampleName(set.slug)} în coș, ${lei(set.price)}`}>
      Încearcă din setul de mostre <span className="num">{lei(set.price)}</span>
    </AddToCart>
  ) : (
    <p className="t-small muted">Fără travel; <a className="link" href={set.url}>setul de mostre</a> e momentan epuizat.</p>
  );
}

