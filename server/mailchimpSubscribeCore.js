/**
 * Shared Mailchimp Marketing API logic (used by Express server and optional Vercel handler).
 */
const crypto = require('crypto');

function md5Hex(email) {
  return crypto.createHash('md5').update(String(email).toLowerCase().trim()).digest('hex');
}

/**
 * @param {Record<string, unknown>} body
 * @returns {Promise<{ ok: true } | { ok: false; status: number; error: string }>}
 */
async function subscribeToMailchimp(body) {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_AUDIENCE_ID;
  const dc = process.env.MAILCHIMP_DC || 'us19';

  if (!apiKey || !listId) {
    return { ok: false, status: 500, error: 'Mailchimp is not configured on the server' };
  }

  const email = body.email && String(body.email).trim();
  const name = body.name && String(body.name).trim();
  const message = body.message && String(body.message).trim();

  if (!email || !name || !message) {
    return { ok: false, status: 400, error: 'Missing required fields' };
  }

  const phone = body.phone != null ? String(body.phone).trim() : '';
  const projectType = body.projectType != null ? String(body.projectType).trim() : '';
  const location = body.location != null ? String(body.location).trim() : '';

  const parts = name.split(/\s+/).filter(Boolean);
  const fname = parts[0] || '';
  const lname = parts.slice(1).join(' ') || '';

  // Phone goes in the inquiry text — many audiences do not have a PHONE merge tag (or use a custom tag name),
  // which causes Mailchimp to return 400 for invalid merge fields.
  const inquiry = [
    projectType && `Project type: ${projectType}`,
    location && `Location: ${location}`,
    phone && `Phone: ${phone}`,
    message
  ]
    .filter(Boolean)
    .join('\n\n');

  const company = inquiry.slice(0, 500);

  const mergeFields = {
    FNAME: fname.slice(0, 50),
    LNAME: lname.slice(0, 50),
    COMPANY: company
  };

  const subscriberHash = md5Hex(email);
  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${encodeURIComponent(listId)}/members/${subscriberHash}`;

  const auth = Buffer.from(`anystring:${apiKey}`, 'utf8').toString('base64');

  const payload = {
    email_address: email.toLowerCase(),
    status_if_new: 'subscribed',
    merge_fields: mergeFields
  };

  try {
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
      let errText = 'Mailchimp request failed';
      if (typeof data.detail === 'string') {
        errText = data.detail;
      } else if (Array.isArray(data.errors) && data.errors.length > 0) {
        errText = data.errors
          .map((e) => (e && typeof e.message === 'string' ? e.message : ''))
          .filter(Boolean)
          .join(' ') || errText;
      } else if (typeof data.title === 'string' && data.title) {
        errText = data.title;
      }
      const status = mcRes.status >= 400 && mcRes.status < 600 ? mcRes.status : 502;
      console.error('[Mailchimp]', mcRes.status, data);
      return { ok: false, status, error: errText };
    }

    return { ok: true };
  } catch (err) {
    console.error(err);
    return { ok: false, status: 502, error: 'Could not reach Mailchimp' };
  }
}

module.exports = { subscribeToMailchimp };
