import styles from "./landing.module.scss";
import { TerminalCursor } from './components/terminal-cursor';

export default function Home() {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.consoleWrapper}>
        <div className={styles.consoleTop}>
          <div className={styles.buttonContainer}>
            <div id={styles.buttonCancel} className={styles.button}/>
            <div id={styles.buttonMinimize} className={styles.button}/>
            <div id={styles.buttonMaximize} className={styles.button}/>
          </div>
        </div>
        <div className={styles.consoleTextWrapper}>
          <TerminalCursor />
        </div>
      </div>
    </div>
  );
}
