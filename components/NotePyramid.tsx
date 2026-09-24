import { type Perfume } from '@/lib/catalog';
import { scentTokens } from '@/lib/scent';
import s from './NotePyramid.module.css';

export const TIERS = [
  { key: 'top', label: 'Deschidere' },
  { key: 'heart', label: 'Inimă' },
  { key: 'base', label: 'Bază' },
] as const;

/** Notes as three strata, lightest (opening) to fullest (base) in the scent's own color. */
/** `mark` highlights notes containing that text (used by the note lens in Descoperă). */
export function NotePyramid({ p, className = '', mark }: { p: Perfume; className?: string; mark?: (note: string) => boolean }) {
  const { tiers } = scentTokens(p);
  return (
    <dl className={`${s.pyramid} ${className}`}>
      {TIERS.map((t, i) => (
        <div key={t.key} className={s.row} style={{ '--tier': tiers[i] } as React.CSSProperties}>
          <dt>{t.label}</dt>
          <dd>{p.notes[t.key].length ? p.notes[t.key].map((n, k) => <span key={n}>{k ? ', ' : ''}{mark?.(n) ? <mark className={s.mark}>{n}</mark> : n}</span>) : '—'}</dd>
        </div>
      ))}
    </dl>
  );
}
