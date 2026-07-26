import { get } from '@vercel/blob';
import { NextResponse, type NextRequest } from 'next/server';
import { locales, type Locale } from '@/i18n/config';
import { buildCvBlobKey, buildCvFileName } from '@/app/work-experience/cv/cv-storage';

const isValidLocale = (candidate: string): candidate is Locale => (locales as readonly string[]).includes(candidate);

// Private-store blobs are not publicly reachable, so we stream them through this
// authenticated route (the SDK uses BLOB_READ_WRITE_TOKEN). useCache: false keeps
// the download fresh right after an owner-triggered regeneration.
export async function GET(request: NextRequest) {
  const localeParam = request.nextUrl.searchParams.get('locale') ?? '';

  if (!isValidLocale(localeParam)) {
    return new NextResponse('Invalid locale', { status: 400 });
  }

  const blobKey = buildCvBlobKey(localeParam);
  const result = await get(blobKey, { access: 'private', useCache: false });

  if (!result || result.statusCode !== 200) {
    return new NextResponse('Not found', { status: 404 });
  }

  return new NextResponse(result.stream, {
    headers: {
      'Content-Type': result.blob.contentType ?? 'application/pdf',
      'Content-Disposition': `attachment; filename="${buildCvFileName(localeParam)}"`,
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'private, no-cache',
    },
  });
}
