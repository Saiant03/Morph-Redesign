'use client';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { addToCart } from '@/components/shared/cart';
import { useMotion, gsap, ScrollTrigger, Flip, reducedMotion } from '@/components/shared/useMotion';
import { type Perfume, type Offer, perfumes, bySlug, tone, mix, travelFor, layeringSets, lei, COLLECTIONS, ALL_BY_COLLECTION, FAMILY_GROUPS, familyGroup, FREE_SHIPPING, noteStory, veilTint } from '@/lib/catalog';
import { Card } from './_ui';
import s from './strata.module.css';

const first = (t: string, n: number) => (t.match(/[^.!?]+[.!?]+/g) || [t]).slice(0, n).join(' ').trim();

/** Home hero: three veils (the scent's three tiers) clear one by one as you scroll; the bottle comes into focus. */
export function Hero({ p }: { p: Perfume }) {
  const root = useRef<HTMLElement>(null);
  useMotion(root, ({ isDesktop }) => {
    gsap.from('[data-rise]', { autoAlpha: 0, y: 30, duration: 1.2, stagger: 0.1, ease: 'power3.out' });
    if (!isDesktop) return;
    const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: '+=80%', scrub: 0.8, pin: true } });
    tl.fromTo('[data-bottle]', { filter: 'blur(3px)' }, { filter: 'blur(0px)', duration: 3, ease: 'none' }, 0);
    gsap.utils.toArray<HTMLElement>('[data-veil]').forEach((v, i) => tl.to(v, { xPercent: 60 + i * 10, autoAlpha: 0, duration: 1, ease: 'power2.in' }, i * 0.8));
  });
  const tiers = [['Deschidere', p.notes.top], ['Inimă', p.notes.heart], ['Bază', p.notes.base]] as const;
  const juice = tone(p).juice;
  return (
    <section ref={root} className={s.hero} aria-label="Morph">
      <p className={s.heroMeta} data-rise>Parfumuri de nișă · casă fondată la Napoli, 2002</p>
      <div className={s.heroStage}>
        <img data-bottle className={s.heroBottle} src={p.images[0]} alt={p.name} width={768} height={960} />
        <div className={s.veils} aria-hidden>
          {tiers.map(([label, notes], i) => (
            <div key={label} data-veil className={s.veil} style={{ '--tint': `${mix(juice, '#f4f2f5', 0.18 + i * 0.12)}b3` } as React.CSSProperties}>
              <span><b>{label}</b> · {notes.join(', ')}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={s.heroText}>
        <h1 className={s.layered} data-rise>
          <span className={s.l1}>Identity,</span>
          <span className={`${s.l2} ${s.serif}`}>layer by layer.</span>
        </h1>
        <p data-rise>Parfumurile Morph se schimbă pe piele, strat cu strat. {perfumes.length} de parfumuri unisex, în trei colecții, de purtat singure sau împreună.</p>
        <div className={s.ctaRow} data-rise>
          <Link href="/concept/c/collection" className={s.btn}>Descoperă parfumurile</Link>
          <a href="https://morphparfum.ro/quiz" className={s.btnVeil}>Găsește-ți parfumul</a>
        </div>
      </div>
      <span className={s.scrollHint}>Derulează: {p.shortName}, de la deschidere la bază</span>
    </section>
  );
}

/** Signature C: two soft veils of color overlap; below, the two note pyramids merge tier by tier. */
export function Composer({ first: f, second, title = 'Al doilea strat' }: { first: string; second: string; title?: string }) {
  const [a, setA] = useState(f);
  const [b, setB] = useState(second);
  const [joined, setJoined] = useState(false);
  useEffect(() => { setJoined(false); const t = setTimeout(() => setJoined(true), 350); return () => clearTimeout(t); }, [a, b]);
  const A = bySlug(a), B = bySlug(b);
  const tA = travelFor(A), tB = travelFor(B);
  const options = ALL_BY_COLLECTION.map(c => <optgroup key={c} label={COLLECTIONS[c].name}>{perfumes.filter(p => p.collection === c).map(p => <option key={p.slug} value={p.slug}>{p.shortName}</option>)}</optgroup>);
  const tiers = [['Deschidere', 'top'], ['Inimă', 'heart'], ['Bază', 'base']] as const;
  return (
    <div className={s.composer}>
      <div className={s.veilStage} data-joined={joined} aria-hidden>
        <div className={`${s.blend} ${s.blendA}`} style={{ backgroundColor: tone(A).identity }} />
        <div className={`${s.blend} ${s.blendB}`} style={{ backgroundColor: tone(B).identity }} />
        <img className={s.stageBottle} src={A.images[0]} alt="" style={{ left: joined ? '26%' : '14%' }} width={768} height={960} />
        <img className={s.stageBottle} src={B.images[0]} alt="" style={{ left: joined ? '44%' : '56%' }} width={768} height={960} />
        <div className={s.stageLabel}><span>{A.shortName}</span><span>{B.shortName}</span></div>
      </div>
      <div className={s.composerText}>
        <h2 className={s.serif}>{title}</h2>
        <p className={s.note} style={{ fontSize: 15 }}>Layering: două parfumuri purtate împreună. Alege-le și vezi cum se suprapun notele, strat cu strat.</p>
        <div className={s.pickers}>
          <label className={s.picker}>Primul strat<select className={s.select} value={a} onChange={e => setA(e.target.value)}>{options}</select></label>
          <label className={s.picker}>Al doilea strat<select className={s.select} value={b} onChange={e => setB(e.target.value)}>{options}</select></label>
        </div>
        <ul className={s.merged}>
          {tiers.map(([label, k]) => <li key={k}><span>{label}</span>{[...A.notes[k], ...(a === b ? [] : B.notes[k])].join(', ') || '—'}</li>)}
        </ul>
        {a === b ? <p className={s.note}>Alege două parfumuri diferite.</p> : tA && tB ? (
          <button type="button" className={s.btn} style={{ alignSelf: 'start' }} onClick={() => { addToCart({ name: A.shortName, price: tA.price, format: 'Travel 2×8 ml' }); addToCart({ name: B.shortName, price: tB.price, format: 'Travel 2×8 ml' }); }}>
            Încearcă-le în travel · {lei(tA.price + tB.price)}
          </button>
        ) : <p className={s.note}>Pentru {[tA ? null : A.shortName, tB ? null : B.shortName].filter(Boolean).join(' și ')} nu există variantă travel; se poate încerca din setul de mostre al colecției.</p>}
        <p className={s.note}>Your Next Form: {layeringSets.length} combinații create de Morph, dezvăluite abia la deschiderea cutiei. 2×8 ml, {lei(layeringSets[0].price)}.</p>
      </div>
    </div>
  );
}

type Sort = 'recomandate' | 'longevitate' | 'az';
export function CollectionGrid({ items, promo }: { items: Perfume[]; promo: Offer | null }) {
  const [fam, setFam] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>('recomandate');
  const grid = useRef<HTMLDivElement>(null);
  const st = useRef<Flip.FlipState | null>(null);
  const groups = FAMILY_GROUPS.map(g => ({ ...g, n: items.filter(p => familyGroup(p)?.id === g.id).length })).filter(g => g.n);
  const shown = useMemo(() => {
    const l = fam ? items.filter(p => familyGroup(p)?.id === fam) : [...items];
    if (sort === 'az') l.sort((x, y) => x.shortName.localeCompare(y.shortName));
    if (sort === 'longevitate') l.sort((x, y) => parseInt(y.longevity || '0') - parseInt(x.longevity || '0'));
    if (sort === 'recomandate') l.sort((x, y) => Number(y.inStock) - Number(x.inStock) || Number(y.bestseller) - Number(x.bestseller));
    return l;
  }, [items, fam, sort]);
  const change = (fn: () => void) => { if (grid.current && !reducedMotion()) st.current = Flip.getState(grid.current.querySelectorAll('[data-flip-id]')); fn(); };
  useLayoutEffect(() => {
    if (!st.current) return;
    Flip.from(st.current, { duration: 0.8, ease: 'power3.inOut', absolute: true, onEnter: e => gsap.fromTo(e, { autoAlpha: 0, filter: 'blur(8px)' }, { autoAlpha: 1, filter: 'blur(0px)', duration: 0.7 }), onLeave: e => gsap.to(e, { autoAlpha: 0, duration: 0.3 }) });
    st.current = null;
  }, [shown]);
  return (
    <>
      <div className={s.toolbar}>
        <div className={s.chips} role="group" aria-label="Familie olfactivă">
          <button type="button" className={s.chip} aria-pressed={!fam} onClick={() => change(() => setFam(null))}>Toate<small>{items.length}</small></button>
          {groups.map(g => <button key={g.id} type="button" className={s.chip} aria-pressed={fam === g.id} onClick={() => change(() => setFam(fam === g.id ? null : g.id))}>{g.name}<small>{g.n}</small></button>)}
        </div>
        <label className={s.sort}>Ordonează
          <select className={s.select} style={{ height: 40 }} value={sort} onChange={e => change(() => setSort(e.target.value as Sort))}>
            <option value="recomandate">Recomandate</option><option value="longevitate">Longevitate</option><option value="az">Nume A–Z</option>
          </select>
        </label>
      </div>
      <div ref={grid} className={s.grid}>
        {shown.map((p, i) => (
          <SlotWithPromo key={p.slug} promo={!fam && i === 4 ? promo : null}><Card p={p} /></SlotWithPromo>
        ))}
      </div>
    </>
  );
}
function SlotWithPromo({ children, promo }: { children: React.ReactNode; promo: Offer | null }) {
  return (
    <>
      {children}
      {promo && (
        <aside className={s.promo} data-flip-id="promo">
          <p>Nu știi de unde să începi?</p>
          <h3 className={s.serif}>Setul de mostre {/luxury/.test(promo.slug) ? 'Luxury' : 'Les Exclusifs & Ice'}</h3>
          <p>Încearcă mostrele acasă, apoi alege sticla de 100 ml.</p>
          <a className={s.btn} href={promo.url}>{lei(promo.price)} · vezi setul</a>
        </aside>
      )}
    </>
  );
}

export function Stage({ p }: { p: Perfume }) {
  const [i, setI] = useState(0);
  return (
    <div className={s.pdpStage} style={{ '--tint': veilTint(p, 0.3) } as React.CSSProperties}>
      <img src={p.images[i]} alt={`${p.name}, imaginea ${i + 1}`} width={768} height={960} />
      <div className={s.pdpStageVeil} />
      <div className={s.thumbs} role="group" aria-label="Imagini">
        {p.images.map((src, k) => <button key={src} type="button" className={s.thumb} aria-pressed={k === i} onClick={() => setI(k)} aria-label={`Imaginea ${k + 1}`}><img src={src} alt="" width={54} height={66} /></button>)}
      </div>
    </div>
  );
}

export function Buy({ p, travel, samples }: { p: Perfume; travel: Offer | null; samples: Offer | null }) {
  const [fmt, setFmt] = useState<'full' | 'travel'>('full');
  const price = fmt === 'full' ? p.price : travel!.price;
  const label = fmt === 'full' ? '100 ml' : 'Travel 2×8 ml';
  const add = () => addToCart({ name: p.shortName, price, format: label });
  return (
    <>
      <div className={s.formats} role="radiogroup" aria-label="Format">
        <button type="button" role="radio" className={s.format} aria-pressed={fmt === 'full'} aria-checked={fmt === 'full'} onClick={() => setFmt('full')}><span>100 ml<small>Sticla Morph</small></span><span>{lei(p.price)}</span></button>
        {travel && <button type="button" role="radio" className={s.format} aria-pressed={fmt === 'travel'} aria-checked={fmt === 'travel'} onClick={() => setFmt('travel')}><span>Travel 2×8 ml<small>Poartă-l câteva zile înainte de sticlă</small></span><span>{lei(travel.price)}</span></button>}
      </div>
      {fmt === 'full' && travel && FREE_SHIPPING > p.price && (
        <div className={s.nudge}><span>Încă {lei(FREE_SHIPPING - p.price)} și livrarea e gratuită.</span><button type="button" onClick={() => addToCart({ name: p.shortName, price: travel.price, format: 'Travel 2×8 ml' })}>Adaugă și travel</button></div>
      )}
      {samples && <p className={s.note} style={{ fontSize: 14 }}>Vrei să compari? <a href={samples.url} style={{ textDecoration: 'underline' }}>Setul de mostre al colecției</a>, {lei(samples.price)}.</p>}
      <div className={s.buyBar}>
        <span><span className={s.serif} style={{ fontSize: 22 }}>{p.shortName}</span> · {label} · {lei(price)}</span>
        {p.inStock ? <button type="button" className={s.btn} onClick={add}>Adaugă în coș</button> : <button type="button" className={s.btn}>Anunță-mă</button>}
      </div>
    </>
  );
}

/** Time on skin: scroll (desktop, pinned) or the three buttons move through opening, heart and base. */
export function TimeOnSkin({ p }: { p: Perfume }) {
  const [phase, setPhase] = useState(0);
  const root = useRef<HTMLElement>(null);
  const story = noteStory(p);
  const phases = [
    { label: 'Deschidere', notes: p.notes.top, text: story.top?.body },
    { label: 'Inimă', notes: p.notes.heart, text: story.heart?.body },
    { label: 'Bază', notes: p.notes.base, text: story.base?.body },
  ];
  const juice = tone(p).juice;
  const trig = useRef<ScrollTrigger | null>(null);
  useMotion(root, ({ isDesktop }) => {
    if (!isDesktop) return;
    trig.current = ScrollTrigger.create({ trigger: root.current, start: 'top top', end: '+=160%', pin: true, onUpdate: self => setPhase(Math.min(2, Math.floor(self.progress * 3))) });
    return () => { trig.current?.kill(); trig.current = null; };
  });
  // when pinned, a button scrolls to its phase so scroll position and state never disagree
  const go = (k: number) => {
    const t = trig.current;
    if (!t) return setPhase(k);
    window.scrollTo({ top: t.start + ((k + 0.5) / 3) * (t.end - t.start), behavior: reducedMotion() ? 'auto' : 'smooth' });
  };
  const ph = phases[phase];
  return (
    <section ref={root} className={`${s.time} ${s.wrap}`} aria-labelledby="timp">
      <div className={s.timePin}>
        <div className={s.timeText}>
          <span className={s.phaseName}>Pe piele · {ph.label}{phase === 2 && p.longevity ? ` · până la ${p.longevity.split('-')[1]} ore` : ''}</span>
          <h2 id="timp" className={s.serif}>{ph.notes.join(', ') || '—'}</h2>
          <p>{ph.text ? first(ph.text, 2) : ''}</p>
          <div className={s.scrub} role="group" aria-label="Etapă">
            {phases.map((x, k) => <button key={x.label} type="button" aria-pressed={k === phase} onClick={() => go(k)}>{x.label}<span>{x.notes[0] ?? '—'}</span></button>)}
          </div>
          <p className={s.note}>Longevitate {p.longevity?.replace('-', '–') ?? '—'} · intensitate {p.intensity?.toLowerCase() ?? '—'}. Descrierile notelor sunt ale Morph.</p>
        </div>
        <div className={s.timeVisual} aria-hidden>
          <img src={p.images[0]} alt="" width={768} height={960} />
          {phases.map((x, k) => (
            <div key={x.label} className={s.tier} style={{ background: mix(juice, '#e3e1e5', 0.35 + k * 0.25), opacity: k === phase ? 0.9 : k < phase ? 0 : 0.35, transform: k < phase ? 'translateY(-30%)' : 'none' }} />
          ))}
        </div>
      </div>
    </section>
  );
}
