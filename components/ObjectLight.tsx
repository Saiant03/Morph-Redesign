'use client';
import { useEffect, useRef } from 'react';

const clamp = (v: number) => Math.min(1, Math.max(0, v));

/**
 * 2.5D object (docs/design/phase-b5-asset-transition.md): light laid on the glass only, through the packshot's
 * silhouette (scripts/lightmask.mjs). It sets --lx/--ly (where the light is) and --ry (a tilt of at most 4°) on
 * its parent; the parent's CSS interpolates them. Pointer on desktop; on phones the light crosses the glass as the
 * object passes through the screen ('stage'), or stays still ('hover'). Reduced motion: still light.
 */
export function ObjectLight({ mask, className, mode = 'stage' }: { mask: string; className: string; mode?: 'stage' | 'hover' }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0, x = 0.38, y = 0.3, tilt = 0;
    const apply = () => {
      raf = 0;
      host.style.setProperty('--lx', `${(x * 100).toFixed(1)}%`);
      host.style.setProperty('--ly', `${(y * 100).toFixed(1)}%`);
      host.style.setProperty('--ry', `${tilt.toFixed(2)}deg`);
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(apply); };
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const move = (e: PointerEvent) => {
        const r = host.getBoundingClientRect();
        x = clamp((e.clientX - r.left) / r.width); y = clamp((e.clientY - r.top) / r.height) * 0.7;
        tilt = mode === 'stage' ? (x - 0.5) * 8 : 0;
        queue();
      };
      const leave = () => { x = 0.38; y = 0.3; tilt = 0; queue(); };
      host.addEventListener('pointermove', move);
      host.addEventListener('pointerleave', leave);
      return () => { host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave); if (raf) cancelAnimationFrame(raf); };
    }
    if (mode === 'hover') return;
    const scroll = () => {
      const r = host.getBoundingClientRect();
      x = 0.15 + 0.7 * clamp((innerHeight - r.top) / (innerHeight + r.height)); y = 0.25;
      queue();
    };
    scroll();
    addEventListener('scroll', scroll, { passive: true });
    return () => { removeEventListener('scroll', scroll); if (raf) cancelAnimationFrame(raf); };
  }, [mode]);
  // the key light is behind-above: the streak is brightest on the shoulders and gone before the base, where its
  // lower end used to run along the edge of the bottle as a hard line (second mask layer, intersected in CSS)
  const m = `url(${mask}), linear-gradient(to bottom, #000 38%, transparent 66%)`;
  return <span ref={ref} className={className} aria-hidden style={{ maskImage: m, WebkitMaskImage: m }} />;
}
