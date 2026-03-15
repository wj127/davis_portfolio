import { useTranslations } from 'next-intl';
import styles from '@/app/about-me/sections/sections.module.scss';

export const BeyondTheResumeSection = () => {
  const translations = useTranslations('AboutMe');
  return (
    <div className={styles.section}>
      <p>{translations('beyondTheResume.description')}</p>
      <ul className={styles.list}>
        <li>{translations('beyondTheResume.1')}</li>
        <li>
          {translations.rich('beyondTheResume.2', {
            laOlaLink: (chunks) => (
              <a
                className={styles.link}
                href='https://www.instagram.com/laolabajamar'
                target='_blank'
                rel='noopener noreferrer'
              >
                {chunks}
              </a>
            ),
          })}
        </li>
        <li>
          {translations.rich('beyondTheResume.3', {
            tascaIratxLink: (chunks) => (
              <a
                className={styles.link}
                href='https://revolutionrockbar.es/bar/irache-taberna-loterias'
                target='_blank'
                rel='noopener noreferrer'
              >
                {chunks}
              </a>
            ),
          })}
        </li>
        <li>{translations('beyondTheResume.4')}</li>
        <li>{translations('beyondTheResume.5')}</li>
        <li>{translations('beyondTheResume.6')}</li>
        <li>{translations('beyondTheResume.7')}</li>
      </ul>
      <p className={styles.conclusion}>{translations('beyondTheResume.conclusion')}</p>
    </div>
  );
};
