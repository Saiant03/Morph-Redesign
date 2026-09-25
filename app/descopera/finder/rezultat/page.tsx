import Link from 'next/link';
import { Stage } from '@/components/Stage';
import { ProductVisual } from '@/components/ProductVisual';
import { NotePyramid } from '@/components/NotePyramid';
import { AddToCart } from '@/components/AddToCart';
import { TryOffer } from '@/components/TryOffer';
import { TryToggle } from '@/components/TryToggle';
import { OpenNow } from '@/components/OpenNow';
import {
  type Perfume, COLLECTIONS, concentration, descriptor, familyGroup, hours, lei, productHref, BOUTIQUE, fullItem, travelFor,
} from '@/lib/catalog';
import { QUESTIONS, WEIGHTS, UNTAGGED, parseAnswers, complete, results, reasons, answersQuery, finderSnapshotAt, type Answers } from '@/lib/finder';
import s from './result.module.css';

export const metadata = { title: 'Rezultatul Fragrance Finder' };

type Match = ReturnType<typeof results>[number];

/**
 * The consultation resolves into an object (docs/design/phase-c3-discover-finder.md): the first result stands on
 * the night stage (obj-<slug>, so the Finder's lit bottle lands here and this one lands on its product page), then
 * why Morph's tags match the answers, then the other results in the order Morph's selection returns them.
 */
export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const answers = parseAnswers(await searchParams);
  const query = answersQuery(answers);

  if (!complete(answers)) {
    return (
      <div className={s.incomplete} data-tone="dark">
        <div className="wrap">
          <h1 className="t-2">Mai sunt întrebări fără răspuns</h1>
          <p className="muted">Rezultatul se calculează după toate cele {QUESTIONS.length} răspunsuri.</p>
          <Link className="btn" href={`/descopera/finder${query ? `?${query}` : ''}`}>Continuă Fragrance Finder</Link>
        </div>
      </div>
    );
  }

  const list = results(answers);
  const [main, ...alts] = list;
  const w = Object.values(WEIGHTS);
  const any = answers.q7 === 'any';
  const p = main.p;
  const fam = familyGroup(p);

  return (
    <div className={s.page}>
      <section className={s.scene} data-tone="dark" aria-labelledby="potrivire">
        <div className={`wrap ${s.sceneGrid}`}>
          <Link href={productHref(p)} className={s.stageLink} aria-label={`Pagina parfumului ${p.shortName}`}>
            <Stage p={p} vt priority sizes="(max-width: 899px) 100vw, 52vw" alt="" className={s.stage} />
          </Link>
          <div className={s.sceneInfo}>
            <nav className="t-small muted" aria-label="Breadcrumb"><Link href="/descopera">Descoperă</Link> <span aria-hidden>/</span> <Link href={`/descopera/finder?${query}&pas=${QUESTIONS.length}`}>Fragrance Finder</Link> <span aria-hidden>/</span> <span aria-current="page">Rezultat</span></nav>
            <h1 id="potrivire" className={`t-display ${s.name}`}>{p.shortName}</h1>
            <p className={s.lead}>
              {alts.length === 0 ? `Finder-ul Morph îți propune ${p.shortName}.`
                : any ? `Finder-ul Morph îți propune ${p.shortName} și încă ${alts.length === 1 ? 'un parfum' : 'două parfumuri'}, câte unul din fiecare colecție.`
                : `Finder-ul Morph îți propune ${p.shortName} și încă un parfum din ${COLLECTIONS[p.collection].name}.`}
            </p>
            <p className="label muted">{COLLECTIONS[p.collection].name} · {concentration(p)} · 100 ml{!p.inStock && ' · momentan epuizat'}</p>
            <p className={s.notesLine}>{descriptor(p)}</p>
            <Buy p={p} />
            <p className={s.more}><Link className="link" href={productHref(p)}>Intră în pagina parfumului</Link><TryToggle id={p.slug} name={p.shortName} /></p>
          </div>
        </div>
      </section>

      <section className={`wrap ${s.why}`} aria-labelledby="de-ce">
        <div className={s.whyText}>
          <h2 id="de-ce" className="t-1">De ce {p.shortName}</h2>
          <Reasons m={main} answers={answers} id="de-ce" />
        </div>
        <div className={s.whyFacts}>
          <dl className={s.facts}>
            <div><dt className="label muted">Familie</dt><dd>{fam?.name ?? '—'}{fam && p.family !== fam.name ? <span className="muted t-small"> ({p.family?.toLowerCase()})</span> : null}</dd></div>
            <div><dt className="label muted">Intensitate</dt><dd>{p.intensity ?? 'Nespecificată'}</dd></div>
            <div><dt className="label muted">Pe piele</dt><dd className="num">{hours(p) ?? '—'}</dd></div>
            <div><dt className="label muted">Disponibil</dt><dd>{p.inStock ? '100 ml în stoc' : '100 ml epuizat'}{travelFor(p) ? ', travel 2×8 ml' : ''}</dd></div>
          </dl>
          <NotePyramid p={p} />
        </div>
      </section>

      {alts.length > 0 && (
        <section className={`wrap ${s.others}`} aria-labelledby="celelalte">
          <div className={s.head}>
            <h2 id="celelalte" className="t-1">{any ? 'Din celelalte colecții' : `Tot din ${COLLECTIONS[p.collection].name}`}</h2>
            <p className="muted">{any ? 'Ai ales oricare colecție, așa că finder-ul Morph propune câte un parfum din fiecare, în ordinea potrivirii.' : 'Al doilea parfum pe care finder-ul Morph îl propune în colecția aleasă.'}</p>
          </div>
          <div className={s.alts}>{alts.map(m => <AltMatch key={m.p.slug} m={m} main={main} answers={answers} any={any} />)}</div>
          <p className={s.compose}><Link className="link" href={`/layering?a=${p.slug}&b=${alts[0].p.slug}`}>Compune {p.shortName} cu {alts[0].p.shortName} în Layering</Link></p>
        </section>
      )}

      <section className={`wrap ${s.foot}`} aria-labelledby="raspunsuri">
        <div className={s.recap}>
          <h2 id="raspunsuri" className="t-3">Răspunsurile tale</h2>
          <dl className={s.answers}>
            {QUESTIONS.map((q, k) => (
              <div key={q.id}>
                <dt className="t-micro muted">{q.label}</dt>
                <dd>{q.answers.find(a => a.tag === answers[q.id])?.label} <Link className={`link t-small muted ${s.change}`} href={`/descopera/finder?${query}&pas=${k + 1}`} aria-label={`Schimbă răspunsul la: ${q.label}`}>Schimbă</Link></dd>
              </div>
            ))}
          </dl>
          <Link className={`link t-small ${s.change}`} href="/descopera/finder">Refă de la început</Link>
        </div>
        <div className={s.boutique} data-tone="wood">
          <h2 className="t-2">Pe piele, în {BOUTIQUE.name.replace('Magazinul', 'magazinul')}</h2>
          <p>Parfumurile de mai sus se pot încerca în magazin, cu echipa Morph alături.</p>
          <div className="t-small">
            <p>{BOUTIQUE.address}</p>
            <OpenNow />
            <p className="muted num">{BOUTIQUE.hours.join(' · ')}</p>
          </div>
          <Link className="btn btn-secondary" href={BOUTIQUE.href}>Vezi magazinul</Link>
        </div>
        <p className={`${s.source} t-micro muted`}>
          Rezultatul folosește întrebările, etichetele și ponderile din Fragrance Finder-ul Morph (morphparfum.ro/quiz, preluate pe {finderSnapshotAt.slice(0, 10)}), cu aceeași regulă de selecție.
          Ponderile merg de la {Math.min(...w)} la {Math.max(...w)}. {UNTAGGED.map(x => x.shortName).join(', ')} nu au etichete în finder, deci nu apar ca rezultat.
        </p>
      </section>
    </div>
  );
}

