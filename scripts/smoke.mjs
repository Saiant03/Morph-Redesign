// Interaction smoke test for the concept. Runs against a started server (npm run build && npm start).
// Usage: node scripts/smoke.mjs [baseUrl]   — uses the globally installed Playwright and preinstalled Chromium.
import { createRequire } from 'module';
import { execSync } from 'child_process';
const require = createRequire(import.meta.url);
const { chromium, devices } = require(execSync('npm root -g').toString().trim() + '/playwright');

const BASE = process.argv[2] ?? 'http://localhost:3000';
const results = [];
let failed = 0;
async function check(name, fn) {
  try { await fn(); results.push(`ok   ${name}`); }
  catch (e) { failed++; results.push(`FAIL ${name}: ${String(e.message ?? e).split('\n')[0]}`); }
}
const assert = (c, msg) => { if (!c) throw new Error(msg); };
const wait = (loc, msg, state = 'visible') => loc.waitFor({ state, timeout: 5000 }).catch(() => { throw new Error(`timeout: ${msg}`); });

const browser = await chromium.launch();
const errors = [];
async function page(opts = { viewport: { width: 1440, height: 900 } }) {
  const ctx = await browser.newContext(opts);
  const pg = await ctx.newPage();
  pg.on('pageerror', e => errors.push(`${pg.url()}: ${e}`));
  pg.on('console', m => m.type() === 'error' && errors.push(`${pg.url()}: ${m.text()}`));
  return pg;
}

const pg = await page();

await check('home: hero, motto as h1', async () => {
  await pg.goto(BASE + '/', { waitUntil: 'networkidle' });
  const h1 = (await pg.locator('h1').innerText()).replace(/\s+/g, ' ');
  assert(/Metamorfoză prin parfum/.test(h1), h1);
});

await check('skip link is first in tab order', async () => {
  await pg.keyboard.press('Tab');
  assert(await pg.evaluate(() => document.activeElement?.classList.contains('skip')), 'skip link not focused');
});

await check('home: featured focus swaps the object', async () => {
  const names = pg.getByRole('list', { name: 'Cele mai alese' }).getByRole('button');
  await names.nth(1).click();
  await pg.waitForTimeout(900);
  assert(await names.nth(1).getAttribute('aria-pressed') === 'true', 'second name not pressed');
  const label = (await names.nth(1).innerText()).split('\n')[1];
  const title = await pg.getByRole('region', { name: 'Parfumul din vitrină' }).locator('h3').innerText();
  assert(title.trim() === label.trim(), `${title} ≠ ${label}`);
});

await check('cart: add opens drawer, quantity, remove, empty state, Escape', async () => {
  await pg.getByRole('region', { name: 'Parfumul din vitrină' }).getByRole('button', { name: /Adaugă 100 ml/ }).click();
  const dialog = pg.getByRole('dialog', { name: 'Coșul tău' });
  await dialog.waitFor({ state: 'visible' });
  await dialog.getByRole('button', { name: /Crește cantitatea/ }).click();
  assert((await dialog.locator('[aria-live]').first().innerText()) === '2', 'qty not 2');
  assert(/2 produse/.test(await pg.getByRole('button', { name: /^Coș/ }).getAttribute('aria-label')), 'header count');
  await dialog.getByRole('button', { name: /^Scoate/ }).click();
  await dialog.getByText('Coșul e gol.').waitFor();
  await pg.keyboard.press('Escape');
  await pg.waitForTimeout(700);
  assert(await pg.locator('[data-open="true"]').count() === 0, 'drawer still open');
});

await check('search: overlay, focus, note results, Escape returns focus', async () => {
  const btn = pg.getByRole('button', { name: 'Caută' });
  await btn.click();
  const dlg = pg.getByRole('dialog', { name: 'Caută' });
  await wait(dlg, 'overlay open');
  await pg.waitForTimeout(100);
  assert(await pg.evaluate(() => document.activeElement?.getAttribute('type') === 'search'), 'input not focused');
  await pg.keyboard.type('vanilie');
  await wait(dlg.getByRole('region', { name: 'După notă' }), 'note results');
  const n = await dlg.getByRole('region', { name: 'După notă' }).getByRole('link').count();
  assert(n >= 3, `only ${n} vanilla results`);
  await pg.keyboard.press('Escape');
  await pg.waitForTimeout(400);
  assert(await pg.evaluate(() => document.activeElement?.textContent === 'Caută'), 'focus not returned');
  await pg.waitForTimeout(200);
  await pg.keyboard.press('/');
  await wait(dlg, 'reopen with /');
  await pg.keyboard.type('xyzq');
  await wait(dlg.getByText(/Nimic pentru/), 'empty state');
  await pg.keyboard.press('Escape');
  await pg.waitForTimeout(400);
});

await check('header takes the tone of the chapter under it', async () => {
  await pg.evaluate(() => window.scrollTo(0, 0));
  await pg.waitForTimeout(400);
  assert(await pg.locator('header').getAttribute('data-tone') === 'dark', 'not dark over hero');
  await pg.evaluate(() => document.querySelector('#alese-titlu')?.scrollIntoView());
  await pg.waitForTimeout(400);
  assert(await pg.locator('header').getAttribute('data-tone') === null, 'not stone over light chapter');
});

