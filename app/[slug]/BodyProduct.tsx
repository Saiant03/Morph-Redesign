import Link from 'next/link';
import { Stage } from '@/components/Stage';
import { Ritual, separate } from '@/components/Ritual';
import { AddToCart } from '@/components/AddToCart';
import { type BodyItem, bySlug, BODY_KIND, lei, descriptor, bodyItem, isSet, FREE_SHIPPING, MORPH_SAYS } from '@/lib/catalog';
import s from './product.module.css';

/**
 * A shower gel, body cream or Coffret on its own page, at Morph's own URL. The object stands on its scent's stage
 * (the same light as the perfume), with Morph's own description; below, the scent's ritual, where it stands with
 * the perfume and the other texture (docs/design/phase-c2-bath-body-ritual.md).
 */
export function BodyProduct({ b }: { b: BodyItem }) {
  const p = bySlug(b.scent!);
  const kind = BODY_KIND[b.kind];
  const set = isSet(b);
  const sum = set ? separate(p, b) : null;
  const text = b.summary.split('\n').map(x => x.trim()).filter(Boolean);
  return (
    <>
      <div className={`wrap ${s.top}`}>
        <div className={s.media}>
          <Stage p={p} src={b.image!} id={b.slug} vt priority sizes="(max-width: 899px) 100vw, 56vw" className={s.bodyStage} alt={`${kind.name} ${p.shortName}`} />
        </div>
        <div className={s.info}>
          <div className={s.titleBlock}>
            <nav className={`${s.crumb} t-small muted`} aria-label="Breadcrumb">
              <Link href="/parfumuri">Parfumuri</Link><span aria-hidden>/</span><Link href={set ? '/parfumuri/corp#coffret' : '/parfumuri/corp'}>{set ? 'Coffret' : 'Baie & Corp'}</Link>
            </nav>
            <h1 className={`t-1 ${s.title}`}>{p.shortName}</h1>
            <p className={`${s.sub} label muted`}>{kind.name} · {set ? `parfum 100 ml + ${b.kind === 'set-gel' ? 'gel' : 'cremă'} 200 ml` : '200 ml'}</p>
          </div>
          <p className={s.notesLine}><span className={`${s.notesOf} t-small muted`}>Notele parfumului {p.shortName}</span>{descriptor(p)}</p>

          <div className={s.bodyBuy}>
            <p className="num"><span className={s.bodyPrice}>{lei(b.price)}</span>{sum && sum > b.price ? <span className="t-small muted"> · separat {lei(sum)}</span> : null}</p>
            {b.inStock
              ? <AddToCart className="btn" items={[bodyItem(b, p)]} aria-label={`Adaugă ${kind.name.toLowerCase()} ${p.shortName} în coș, ${lei(b.price)}`}>Adaugă în coș</AddToCart>
              : <p className="t-small">Stoc epuizat. <a className="link" href={b.url}>Pagina produsului pe morphparfum.ro</a></p>}
            <p className="t-small muted">Livrare gratuită de la {lei(FREE_SHIPPING)}.</p>
          </div>

          {text.length > 0 && (
            <div className={s.bodyText}>
              {text.map((t, i) => <p key={i} className={s.summary}>{t}</p>)}
              <p className="t-micro muted">Din descrierea Morph a produsului</p>
            </div>
          )}
          {b.kind === 'set-cream' && <p className="t-small muted">„{MORPH_SAYS.creamSets}” (Morph, Despre noi)</p>}
        </div>
      </div>

      <section className={`wrap ${s.ritual}`} aria-labelledby="ritual-titlu">
        <div className={s.ritualHead}>
          <h2 id="ritual-titlu" className="t-1">Ritualul {p.shortName}</h2>
          <p className="muted">Parfumul și texturile lui de corp, așa cum le vinde Morph.</p>
          <Link className="link t-small" href={`/parfumuri/corp#ritual-${p.slug}`}>Toate ritualurile Baie & Corp</Link>
        </div>
        <Ritual p={p} current={b.slug} />
      </section>
    </>
  );
}
