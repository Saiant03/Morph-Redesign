import Link from 'next/link';
import { ObjectShelf, type ShelfObject } from './ObjectShelf';
import { type Perfume, type BodyItem, bodyFor, bodyItems, BODY_KIND, lei, productHref, bodyHref, isSet } from '@/lib/catalog';
import s from './Ritual.module.css';

/** The scent's objects in ritual order, as Morph sells them: the 100 ml perfume, then shower gel, then body cream. */
export function ritualObjects(p: Perfume, vt = true): ShelfObject[] {
  const body = bodyFor(p).filter(b => !isSet(b));
  return [
    { key: p.slug, src: p.images[0], kind: 'Parfum', line: `100 ml · ${lei(p.price)}`, of: p.shortName, href: productHref(p), vt: vt ? p.slug : undefined, soldOut: !p.inStock },
    ...body.map(b => ({ key: b.slug, src: b.image!, kind: BODY_KIND[b.kind].name, line: `200 ml · ${lei(b.price)}`, of: p.shortName, href: bodyHref(b), vt: vt ? b.slug : undefined, soldOut: !b.inStock })),
  ];
}

/** Morph's perfume + body sets (Coffret) for a scent, with the separate price only when the set costs less. */
export function CoffretLines({ p, current, className = '' }: { p: Perfume; current?: string; className?: string }) {
  const sets = bodyFor(p).filter(isSet);
  if (!sets.length) return null;
  return (
    <ul className={`${s.sets} t-small ${className}`}>
      {sets.map(b => {
        const sum = separate(p, b);
        return (
          <li key={b.slug}>
            {b.slug === current
              ? <span aria-current="page">{BODY_KIND[b.kind].name}</span>
              : <Link className="link" href={bodyHref(b)}>{BODY_KIND[b.kind].name}</Link>}
            <span className="num">{lei(b.price)}{sum && sum > b.price ? <span className="muted"> · separat {lei(sum)}</span> : null}{b.inStock ? null : <span className="muted"> · stoc epuizat</span>}</span>
          </li>
        );
      })}
    </ul>
  );
}

/** What the set's two products cost bought one by one (perfume 100 ml + the gel or cream of the same scent). */
export function separate(p: Perfume, set: BodyItem) {
  const part = bodyItems.find(x => x.scent === p.slug && x.kind === (set.kind === 'set-gel' ? 'gel' : 'cream'));
  return part ? p.price + part.price : null;
}

/**
 * One scent in its textures, standing together on one glass shelf: perfume, shower gel, body cream; then the
 * Coffret sets that combine them. Shared by the product page, the body product page and /parfumuri/corp.
 * Buying happens on each object's own page, so the shelf carries no row of identical buttons.
 */
export function Ritual({ p, current, size = 'chapter', vt = true }: { p: Perfume; current?: string; size?: 'monument' | 'room' | 'chapter'; vt?: boolean }) {
  const sizes = size === 'monument' ? '(max-width: 599px) 62vw, 36vw' : size === 'room' ? '(max-width: 599px) 58vw, 22vw' : '(max-width: 599px) 58vw, 26vw';
  return (
    <div className={s.ritual}>
      <ObjectShelf p={p} items={ritualObjects(p, vt)} size={size} sizes={sizes} label={`Ritualul ${p.shortName}`} current={current} />
      {size === 'chapter' && <CoffretLines p={p} current={current} />}
    </div>
  );
}