await check('collection: family filter writes URL; note search', async () => {
  await pg.goto(BASE + '/parfumuri/luxury', { waitUntil: 'networkidle' });
  assert(await pg.getByRole('list', { name: 'Vitrina Luxury' }).getByRole('link').count() === 13, 'shelf count');
  await pg.getByRole('group', { name: 'Familie olfactivă' }).getByRole('button', { name: /Gourmand/ }).click();
  await pg.waitForTimeout(600);
  assert(/familie=gourmand/.test(pg.url()), pg.url());
  await pg.goto(BASE + '/parfumuri?q=vanilie', { waitUntil: 'networkidle' });
  assert(/\d+ parfum/.test(await pg.locator('[aria-live="polite"]').first().innerText()), 'count line');
});

await check('PDP: travel format updates CTA, buy bar, time on skin', async () => {
  await pg.goto(BASE + '/morph-zeta-parfum-100ml', { waitUntil: 'networkidle' });
  await pg.getByRole('radio', { name: /Travel/ }).click();
  assert(/230 lei/.test(await pg.getByRole('button', { name: /Adaugă în coș/ }).innerText()), 'CTA price');
  await pg.getByRole('group', { name: 'Etapă' }).getByRole('button', { name: /Bază/ }).click();
  await pg.waitForTimeout(1500);
  assert(await pg.getByRole('group', { name: 'Etapă' }).getByRole('button', { name: /Bază/ }).getAttribute('aria-pressed') === 'true', 'phase not base');
  assert(await pg.locator('[data-show="true"]').count() === 1, 'buy bar not shown');
});

await check('finder: seven answers → Zeta, why, try, buy', async () => {
  await pg.goto(BASE + '/descopera/finder', { waitUntil: 'networkidle' });
  for (const label of ['Seducătoare și magnetică', 'Sofisticat', 'Condimente și orient', 'La evenimente', 'Elegant și echilibrat', 'Toamna', 'Oricare colecție']) {
    await pg.getByRole('button', { name: new RegExp(label) }).click();
    await pg.waitForTimeout(450);
  }
  await pg.waitForURL(/rezultat/);
  await pg.waitForLoadState('networkidle');
  assert(/Zeta/.test(await pg.locator('h1').innerText()), 'not Zeta');
  assert(await pg.getByText(/Morph l-a etichetat cu 6 din cele 6/).count() >= 1, 'reasons');
  assert(await pg.getByRole('button', { name: /travel 2×8 ml în coș/ }).count() >= 1, 'try');
});

await check('layering: URL pair, change slot updates URL, disclaimer', async () => {
  await pg.goto(BASE + '/layering?a=morph-zeta-parfum-100ml&b=morph-kolonaki-parfum-100ml', { waitUntil: 'networkidle' });
  assert(await pg.getByText('Aceasta este o vizualizare a celor două compoziții după notele publicate de Morph, nu o recomandare Morph.').count() === 1, 'disclaimer');
  await pg.getByRole('button', { name: /Al doilea strat/ }).click();
  await pg.getByRole('group', { name: 'Al doilea strat, Ice' }).getByRole('button', { name: 'Tonkatonic' }).click();
  await pg.waitForTimeout(400);
  assert(/b=morph-tonkatonic-100ml/.test(pg.url()), pg.url());
  await pg.goto(BASE + '/layering?a=morph-garbage&b=morph-garbage', { waitUntil: 'networkidle' });
  assert(await pg.locator('h1').count() === 1, 'invalid slugs broke the page');
});

await check('try list: Descoperă → shop selection', async () => {
  await pg.goto(BASE + '/descopera', { waitUntil: 'networkidle' });
  await pg.getByRole('button', { name: /Adaugă Zeta pe lista/ }).click();
  await pg.goto(BASE + '/magazin', { waitUntil: 'networkidle' });
  await pg.getByRole('link', { name: 'Zeta' }).first().waitFor();
});

await check('cadouri: budget index and gift card facts', async () => {
  await pg.goto(BASE + '/cadouri', { waitUntil: 'networkidle' });
  assert(await pg.getByRole('region', { name: 'După buget' }).getByRole('link').count() >= 4, 'budget rows');
  assert(await pg.getByText('180 de zile').count() === 1, 'gift card validity');
});

