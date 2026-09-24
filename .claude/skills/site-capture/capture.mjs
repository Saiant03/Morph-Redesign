// Render pages in Chromium (desktop 1440 + iPhone 13), save screenshots and a structural JSON extract.
// Usage: node capture.mjs <baseUrl> <outDir> <path> [path...]   ("" = homepage)
// In the cloud sandbox run with: NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt
import { createRequire } from 'module';
import { execSync } from 'child_process';
import fs from 'fs';
const require = createRequire(import.meta.url);
const { chromium, devices } = require(execSync('npm root -g').toString().trim() + '/playwright');

const [base, out, ...paths] = process.argv.slice(2);
if (!base || !out || !paths.length) { console.error('usage: node capture.mjs <baseUrl> <outDir> <path>...'); process.exit(1); }
fs.mkdirSync(`${out}/shots`, { recursive: true }); fs.mkdirSync(`${out}/data`, { recursive: true });
const viaNode = !!process.env.NODE_EXTRA_CA_CERTS; // route requests through Node so the sandbox proxy CA is trusted

const browser = await chromium.launch();
for (const mode of ['desktop', 'mobile']) {
  const ctx = await browser.newContext(mode === 'mobile' ? { ...devices['iPhone 13'] } : { viewport: { width: 1440, height: 900 } });
  for (const p of paths) {
    const pg = await ctx.newPage();
    if (viaNode) await pg.route('**/*', async route => {
      const rq = route.request();
      try {
        const h = { ...rq.headers() }; delete h['accept-encoding'];
        const r = await fetch(rq.url(), { method: rq.method(), headers: h, body: ['GET', 'HEAD'].includes(rq.method()) ? undefined : rq.postDataBuffer(), redirect: 'manual' });
        const hdr = {}; r.headers.forEach((v, k) => { if (!['content-encoding', 'content-length', 'transfer-encoding'].includes(k)) hdr[k] = v; });
        await route.fulfill({ status: r.status, headers: hdr, body: Buffer.from(await r.arrayBuffer()) });
      } catch { await route.abort().catch(() => {}); }
    });
    const name = (p.replace(/[^a-z0-9]+/gi, '_') || 'home') + '_' + mode;
    let reqs = 0; pg.on('request', () => reqs++);
    const errors = []; pg.on('console', m => { if (m.type() === 'error') errors.push(m.text()); }); pg.on('pageerror', e => errors.push(String(e)));
    try { await pg.goto(base.replace(/\/$/, '') + '/' + p, { waitUntil: 'networkidle', timeout: 60000 }); } catch (e) { console.log('WARN', p, e.message.split('\n')[0]); }
    await pg.waitForTimeout(1500);
    await pg.screenshot({ path: `${out}/shots/${name}_top.png` });
    await pg.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } window.scrollTo(0, 0); });
    await pg.waitForTimeout(800);
    await pg.screenshot({ path: `${out}/shots/${name}_full.jpg`, fullPage: true, type: 'jpeg', quality: 45 });
    const d = await pg.evaluate(() => {
      const cs = sel => { const e = document.querySelector(sel); if (!e) return null; const s = getComputedStyle(e); return { font: s.fontFamily, size: s.fontSize, weight: s.fontWeight, color: s.color }; };
      const fonts = {}; document.querySelectorAll('body *').forEach(e => { if (!e.children.length && e.innerText?.trim()) { const f = getComputedStyle(e).fontFamily; fonts[f] = (fonts[f] || 0) + 1; } });
      return {
        title: document.title, height: document.body.scrollHeight,
        heads: [...document.querySelectorAll('h1,h2,h3')].map(h => h.tagName + ': ' + h.innerText.trim().replace(/\s+/g, ' ')).slice(0, 60),
        nav: [...new Set([...document.querySelectorAll('header a, nav a')].map(a => a.innerText.trim() + ' -> ' + a.getAttribute('href')))].slice(0, 120),
        body: cs('body'), h1: cs('h1'), fonts: Object.entries(fonts).sort((a, b) => b[1] - a[1]).slice(0, 8),
        scripts: document.scripts.length, imgs: document.images.length,
        text: document.body.innerText.replace(/\n\s*\n+/g, '\n').slice(0, 9000)
      };
    });
    d.requests = reqs; d.errors = errors;
    const overflow = await pg.evaluate(() => document.documentElement.scrollWidth - window.innerWidth); d.overflowX = overflow;
    fs.writeFileSync(`${out}/data/${name}.json`, JSON.stringify(d, null, 1));
    console.log(name, `${reqs} reqs`, `${d.height}px`, overflow > 0 ? `OVERFLOW-X ${overflow}px` : '', errors.length ? `ERRORS ${errors.length}: ${errors[0].slice(0, 160)}` : '');
    await pg.close();
  }
  await ctx.close();
}
await browser.close();
