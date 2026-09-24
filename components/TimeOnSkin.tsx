'use client';
import { useEffect, useRef, useState } from 'react';
import { type Perfume, noteStory, firstSentences, hours } from '@/lib/catalog';
import { TIERS } from './NotePyramid';
import { ProductVisual } from './ProductVisual';
import s from './TimeOnSkin.module.css';

/**
 * Time on skin: opening → heart → base, with Morph's own paragraph for each tier. Native scroll, no pinning.
 * TIME → LIGHT: the bottle stays in its niche while the light around it changes with the phase in view:
 * bright at the opening, fuller in the heart, low and warm at the base, the way a room changes toward evening.
 * Only Morph's stated total longevity is shown as time; no intermediate times are invented.
 */
export function TimeOnSkin({ p }: { p: Perfume }) {
  const [phase, setPhase] = useState(0);
  const blocks = useRef<(HTMLElement | null)[]>([]);
  const story = noteStory(p);
  const texts = [story.top, story.heart, story.base];

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      for (const e of entries) if (e.isIntersecting) setPhase(Number((e.target as HTMLElement).dataset.phase));
    }, { rootMargin: '-45% 0px -45% 0px' });
    blocks.current.forEach(b => b && io.observe(b));
    return () => io.disconnect();
  }, []);

  const go = (k: number) => blocks.current[k]?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });

  return (
    <section className="band" data-tone="dark" aria-labelledby="timp-titlu">
      <div className="wrap">
        <div className={s.intro}>
          <h2 id="timp-titlu" className="t-1">Pe piele, în timp</h2>
          <p className="muted">Un parfum se schimbă după ce îl aplici: întâi notele de vârf, apoi inima, la final baza, care rămâne. {hours(p) ? `Morph indică pentru ${p.shortName} o longevitate de ${hours(p)}.` : ''}</p>
        </div>

        <div className={s.grid}>
          <div className={s.visual} aria-hidden>
            <div className={s.stage} data-phase={phase}>
              <ProductVisual p={p} sizes="(max-width: 899px) 100vw, 36vw" alt="" className={s.niche} />
              <span className={s.light} />
            </div>
            <div className={s.axis}>
              {TIERS.map((t, i) => <span key={t.key} data-on={i <= phase}>{t.label}</span>)}
              <span className="num">{hours(p) ?? ''}</span>
            </div>
          </div>

          <div className={s.steps}>
            <div className={s.tabs} role="group" aria-label="Etapă">
              {TIERS.map((t, i) => (
                <button key={t.key} type="button" aria-pressed={i === phase} onClick={() => go(i)}><span className="num" aria-hidden>{i + 1}</span> {t.label}</button>
              ))}
            </div>
            {TIERS.map((t, i) => (
              <article key={t.key} ref={el => { blocks.current[i] = el; }} data-phase={i} className={s.step} data-now={i === phase}>
                <h3 className="label muted"><span className="num" aria-hidden>{i + 1} </span>{t.label}</h3>
                <p className={s.stepNotes}>{p.notes[t.key].join(', ') || '—'}</p>
                {texts[i] && <p className={s.stepText}>{firstSentences(texts[i]!.body, 3)}</p>}
              </article>
            ))}
            <p className="t-micro muted">Descrierile notelor sunt preluate din pagina Morph a parfumului.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
