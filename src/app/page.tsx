import styles from 'src/app/landing.module.scss';
import { Console } from '@/app/components/console/console';

export default function Home() {
  return (
    <div className={styles.mainDiv}>
      <Console />
    </div>
  );
}
