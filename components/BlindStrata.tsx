import s from './BlindStrata.module.css';

/**
 * A Your Next Form set drawn with the composer's grammar but without color: the two perfumes are unknown until
 * the box is opened, and in this system color only ever means a known scent.
 */
export function BlindStrata({ className = '' }: { className?: string }) {
  return (
    <div className={`${s.blind} ${className}`} aria-hidden>
      {[0, 1].map(k => <div key={k} className={s.col}>{[0, 1, 2].map(i => <span key={i} />)}</div>)}
    </div>
  );
}
