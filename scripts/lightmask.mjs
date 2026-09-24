// 2.5D object proof (docs/design/phase-b5-asset-transition.md): cuts the silhouette out of a Morph packshot so
// light can be laid on the bottle alone. The background is the white sweep connected to the image border (flood
// fill); near-white pixels inside the outline (the clear glass shell, the base) are left out too, because on a dark
// stage they read as empty and a streak over them showed as a floating white line. Writes
// public/morph/objects/<file>-mask.png (white, alpha = juice, cap and label, half resolution, 2 px feather) and data/lightmasks.json (the images that have a mask).
// Rendered in the preinstalled Chromium (global Playwright). Usage: npm run lightmask [slug ...] (default: Zeta)
import { createRequire } from 'module';
import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
const require = createRequire(import.meta.url);
const { chromium } = require(execSync('npm root -g').toString().trim() + '/playwright');

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const cat = JSON.parse(readFileSync(path.join(root, 'data/catalog.json'), 'utf8'));
const slugs = process.argv.slice(2).length ? process.argv.slice(2) : ['morph-zeta-parfum-100ml'];
const files = slugs.map(s => cat.perfumes.find(p => p.slug === s)?.images[0]).filter(Boolean);

const browser = await chromium.launch();
const page = await browser.newPage();
const masks = [];
for (const f of files) {
  const b64 = readFileSync(path.join(root, 'public', f)).toString('base64');
  const png = await page.evaluate(async src => {
    const img = new Image(); img.src = src; await img.decode();
    const w = img.naturalWidth, h = img.naturalHeight;
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, w, h).data;
    // background: near-white pixels reachable from the border
    const white = i => 255 * 3 - (d[i] + d[i + 1] + d[i + 2]) < 22;
    // clear glass reads as empty on a dark stage: light only what has body (juice, cap, label), never the clear shell
    const clear = i => 255 * 3 - (d[i] + d[i + 1] + d[i + 2]) < 60;
    const bg = new Uint8Array(w * h), stack = [];
    for (let xx = 0; xx < w; xx++) stack.push(xx, (h - 1) * w + xx);
    for (let yy = 0; yy < h; yy++) stack.push(yy * w, yy * w + w - 1);
    while (stack.length) {
      const p = stack.pop();
      if (bg[p] || !white(p * 4)) continue;
      bg[p] = 1;
      const px = p % w;
      if (px > 0) stack.push(p - 1); if (px < w - 1) stack.push(p + 1);
      if (p >= w) stack.push(p - w); if (p < w * (h - 1)) stack.push(p + w);
    }
    const out = x.createImageData(w, h);
    for (let p = 0; p < w * h; p++) { out.data[p * 4] = out.data[p * 4 + 1] = out.data[p * 4 + 2] = 255; out.data[p * 4 + 3] = bg[p] || clear(p * 4) ? 0 : 255; }
    x.clearRect(0, 0, w, h); x.putImageData(out, 0, 0);
    const half = document.createElement('canvas'); half.width = w / 2; half.height = h / 2;
    const hx = half.getContext('2d'); hx.filter = 'blur(1px)'; hx.drawImage(c, 0, 0, w / 2, h / 2);
    return half.toDataURL('image/png');
  }, `data:image/${path.extname(f).slice(1)};base64,${b64}`);
  const name = `/morph/objects/${path.basename(f, path.extname(f))}-mask.png`;
  writeFileSync(path.join(root, 'public', name), Buffer.from(png.split(',')[1], 'base64'));
  masks.push(f);
  console.log(f, '→', name);
}
await browser.close();
const list = path.join(root, 'data/lightmasks.json');
let prev = []; try { prev = JSON.parse(readFileSync(list, 'utf8')); } catch {}
writeFileSync(list, JSON.stringify([...new Set([...prev, ...masks])].sort(), null, 1) + '\n');
