import type { Metadata } from 'next';
import type React from 'react';
import { siteConfig } from '@/app/seo/site-config';

export const metadata: Metadata = {
  title: 'About Me',
  description: `Get to know ${siteConfig.fullName} (MrDavis): how I think, what I'm good at, and what drives me as a ${siteConfig.jobTitle.toLowerCase()}.`,
  alternates: {
    canonical: '/about-me',
  },
};

export default function AboutMeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
