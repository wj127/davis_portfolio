export const siteConfig = {
  url: 'https://mrdavis.me',
  siteName: 'Davis Armas (MrDavis) — Portfolio',
  fullName: 'Davis Yoel Armas Ayala',
  alternateNames: ['Davis Armas', 'Davis Yoel', 'Davis Armas Ayala', 'Davis Yoel Armas', 'MrDavis'],
  jobTitle: 'Full Stack Software Engineer',
  email: 'davis.armas.ayala@gmail.com',
  ogImagePath: '/mrD-logos/mrD-logo-png-blue-silver.png',
  description:
    'Portfolio of Davis Yoel Armas Ayala (MrDavis), a full stack software engineer passionate about building amazing products, from interactive UIs to solid backend systems.',
} as const;

// Public profiles that identify the same person (e.g. GitHub, LinkedIn).
// Add profile URLs here to strengthen the Person structured data.
export const socialProfileUrls: string[] = [
  'https://www.linkedin.com/in/davis-yoel-armas-ayala-a88815144',
  'https://github.com/wj127',
];
