'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Logo } from './Logo';
import { cart, useCart } from '@/lib/cart';
import { search } from '@/lib/search';
import { NAV, type NavLink } from '@/lib/nav';
import s from './SiteHeader.module.css';

const isCurrent = (n: (typeof NAV)[number], path: string) =>
  n.href.startsWith('/') && (n.match ? n.match.test(path) : path === n.href || path.startsWith(n.href + '/'));

// Jurnal lives on morphparfum.ro: it opens there, and says so
const Item = ({ l, onClick }: { l: NavLink; onClick?: () => void }) => l.ext
  ? <a href={l.href} target="_blank" rel="noopener">{l.label}<span className="sr-only"> (pe morphparfum.ro, se deschide într-o filă nouă)</span><span aria-hidden> ↗</span></a>
  : <Link href={l.href} onClick={onClick}>{l.label}</Link>;

/**
 * The header takes the tone of the chapter under it (SECTION → TRANSITION): dark over the night and wood rooms,
 * stone over the lit ones. It reads the element just below its bottom edge on scroll.
 */
export function SiteHeader() {
  const path = usePathname() || '/';
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  // a desktop panel opens on hover or focus; after a choice it stays shut until the pointer leaves the header
  const [shut, setShut] = useState(false);
  const choose = () => { setShut(true); (document.activeElement as HTMLElement | null)?.blur(); };
  const [tone, setTone] = useState<string | undefined>(undefined);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const h = ref.current?.offsetHeight ?? 64;
      const el = document.elementFromPoint(window.innerWidth / 2, h + 2);
      const t = el?.closest('[data-tone]')?.getAttribute('data-tone');
      setTone(t === 'wood' ? 'dark' : t ?? undefined);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(read); };
    read();
    const late = setTimeout(read, 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { clearTimeout(late); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [path]);

  return (
    <header ref={ref} className={s.header} data-open={open} data-tone={open ? undefined : tone} style={{ viewTransitionName: 'site-header' }} onMouseLeave={() => setShut(false)}>
      <div className={`wrap ${s.inner}`}>
        <Link href="/" className={s.logo} aria-label="Morph, pagina principală"><Logo /></Link>
        <nav className={s.nav} aria-label="Principal" data-shut={shut}>
          {NAV.map(n => (
            <div key={n.label} className={s.item}>
              <Link href={n.href} className={s.top} aria-current={isCurrent(n, path) ? 'page' : undefined} onClick={choose}>{n.label}</Link>
              <div className={s.panel}>
                <div className={`wrap ${s.panelGrid}`}>
                  {n.groups.map(g => (
                    <div key={g.title}>
                      <p className="label muted">{g.title}</p>
                      <ul>{g.links.map(l => <li key={l.label}><Item l={l} onClick={choose} /></li>)}</ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>
        <div className={s.utils}>
          <button type="button" className={s.util} onClick={search.open} aria-haspopup="dialog">Caută</button>
          <button type="button" className={s.util} onClick={cart.open} aria-label={`Coș, ${count} ${count === 1 ? 'produs' : 'produse'}`}>
            Coș <span className={`${s.count} num`} data-empty={count === 0}>{count}</span>
          </button>
          <button type="button" className={`${s.util} ${s.menuBtn}`} aria-expanded={open} aria-controls="meniu" onClick={() => setOpen(!open)}>
            {open ? 'Închide' : 'Meniu'}
          </button>
        </div>
      </div>
      <nav id="meniu" className={s.sheet} aria-label="Meniu" hidden={!open}>
        <ul className="wrap">
          {NAV.map(n => (
            <li key={n.label}>
              <Link href={n.href} onClick={() => setOpen(false)} aria-current={isCurrent(n, path) ? 'page' : undefined}>{n.label}</Link>
              {n.groups.map(g => (
                <div key={g.title} className={s.sub}>
                  {g.title !== n.label && <p className="label muted">{g.title}</p>}
                  <ul>{g.links.filter(l => l.href !== n.href).map(l => <li key={l.label}><Item l={l} onClick={() => setOpen(false)} /></li>)}</ul>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
