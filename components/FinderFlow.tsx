'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QUESTIONS, TAGGED, score, taggedWith, answersQuery, type Answers } from '@/lib/finder';
import Image from 'next/image';
import s from './FinderFlow.module.css';

/**
 * Morph's seven questions, one at a time. Beside them, the shelf of the 23 perfumes Morph tagged: after every answer
 * the bottles that match stay lit and the others dim (light = current score), so the selection visibly narrows.
 * The last answer opens the result URL.
 */
export function FinderFlow({ initial, step }: { initial: Answers; step: number | null }) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>(initial);
  const [i, setI] = useState(step ?? Math.max(0, QUESTIONS.findIndex(q => !initial[q.id])));
  const heading = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);
  const q = QUESTIONS[i];

  useEffect(() => {
    const qs = answersQuery(answers);
    window.history.replaceState(null, '', `${window.location.pathname}${qs ? `?${qs}` : ''}`);
  }, [answers]);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    heading.current?.focus();
  }, [i]);

  function pick(tag: string) {
    const next = { ...answers, [q.id]: tag };
    setAnswers(next);
    const pending = QUESTIONS.findIndex((x, k) => k > i && !next[x.id]);
    const target = pending >= 0 ? pending : QUESTIONS.findIndex(x => !next[x.id]);
    window.setTimeout(() => {
      if (target >= 0) setI(target);
      else router.push(`/descopera/finder/rezultat?${answersQuery(next)}`);
    }, 220); // Morph's own auto-advance delay
  }

  const scored = TAGGED.map(x => ({ ...x, score: score(x.tags, answers) })).sort((a, b) => b.score - a.score);
  const answered = QUESTIONS.filter(x => answers[x.id]).length;
  const nextOpen = QUESTIONS.findIndex(x => !answers[x.id]);
  const max = scored[0]?.score ?? 0;

  return (
    <div className={s.flow}>
      <div className={s.main}>
        <ol className={s.progress} aria-label={`Întrebarea ${i + 1} din ${QUESTIONS.length}`}>
          {QUESTIONS.map((x, k) => (
            <li key={x.id} data-state={k === i ? 'current' : answers[x.id] ? 'done' : 'todo'}>
              <button type="button" onClick={() => setI(k)} disabled={!answers[x.id] && k !== nextOpen}
                aria-label={`Întrebarea ${k + 1}${answers[x.id] ? ', răspuns dat' : ''}`} aria-current={k === i ? 'step' : undefined} />
            </li>
          ))}
        </ol>
        <div className={s.meta}>
          <span className="t-small muted num">Întrebarea {i + 1} din {QUESTIONS.length}</span>
          {i > 0 && <button type="button" className="text-btn link t-small" onClick={() => setI(i - 1)}>Înapoi</button>}
        </div>

        <div key={q.id} className={s.question}>
          <h2 ref={heading} id={`intrebare-${q.id}`} tabIndex={-1} className={`t-2 ${s.label}`}>{q.label}</h2>
          <div className={s.answers} role="group" aria-labelledby={`intrebare-${q.id}`}>
            {q.answers.map((a, k) => {
              const list = a.tag === 'any' ? [] : taggedWith(q, a.tag);
              return (
                <button key={a.tag} type="button" className={s.answer} aria-pressed={answers[q.id] === a.tag} onClick={() => pick(a.tag)}>
                  <span className={`${s.index} num`} aria-hidden>{String(k + 1).padStart(2, '0')}</span>
                  <span className={s.text}>
                    <span className={s.answerLabel}>{a.label}</span>
                    {a.description && <span className="t-small muted">{a.description}</span>}
                  </span>
                  {list.length > 0 && (
                    <span className={s.answerObjects} aria-hidden title={list.map(p => p.shortName).join(', ')}>
                      <span className={s.stack}>{list.slice(0, 3).map(p => <span key={p.slug} className={`niche-sm ${s.stackImg}`}><Image src={p.images[0]} alt="" fill sizes="28px" /></span>)}</span>
                      <span className="label muted num">{list.length}</span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <p className={`${s.note} t-micro muted`}>Lângă fiecare răspuns: câte parfumuri a etichetat Morph astfel în finder.</p>
      </div>

      <aside className={s.side} aria-label="Selecția de până acum">
        <p className="label muted">{answered === 0 ? `Cele ${TAGGED.length} parfumuri din finder` : `După ${answered} ${answered === 1 ? 'răspuns' : 'răspunsuri'}`}</p>
        <ul className={s.shelf} aria-hidden>
          {TAGGED.map(x => {
            const sc = scored.find(y => y.p.slug === x.p.slug)!.score;
            const lead = answered > 0 && scored.slice(0, 3).some(y => y.p.slug === x.p.slug);
            return (
              <li key={x.p.slug} data-lit={answered === 0 ? 'all' : lead ? 'lead' : sc > 0 ? 'some' : 'off'} style={{ '--w': max ? sc / max : 1 } as React.CSSProperties}>
                <span className={`niche-sm ${s.shelfImg}`}><Image src={x.p.images[0]} alt="" fill sizes="48px" /></span>
              </li>
            );
          })}
        </ul>
        {answered > 0 && (
          <div className={s.lead} aria-live="polite">
            <p className="label muted">Cele mai apropiate acum</p>
            <ol>{scored.slice(0, 3).map(x => <li key={x.p.slug}>{x.p.shortName}</li>)}</ol>
          </div>
        )}
      </aside>
    </div>
  );
}
