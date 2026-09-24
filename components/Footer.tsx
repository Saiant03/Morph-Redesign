import Link from 'next/link';
import { Logo } from './Logo';
import { BOUTIQUE, snapshotAt } from '@/lib/catalog';
import s from './Footer.module.css';

// Footer structure from docs/research/06. Items without a concept route are listed, not linked.
const COLS: { title: string; items: (string | [string, string])[] }[] = [
  { title: 'Magazin', items: ['Livrare și plată', 'Retur', 'Urmărește comanda', 'Gift card'] },
  { title: 'Ajutor', items: ['Întrebări frecvente', 'Contact', ['Verificare Certilogo', '/casa-morph#certilogo'], 'ANPC · SOL'] },
  { title: 'Casa Morph', items: [['Povestea', '/casa-morph#povestea'], ['Boutique București', '/casa-morph'], 'Morph Points', 'Jurnal'] },
];

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`wrap ${s.grid}`}>
        <div className={s.brand}>
          <Logo className={s.logo} />
          <p className="t-small muted">Magazinul oficial Morph în România.<br />{BOUTIQUE.name}, {BOUTIQUE.address}.</p>
        </div>
        {COLS.map(c => (
          <div key={c.title}>
            <h2 className={`${s.h} t-small`}>{c.title}</h2>
            <ul className="t-small muted">{c.items.map(i => typeof i === 'string' ? <li key={i}>{i}</li> : <li key={i[0]}><Link className="link" href={i[1]}>{i[0]}</Link></li>)}</ul>
          </div>
        ))}
      </div>
      <p className={`wrap t-micro muted ${s.note}`}>
        Concept privat de redesign, nepublicat. Date de produs: Store API public morphparfum.ro, instantaneu din {snapshotAt.slice(0, 10)}. Imaginile și textele aparțin Morph.
      </p>
    </footer>
  );
}
