/**
 * Writes public/sitemap.xml and public/robots.txt with absolute URLs for SEO.
 * Prefers REACT_APP_SITE_URL, then https://VERCEL_URL, then the canonical production domain.
 * Route list is the single source of truth for sitemap + prerender (module.exports.routes).
 */
const fs = require('fs');
const path = require('path');

const CANONICAL_SITE_URL = 'https://www.stitch-in-architecture.com';

const routes = [
  '/',
  '/about',
  '/individuals',
  '/businesses',
  '/services',
  '/projects',
  '/gallery',
  '/contact',
  '/terms',
];

function siteUrl() {
  const fromEnv = process.env.REACT_APP_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, '');
  }
  const v = process.env.VERCEL_URL?.trim();
  if (v) {
    const host = v.replace(/^https?:\/\//, '');
    return `https://${host}`;
  }
  return CANONICAL_SITE_URL;
}

function writeSitemapAndRobots() {
  const base = siteUrl();

  const urlEntries = routes
    .map((r) => {
      const loc = r === '/' ? base : `${base}${r}`;
      const priority = r === '/' ? '1.0' : '0.8';
      return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

  const publicDir = path.join(__dirname, '..', 'public');
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');

  const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`;

  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots, 'utf8');
  console.log('[write-sitemap] base URL:', base);
}

module.exports = { routes, siteUrl, CANONICAL_SITE_URL, writeSitemapAndRobots };

if (require.main === module) {
  writeSitemapAndRobots();
}
