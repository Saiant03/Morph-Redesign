'use client';
import { useEffect, useRef, useState } from 'react';
import { type Perfume, noteStory, firstSentences, hours } from '@/lib/catalog';
import { scentTokens, textOn } from '@/lib/scent';
import { TIERS } from './NotePyramid';
import s from './TimeOnSkin.module.css';

/**
 * Time on skin: opening → heart → base, with Morph's own paragraph for each tier.
 * Native scroll, no pinning: a sticky strata column (desktop) or strip (mobile) follows the phase in view.
 * Upper strata thin out as the scent develops; the base widens. Buttons jump to a phase.
 */
export function TimeOnSkin({ p }: { p: Perfume }) {
  const [phase, setPhase] = useState(0);
  const blocks = useRef<(HTMLElement | null)[]>([]);
  const story = noteStory(p);
  const { tiers } = scentTokens(p);
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
    <section className={`wrap ${s.section}`} aria-labelledby="timp-titlu">
      <div className={s.intro}>
        <h2 id="timp-titlu" className="t-2">Pe piele, în timp</h2>
        <p className="muted">Un parfum se schimbă după ce îl aplici: întâi notele de vârf, apoi inima, la final baza, care rămâne. {hours(p) ? `Morph indică pentru ${p.shortName} o longevitate de ${hours(p)}.` : ''}</p>
      </div>

      <div className={s.grid}>
        <div className={s.visual} aria-hidden>
          <div className={s.column} data-phase={phase}>
            {TIERS.map((t, i) => (
              <div key={t.key} className={s.stratum} data-state={i < phase ? 'past' : i === phase ? 'now' : 'next'} style={{ background: tiers[i], color: textOn(tiers[i]) }}>
                <span className="t-micro">{t.label}</span>
                <span className={s.stratumNotes}>{p.notes[t.key].join(', ')}</span>
              </div>
            ))}
          </div>
          <div className={s.axis}><span>Aplicare</span><span className="num">{hours(p) ? `${hours(p)}` : ''}</span></div>
        </div>

        <div className={s.steps}>
          <div className={s.tabs} role="group" aria-label="Etapă">
            {TIERS.map((t, i) => (
              <button key={t.key} type="button" aria-pressed={i === phase} onClick={() => go(i)} style={{ '--tier': tiers[i] } as React.CSSProperties}>{t.label}</button>
            ))}
          </div>
          {TIERS.map((t, i) => (
            <article key={t.key} ref={el => { blocks.current[i] = el; }} data-phase={i} className={s.step} data-now={i === phase}>
              <span className={s.stepBand} style={{ background: tiers[i] }} aria-hidden />
              <h3 className="t-micro muted">{t.label}</h3>
              <p className="t-2">{p.notes[t.key].join(', ') || '—'}</p>
              {texts[i] && <p className={s.stepText}>{firstSentences(texts[i]!.body, 3)}</p>}
            </article>
          ))}
          <p className="t-micro muted">Descrierile notelor sunt preluate din pagina Morph a parfumului.</p>
        </div>
      </div>
    </section>
  );
}
