'use strict';
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'docs');
const files = ['index.html', 'zh.html', 'style.css', 'app.js', 'analytics.js', 'icon.svg', 'sitemap.xml', '.nojekyll'];
fs.mkdirSync(output, { recursive: true });
for (const file of files) fs.copyFileSync(path.join(root, file), path.join(output, file));
console.log(`已生成 ${files.length} 个发布文件到 docs/。`);
