import { siteConfig, socialProfileUrls } from '@/app/seo/site-config';
import type { PersonSchema, WebSiteSchema } from '@/app/components/structured-data/structured-data.types';

const personSchema: PersonSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.fullName,
  alternateName: [...siteConfig.alternateNames],
  jobTitle: siteConfig.jobTitle,
  url: siteConfig.url,
  email: `mailto:${siteConfig.email}`,
  image: `${siteConfig.url}${siteConfig.ogImagePath}`,
  sameAs: socialProfileUrls,
  knowsLanguage: ['en', 'es'],
};

const webSiteSchema: WebSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.siteName,
  url: siteConfig.url,
  inLanguage: ['en', 'es'],
  author: {
    '@type': 'Person',
    name: siteConfig.fullName,
  },
};

export function StructuredData() {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify([personSchema, webSiteSchema]) }}
    />
  );
}
