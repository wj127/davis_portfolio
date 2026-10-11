import { siteConfig, socialProfiles } from '@/app/seo/site-config';
import styles from '@/features/blog/components/blog-footer/blog-footer.module.scss';
import { getTranslations } from 'next-intl/server';

async function getFullYear() {
  'use cache';
  return new Date().getFullYear();
}

export const BlogFooter = async () => {
  const footerTranslations = await getTranslations('Blog.footer');
  const year = await getFullYear();
  const socialLinks = [
    { label: footerTranslations('gitHub'), href: socialProfiles.gitHub },
    { label: footerTranslations('linkedIn'), href: socialProfiles.linkedIn },
    { label: footerTranslations('email'), href: `mailto:${siteConfig.email}` },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copyright}>{footerTranslations('copyright', { year })}</p>
        <ul className={styles.socialLinks}>
          {socialLinks.map((socialLink) => (
            <li key={socialLink.href}>
              <a className={styles.socialLink} href={socialLink.href} target='_blank' rel='noopener noreferrer'>
                {socialLink.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
