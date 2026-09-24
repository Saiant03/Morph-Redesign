'use client';
import { useEffect, useRef, useState } from 'react';
import { addToCart } from '@/components/shared/cart';
import { type Perfume, type Offer, lei, FREE_SHIPPING } from '@/lib/catalog';
import s from './cromatic.module.css';

export function Gallery({ p }: { p: Perfume }) {
  const [i, setI] = useState(0);
  return (
    <div className={s.pdpMedia}>
      <div className={s.pdpField}>
        <img className={s.pdpImg} src={p.images[i]} alt={`${p.name}, imaginea ${i + 1}`} width={768} height={960} />
      </div>
      {p.images.length > 1 && (
        <div className={s.thumbs} role="group" aria-label="Imagini">
          {p.images.map((src, k) => (
            <button key={src} type="button" className={s.thumb} aria-pressed={k === i} onClick={() => setI(k)} aria-label={`Imaginea ${k + 1}`}>
              <img src={src} alt="" width={68} height={85} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function BuyBox({ p, travel, samples }: { p: Perfume; travel: Offer | null; samples: Offer | null }) {
  const [fmt, setFmt] = useState<'full' | 'travel'>('full');
  const [inBar, setInBar] = useState(false);
  const cta = useRef<HTMLButtonElement>(null);
  const price = fmt === 'full' ? p.price : travel!.price;
  const label = fmt === 'full' ? '100 ml' : 'Travel 2×8 ml';

  useEffect(() => {
    const el = cta.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setInBar(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el); return () => io.disconnect();
  }, []);

  const add = () => addToCart({ name: p.shortName, price, format: label });
  const gap = FREE_SHIPPING - p.price;

  return (
    <>
      <div className={s.formats} role="radiogroup" aria-label="Format">
        <button type="button" role="radio" className={s.format} aria-pressed={fmt === 'full'} aria-checked={fmt === 'full'} onClick={() => setFmt('full')}>
          <span>100 ml<small>Sticla Morph</small></span><b style={{ fontWeight: 500 }}>{lei(p.price)}</b>
        </button>
        {travel && (
          <button type="button" role="radio" className={s.format} aria-pressed={fmt === 'travel'} aria-checked={fmt === 'travel'} onClick={() => setFmt('travel')}>
            <span>Travel 2×8 ml<small>Ca să-l porți câteva zile înainte de sticlă</small></span><b style={{ fontWeight: 500 }}>{lei(travel.price)}</b>
          </button>
        )}
      </div>
      {p.inStock ? (
        <button ref={cta} type="button" className={s.cta} onClick={add}>Adaugă în coș · {lei(price)}</button>
      ) : (
        <button ref={cta} type="button" className={s.cta}>Anunță-mă când revine</button>
      )}
      {fmt === 'full' && travel && gap > 0 && (
        <div className={s.nudge}>
          <span>Mai ai {lei(gap)} până la livrarea gratuită. Varianta travel o acoperă.</span>
          <button type="button" onClick={() => addToCart({ name: p.shortName, price: travel.price, format: 'Travel 2×8 ml' })}>Adaugă travel</button>
        </div>
      )}
      {samples && <p className={s.muted} style={{ margin: 0, fontSize: 14 }}>Vrei să compari mai multe? <a className={s.textLink} href={samples.url}>Setul de mostre al colecției</a>, {lei(samples.price)}.</p>}
      <div className={s.buyBar} data-show={inBar}>
        <span><b style={{ fontWeight: 500 }}>{p.shortName}</b> · {label}<br /><span className={s.muted}>{lei(price)}</span></span>
        <button type="button" className={s.btn} onClick={add}>Adaugă în coș</button>
      </div>
    </>
  );
}
