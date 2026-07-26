'use client';

import React, { useTransition } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Download } from 'lucide-react';
import styles from '@/app/components/cv-download-button/cv-download-button.module.scss';
import { getOrGenerateCvPdf } from '@/app/work-experience/cv/actions';

const WORK_EXPERIENCE_PATHNAME = '/work-experience';

export const CvDownloadButton: React.FC = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const translations = useTranslations('WorkExperience');
  const [isPending, startTransition] = useTransition();

  if (pathname !== WORK_EXPERIENCE_PATHNAME) return null;

  const label = translations('downloadCv');

  const handleDownload = () => {
    const regenToken = searchParams.get('regen');

    startTransition(async () => {
      const result = await getOrGenerateCvPdf(locale, regenToken);
      if (!result.success) return;

      // Same-origin streaming route sends Content-Disposition: attachment, so the
      // browser downloads with the right filename without needing a new tab.
      const downloadLink = document.createElement('a');
      downloadLink.href = result.url!;
      downloadLink.download = '';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
    });
  };

  return (
    <div className={styles.wrapper}>
      <button
        type='button'
        className={styles.trigger}
        onClick={handleDownload}
        aria-label={label}
        data-pending={isPending || undefined}
      >
        <Download size={18} className={styles.icon} aria-hidden='true' />
      </button>
      <span className={styles.tooltip} role='tooltip'>
        {label}
      </span>
    </div>
  );
};
