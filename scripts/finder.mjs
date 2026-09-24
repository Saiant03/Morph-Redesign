// Snapshot Morph's own Fragrance Finder logic (questions, per-perfume tags, weights, product IDs) into data/finder.json.
// Source: the public quiz script on morphparfum.ro/quiz. The script is downloaded as text and its object literals
// are converted to JSON; nothing from it is executed.
// Run: node scripts/finder.mjs   (in the cloud sandbox: NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt)
import fs from 'fs';
import path from 'path';

const PAGE = 'https://morphparfum.ro/quiz/';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const ua = { headers: { 'user-agent': 'Mozilla/5.0 (Morph concept snapshot)' } };

const html = await (await fetch(PAGE, ua)).text();
const src = html.match(/https:\/\/morphparfum\.ro\/wp-content\/plugins\/morph-quiz\/assets\/quiz\.js\?ver=\d+/)?.[0];
if (!src) throw new Error('quiz.js not found on ' + PAGE);
const js = await (await fetch(src, ua)).text();

/** Take the object literal that follows `const NAME =` (balanced braces) and turn it into JSON without evaluating it. */
function literal(name) {
  const start = js.indexOf(`const ${name} = {`);
  if (start < 0) throw new Error(`${name} not found`);
  let i = js.indexOf('{', start), depth = 0, end = i;
  for (; end < js.length; end++) {
    if (js[end] === '{') depth++;
    if (js[end] === '}' && --depth === 0) break;
  }
  const json = js.slice(i, end + 1)
    .replace(/\/\/[^\n]*/g, '')                           // line comments
    .replace(/'((?:[^'\\]|\\.)*)'/g, (_, s) => JSON.stringify(s.replace(/\\'/g, "'")))
    .replace(/([{,]\s*)([A-Za-z_][\w]*)\s*:/g, '$1"$2":')   // bare keys
    .replace(/,(\s*[}\]])/g, '$1');                        // trailing commas
  return JSON.parse(json);
}

const config = literal('QUIZ_CONFIG');
const out = {
  source: src,
  snapshotAt: new Date().toISOString(),
  weights: literal('WEIGHTS'),
  productIds: literal('PRODUCT_IDS'),
  questions: config.questions,
  perfumes: config.perfumes,
};
fs.writeFileSync(path.join(root, 'data/finder.json'), JSON.stringify(out, null, 1));
console.log({ questions: out.questions.length, perfumes: out.perfumes.length, ids: Object.keys(out.productIds).length });
