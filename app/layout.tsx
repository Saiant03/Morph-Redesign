import type { Metadata, Viewport } from 'next';
import { Schibsted_Grotesk, Newsreader } from 'next/font/google';
import { SiteHeader } from '@/components/SiteHeader';
import { CartDrawer } from '@/components/CartDrawer';
import { SearchOverlay } from '@/components/SearchOverlay';
import { Footer } from '@/components/Footer';
import { NavState } from '@/components/NavState';
import './globals.css';

const sans = Schibsted_Grotesk({ subsets: ['latin', 'latin-ext'], variable: '--font-sans', display: 'swap' });
// Display serif for fragrance names and chapter titles only; optical size follows the font size.
const serif = Newsreader({ subsets: ['latin', 'latin-ext'], variable: '--font-serif', display: 'swap', style: ['normal', 'italic'], axes: ['opsz'] });

export const metadata: Metadata = {
  title: { default: 'Morph Parfum — concept', template: '%s — Morph concept' },
  description: 'Concept privat de redesign pentru morphparfum.ro. Nu este publicat și nu este un site Morph.',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#151210' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a href="#continut" className="skip">Sari la conținut</a>
        <SiteHeader />
        <main id="continut">{children}</main>
        <Footer />
        <CartDrawer />
        <SearchOverlay />
        <NavState />
      </body>
    </html>
  );
}
