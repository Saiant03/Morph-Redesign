import Link from 'next/link';
import { ProductVisual } from '@/components/ProductVisual';
import { NotePyramid } from '@/components/NotePyramid';
import { AddToCart } from '@/components/AddToCart';
import { TryOffer } from '@/components/TryOffer';
import { TryToggle } from '@/components/TryToggle';
import { LayeringComposer } from '@/components/LayeringComposer';
import {
  type Perfume, COLLECTIONS, concentration, descriptor, familyGroup, hours, lei, productHref, BOUTIQUE, fullItem, travelFor,
} from '@/lib/catalog';
import { QUESTIONS, WEIGHTS, UNTAGGED, parseAnswers, complete, results, reasons, answersQuery, finderSnapshotAt } from '@/lib/finder';
import s from './result.module.css';

export const metadata = { title: 'Rezultatul Fragrance Finder' };

type Match = ReturnType<typeof results>[number];

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const answers = parseAnswers(await searchParams);
  const query = answersQuery(answers);

  if (!complete(answers)) {
    return (
      <div className={`wrap ${s.incomplete}`}>
        <h1 className="t-2">Mai sunt întrebări fără răspuns</h1>
        <p className="muted">Rezultatul se calculează după toate cele {QUESTIONS.length} răspunsuri.</p>
        <Link className="btn" href={`/descopera/finder${query ? `?${query}` : ''}`}>Continuă Fragrance Finder</Link>
      </div>
    );
  }

  const list = results(answers);
  const [main, ...alts] = list;
  const w = Object.values(WEIGHTS);

  return (
    <div className={s.page}>
      <MainMatch m={main} answers={answers} single={alts.length === 0} />

      {alts.length > 0 && (
        <section className={`wrap ${s.section}`} aria-labelledby="alternative">
          <div className={s.head}>
            <h2 id="alternative" className="t-2">{alts.length === 1 ? 'Alternativa' : 'Alternativele'}</h2>
            <p className="muted">{answers.q7 === 'any' ? 'Ai ales oricare colecție, așa că finder-ul Morph propune câte un parfum din fiecare.' : `Tot din ${COLLECTIONS[main.p.collection].name}, următorul ca potrivire.`}</p>
          </div>
          <div className={s.alts}>{alts.map(m => <AltMatch key={m.p.slug} m={m} answers={answers} />)}</div>
        </section>
      )}

      {alts.length > 0 && (
        <section className={`band ${s.combine}`} data-tone="dark" aria-labelledby="impreuna">
          <div className="wrap">
            <LayeringComposer first={main.p.slug} second={alts[0].p.slug} heading={`${main.p.shortName} și ${alts[0].p.shortName}, împreună`} headingId="impreuna"
              intro="Primele două rezultate, purtate unul peste altul. Vezi cum se așază notele lor, de la deschidere la bază." />
          </div>
        </section>
      )}

      <section className={`wrap ${s.section} ${s.foot}`} aria-labelledby="raspunsuri">
        <div>
          <h2 id="raspunsuri" className="t-3">Răspunsurile tale</h2>
          <dl className={s.answers}>
            {QUESTIONS.map((q, k) => (
              <div key={q.id}>
                <dt className="t-micro muted">{q.label}</dt>
                <dd>{q.answers.find(a => a.tag === answers[q.id])?.label} <Link className="link t-small muted" href={`/descopera/finder?${query}&pas=${k + 1}`} aria-label={`Schimbă răspunsul la: ${q.label}`}>Schimbă</Link></dd>
              </div>
            ))}
          </dl>
          <Link className="link t-small" href="/descopera/finder">Refă de la început</Link>
        </div>
        <div className={s.boutique}>
          <h2 className="t-3">Pe piele, în {BOUTIQUE.short}</h2>
          <p className="muted">Parfumurile de mai sus se pot încerca în magazin, cu echipa Morph alături. {BOUTIQUE.address}. {BOUTIQUE.hours.join(', ')}.</p>
          <Link className="btn btn-secondary" href={BOUTIQUE.href}>Vezi magazinul</Link>
        </div>
        <p className={`${s.source} t-micro muted`}>
          Rezultatul folosește întrebările, etichetele și ponderile din Fragrance Finder-ul Morph (morphparfum.ro/quiz, preluate pe {finderSnapshotAt.slice(0, 10)}), cu aceeași regulă de selecție.
          Ponderile merg de la {Math.min(...w)} la {Math.max(...w)}. {UNTAGGED.map(p => p.shortName).join(', ')} nu au etichete în finder, deci nu apar ca rezultat.
        </p>
      </section>
    </div>
  );
}

