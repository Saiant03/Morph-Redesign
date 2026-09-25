import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductGallery } from '@/components/ProductGallery';
import { PurchaseBlock } from '@/components/PurchaseBlock';
import { TimeOnSkin } from '@/components/TimeOnSkin';
import { Ritual } from '@/components/Ritual';
import { ProductVisual } from '@/components/ProductVisual';
import { ProductCard } from '@/components/ProductCard';
import { BodyProduct } from './BodyProduct';
import { Ext } from '@/components/Ext';
import { creditFor } from '@/lib/perfumers';
import {
  perfumes, COLLECTIONS, concentration, familyGroup, travelFor, samplesFor, related, section, hours, descriptor,
  firstSentences, collectionHref, lei, FREE_SHIPPING, BOUTIQUE, bodyFor, layeringSets, bodyItems, bodyBySlug, BODY_KIND, bySlug,
} from '@/lib/catalog';
import s from './product.module.css';

type Params = Promise<{ slug: string }>;
export const dynamicParams = false;
// Product URLs keep Morph's existing slugs (research 06: preserve URLs): the perfumes, and since Phase C2 the body
// products and Coffret sets linked to a perfume.
export const generateStaticParams = () => [...perfumes, ...bodyItems.filter(b => b.scent)].map(p => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const p = perfumes.find(x => x.slug === slug);
  const b = p ? null : bodyBySlug(slug);
  return { title: p ? p.shortName : b ? `${BODY_KIND[b.kind].name} ${bySlug(b.scent!).shortName}` : 'Parfum' };
}

export default async function Product({ params }: { params: Params }) {
  const { slug } = await params;
  const p = perfumes.find(x => x.slug === slug);
  if (!p) {
    const b = bodyBySlug(slug);
    if (!b) notFound();
    return <BodyProduct b={b} />;
  }
  const fam = familyGroup(p);
  const desc = section(p, /^Descriere/i);
  const travel = travelFor(p);
  // example partner for the composer: same family, has a travel size. Labelled as the visitor's choice, not Morph's.
  const partner = related(p, 8).find(r => travelFor(r)) ?? related(p, 1)[0] ?? perfumes.find(x => x.slug !== p.slug)!;
  const alternatives = p.inStock ? [] : related(p, 3);
  const credit = creditFor(p.slug);

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
            {/* only perfumes a Morph source credits (data/perfumers.json) */}
            {credit && (
              <p className={`${s.credit} t-small`} data-credit>
                Creat de <Link className="link" href="/despre-noi#parfumieri">{credit.perfumer}</Link>
                <span className="muted"> · <Ext href={credit.sources[0].url} className="link">Sursa Morph</Ext></span>
              </p>
            )}
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

      {bodyFor(p).length > 0 && (
        <section className={`wrap ${s.ritual}`} aria-labelledby="ritual-titlu">
          <div className={s.ritualHead}>
            <h2 id="ritual-titlu" className="t-1">Ritualul {p.shortName}</h2>
            <p className="muted">Același parfum în gel de duș și cremă de corp, de la Morph. Cremele sunt, spune Morph, „perfecte pentru a fi utilizate împreună cu parfumul preferat”.</p>
            <Link className="link t-small" href={`/parfumuri/corp#ritual-${p.slug}`}>Toate ritualurile Baie & Corp</Link>
          </div>
          <Ritual p={p} current={p.slug} />
        </section>
      )}

      <section className="band" data-tone="dark" aria-labelledby="layering-titlu">
        <div className={`wrap ${s.compose}`}>
          <div className={s.pair} aria-hidden>
            <ProductVisual p={p} sizes="200px" alt="" className={s.pairA} />
            <ProductVisual p={partner} sizes="200px" alt="" className={s.pairB} />
          </div>
          <div className={s.composeText}>
            <p className="label muted">Layering</p>
            <h2 id="layering-titlu" className="t-1">{p.shortName}, cu încă un strat</h2>
            <p className="muted">Compune-l cu un al doilea parfum și vezi cum se așază notele, de la deschidere la bază. Exemplul de mai jos e din aceeași familie ({partner.shortName}); nu e o recomandare Morph.</p>
            <p className={s.composeLinks}>
              <Link className="btn btn-secondary" href={`/layering?a=${p.slug}&b=${partner.slug}`}>Compune cu {partner.shortName}</Link>
              <Link className="link t-small" href="/layering/your-next-form">Your Next Form: {layeringSets.length} seturi blind, {lei(layeringSets[0].price)}</Link>
            </p>
          </div>
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
