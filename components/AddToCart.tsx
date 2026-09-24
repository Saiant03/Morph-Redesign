'use client';
import { cart, type CartItem } from '@/lib/cart';

/** Adds one or more items to the mock cart and opens the drawer (the drawer is the confirmation). */
export function AddToCart({ items, children, className = 'btn', ...rest }: { items: CartItem[]; children: React.ReactNode; className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={className} onClick={() => cart.add(items)} {...rest}>{children}</button>;
}
