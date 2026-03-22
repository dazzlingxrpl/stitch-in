/**
 * Resolves POST URL for /api/subscribe. Build may set REACT_APP_MAILCHIMP_API_URL to the
 * stable Vercel production host; otherwise same-origin (current window) is used at runtime.
 */
export function getMailchimpSubscribeUrl(): string {
  const raw = (process.env.REACT_APP_MAILCHIMP_API_URL ?? '').trim();
  if (raw) {
    let base = raw.replace(/\/$/, '');
    if (base.endsWith('/api/subscribe')) {
      return base;
    }
    if (base.endsWith('/api')) {
      base = base.slice(0, -4);
    }
    return `${base}/api/subscribe`;
  }
  if (typeof window !== 'undefined') {
    return new URL('/api/subscribe', window.location.origin).href;
  }
  return '/api/subscribe';
}
