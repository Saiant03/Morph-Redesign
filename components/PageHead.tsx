import Link from 'next/link';
import s from './PageHead.module.css';

type Crumb = { href?: string; label: string };

/**
 * Section page opening, same grid as the collection head: breadcrumb and title on the left (7 cols),
 * lede and facts on the right (cols 8–12), second-level navigation below.
 */
export function PageHead({ crumbs, title, id, lede, meta, children }: {
  crumbs: Crumb[]; title: string; id: string; lede: React.ReactNode; meta?: React.ReactNode; children?: React.ReactNode;
}) {
  return (
    <>
      <section className={s.head} aria-labelledby={id}>
        <div>
          <nav className={`${s.crumb} t-small muted`} aria-label="Breadcrumb">
            {crumbs.map((c, i) => (
              <span key={c.label} className={s.crumbItem}>
                {i > 0 && <span aria-hidden>/</span>}
                {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
              </span>
            ))}
          </nav>
          <h1 id={id} className="t-display">{title}</h1>
        </div>
        <div className={s.intro}>
          <p className="t-lede">{lede}</p>
          {meta && <p className="t-small muted">{meta}</p>}
        </div>
      </section>
      {children}
    </>
  );
}
