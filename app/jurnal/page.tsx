import Link from 'next/link';
import Image from 'next/image';
import { PageHead } from '@/components/PageHead';
import { ENTRIES, MORPH_BLOG, longDate, type JournalEntry } from '@/lib/journal';
import { Ext, MorphQuote } from '@/components/Ext';
import { EntryTitle } from './Title';
import s from './jurnal.module.css';

export const metadata = { title: 'Jurnal' };

const href = (e: JournalEntry) => `/jurnal/${e.slug}`;

// One entry of the index: its image, its type, its title, and Morph's own words with their source
function Entry({ e, sizes, className }: { e: JournalEntry; sizes: string; className?: string }) {
  const article = e.type === 'Articol Morph';
  return (
    <article className={`${s.entry} ${className ?? ''}`} aria-labelledby={`j-${e.key}`}>
      <Link href={href(e)} className={s.entryImg} tabIndex={-1} aria-hidden style={{ aspectRatio: `${e.lead.w} / ${e.lead.h}` }}>
        <Image src={e.lead.src} alt="" fill sizes={sizes} />
      </Link>
      <p className={`label ${s.type}`}>{e.type}{e.date ? <span className="muted num"> · {longDate(e.date)}</span> : <span className="muted"> · pagină a conceptului</span>}</p>
      <h3 id={`j-${e.key}`} className={`t-2 ${s.entryTitle}`}><Link href={href(e)}><EntryTitle e={e} /></Link></h3>
      <p className="muted">{e.lede}</p>
      <MorphQuote className={s.quoteSm} text={e.excerpt.text} href={e.source.url}
        cite={<>{article ? 'Morph, din articol' : 'Morph, din descrierea parfumului'}. <Ext href={e.source.url}>Sursa pe morphparfum.ro</Ext></>} />
    </article>
  );
}

export default function Page() {
  const [j1, j2, j3] = ENTRIES;
  return (
    <div className="wrap">
      <PageHead id="jurnal-titlu" title="Jurnal" crumbs={[{ href: '/magazin', label: 'Magazinul' }, { label: 'Jurnal' }]}
        lede="Lansări, campanii și povești Morph, fiecare cu sursa ei."
        meta={<>{ENTRIES.length} intrări. Citatele sunt ale Morph, cu sursa lor; restul textului e scris pentru concept.</>} />

      {/* J1 and J2: one day, one subject: the collection and the event that opened it */}
      <section className={s.pair} aria-labelledby="ynf-pereche">
        <header className={s.pairHead}>
          <h2 id="ynf-pereche" className="label"><span className="num">{longDate(j1.date!)}</span> · Your Next Form</h2>
          <p className="t-small muted">Două articole Morph publicate în aceeași zi: colecția și workshopul care a precedat-o.</p>
        </header>
        <Entry e={j1} sizes="(max-width: 899px) 100vw, 56vw" className={s.wide} />
        <Entry e={j2} sizes="(max-width: 899px) 100vw, 36vw" className={s.narrow} />
      </section>

      <section className={s.campaign} aria-labelledby="campanii">
        <header className={s.pairHead}>
          <h2 id="campanii" className="label">Campanii</h2>
          <p className="t-small muted">Pagini ale conceptului, din imaginile și textele Morph.</p>
        </header>
        <Entry e={j3} sizes="(max-width: 899px) 100vw, 60vw" className={s.feature} />
      </section>

      <p className={`${s.blog} t-2`}>
        <Ext href={MORPH_BLOG} className={s.blogLink}>Toate articolele Morph sunt pe morphparfum.ro</Ext>
      </p>
    </div>
  );
}
