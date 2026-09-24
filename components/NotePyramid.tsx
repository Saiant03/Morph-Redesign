import { type Perfume } from '@/lib/catalog';
import s from './NotePyramid.module.css';

export const TIERS = [
  { key: 'top', label: 'Deschidere' },
  { key: 'heart', label: 'Inimă' },
  { key: 'base', label: 'Bază' },
] as const;

/**
 * The composition as a formula: three tiers in the order the scent develops, each with Morph's published notes.
 * `mark` highlights notes containing a searched text (the note lens in Descoperă).
 */
export function NotePyramid({ p, className = '', mark }: { p: Perfume; className?: string; mark?: (note: string) => boolean }) {
  return (
    <dl className={`${s.pyramid} ${className}`}>
      {TIERS.map((t, i) => (
        <div key={t.key} className={s.row}>
          <dt className="label muted"><span className="num" aria-hidden>{i + 1}</span> {t.label}</dt>
          <dd>{p.notes[t.key].length ? p.notes[t.key].map((n, k) => <span key={n}>{k ? ', ' : ''}{mark?.(n) ? <mark className={s.mark}>{n}</mark> : n}</span>) : '—'}</dd>
        </div>
      ))}
    </dl>
  );
}
