import Link from 'next/link';
import { type Perfume, productHref } from '@/lib/catalog';
import { scentTokens } from '@/lib/scent';
import s from './CollectionPreview.module.css';

/**
 * A group of fragrances (a collection or a family) read as a color chord: one hard-edged segment per scent,
 * each a link to its product page. Used for collections and families alike.
 */
export function CollectionPreview({ title, href, count, children, items }: { title: string; href: string; count: number; children: React.ReactNode; items: Perfume[] }) {
  return (
    <div className={s.row}>
      <h3 className={`t-3 ${s.title}`}><Link href={href}>{title}</Link> <span className="num muted t-small">{count}</span></h3>
      <div className={`${s.body} t-small muted`}>{children}</div>
      <ul className={s.chord} aria-label={`Parfumuri ${title}`}>
        {items.map(p => (
          <li key={p.slug} style={{ '--scent': scentTokens(p).scent } as React.CSSProperties}>
            <Link href={productHref(p)} aria-label={p.shortName} data-name={p.shortName} />
          </li>
        ))}
      </ul>
    </div>
  );
}
