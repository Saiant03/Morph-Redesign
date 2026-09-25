import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Stage } from '@/components/Stage';
import { NotePyramid } from '@/components/NotePyramid';
import { TryToggle } from '@/components/TryToggle';
import { bySlug as perfume, COLLECTIONS, collectionHref, lei, productHref, concentration } from '@/lib/catalog';
import { ENTRIES, bySlug, longDate, imageSource, YNF_STAGES, PRIMITIVO_MORPH, type JournalEntry, type JournalImage } from '@/lib/journal';
import { Ext, MorphQuote } from '../Ext';
import s from '../jurnal.module.css';

type Params = Promise<{ slug: string }>;
export const dynamicParams = false;
export const generateStaticParams = () => ENTRIES.map(e => ({ slug: e.slug }));

export async function generateMetadata({ params }: { params: Params }) {
  const e = bySlug((await params).slug);
  return { title: e ? `${e.title} · Jurnal` : 'Jurnal' };
}

// A Morph image with its caption (concept) and its place in Morph's media library
function Figure({ img, sizes, className, priority }: { img: JournalImage; sizes: string; className?: string; priority?: boolean }) {
  const from = imageSource(img.src);
  return (
    <figure className={`${s.figure} ${className ?? ''}`}>
      <div className={s.frame} style={{ aspectRatio: `${img.w} / ${img.h}` }}>
        <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} />
      </div>
      <figcaption className="t-micro muted">{img.caption}{from && <> <Ext href={from}>Fișierul pe morphparfum.ro</Ext></>}</figcaption>
    </figure>
  );
}

function Head({ e, children }: { e: JournalEntry; children?: React.ReactNode }) {
  return (
    <header className={s.head}>
      <nav className="t-small muted" aria-label="Breadcrumb"><Link href="/jurnal">Jurnal</Link> / <span aria-current="page">{e.type}</span></nav>
      <p className={`label ${s.type}`}>{e.type}{e.date ? <span className="muted num"> · Publicat de Morph pe {longDate(e.date)}</span> : <span className="muted"> · pagină a conceptului</span>}</p>
      <h1 id="j-titlu" className={e.type === 'Campanie' ? 't-display' : `t-1 ${s.articleTitle}`}>{e.title}</h1>
      <p className="t-lede">{e.lede}</p>
      {children}
    </header>
  );
}

function Article({ e }: { e: JournalEntry }) {
  const full = <Ext href={e.source.url} className="btn">Citește articolul integral pe morphparfum.ro</Ext>;
  return (
    <article className="wrap" aria-labelledby="j-titlu">
      <Head e={e}>{full}</Head>
      <div className={s.body}>
        <Figure img={e.lead} priority sizes="(max-width: 899px) 100vw, 50vw" className={e.lead.w / e.lead.h > 1.6 ? s.leadWide : s.lead} />
        <div className={s.column}>
          <MorphQuote className={s.quote} text={e.excerpt.text} href={e.source.url}
            cite={<>Morph, din articolul „{e.title}”, {longDate(e.date!)}. <Ext href={e.source.url}>Sursa</Ext></>} />

          <section className={s.summary} aria-labelledby="pe-scurt" data-voice="concept">
            <h2 id="pe-scurt" className="t-3">Pe scurt</h2>
            <p className="t-small muted">Rezumat scris pentru concept, doar din ce spune articolul.</p>
            <ul>{e.summary.map(t => <li key={t}>{t}</li>)}</ul>
            {e.key === 'your-next-form' && (
              <dl className={s.stages} aria-label="Etapele pre-lansării, după Morph">
                {YNF_STAGES.map(st => <div key={st.dates}><dt className="label muted num">{st.dates}</dt><dd>{st.names.join(', ')}</dd></div>)}
              </dl>
            )}
          </section>

          {e.notes.length > 0 && (
            <aside className={s.notes} aria-label="Note ale conceptului">
              <p className="label muted">Notă</p>
              {e.notes.map(n => <p key={n} className="t-small">{n}</p>)}
            </aside>
          )}

          <p className={s.full}>{full}</p>
          <p className="t-small muted">Textul complet, cu imaginile lui, rămâne pe morphparfum.ro. Aici e citat doar un fragment.</p>
        </div>
      </div>
      <Related e={e} />
    </article>
  );
}

function Campaign({ e }: { e: JournalEntry }) {
  const p = perfume('morph-primitivo-eau-de-parfum-unisex');
  const c = COLLECTIONS[p.collection];
  return (
    <article aria-labelledby="j-titlu">
      <div className="wrap"><Head e={e} /></div>
      <Figure img={e.lead} priority sizes="100vw" className={s.bleed} />

      <div className={`wrap ${s.body}`}>
        <div className={s.column}>
          <MorphQuote className={s.quote} text={e.excerpt.text} href={e.source.url}
            cite={<>Morph, din descrierea parfumului Primitivo. <Ext href={e.source.url}>Pagina produsului</Ext></>} />
        </div>
      </div>

      <div className="wrap">
        <Figure img={e.image!} sizes="(max-width: 1560px) 100vw, 1500px" className={s.rig} />
        <p className={`t-small ${s.roomLink}`}><Link className="link" href={collectionHref(p.collection)}>Camera colecției {c.name}</Link></p>
      </div>

      <section className={`wrap ${s.product}`} aria-labelledby="compozitie">
        <Link href={productHref(p)} className={s.productStage} aria-label={`${p.shortName}, pagina parfumului`}>
          <Stage p={p} vt sizes="(max-width: 899px) 100vw, 40vw" alt="" />
        </Link>
        <div className={s.productText}>
          <h2 id="compozitie" className="t-2">Compoziția</h2>
          <p className="label muted">{c.name} · {concentration(p)} · 100 ml · <span className="num">{lei(p.price)}</span></p>
          <NotePyramid p={p} />
          <p className="t-small">Primitivo e un parfum unisex „{PRIMITIVO_MORPH.credit}”, spune Morph. <Ext href={e.source.url}>Sursa</Ext></p>
          <MorphQuote className={s.quoteSm} text={PRIMITIVO_MORPH.closing} href={e.source.url} cite="Morph, din descrierea parfumului" />
          <p className={s.actions}>
            <Link className="btn" href={productHref(p)}>Vezi Primitivo</Link>
            <TryToggle id={p.slug} name={p.shortName} />
          </p>
        </div>
      </section>
      <div className="wrap"><Related e={e} /></div>
    </article>
  );
}

function Related({ e }: { e: JournalEntry }) {
  return (
    <nav className={s.related} aria-label="Mai departe">
      {e.related.map(r => <Link key={r.href} className="link" href={r.href}>{r.label}</Link>)}
      <Link className="link" href="/jurnal">Toate intrările din Jurnal</Link>
    </nav>
  );
}

export default async function Page({ params }: { params: Params }) {
  const e = bySlug((await params).slug);
  if (!e) notFound();
  return e.type === 'Campanie' ? <Campaign e={e} /> : <Article e={e} />;
}
