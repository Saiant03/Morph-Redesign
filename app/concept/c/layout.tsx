import { Instrument_Sans, Instrument_Serif } from 'next/font/google';
import { ConceptBar } from '@/components/shared/ConceptBar';
import s from './strata.module.css';

const sans = Instrument_Sans({ subsets: ['latin', 'latin-ext'], variable: '--c-sans', display: 'swap' });
const serif = Instrument_Serif({ subsets: ['latin', 'latin-ext'], weight: '400', style: ['normal', 'italic'], variable: '--c-serif', display: 'swap' });

export default function StrataLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${sans.variable} ${serif.variable} ${s.root}`}>
      {children}
      <ConceptBar />
    </div>
  );
}
