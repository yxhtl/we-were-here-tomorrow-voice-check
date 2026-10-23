'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(path.resolve(__dirname, '../analytics.js'), 'utf8');
for (const [hostname, pathname, allowed] of [
  ['yxhtl.github.io', '/we-were-here-tomorrow-voice-check/', true],
  ['yxhtl.github.io', '/we-were-here-tomorrow-voice-check/zh.html', true],
  ['yxhtl.github.io', '/beyond-these-stars-power-check/', false],
  ['yxhtl.github.io', '/we-were-here-tomorrow-voice-check-copy/', false],
  ['localhost', '/we-were-here-tomorrow-voice-check/', false]
]) {
  for (const debug of [false, true]) {
    const scripts = [];
    const origin = `https://${hostname}`;
    const context = { URL, location: { hostname, pathname, origin,
      href: `${origin}${pathname}?choice=private${debug ? '&analytics_debug=1' : ''}#answer-system` },
      document: { createElement: () => ({}), head: { appendChild: tag => scripts.push(tag) } } };
    context.window = context;
    vm.runInNewContext(source, context);
    assert.equal(scripts.length, allowed ? 1 : 0, 'Local preview and neighboring sites must not contaminate this property.');
    if (!allowed) { assert.equal(context.gtag, undefined); continue; }
    assert(scripts[0].src.endsWith('G-6SLM8QB63K'));
    const config = context.dataLayer.find(args => args[0] === 'config')[2];
    assert.equal(config.cookie_path, '/we-were-here-tomorrow-voice-check/');
    assert.equal(config.cookie_prefix, 'wwht_voice');
    assert.equal(config.allow_google_signals, false);
    assert.equal(config.allow_ad_personalization_signals, false);
    assert.equal(config.debug_mode, debug ? true : undefined);
    assert.equal(config.page_location, origin + pathname, 'Queries and symptom hashes must not be uploaded.');
    assert.equal(context.dataLayer.filter(args => args[0] === 'event').length, 0, 'Page load is not tool use.');
    context.reportRadioUse(); context.reportRadioUse();
    const events = context.dataLayer.filter(args => args[0] === 'event');
    assert.deepEqual(Array.from(events, args => args[1]), ['check_start', 'recommendation_view']);
    for (const args of events) assert.deepEqual(Object.keys(args[2]), ['send_to'], 'Do not upload answers or checkbox contents.');
  }
}
console.log('统计检查通过：站点隔离、独立 Cookie、调试开关、去除选项、首次使用去重。');
