'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { type Perfume, type Offer, lei, FREE_SHIPPING, fullItem, travelItem, imageFor, giftBox, boxable, boxItem } from '@/lib/catalog';
import { cart } from '@/lib/cart';
import Image from 'next/image';
import s from './PurchaseBlock.module.css';

type Fmt = 'full' | 'travel';

/**
 * The buy path stays obvious however immersive the page gets: format, price, one primary action,
 * then the trial alternative and the shipping threshold. A compact bar takes over when the CTA scrolls away.
 */
export function PurchaseBlock({ p, travel, samples }: { p: Perfume; travel: Offer | null; samples: Offer | null }) {
  const [fmt, setFmt] = useState<Fmt>('full');
  const [gift, setGift] = useState(false);
  const [bar, setBar] = useState(false);
  const cta = useRef<HTMLDivElement>(null);
  const name = useId();
  const price = fmt === 'full' ? p.price : travel!.price;
  const label = fmt === 'full' ? '100 ml' : 'Travel 2×8 ml';
  const item = fmt === 'full' ? fullItem(p) : travelItem(p, travel!);
  const canBox = !!giftBox && boxable(item.key);
  const boxed = gift && canBox;
  const total = price + (boxed ? giftBox!.price : 0);

  useEffect(() => {
    const el = cta.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setBar(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const add = () => cart.add([item, ...(boxed ? [boxItem(item.key, `${p.shortName}, ${item.format}`)] : [])]);
  const helper = travel ?? samples;
  const gap = FREE_SHIPPING - total;

  return (
    <div className={s.block}>
      {!travel && <p className={s.single}><span>100 ml</span><span className="num">{lei(p.price)}</span></p>}
      {travel && (
        <div className={s.formats} role="radiogroup" aria-labelledby={name}>
          <span id={name} className="sr-only">Format</span>
          {([['full', '100 ml', p.price], ['travel', 'Travel 2×8 ml', travel.price]] as const).map(([k, l, v]) => (
            <button key={k} type="button" role="radio" aria-checked={fmt === k} className={s.format} onClick={() => setFmt(k)}>
              <span className="label">{l}</span><span className="num">{lei(v)}</span>
            </button>
          ))}
        </div>
      )}
      <p className={`${s.formatNote} t-small muted`}>
        {fmt === 'travel' ? 'Două flacoane de 8 ml din același parfum. Îl porți câteva zile înainte de sticlă.' : travel ? 'Sticla Morph de 100 ml.' : 'Sticla Morph de 100 ml. Acest parfum nu are variantă travel.'}
      </p>

      <div ref={cta} className={s.ctaRow}>
        {p.inStock ? (
          <>
            <button type="button" className={`btn ${s.cta}`} onClick={add}>Adaugă în coș <span className="num">{lei(total)}</span></button>
            {canBox && (
              <label className={s.gift}><input type="checkbox" checked={gift} onChange={e => setGift(e.target.checked)} /> Cutie cadou, +{lei(giftBox!.price)}</label>
            )}
            <p className="t-micro muted">Plată cu cardul, Apple Pay sau Google Pay.</p>
          </>
        ) : <NotifyForm name={p.shortName} />}
      </div>

      {p.inStock && helper && gap > 0 && (
        <div className={s.nudge}>
          <p className="t-small">Mai ai {lei(gap)} până la livrarea gratuită. {travel ? 'Travel-ul' : 'Setul de mostre'} acoperă diferența.</p>
          {travel
            ? <button type="button" className="link t-small" onClick={() => cart.add([travelItem(p, travel)])}>Adaugă travel, {lei(travel.price)}</button>
            : <a className="link t-small" href={helper.url}>Vezi setul, {lei(helper.price)}</a>}
        </div>
      )}
      {travel && samples && <p className="t-small muted">Vrei să compari mai multe? <a className="link" href={samples.url}>Setul de mostre al colecției</a>, {lei(samples.price)}.</p>}

      <div className={s.bar} data-show={bar && p.inStock} aria-hidden={!bar} inert={!bar}>
        <span className={`niche-sm ${s.barThumb}`} aria-hidden><Image src={imageFor(p.slug)!} alt="" fill sizes="40px" /></span>
        <span className={s.barText}><b>{p.shortName}</b> <span className="muted">{label}</span></span>
        <button type="button" className="btn btn-sm" onClick={add}>Adaugă <span className="num">{lei(total)}</span></button>
      </div>
    </div>
  );
}

/** Back-in-stock request (Morph already runs a notify widget). Mock: validates and confirms, sends nothing. */
function NotifyForm({ name }: { name: string }) {
  const [state, setState] = useState<'idle' | 'error' | 'done'>('idle');
  const id = useId();
  if (state === 'done') return <p className={s.ok} role="status">Te anunțăm pe e-mail când {name} revine în stoc.</p>;
  return (
    <form className={s.notify} noValidate onSubmit={e => {
      e.preventDefault();
      const v = (new FormData(e.currentTarget).get('email') as string) ?? '';
      setState(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'done' : 'error');
    }}>
      <p className="t-small"><b>Stoc epuizat.</b> Lasă-ne adresa și îți scriem când revine.</p>
      <label htmlFor={id} className="sr-only">Adresa de e-mail</label>
      <div className={s.notifyRow}>
        <input id={id} name="email" type="email" placeholder="adresa@email.ro" aria-invalid={state === 'error'} aria-describedby={state === 'error' ? id + 'e' : undefined} />
        <button type="submit" className="btn">Anunță-mă</button>
      </div>
      {state === 'error' && <p id={id + 'e'} className={s.err}>Scrie o adresă de e-mail validă, de forma nume@domeniu.ro.</p>}
    </form>
  );
}
