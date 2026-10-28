// Ücretsiz, bağımlılıksız konsept paftası denetimi: node scripts/validate-pati-concept.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const file = new URL('../assets/concepts/pati-model-sheet-v01.svg', import.meta.url);
const svg = readFileSync(file, 'utf8');

assert.match(svg, /^<svg\b/);
assert.match(svg, /viewBox="0 0 1600 980"/);
assert.match(svg, /role="img"/);
assert.match(svg, /<title id="title">[^<]+<\/title>/);
assert.match(svg, /<desc id="desc">[^<]+<\/desc>/);
assert.match(svg, /2D referans \/ GLB değildir/);
assert.equal((svg.match(/<rect class="panel"/g) || []).length, 4, 'Dört ayrı açı paneli gerekli');
for (const title of ['ÖN', 'SOL PROFİL', 'ARKA', '3/4 AÇI']) {
  assert(svg.includes('>' + title + '</text>'), title + ' görünümü yok');
}
for (const characteristic of ['Altın karamel', 'Krem işaretler', 'Sol kulak koyu', 'Sıcak kahverengi göz']) {
  assert(svg.includes(characteristic), characteristic + ' referansı yok');
}
assert(!/<script\b|<foreignObject\b|<image\b|\bonload\s*=|\bonerror\s*=|\b(?:href|src)\s*=\s*[\"'](?:https?:|\/\/)/i.test(svg),
  'Konsept dosyası hiçbir harici varlık, betik veya izleme içermemeli');
const noComments = svg.replace(/<!--[\s\S]*?-->/g, '');
const ids = [...noComments.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(new Set(ids).size, ids.length, 'Tekrarlanan SVG id tespit edildi');
for (const match of noComments.matchAll(/url\(#([\w-]+)\)/g)) {
  assert(ids.includes(match[1]), 'Tanımsız SVG referansı: ' + match[1]);
}
const stack = [];
for (const tag of noComments.matchAll(/<\/?[A-Za-z][\w:.-]*\b[^>]*>/g)) {
  const literal = tag[0], name = /^<\/?([\w:.-]+)/.exec(literal)?.[1];
  if (literal.startsWith('</')) {
    assert.equal(stack.pop(), name, 'SVG XML etiket eşleşmesi bozuk: ' + literal);
  } else if (!literal.endsWith('/>')) {
    stack.push(name);
  }
}
assert.deepEqual(stack, [], 'Kapatılmamış SVG etiketi');
console.log('PASS: 4 açı, özgün taslak işaretleri, a11y, referanslar, SVG etiketleri, üçüncü taraf bağımlılıksızlık.');