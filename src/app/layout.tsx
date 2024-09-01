import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'src/app/globals.css';
import React from 'react';
import { MainNavbar } from '@/app/components/navbar/main-navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mr Davis A.',
  description: 'Welcome to my portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <MainNavbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
