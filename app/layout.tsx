import type { Metadata, Viewport } from 'next';
import { Schibsted_Grotesk } from 'next/font/google';
import { SiteHeader } from '@/components/SiteHeader';
import { CartDrawer } from '@/components/CartDrawer';
import { Footer } from '@/components/Footer';
import './globals.css';

const sans = Schibsted_Grotesk({ subsets: ['latin', 'latin-ext'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  title: { default: 'Morph Parfum — concept', template: '%s — Morph concept' },
  description: 'Concept privat de redesign pentru morphparfum.ro. Nu este publicat și nu este un site Morph.',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#edeeeb' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={sans.variable}>
      <body>
        <a href="#continut" className="skip">Sari la conținut</a>
        <SiteHeader />
        <main id="continut">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
