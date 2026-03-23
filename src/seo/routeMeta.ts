import { DEFAULT_DESCRIPTION, SITE_NAME } from './siteConfig';

export type RouteMeta = {
  title: string;
  description: string;
};

const base = (suffix: string) => `${suffix} | ${SITE_NAME}`;

/** Per-route titles and descriptions for search snippets */
export const ROUTE_META: Record<string, RouteMeta> = {
  '/': {
    title: `${SITE_NAME} — Melbourne, Mornington Peninsula, Sydney, London & Ukraine`,
    description: DEFAULT_DESCRIPTION,
  },
  '/about': {
    title: base('About'),
    description: `Learn about ${SITE_NAME} — our team, values, and experience delivering architecture in Australia, the UK, and Ukraine.`,
  },
  '/individuals': {
    title: base('Homes & private clients'),
    description: `Residential architecture and interiors for homeowners in Melbourne, the Mornington Peninsula, Sydney, and beyond — ${SITE_NAME}.`,
  },
  '/businesses': {
    title: base('Commercial & developers'),
    description: `Commercial, multi-residential, and developer-led projects — architecture and BIM-focused delivery with ${SITE_NAME}.`,
  },
  '/services': {
    title: base('Services'),
    description: `Architectural design, interiors, BIM, and project services — ${SITE_NAME} in Melbourne, Sydney, London, Ukraine, and internationally.`,
  },
  '/projects': {
    title: base('Projects'),
    description: `Selected architecture and design projects by ${SITE_NAME} across Australia, the UK, and Ukraine.`,
  },
  '/gallery': {
    title: base('Gallery'),
    description: `Project gallery — residential, commercial, and detail work by ${SITE_NAME}.`,
  },
  '/contact': {
    title: base('Contact'),
    description: `Contact ${SITE_NAME} for new projects in Melbourne, the Mornington Peninsula, Sydney, London, Ukraine, or internationally.`,
  },
  '/terms': {
    title: base('Terms'),
    description: `Terms and conditions — ${SITE_NAME}.`,
  },
};

export function getRouteMeta(pathname: string): RouteMeta {
  let normalized = pathname || '/';
  if (normalized !== '/' && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }
  return ROUTE_META[normalized] ?? ROUTE_META['/'];
}
