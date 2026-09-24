'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { cart, useCart } from '@/lib/cart';
import { FREE_SHIPPING, lei, imageFor, perfumes, travelFor, travelItem, bodyFor, bodyItem, giftBox, BODY_KIND } from '@/lib/catalog';
import s from './CartDrawer.module.css';

/** Something from the perfumes already in the cart (their travel size or same-scent shower gel) that crosses the
 *  free-shipping threshold at the lowest price. Only real products; nothing if none crosses it. */
function suggestion(keys: string[], gap: number) {
  if (gap <= 0) return null;
  const inCart = perfumes.filter(p => keys.includes(p.slug));
  const options = inCart.flatMap(p => {
    const t = travelFor(p);
    const gel = bodyFor(p).find(b => b.kind === 'gel' && b.inStock);
    return [
      ...(t && t.inStock ? [{ item: travelItem(p, t), label: `Travel 2×8 ml ${p.shortName}` }] : []),
      ...(gel ? [{ item: bodyItem(gel, p), label: `${BODY_KIND.gel.name} ${p.shortName}` }] : []),
    ];
  }).filter(o => !keys.includes(o.item.key) && o.item.price >= gap).sort((a, b) => a.item.price - b.item.price);
  return options[0] ?? null;
}

/**
 * Mock cart on the night tone: each line an object on a glass edge, quantities, the free-shipping threshold as a
 * sentence over a metal rule, one real suggestion, the gift box. Checkout is out of scope for the concept.
 */
export function CartDrawer() {
  const { items, open, total, count } = useCart();
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
  const next = suggestion(items.map(i => i.key), gap);
  const boxed = items.some(i => i.key === 'cutie');
  return (
    <div className={s.root} data-open={open} aria-hidden={!open} inert={!open}>
      <div className={s.scrim} onClick={cart.close} />
      <aside className={s.panel} data-tone="dark" role="dialog" aria-modal="true" aria-labelledby="cos-titlu">
        <div className={s.head}>
          <h2 id="cos-titlu" className="t-2">Coșul tău</h2>
          <span className="label muted num">{count} {count === 1 ? 'produs' : 'produse'}</span>
          <button ref={close} type="button" className={`${s.close} link`} onClick={cart.close}>Închide</button>
        </div>

        {items.length === 0 ? (
          <div className={s.empty}>
            <span className={s.unlit} aria-hidden />
            <p className="t-lede">Coșul e gol.</p>
            <p className="muted">Dacă nu știi încă ce parfum porți, începe cu un format mic: travel 2×8 ml sau un set de mostre.</p>
            <p className={s.emptyLinks}>
              <Link className="link" href="/parfumuri" onClick={cart.close}>Parfumurile</Link>
              <Link className="link" href="/descopera#incearca" onClick={cart.close}>Formatele de încercare</Link>
              <Link className="link" href="/descopera/finder" onClick={cart.close}>Fragrance Finder</Link>
            </p>
          </div>
        ) : (
          <ul className={s.items}>
            {items.map(i => {
              const img = imageFor(i.key);
              return (
                <li key={i.key} className={s.item}>
                  <span className={`niche-sm ${s.thumb}`} aria-hidden>{img && <Image src={img} alt="" fill sizes="72px" />}</span>
                  <span className={s.info}>
                    <b className={s.name}>{i.name}</b>
                    <span className="label muted">{i.format}</span>
                  </span>
                  <span className={`${s.price} num`}>{lei(i.price * i.qty)}</span>
                  <span className={s.qty} role="group" aria-label={`Cantitate ${i.name}`}>
                    <button type="button" onClick={() => cart.setQty(i.key, i.qty - 1)} aria-label={`Scade cantitatea pentru ${i.name}`}>−</button>
                    <span className="num" aria-live="polite">{i.qty}</span>
                    <button type="button" onClick={() => cart.setQty(i.key, i.qty + 1)} aria-label={`Crește cantitatea pentru ${i.name}`}>+</button>
                  </span>
                  <button type="button" className={`${s.remove} text-btn link t-small muted`} onClick={() => cart.remove(i.key)} aria-label={`Scoate ${i.name}, ${i.format}`}>Scoate</button>
                </li>
              );
            })}
          </ul>
        )}

        <div className={s.foot}>
          <div className={s.ship}>
            <p className="t-small">{items.length === 0 ? `Livrare gratuită de la ${lei(FREE_SHIPPING)}.` : gap > 0 ? `Mai ai ${lei(gap)} până la livrarea gratuită.` : 'Livrarea este gratuită.'}</p>
            <span className={s.bar} aria-hidden><span style={{ width: `${Math.min(100, (total / FREE_SHIPPING) * 100)}%` }} /></span>
            {next && (
              <p className={`${s.next} t-small`}>
                <span className="muted">Îl acoperă:</span> {next.label}, <span className="num">{lei(next.item.price)}</span>
                <button type="button" className="text-btn link" onClick={() => cart.add([next.item])}>Adaugă</button>
              </p>
            )}
          </div>
          {items.length > 0 && giftBox && (
            <label className={`${s.gift} t-small`}>
              <input type="checkbox" checked={boxed} onChange={e => e.target.checked ? cart.add([{ key: 'cutie', name: 'Cutie cadou', format: 'Ambalaj Morph', price: giftBox!.price }]) : cart.remove('cutie')} />
              <span>Cutie cadou, <span className="num">+{lei(giftBox.price)}</span></span>
            </label>
          )}
          <p className={s.total}><span>Subtotal</span><span className="num">{lei(total)}</span></p>
          <button type="button" className="btn" disabled>Finalizează comanda</button>
          <p className="t-micro muted">Concept: checkout-ul, plata și contul rămân în WooCommerce și nu sunt simulate aici. Coșul se golește la reîncărcarea paginii.</p>
        </div>
      </aside>
    </div>
  );
}
