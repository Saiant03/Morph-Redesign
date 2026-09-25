import Link from 'next/link';
import Image from 'next/image';
import { AddToCart } from '@/components/AddToCart';
import { Niche } from '@/components/ProductVisual';
import { Stage } from '@/components/Stage';
import { OpenNow } from '@/components/OpenNow';
import { ObjectShelf } from '@/components/ObjectShelf';
import { FinderHorizon } from '@/components/FinderHorizon';
import { families, notesIndex, recurringNotes, noteHref, norm, type Family } from '@/lib/discover';
import { perfumes, HERO_SLUG, bySlug, MORPH_SAYS, travelSets, sampleSets, travelFor, lei, FREE_SHIPPING, productHref, BOUTIQUE, TRIAL, travelItem, offerItem, COLLECTIONS, type Offer } from '@/lib/catalog';
import { QUESTIONS, TAGGED, UNTAGGED } from '@/lib/finder';
import s from './descopera.module.css';

export const metadata = { title: 'Descoperă' };

/**
 * Descoperă (docs/design/phase-c3-discover-finder.md): from understanding to choosing. How Morph describes a
 * perfume (notes in time), five families, the notes, then the Finder as the natural next step, then trying.
 * Server-rendered; the only interaction beyond links is CSS (a note lights the bottles that carry it).
 */
