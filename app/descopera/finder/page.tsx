import { PageHead } from '@/components/PageHead';
import { SectionNav } from '@/components/SectionNav';
import { FinderFlow } from '@/components/FinderFlow';
import { DESCOPERA_NAV } from '@/lib/nav';
import { parseAnswers, QUESTIONS, TAGGED } from '@/lib/finder';

export const metadata = { title: 'Fragrance Finder' };

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const step = Number(typeof sp.pas === 'string' ? sp.pas : NaN);
  return (
    <div className="wrap">
      <PageHead id="finder-titlu" title="Fragrance Finder" crumbs={[{ href: '/descopera', label: 'Descoperă' }, { label: 'Fragrance Finder' }]}
        lede={`${QUESTIONS.length} întrebări, cu logica finder-ului Morph. La final vezi de ce ți se potrivește fiecare parfum, cât costă și cum îl încerci înainte de sticlă.`}
        meta={`${TAGGED.length} parfumuri din toate cele trei colecții. Durează un minut.`}>
        <SectionNav label="Descoperă" items={DESCOPERA_NAV} current="/descopera/finder" />
      </PageHead>
      <FinderFlow initial={parseAnswers(sp)} step={Number.isInteger(step) && step >= 1 && step <= QUESTIONS.length ? step - 1 : null} />
    </div>
  );
}
