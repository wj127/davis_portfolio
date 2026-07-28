'use client';

import { Bruno_Ace_SC, Source_Code_Pro } from 'next/font/google';
import { useTranslations } from 'next-intl';
import { Terminal } from 'lucide-react';
import styles from '@/app/blog/blog.module.scss';

const brunoAce = Bruno_Ace_SC({ weight: '400', subsets: ['latin'] });
const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-source-code-pro',
});

const bootKeys = ['boot.mount', 'boot.compile', 'boot.index', 'boot.await'] as const;

export default function BlogPage() {
  const blogTranslations = useTranslations('Blog');
  const title = blogTranslations('title');

  return (
    <main className={`${styles.page} ${brunoAce.className} ${sourceCodePro.variable}`}>
      <div className={styles.meshBackdrop} aria-hidden='true' />

      <section className={styles.panel}>
        <article className={styles.terminalCard}>
          <header className={styles.cardChrome}>
            <div className={styles.chromeButtons} aria-hidden='true'>
              <span className={`${styles.chromeDot} ${styles.cancel}`} />
              <span className={`${styles.chromeDot} ${styles.minimize}`} />
              <span className={`${styles.chromeDot} ${styles.maximize}`} />
            </div>
            <span className={styles.windowTitle}>{blogTranslations('windowTitle')}</span>
          </header>

          <div className={styles.cardBody}>
            <p className={styles.statusRow}>
              <span className={styles.statusDot} aria-hidden='true' />
              <span className={styles.statusLabel}>{blogTranslations('statusLabel')}:</span>
              <span className={styles.statusValue}>{blogTranslations('statusValue')}</span>
            </p>

            <div className={styles.glitchTitle}>
              <p>
                <span aria-hidden='true'>{title}</span>
                {title}
                <span aria-hidden='true'>{title}</span>
              </p>
            </div>

            <p className={styles.subtitle}>{blogTranslations('subtitle')}</p>
            <p className={styles.description}>{blogTranslations('description')}</p>

            <ul className={styles.bootLog}>
              {bootKeys.map((bootKey) => (
                <li key={bootKey} className={styles.bootLine}>
                  {blogTranslations(bootKey)}
                </li>
              ))}
            </ul>

            <p className={styles.promptRow}>
              <Terminal size={16} className={styles.promptIcon} aria-hidden='true' />
              <span>{blogTranslations('comingSoon')}</span>
              <span className={styles.cursor} aria-hidden='true' />
            </p>
          </div>
        </article>
      </section>
    </main>
  );
}
