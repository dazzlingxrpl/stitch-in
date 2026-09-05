import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { buildOrganizationJsonLd } from '../seo/jsonLd';
import { CANONICAL_SITE_URL } from '../seo/siteConfig';
import { getRouteMeta } from '../seo/routeMeta';

const JSON_LD_ID = 'seo-organization-jsonld';

function getSiteUrl(): string {
  const fromEnv = process.env.REACT_APP_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, '');
  }
  return CANONICAL_SITE_URL;
}

function upsertMetaByName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertMetaByProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Updates document title, description, Open Graph, Twitter, canonical, and Organization JSON-LD.
 * Call inside react-router so pathname reflects the current view.
 */
const SeoHead: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const siteUrl = getSiteUrl();
    const meta = getRouteMeta(pathname);
    const path = pathname === '/' ? '' : pathname;
    const canonical = siteUrl ? `${siteUrl}${path}` : '';

    document.title = meta.title;
    upsertMetaByName('description', meta.description);
    upsertMetaByName('keywords', meta.keywords);

    upsertMetaByProperty('og:title', meta.title);
    upsertMetaByProperty('og:description', meta.description);
    upsertMetaByProperty('og:type', 'website');
    upsertMetaByName('twitter:card', 'summary_large_image');
    upsertMetaByName('twitter:title', meta.title);
    upsertMetaByName('twitter:description', meta.description);

    if (siteUrl) {
      upsertMetaByProperty('og:url', canonical || siteUrl);
      upsertMetaByProperty('og:image', `${siteUrl}/images/graphtag.png`);
      upsertMetaByName('twitter:image', `${siteUrl}/images/graphtag.png`);
      upsertCanonical(canonical || siteUrl);
    }

    const jsonLd = buildOrganizationJsonLd(siteUrl);
    let script = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = JSON_LD_ID;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
  }, [pathname]);

  return null;
};

export default SeoHead;
