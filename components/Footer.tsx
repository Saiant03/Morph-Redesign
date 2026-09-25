import Link from 'next/link';
import { Logo } from './Logo';
import { BOUTIQUE, snapshotAt } from '@/lib/catalog';
import { JOURNAL } from '@/lib/nav';
import s from './Footer.module.css';

// Footer structure from docs/research/06. Items without a concept route are listed, not linked.
const COLS: { title: string; items: (string | [string, string])[] }[] = [
  { title: 'Magazin', items: ['Livrare și plată', 'Retur', 'Urmărește comanda', ['Cadouri și gift card', '/cadouri']] },
  { title: 'Ajutor', items: ['Întrebări frecvente', 'Contact', ['Verificare Certilogo', '/magazin#certilogo'], 'ANPC · SOL'] },
  { title: 'Despre Morph', items: [['Povestea', '/magazin#povestea'], ['Magazinul din București', '/magazin'], 'Morph Points', ['Jurnal', JOURNAL]] },
];

export function Footer() {
  return (
    <footer className={s.footer} data-tone="dark">
      <div className={`wrap ${s.grid}`}>
        <div className={s.brand}>
          <Logo className={s.logo} />
          <p className="t-small muted">Magazinul oficial Morph în România.<br />{BOUTIQUE.address}.</p>
        </div>
        {COLS.map(c => (
          <div key={c.title}>
            <h2 className={`${s.h} label muted`}>{c.title}</h2>
            <ul className="t-small">{c.items.map(i => typeof i === 'string' ? <li key={i}>{i}</li> : <li key={i[0]}><Link className="link" href={i[1]}>{i[0]}</Link></li>)}</ul>
          </div>
        ))}
      </div>
      <p className={`wrap t-micro muted ${s.note}`}>
        Concept privat de redesign, nepublicat. Date de produs: Store API public morphparfum.ro, instantaneu din {snapshotAt.slice(0, 10)}. Imaginile și textele aparțin Morph.
      </p>
    </footer>
  );
}
