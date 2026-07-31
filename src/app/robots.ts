import type { MetadataRoute } from 'next';
import { siteConfig } from '@/app/seo/site-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/work-experience/cv/download',
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
