import { useTranslations } from 'next-intl';
import styles from '@app/about-me/sections/sections.module.scss';

export const HowIThinkSection = () => {
  const translations = useTranslations('AboutMe');
  return (
    <div className={styles.section}>
      <p>{translations('howIThink.description')}</p>

      <h3 className={styles.subsectionTitle}>
        <span className={styles.goodsGradient}>{translations('howIThink.theGoods.title')}</span>
      </h3>
      <ul className={styles.list}>
        <li>{translations('howIThink.theGoods.1')}</li>
        <li>{translations('howIThink.theGoods.2')}</li>
        <li>{translations('howIThink.theGoods.3')}</li>
        <li>{translations('howIThink.theGoods.4')}</li>
      </ul>

      <h3 className={styles.subsectionTitle}>
        <span className={styles.badsGradient}>{translations('howIThink.theBads.title')}</span>
      </h3>
      <ul className={styles.list}>
        <li>{translations('howIThink.theBads.1')}</li>
        <li>{translations('howIThink.theBads.2')}</li>
        <li>{translations('howIThink.theBads.3')}</li>
      </ul>

      <p className={styles.conclusion}>{translations('howIThink.conclusion')}</p>
    </div>
  );
};
