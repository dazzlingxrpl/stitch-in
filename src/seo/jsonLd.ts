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
    email: 'juliet@stitch-in-architecture.com',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Hertfordshire',
      addressCountry: 'United Kingdom',
    },
    founder: {
      '@type': 'Person',
      name: 'Juliet Niha',
      jobTitle: 'Architectural Designer & Founder',
    },
    areaServed: [
      { '@type': 'Place', name: 'Hertfordshire, United Kingdom' },
      { '@type': 'Place', name: 'Kings Langley, Hertfordshire, United Kingdom' },
      { '@type': 'Place', name: 'Watford, Hertfordshire, United Kingdom' },
      { '@type': 'Place', name: 'Luton, Bedfordshire, United Kingdom' },
      { '@type': 'Place', name: 'Milton Keynes, Buckinghamshire, United Kingdom' },
      { '@type': 'Place', name: 'St Albans, Hertfordshire, United Kingdom' },
      { '@type': 'Place', name: 'Hatfield, Hertfordshire, United Kingdom' },
      { '@type': 'Place', name: 'London, United Kingdom' },
      { '@type': 'Country', name: 'United Kingdom' },
    ],
    serviceType: ['Architecture', 'Interior design', 'BIM consulting'],
  };
}
