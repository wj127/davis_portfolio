import styles from 'src/app/landing.module.scss';
import { Console } from '@/app/components/console/console';
import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const homeTranslations = await getTranslations('HomePage');

  return (
    <div className={styles.mainDiv}>
      <h1 className={styles.srOnly}>{homeTranslations('srTitle')}</h1>
      <Console />
    </div>
  );
}
