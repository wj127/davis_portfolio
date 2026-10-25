import styles from '@/components/footer/footer.module.scss';
import { FooterClient } from '@/components/footer/footer-client';

export type SitemapLabel = {
  label: string;
  href: string;
};

const sitemapLabels: Readonly<SitemapLabel[]> = [
  { label: 'Work Experience', href: '/work-experience' },
  { label: 'About Me', href: '/about-me' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export type SocialLink = {
  label: string;
  iconSrc: string;
  href: string;
  motionClassName: string;
};

const socialLinks: Readonly<SocialLink[]> = [
  {
    label: 'GitHub',
    iconSrc: '/footer/github.svg',
    href: 'https://github.com/wj127',
    motionClassName: styles.githubLink,
  },
  {
    label: 'LinkedIn',
    iconSrc: '/footer/linkedin.svg',
    href: 'https://www.linkedin.com/in/davis-y-armas-ayala-a88815144/',
    motionClassName: styles.linkedinLink,
  },
  { label: 'X', iconSrc: '/footer/x.svg', href: 'https://x.com/MrDavisArmas', motionClassName: styles.xLink },
];

async function getCopyrightYear() {
  'use cache';
  return new Date().getFullYear();
}

export const Footer = async () => {
  const copyrightYear = await getCopyrightYear();

  return <FooterClient socialLinks={socialLinks} sitemapLabels={sitemapLabels} copyrightYear={copyrightYear} />;
};
