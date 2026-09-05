/**
 * Post-build prerender: serve the CRA build/, snapshot each sitemap route after React + SeoHead run.
 * Route list comes from scripts/write-sitemap.js (single source of truth).
 *
 * Local: Playwright's own Chromium.
 * Vercel: puppeteer-core + @sparticuz/chromium in chrome-headless-shell mode
 * (Playwright's full-Chrome headless kills that binary on the build image).
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

async function launchPuppeteerOnVercel() {
  const sparticuz = require('@sparticuz/chromium').default;
  const puppeteer = require('puppeteer-core');
  sparticuz.setGraphicsMode = false;
  const executablePath = await sparticuz.executablePath();
  console.log('[prerender] using @sparticuz/chromium + puppeteer-core', executablePath);
  const args = (sparticuz.args || []).filter((flag) => !String(flag).includes('headless'));
  return puppeteer.launch({
    args,
    defaultViewport: {
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
    },
    executablePath,
    headless: 'shell',
    dumpio: false,
  });
}

function seoReadyCheck(defaultTitle) {
  const ld = document.querySelector('script[type="application/ld+json"]');
  return Boolean(ld && ld.textContent && document.title && document.title !== defaultTitle);
}

async function snapshotRoute(page, origin, route, waitForSeo) {
  const url = `${origin}${route}`;
  console.log('[prerender] visiting', route);
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await waitForSeo(page);
  return page.evaluate(() => document.documentElement.outerHTML);
}

async function prerenderWithPuppeteer(browser, origin) {
  const snapshots = [];
  for (const route of routes) {
    const page = await browser.newPage();
    await page.evaluateOnNewDocument(() => {
      window.__PRERENDER__ = true;
    });
    try {
      const html = await snapshotRoute(page, origin, route, (p) =>
        p.waitForFunction(seoReadyCheck, { timeout: 30000 }, DEFAULT_TITLE)
      );
      snapshots.push({ route, html });
    } finally {
      await page.close();
    }
  }
  return snapshots;
}

async function prerenderWithPlaywright(browser, origin) {
  const snapshots = [];
  for (const route of routes) {
    const page = await browser.newPage();
    await page.addInitScript(() => {
      window.__PRERENDER__ = true;
    });
    try {
      const html = await snapshotRoute(page, origin, route, (p) =>
        p.waitForFunction(seoReadyCheck, DEFAULT_TITLE, { timeout: 30000 })
      );
      snapshots.push({ route, html });
    } finally {
      await page.close();
    }
  }
  return snapshots;
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

function writeSnapshots(snapshots) {
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

async function main() {
  if (!fs.existsSync(BUILD_DIR)) {
    throw new Error('build/ not found; run react-scripts build first');
  }

  const spaIndex = fs.readFileSync(path.join(BUILD_DIR, 'index.html'), 'utf8');

  const app = express();
  app.use(express.static(BUILD_DIR, { index: false }));
  // Vercel Analytics is injected at runtime; it does not exist on this local static server.
  // Without this stub the SPA fallback would serve index.html as script.js (SyntaxError: Unexpected token '<').
  app.use('/_vercel', (_req, res) => {
    res.status(204).end();
  });
  app.get('*', (req, res) => {
    const ext = path.extname(req.path);
    if (ext && ext !== '.html') {
      res.status(404).end();
      return;
    }
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(spaIndex);
  });

  const server = await listen(app);
  const { port } = server.address();
  const origin = `http://127.0.0.1:${port}`;
  console.log('[prerender] serving', origin);

  let browser;
  try {
    if (ON_VERCEL) {
      browser = await launchPuppeteerOnVercel();
      writeSnapshots(await prerenderWithPuppeteer(browser, origin));
    } else {
      ensurePlaywrightChromium();
      browser = await playwrightChromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-dev-shm-usage'],
      });
      writeSnapshots(await prerenderWithPlaywright(browser, origin));
    }
  } finally {
    if (browser) {
      await browser.close();
    }
    await closeServer(server);
  }
}

main().catch((err) => {
  console.error('[prerender] failed', err);
  process.exit(1);
});
