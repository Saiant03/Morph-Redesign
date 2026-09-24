'use client';
import Link from 'next/link';
import { perfumes, lei, productHref, type Perfume } from '@/lib/catalog';
import { scentTokens } from '@/lib/scent';
import { tryList, useTryList } from '@/lib/tryList';
import s from './TryListPanel.module.css';

const find = (slug: string) => perfumes.find(p => p.slug === slug);
const dot = (p: Perfume) => <span className="swatch" style={{ '--scent': scentTokens(p).scent } as React.CSSProperties} />;

/** The visitor's "De încercat în Casa Morph" list, read from this browser only. */
export function TryListPanel() {
  const list = useTryList();
  const rows = list.map(k => ({ k, ps: k.split('+').map(find).filter(Boolean) as Perfume[] })).filter(r => r.ps.length);
  if (!rows.length) {
    return (
      <div className={s.empty}>
        <p>Lista e goală. Pornește de la <Link className="link" href="/descopera/finder">Fragrance Finder</Link>, <Link className="link" href="/descopera">Descoperă</Link> sau <Link className="link" href="/layering">Layering</Link> și marchează ce vrei să încerci.</p>
      </div>
    );
  }
  return (
    <ul className={s.list}>
      {rows.map(({ k, ps }) => (
        <li key={k} className={s.row}>
          <span className={s.dots}>{ps.map(p => <span key={p.slug}>{dot(p)}</span>)}</span>
          <span className={s.name}>
            {ps.map((p, i) => <span key={p.slug}>{i ? ' + ' : ''}<Link className="link" href={productHref(p)}>{p.shortName}</Link></span>)}
          </span>
          <span className="t-small muted">{ps.length > 1 ? <Link className="link" href={`/layering?a=${ps[0].slug}&b=${ps[1].slug}`}>Combinație</Link> : <span className="num">{lei(ps[0].price)}, 100 ml</span>}</span>
          <button type="button" className="text-btn link t-small muted" onClick={() => tryList.remove(k)} aria-label={`Scoate ${ps.map(p => p.shortName).join(' + ')} de pe listă`}>Scoate</button>
        </li>
      ))}
    </ul>
  );
}
