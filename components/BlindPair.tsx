import s from './BlindPair.module.css';

/**
 * A Your Next Form set in the studio's language: two niches with their light off. In this system a lit niche holds
 * a known fragrance; a blind set's two fragrances stay unknown until the box is opened, so nothing is shown in them.
 */
export function BlindPair({ className = '' }: { className?: string }) {
  return (
    <div className={`${s.pair} ${className}`} aria-hidden>
      <span className={s.niche} /><span className={s.plus}>+</span><span className={s.niche} />
    </div>
  );
}
