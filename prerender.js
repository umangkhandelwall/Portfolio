import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function prerender() {
  const templatePath = path.resolve(__dirname, 'dist/index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('Error: dist/index.html does not exist. Run client build first.');
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');

  const serverEntryPath = path.resolve(__dirname, 'dist/server/entry-server.js');
  const serverEntryUrl = pathToFileURL(serverEntryPath).href;

  const { render } = await import(serverEntryUrl);
  const appHtml = render();

  const finalHtml = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );

  fs.writeFileSync(templatePath, finalHtml, 'utf-8');
  console.log(`✓ Statically pre-rendered HTML into dist/index.html (${Buffer.byteLength(finalHtml, 'utf-8')} bytes)`);
}

prerender().catch((err) => {
  console.error('Pre-rendering failed:', err);
  process.exit(1);
});
