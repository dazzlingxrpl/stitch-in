#!/usr/bin/env node
/**
 * On Vercel builds, VERCEL_URL is the deployment host (e.g. *.vercel.app).
 * Embed REACT_APP_MAILCHIMP_API_URL so POST /api/subscribe hits this deployment’s
 * serverless function when the site is opened on a custom domain that doesn’t route /api to Vercel.
 */
const fs = require('fs');
const path = require('path');

const out = path.join(__dirname, '..', '.env.production.local');
const vercelUrl = process.env.VERCEL_URL;
const onVercel = process.env.VERCEL === '1';

if (onVercel && vercelUrl) {
  const host = String(vercelUrl)
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '');
  const base = `https://${host}`;
  fs.writeFileSync(out, `REACT_APP_MAILCHIMP_API_URL=${base}\n`, 'utf8');
  process.stdout.write(`[prebuild] REACT_APP_MAILCHIMP_API_URL=${base}\n`);
}
