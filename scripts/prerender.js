/**
 * Post-build prerender: serve the CRA build/, snapshot each sitemap route after React + SeoHead run.
 * Route list comes from scripts/write-sitemap.js (single source of truth).
 *
 * Local: Playwright's own Chromium.
 * Vercel: @sparticuz/chromium (Playwright's browser cannot load libnspr4.so on the build image).
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const express = require('express');
const { chromium: playwrightChromium } = require('playwright');
const { routes } = require('./write-sitemap');

/** Must match public/index.html <title> / SITE_NAME so we know SeoHead has replaced the shell default. */
const DEFAULT_TITLE = 'Stitch In Architecture';
const BUILD_DIR = path.join(__dirname, '..', 'build');
const ON_VERCEL = Boolean(process.env.VERCEL);

function ensurePlaywrightChromium() {
  const execPath = playwrightChromium.executablePath();
  if (fs.existsSync(execPath)) {
    return;
  }
  console.log('[prerender] Playwright Chromium not found; installing...');
  execSync('npx playwright install chromium', { stdio: 'inherit' });
}

async function launchBrowser() {
  if (ON_VERCEL) {
    const sparticuz = require('@sparticuz/chromium');
    sparticuz.setGraphicsMode = false;
    const executablePath = await sparticuz.executablePath();
    const libDir = path.dirname(executablePath);
    process.env.LD_LIBRARY_PATH = process.env.LD_LIBRARY_PATH
      ? `${libDir}:${process.env.LD_LIBRARY_PATH}`
      : libDir;
    console.log('[prerender] using @sparticuz/chromium', executablePath);
    return playwrightChromium.launch({
      args: sparticuz.args,
      executablePath,
      headless: true,
    });
  }

  ensurePlaywrightChromium();
  return playwrightChromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
}

function htmlPathForRoute(route) {
  if (route === '/') {
    return path.join(BUILD_DIR, 'index.html');
  }
  return path.join(BUILD_DIR, route.replace(/^\//, ''), 'index.html');
}

async function listen(app) {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, '127.0.0.1');
    server.once('listening', () => resolve(server));
    server.once('error', reject);
  });
}

async function closeServer(server) {
  return new Promise((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()));
  });
}

async function main() {
  if (!fs.existsSync(BUILD_DIR)) {
    throw new Error('build/ not found; run react-scripts build first');
  }

  const spaIndex = fs.readFileSync(path.join(BUILD_DIR, 'index.html'), 'utf8');

  const app = express();
  app.use(express.static(BUILD_DIR, { index: false }));
  app.get('*', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(spaIndex);
  });

  const server = await listen(app);
  const { port } = server.address();
  const origin = `http://127.0.0.1:${port}`;
  console.log('[prerender] serving', origin);

  const browser = await launchBrowser();
  const snapshots = [];

  try {
    for (const route of routes) {
      const page = await browser.newPage();
      await page.addInitScript(() => {
        window.__PRERENDER__ = true;
      });

      const url = `${origin}${route}`;
      console.log('[prerender] visiting', route);
      await page.goto(url, { waitUntil: 'load', timeout: 60000 });

      await page.waitForFunction(
        (defaultTitle) => {
          const ld = document.querySelector('script[type="application/ld+json"]');
          const titleReady = Boolean(document.title && document.title !== defaultTitle);
          return Boolean(ld && ld.textContent && titleReady);
        },
        DEFAULT_TITLE,
        { timeout: 30000 }
      );

      const html = await page.evaluate(() => document.documentElement.outerHTML);
      snapshots.push({ route, html });
      await page.close();
    }
  } finally {
    await browser.close();
    await closeServer(server);
  }

  for (const { route, html } of snapshots) {
    const outPath = htmlPathForRoute(route);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    const doc =
      html.startsWith('<!DOCTYPE') || html.startsWith('<!doctype')
        ? html
        : `<!DOCTYPE html>\n${html}`;
    fs.writeFileSync(outPath, doc, 'utf8');
    console.log('[prerender] wrote', path.relative(path.join(__dirname, '..'), outPath));
  }
}

main().catch((err) => {
  console.error('[prerender] failed', err);
  process.exit(1);
});
