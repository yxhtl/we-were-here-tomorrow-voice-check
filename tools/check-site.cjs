'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const base = 'https://yxhtl.github.io/we-were-here-tomorrow-voice-check/';
const files = ['index.html', 'zh.html', 'style.css', 'app.js', 'analytics.js', 'icon.svg', 'sitemap.xml', '.nojekyll'];
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
assert.deepEqual(fs.readdirSync(path.join(root, 'docs')).sort(), [...files].sort(), 'Only public page resources may enter the deployment directory.');
for (const file of files) {
  assert.deepEqual(fs.readFileSync(path.join(root, 'docs', file)), fs.readFileSync(path.join(root, file)), `Published copy differs: ${file}`);
}
for (const file of ['index.html', 'zh.html']) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const canonical = base + (file === 'index.html' ? '' : file);
  assert(html.includes('<script src="analytics.js" defer></script>'), 'Both languages must load their own analytics setup.');
  assert(html.includes('name="google-site-verification"'), 'Keep the verified GSC ownership tag.');
  assert(html.includes(`<link rel="canonical" href="${canonical}">`), 'Canonical must identify this language on the actual public host.');
  for (const [language, suffix] of [['en', ''], ['zh-CN', 'zh.html'], ['x-default', '']]) {
    assert(html.includes(`hreflang="${language}" href="${base}${suffix}"`), 'Both language pages must refer to the same public alternatives.');
  }
  assert(sitemap.includes(`<loc>${canonical}</loc>`));
  assert(!html.includes('\uFFFD'), 'Invalid text encoding');
  for (const match of html.matchAll(/(?:href|src)="([^"#][^"]*)"/g)) {
    const url = match[1];
    if (/^https?:/.test(url)) continue;
    assert(files.includes(url), `Local resource would not be published: ${url}`);
  }
}
assert.equal((sitemap.match(/<loc>/g) || []).length, 2);
console.log('静态检查通过：正式网址、中英文语言配置、两页 sitemap、资源白名单与发布副本。');
