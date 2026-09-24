'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useMotion, gsap, reducedMotion, EASE } from '@/lib/motion';
import { perfumes, bySlug, COLLECTIONS, ALL_BY_COLLECTION, HERO_SLUG, lei, concentration, descriptor, productHref, collectionHref } from '@/lib/catalog';
import { scentTokens } from '@/lib/scent';
import { ProductVisual } from './ProductVisual';
import s from './ScentAtlas.module.css';

/**
 * Home hero. Every scent is a color: the atlas under the field is the whole catalog, grouped by collection.
 * Choosing a color recolors the field (CSS @property interpolation) and swaps the bottle.
 */
export function ScentAtlas() {
  const [slug, setSlug] = useState(HERO_SLUG);
  const p = bySlug(slug);
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const target = useRef(slug);

  useMotion(root, () => {
    const tl = gsap.timeline({ defaults: { ease: EASE.out } });
    tl.from('[data-line]', { yPercent: 105, duration: 0.9, stagger: 0.07 })
      .from(stage.current, { clipPath: 'inset(100% 0 0 0)', duration: 1, ease: EASE.inOut }, 0.05)
      .from('[data-bar]', { scaleY: 0, transformOrigin: 'bottom', duration: 0.5, stagger: 0.012 }, 0.4);
  });

  function pick(next: string) {
    if (next === target.current) return;
    target.current = next;
    const img = stage.current?.querySelector('img');
    if (!img || reducedMotion()) return setSlug(next);
    gsap.killTweensOf(img);
    gsap.to(img, { autoAlpha: 0, y: 10, duration: 0.18, ease: 'power2.in', onComplete: () => {
      setSlug(target.current);
      gsap.fromTo(img, { autoAlpha: 0, y: -10 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: EASE.out, delay: 0.06 });
    } });
  }
  const hoverPick = (x: string) => window.matchMedia('(hover: hover)').matches && pick(x);

  return (
    <section ref={root} className={`wrap ${s.hero}`} aria-labelledby="hero-titlu">
      <div className={s.text}>
        <p className={`${s.origin} muted`}>Casă italiană de parfumuri de nișă. Napoli, din 2002.</p>
        <h1 id="hero-titlu" className={`t-display ${s.title}`}>
          {['Mirosuri,', 'culori,', 'emoții.'].map(w => <span key={w} className={s.mask}><span data-line>{w}</span></span>)}
        </h1>
        <p className={`t-lede ${s.lede}`}>{perfumes.length} de parfumuri unisex în trei colecții. Fiecare sticlă își are culoarea ei, iar culoarea te duce la parfum.</p>
        <div className={s.ctas}>
          <Link href="/parfumuri" className="btn">Vezi toate parfumurile</Link>
          <Link href="/descopera/finder" className="btn btn-secondary">Găsește-ți parfumul</Link>
        </div>
      </div>

      <div ref={stage} className={s.stage}>
        <ProductVisual p={p} sizes="(max-width: 899px) 100vw, 56vw" priority className={s.field} alt={p.name} />
        <Link href={productHref(p)} className={s.caption}>
          <span className={s.capName}>{p.shortName}</span>
          <span>{descriptor(p)}</span>
          <span className="muted">{COLLECTIONS[p.collection].name}, {concentration(p)}, 100 ml, <span className="num">{lei(p.price)}</span></span>
        </Link>
      </div>

      <div className={s.atlas}>
        <h2 className="sr-only">Toate parfumurile, după culoare</h2>
        {ALL_BY_COLLECTION.map(c => {
          const list = perfumes.filter(x => x.collection === c);
          return (
            <div key={c} className={s.group} style={{ flexGrow: list.length }}>
              <Link href={collectionHref(c)} className={`${s.groupLabel} t-micro`}>
                <span>{COLLECTIONS[c].name}</span><span className="num muted">{list.length}</span>
              </Link>
              <div className={s.bars} role="group" aria-label={COLLECTIONS[c].name}>
                {list.map(x => (
                  <button key={x.slug} type="button" data-bar className={s.bar} data-name={x.shortName}
                    aria-pressed={x.slug === slug} aria-label={x.shortName}
                    style={{ '--scent': scentTokens(x).scent } as React.CSSProperties}
                    onClick={() => pick(x.slug)} onMouseEnter={() => hoverPick(x.slug)} onFocus={() => pick(x.slug)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
