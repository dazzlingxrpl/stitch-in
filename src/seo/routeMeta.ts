import { DEFAULT_DESCRIPTION, DEFAULT_KEYWORDS, SITE_NAME } from './siteConfig';

export type RouteMeta = {
  title: string;
  description: string;
  keywords: string;
};

const base = (suffix: string) => `${suffix} | ${SITE_NAME}`;

/** Per-route titles and descriptions for search snippets */
export const ROUTE_META: Record<string, RouteMeta> = {
  '/': {
    title: `${SITE_NAME} — Hertfordshire Architects | Kings Langley, Watford, Luton, Milton Keynes, St Albans & Hatfield`,
    description: DEFAULT_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS,
  },
  '/about': {
    title: base('About'),
    description: `Learn about ${SITE_NAME} — a Hertfordshire-based architecture and interior design studio serving Kings Langley, Watford, Luton, Milton Keynes, St Albans, Hatfield, and nearby areas.`,
    keywords: DEFAULT_KEYWORDS,
  },
  '/individuals': {
    title: base('Homes & private clients'),
    description: `Residential architecture and interiors for homeowners across Hertfordshire, including Kings Langley, Watford, Luton, Milton Keynes, St Albans, and Hatfield — ${SITE_NAME}.`,
    keywords: DEFAULT_KEYWORDS,
  },
  '/businesses': {
    title: base('Commercial & developers'),
    description: `Commercial, multi-residential, and developer-led projects — architecture and BIM-focused delivery with ${SITE_NAME}.`,
    keywords: DEFAULT_KEYWORDS,
  },
  '/services': {
    title: base('Services'),
    description: `Architectural design, interiors, BIM, and project services by ${SITE_NAME} across Hertfordshire and surrounding UK areas.`,
    keywords: DEFAULT_KEYWORDS,
  },
  '/projects': {
    title: base('Projects'),
    description: `Selected architecture and design projects by ${SITE_NAME} across Hertfordshire and the wider UK.`,
    keywords: DEFAULT_KEYWORDS,
  },
  '/gallery': {
    title: base('Gallery'),
    description: `Project gallery — residential, commercial, and detail work by ${SITE_NAME}.`,
    keywords: DEFAULT_KEYWORDS,
  },
  '/contact': {
    title: base('Contact'),
    description: `Contact ${SITE_NAME} for new architecture and interior projects in Hertfordshire, Kings Langley, Watford, Luton, Milton Keynes, St Albans, Hatfield, and surrounding areas.`,
    keywords: DEFAULT_KEYWORDS,
  },
  '/terms': {
    title: base('Terms'),
    description: `Terms and conditions — ${SITE_NAME}.`,
    keywords: DEFAULT_KEYWORDS,
  },
};

export function getRouteMeta(pathname: string): RouteMeta {
  let normalized = pathname || '/';
  if (normalized !== '/' && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }
  return ROUTE_META[normalized] ?? ROUTE_META['/'];
}
