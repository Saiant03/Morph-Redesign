import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductGallery } from '@/components/ProductGallery';
import { PurchaseBlock } from '@/components/PurchaseBlock';
import { TimeOnSkin } from '@/components/TimeOnSkin';
import { LayeringComposer } from '@/components/LayeringComposer';
import { ProductCard } from '@/components/ProductCard';
import {
  perfumes, COLLECTIONS, concentration, familyGroup, travelFor, samplesFor, related, section, hours, descriptor,
  firstSentences, collectionHref, lei, FREE_SHIPPING, BOUTIQUE,
} from '@/lib/catalog';
import s from './product.module.css';

type Params = Promise<{ slug: string }>;
export const dynamicParams = false;
// Product URLs keep Morph's existing slugs (research 06: preserve URLs).
export const generateStaticParams = () => perfumes.map(p => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const p = perfumes.find(x => x.slug === slug);
  return { title: p ? p.shortName : 'Parfum' };
}

export default async function Product({ params }: { params: Params }) {
  const { slug } = await params;
  const p = perfumes.find(x => x.slug === slug);
  if (!p) notFound();
  const fam = familyGroup(p);
  const desc = section(p, /^Descriere/i);
  const travel = travelFor(p);
  // example partner for the composer: same family, has a travel size. Labelled as the visitor's choice, not Morph's.
  const partner = related(p, 8).find(r => travelFor(r)) ?? related(p, 1)[0] ?? perfumes.find(x => x.slug !== p.slug)!;
  const alternatives = p.inStock ? [] : related(p, 3);

  return (
    <>
      <div className={`wrap ${s.top}`}>
        <div className={s.media}><ProductGallery p={p} /></div>
        <div className={s.info}>
          <div className={s.titleBlock}>
            <nav className={`${s.crumb} t-small muted`} aria-label="Breadcrumb">
              <Link href="/parfumuri">Parfumuri</Link><span aria-hidden>/</span><Link href={collectionHref(p.collection)}>{COLLECTIONS[p.collection].name}</Link>
            </nav>
            <h1 className={`t-1 ${s.title}`}>{p.shortName}</h1>
            <p className={`${s.sub} label muted`}>{COLLECTIONS[p.collection].name} · {concentration(p)} · unisex · 100 ml</p>
          </div>
          <p className={s.notesLine}>{descriptor(p)}</p>

          <div className={s.buy}>
            <PurchaseBlock p={p} travel={travel} samples={samplesFor(p)} />
          </div>

          <dl className={s.facts}>
            <div><dt className="label muted">Familie</dt><dd>{fam?.name ?? '—'}{fam && p.family !== fam.name ? <span className="muted t-small"> ({p.family?.toLowerCase()})</span> : null}</dd></div>
            <div><dt className="label muted">Intensitate</dt><dd>{p.intensity ?? 'Nespecificată'}</dd></div>
            <div><dt className="label muted">Pe piele</dt><dd className="num">{hours(p) ?? '—'}</dd></div>
          </dl>

          <p className={s.summary}>{firstSentences(p.summary, 2)}</p>

          <ul className={`${s.assure} t-small muted`}>
            <li>Livrare gratuită de la {lei(FREE_SHIPPING)}.</li>
            <li>Cod Certilogo: autenticitate verificabilă online.</li>
            <li>Îl poți încerca în <Link className="link" href={BOUTIQUE.href}>{BOUTIQUE.short}</Link>, {BOUTIQUE.address}.</li>
          </ul>

          {alternatives.length > 0 && (
            <div className={s.alts}>
              <p className="t-small">În stoc, din aceeași familie:</p>
              <ul className="t-small">{alternatives.map(a => <li key={a.slug}><Link className="link" href={`/${a.slug}`}>{a.shortName}</Link></li>)}</ul>
            </div>
          )}
        </div>
      </div>

      {desc && (
        <section className={`wrap ${s.story}`} aria-label="Despre parfum">
          <figure className={s.quote}>
            <blockquote><p>{firstSentences(desc.body, 3)}</p></blockquote>
            <figcaption className="t-micro muted">Din descrierea Morph a parfumului</figcaption>
          </figure>
          <dl className={s.context}>
            {p.season.length > 0 && <div><dt className="label muted">Anotimp</dt><dd>{p.season.join(', ')}</dd></div>}
            {p.occasion.length > 0 && <div><dt className="label muted">Ocazii</dt><dd>{p.occasion.join(', ')}</dd></div>}
            {p.style && <div><dt className="label muted">Stil</dt><dd>{p.style}</dd></div>}
          </dl>
        </section>
      )}

      <TimeOnSkin p={p} />

      <section className="band" data-tone="dark" aria-labelledby="layering-titlu">
        <div className="wrap">
          <LayeringComposer first={p.slug} second={partner.slug} heading={`${p.shortName}, cu încă un strat`} headingId="layering-titlu"
            intro={`Un exemplu din aceeași familie, cu variantă travel. Schimbă al doilea strat ca să compui altă pereche.`} />
        </div>
      </section>

      <section className="wrap section" aria-labelledby="rel-titlu">
        <div className={s.relHead}>
          <h2 id="rel-titlu" className="t-2">Aceeași familie{fam ? `: ${fam.name.toLowerCase()}` : ''}</h2>
          <Link href={`/parfumuri?familie=${fam?.id ?? ''}`} className="link t-small">Toate parfumurile din familie</Link>
        </div>
        <div className={s.cards}>{related(p, 4).map(r => <ProductCard key={r.slug} p={r} />)}</div>
      </section>
    </>
  );
}
