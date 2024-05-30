'use client'

import React, { useEffect, useState } from 'react';
import styles from '../landing.module.scss';

const text = 'Hey! This is Davis. Welcome to my website :D';
let timeout: ReturnType<typeof setTimeout>;

export const TerminalCursor: React.FC = () => {
  const [initState, setInitState] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setInitState(true);
    }, 2400);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!initState) return;
    if (timeout) clearTimeout(timeout);
    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(displayedText + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, Math.random() * 200);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, displayedText, initState]);

  return (
    <div className={styles.terminalTextWrapper}>
      <p className={styles.consoleTextPre}>/Home/MrDavis &gt;</p>
      <p className={styles.terminalText}>{displayedText}</p>
      <span className={styles.cursor}>a</span>
    </div>
  );
};