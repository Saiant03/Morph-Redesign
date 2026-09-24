import Link from 'next/link';
import { snapshotAt } from '@/lib/catalog';

const DIRS = [
  { id: 'a', name: 'A — Cromatic', idea: 'Culoarea fiecărei sticle devine sistemul vizual. Galerie calmă, editorială.' },
  { id: 'b', name: 'B — Forma', idea: 'Geometria sticlei răsucite devine structura interfeței. Monocrom, arhitectural.' },
  { id: 'c', name: 'C — Strata', idea: 'Parfumul ca straturi care evoluează în timp. Atmosferic, translucid.' },
];

export default function Index() {
  return (
    <main style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif', padding: '48px 24px', maxWidth: 960, margin: '0 auto', color: '#161616', lineHeight: 1.5 }}>
      <p style={{ fontSize: 13, color: '#666' }}>Uz intern · Faza 02 · prototipuri de direcție creativă</p>
      <h1 style={{ fontSize: 32, margin: '8px 0 8px', fontWeight: 600 }}>Morph — trei direcții</h1>
      <p style={{ color: '#444', maxWidth: 640 }}>
        Aceleași produse reale Morph (Store API, snapshot {snapshotAt.slice(0, 10)}) în trei limbaje vizuale. Pentru fiecare: homepage, colecția Luxury și pagina de produs Zeta.
        Concept privat; nu este un site Morph.
      </p>
      <div style={{ display: 'grid', gap: 16, marginTop: 32 }}>
        {DIRS.map(d => (
          <section key={d.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 20 }}>
            <h2 style={{ margin: 0, fontSize: 20 }}>{d.name}</h2>
            <p style={{ margin: '4px 0 12px', color: '#555' }}>{d.idea}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {['home', 'collection', 'product'].map(s => (
                <Link key={s} href={`/concept/${d.id}/${s}`} style={{ padding: '8px 14px', border: '1px solid #bbb', borderRadius: 999, textDecoration: 'none' }}>
                  /concept/{d.id}/{s}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
      <p style={{ fontSize: 13, color: '#777', marginTop: 32 }}>Cercetare: docs/research · Documentație fază: docs/design</p>
    </main>
  );
}
