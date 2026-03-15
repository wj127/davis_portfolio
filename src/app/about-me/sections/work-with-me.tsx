import { useTranslations } from 'next-intl';
import styles from '@/app/about-me/sections/sections.module.scss';

export const WorkWithMeSection = () => {
  const translations = useTranslations('AboutMe');
  return (
    <div className={styles.section}>
      <p>{translations('workWithMe.description')}</p>
      <ul className={styles.list}>
        <li>{translations('workWithMe.1')}</li>
        <li>{translations('workWithMe.2')}</li>
        <li>{translations('workWithMe.3')}</li>
        <li>{translations('workWithMe.4')}</li>
        <li>{translations('workWithMe.5')}</li>
        <li>{translations('workWithMe.6')}</li>
        <li>{translations('workWithMe.7')}</li>
        <li>{translations('workWithMe.8')}</li>
      </ul>
      <p className={styles.conclusion}>{translations('workWithMe.conclusion')}</p>
    </div>
  );
};
