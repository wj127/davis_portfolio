import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'src/app/globals.css';
import React from 'react';
import { MainNavbar } from '@/app/components/navbar/main-navbar';
import { cookies } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { LanguageSwitcher } from '@/app/components/language-switcher/language-switcher';
import { CvDownloadButton } from '@/app/components/cv-download-button/cv-download-button';
import { StructuredData } from '@/app/components/structured-data/structured-data';
import { siteConfig } from '@/app/seo/site-config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `Davis Armas (MrDavis) | ${siteConfig.jobTitle}`,
    template: '%s | Davis Armas',
  },
  description: siteConfig.description,
  keywords: [
    ...siteConfig.alternateNames,
    siteConfig.fullName,
    'MrDavis portfolio',
    'full stack software engineer',
    'software engineer portfolio',
  ],
  authors: [{ name: siteConfig.fullName, url: siteConfig.url }],
  creator: siteConfig.fullName,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    siteName: siteConfig.siteName,
    title: `Davis Armas (MrDavis) | ${siteConfig.jobTitle}`,
    description: siteConfig.description,
    locale: 'en_US',
    images: [
      {
        url: siteConfig.ogImagePath,
        width: 1024,
        height: 1024,
        alt: `${siteConfig.fullName} — MrDavis logo`,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: `Davis Armas (MrDavis) | ${siteConfig.jobTitle}`,
    description: siteConfig.description,
    images: [siteConfig.ogImagePath],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const viewport = cookieStore.get('viewport')?.value;
  const isMobile = viewport === 'mobile';
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <StructuredData />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <MainNavbar isMobile={isMobile} />
          <LanguageSwitcher />
          <CvDownloadButton />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
