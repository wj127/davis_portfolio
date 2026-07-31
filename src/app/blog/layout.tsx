import type { Metadata } from 'next';
import type React from 'react';
import { siteConfig } from '@/app/seo/site-config';

export const metadata: Metadata = {
  title: 'Blog',
  description: `Thoughts and writing by ${siteConfig.fullName} (MrDavis) on software engineering, product building, and entrepreneurship.`,
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