/** Each answer, and whether Morph tagged this perfume with it. A filled mark and the words say it, not colour. */
function Reasons({ m, answers, id }: { m: Match; answers: Answers; id: string }) {
  const r = reasons(m.tags, answers);
  const hit = r.filter(x => x.matched).length;
  return (
    <div className={s.reasons}>
      <p className={s.reasonsLead}>Morph l-a etichetat cu <span className="num">{hit}</span> din cele <span className="num">{r.length}</span> răspunsuri ale tale.{answers.q7 === 'any' && ' La colecție ai ales oricare, deci ea nu contează.'}</p>
      <ul aria-labelledby={id}>
        {r.map(x => (
          <li key={x.category} data-hit={x.matched}>
            <span className={s.mark} aria-hidden />
            <span className="label muted">{x.category}</span>
            <span className={s.answer}>{x.answer}</span>
            <span className={`t-small ${x.matched ? '' : 'muted'}`}>{x.matched ? 'etichetat așa' : 'nu e etichetat așa'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Buy({ p, quiet }: { p: Perfume; quiet?: boolean }) {
  return (
    <div className={s.buy}>
      {p.inStock
        ? <AddToCart className={quiet ? 'btn btn-secondary' : undefined} items={[fullItem(p)]}>Adaugă 100 ml în coș <span className="num">{lei(p.price)}</span></AddToCart>
        : <Link className="btn btn-secondary" href={productHref(p)}>Stoc epuizat. Anunță-mă</Link>}
      <TryOffer p={p} />
    </div>
  );
}

function AltMatch({ m, main, answers, any }: { m: Match; main: Match; answers: Answers; any: boolean }) {
  const p = m.p;
  const r = reasons(m.tags, answers);
  const hit = r.filter(x => x.matched);
  return (
    <article className={s.alt}>
      <Link href={productHref(p)} tabIndex={-1} aria-hidden className={s.altObject}><ProductVisual p={p} vt sizes="(max-width: 899px) 40vw, 22vw" alt="" className={s.altVisual} /></Link>
      <div className={s.altInfo}>
        <h3 className={s.altName}><Link href={productHref(p)}>{p.shortName}</Link></h3>
        <p className="label muted">{any ? `Din ${COLLECTIONS[p.collection].name}` : COLLECTIONS[p.collection].name} · {concentration(p)}</p>
        <p className={s.altNotes}>{descriptor(p)}</p>
        <p className="t-small">
          Morph l-a etichetat cu <span className="num">{hit.length}</span> din cele <span className="num">{r.length}</span> răspunsuri
          {hit.length > 0 && <>: {hit.map(x => x.answer.toLowerCase()).join(', ')}</>}.
          {m.score === main.score && <span className="muted"> La fel de aproape de răspunsurile tale ca {main.p.shortName}.</span>}
        </p>
        <p className="t-small muted">{familyGroup(p)?.name ?? 'Familie nespecificată'} · <span className="num">{hours(p) ?? '—'}</span> pe piele · intensitate {p.intensity?.toLowerCase() ?? 'nespecificată'}</p>
        <Buy p={p} quiet />
        <p className={s.more}><Link className="link" href={productHref(p)}>Pagina parfumului</Link><TryToggle id={p.slug} name={p.shortName} /></p>
      </div>
    </article>
  );
}
