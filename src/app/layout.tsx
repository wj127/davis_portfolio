import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'src/app/globals.css';
import React from 'react';
import { MainNavbar } from '@/app/components/navbar/main-navbar';
import { cookies } from 'next/headers';

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
  return (
    <html lang='en'>
      <body className={inter.className}>
        <MainNavbar isMobile={isMobile} />
        <main>{children}</main>
      </body>
    </html>
  );
}
