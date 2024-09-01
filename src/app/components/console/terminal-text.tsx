import React from 'react';
import ConsoleStyles from '@/app/components/console/console.module.scss';

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
  <div className={ConsoleStyles.terminalTextWrapper}>
    <p className={ConsoleStyles.terminalText}>
      <span className={ConsoleStyles.consoleTextPre}>{homeDir} &gt;</span>
      {displayedText}
      {showCursor && <span className={ConsoleStyles.cursor}>a</span>}
    </p>
  </div>
);
