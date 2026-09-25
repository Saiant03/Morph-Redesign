import Link from 'next/link';
import Image from 'next/image';
import { PageHead } from '@/components/PageHead';
import { ProductVisual } from '@/components/ProductVisual';
import { Reveal } from '@/components/Reveal';
import { Ext, MorphQuote } from '@/components/Ext';
import { ALL_BY_COLLECTION, COLLECTIONS, BOUTIQUE, collectionHref, productHref } from '@/lib/catalog';
import { CAMPAIGN } from '@/lib/campaign';
import { imageSource } from '@/lib/journal';
import { PERFUMERS, NOSES_URL } from '@/lib/perfumers';
import s from './despre.module.css';

export const metadata = { title: 'Despre Morph', description: 'Morph, casa italiană de parfumuri de nișă fondată în 2002 la Napoli de Andrea Angelino, din textele Morph.' };

/**
 * Despre Morph (docs/design/phase-c4-1c-about-perfumers.md). Morph's own words are quotations with their source:
 * the Romanian About page and the international Maison page (English, with a translation labelled as the concept's).
 * Everything else is the concept's and restates only what those sources say. Held out: the founder narrative of
 * "Istoria parfumului", the concentration and collection figures, "cea mai nouă creație", the once-a-year sets.
 */
const ABOUT = 'https://morphparfum.ro/despre-noi';
const MAISON = 'https://en.morphparfum.com/maison/';
const J3 = '/jurnal/primitivo';

const OPENING = { src: '/morph/campaign/n8-editorial.avif', w: 2560, h: 1440, alt: 'Două mâini țin sticla N8 din Les Exclusifs, între două sacouri cu dungi pictate cu roșu și albastru' };
const BOTTLE = { src: '/morph/campaign/black-bottle.avif', alt: 'Sticla Iconic, înclinată pe o suprafață albă, cu cutia ei neagră alături' };

function Caption({ src, children }: { src: string; children: React.ReactNode }) {
  const from = imageSource(src);
  return <figcaption className="t-micro muted">{children}{from && <> <Ext href={from}>Fișierul pe morphparfum.ro</Ext></>}</figcaption>;
}

