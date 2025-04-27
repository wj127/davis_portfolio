'use client';

import React, { useEffect, useRef } from 'react';
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
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    if (!showCursor) return;

    // Find the scrollable parent container
    let scrollableParent = textRef.current.parentElement;
    while (
      scrollableParent &&
      getComputedStyle(scrollableParent).overflowY !== 'scroll' &&
      scrollableParent !== document.body
    ) {
      scrollableParent = scrollableParent.parentElement;
    }

    if (!scrollableParent) return;

    scrollableParent.scrollTop = scrollableParent.scrollHeight;
  }, [displayedText, showCursor]);

  return (
    <div className={ConsoleStyles.terminalTextWrapper} ref={textRef}>
      <p className={ConsoleStyles.terminalText}>
        <span className={ConsoleStyles.consoleTextPre}>{homeDir} &gt;</span>
        {displayedText}
        {showCursor && <span className={ConsoleStyles.cursor}>a</span>}
      </p>
    </div>
  );
};
