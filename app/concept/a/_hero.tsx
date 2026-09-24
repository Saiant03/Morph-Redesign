'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useMotion, gsap } from '@/components/shared/useMotion';
import { perfumes, tone, descriptor, COLLECTIONS, ALL_BY_COLLECTION, bySlug, HERO_SLUG, lei, concentration } from '@/lib/catalog';
import s from './cromatic.module.css';

/** Signature A: every scent is a color. Picking a swatch recolors the field and swaps the bottle. */
export function Hero() {
  const [slug, setSlug] = useState(HERO_SLUG);
  const p = bySlug(slug);
  const root = useRef<HTMLElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useMotion(root, () => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('[data-line]', { yPercent: 110, duration: 1.1, stagger: 0.08 })
      .from('[data-field]', { clipPath: 'inset(100% 0 0 0)', duration: 1.2, ease: 'power3.inOut' }, 0.1);
  });

  const target = useRef(slug);
  function pick(next: string) {
    if (next === target.current) return;
    target.current = next;
    const el = img.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setSlug(next);
    gsap.killTweensOf(el);
    gsap.to(el, { autoAlpha: 0, y: 12, duration: 0.2, ease: 'power2.in', onComplete: () => {
      setSlug(target.current);
      gsap.fromTo(el, { autoAlpha: 0, y: -12 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out', delay: 0.05 });
    } });
  }

  const t = tone(p);
  return (
    <section ref={root} className={s.wrap} aria-label="Morph">
      <div className={s.hero} style={{ '--a-c': t.identity } as React.CSSProperties}>
        <div className={s.heroText}>
          <div>
            <p className={s.heroMeta}>Casă italiană de parfumuri de nișă · Napoli, din 2002</p>
            <h1 className={s.display}>
              <span style={{ display: 'block', overflow: 'hidden' }}><span data-line style={{ display: 'block' }}>Mirosuri,</span></span>
              <span style={{ display: 'block', overflow: 'hidden' }}><span data-line style={{ display: 'block' }}>culori,</span></span>
              <span style={{ display: 'block', overflow: 'hidden' }}><span data-line style={{ display: 'block' }}>emoții.</span></span>
            </h1>
          </div>
          <div>
            <p className={s.lede}>{perfumes.length} de parfumuri unisex în trei colecții. Fiecare sticlă are culoarea ei. Alege una și începe de acolo.</p>
            <div className={s.ctaRow}>
              <Link href="/concept/a/collection" className={s.btn}>Vezi parfumurile</Link>
              <a href="https://morphparfum.ro/quiz" className={s.btnGhost}>Găsește-ți parfumul</a>
            </div>
          </div>
        </div>
        <div className={s.field} data-field>
          <img ref={img} className={s.fieldImg} src={p.images[0]} alt={p.name} width={768} height={960} />
          <div className={s.fieldCaption}>
            <Link href={`/concept/a/product?p=${p.slug}`}>
              <strong>{p.shortName}</strong>
              {descriptor(p)}
              <span className={s.muted}>{COLLECTIONS[p.collection].name}, {concentration(p)} · 100 ml · {lei(p.price)}</span>
            </Link>
            <span className={s.fieldSwatch} aria-hidden />
          </div>
        </div>
      </div>

      <div className={s.index} role="group" aria-label="Toate parfumurile, după culoare">
        {ALL_BY_COLLECTION.map(c => {
          const list = perfumes.filter(x => x.collection === c);
          return (
            <div key={c} className={s.indexGroup}>
              <div className={s.indexLabel}><span>{COLLECTIONS[c].name}</span><span>{list.length}</span></div>
              <div className={s.indexBars}>
                {list.map(x => (
                  <button key={x.slug} type="button" data-swatch className={s.swatch} aria-pressed={x.slug === slug} aria-label={x.shortName} title={x.shortName}
                    style={{ '--sw': tone(x).identity } as React.CSSProperties}
                    onClick={() => pick(x.slug)} onMouseEnter={() => window.matchMedia('(hover: hover)').matches && pick(x.slug)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <p className={s.indexHint}>Culorile sunt eșantionate din fotografiile sticlelor: eticheta la Luxury, lichidul la Les Exclusifs și Ice.</p>
    </section>
  );
}