export default function Page() {
  return (
    <>
      <div className="wrap">
        <PageHead id="despre-titlu" title="Despre Morph" crumbs={[{ href: '/magazin', label: 'Magazinul' }, { label: 'Despre Morph' }]}
          lede="Casa italiană de parfumuri de nișă din Napoli, spusă din textele Morph."
          meta="Citatele sunt ale Morph, cu sursa lor. Traducerea și restul textului sunt scrise pentru concept." />
      </div>

      <figure className={s.opening}>
        <div className={s.openingFrame}>
          <Image src={OPENING.src} alt={OPENING.alt} fill priority sizes="100vw" />
        </div>
        <Caption src={OPENING.src}>Imagine Morph. Un decupaj din același cadru deschide pagina Despre noi a Morph.</Caption>
      </figure>

      {/* 1 Napoli, 2002 */}
      <section className={`wrap ${s.chapter}`} aria-labelledby="napoli">
        <div className={s.chapterHead}>
          <p className="label muted">Casa</p>
          <h2 id="napoli" className="t-1">Napoli, <span className="num">2002</span></h2>
        </div>
        <div className={s.chapterBody}>
          <MorphQuote className={s.quote} href={ABOUT}
            text="Morph Parfum este un brand italian fondat în 2002 la Napoli de Andrea Angelino, pasionat de parfumeria de nișă și de echilibrul dintre tradiție și inovație."
            cite={<>Morph, pagina Despre noi. <Ext href={ABOUT}>Sursa</Ext></>} />
          <dl className={s.facts}>
            <div><dt className="label muted">Oraș</dt><dd>Napoli, Italia</dd></div>
            <div><dt className="label muted">Anul</dt><dd className="num">2002</dd></div>
            <div><dt className="label muted">Fondator</dt><dd>Andrea Angelino</dd></div>
          </dl>
        </div>
      </section>

      {/* 2 Metamorphosis: Morph's international Maison page, in English, with the concept's translation */}
      <section className={`band ${s.metamorph}`} data-tone="dark" aria-labelledby="metamorfoza">
        <div className={`wrap ${s.chapter}`}>
          <div className={s.chapterHead}>
            <p className="label muted">Numele</p>
            <h2 id="metamorfoza" className="t-1">Metamorfoza</h2>
          </div>
          <div className={s.chapterBody}>
            <MorphQuote className={s.quoteLarge} href={MAISON} lang="en"
              text={'Morph was born as an experimental olfactory space, a "movement" inherently dedicated to innovation, change... to Metamorphosis.'}
              cite={<>Morph, pagina Maison, în engleză. <Ext href={MAISON}>Sursa</Ext></>} />
            <p className={s.translation} data-voice="concept">
              <span className="label muted">Traducere pentru concept</span>
              Morph s-a născut ca un spațiu olfactiv experimental, o „mișcare” dedicată prin însăși natura ei inovației, schimbării… Metamorfozei.
            </p>
          </div>
        </div>
      </section>

      {/* 3 The bottle */}
      <section className={`wrap ${s.chapter} ${s.bottle}`} aria-labelledby="sticla">
        <Reveal crop className={s.bottleImage}>
          <figure className={s.figure}>
            <div className={s.bottleFrame}><Image src={BOTTLE.src} alt={BOTTLE.alt} fill sizes="(max-width: 899px) 100vw, 55vw" /></div>
            <Caption src={BOTTLE.src}>Imagine Morph.</Caption>
          </figure>
        </Reveal>
        <div className={s.bottleText}>
          <p className="label muted">Obiectul</p>
          <h2 id="sticla" className="t-1">Sticla</h2>
          <MorphQuote className={s.quote} href={ABOUT}
            text="Produsă de Bormioli Luigi, companie italiană renumită pentru sticla de înaltă calitate, forma ei exprimă ideea de echilibru și mișcare continuă."
            cite={<>Morph, pagina Despre noi, despre sticla parfumurilor. <Ext href={ABOUT}>Sursa</Ext></>} />
        </div>
      </section>

      {/* 4 The laboratory */}
      <section className={`wrap ${s.chapter}`} aria-labelledby="laboratorul">
        <div className={s.chapterHead}>
          <p className="label muted">Metoda</p>
          <h2 id="laboratorul" className="t-1">Laboratorul</h2>
        </div>
        <div className={s.chapterBody}>
          <MorphQuote className={s.quote} href={ABOUT}
            text="Morph Parfum a devenit cunoscut […] pentru felul în care combină estetica italiană cu precizia laboratorului."
            cite={<>Morph, pagina Despre noi. <Ext href={ABOUT}>Sursa</Ext></>} />
          <p className="muted">În imaginile Morph asociate parfumului Primitivo, sticla stă pe o structură de laborator, între mâini în mănuși. <Link className="link" href={J3}>Primitivo, în Jurnal</Link></p>
        </div>
      </section>

      {/* 5 The perfumers: only those a Morph source links to a perfume (data/perfumers.json) */}
      <section id="parfumieri" className={`band ${s.noses}`} aria-labelledby="parfumieri-titlu">
        <div className={`wrap ${s.chapter}`}>
          <div className={s.chapterHead}>
            <p className="label muted">Semnăturile</p>
            <h2 id="parfumieri-titlu" className="t-1">Parfumierii</h2>
            <p className="muted">Parfumieri care semnează parfumuri Morph, cu numele scrise cum le scrie Morph. Apar doar cei pe care o sursă Morph îi leagă de un parfum anume; sursa stă lângă fiecare parfum.</p>
            <p className="t-small muted">Pagina Morph „The Noses” numește mai mulți parfumieri și le publică biografiile, în engleză. <Ext href={NOSES_URL}>The Noses, pe en.morphparfum.com</Ext></p>
          </div>
          <ol className={s.noseList}>
            {PERFUMERS.map(n => (
              <li key={n.name} className={s.nose}>
                <h3 className="t-2">{n.name}</h3>
                <ul className={s.works}>
                  {n.works.map(({ p, source }) => (
                    <li key={p.slug} className={s.work}>
                      <Link href={productHref(p)} className={s.workLink}>
                        <ProductVisual p={p} sizes="96px" alt="" className={s.workImg} />
                        <span className={s.workName}>{p.shortName}</span>
                      </Link>
                      <Ext href={source.url} className="link t-micro muted">Sursa Morph</Ext>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6 The collections: each room with the Morph image it already carries */}
      <section className={`wrap ${s.collections}`} aria-labelledby="colectii">
        <h2 id="colectii" className="t-1">Colecțiile</h2>
        <ul className={s.rooms}>
          {ALL_BY_COLLECTION.map(c => (
            <li key={c}>
              <figure className={s.roomFrame}>
                <Image src={CAMPAIGN[c].src} alt={CAMPAIGN[c].alt} fill sizes="(max-width: 899px) 100vw, 33vw" style={{ objectPosition: CAMPAIGN[c].pos }} />
              </figure>
              <h3 className="t-2"><Link href={collectionHref(c)} className={s.roomLink}>{COLLECTIONS[c].name}</Link></h3>
              <p className="label muted">{COLLECTIONS[c].type}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 7 The shop */}
      <section className={`band ${s.shop}`} data-tone="wood" aria-labelledby="magazin-titlu">
        <div className={`wrap ${s.shopGrid}`}>
          <div>
            <p className="label muted">București</p>
            <h2 id="magazin-titlu" className="t-1">{BOUTIQUE.name}</h2>
          </div>
          <div className={s.shopText}>
            <p className="t-lede">{BOUTIQUE.address}</p>
            <Link className="btn" href={BOUTIQUE.href}>Vizitează magazinul</Link>
          </div>
        </div>
      </section>

      <section className={`wrap ${s.sources}`} aria-labelledby="surse">
        <h2 id="surse" className="label">Surse</h2>
        <ul className="t-small muted">
          <li><Ext href={ABOUT}>Despre noi, morphparfum.ro</Ext>, pagină modificată ultima dată pe 18 octombrie 2025.</li>
          <li><Ext href={MAISON}>Maison, en.morphparfum.com</Ext>, în engleză.</li>
          <li><Ext href={NOSES_URL}>The Noses, en.morphparfum.com</Ext>, în engleză.</li>
          <li>Atribuirile parfumierilor: articolele și paginile Morph legate lângă fiecare parfum.</li>
          <li>Toate recitite pe 25 septembrie 2026.</li>
        </ul>
      </section>
    </>
  );
}
