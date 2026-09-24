'use client';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { addToCart } from '@/components/shared/cart';
import { Flip, gsap, reducedMotion } from '@/components/shared/useMotion';
import { type Perfume, type Offer, perfumes, bySlug, travelFor, layeringSets, lei, COLLECTIONS, ALL_BY_COLLECTION, descriptor, FAMILY_GROUPS, familyGroup, FREE_SHIPPING } from '@/lib/catalog';
import { Tile } from './_ui';
import s from './forma.module.css';

/** Signature B: two twisted bottles lean into each other (−7° / +7°) and overlap. Color appears only here. */
export function Composer({ first, second, title = 'Două forme' }: { first: string; second: string; title?: string }) {
  const [a, setA] = useState(first);
  const [b, setB] = useState(second);
  const [joined, setJoined] = useState(false);
  useEffect(() => { setJoined(false); const t = setTimeout(() => setJoined(true), 400); return () => clearTimeout(t); }, [a, b]);
  const A = bySlug(a), B = bySlug(b);
  const tA = travelFor(A), tB = travelFor(B);
  const options = ALL_BY_COLLECTION.map(c => (
    <optgroup key={c} label={COLLECTIONS[c].name}>{perfumes.filter(p => p.collection === c).map(p => <option key={p.slug} value={p.slug}>{p.shortName}</option>)}</optgroup>
  ));
  return (
    <div className={s.composer}>
      <div className={`${s.pair} ${s.shear}`} data-joined={joined} aria-hidden>
        <img className={`${s.pairBottle} ${s.pairA}`} src={A.images[0]} alt="" width={768} height={960} />
        <img className={`${s.pairBottle} ${s.pairB}`} src={B.images[0]} alt="" width={768} height={960} />
        <span className={s.pairLabel} style={{ left: '12%' }}>{A.shortName}</span>
        <span className={s.pairLabel} style={{ right: '12%' }}>{B.shortName}</span>
      </div>
      <div className={s.composerText}>
        <h2 className={s.compressed}>{title}</h2>
        <p className={s.muted} style={{ margin: 0 }}>Layering: două parfumuri purtate împreună. Alege-le și vezi-le una lângă alta.</p>
        <div className={s.pickers}>
          <label className={s.picker}>Primul strat<select className={s.select} value={a} onChange={e => setA(e.target.value)}>{options}</select></label>
          <label className={s.picker}>Al doilea strat<select className={s.select} value={b} onChange={e => setB(e.target.value)}>{options}</select></label>
        </div>
        <dl className={s.specs}>
          <dt>{A.shortName}</dt><dd>{descriptor(A)}</dd>
          <dt>{B.shortName}</dt><dd>{descriptor(B)}</dd>
        </dl>
        {a === b ? <p className={s.note}>Alege două parfumuri diferite.</p> : tA && tB ? (
          <button type="button" className={s.btn} style={{ alignSelf: 'start' }} onClick={() => { addToCart({ name: A.shortName, price: tA.price, format: 'Travel 2×8 ml' }); addToCart({ name: B.shortName, price: tB.price, format: 'Travel 2×8 ml' }); }}>
            Ambele în travel · {lei(tA.price + tB.price)} <span className={s.arrow} />
          </button>
        ) : <p className={s.note}>Pentru {[tA ? null : A.shortName, tB ? null : B.shortName].filter(Boolean).join(' și ')} nu există variantă travel; se poate încerca din setul de mostre al colecției.</p>}
        <p className={s.note}>Your Next Form: {layeringSets.length} combinații create de Morph, seturi blind de 2×8 ml, {lei(layeringSets[0].price)}.</p>
      </div>
    </div>
  );
}

type View = 'list' | 'gallery';

