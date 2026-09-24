// Sample each perfume's juice color from its main packshot (saturated pixels only) -> data/colors.json.
// Also writes a contact sheet PNG (argv[2]) for visual verification. Uses the global Playwright + preinstalled Chromium.
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { execSync } from 'child_process';
const require = createRequire(import.meta.url);
const { chromium } = require(execSync('npm root -g').toString().trim() + '/playwright');

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const cat = JSON.parse(fs.readFileSync(path.join(root, 'data/catalog.json'), 'utf8'));
const overridesFile = path.join(root, 'data/colors.overrides.json');
const overrides = fs.existsSync(overridesFile) ? JSON.parse(fs.readFileSync(overridesFile, 'utf8')) : {};
const imgs = cat.perfumes.map(p => ({ slug: p.slug, name: p.shortName, src: 'data:image/avif;base64,' + fs.readFileSync(path.join(root, 'public', p.images[0])).toString('base64') }));

const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 1400, height: 900 } });
const res = await pg.evaluate(async (imgs) => {
  const out = {};
  for (const it of imgs) {
    const im = new Image(); im.src = it.src; await im.decode();
    const c = document.createElement('canvas'); c.width = im.naturalWidth; c.height = im.naturalHeight;
    const x = c.getContext('2d'); x.drawImage(im, 0, 0);
    const d = x.getImageData(0, 0, c.width, c.height).data;
    // collect saturated, mid-light pixels (the juice), ignore white bg, grey glass/cap and dark label print
    const px = [];
    for (let i = 0; i < d.length; i += 16) {
      const r = d[i], g = d[i + 1], bl = d[i + 2];
      const mx = Math.max(r, g, bl), mn = Math.min(r, g, bl), s = mx ? (mx - mn) / mx : 0;
      if (s > 0.35 && mx > 60 && mx < 250) px.push([r, g, bl, s]);
    }
    px.sort((a, b2) => b2[3] - a[3]);
    const top = px.slice(0, Math.max(40, Math.floor(px.length * 0.6)));
    const med = k => { const v = top.map(p => p[k]).sort((a, b2) => a - b2); return v[Math.floor(v.length / 2)] || 128; };
    const toHex = a => '#' + a.map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
    const hue = ([r, g, bl]) => { const mx = Math.max(r, g, bl), mn = Math.min(r, g, bl); if (mx === mn) return 0; let h = mx === r ? (g - bl) / (mx - mn) : mx === g ? 2 + (bl - r) / (mx - mn) : 4 + (r - g) / (mx - mn); h *= 60; return h < 0 ? h + 360 : h; };
    const medOf = arr => [0, 1, 2].map(k => { const v = arr.map(p => p[k]).sort((a, b2) => a - b2); return v[Math.floor(v.length / 2)] || 128; });
    // juice = the warm yellow/amber body (hue 25-60); accent = the largest non-juice saturated cluster (label band)
    const juicePx = px.filter(p => { const h = hue(p); return h >= 25 && h <= 62; });
    const other = px.filter(p => { const h = hue(p); return !(h >= 25 && h <= 62); });
    const juice = toHex(medOf(juicePx.length > 30 ? juicePx : top));
    const accent = other.length > Math.max(60, px.length * 0.08) ? toHex(medOf(other)) : null;
    out[it.slug] = { juice, accent, w: im.naturalWidth, h: im.naturalHeight, share: +(other.length / (px.length || 1)).toFixed(2) };
  }
  return out;
}, imgs);

const colors = {};
for (const p of cat.perfumes) {
  const r = res[p.slug], o = overrides[p.slug] || {};
  const juice = o.juice || r.juice, accent = o.accent !== undefined ? o.accent : r.accent;
  colors[p.slug] = { name: p.shortName, collection: p.collection, juice, accent, identity: accent || juice, method: Object.keys(o).length ? 'sampled+manual' : 'sampled', accentShare: r.share };
}
fs.writeFileSync(path.join(root, 'data/colors.json'), JSON.stringify(colors, null, 1));

if (process.argv[2]) {
  await pg.setContent(`<body style="margin:0;font:12px sans-serif;display:grid;grid-template-columns:repeat(9,1fr)">${imgs.map(i => `<div><img src="${i.src}" style="width:100%;display:block"><div style="display:flex"><div style="flex:1;background:${colors[i.slug].juice};padding:4px">${i.name}</div><div style="flex:1;background:${colors[i.slug].accent||'#fff'};padding:4px;color:#fff">${colors[i.slug].accent||'-'}</div></div></div>`).join('')}</body>`);
  await pg.waitForTimeout(500);
  await pg.screenshot({ path: process.argv[2], fullPage: true });
}
await b.close();
console.log(Object.values(colors).map(c => `${c.name.padEnd(12)} ${c.collection.padEnd(14)} juice ${c.juice} accent ${c.accent} (${c.accentShare})`).join('\n'));
