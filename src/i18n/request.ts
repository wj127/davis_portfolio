import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import { defaultLocale, locales, Locale } from '@/i18n/config';

function resolveLocaleFromAcceptLanguage(acceptLanguage: string | null) {
  if (!acceptLanguage) return defaultLocale;

  const preferred = acceptLanguage
    .split(',')
    .map((entry) => {
      const [lang, quality] = entry.trim().split(';q=');
      return { lang: lang.trim().toLowerCase(), q: quality ? parseFloat(quality) : 1 };
    })
    .sort((preferredLocaleA, preferredLocaleB) => preferredLocaleB.q - preferredLocaleA.q);

  for (const { lang } of preferred) {
    const exactMatch = locales.find((locale) => locale === lang);
    if (exactMatch) return exactMatch;

    const prefixMatch = locales.find((locale) => lang.startsWith(`${locale}-`));
    if (prefixMatch) return prefixMatch;
  }

  return defaultLocale;
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const cookieLocale = cookieStore.get('locale')?.value as Locale | undefined;
  const isValidCookieLocale = cookieLocale && locales.includes(cookieLocale);

  const locale: Locale = isValidCookieLocale
    ? cookieLocale
    : resolveLocaleFromAcceptLanguage(headerStore.get('accept-language'));

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
