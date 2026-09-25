import { FinderFlow } from '@/components/FinderFlow';
import { parseAnswers, QUESTIONS } from '@/lib/finder';

export const metadata = { title: 'Fragrance Finder' };

// Answers and the step live in the URL (?q1=…&pas=3), so a reload, a shared link or the no-JavaScript form all
// land on the same question. Without a valid step: the first unanswered question, or the last one.
export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const answers = parseAnswers(sp);
  const pas = Number(typeof sp.pas === 'string' ? sp.pas : NaN);
  const open = QUESTIONS.findIndex(q => !answers[q.id]);
  const step = Number.isInteger(pas) && pas >= 1 && pas <= QUESTIONS.length ? pas - 1 : open >= 0 ? open : QUESTIONS.length - 1;
  return <FinderFlow key={`${step}-${JSON.stringify(answers)}`} initial={answers} step={step} />;
}