export default function Page() {
  const fams = families();
  const index = notesIndex();
  const recurring = recurringNotes(4);
  const withTravel = perfumes.filter(p => travelFor(p));
  // the travel chapter's example: the house's hero scent, as bottle and as its travel box
  const hero = bySlug(HERO_SLUG), heroTravel = travelFor(hero)!;
  const offers = [...sampleSets, ...travelSets.filter(t => TRIAL[t.slug])].sort((a, b) => Number(b.inStock) - Number(a.inStock) || a.price - b.price);
  const q1 = QUESTIONS[0];
  const letters = [...new Set(index.map(n => n.key[0]))];

  return (
    <>
      <div className="wrap">
        <section className={s.opening} aria-labelledby="descopera-titlu">
          <div className={s.openText}>
            <nav className="t-small muted" aria-label="Breadcrumb"><Link href="/">Morph</Link> <span aria-hidden>/</span> <span aria-current="page">Descoperă</span></nav>
            <h1 id="descopera-titlu" className="t-display">Descoperă</h1>
            <p className={`t-lede ${s.lede}`}>Morph descrie fiecare parfum prin notele lui, în ordinea în care le simți pe piele: deschidere, inimă, bază. Pornește de la o familie sau de la o singură notă. Dacă vrei să fii ghidat, răspunde la cele {QUESTIONS.length} întrebări ale Fragrance Finder-ului Morph.</p>
            <nav className={s.path} aria-label="Pe această pagină">
              <a href="#familii"><span>Familiile</span><span className="t-small muted num">5 grupe, {perfumes.length} de parfumuri</span></a>
              <a href="#note"><span>Notele</span><span className="t-small muted num">{index.length} de note</span></a>
              <a href="#finder"><span>Fragrance Finder</span><span className="t-small muted num">{QUESTIONS.length} întrebări</span></a>
              <a href="#incearca"><span>Încearcă înainte de sticlă</span><span className="t-small muted">acasă sau în magazin</span></a>
            </nav>
          </div>
          <figure className={s.still}>
            <div className={s.stillImg}><Image src="/morph/campaign/extract-still-life.avif" alt="Sticla N8 din Les Exclusifs lângă un panou de sticlă striată, în care i se vede reflexia" fill priority sizes="(max-width: 899px) 100vw, 50vw" /></div>
            <figcaption className="t-small muted">N8, Les Exclusifs. Fotografie Morph.</figcaption>
            <blockquote className={s.quote}>
              <p>„estetica italiană cu precizia laboratorului”</p>
              <footer className="t-small muted">Morph, Despre noi</footer>
            </blockquote>
          </figure>
        </section>

        <section id="familii" className={s.families} aria-labelledby="familii-titlu">
          <div className={s.head}>
            <h2 id="familii-titlu" className="t-1">Cinci familii</h2>
            <p className="muted">Morph încadrează fiecare parfum într-o familie olfactivă. Aici cele {new Set(perfumes.map(p => p.family)).size} încadrări Morph sunt adunate în cinci grupe, o propunere a acestui concept. Sub fiecare nume: notele care apar cel mai des în parfumurile ei. Fiecare notă deschide vitrina cu parfumurile care o au.</p>
          </div>
          {fams.map((f, i) => <FamilyChapter key={f.id} f={f} flip={i % 2 === 1} />)}
        </section>

        <section id="note" className={s.notes} aria-labelledby="note-titlu">
          <div className={s.head}>
            <h2 id="note-titlu" className="t-1">Notele</h2>
            <p className="muted">Parfumurile Morph folosesc {index.length} de note. Acestea {recurring.length} revin cel mai des. Lângă fiecare parfum vezi unde apare nota: la deschidere, în inimă sau în bază.</p>
          </div>
          <ul className={s.recurring}>
            {recurring.map(n => (
              <li key={n.key}>
                <h3 className={s.noteName}><Link href={noteHref(n.name)}>{n.name}</Link></h3>
                <p className="label muted num">{n.where.length} parfumuri</p>
                <ul className={s.where}>
                  {n.where.map(w => <li key={w.p.slug}><Link className="link" href={productHref(w.p)}>{w.p.shortName}</Link> <span className="t-micro muted">{w.tier}</span></li>)}
                </ul>
              </li>
            ))}
          </ul>
          <details className={s.az}>
            <summary><span className="t-3">Toate cele {index.length} de note, de la A la Z</span><span className="t-small muted">Fiecare notă deschide vitrina cu parfumurile care o au.</span></summary>
            <div className={s.azBody}>
              {letters.map(l => (
                <div key={l} className={s.letter}>
                  <p className={`${s.letterMark} label muted`} aria-hidden>{l}</p>
                  <ul>{index.filter(n => n.key[0] === l).map(n => <li key={n.key}><Link className="link" href={noteHref(n.name)}>{n.name}</Link> <span className="t-micro muted num">{n.where.length}</span></li>)}</ul>
                </div>
              ))}
            </div>
          </details>
        </section>
      </div>

      <section id="finder" className={`band ${s.finder}`} data-tone="dark" aria-labelledby="finder-titlu">
        <div className={`wrap ${s.finderGrid}`}>
          <div className={s.finderIntro}>
            <h2 id="finder-titlu" className="t-1">Fragrance Finder</h2>
            <p className="t-lede">Dacă nu știi încă de unde să pornești, Morph te poate ghida. Finder-ul lui pune {QUESTIONS.length} întrebări: prezența pe care o vrei, ce te reprezintă, universul olfactiv, unde îl porți, cât de prezent să fie, anotimpul și colecția.</p>
            <p className="muted">La final primești două sau trei parfumuri Morph și vezi, pentru fiecare, cu care dintre răspunsurile tale l-a etichetat Morph.</p>
          </div>
          <form className={s.firstQ} action="/descopera/finder" method="get">
            <fieldset>
              <legend className="t-2">{q1.label}</legend>
              <p className="t-small muted">Prima întrebare din {QUESTIONS.length}. Alege un răspuns și continui în finder.</p>
              <div className={s.firstAnswers}>
                {q1.answers.map(a => (
                  <button key={a.tag} type="submit" name={q1.id} value={a.tag} className={s.firstAnswer}><span>{a.label}</span></button>
                ))}
              </div>
              <input type="hidden" name="pas" value="2" />
            </fieldset>
          </form>
        </div>
        <div className={`wrap ${s.finderHorizon}`}>
          <FinderHorizon />
          <p className="t-small muted">Cele {TAGGED.length} de parfumuri pe care Morph le-a etichetat în finder. {UNTAGGED.map(p => p.shortName).join(', ')} nu au etichete, deci nu apar ca rezultat.</p>
        </div>
      </section>

      <div className="wrap">
        <section id="incearca" className="section" aria-labelledby="incearca-titlu">
          <div className={s.head}>
            <h2 id="incearca-titlu" className="t-1">Încearcă înainte de sticlă</h2>
            <p className="muted">Un parfum se alege pe piele, în câteva zile. Acasă, cu formatele mici Morph; în persoană, în {BOUTIQUE.short} din București. Stocul e cel de la data instantaneului.</p>
          </div>
  
          <div id="travel" className={s.travel}>
            <div className={s.travelIntro}>
              <h3 className="t-2">Travel Editions</h3>
              <p className="t-small muted">Același parfum, în două flacoane de 8 ml, <span className="num">{lei(travelFor(withTravel[0])!.price)}</span>. Există pentru {withTravel.length} din cele {perfumes.length} de parfumuri.</p>
              <p className={s.travelQuote}>„{MORPH_SAYS.travel}” <span className="t-micro muted">Morph, Despre noi</span></p>
            </div>
            <div className={s.travelShelf}>
              <ObjectShelf p={hero} size="chapter" sizes="(max-width: 599px) 58vw, 26vw" label={`${hero.shortName}: sticla și Travel Editions`} items={[
                { key: hero.slug, src: hero.images[0], kind: 'Parfum', line: `100 ml · ${lei(hero.price)}`, of: hero.shortName },
                { key: heroTravel.slug, src: heroTravel.image!, kind: 'Travel', line: `2×8 ml · ${lei(heroTravel.price)}`, of: hero.shortName },
              ]} />
            </div>
            <ul className={s.travelList}>
              {withTravel.map(p => {
                const t = travelFor(p)!;
                return (
                  <li key={p.slug}>
                    <span className={`niche-sm ${s.travelImg}`} aria-hidden><Image src={t.image ?? p.images[0]} alt="" fill sizes="40px" /></span>
                    <Link className={s.travelName} href={productHref(p)}>{p.shortName}</Link>
                    <AddToCart className="text-btn link t-small muted" items={[travelItem(p, t)]} aria-label={`Adaugă ${p.shortName} travel 2×8 ml în coș`}>Adaugă</AddToCart>
                  </li>
                );
              })}
            </ul>
          </div>
  
          <ol className={s.offers}>{offers.map(o => <OfferRow key={o.slug} o={o} />)}</ol>
  
          <div className={s.person} data-tone="wood">
            <div>
              <h3 className="t-2">{BOUTIQUE.name}</h3>
              <p className="t-small muted">Parfumurile se încearcă și pe piele, în magazin.</p>
            </div>
            <div>
              <p>{BOUTIQUE.address}</p>
              <OpenNow />
              <p className="t-small muted num">{BOUTIQUE.hours.join(' · ')}</p>
            </div>
            <Link className="btn btn-secondary" href={BOUTIQUE.href}>Vezi magazinul</Link>
          </div>
          <p className={`${s.threshold} t-small muted`}>Livrarea e gratuită de la {lei(FREE_SHIPPING)}. O sticlă de {lei(Math.min(...perfumes.map(p => p.price)))} plus un travel trece pragul.</p>
        </section>

        <section className={`section ${s.next}`} aria-labelledby="mai-departe">
          <h2 id="mai-departe" className="t-2">Ai găsit unul? Adaugă-i un al doilea strat.</h2>
          <p className="muted">În Layering alegi două parfumuri și vezi cum se așază notele lor, etapă cu etapă, cu prețul pentru amândouă.</p>
          <Link className="btn btn-secondary" href="/layering">Deschide Layering</Link>
        </section>
      </div>
    </>
  );
}

