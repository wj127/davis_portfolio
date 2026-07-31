import type { Metadata } from 'next';
import type React from 'react';
import { siteConfig } from '@/app/seo/site-config';

export const metadata: Metadata = {
  title: 'Work Experience',
  description: `Career timeline of ${siteConfig.fullName} (MrDavis): companies, roles, and projects shaping my journey as a ${siteConfig.jobTitle.toLowerCase()}.`,
  alternates: {
    canonical: '/work-experience',
  },
};

export default function WorkExperienceLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
