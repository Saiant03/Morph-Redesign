'use client';
import { useEffect, useRef } from 'react';

/**
 * IMAGE → REVEAL. The wrapped image unmasks upward the first time it enters the viewport. Used only on the few
 * editorial images that open a chapter, never on text or product rows. Server HTML is visible; without JS or with
 * reduced motion nothing is hidden.
 */
export function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const box = ref.current, el = inner.current;
    if (!box || !el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = box.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.9) return;
    el.dataset.reveal = 'hidden';
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.dataset.reveal = 'shown'; io.disconnect(); }
    }, { rootMargin: '0px 0px -12% 0px' });
    io.observe(box); // the unclipped wrapper: a clipped target never reports an intersection
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={className}><div ref={inner} data-reveal="shown">{children}</div></div>;
}
