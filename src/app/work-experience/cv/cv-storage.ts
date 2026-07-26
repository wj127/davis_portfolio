import type { Locale } from '@/i18n/config';

// Single source of truth for where each locale's CV lives in Vercel Blob and the
// route that streams it back, shared by the server action and the download route.
export const buildCvBlobKey = (locale: Locale) => `cv/davis-cv-${locale}.pdf`;

export const buildCvFileName = (locale: Locale) => `davis-cv-${locale}.pdf`;

export const buildCvDownloadPath = (locale: Locale) => `/work-experience/cv/download?locale=${locale}`;
