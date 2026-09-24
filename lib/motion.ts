'use client';
import { useLayoutEffect, useEffect, type RefObject, type DependencyList } from 'react';
import { gsap } from 'gsap';

const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/** Motion tokens (seconds), mirrored as CSS variables in globals.css. */
export const T = { fast: 0.16, base: 0.32, slow: 0.64, story: 0.9 };
export const EASE = { out: 'power3.out', inOut: 'power3.inOut' };

/**
 * GSAP setup scoped to `scope`, run only when the visitor has not asked for reduced motion.
 * Everything created inside is reverted on unmount or dependency change (gsap.matchMedia).
 */
export function useMotion(scope: RefObject<HTMLElement | null>, setup: (ctx: { isDesktop: boolean }) => void | (() => void), deps: DependencyList = []) {
  useIso(() => {
    if (!scope.current) return;
    const mm = gsap.matchMedia(scope.current);
    mm.add({ ok: '(prefers-reduced-motion: no-preference)', isDesktop: '(min-width: 900px)' }, ctx => {
      const { ok, isDesktop } = ctx.conditions as { ok: boolean; isDesktop: boolean };
      if (!ok) return;
      return setup({ isDesktop });
    });
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export { gsap };
