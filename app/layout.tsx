import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Morph — concept prototypes',
  description: 'Private concept prototypes for a Morph Parfum redesign. Not affiliated with or published by Morph.',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

// ?capture hides the internal prototype bar for screenshots
const captureScript = `if(/[?&]capture/.test(location.search))document.documentElement.classList.add('capture')`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <head>
        <script dangerouslySetInnerHTML={{ __html: captureScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
