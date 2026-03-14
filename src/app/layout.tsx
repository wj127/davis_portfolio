import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'src/app/globals.css';
import React from 'react';
import { MainNavbar } from '@/app/components/navbar/main-navbar';
import { cookies } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { LanguageSwitcher } from '@/app/components/language-switcher/language-switcher';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MrDavis A.',
  description: 'Welcome to my portfolio',
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
        <NextIntlClientProvider locale={locale} messages={messages}>
          <MainNavbar isMobile={isMobile} />
          <LanguageSwitcher />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
