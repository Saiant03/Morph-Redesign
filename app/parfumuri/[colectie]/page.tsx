import { notFound } from 'next/navigation';
import { CollectionPage } from '../CollectionPage';
import { COLLECTIONS, type CollectionId } from '@/lib/catalog';

type Params = Promise<{ colectie: string }>;
const valid = (c: string): c is CollectionId => c in COLLECTIONS;

// static: the three rooms are prerendered, so moving between them needs no server render (filters are read on the client)
export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(COLLECTIONS).map(colectie => ({ colectie }));

export async function generateMetadata({ params }: { params: Params }) {
  const { colectie } = await params;
  return { title: valid(colectie) ? COLLECTIONS[colectie].name : 'Parfumuri' };
}

export default async function Page({ params }: { params: Params }) {
  const { colectie } = await params;
  if (!valid(colectie)) notFound();
  return <CollectionPage id={colectie} />;
}
