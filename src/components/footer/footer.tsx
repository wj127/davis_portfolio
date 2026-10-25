import styles from '@/components/footer/footer.module.scss';
import { FooterClient } from '@/components/footer/footer-client';

const sitemapLabels = ['Work Experience', 'About Me', 'Blog', 'Contact'] as const;

const socialLinks = [
  { label: 'GitHub', iconSrc: '/footer/github.svg', motionClassName: styles.githubLink },
  { label: 'LinkedIn', iconSrc: '/footer/linkedin.svg', motionClassName: styles.linkedinLink },
  { label: 'X', iconSrc: '/footer/x.svg', motionClassName: styles.xLink },
] as const;

async function getCopyrightYear() {
  'use cache';
  return new Date().getFullYear();
}

export const Footer = async () => {
  const copyrightYear = await getCopyrightYear();

  return <FooterClient socialLinks={socialLinks} sitemapLabels={sitemapLabels} copyrightYear={copyrightYear} />;
};
