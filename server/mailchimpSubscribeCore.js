/**
 * Shared Mailchimp Marketing API logic (used by Express server and optional Vercel handler).
 */
const crypto = require('crypto');

/** Mailchimp text merge fields reject values over 255 chars (API returns 400). */
const MAILCHIMP_TEXT_MERGE_MAX = 255;

const DEBUG =
  process.env.MAILCHIMP_DEBUG === '1' ||
  process.env.MAILCHIMP_DEBUG === 'true' ||
  process.env.SUBSCRIBE_DEBUG === '1';

function md5Hex(email) {
  return crypto.createHash('md5').update(String(email).toLowerCase().trim()).digest('hex');
}

/**
 * Build a single human-readable line from Mailchimp error JSON.
 * @param {Record<string, unknown>} data
 */
function formatMailchimpError(data) {
  if (!data || typeof data !== 'object') {
    return 'Mailchimp request failed';
  }
  const parts = [];
  if (typeof data.detail === 'string' && data.detail.trim()) {
    parts.push(data.detail.trim());
  } else if (Array.isArray(data.detail)) {
    for (const d of data.detail) {
      if (d != null && String(d).trim()) parts.push(String(d).trim());
    }
  }
  if (Array.isArray(data.errors)) {
    for (const e of data.errors) {
      if (e && typeof e === 'object') {
        const msg = typeof e.message === 'string' ? e.message : typeof e.error === 'string' ? e.error : '';
        const field = typeof e.field === 'string' ? e.field : '';
        if (msg) parts.push(field ? `${field}: ${msg}` : msg);
      }
    }
  }
  if (parts.length > 0) {
    return parts.join(' — ');
  }
  if (typeof data.title === 'string' && data.title.trim()) {
    return data.title.trim();
  }
  return 'Mailchimp request failed';
}

/**
 * @param {Record<string, unknown>} body
 * @returns {Promise<
 *   | { ok: true }
 *   | {
 *       ok: false;
 *       status: number;
 *       error: string;
 *       code: string;
 *       missingKeys?: string[];
 *       mailchimpDebug?: { httpStatus: number; body: unknown };
 *     }
 * >}
 */
async function subscribeToMailchimp(body) {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_AUDIENCE_ID;
  const dc = process.env.MAILCHIMP_DC || 'us19';

  if (!apiKey || !listId) {
    return {
      ok: false,
      status: 500,
      error: 'Mailchimp is not configured on the server',
      code: 'server_config'
    };
  }

  const email = body.email && String(body.email).trim();
  const name = body.name && String(body.name).trim();
  const message = body.message && String(body.message).trim();

  if (!email || !name || !message) {
    const missingKeys = [];
    if (!email) missingKeys.push('email');
    if (!name) missingKeys.push('name');
    if (!message) missingKeys.push('message');
    const err = `Missing required fields: ${missingKeys.join(', ')}`;
    if (DEBUG) {
      console.error('[subscribe] validation failed', {
        missingKeys,
        bodyKeys: body && typeof body === 'object' ? Object.keys(body) : []
      });
    }
    return {
      ok: false,
      status: 400,
      error: err,
      code: 'validation_missing',
      missingKeys
    };
  }

  const phone = body.phone != null ? String(body.phone).trim() : '';
  const projectType = body.projectType != null ? String(body.projectType).trim() : '';
  const location = body.location != null ? String(body.location).trim() : '';

  const parts = name.split(/\s+/).filter(Boolean);
  const fname = parts[0] || '';
  const lname = parts.slice(1).join(' ') || '';

  const inquiry = [
    message,
    projectType && `Project type: ${projectType}`,
    location && `Location: ${location}`,
    phone && `Phone: ${phone}`
  ]
    .filter(Boolean)
    .join('\n\n');

  const company = inquiry.slice(0, MAILCHIMP_TEXT_MERGE_MAX);

  const mergeFields = {
    FNAME: fname.slice(0, 50),
    COMPANY: company
  };
  if (lname) {
    mergeFields.LNAME = lname.slice(0, 50);
  }

  const subscriberHash = md5Hex(email);
  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${encodeURIComponent(listId)}/members/${subscriberHash}`;

  const auth = Buffer.from(`anystring:${apiKey}`, 'utf8').toString('base64');

  /** Double opt-in audiences often need `pending`; use MAILCHIMP_STATUS_IF_NEW=pending if subscribed fails. */
  const rawStatus = (process.env.MAILCHIMP_STATUS_IF_NEW || 'subscribed').toLowerCase();
  const allowedStatus = new Set(['subscribed', 'pending', 'transactional']);
  const statusIfNew = allowedStatus.has(rawStatus) ? rawStatus : 'subscribed';

  const payload = {
    email_address: email.toLowerCase(),
    status_if_new: statusIfNew,
    merge_fields: mergeFields
  };

  try {
    if (DEBUG) {
      console.log('[subscribe] Mailchimp PUT', {
        dc,
        listId: `${String(listId).slice(0, 4)}…`,
        mergeKeys: Object.keys(mergeFields),
        companyLen: company.length,
        status_if_new: statusIfNew
      });
    }

    const mcRes = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await mcRes.json().catch(() => ({}));

    if (!mcRes.ok) {
      const errText = formatMailchimpError(data);
      const status = mcRes.status >= 400 && mcRes.status < 600 ? mcRes.status : 502;
      console.error('[Mailchimp] HTTP', mcRes.status, errText, DEBUG ? data : '');
      const out = {
        ok: false,
        status,
        error: errText,
        code: 'mailchimp_api'
      };
      if (DEBUG) {
        out.mailchimpDebug = { httpStatus: mcRes.status, body: data };
      }
      return out;
    }

    return { ok: true };
  } catch (err) {
    console.error(err);
    return {
      ok: false,
      status: 502,
      error: 'Could not reach Mailchimp',
      code: 'network'
    };
  }
}

module.exports = { subscribeToMailchimp };
