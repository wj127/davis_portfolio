import React from 'react';
import styles from 'src/app/landing.module.scss';

type TerminalTextProps = {
  displayedText: string;
  showCursor?: boolean;
  homeDir?: string;
};

export const TerminalText: React.FC<TerminalTextProps> = ({
  displayedText,
  showCursor = true,
  homeDir = '/Home/MrDavis',
}) => (
  <div className={styles.terminalTextWrapper}>
    <p className={styles.terminalText}>
      <span className={styles.consoleTextPre}>{homeDir} &gt;</span>
      {displayedText}
      {showCursor && <span className={styles.cursor}>a</span>}
    </p>
  </div>
);
