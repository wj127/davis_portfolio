import styles from "./landing.module.scss";
import { TerminalCursor } from './components/terminal-cursor';

export default function Home() {
  return (
    <div className={styles.mainDiv}>
      {/*<p className={styles.terminalText} />*/}
      <TerminalCursor />
    </div>
  );
}
