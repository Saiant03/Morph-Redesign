'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { COLLECTIONS, ALL_BY_COLLECTION, inCollection, collectionHref, productHref, lei, type CollectionId } from '@/lib/catalog';
import { CAMPAIGN } from '@/lib/campaign';
import { ProductVisual } from './ProductVisual';
import s from './CollectionWorlds.module.css';

// three objects per collection for the still life on each card (bestsellers first, in stock)
const still = (c: CollectionId) => [...inCollection(c)].sort((a, b) => Number(b.bestseller) - Number(a.bestseller) || Number(b.inStock) - Number(a.inStock)).slice(0, 3);

/**
 * "Trei lumi" (SECTION → ENVIRONMENT): one sticky stage holding Morph's three collection campaigns; three text
 * cards scroll past it on native scroll. When a card reaches the middle of the screen, its campaign replaces the
 * previous one under a passing band of light. Phones get one image per collection, no sticky layer.
 */
export function CollectionWorlds() {
  const [on, setOn] = useState<CollectionId>('les-exclusifs');
  const panels = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setOn((e.target as HTMLElement).dataset.world as CollectionId)), { rootMargin: '-50% 0px -50% 0px' });
    panels.current.forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className={s.worlds} aria-labelledby="lumi-titlu">
      <h2 id="lumi-titlu" className="sr-only">Trei colecții</h2>
      <div className={s.stage} aria-hidden>
        {ALL_BY_COLLECTION.map(c => (
          <Image key={c} src={CAMPAIGN[c].src} alt="" fill sizes="100vw" className={s.env} style={{ objectPosition: CAMPAIGN[c].pos }} data-on={on === c} />
        ))}
        <span key={on} className={s.sweep} />
      </div>
      {ALL_BY_COLLECTION.map((c, i) => {
        const list = inCollection(c);
        const prices = [...new Set(list.map(p => p.price))];
        return (
          <article key={c} ref={el => { panels.current[i] = el; }} data-world={c} className={s.panel} data-side={CAMPAIGN[c].side} aria-labelledby={`lume-${c}`}>
            <div className={s.mobileImg}><Image src={CAMPAIGN[c].mobile} alt={CAMPAIGN[c].alt} fill sizes="100vw" /></div>
            <div className={s.card}>
              <p className="label muted">{COLLECTIONS[c].type}</p>
              <h3 id={`lume-${c}`} className={s.name}>{COLLECTIONS[c].name}</h3>
              <p>{COLLECTIONS[c].line}</p>
              <p className="label muted num">{list.length} parfumuri · 100 ml · {prices.map(lei).join(' / ')}</p>
              <ul className={s.still} aria-label={`Câteva parfumuri ${COLLECTIONS[c].name}`}>
                {still(c).map(p => (
                  <li key={p.slug}><Link href={productHref(p)} aria-label={p.shortName}><ProductVisual p={p} sizes="96px" alt="" className={s.obj} /><span className="t-micro">{p.shortName}</span></Link></li>
                ))}
              </ul>
              <Link href={collectionHref(c)} className="btn btn-secondary">Intră în {COLLECTIONS[c].name}</Link>
            </div>
          </article>
        );
      })}
      <p className={`${s.credit} t-micro`}>Fotografii din campaniile Morph.</p>
    </section>
  );
}
