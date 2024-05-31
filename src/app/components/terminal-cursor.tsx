'use client'

import React, { useEffect, useState } from 'react';
import styles from '../landing.module.scss';

// const text = 'Hey! This is Davis. Welcome to my website :D';
const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras placerat mi non diam ornare dictum. Nullam laoreet mattis velit sed lobortis. Donec quis convallis leo. Nunc aliquet aliquet libero, ultrices faucibus lacus aliquet quis.';
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
      <p className={styles.terminalText}>
        <span className={styles.consoleTextPre}>/Home/MrDavis &gt;</span>
        {displayedText}
        <span className={styles.cursor}>a</span>
      </p>
    </div>
  );
};