/** Collection as an index. Hovering a row shows the bottle, in color, in the sheared frame. */
export function CollectionIndex({ items, promo }: { items: Perfume[]; promo: Offer | null }) {
  const [fam, setFam] = useState<string | null>(null);
  const [view, setView] = useState<View>('list');
  const [active, setActive] = useState(items.find(p => p.inStock)!.slug);
  const frame = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const flip = useRef<Flip.FlipState | null>(null);
  const groups = FAMILY_GROUPS.map(g => ({ ...g, n: items.filter(p => familyGroup(p)?.id === g.id).length })).filter(g => g.n);
  const shown = useMemo(() => (fam ? items.filter(p => familyGroup(p)?.id === fam) : items).slice().sort((a, b) => Number(b.inStock) - Number(a.inStock)), [items, fam]);
  const act = bySlug(active);

  function change(fn: () => void) {
    if (list.current && !reducedMotion()) flip.current = Flip.getState(list.current.querySelectorAll('[data-flip-id]'));
    fn();
  }
  useLayoutEffect(() => {
    if (!flip.current) return;
    Flip.from(flip.current, { duration: 0.55, ease: 'power3.inOut', absolute: true, onEnter: e => gsap.fromTo(e, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }), onLeave: e => gsap.to(e, { autoAlpha: 0, duration: 0.2 }) });
    flip.current = null;
  }, [shown, view]);

  function show(slug: string) {
    if (slug === active) return;
    setActive(slug);
    if (frame.current && !reducedMotion()) gsap.fromTo(frame.current.querySelector('img'), { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }, { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.6, ease: 'expo.out' });
  }

  return (
    <>
      <div className={s.bar}>
        <div className={s.tabs} role="group" aria-label="Familie olfactivă">
          <button type="button" className={s.tab} aria-pressed={!fam} onClick={() => change(() => setFam(null))}>Toate<sup>{items.length}</sup></button>
          {groups.map(g => <button key={g.id} type="button" className={s.tab} aria-pressed={fam === g.id} onClick={() => change(() => setFam(fam === g.id ? null : g.id))}>{g.name}<sup>{g.n}</sup></button>)}
        </div>
        <div className={s.barRight}>
          <button type="button" className={s.view} aria-pressed={view === 'list'} onClick={() => change(() => setView('list'))}>Index</button>
          <button type="button" className={s.view} aria-pressed={view === 'gallery'} onClick={() => change(() => setView('gallery'))}>Galerie</button>
        </div>
      </div>
      <div ref={list} style={{ paddingTop: 8 }}>
        {view === 'list' ? (
          <div className={s.listWrap}>
            <ul className={s.list}>
              {shown.map((p, i) => {
                const travel = travelFor(p);
                return (
                  <li key={p.slug} data-flip-id={p.slug}>
                    <div className={`${s.row} ${p.inStock ? '' : s.soldout}`} data-active={p.slug === active} onMouseEnter={() => show(p.slug)} onFocus={() => show(p.slug)}>
                      <Link href={`/concept/b/product?p=${p.slug}`} className={`${s.rowThumb} ${s.shear}`} aria-hidden tabIndex={-1}><img src={p.images[0]} alt="" width={768} height={960} loading={i < 4 ? 'eager' : 'lazy'} style={{ mixBlendMode: 'multiply' }} /></Link>
                      <h2 className={`${s.rowName} ${s.compressed}`}><Link href={`/concept/b/product?p=${p.slug}`}>{p.shortName}</Link></h2>
                      <p className={s.rowDesc}>{descriptor(p)}{travel ? <><br /><span style={{ color: 'var(--ink)' }}>Travel 2×8 ml · {lei(travel.price)}</span></> : null}</p>
                      <span className={`${s.rowMeta} ${s.rowMetaFam}`}>{familyGroup(p)?.name}<br />{p.longevity?.replace('-', '–')}</span>
                      <span className={s.rowPrice}>{lei(p.price)}<br /><span className={s.muted} style={{ fontWeight: 400, fontSize: 12 }}>100 ml</span></span>
                      {p.inStock
                        ? <button type="button" className={s.rowAdd} onClick={() => addToCart({ name: p.shortName, price: p.price, format: '100 ml' })}>Adaugă</button>
                        : <button type="button" className={s.rowAdd}>Anunță-mă</button>}
                    </div>
                    {promo && !fam && i === 4 && (
                      <div className={s.promoRow}>
                        <div><h3 className={s.compressed}>Setul de mostre {/luxury/.test(promo.slug) ? 'Luxury' : 'Les Exclusifs & Ice'}</h3><span className={s.muted}>Încearcă mostrele acasă, apoi alege sticla de 100 ml.</span></div>
                        <a href={promo.url} className={s.btn}>{lei(promo.price)} <span className={s.arrow} /></a>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
            <div ref={frame} className={`${s.preview} ${s.shear}`} aria-hidden>
              <img src={act.images[0]} alt="" width={768} height={960} />
              <span className={s.previewCap}>{act.shortName} · {lei(act.price)}</span>
            </div>
          </div>
        ) : (
          <div className={s.gallery}>{shown.map(p => <Tile key={p.slug} p={p} />)}</div>
        )}
      </div>
    </>
  );
}

export function Stage({ p }: { p: Perfume }) {
  const [i, setI] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  // the one color moment on the page: the bottle fills with color as it arrives
  useEffect(() => {
    const img = root.current?.querySelector('img'); if (!img || reducedMotion()) return;
    gsap.fromTo(img, { filter: 'grayscale(1)' }, { filter: 'grayscale(0)', duration: 1.6, ease: 'power2.inOut', delay: 0.3 });
  }, [i]);
  return (
    <div className={s.stage} ref={root}>
      <div className={`${s.stageFrame} ${s.shear}`}>
        <img src={p.images[i]} alt={`${p.name}, imaginea ${i + 1}`} width={768} height={960} />
      </div>
      <h1 className={`${s.stageTitle} ${s.compressed}`}>{p.shortName}</h1>
      <div className={s.thumbs} role="group" aria-label="Imagini">
        {p.images.map((src, k) => (
          <button key={src} type="button" className={`${s.thumb} ${s.shear}`} aria-pressed={k === i} onClick={() => setI(k)} aria-label={`Imaginea ${k + 1}`}>
            <img src={src} alt="" width={84} height={104} style={{ mixBlendMode: 'multiply', filter: k === i ? 'none' : 'grayscale(1)' }} />
          </button>
        ))}
      </div>
    </div>
  );
}

export function Buy({ p, travel, samples }: { p: Perfume; travel: Offer | null; samples: Offer | null }) {
  const [fmt, setFmt] = useState<'full' | 'travel'>('full');
  const [bar, setBar] = useState(false);
  const cta = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const el = cta.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setBar(!e.isIntersecting && e.boundingClientRect.top < 0)); io.observe(el); return () => io.disconnect();
  }, []);
  const price = fmt === 'full' ? p.price : travel!.price;
  const label = fmt === 'full' ? '100 ml' : 'Travel 2×8 ml';
  const add = () => addToCart({ name: p.shortName, price, format: label });
  return (
    <>
      <div className={s.formats} role="radiogroup" aria-label="Format">
        <button type="button" role="radio" className={s.format} aria-pressed={fmt === 'full'} aria-checked={fmt === 'full'} onClick={() => setFmt('full')}><span>Sticla</span><b>100 ml · {lei(p.price)}</b></button>
        {travel && <button type="button" role="radio" className={s.format} aria-pressed={fmt === 'travel'} aria-checked={fmt === 'travel'} onClick={() => setFmt('travel')}><span>Încearcă întâi</span><b>2×8 ml · {lei(travel.price)}</b></button>}
      </div>
      {p.inStock ? <button ref={cta} type="button" className={s.cta} onClick={add}>Adaugă în coș <span>{lei(price)}</span></button> : <button ref={cta} type="button" className={s.cta}>Anunță-mă când revine</button>}
      {fmt === 'full' && travel && FREE_SHIPPING > p.price && (
        <div className={s.nudge}><span>{lei(FREE_SHIPPING - p.price)} până la livrarea gratuită.</span><button type="button" onClick={() => addToCart({ name: p.shortName, price: travel.price, format: 'Travel 2×8 ml' })}>+ Travel 2×8 ml</button></div>
      )}
      {samples && <p className={s.note}>Compari mai multe? <a href={samples.url} style={{ textDecoration: 'underline' }}>Setul de mostre al colecției</a>, {lei(samples.price)}.</p>}
      <div className={s.buyBar} data-show={bar}>
        <span><b className={s.compressed} style={{ fontSize: 24 }}>{p.shortName}</b> {label} · {lei(price)}</span>
        <button type="button" className={s.btn} onClick={add}>Adaugă</button>
      </div>
    </>
  );
}
