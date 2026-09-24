import { notFound } from 'next/navigation';
import { CollectionPage } from '../CollectionPage';
import { COLLECTIONS, type CollectionId } from '@/lib/catalog';

type Params = Promise<{ colectie: string }>;
const valid = (c: string): c is CollectionId => c in COLLECTIONS;

export async function generateMetadata({ params }: { params: Params }) {
  const { colectie } = await params;
  return { title: valid(colectie) ? COLLECTIONS[colectie].name : 'Parfumuri' };
}

export default async function Page({ params, searchParams }: { params: Params; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { colectie } = await params;
  if (!valid(colectie)) notFound();
  return <CollectionPage id={colectie} searchParams={await searchParams} />;
}
