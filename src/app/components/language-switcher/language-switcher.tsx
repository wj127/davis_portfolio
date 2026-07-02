'use client';

import React, { useTransition } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { locales, Locale } from '@/i18n/config';
import styles from '@/app/components/language-switcher/language-switcher.module.scss';
import { setLanguagePreference } from '@/app/components/language-switcher/actions';

const FLAG_MAP: Record<Locale, { src: string; alt: string }> = {
  en: { src: '/language-flags/en.webp', alt: 'English' },
  es: { src: '/language-flags/es.png', alt: 'Español' },
};

export const LanguageSwitcher: React.FC = () => {
  const currentLocale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;
    startTransition(() => {
      setLanguagePreference(newLocale);
    });
  };

  const currentFlag = FLAG_MAP[currentLocale];

  return (
    <div className={styles.wrapper}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className={styles.trigger}
            aria-label={`Current language: ${currentFlag.alt}`}
            data-pending={isPending || undefined}
          >
            <Image
              src={currentFlag.src}
              alt={currentFlag.alt}
              width={24}
              height={24}
              className={styles.flagImage}
              unoptimized
            />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className={styles.content} sideOffset={8} align='center'>
            {locales.map((locale) => {
              const flag = FLAG_MAP[locale];
              const isActive = locale === currentLocale;
              return (
                <DropdownMenu.Item
                  key={locale}
                  className={`${styles.item} ${isActive ? styles.activeItem : ''}`}
                  onSelect={() => handleLocaleChange(locale)}
                >
                  <Image
                    src={flag.src}
                    alt={flag.alt}
                    width={24}
                    height={24}
                    className={styles.flagImage}
                    unoptimized
                  />
                </DropdownMenu.Item>
              );
            })}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};
