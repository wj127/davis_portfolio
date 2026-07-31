import type { MetadataRoute } from 'next';
import { siteConfig } from '@/app/seo/site-config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.siteName,
    short_name: 'MrDavis',
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#08101f',
    theme_color: '#4169e1',
    icons: [
      {
        src: '/mrD-logos/mrD-cropped_circle_image.png',
        sizes: '1003x1003',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/mrD-logos/mrD-logo-png-blue-silver.png',
        sizes: '1024x1024',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
