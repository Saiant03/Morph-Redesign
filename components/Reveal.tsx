'use client';
import { useEffect, useRef } from 'react';

/**
 * IMAGE → REVEAL. The wrapped image unmasks upward the first time it enters the viewport. Used only on the few
 * editorial images that open a chapter, never on text or product rows. Server HTML is visible; without JS or with
 * reduced motion nothing is hidden. `crop` (IMAGE → CROP) settles the image from a slight scale instead of unmasking it.
 */
export function Reveal({ children, className = '', crop }: { children: React.ReactNode; className?: string; crop?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const box = ref.current, el = inner.current;
    if (!box || !el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = box.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.9) return;
    const key = crop ? 'crop' : 'reveal';
    el.dataset[key] = 'hidden';
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.dataset[key] = 'shown'; io.disconnect(); }
    }, { rootMargin: '0px 0px -12% 0px' });
    io.observe(box); // the unclipped wrapper: a clipped target never reports an intersection
    return () => io.disconnect();
  }, [crop]);
  return <div ref={ref} className={className}><div ref={inner} {...(crop ? { 'data-crop': 'shown' } : { 'data-reveal': 'shown' })}>{children}</div></div>;
}
