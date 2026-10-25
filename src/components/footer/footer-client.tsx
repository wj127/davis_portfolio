'use client';

import styles from '@/components/footer/footer.module.scss';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface SocialLink {
  label: string;
  iconSrc: string;
  motionClassName: string;
}

export const FooterClient = ({
  socialLinks,
  sitemapLabels,
  copyrightYear,
}: {
  socialLinks: Readonly<SocialLink[]>;
  sitemapLabels: Readonly<string[]>;
  copyrightYear: number;
}) => {
  const pathname = usePathname();
  const needToHideFooter = pathname === '/' || pathname === '/work-experience';

  if (needToHideFooter) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.topRow}>
        <div className={styles.brand}>
          <p className={styles.brandName}>MRDAVIS</p>
          <p className={styles.tagline}>© {copyrightYear} MRDAVIS · Built with curiosity.</p>
        </div>

        <div className={styles.sitemap}>
          <h2 className={styles.sitemapHeading}>Sitemap</h2>
          <ul className={styles.sitemapLinks}>
            {sitemapLabels.map((sitemapLabel) => (
              <li key={sitemapLabel}>
                <button className={styles.sitemapLink} type='button'>
                  {sitemapLabel}
                </button>
              </li>
            ))}
          </ul>
          <button className={styles.contactButton} type='button'>
            Contact
          </button>
        </div>

        <ul className={styles.socialLinks}>
          {socialLinks.map((socialLink) => (
            <li key={socialLink.label}>
              <button className={`${styles.socialLink} ${socialLink.motionClassName}`} type='button'>
                <Image
                  alt=''
                  className={styles.socialIcon}
                  height={18}
                  src={socialLink.iconSrc}
                  unoptimized
                  width={18}
                />
                {socialLink.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div aria-hidden='true' className={styles.divider} />
    </footer>
  );
};
