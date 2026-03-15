import { useTranslations } from 'next-intl';
import styles from '@/app/about-me/sections/sections.module.scss';

export const WhatImGoodAtSection = () => {
  const translations = useTranslations('AboutMe');
  return (
    <div className={styles.section}>
      <p>{translations('whatImGoodAt.description')}</p>
      <ul className={styles.list}>
        <li>{translations('whatImGoodAt.1')}</li>
        <li>{translations('whatImGoodAt.2')}</li>
        <li>{translations('whatImGoodAt.3')}</li>
        <li>{translations('whatImGoodAt.4')}</li>
        <li>{translations('whatImGoodAt.5')}</li>
        <li>{translations('whatImGoodAt.6')}</li>
        <li>{translations('whatImGoodAt.7')}</li>
      </ul>
      <p className={styles.conclusion}>{translations('whatImGoodAt.conclusion')}</p>
    </div>
  );
};
