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

await check('home: lookbook moves to the next spread (button, count, active spread)', async () => {
  const book = pg.getByRole('region', { name: /Cele mai alese/ });
  await pg.getByRole('button', { name: 'Parfumul următor' }).click();
  await pg.waitForTimeout(1200);
  assert(/2 \/ 5/.test(await pg.locator('[aria-live="polite"]', { hasText: '/ 5' }).innerText()), 'count not 2 / 5');
  assert(await book.locator('[data-i="1"]').getAttribute('data-active') === 'true', 'second spread not active');
  assert(await pg.locator('[aria-labelledby="alese-titlu"] a[href^="/morph"]').count() > 0, 'no product links');
});

await check('cart: add opens drawer, quantity, remove, empty state, Escape', async () => {
  await pg.getByRole('region', { name: /Cele mai alese/ }).locator('[data-active="true"]').getByRole('button', { name: /100 ml în coș/ }).click();
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
  await pg.evaluate(() => document.querySelector('#forma-titlu')?.scrollIntoView());
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

await check('no horizontal overflow at 390 / 768 / 1024 / 1440 / 1920', async () => {
  const routes = ['/', '/parfumuri', '/parfumuri/luxury', '/parfumuri/corp', '/morph-zeta-parfum-100ml', '/morph-zeta-gel-de-dus-200-ml', '/morph-crema-de-corp-tonkatonic', '/morph-set-vision', '/descopera', '/descopera/finder', '/layering', '/layering/your-next-form', '/magazin', '/cadouri'];
  for (const w of [390, 768, 1024, 1440, 1920]) {
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
    const measure = () => h.evaluate(() => [...document.querySelectorAll('h1 [data-line]')].map(s => {
      const range = document.createRange(); range.selectNodeContents(s);
      const t = range.getBoundingClientRect(), m = s.parentElement.getBoundingClientRect();
      return t.left >= m.left - 0.5 && t.right <= m.right + 0.5 && t.right <= window.innerWidth;
    }));
    let r = await measure();
    // a large resize can leave container-query layout one frame behind: measure again once before failing
    if (r.length !== 2 || r.includes(false)) { await h.waitForTimeout(150); r = await measure(); }
    if (r.length !== 2 || r.includes(false)) bad.push(w);
  }
  assert(bad.length === 0, `clipped at ${bad.join(', ')}`);
});

const hookVT = t => t.evaluate(() => {
  const vt = document.startViewTransition?.bind(document);
  window.__vt = [];
  if (vt) document.startViewTransition = (...a) => { const tr = vt(...a); window.__vt.push('start'); tr.ready.then(() => window.__vt.push([...document.getAnimations()].map(x => x.effect?.pseudoElement).filter(Boolean).join(' '))).catch(e => window.__vt.push('err ' + e)); return tr; };
});

await check('collection: filters in the URL survive a reload of the static page', async () => {
  await pg.goto(BASE + '/parfumuri/luxury?familie=gourmand', { waitUntil: 'networkidle' });
  assert(await pg.getByRole('group', { name: 'Familie olfactivă' }).getByRole('button', { name: /Gourmand/ }).getAttribute('aria-pressed') === 'true', 'Gourmand not pressed');
  assert(/familie=gourmand/.test(pg.url()), pg.url());
});

await check('nav: panels expose Morph\'s structure (collections, Baie & Corp, Seturi, Despre Morph, Jurnal); keyboard reaches them', async () => {
  const n = await page();
  await n.goto(BASE + '/', { waitUntil: 'networkidle' });
  const nav = n.getByRole('navigation', { name: 'Principal' });
  assert(await nav.locator(':scope > div').count() === 5, 'five primary items');
  await nav.getByRole('link', { name: 'Parfumuri', exact: true }).hover();
  for (const l of ['Les Exclusifs', 'Geluri de duș și creme de corp', 'Coffret: parfum cu gel sau cremă', 'Travel Editions 2×8 ml']) await wait(nav.getByRole('link', { name: l }), l);
  await nav.getByRole('link', { name: 'Magazinul', exact: true }).focus();
  await n.keyboard.press('Tab');
  assert(await n.evaluate(() => document.activeElement?.textContent) === 'Magazinul Morph din București', 'Tab does not enter the panel');
  const j = nav.getByRole('link', { name: /Jurnal/ });
  assert(await j.getAttribute('href') === 'https://morphparfum.ro/blog/' && await j.getAttribute('target') === '_blank', 'Jurnal link');
  const m = await page({ ...devices['iPhone 13'] });
  await m.goto(BASE + '/', { waitUntil: 'networkidle' });
  await m.getByRole('button', { name: 'Meniu' }).click();
  for (const l of ['Coffret: parfum cu gel sau cremă', 'Travel Editions 2×8 ml', 'Despre Morph', 'Gift card']) await wait(m.locator('#meniu').getByRole('link', { name: l }), `sheet: ${l}`);
});

await check('page transition: home world → collection carries the campaign photograph (room-image), desktop and phone', async () => {
  for (const opts of [{ viewport: { width: 1440, height: 900 } }, { ...devices['iPhone 13'] }]) {
    const t = await page(opts);
    await t.goto(BASE + '/', { waitUntil: 'networkidle' });
    await hookVT(t);
    await t.locator('[data-world="luxury"]').scrollIntoViewIfNeeded();
    await t.waitForTimeout(600);
    await t.locator('[data-world="luxury"] a.btn').click();
    await t.waitForURL(/parfumuri\/luxury/);
    await t.waitForTimeout(900);
    const log = await t.evaluate(() => window.__vt);
    assert(/view-transition-group\(room-image\)/.test(log[1] ?? ''), `${opts.viewport?.width ?? 'phone'}: ${JSON.stringify(log).slice(0, 160)}`);
  }
});

await check('page transition: shelf bottle → product morphs into the stage (phone)', async () => {
  const t = await page({ ...devices['iPhone 13'] });
  await t.goto(BASE + '/parfumuri/luxury', { waitUntil: 'networkidle' });
  await hookVT(t);
  await t.getByRole('list', { name: 'Vitrina Luxury' }).getByRole('link', { name: 'Zeta' }).click();
  await t.waitForURL(/morph-zeta-parfum-100ml/);
  await t.waitForTimeout(900);
  const log = await t.evaluate(() => window.__vt);
  assert(/obj-morph-zeta-parfum-100ml/.test(log[1] ?? ''), JSON.stringify(log).slice(0, 200));
});

await check('2.5D Zeta: the glint follows the pointer on the product stage', async () => {
  const t = await page();
  await t.goto(BASE + '/morph-zeta-parfum-100ml', { waitUntil: 'networkidle' });
  const st = t.locator('[data-lit]').first();
  const b = await st.boundingBox();
  await t.mouse.move(b.x + b.width * 0.8, b.y + b.height * 0.3, { steps: 4 });
  await t.waitForTimeout(200);
  const lx = await st.evaluate(e => e.style.getPropertyValue('--lx'));
  assert(parseFloat(lx) > 70, `--lx ${lx}`);
});

await check('page transition: collection row (index view) → product runs a view transition with the shared bottle', async () => {
  const t = await page();
  await t.goto(BASE + '/parfumuri/luxury?vedere=index', { waitUntil: 'networkidle' });
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
  await r.goto(BASE + '/parfumuri/luxury?vedere=index', { waitUntil: 'networkidle' });
  await r.getByRole('heading', { name: 'Zeta' }).getByRole('link').click();
  await r.waitForURL(/morph-zeta-parfum-100ml/);
  await r.waitForTimeout(60);
  const slow = await r.evaluate(() => document.getAnimations().filter(a => (a.effect?.getTiming().duration ?? 0) > 1 && a.playState === 'running').length);
  assert(slow === 0, `${slow} running animations`);
  const op = await r.locator('.page-enter').evaluate(e => getComputedStyle(e).opacity);
  assert(op === '1', `page opacity ${op}`);
});

await check('collection room: Luxury → Ice changes the room in place (photograph, title, shelf)', async () => {
  const t = await page();
  await t.goto(BASE + '/parfumuri/luxury', { waitUntil: 'networkidle' });
  await t.evaluate(() => {
    const vt = document.startViewTransition?.bind(document); window.__vt = [];
    if (vt) document.startViewTransition = (...a) => { const tr = vt(...a); tr.ready.then(() => window.__vt.push([...document.getAnimations()].map(x => x.effect?.pseudoElement).filter(Boolean).join(' '))); return tr; };
  });
  await t.getByRole('navigation', { name: 'Colecții' }).getByRole('link', { name: 'Ice' }).click();
  await t.waitForURL(/parfumuri\/ice/);
  await t.waitForTimeout(1200);
  const log = (await t.evaluate(() => window.__vt)).join(' ');
  for (const n of ['room-image', 'room-title']) assert(log.includes(n), `no ${n}: ${log.slice(0, 160)}`);
  assert(await t.locator('h1').innerText() === 'Ice', 'title');
  assert(await t.getByRole('list', { name: 'Vitrina Ice' }).getByRole('link').count() === 5, 'ice shelf');
});

await check('/parfumuri vitrine: one shelf per collection (8 · 13 · 5), every bottle lit, labels with notes and price', async () => {
  const t = await page();
  await t.goto(BASE + '/parfumuri', { waitUntil: 'networkidle' });
  for (const [c, n] of [['Les Exclusifs', 8], ['Luxury', 13], ['Ice', 5]]) {
    assert(await t.getByRole('heading', { level: 2, name: c }).count() === 1, `no ${c} heading`);
    assert(await t.getByRole('list', { name: `Vitrina ${c}` }).getByRole('link').count() === n, `${c} count`);
  }
  assert(await t.locator('ul[aria-label^="Vitrina"] [data-lit]').count() === 26, 'not every bottle lit');
  const label = await t.getByRole('list', { name: 'Vitrina Luxury' }).getByRole('link', { name: /Zeta/ }).innerText();
  assert(/Cacao din Venezuela/.test(label) && /690 lei/.test(label), label);
  // balanced shelves: Luxury at 1440 stands 5 · 5 · 3
  const ys = await t.getByRole('list', { name: 'Vitrina Luxury' }).locator(':scope > li').evaluateAll(els => els.map(e => Math.round(e.getBoundingClientRect().top)));
  const rows = Object.values(ys.reduce((m, y) => ((m[y] = (m[y] ?? 0) + 1), m), {}));
  assert(rows.join() === '5,5,3', `rows ${rows}`);
  await t.getByRole('button', { name: 'Index', exact: true }).click();
  await t.waitForTimeout(500);
  assert(/vedere=index/.test(t.url()) && await t.locator('ul[aria-label^="Vitrina"]').count() === 0, 'index view');
  assert(await t.evaluate(() => document.activeElement?.textContent) === 'Index', 'view switch lost focus');
  await t.evaluate(() => scrollTo(0, 2400));
  await t.waitForTimeout(200);
  assert(Math.abs((await t.locator('#filtre').boundingBox()).y - 64) < 2, 'filter bar not sticky over the index');
});

await check('vitrine: hover lifts the bottle and moves its light; keyboard focus shows the same state; reduced motion keeps it still', async () => {
  const t = await page();
  await t.goto(BASE + '/parfumuri/ice', { waitUntil: 'networkidle' });
  const item = t.getByRole('list', { name: 'Vitrina Ice' }).getByRole('link').first();
  await item.scrollIntoViewIfNeeded();
  const lit = item.locator('[data-lit]');
  const b = await lit.boundingBox();
  await t.mouse.move(b.x + b.width * 0.8, b.y + b.height * 0.3, { steps: 4 });
  await t.waitForTimeout(800);
  assert(await lit.locator('img').evaluate(e => getComputedStyle(e).transform) !== 'none', 'no lift on hover');
  assert(parseFloat(await lit.evaluate(e => e.style.getPropertyValue('--lx'))) > 60, 'light does not follow');
  await t.mouse.move(5, 5);
  await item.focus();
  await t.keyboard.press('Shift+Tab'); await t.keyboard.press('Tab');
  await t.waitForTimeout(800);
  assert(await item.evaluate(e => e.matches(':focus-visible') && getComputedStyle(e).outlineStyle === 'solid'), 'no focus ring');
  assert(await lit.locator('img').evaluate(e => getComputedStyle(e).transform) !== 'none', 'no lift on focus');
  const r = await page({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await r.goto(BASE + '/parfumuri/ice', { waitUntil: 'networkidle' });
  const ri = r.getByRole('list', { name: 'Vitrina Ice' }).getByRole('link').first();
  await ri.scrollIntoViewIfNeeded();
  await ri.hover();
  await r.waitForTimeout(300);
  assert(await ri.locator('[data-lit] img').evaluate(e => getComputedStyle(e).transform) === 'none', 'moves under reduced motion');
});

await check('vitrine bottle → product morphs into the stage (desktop, /parfumuri)', async () => {
  const t = await page();
  await t.goto(BASE + '/parfumuri', { waitUntil: 'networkidle' });
  await hookVT(t);
  await t.getByRole('list', { name: 'Vitrina Les Exclusifs' }).getByRole('link', { name: /Animal/ }).click();
  await t.waitForURL(/morph-animal-parfum-100ml/);
  await t.waitForTimeout(900);
  const log = await t.evaluate(() => window.__vt);
  assert(/obj-morph-animal-parfum-100ml/.test(log[1] ?? ''), JSON.stringify(log).slice(0, 200));
});

// Phase C2 (docs/design/phase-c2-bath-body-ritual.md): Baie & Corp room, body pages, Coffret, Travel, Seturi
await check('Baie & Corp room: Zeta in three textures on the window, 12 real rituals, Coffret 8 + 11, no rows of add buttons', async () => {
  await pg.goto(BASE + '/parfumuri/corp', { waitUntil: 'networkidle' });
  const win = pg.getByRole('list', { name: 'Ritualul Zeta' }).first();
  assert((await win.getByRole('link').allInnerTexts()).map(t => t.replace(/^Zeta,\s*/, '').split('\n')[0]).join('|') === 'Parfum|Gel de duș|Cremă de corp', 'window textures');
  assert(await pg.locator('#ritualuri h3').count() === 12, 'ritual groups');
  // only real pairs: Animal has a cream and no gel, so its shelf holds two objects
  assert(await pg.getByRole('list', { name: 'Ritualul Animal' }).locator(':scope > li').count() === 2, 'Animal shelf');
  assert(await pg.getByRole('list', { name: 'Set parfum și gel de duș' }).getByRole('link').count() === 8, 'gel sets');
  assert(await pg.getByRole('list', { name: 'Set parfum și cremă de corp' }).getByRole('link').count() === 11, 'cream sets');
  assert(await pg.locator('main').getByRole('button', { name: /^Adaugă/ }).count() === 0, 'add buttons on the room');
  // every object stands on the shelf line: feet within 2 px in the window
  const feet = await win.locator('li').evaluateAll(ls => ls.map(l => Math.round(l.firstElementChild.firstElementChild.getBoundingClientRect().bottom)));
  assert(Math.max(...feet) - Math.min(...feet) <= 2, `feet ${feet}`);
});

await check('Baie & Corp → gel page: the gel morphs into the stage; add to cart at 240 lei; its ritual leads to the perfume', async () => {
  const t = await page();
  await t.goto(BASE + '/parfumuri/corp', { waitUntil: 'networkidle' });
  await hookVT(t);
  await t.getByRole('list', { name: 'Ritualul Zeta' }).first().getByRole('link', { name: /Gel de duș/ }).click();
  await t.waitForURL(/morph-zeta-gel-de-dus-200-ml/);
  await t.waitForTimeout(900);
  const log = await t.evaluate(() => window.__vt);
  assert(/obj-morph-zeta-gel-de-dus-200-ml/.test(log[1] ?? ''), JSON.stringify(log).slice(0, 200));
  assert(await t.locator('h1').innerText() === 'Zeta' && /Gel de duș/i.test(await t.locator('main').innerText()), 'gel page');
  await t.getByRole('button', { name: /Adaugă gel de duș Zeta în coș/ }).click();
  const dialog = t.getByRole('dialog', { name: 'Coșul tău' });
  await dialog.waitFor({ state: 'visible' });
  assert(/240 lei/.test(await dialog.innerText()), 'gel price in cart');
  await t.keyboard.press('Escape');
  await dialog.waitFor({ state: 'hidden' });
  const shelf = t.getByRole('list', { name: 'Ritualul Zeta' });
  assert(await shelf.locator('[aria-current="page"]').count() === 1, 'current object not marked');
  await hookVT(t);
  await shelf.getByRole('link', { name: /Parfum/ }).click();
  await t.waitForURL(/morph-zeta-parfum-100ml$/);
  await t.waitForTimeout(900);
  assert(/group\(obj-morph-zeta-parfum-100ml\)/.test((await t.evaluate(() => window.__vt)).join(' ')), 'body → perfume morph');
});

await check('perfume PDP ritual (phone): N8 cream on the shelf → its page with the object morph', async () => {
  const t = await page({ ...devices['iPhone 13'] });
  await t.goto(BASE + '/morph-n8-parfum-100ml', { waitUntil: 'networkidle' });
  const shelf = t.getByRole('list', { name: 'Ritualul N8' });
  assert(await shelf.locator('[aria-current="page"]').innerText().then(x => /Parfum/.test(x)), 'perfume is current');
  await shelf.scrollIntoViewIfNeeded();
  await hookVT(t);
  await shelf.getByRole('link', { name: /Cremă de corp/ }).click();
  await t.waitForURL(/morph-crema-de-corp-n8/);
  await t.waitForTimeout(900);
  assert(/obj-morph-crema-de-corp-n8/.test((await t.evaluate(() => window.__vt))[1] ?? ''), 'cream morph');
});

await check('Coffret: a set opens its page with the separate price; a cream set quotes Morph on the yearly edition', async () => {
  const t = await page();
  await t.goto(BASE + '/parfumuri/corp#coffret', { waitUntil: 'networkidle' });
  await t.getByRole('list', { name: 'Set parfum și cremă de corp' }).getByRole('link', { name: /Zeta/ }).click();
  await t.waitForURL(/morph-set-zeta/);
  const main = await t.locator('main').innerText();
  assert(/840 lei/.test(main) && /separat 1\.000 lei/.test(main), 'set prices');
  assert(/o dată pe an/.test(main), 'Morph line on cream sets');
});

await check('Seturi: every link in the nav resolves to a real destination on the page', async () => {
  const n = await page();
  const targets = { 'Coffret: parfum cu gel sau cremă': '#coffret', 'Travel Editions 2×8 ml': '#travel', 'Mostre și Discovery': '#incearca', 'Seturi layering Your Next Form': 'h1' };
  for (const [label, sel] of Object.entries(targets)) {
    await n.goto(BASE + '/', { waitUntil: 'networkidle' });
    const nav = n.getByRole('navigation', { name: 'Principal' });
    await nav.getByRole('link', { name: 'Parfumuri', exact: true }).hover();
    const link = nav.getByRole('link', { name: label });
    const href = await link.getAttribute('href');
    await link.click();
    await n.waitForURL(u => u.pathname === href.split('#')[0]);
    await n.locator(sel).first().waitFor({ state: 'attached', timeout: 5000 }).catch(() => {});
    assert(await n.locator(sel).count() >= 1, `${label}: ${sel} missing at ${n.url()}`);
  }
});

await check('Travel Editions: bottle and travel box on one shelf, 12 scents with a travel set', async () => {
  const t = await page();
  await t.goto(BASE + '/descopera#travel', { waitUntil: 'networkidle' });
  const shelf = t.getByRole('list', { name: /Zeta: sticla și Travel Editions/ });
  assert(await shelf.locator(':scope > li').count() === 2, 'travel shelf');
  assert(/2×8 ml · 230 lei/.test(await shelf.innerText()), 'travel price');
  assert(await t.locator('#travel').getByRole('button', { name: /travel 2×8 ml în coș/ }).count() === 12, 'travel scents');
});

await check('ritual objects: keyboard focus lifts the object as hover does; reduced motion keeps it still', async () => {
  const lift = async (t, how) => {
    const a = t.getByRole('list', { name: 'Ritualul GATE 17' }).getByRole('link', { name: /Gel de duș/ });
    await a.scrollIntoViewIfNeeded();
    if (how === 'focus') await a.focus(); else await a.hover();
    await t.waitForTimeout(800);
    return a.locator('img').first().evaluate(e => getComputedStyle(e.parentElement).transform);
  };
  const t = await page();
  await t.goto(BASE + '/parfumuri/corp', { waitUntil: 'networkidle' });
  await t.keyboard.press('Tab');
  assert((await lift(t, 'focus')) !== 'none', 'focus: no lift');
  assert((await lift(t, 'hover')) !== 'none', 'hover: no lift');
  const r = await page({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await r.goto(BASE + '/parfumuri/corp', { waitUntil: 'networkidle' });
  assert((await lift(r, 'hover')) === 'none', 'reduced motion lifts');
});

await check('cart: threshold suggestion is a real product that covers the gap; gift box line', async () => {
  const c = await page();
  await c.goto(BASE + '/morph-zeta-parfum-100ml', { waitUntil: 'networkidle' });
  await c.getByRole('button', { name: /Adaugă în coș/ }).click();
  const dialog = c.getByRole('dialog', { name: 'Coșul tău' });
  await dialog.waitFor({ state: 'visible' });
  const text = await dialog.innerText();
  assert(/Mai ai 60 lei/.test(text) && /Îl acoperă:.*(Travel 2×8 ml|Gel de duș) Zeta/.test(text.replace(/\n/g, ' ')), text.slice(0, 200));
  await dialog.getByRole('checkbox', { name: /Cutie cadou/ }).check();
  assert(/Cutie cadou/.test(await dialog.locator('ul').first().innerText()), 'gift box line');
});

await check('no console errors', async () => { assert(errors.length === 0, errors.slice(0, 3).join(' | ')); });

await browser.close();
console.log(results.join('\n'));
console.log(failed ? `\n${failed} failed` : '\nall passed');
process.exit(failed ? 1 : 0);
