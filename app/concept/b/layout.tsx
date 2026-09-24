import { Archivo } from 'next/font/google';
import { ConceptBar } from '@/components/shared/ConceptBar';
import s from './forma.module.css';

const archivo = Archivo({ subsets: ['latin', 'latin-ext'], axes: ['wdth'], variable: '--b-sans', display: 'swap' });

export default function FormaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${archivo.variable} ${s.root}`}>
      {children}
      <ConceptBar />
    </div>
  );
}
