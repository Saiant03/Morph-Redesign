'use client';
import Link from 'next/link';
import { useRef } from 'react';
import { useMotion, gsap } from '@/components/shared/useMotion';
import { type Perfume, type CollectionId, COLLECTIONS, lei, concentration, perfumes } from '@/lib/catalog';
import s from './forma.module.css';

/** Load moment: the word compresses (width axis 125 → 62) while the frame takes the bottle's shear. */
export function Hero({ p }: { p: Perfume }) {
  const root = useRef<HTMLElement>(null);
  useMotion(root, () => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.inOut' } });
    tl.fromTo('[data-word]', { '--wdth': 125 }, { '--wdth': 62, duration: 1.6 })
      .fromTo('[data-frame]', { clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)' }, { clipPath: 'polygon(7% 0, 100% 0, 93% 100%, 0% 100%)', duration: 1.3 }, 0.25)
      .from('[data-copy] > *', { autoAlpha: 0, y: 16, duration: 0.8, stagger: 0.06, ease: 'power3.out' }, 0.7);
  });
  return (
    <section ref={root} className={s.wrap} style={{ overflow: 'hidden' }} aria-label="Morph">
      <div className={s.hero}>
        <div className={s.heroCopy} data-copy>
          <p className={s.heroLead}>Parfumuri de nișă dintr-o casă fondată la Napoli în 2002. Toate unisex.</p>
          <dl className={s.facts}>
            <dt>Parfumuri</dt><dd>{perfumes.length}</dd>
            <dt>Colecții</dt><dd>Les Exclusifs, Luxury, Ice</dd>
            <dt>Sticla</dt><dd>Bormioli Luigi, Italia</dd>
            <dt>100 ml</dt><dd>{lei(Math.min(...perfumes.map(x => x.price)))} – {lei(Math.max(...perfumes.map(x => x.price)))}</dd>
          </dl>
          <div className={s.ctaRow}>
            <Link href="/concept/b/collection" className={s.btn}>Parfumurile <span className={s.arrow} /></Link>
            <a href="https://morphparfum.ro/quiz" className={s.btnLine}>Găsește-ți parfumul</a>
          </div>
        </div>
        <Link href={`/concept/b/product?p=${p.slug}`} className={`${s.heroFrame} ${s.shear} ${s.hasColor}`} data-frame aria-label={`${p.shortName}, detalii`}>
          <img className={s.mono} src={p.images[0]} alt={p.name} width={768} height={960} />
        </Link>
        <p className={s.heroCaption}><b className={s.compressed}>{p.shortName}</b>{COLLECTIONS[p.collection].name} · {concentration(p)} · {lei(p.price)}</p>
        <h1 className={`${s.heroWord} ${s.compressed}`} data-word aria-label="Morph">Morph</h1>
      </div>
    </section>
  );
}

/** Three collections as one sheared band. On scroll each frame settles from a stronger twist to the bottle's 7°. */
export function Band({ items }: { items: { id: CollectionId; p: Perfume; count: number }[] }) {
  const root = useRef<HTMLDivElement>(null);
  useMotion(root, () => {
    gsap.utils.toArray<HTMLElement>('[data-band]').forEach((el, i) => {
      gsap.fromTo(el, { clipPath: 'polygon(18% 0, 100% 0, 82% 100%, 0% 100%)' }, {
        clipPath: 'polygon(7% 0, 100% 0, 93% 100%, 0% 100%)', ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 35%', scrub: 0.6 },
      });
      void i;
    });
  });
  return (
    <div ref={root} className={s.band}>
      {items.map(({ id, p, count }) => (
        <div key={id} className={`${s.bandItem} ${s.hasColor}`}>
          <Link href={`/concept/b/collection?c=${id}`} className={`${s.bandFrame} ${s.shear}`} data-band aria-label={COLLECTIONS[id].name}>
            <img className={s.mono} src={p.images[0]} alt={p.name} width={768} height={960} loading="lazy" />
          </Link>
          <div className={s.bandMeta}>
            <h3 className={s.compressed}>{COLLECTIONS[id].name}</h3>
            <span className={s.bandCount}>{count} parfumuri</span>
            <p>{COLLECTIONS[id].type}. {COLLECTIONS[id].line}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
