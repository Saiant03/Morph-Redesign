import { ViewTransition } from 'react';

/**
 * PAGE → STATE. A template remounts on every navigation. The empty marker entering and leaving makes React run a
 * view transition, so named objects morph (T2) while the header, which has its own name, stays (T0). React leaves
 * the rest of the page live, so the relight (T1) is a CSS entrance on the new content, enabled after the first
 * navigation only (components/NavState), so it never doubles the home entrance.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ViewTransition enter="page" exit="page" default="none"><span className="vt-marker" aria-hidden /></ViewTransition>
      <div className="page-enter">{children}</div>
    </>
  );
}
