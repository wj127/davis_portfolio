import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Bruno_Ace, Inter } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import styles from '@/app/not-found.module.scss';

const brunoAce = Bruno_Ace({
  subsets: ['latin'],
  weight: '400',
});

const interSemiBold = Inter({
  subsets: ['latin'],
  weight: '600',
});

export async function generateMetadata(): Promise<Metadata> {
  const notFoundTranslations = await getTranslations('NotFound');

  return {
    title: notFoundTranslations('metaTitle'),
    description: notFoundTranslations('metaDescription'),
  };
}

export default async function NotFound() {
  const notFoundTranslations = await getTranslations('NotFound');

  return (
    <div className={styles.page}>
      <div aria-hidden='true' className={styles.ambientLight} />
      <div className={styles.message}>
        <p className={`${styles.code} ${brunoAce.className}`}>404</p>
        <div className={styles.explanation}>
          <h1 className={`${styles.heading} ${brunoAce.className}`}>
            <span>{notFoundTranslations('headingLead')}</span> <span>{notFoundTranslations('headingFollow')}</span>
          </h1>
          <p className={styles.description}>
            {notFoundTranslations('descriptionLead')}
            <span className={styles.sentenceGap}> </span>
            <br className={styles.sentenceBreak} />
            {notFoundTranslations('descriptionFollow')}
          </p>
        </div>
        <Link className={`${styles.homeLink} ${interSemiBold.className}`} href='/'>
          <Image
            alt=''
            className={styles.homeIcon}
            height={18}
            src='/not-found/arrow-left.svg'
            unoptimized
            width={18}
          />
          {notFoundTranslations('backToHome')}
        </Link>
      </div>
    </div>
  );
}
