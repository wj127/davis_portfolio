import type { Locale } from '@/i18n/config';

export type GenerateCvMarkdownParams = {
  locale: Locale;
  templatePdfBase64: string;
};

export type CvActionSuccess = {
  success: true;
  url: string;
};

export type CvActionFailure = {
  success: false;
  message: string;
};

export type CvActionResult = CvActionSuccess | CvActionFailure;
