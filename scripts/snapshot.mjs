// Snapshot Morph's public WooCommerce Store API (read-only) into data/catalog.json and public/morph/*.
// Run: node scripts/snapshot.mjs   (in the cloud sandbox: NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt)
import fs from 'fs';
import path from 'path';

const API = 'https://morphparfum.ro/wp-json/wc/store/v1/products';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const imgDir = path.join(root, 'public/morph');
fs.mkdirSync(imgDir, { recursive: true });
fs.mkdirSync(path.join(root, 'data'), { recursive: true });

const decode = s => (s || '')
  .replace(/&#8211;/g, '–').replace(/&#8217;/g, '’').replace(/&#8220;|&#8221;/g, '"').replace(/&amp;/g, '&')
  .replace(/&nbsp;/g, ' ').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
const strip = h => decode((h || '').replace(/<br\s*\/?>/g, '\n').replace(/<\/(p|li|h\d)>/g, '\n').replace(/<[^>]+>/g, '')).replace(/\n{2,}/g, '\n').trim();
const sections = html => {
  const out = []; const re = /<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>([\s\S]*?)(?=<h[2-4]|$)/g; let m;
  while ((m = re.exec(html || ''))) out.push({ heading: strip(m[1]), body: strip(m[2]) });
  return out;
};
const attr = (p, name) => p.attributes.find(a => a.name === name)?.terms.map(t => decode(t.name)) || [];

let items = [];
for (let page = 1; page < 10; page++) {
  const r = await fetch(`${API}?per_page=100&page=${page}`);
  const batch = await r.json();
  if (!Array.isArray(batch) || !batch.length) break;
  items = items.concat(batch);
}
console.log('products', items.length);

async function img(url, name) {
  const ext = path.extname(new URL(url).pathname) || '.jpg';
  const file = `${name}${ext}`;
  const dest = path.join(imgDir, file);
  if (!fs.existsSync(dest)) {
    const r = await fetch(url); if (!r.ok) throw new Error(`${r.status} ${url}`);
    fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
  }
  return `/morph/${file}`;
}
// pick a mid-size variant from srcset when present (keeps the repo light)
const sized = (im, min) => {
  const c = (im.srcset || '').split(',').map(s => s.trim().split(' ')).filter(x => x[1]).map(([u, w]) => [u, parseInt(w)]).sort((a, b) => a[1] - b[1]);
  return (c.find(([, w]) => w >= min) || c.at(-1) || [im.src])[0];
};

const COLL = { 'Parfumuri colecția Luxury': 'luxury', 'Parfumuri colecția Les Exclusifs': 'les-exclusifs', 'Parfumuri colecția Ice': 'ice' };
const cats = p => p.categories.map(c => decode(c.name));
const perfumes = [], travel = [], samples = [], layering = [], body = [], gift = [];
// Body & Bath and the perfume+body sets: linked to their perfume by the name Morph gives them (matched after the loop).
const BODY = [['Set parfum și gel de duș', 'set-gel'], ['Set parfum și cremă', 'set-cream'], ['Geluri de duș', 'gel'], ['Creme de corp parfumate', 'cream']];

for (const p of items) {
  const c = cats(p);
  const price = +p.prices.price / 10 ** p.prices.currency_minor_unit;
  const base = { id: p.id, slug: p.slug, name: decode(p.name), price, currency: 'lei', inStock: p.is_in_stock, url: p.permalink };
  const coll = c.map(x => COLL[x]).find(Boolean);
  if (coll) {
    const short = decode(p.name).replace(/^Morph\s+/i, '').replace(/\s+(Eau de Parfum|Extract de Parfum|Parfum).*$/i, '').trim();
    const images = [];
    for (const [i, im] of p.images.slice(0, 3).entries()) images.push(await img(sized(im, 700), `${p.slug}-${i}`));
    perfumes.push({
      ...base, shortName: short, collection: coll,
      bestseller: c.includes('Bestsellers'),
      type: attr(p, 'Tip parfum')[0] || null,
      notes: { top: attr(p, 'Note de vârf'), heart: attr(p, 'Note de mijloc'), base: attr(p, 'Note de bază') },
      family: attr(p, 'Încadrare parfum')[0] || null,
      intensity: attr(p, 'Intensitate')[0] || null,
      longevity: attr(p, 'Longevitate')[0] || null,
      season: attr(p, 'Sezonalitate'), occasion: attr(p, 'Ocazie'), style: attr(p, 'Stil parfum')[0] || null,
      summary: strip(p.short_description),
      sections: sections(p.description),
      images,
    });
  } else if (BODY.some(([k]) => c.includes(k))) {
    const image = p.images[0] ? await img(sized(p.images[0], 600), `${p.slug}-0`) : null;
    body.push({ ...base, kind: BODY.find(([k]) => c.includes(k))[1], image, summary: strip(p.short_description) });
  } else if (/^(gift box|morph gift card)$/i.test(decode(p.name).trim())) {
    const image = p.images[0] ? await img(sized(p.images[0], 600), `${p.slug}-0`) : null;
    const range = p.prices.price_range ? [+p.prices.price_range.min_amount, +p.prices.price_range.max_amount].map(v => v / 10 ** p.prices.currency_minor_unit) : null;
    // the gift card's fixed amounts ("Alege suma"), e.g. "1.100 lei" → 1100; null when the product has none
    const values = p.attributes.find(a => /suma/i.test(a.name))?.terms.map(t => +decode(t.name).replace(/\D/g, '')) ?? null;
    gift.push({ ...base, image, range, values, summary: strip(p.short_description) });
  } else if (c.includes('Set travel') || c.includes('Eșantioane parfumuri') || c.includes('Layering')) {
    const image = p.images[0] ? await img(sized(p.images[0], 600), `${p.slug}-0`) : null;
    const rec = { ...base, image, summary: strip(p.short_description) };
    if (c.includes('Layering')) layering.push({ ...rec, state: decode(p.name).match(/Morph\s+(\w+)\s+2x8/i)?.[1] || null });
    else if (c.includes('Eșantioane parfumuri')) samples.push(rec);
    else travel.push(rec);
  }
}

// the perfume a body product belongs to: the one whose short name appears in the product name
for (const b of body) {
  const up = b.name.toUpperCase();
  b.scent = perfumes.filter(p => up.includes(p.shortName.toUpperCase())).sort((a, z) => z.shortName.length - a.shortName.length)[0]?.slug ?? null;
}

fs.writeFileSync(path.join(root, 'data/catalog.json'), JSON.stringify({
  source: API, snapshotAt: new Date().toISOString(), perfumes, travel, samples, layering, body, gift,
}, null, 1));
console.log({ perfumes: perfumes.length, travel: travel.length, samples: samples.length, layering: layering.length, body: body.length, gift: gift.length, unmatched: body.filter(b => !b.scent).map(b => b.name) });
