// Downloads the Morph images listed in data/assets.json (status "concept") into public/morph/campaign.
// Read-only public files; skips what is already present. Usage: npm run assets
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const { base, assets } = JSON.parse(readFileSync(path.join(root, 'data/assets.json'), 'utf8'));
const dir = path.join(root, 'public/morph/campaign');
mkdirSync(dir, { recursive: true });

for (const a of assets.filter(x => x.status === 'concept')) {
  const out = path.join(dir, a.file);
  if (existsSync(out)) { console.log(`have  ${a.file}`); continue; }
  const r = await fetch(base + a.src);
  if (!r.ok) throw new Error(`${r.status} ${base + a.src}`);
  writeFileSync(out, Buffer.from(await r.arrayBuffer()));
  console.log(`got   ${a.file}`);
}
