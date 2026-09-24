'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/** Marks the document once the visitor has navigated inside the site; enables the page entrance (T1). */
export function NavState() {
  const path = usePathname();
  const first = useRef(path);
  useEffect(() => {
    if (path !== first.current) document.documentElement.dataset.nav = '';
  }, [path]);
  return null;
}
