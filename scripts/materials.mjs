// Bakes the procedural materials (docs/design/phase-a-creative-system.md) to WebP files in public/materials.
// Rendered once in the preinstalled Chromium (global Playwright), so the site never runs live SVG filters.
// Usage: npm run materials
import { createRequire } from 'module';
import { execSync } from 'child_process';
import { mkdirSync, writeFileSync } from 'fs';
const require = createRequire(import.meta.url);
const { chromium } = require(execSync('npm root -g').toString().trim() + '/playwright');

const OUT = new URL('../public/materials/', import.meta.url);
mkdirSync(OUT, { recursive: true });

// Walnut: a wall of vertical panels, not one stretched sheet. Each panel has its own grain (anisotropic
// noise, wavered by a slow displacement), its own figure and a satin fall-off from a light above-left;
// panels are separated by shadow gaps with a lit edge. Luminance stays in a narrow band so text reads on it.
function walnut(W = 2400, H = 1500) {
  const widths = [430, 310, 520, 370, 460, 330, 480, 350];
  let x = 0, i = 0, panels = '';
  const gap = 5;
  while (x < W) {
    const w = widths[i % widths.length];
    const seed = 11 + i * 7;
    panels += `
      <filter id="g${i}" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.09 0.0018" numOctaves="4" seed="${seed}" result="grain"/>
        <feTurbulence type="fractalNoise" baseFrequency="0.004 0.0009" numOctaves="2" seed="${seed + 3}" result="waver"/>
        <feDisplacementMap in="grain" in2="waver" scale="16" xChannelSelector="R" yChannelSelector="G" result="bent"/>
        <feColorMatrix in="bent" type="matrix" values="
          0 0 0 0 0.075
          0 0 0 0 0.047
          0 0 0 0 0.031
          -2.2 0 0 0 1.32" result="streaks"/>
        <feTurbulence type="fractalNoise" baseFrequency="0.0016 0.0005" numOctaves="2" seed="${seed + 5}" result="fig"/>
        <feColorMatrix in="fig" type="matrix" values="
          0 0 0 0 0.205
          0 0 0 0 0.140
          0 0 0 0 0.095
          1.3 0 0 0 -0.45" result="figure"/>
        <feFlood flood-color="#2a1b12" result="base"/>
        <feComposite in="figure" in2="base" operator="over" result="b2"/>
        <feComposite in="streaks" in2="b2" operator="over"/>
      </filter>
      <linearGradient id="s${i}" x1="0" y1="0" x2="1" y2="0.35">
        <stop offset="0" stop-color="#f3d9bd" stop-opacity="${0.045 - (i % 3) * 0.01}"/>
        <stop offset="0.45" stop-color="#f3d9bd" stop-opacity="0.018"/>
        <stop offset="1" stop-color="#000" stop-opacity="0.18"/>
      </linearGradient>
      <g transform="translate(${x} 0)">
        <rect width="${w}" height="${H}" filter="url(#g${i})"/>
        <rect width="${w}" height="${H}" fill="url(#s${i})"/>
        <rect width="2" height="${H}" fill="#f6dcc0" fill-opacity="0.07"/>
        <rect x="${w - gap}" width="${gap}" height="${H}" fill="#0b0806"/>
        <rect x="${w - gap - 2}" width="2" height="${H}" fill="#000" fill-opacity="0.35"/>
      </g>`;
    x += w; i++;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${panels}</svg>`;
}

// Grain: a seamless, neutral luminance noise with alpha. One tile works on stone and on night; it only
// prevents gradient banding and gives the flat tones a surface. Never animated.
const grain = (S = 256) => `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}">
  <filter id="n" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="4" stitchTiles="stitch"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.5  0 0 0 0 0.47  0 0 0 0 0.43  0.14 0 0 0 -0.03"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#n)"/>
</svg>`;

// Paper: fine fibres (anisotropic) plus grain, seamless, with alpha; for the newsletter card and pull quotes.
const paper = (S = 512) => `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}">
  <filter id="p" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.012 0.18" numOctaves="3" seed="9" stitchTiles="stitch" result="f"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2" stitchTiles="stitch" result="g"/>
    <feBlend in="f" in2="g" mode="multiply"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.45  0 0 0 0 0.42  0 0 0 0 0.38  0.5 0 0 0 -0.12"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#p)"/>
</svg>`;

const jobs = [
  { file: 'walnut.webp', svg: walnut(), w: 2400, h: 1500, q: 0.8 },
  { file: 'grain.webp', svg: grain(160), w: 160, h: 160, q: 0.55 },
  { file: 'paper.webp', svg: paper(256), w: 256, h: 256, q: 0.55 },
];

const browser = await chromium.launch();
const page = await browser.newPage();
for (const j of jobs) {
  const dataUrl = await page.evaluate(async ({ svg, w, h, q }) => {
    const img = new Image();
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    await img.decode();
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    c.getContext('2d').drawImage(img, 0, 0, w, h);
    return c.toDataURL('image/webp', q);
  }, j);
  const buf = Buffer.from(dataUrl.split(',')[1], 'base64');
  writeFileSync(new URL(j.file, OUT), buf);
  console.log(`${j.file}  ${j.w}×${j.h}  ${(buf.length / 1024).toFixed(0)} KB`);
}
await browser.close();
