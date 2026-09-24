import { CollectionPage } from './CollectionPage';

export const metadata = { title: 'Parfumuri' };

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <CollectionPage id={null} searchParams={await searchParams} />;
}
