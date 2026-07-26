'use server';

import { head, put } from '@vercel/blob';
import { headers } from 'next/headers';
import { getLocale } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/config';
import { generateCvMarkdown } from '@/app/work-experience/cv/generate-cv-markdown';
import { markdownToPdfBuffer } from '@/app/work-experience/cv/markdown-to-pdf';
import { buildCvBlobKey, buildCvDownloadPath } from '@/app/work-experience/cv/cv-storage';

const TEMPLATE_PDF_PATHNAME = 'cv-template.pdf';
const CV_REGEN_SECRET = process.env.CV_REGEN_SECRET;

const isValidLocale = (candidate: string): candidate is Locale => (locales as readonly string[]).includes(candidate);

// The owner forces a fresh version by passing the secret; a missing/mismatched
// token just serves the cached PDF, so visitors can never trigger regeneration.
const shouldForceRegenerate = (regenToken: string | null) => {
  return Boolean(CV_REGEN_SECRET) && regenToken === CV_REGEN_SECRET;
};

// The store is private, so its blob URL is not publicly reachable: we only check
// existence here and always hand the client the streaming download route instead.
const cvBlobExists = async (blobKey: string) => {
  try {
    await head(blobKey);
    return true;
  } catch {
    // head throws BlobNotFoundError when the object does not exist yet.
    return false;
  }
};

// The template lives in /public and is served statically, so on serverless we read
// it back over HTTP using the incoming request's own host instead of the filesystem.
const fetchTemplatePdfBase64 = async () => {
  const headerStore = await headers();
  const host = headerStore.get('host');
  if (!host) {
    throw new Error('Unable to resolve request host to fetch the CV template.');
  }

  const protocol = headerStore.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https');
  const templateUrl = `${protocol}://${host}/${TEMPLATE_PDF_PATHNAME}`;

  const response = await fetch(templateUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch CV template (${response.status}) from ${templateUrl}.`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer).toString('base64');
};

export async function getOrGenerateCvPdf(requestedLocale: string, regenToken: string | null) {
  try {
    const locale: Locale = isValidLocale(requestedLocale) ? requestedLocale : ((await getLocale()) as Locale);
    const blobKey = buildCvBlobKey(locale);
    const forceRegenerate = shouldForceRegenerate(regenToken);

    if (!forceRegenerate && (await cvBlobExists(blobKey))) {
      return { success: true, url: buildCvDownloadPath(locale) };
    }

    const templatePdfBase64 = await fetchTemplatePdfBase64();
    const markdown = await generateCvMarkdown({ locale, templatePdfBase64 });
    const pdfBuffer = await markdownToPdfBuffer(markdown);

    await put(blobKey, pdfBuffer, {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/pdf',
    });

    return { success: true, url: buildCvDownloadPath(locale) };
  } catch (error) {
    console.error('Error generating CV PDF:', error);
    return {
      success: false,
      message: 'Could not generate the CV right now. Please try again later.',
    };
  }
}