function Reasons({ m, answers }: { m: Match; answers: ReturnType<typeof parseAnswers> }) {
  const r = reasons(m.tags, answers);
  const hit = r.filter(x => x.matched);
  return (
    <div className={s.reasons}>
      <p className="t-small"><b>De ce {m.p.shortName}</b>: Morph l-a etichetat cu <span className="num">{hit.length}</span> din cele <span className="num">{r.length}</span> răspunsuri ale tale.</p>
      <ul>
        {r.map(x => (
          <li key={x.category} data-hit={x.matched}>
            <span className={s.mark} aria-hidden>{x.matched ? '✓' : '–'}</span>
            <span className="label muted">{x.category}</span>
            <span>{x.answer}<span className="sr-only">{x.matched ? ': se potrivește' : ': nu se potrivește'}</span></span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Buy({ p }: { p: Perfume }) {
  return (
    <div className={s.buy}>
      {p.inStock
        ? <AddToCart items={[fullItem(p)]}>Adaugă 100 ml în coș <span className="num">{lei(p.price)}</span></AddToCart>
        : <Link className="btn btn-secondary" href={productHref(p)}>Stoc epuizat. Anunță-mă</Link>}
      <TryOffer p={p} />
    </div>
  );
}

function MainMatch({ m, answers, single }: { m: Match; answers: ReturnType<typeof parseAnswers>; single: boolean }) {
  const p = m.p;
  const fam = familyGroup(p);
  return (
    <section className={`wrap ${s.main}`} aria-labelledby="potrivire">
      <div className={s.mainVisual}><ProductVisual p={p} sizes="(max-width: 899px) 100vw, 50vw" priority alt={p.name} className={s.visual} /></div>
      <div className={s.mainInfo}>
        <nav className="t-small muted" aria-label="Breadcrumb"><Link href="/descopera/finder">Fragrance Finder</Link> / Rezultat</nav>
        <h1 id="potrivire" className={s.title}>
          <span className="label muted">{single ? 'Morph-ul tău' : 'Morph-ul tău · potrivirea principală'}</span>
          <span className="t-display">{p.shortName}</span>
        </h1>
        <p className="label muted">{COLLECTIONS[p.collection].name} · {concentration(p)} · 100 ml{!p.inStock && ' · momentan epuizat'}</p>
        <p className={s.notesLine}>{descriptor(p)}</p>
        <Buy p={p} />
        <p className={s.more}><Link className="link t-small" href={productHref(p)}>Pagina parfumului</Link><TryToggle id={p.slug} name={p.shortName} /></p>
        <Reasons m={m} answers={answers} />
        <dl className={s.facts}>
          <div><dt className="label muted">Familie</dt><dd>{fam?.name ?? '—'}{fam && p.family !== fam.name ? <span className="muted t-small"> ({p.family?.toLowerCase()})</span> : null}</dd></div>
          <div><dt className="label muted">Intensitate</dt><dd>{p.intensity ?? 'Nespecificată'}</dd></div>
          <div><dt className="label muted">Pe piele</dt><dd className="num">{hours(p) ?? '—'}</dd></div>
          <div><dt className="label muted">Disponibil</dt><dd>{p.inStock ? '100 ml în stoc' : '100 ml epuizat'}{travelFor(p) ? ', travel 2×8 ml' : ''}</dd></div>
        </dl>
        <NotePyramid p={p} />
      </div>
    </section>
  );
}

function AltMatch({ m, answers }: { m: Match; answers: ReturnType<typeof parseAnswers> }) {
  const p = m.p;
  return (
    <article className={s.alt}>
      <Link href={productHref(p)} tabIndex={-1} aria-hidden><ProductVisual p={p} sizes="(max-width: 899px) 40vw, 20vw" alt="" className={s.altVisual} /></Link>
      <div className={s.altInfo}>
        <p className="label muted">{COLLECTIONS[p.collection].name}</p>
        <h3 className={s.altName}><Link href={productHref(p)}>{p.shortName}</Link></h3>
        <p className={s.notesLine}>{descriptor(p)}</p>
        <p className="t-small muted">{familyGroup(p)?.name ?? 'Familie nespecificată'}, <span className="num">{hours(p) ?? '—'}</span>, intensitate {p.intensity?.toLowerCase() ?? 'nespecificată'}</p>
        <Reasons m={m} answers={answers} />
        <Buy p={p} />
        <TryToggle id={p.slug} name={p.shortName} />
      </div>
    </article>
  );
}
