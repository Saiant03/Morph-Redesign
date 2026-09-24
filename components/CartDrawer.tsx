'use client';
import { useEffect, useRef } from 'react';
import { cart, useCart } from '@/lib/cart';
import { FREE_SHIPPING, lei } from '@/lib/catalog';
import s from './CartDrawer.module.css';

/** Mock cart drawer: items, subtotal and free-shipping progress. Checkout is out of scope for the concept. */
export function CartDrawer() {
  const { items, open, total } = useCart();
  const close = useRef<HTMLButtonElement>(null);
  const last = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;
    last.current = document.activeElement;
    close.current?.focus();
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && cart.close();
    window.addEventListener('keydown', esc);
    return () => { window.removeEventListener('keydown', esc); (last.current as HTMLElement | null)?.focus?.(); };
  }, [open]);

  const gap = FREE_SHIPPING - total;
  return (
    <div className={s.root} data-open={open} aria-hidden={!open} inert={!open}>
      <div className={s.scrim} onClick={cart.close} />
      <aside className={s.panel} role="dialog" aria-modal="true" aria-labelledby="cos-titlu">
        <div className={s.head}>
          <h2 id="cos-titlu" className="t-3">Coș</h2>
          <button ref={close} type="button" className={`${s.close} link`} onClick={cart.close}>Închide</button>
        </div>
        {items.length === 0 ? (
          <p className="muted">Coșul e gol.</p>
        ) : (
          <ul className={s.items}>
            {items.map((i, k) => (
              <li key={i.key + k} className={s.item}>
                <span className="swatch" style={{ '--scent': i.color ?? 'var(--border)' } as React.CSSProperties} />
                <span><b className={s.name}>{i.name}</b><span className="muted t-small">{i.format}</span></span>
                <span className="num">{lei(i.price)}</span>
                <button type="button" className={`${s.remove} link t-small muted`} onClick={() => cart.remove(k)} aria-label={`Scoate ${i.name}, ${i.format}`}>Scoate</button>
              </li>
            ))}
          </ul>
        )}
        <div className={s.foot}>
          <div className={s.ship}>
            <p className="t-small">{items.length === 0 ? `Livrare gratuită de la ${lei(FREE_SHIPPING)}.` : gap > 0 ? `Mai ai ${lei(gap)} până la livrarea gratuită.` : 'Livrarea este gratuită.'}</p>
            <span className={s.bar} aria-hidden><span style={{ width: `${Math.min(100, (total / FREE_SHIPPING) * 100)}%` }} /></span>
          </div>
          <p className={s.total}><span>Subtotal</span><span className="num">{lei(total)}</span></p>
          <button type="button" className="btn" disabled>Finalizează comanda</button>
          <p className="t-micro muted">Concept: checkout-ul, plata și contul rămân în WooCommerce și nu sunt simulate aici.</p>
        </div>
      </aside>
    </div>
  );
}
