import Link from 'next/link';
import { ViewTransition } from 'react';
import { ProductIndex } from '@/components/ProductIndex';
import { SectionNav } from '@/components/SectionNav';
import { RoomImage } from '@/components/RoomImage';
import { CAMPAIGN, ALL_ROOM } from '@/lib/campaign';
import { perfumes, inCollection, COLLECTIONS, ALL_BY_COLLECTION, sampleSets, collectionHref, lei, type CollectionId } from '@/lib/catalog';
import s from './collection.module.css';

export const ROOM_TABS = [{ href: '/parfumuri', label: 'Toate' }, ...ALL_BY_COLLECTION.map(c => ({ href: collectionHref(c), label: COLLECTIONS[c].name })), { href: '/parfumuri/corp', label: 'Baie & Corp' }];

/**
 * Shared by /parfumuri (all) and /parfumuri/[colectie]: one room in four states. Morph's campaign is the window,
 * the name sits on a plate crossing its edge, every bottle of the collection stands in the walnut cabinet below
 * (components/Vitrine).
 * Changing collection is a change of state (docs/design/phase-b-core-commerce.md): the photograph changes under
 * light, the title drops and the next one rises, shared bottles move along the shelf.
 */
export function CollectionPage({ id }: { id: CollectionId | null }) {
  const items = id ? inCollection(id) : perfumes;
  const prices = [...new Set(items.map(p => p.price))].sort((a, b) => a - b);
  const trial = sampleSets.filter(x => x.inStock && (!id || (id === 'luxury' ? /luxury/.test(x.slug) : /exclusifs|ice/.test(x.slug))));
  const env = id ? CAMPAIGN[id] : ALL_ROOM;
  return (
    <>
      <section className={s.room} aria-labelledby="colectie-titlu">
        <div className={s.window}>
          <RoomImage src={env.src} mobile={id ? CAMPAIGN[id].mobile : undefined} alt={env.alt} pos={env.pos} posM={id ? CAMPAIGN[id].posM : undefined} className={s.env} />
        </div>
        <div className={`wrap ${s.plateRow}`}>
          <div className={s.plate}>
            <nav className={`${s.crumb} t-small muted`} aria-label="Breadcrumb">
              <Link href="/">Morph</Link><span aria-hidden>/</span>{id ? <><Link href="/parfumuri">Parfumuri</Link><span aria-hidden>/</span><span aria-current="page">{COLLECTIONS[id].name}</span></> : <span aria-current="page">Parfumuri</span>}
            </nav>
            <ViewTransition name="room-title" share="room-title" default="none">
              <h1 id="colectie-titlu" className={`t-display ${s.title}`}>{id ? COLLECTIONS[id].name : 'Parfumuri'}</h1>
            </ViewTransition>
            <p className="t-lede">{id ? COLLECTIONS[id].line : 'Toate parfumurile Morph, unisex, în trei colecții: Les Exclusifs, Luxury și Ice.'}</p>
            <p className="label muted num">{id ? `${COLLECTIONS[id].type} · ` : ''}{items.length} parfumuri · 100 ml · {prices.map(lei).join(' / ')}</p>
          </div>
          <SectionNav label="Colecții" current={collectionHref(id ?? undefined)} items={ROOM_TABS} types={['room']} />
        </div>
      </section>
      <ProductIndex id={id} items={items} trial={trial} />
    </>
  );
}
