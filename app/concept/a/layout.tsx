import { Schibsted_Grotesk } from 'next/font/google';
import { ConceptBar } from '@/components/shared/ConceptBar';
import s from './cromatic.module.css';

const sans = Schibsted_Grotesk({ subsets: ['latin', 'latin-ext'], variable: '--a-sans', display: 'swap' });

export default function CromaticLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${sans.variable} ${s.root}`}>
      {children}
      <ConceptBar />
    </div>
  );
}
