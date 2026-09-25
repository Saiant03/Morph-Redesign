import Link from 'next/link';
import { Logo } from './Logo';
import { Ext, MorphQuote } from './Ext';
import { BOUTIQUE, snapshotAt } from '@/lib/catalog';
import { JOURNAL } from '@/lib/nav';
import s from './Footer.module.css';

// Footer structure from docs/research/06. Items without a concept route are listed, not linked.
// The newsletter is Morph's: its page, its form, its consent. The concept only links there and collects nothing
// (docs/design/phase-c4-3-gifting-newsletter-plan.md §6). Promise and unsubscribe line are Morph's, verified 2026-09-25.
const NEWSLETTER = 'https://morphparfum.ro/abonare-newsletter';
const PRIVACY = 'https://morphparfum.ro/politica-de-confidentialitate';
const PROMISE = 'Află înaintea tuturor ultimele noutăți, campaniile în derulare, dar și beneficiile exclusive special create pentru membrii comunității Morph.';

const COLS: { title: string; items: (string | [string, string])[] }[] = [
  { title: 'Magazin', items: ['Livrare și plată', 'Retur', 'Urmărește comanda', ['Cadouri și gift card', '/cadouri']] },
  { title: 'Ajutor', items: ['Întrebări frecvente', 'Contact', ['Verificare Certilogo', '/magazin#certilogo'], 'ANPC · SOL'] },
  { title: 'Despre Morph', items: [['Povestea', '/despre-noi'], ['Magazinul din București', '/magazin'], 'Morph Points', ['Jurnal', JOURNAL]] },
];

export function Footer() {
  return (
    <footer className={s.footer} data-tone="dark">
      <section className={`wrap ${s.news}`} aria-labelledby="newsletter-titlu">
        <h2 id="newsletter-titlu" className="t-2">Newsletter Morph</h2>
        <MorphQuote className={s.promise} text={PROMISE} cite="Pagina de abonare, morphparfum.ro" href={NEWSLETTER} />
        <div className={s.newsAct}>
          <Ext className="btn btn-secondary" href={NEWSLETTER}>Abonează-te pe morphparfum.ro</Ext>
          <p className="t-micro muted">Abonarea se face în formularul Morph. „Vă puteți dezabona oricând doriți.” Detalii în <Ext href={PRIVACY}>politica de confidențialitate Morph</Ext>.</p>
        </div>
      </section>
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
