import styles from 'src/app/landing.module.scss';
import { Console } from 'src/app/components/console';

export default function Home() {
  return (
    <div className={styles.mainDiv}>
      <Console />
    </div>
  );
}
