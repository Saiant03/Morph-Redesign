'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ViewTransition, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { COLLECTIONS, ALL_BY_COLLECTION, inCollection, collectionHref, productHref, lei, type CollectionId } from '@/lib/catalog';
import { CAMPAIGN } from '@/lib/campaign';
import { ProductVisual } from './ProductVisual';
import { CampaignPicture } from './RoomImage';
import s from './CollectionWorlds.module.css';

// three objects per collection for the still life on each card (bestsellers first, in stock)
const still = (c: CollectionId) => [...inCollection(c)].sort((a, b) => Number(b.bestseller) - Number(a.bestseller) || Number(b.inStock) - Number(a.inStock)).slice(0, 3);

// the sticky stage needs a landscape screen wide enough for the card to sit beside the subject (CSS: 1200 px)
const WIDE = '(min-width: 1200px)';
const useWide = () => useSyncExternalStore(f => { const m = matchMedia(WIDE); m.addEventListener('change', f); return () => m.removeEventListener('change', f); }, () => matchMedia(WIDE).matches, () => true);
const ROOM_SHARE = { 'enter-room': 'room-enter', default: 'room' };
// React registers a named <ViewTransition> on every commit but releases the name only when it unmounts, so the name
// must never move between mounted instances by a prop change. The owner is keyed by ownership instead: handing
// `room-image` over (hydration, the 1200 px breakpoint, scrolling on phones) unmounts the old owner first.
const owner = (yes: boolean) => (yes ? 'room-image' : undefined);

/**
 * "Trei lumi" (SECTION → ENVIRONMENT): one sticky stage holding Morph's three collection campaigns; three text
 * cards scroll past it on native scroll. When a card reaches the middle of the screen, its campaign replaces the
 * previous one under a passing band of light. Below 1200 px each collection gets its own image (the full landscape
 * frame on tablets, Morph's portrait crop on phones), no sticky layer. The photograph on screen is named
 * `room-image`, so "Intră în …" carries it into the collection room (globals.css, .room-enter).
 */
export function CollectionWorlds() {
  const [on, setOn] = useState<CollectionId>('les-exclusifs');
  const wide = useWide();
  const panels = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setOn((e.target as HTMLElement).dataset.world as CollectionId)), { rootMargin: '-50% 0px -50% 0px' });
    panels.current.forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className={s.worlds} aria-labelledby="lumi-titlu">
      <h2 id="lumi-titlu" className="sr-only">Trei colecții</h2>
      <ViewTransition key={owner(wide) ?? 'plain'} name={owner(wide)} share={ROOM_SHARE} default="none">
        <div className={s.stage} aria-hidden>
          {ALL_BY_COLLECTION.map(c => (
            <Image key={c} src={CAMPAIGN[c].src} alt="" fill sizes="100vw" className={s.env} style={{ objectPosition: CAMPAIGN[c].pos }} data-on={on === c} />
          ))}
          <span key={on} className={s.sweep} />
        </div>
      </ViewTransition>
      {ALL_BY_COLLECTION.map((c, i) => {
        const list = inCollection(c);
        const prices = [...new Set(list.map(p => p.price))];
        return (
          <article key={c} ref={el => { panels.current[i] = el; }} data-world={c} className={s.panel} data-side={CAMPAIGN[c].side} data-align={CAMPAIGN[c].align} aria-labelledby={`lume-${c}`}>
            <ViewTransition key={owner(!wide && on === c) ?? 'plain'} name={owner(!wide && on === c)} share={ROOM_SHARE} default="none">
              <div className={s.mobileImg}><CampaignPicture {...CAMPAIGN[c]} priority={false} /></div>
            </ViewTransition>
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
              <Link href={collectionHref(c)} className="btn btn-secondary" transitionTypes={['enter-room']} onClick={() => setOn(c)}>Intră în {COLLECTIONS[c].name}</Link>
            </div>
          </article>
        );
      })}
      <p className={`${s.credit} t-micro`}>Fotografii din campaniile Morph.</p>
    </section>
  );
}
