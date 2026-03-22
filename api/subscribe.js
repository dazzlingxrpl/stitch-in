/**
 * Optional Vercel serverless entry — uses same core as server.js.
 */
const { subscribeToMailchimp } = require('../server/mailchimpSubscribeCore');

function sendJson(res, status, obj) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(obj));
}

/** Vercel usually parses JSON into req.body; also handle string / Buffer. */
function readJsonBody(req) {
  if (req.body == null) {
    return {};
  }
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }
  if (Buffer.isBuffer(req.body)) {
    try {
      return JSON.parse(req.body.toString('utf8'));
    } catch {
      return null;
    }
  }
  if (typeof req.body === 'object') {
    return req.body;
  }
  return {};
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  const body = readJsonBody(req);
  if (body === null) {
    return sendJson(res, 400, { error: 'Invalid JSON' });
  }

  const result = await subscribeToMailchimp(body || {});
  if (result.ok) {
    return sendJson(res, 200, { ok: true });
  }
  const out = { error: result.error };
  if (result.code) out.code = result.code;
  if (result.missingKeys) out.missingKeys = result.missingKeys;
  if (result.mailchimpDebug) out.mailchimpDebug = result.mailchimpDebug;
  return sendJson(res, result.status, out);
};
