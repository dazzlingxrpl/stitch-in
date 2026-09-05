#!/usr/bin/env node
/**
 * On Vercel builds, point the contact form at a stable production URL for POST /api/subscribe.
 *
 * Do not use VERCEL_URL alone: it is the *current* deployment (often a preview like
 * stitch-xxx-team.vercel.app). Those URLs can return 401 on OPTIONS when Deployment
 * Protection is on, which breaks CORS from the public custom domain.
 *
 * VERCEL_PROJECT_PRODUCTION_URL is the canonical production URL (e.g. https://project.vercel.app).
 */
const fs = require('fs');
const path = require('path');

const out = path.join(__dirname, '..', '.env.production.local');
const onVercel = process.env.VERCEL === '1';
const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const vercelUrl = process.env.VERCEL_URL;

function normalizeBase(u) {
  let base = String(u)
    .trim()
    .replace(/\/$/, '');
  if (!base) {
    return '';
  }
  if (!/^https?:\/\//i.test(base)) {
    base = `https://${base.replace(/^\/+/, '')}`;
  }
  return base;
}

if (!onVercel) {
  process.exit(0);
}

let base = null;
if (productionUrl) {
  base = normalizeBase(productionUrl);
} else if (vercelUrl) {
  const host = String(vercelUrl)
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '');
  base = `https://${host}`;
}

if (base) {
  fs.writeFileSync(out, `REACT_APP_MAILCHIMP_API_URL=${base}\n`, 'utf8');
  process.stdout.write(`[prebuild] REACT_APP_MAILCHIMP_API_URL=${base}\n`);
} else {
  process.stderr.write(
    '[prebuild] WARN: On Vercel but VERCEL_PROJECT_PRODUCTION_URL and VERCEL_URL were empty; ' +
      'REACT_APP_MAILCHIMP_API_URL not set. Enable System Environment Variables in Project Settings, ' +
      'or set REACT_APP_MAILCHIMP_API_URL manually.\n'
  );
}