/** One family: its object on the stage, its notes as words that light the bottles carrying them, its real ranges. */
function FamilyChapter({ f, flip }: { f: Family; flip: boolean }) {
  // which of the family's notes each perfume carries (indices into f.notes), for the CSS light on hover/focus
  const n = (p: (typeof f.items)[number]) => f.notes.map((note, k) => ([...p.notes.top, ...p.notes.heart, ...p.notes.base].some(x => norm(x).includes(norm(note))) ? k : -1)).filter(k => k >= 0).join(' ');
  const rest = f.items.filter(p => p.slug !== f.lead.slug);
  return (
    <article className={s.chapter} data-flip={flip ? '' : undefined} aria-labelledby={`familie-${f.id}`}>
      <div className={s.object} data-n={n(f.lead)}>
        <Link href={productHref(f.lead)} className={s.objectLink} aria-label={`${f.lead.shortName}, ${COLLECTIONS[f.lead.collection].name}`}>
          <Stage p={f.lead} vt sizes="(max-width: 899px) 60vw, 34vw" alt="" className={s.stage} />
          <span className={s.objectName}>{f.lead.shortName}</span>
          <span className="t-small muted">{COLLECTIONS[f.lead.collection].name} · {lei(f.lead.price)}</span>
        </Link>
      </div>
      <div className={s.chapterText}>
        <h3 id={`familie-${f.id}`} className={s.familyName}>{f.name}</h3>
        <p className={s.familyNotes}>
          <span className="sr-only">Notele cele mai frecvente: </span>
          {f.notes.map((note, k) => <span key={note}>{k > 0 && <span aria-hidden>, </span>}<Link href={noteHref(note)} data-k={k}>{note}</Link></span>)}
        </p>
        <dl className={s.facts}>
          <div><dt className="label muted">Parfumuri</dt><dd className="num">{f.items.length}, în {f.collections}</dd></div>
          <div><dt className="label muted">Intensitate</dt><dd>{f.intensity.charAt(0).toUpperCase() + f.intensity.slice(1)}</dd></div>
          <div><dt className="label muted">Pe piele</dt><dd className="num">{f.longevity}</dd></div>
          <div><dt className="label muted">Încadrarea Morph</dt><dd>{f.morph.join(', ')}</dd></div>
        </dl>
        {rest.length > 0 && (
          <ul className={s.members} aria-label={`Celelalte parfumuri ${f.name.toLowerCase()}`}>
            {rest.map(p => (
              <li key={p.slug} data-n={n(p)} data-soldout={!p.inStock || undefined}>
                <Link href={productHref(p)}>
                  <span className={`niche-sm ${s.memberImg}`} aria-hidden><Image src={p.images[0]} alt="" fill sizes="44px" /></span>
                  <span className={s.memberName}>{p.shortName}</span>
                  {!p.inStock && <span className="t-micro muted">stoc epuizat</span>}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <Link className="link t-small" href={`/parfumuri?familie=${f.id}`}>Toate cele {f.items.length} în vitrină</Link>
      </div>
    </article>
  );
}

function OfferRow({ o }: { o: Offer }) {
  const d = TRIAL[o.slug] ?? { name: o.name, what: '' };
  return (
    <li className={`${s.offer} ${o.inStock ? '' : s.soldout}`}>
      <Niche src={o.image} alt="" sizes="120px" className={s.offerVisual} />
      <div>
        <h3 className={s.offerName}>{d.name}</h3>
        <p className="t-small muted">{d.what}</p>
      </div>
      <p className="t-small"><b className="num">{lei(o.price)}</b><br /><span className="muted">{o.inStock ? 'În stoc' : 'Stoc epuizat'}</span></p>
      <div>
        {o.inStock
          ? <AddToCart className="btn btn-sm btn-secondary" items={[offerItem(o, d.name, 'Set de încercare')]} aria-label={`Adaugă ${d.name} în coș, ${lei(o.price)}`}>Adaugă</AddToCart>
          : <a className="t-small link" href={o.url}>Pe morphparfum.ro</a>}
      </div>
    </li>
  );
}
