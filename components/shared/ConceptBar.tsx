'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './ConceptBar.module.css';

const DIRS = [
  { id: 'a', name: 'A · Cromatic' },
  { id: 'b', name: 'B · Forma' },
  { id: 'c', name: 'C · Strata' },
];
const SCREENS = [
  { id: 'home', name: 'Home' },
  { id: 'collection', name: 'Colecție' },
  { id: 'product', name: 'Produs' },
];

/** Internal prototype switcher. Not part of any design direction. */
export function ConceptBar() {
  const path = usePathname() || '';
  const [, , dir = 'a', screen = 'home'] = path.split('/');
  return (
    <nav className={styles.bar} aria-label="Navigare prototip">
      <Link href="/" className={styles.index}>Index</Link>
      <span className={styles.group}>
        {DIRS.map(d => (
          <Link key={d.id} href={`/concept/${d.id}/${screen}`} aria-current={d.id === dir ? 'page' : undefined}>{d.name}</Link>
        ))}
      </span>
      <span className={styles.group}>
        {SCREENS.map(s => (
          <Link key={s.id} href={`/concept/${dir}/${s.id}`} aria-current={s.id === screen ? 'page' : undefined}>{s.name}</Link>
        ))}
      </span>
    </nav>
  );
}
