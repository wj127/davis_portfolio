import styles from "./landing.module.scss";
import { Console } from './components/console';

export default function Home() {
  return (
    <div className={styles.mainDiv}>
      <Console />
    </div>
  );
}
