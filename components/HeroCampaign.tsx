'use client';
import Link from 'next/link';
import { useRef } from 'react';
import { useMotion, gsap, EASE } from '@/lib/motion';
import { bySlug, COLLECTIONS, HERO_SLUG, lei, concentration, productHref, perfumes } from '@/lib/catalog';
import { TIERS } from './NotePyramid';
import { ProductVisual } from './ProductVisual';
import s from './HeroCampaign.module.css';

/**
 * Home, first viewport: a dark room, one bottle in a lit niche, Morph's own motto.
 * LOAD → ENTRY (kept from Phase 03–04, refined): the headline lines rise, the niche unmasks upward,
 * then its light comes up and the bottle settles. Skipped entirely under reduced motion.
 */
export function HeroCampaign() {
  const p = bySlug(HERO_SLUG);
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useMotion(root, () => {
    const tl = gsap.timeline({ defaults: { ease: EASE.out } });
    tl.from('[data-line]', { yPercent: 105, duration: 0.9, stagger: 0.08 })
      .from(stage.current, { clipPath: 'inset(100% 0 0 0)', duration: 1.1, ease: EASE.inOut }, 0.05)
      .from('[data-dim]', { opacity: 1, duration: 1.4, ease: 'power2.inOut' }, 0.7)
      .from('[data-stage] img', { yPercent: 3, scale: 0.97, duration: 1.6, ease: 'power2.out' }, 0.7)
      .from('[data-fade]', { autoAlpha: 0, y: 10, duration: 0.7, stagger: 0.08 }, 1.0);
  });

  return (
    <section ref={root} className={s.hero} data-tone="dark" aria-labelledby="hero-titlu">
      <div className={`wrap ${s.grid}`}>
        <div className={s.text}>
          <p className="label muted" data-fade>Casă italiană de parfumuri de nișă · Napoli, 2002</p>
          <h1 id="hero-titlu" className={`t-display ${s.title}`}>
            {['Metamorfoză', 'prin parfum.'].map(w => <span key={w} className={s.mask}><span data-line>{w}</span></span>)}
          </h1>
          <p className={`t-small muted ${s.attr}`} data-fade>Deviza Morph</p>
          <p className={`t-lede ${s.lede}`} data-fade>
            {perfumes.length} de parfumuri unisex în trei colecții, în sticla răsucită de la Bormioli Luigi.
          </p>
          <div className={s.ctas} data-fade>
            <Link href="/parfumuri" className="btn">Vezi parfumurile</Link>
            <Link href="/descopera/finder" className="btn btn-secondary">Găsește-ți parfumul</Link>
          </div>
        </div>

        <div ref={stage} className={s.stage} data-stage>
          <ProductVisual p={p} sizes="(max-width: 899px) 100vw, 58vw" priority vt className={s.niche} alt={`${p.name}, sticla`} />
          <span className={s.dim} data-dim aria-hidden />
        </div>

        <Link href={productHref(p)} className={s.caption} data-fade>
          <span className="label muted">În vitrină</span>
          <span className={s.capName}>{p.shortName}</span>
          <span className="t-small muted">{COLLECTIONS[p.collection].name}, {concentration(p)}, 100 ml, <span className="num">{lei(p.price)}</span></span>
          <dl className={s.formula}>
            {TIERS.map(t => <div key={t.key}><dt className="label muted">{t.label}</dt><dd>{p.notes[t.key].join(', ')}</dd></div>)}
          </dl>
          <span className={`${s.more} t-small`}>Descoperă {p.shortName}</span>
        </Link>
      </div>
    </section>
  );
}
