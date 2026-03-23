import { DEFAULT_DESCRIPTION, SITE_NAME } from './siteConfig';

/** Stable JSON-LD for ProfessionalService + areaServed (helps local/entity understanding) */
export function buildOrganizationJsonLd(siteUrl: string): object {
  const url = siteUrl.replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url,
    image: `${url}/images/graphtag.png`,
    areaServed: [
      { '@type': 'Place', name: 'Melbourne, Victoria, Australia' },
      { '@type': 'Place', name: 'Mornington Peninsula, Victoria, Australia' },
      { '@type': 'Place', name: 'Sydney, New South Wales, Australia' },
      { '@type': 'Place', name: 'London, United Kingdom' },
      { '@type': 'Country', name: 'Ukraine' },
    ],
    serviceType: ['Architecture', 'Interior design', 'BIM consulting'],
  };
}
