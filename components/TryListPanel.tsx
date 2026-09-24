'use client';
import Image from 'next/image';
import Link from 'next/link';
import { perfumes, lei, productHref, travelFor, COLLECTIONS, type Perfume } from '@/lib/catalog';
import { tryList, useTryList } from '@/lib/tryList';
import s from './TryListPanel.module.css';

const find = (slug: string) => perfumes.find(p => p.slug === slug);

/** The visitor's "De încercat în magazin" selection, read from this browser only. Laid out as a card to show in store. */
export function TryListPanel() {
  const list = useTryList();
  const rows = list.map(k => ({ k, ps: k.split('+').map(find).filter(Boolean) as Perfume[] })).filter(r => r.ps.length);
  if (!rows.length) {
    return (
      <div className={s.card}>
        <p className={s.cardHead}><span className="label muted">De încercat în magazin</span></p>
        <p className="t-lede">Selecția e goală.</p>
        <p className="muted">Pornește de la <Link className="link" href="/descopera/finder">Fragrance Finder</Link>, <Link className="link" href="/descopera">Descoperă</Link> sau <Link className="link" href="/layering">Layering</Link> și marchează ce vrei să încerci. Aici apare lista, de arătat în magazin.</p>
      </div>
    );
  }
  return (
    <div className={s.card}>
      <p className={s.cardHead}><span className="label muted">De încercat în magazin</span><span className="label muted num">{rows.length}</span></p>
      <ol className={s.list}>
        {rows.map(({ k, ps }, i) => (
          <li key={k} className={s.row}>
            <span className="label muted num">{String(i + 1).padStart(2, '0')}</span>
            <span className={s.objects} aria-hidden>
              {ps.map(p => <span key={p.slug} className={`niche-sm ${s.thumb}`}><Image src={p.images[0]} alt="" fill sizes="48px" /></span>)}
            </span>
            <span className={s.text}>
              <span className={s.name}>{ps.map((p, j) => <span key={p.slug}>{j ? ' + ' : ''}<Link href={productHref(p)}>{p.shortName}</Link></span>)}</span>
              <span className="t-small muted">
                {ps.length > 1
                  ? <Link className="link" href={`/layering?a=${ps[0].slug}&b=${ps[1].slug}`}>Pereche de layering</Link>
                  : <>{COLLECTIONS[ps[0].collection].name}, <span className="num">{lei(ps[0].price)}</span>{travelFor(ps[0]) ? ', are travel' : ''}</>}
              </span>
            </span>
            <button type="button" className="text-btn link t-small muted" onClick={() => tryList.remove(k)} aria-label={`Scoate ${ps.map(p => p.shortName).join(' + ')} de pe listă`}>Scoate</button>
          </li>
        ))}
      </ol>
      <p className="t-micro muted">Nu e o rezervare. E lista ta, de arătat echipei în magazin.</p>
    </div>
  );
}
