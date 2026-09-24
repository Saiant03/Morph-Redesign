import { Logo } from './Logo';
import { BOUTIQUE, snapshotAt } from '@/lib/catalog';
import s from './Footer.module.css';

// Footer structure from docs/research/06. Items without a concept route are listed, not linked.
const COLS = [
  { title: 'Magazin', items: ['Livrare și plată', 'Retur', 'Urmărește comanda', 'Gift card'] },
  { title: 'Ajutor', items: ['Întrebări frecvente', 'Contact', 'Verificare Certilogo', 'ANPC · SOL'] },
  { title: 'Casa Morph', items: ['Povestea', 'Boutique București', 'Morph Points', 'Jurnal'] },
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
            <ul className="t-small muted">{c.items.map(i => <li key={i}>{i}</li>)}</ul>
          </div>
        ))}
      </div>
      <p className={`wrap t-micro muted ${s.note}`}>
        Concept privat de redesign, nepublicat. Date de produs: Store API public morphparfum.ro, instantaneu din {snapshotAt.slice(0, 10)}. Imaginile și textele aparțin Morph.
      </p>
    </footer>
  );
}
