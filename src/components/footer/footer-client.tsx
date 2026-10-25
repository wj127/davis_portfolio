'use client';

import styles from '@/components/footer/footer.module.scss';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { SocialLink, SitemapLabel } from '@/components/footer/footer';
import Link from 'next/link';

export const FooterClient = ({
  socialLinks,
  sitemapLabels,
  copyrightYear,
}: {
  socialLinks: Readonly<SocialLink[]>;
  sitemapLabels: Readonly<SitemapLabel[]>;
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
              <li key={sitemapLabel.label}>
                <Link className={styles.sitemapLink} href={sitemapLabel.href}>
                  {sitemapLabel.label}
                </Link>
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
              <a
                className={`${styles.socialLink} ${socialLink.motionClassName}`}
                href={socialLink.href}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Image
                  alt=''
                  className={styles.socialIcon}
                  height={18}
                  src={socialLink.iconSrc}
                  unoptimized
                  width={18}
                />
                {socialLink.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div aria-hidden='true' className={styles.divider} />
    </footer>
  );
};