await check('reduced motion: hero and reveals fully visible', async () => {
  const rm = await page({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await rm.goto(BASE + '/', { waitUntil: 'networkidle' });
  await rm.evaluate(() => window.scrollTo(0, 1200));
  await rm.waitForTimeout(300);
  assert(await rm.locator('[data-reveal="hidden"]').count() === 0, 'hidden reveal under reduced motion');
  const op = await rm.locator('[data-dim]').evaluate(e => getComputedStyle(e).opacity);
  assert(op === '0', `hero dim ${op}`);
});

await check('no horizontal overflow at 390 / 768 / 1024 / 1440', async () => {
  const routes = ['/', '/parfumuri/luxury', '/morph-zeta-parfum-100ml', '/descopera', '/descopera/finder', '/layering', '/layering/your-next-form', '/magazin', '/cadouri'];
  for (const w of [390, 768, 1024, 1440]) {
    const p = await page(w === 390 ? { ...devices['iPhone 13'] } : { viewport: { width: w, height: 900 } });
    for (const r of routes) {
      await p.goto(BASE + r, { waitUntil: 'networkidle' });
      const o = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      assert(o <= 0, `${r} at ${w}: ${o}px`);
    }
  }
});

await check('mobile PDP: price and CTA in the first viewport', async () => {
  const m = await page({ ...devices['iPhone 13'] });
  await m.goto(BASE + '/morph-zeta-parfum-100ml', { waitUntil: 'networkidle' });
  const box = await m.getByRole('button', { name: /Adaugă în coș/ }).boundingBox();
  assert(box && box.y + box.height <= 664, `CTA bottom at ${box && box.y + box.height}`);
});

await check('naming: /casa-morph redirects; "Casa Morph" appears nowhere', async () => {
  const r = await pg.goto(BASE + '/casa-morph', { waitUntil: 'networkidle' });
  assert(new URL(pg.url()).pathname === '/magazin' && r.ok(), pg.url());
  for (const route of ['/', '/magazin', '/descopera', '/descopera/finder/rezultat?r=1', '/layering', '/layering/your-next-form', '/morph-zeta-parfum-100ml', '/cadouri']) {
    await pg.goto(BASE + route, { waitUntil: 'networkidle' });
    const html = await pg.content();
    assert(!/Casa Morph/i.test(html), `"Casa Morph" on ${route}`);
  }
});

await check('hero: "Metamorfoză prin parfum." never clipped, 320–1920 px every 10 px', async () => {
  const h = await page({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await h.goto(BASE + '/', { waitUntil: 'networkidle' });
  await h.evaluate(() => document.fonts.ready);
  const bad = [];
  for (let w = 320; w <= 1920; w += 10) {
    await h.setViewportSize({ width: w, height: 900 });
    await h.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
    const r = await h.evaluate(() => [...document.querySelectorAll('h1 [data-line]')].map(s => {
      const range = document.createRange(); range.selectNodeContents(s);
      const t = range.getBoundingClientRect(), m = s.parentElement.getBoundingClientRect();
      return t.left >= m.left - 0.5 && t.right <= m.right + 0.5 && t.right <= window.innerWidth;
    }));
    if (r.length !== 2 || r.includes(false)) bad.push(w);
  }
  assert(bad.length === 0, `clipped at ${bad.join(', ')}`);
});

await check('page transition: collection row → product runs a view transition with the shared bottle', async () => {
  const t = await page();
  await t.goto(BASE + '/parfumuri/luxury', { waitUntil: 'networkidle' });
  await t.evaluate(() => {
    const vt = document.startViewTransition?.bind(document);
    window.__vt = [];
    if (vt) document.startViewTransition = (...a) => { const tr = vt(...a); window.__vt.push('start'); tr.ready.then(() => window.__vt.push([...document.getAnimations()].map(x => x.effect?.pseudoElement).filter(Boolean).join(' '))).catch(e => window.__vt.push('err ' + e)); return tr; };
  });
  await t.getByRole('heading', { name: 'Zeta' }).getByRole('link').click();
  await t.waitForURL(/morph-zeta-parfum-100ml/);
  await t.waitForTimeout(900);
  const log = await t.evaluate(() => window.__vt);
  assert(log[0] === 'start', `no view transition: ${JSON.stringify(log)}`);
  assert(/obj-morph-zeta-parfum-100ml/.test(log[1] ?? ''), `no shared bottle: ${JSON.stringify(log).slice(0, 200)}`);
  assert(await t.locator('h1').innerText() === 'Zeta', 'wrong page');
});

await check('page transition under reduced motion: no animation, content visible at once', async () => {
  const r = await page({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await r.goto(BASE + '/parfumuri/luxury', { waitUntil: 'networkidle' });
  await r.getByRole('heading', { name: 'Zeta' }).getByRole('link').click();
  await r.waitForURL(/morph-zeta-parfum-100ml/);
  await r.waitForTimeout(60);
  const slow = await r.evaluate(() => document.getAnimations().filter(a => (a.effect?.getTiming().duration ?? 0) > 1 && a.playState === 'running').length);
  assert(slow === 0, `${slow} running animations`);
  const op = await r.locator('.page-enter').evaluate(e => getComputedStyle(e).opacity);
  assert(op === '1', `page opacity ${op}`);
});

await check('no console errors', async () => { assert(errors.length === 0, errors.slice(0, 3).join(' | ')); });

await browser.close();
console.log(results.join('\n'));
console.log(failed ? `\n${failed} failed` : '\nall passed');
process.exit(failed ? 1 : 0);
