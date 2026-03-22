/**
 * Optional Vercel serverless entry — uses same core as server.js.
 */
const { subscribeToMailchimp } = require('../server/mailchimpSubscribeCore');

function sendJson(res, status, obj) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(obj));
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

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return sendJson(res, 400, { error: 'Invalid JSON' });
  }

  const result = await subscribeToMailchimp(body || {});
  if (result.ok) {
    return sendJson(res, 200, { ok: true });
  }
  return sendJson(res, result.status, { error: result.error });
};
