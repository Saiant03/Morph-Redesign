// Measures where the object sits inside each Morph packshot (white background), so a stage can stand the
// bottle exactly on its glass shelf and mirror it from the foot. Writes data/objects.json:
// { "/morph/<file>": { w, h, top, bottom, left, right } } with edges as fractions of the image size.
// Rendered in the preinstalled Chromium (global Playwright). Usage: npm run objects
import { createRequire } from 'module';
import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
const require = createRequire(import.meta.url);
const { chromium } = require(execSync('npm root -g').toString().trim() + '/playwright');

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const cat = JSON.parse(readFileSync(path.join(root, 'data/catalog.json'), 'utf8'));
const files = [...cat.perfumes.flatMap(p => p.images), ...cat.body.map(b => b.image), ...cat.gift.map(g => g.image)].filter(Boolean);

const browser = await chromium.launch();
const page = await browser.newPage();
const out = {};
for (const f of files) {
  const b64 = readFileSync(path.join(root, 'public', f)).toString('base64');
  out[f] = await page.evaluate(async src => {
    const img = new Image(); img.src = src; await img.decode();
    const w = img.naturalWidth, h = img.naturalHeight;
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, w, h).data;
    // "object" = clearly darker than the white sweep; 3% of a row/column must qualify, so soft shadows and noise are ignored
    const ink = i => 255 * 3 - (d[i] + d[i + 1] + d[i + 2]) > 60;
    const rows = new Array(h).fill(0), cols = new Array(w).fill(0);
    for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) if (ink((yy * w + xx) * 4)) { rows[yy]++; cols[xx]++; }
    const rmin = w * 0.03, cmin = h * 0.03;
    const top = rows.findIndex(n => n > rmin), bottom = h - 1 - [...rows].reverse().findIndex(n => n > rmin);
    const left = cols.findIndex(n => n > cmin), right = w - 1 - [...cols].reverse().findIndex(n => n > cmin);
    const r = v => Math.round(v * 1000) / 1000;
    return { w, h, top: r(top / h), bottom: r((bottom + 1) / h), left: r(left / w), right: r((right + 1) / w) };
  }, `data:image/${path.extname(f).slice(1)};base64,${b64}`);
}
await browser.close();
writeFileSync(path.join(root, 'data/objects.json'), JSON.stringify(out, null, 1));
console.log(Object.keys(out).length, 'images measured');
