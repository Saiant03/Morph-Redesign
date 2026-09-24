import { type Perfume } from '@/lib/catalog';
import { scentTokens } from '@/lib/scent';
import s from './NotePyramid.module.css';

export const TIERS = [
  { key: 'top', label: 'Deschidere' },
  { key: 'heart', label: 'Inimă' },
  { key: 'base', label: 'Bază' },
] as const;

/** Notes as three strata, lightest (opening) to fullest (base) in the scent's own color. */
export function NotePyramid({ p, className = '' }: { p: Perfume; className?: string }) {
  const { tiers } = scentTokens(p);
  return (
    <dl className={`${s.pyramid} ${className}`}>
      {TIERS.map((t, i) => (
        <div key={t.key} className={s.row} style={{ '--tier': tiers[i] } as React.CSSProperties}>
          <dt>{t.label}</dt>
          <dd>{p.notes[t.key].join(', ') || '—'}</dd>
        </div>
      ))}
    </dl>
  );
}
