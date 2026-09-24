import { type Perfume, travelFor, samplesFor, lei } from '@/lib/catalog';
import { scentTokens } from '@/lib/scent';
import { AddToCart } from './AddToCart';

const sampleName = (slug: string) => `Setul de mostre ${/luxury/.test(slug) ? 'Luxury' : 'Les Exclusifs & Ice'}`;

/**
 * The TRY step for one perfume, from what Morph actually sells: its travel 2×8 ml if it exists,
 * otherwise the sample set of its collection (in stock → add, sold out → said so, with Morph's page).
 */
export function TryOffer({ p, className = 'btn btn-secondary' }: { p: Perfume; className?: string }) {
  const travel = travelFor(p);
  if (travel) {
    return (
      <AddToCart className={className} items={[{ key: travel.slug, name: p.shortName, format: 'Travel 2×8 ml', price: travel.price, color: scentTokens(p).scent }]}
        aria-label={`Adaugă ${p.shortName} travel 2×8 ml în coș, ${lei(travel.price)}`}>
        Încearcă travel 2×8 ml <span className="num">{lei(travel.price)}</span>
      </AddToCart>
    );
  }
  const set = samplesFor(p);
  if (!set) return null;
  return set.inStock ? (
    <AddToCart className={className} items={[{ key: set.slug, name: sampleName(set.slug), format: 'Mostre', price: set.price }]}
      aria-label={`Adaugă ${sampleName(set.slug)} în coș, ${lei(set.price)}`}>
      Încearcă din setul de mostre <span className="num">{lei(set.price)}</span>
    </AddToCart>
  ) : (
    <p className="t-small muted">Fără travel; <a className="link" href={set.url}>setul de mostre</a> e momentan epuizat.</p>
  );
}

/** One line saying what the trial option is, for places that only describe it. */
export function tryLine(p: Perfume) {
  const travel = travelFor(p);
  if (travel) return `Travel 2×8 ml, ${lei(travel.price)}`;
  const set = samplesFor(p);
  return set ? `Fără travel. ${sampleName(set.slug)}, ${lei(set.price)}${set.inStock ? '' : ', epuizat'}` : 'Fără format de încercare';
}
