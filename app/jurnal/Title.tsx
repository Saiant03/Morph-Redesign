import type { JournalEntry } from '@/lib/journal';
import s from './jurnal.module.css';

// Hyphenated words stay on one line ("Layering-ului" never breaks after the hyphen)
const whole = (t: string) => t.split(/(\S+-\S+)/).map((w, i) => i % 2 ? <span key={i} className={s.nobreak}>{w}</span> : w);

/** The entry's full official title. With `titleBreak`, the part after the colon becomes a smaller second line;
 *  the text itself is unchanged. */
export function EntryTitle({ e }: { e: JournalEntry }) {
  const i = e.title.indexOf(': ');
  if (!e.titleBreak || i < 0) return e.title;
  return <>{whole(e.title.slice(0, i + 1))} <span className={s.titleSub}>{whole(e.title.slice(i + 2))}</span></>;
}
