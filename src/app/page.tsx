import styles from "./landing.module.scss";
import { TerminalCursor } from './components/terminal-cursor';
import { Source_Code_Pro } from '@next/font/google';

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['200', '400'],
  style: ['normal', 'italic'],
  variable: '--font-source-code-pro',
});

export default function Home() {
  return (
    <div className={styles.mainDiv}>
      <div className={`${styles.consoleWrapper} ${sourceCodePro.variable}`}>
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
