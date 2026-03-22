/**
 * Production server for Digital Ocean (and similar): static CRA build + Mailchimp API.
 * Set PORT (App Platform provides it), MAILCHIMP_* env vars.
 */
const fs = require('fs');
const path = require('path');

const envLocalPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envLocalPath)) {
  require('dotenv').config({ path: envLocalPath });
}
const express = require('express');
const { subscribeToMailchimp } = require('./server/mailchimpSubscribeCore');

const app = express();
const buildDir = path.join(__dirname, 'build');

app.use(express.json({ limit: '48kb' }));
app.use(express.urlencoded({ extended: true, limit: '48kb' }));

app.post('/api/subscribe', async (req, res) => {
  if (process.env.MAILCHIMP_DEBUG === '1' || process.env.SUBSCRIBE_DEBUG === '1') {
    console.log('[subscribe] POST /api/subscribe', {
      contentType: req.headers['content-type'],
      bodyKeys: req.body && typeof req.body === 'object' ? Object.keys(req.body) : typeof req.body
    });
  }
  const result = await subscribeToMailchimp(req.body || {});
  if (result.ok) {
    return res.status(200).json({ ok: true });
  }
  const out = { error: result.error };
  if (result.code) out.code = result.code;
  if (result.missingKeys) out.missingKeys = result.missingKeys;
  if (result.mailchimpDebug) out.mailchimpDebug = result.mailchimpDebug;
  return res.status(result.status).json(out);
});

app.use(express.static(buildDir));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildDir, 'index.html'));
});

const port = Number(process.env.PORT) || 8080;
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on ${port}`);
});
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Stop the other process or run: PORT=3001 npm run serve`);
    process.exit(1);
  }
  throw err;
});
