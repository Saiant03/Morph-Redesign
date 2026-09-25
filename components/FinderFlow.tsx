'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QUESTIONS, TAGGED, CATEGORY_LABEL, score, results, taggedWith, answersQuery, type Answers } from '@/lib/finder';
import { reducedMotion } from '@/lib/motion';
import { FinderHorizon } from './FinderHorizon';
import s from './FinderFlow.module.css';

const RESULT = '/descopera/finder/rezultat';
const href = (a: Answers, step?: number) => {
  const q = answersQuery(a);
  return `/descopera/finder?${q}${step ? `${q ? '&' : ''}pas=${step}` : ''}`;
};

/**
 * Morph's seven questions as a consultation in the night room (docs/design/phase-c3-discover-finder.md).
 * One question at a time, answered with native radios; Continuă / Înapoi move between them. The questions, answers,
 * tags, weights and selection are Morph's (lib/finder.ts), untouched. Along the floor the 23 tagged bottles keep
 * light in proportion to their current score, so choosing an answer visibly changes the room; the room's key
 * light rises with every answer. The last answer leaves one bottle lit, and that bottle travels into the result.
 * It is a GET form: without JavaScript every Continuă loads the next step (or the result) from the server.
 */
export function FinderFlow({ initial, step }: { initial: Answers; step: number }) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>(initial);
  const [i, setI] = useState(step);
  const [landing, setLanding] = useState<string | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);
  const q = QUESTIONS[i];
  const last = i === QUESTIONS.length - 1;
  const chosen = answers[q.id];

  useEffect(() => { window.history.replaceState(null, '', href(answers, i + 1)); }, [answers, i]);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    heading.current?.focus();
  }, [i]);
  // the room settles on the result's object, then the object carries the visitor into the result
  useEffect(() => {
    if (!landing) return;
    const t = window.setTimeout(() => router.push(`${RESULT}?${answersQuery(answers)}`), reducedMotion() ? 0 : 480);
    return () => window.clearTimeout(t);
  }, [landing, answers, router]);

  function next(e: React.FormEvent) {
    e.preventDefault();
    if (!chosen) return;
    const open = QUESTIONS.findIndex(x => !answers[x.id]);
    if (!last) setI(i + 1);
    else if (open >= 0) setI(open);
    else setLanding(results(answers)[0]?.p.slug ?? null);
  }
  const go = (k: number) => (e: React.MouseEvent) => { e.preventDefault(); setI(k); };

  const scores = TAGGED.map(x => ({ slug: x.p.slug, score: score(x.tags, answers) }));
  const max = Math.max(...scores.map(x => x.score));
  const answered = QUESTIONS.filter(x => answers[x.id]).length;
  const levels = answered ? Object.fromEntries(scores.map(x => [x.slug, max ? x.score / max : 0])) : undefined;
  const reach = QUESTIONS.findIndex(x => !answers[x.id]);
  const tagged = chosen && chosen !== 'any' ? taggedWith(q, chosen).length : null;

  return (
    <div className={s.room} data-tone="dark" style={{ '--key': 0.35 + (0.65 * answered) / QUESTIONS.length } as React.CSSProperties}>
      <div className={`wrap ${s.grid}`}>
        <header className={s.top}>
          <nav className="t-small muted" aria-label="Breadcrumb"><Link href="/descopera">Descoperă</Link> <span aria-hidden>/</span> <span aria-current="page">Fragrance Finder</span></nav>
          <h1 className={s.title}>Fragrance Finder</h1>
          <p className={`t-small muted ${s.intro}`}>{QUESTIONS.length} întrebări, cu întrebările și logica finder-ului Morph.</p>
        </header>

        <ol className={s.steps} aria-label={`Întrebarea ${i + 1} din ${QUESTIONS.length}`}>
          {QUESTIONS.map((x, k) => {
            const state = k === i ? 'current' : answers[x.id] ? 'done' : 'todo';
            const ans = x.answers.find(a => a.tag === answers[x.id])?.label;
            const body = (
              <>
                <span className={`${s.stepNo} num`} aria-hidden>{String(k + 1).padStart(2, '0')}</span>
                <span className={s.stepName}>{CATEGORY_LABEL[x.category]}</span>
                {ans && <span className={s.stepAnswer}>{ans}</span>}
              </>
            );
            const reachable = k !== i && (answers[x.id] || k === reach);
            return (
              <li key={x.id} data-state={state}>
                {reachable
                  ? <Link href={href(answers, k + 1)} onClick={go(k)} aria-label={`Întrebarea ${k + 1}, ${CATEGORY_LABEL[x.category]}${ans ? `: ${ans}` : ''}`}>{body}</Link>
                  : <span aria-current={k === i ? 'step' : undefined} aria-label={`Întrebarea ${k + 1}, ${CATEGORY_LABEL[x.category]}${ans ? `: ${ans}` : ''}${k === i ? ', cea curentă' : ''}`}>{body}</span>}
              </li>
            );
          })}
        </ol>

        <form className={s.main} action={last ? RESULT : '/descopera/finder'} method="get" onSubmit={next}>
          {QUESTIONS.filter(x => x.id !== q.id && answers[x.id]).map(x => <input key={x.id} type="hidden" name={x.id} value={answers[x.id]} />)}
          {!last && <input type="hidden" name="pas" value={i + 2} />}
          <div key={q.id} className={s.question}>
            <p className={`t-small muted num ${s.counter}`} aria-hidden>{i + 1} / {QUESTIONS.length}</p>
            <h2 ref={heading} id={`intrebare-${q.id}`} tabIndex={-1} className={s.label}>{q.label}</h2>
            <div className={s.answers} role="radiogroup" aria-labelledby={`intrebare-${q.id}`}>
              {q.answers.map(a => (
                <label key={a.tag} className={s.answer}>
                  <input type="radio" name={q.id} value={a.tag} checked={chosen === a.tag} required onChange={() => setAnswers({ ...answers, [q.id]: a.tag })} />
                  <span className={s.mark} aria-hidden />
                  <span className={s.text}>
                    <span className={s.answerLabel}>{a.label}</span>
                    {a.description && <span className="t-small muted">{a.description}</span>}
                  </span>
                </label>
              ))}
            </div>
            <p className={`t-small muted ${s.status}`} aria-live="polite">
              {tagged !== null ? `Morph a etichetat astfel ${tagged} din cele ${TAGGED.length} de parfumuri din finder.` : chosen === 'any' ? 'Finder-ul caută atunci în toate cele trei colecții.' : ' '}
            </p>
          </div>
          <div className={s.actions}>
            {i > 0 ? <Link className={`link ${s.back}`} href={href(answers, i)} onClick={go(i - 1)}>Înapoi</Link> : <Link className={`link ${s.back}`} href="/descopera#finder">Înapoi la Descoperă</Link>}
            <button type="submit" className="btn" disabled={!!landing}>{last ? 'Vezi rezultatul' : 'Continuă'}</button>
          </div>
        </form>

        <div className={s.floor}>
          <FinderHorizon levels={levels} landing={landing} />
          <p className="t-micro muted">{landing ? 'Rezultatul tău.' : 'Lumina rămâne pe parfumurile pe care Morph le-a etichetat cu răspunsurile tale.'}</p>
        </div>
      </div>
    </div>
  );
}
