'use client';

import React, { useEffect, useState } from 'react';
import styles from '../landing.module.scss';

// const text = 'Hey! This is Davis. Welcome to my website :D';
const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras placerat mi non diam ornare dictum. Nullam laoreet mattis velit sed lobortis. Donec quis convallis leo. Nunc aliquet aliquet libero, ultrices faucibus lacus aliquet quis.';
let displayTimeout: ReturnType<typeof setTimeout>;
let onEndTimeout: ReturnType<typeof setTimeout>;

type TerminalCursorProps = {
  textToDisplay: string;
  onNext: () => void;
};

export const TerminalCursor: React.FC<TerminalCursorProps> = ({ textToDisplay, onNext }) => {
  console.log(textToDisplay);
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
    if (displayTimeout) clearTimeout(displayTimeout);
    if (currentIndex < textToDisplay.length) {
      displayTimeout = setTimeout(() => {
        setDisplayedText(displayedText + textToDisplay[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, Math.random() * 100);
    }
    return () => clearTimeout(displayTimeout);
  }, [currentIndex, displayedText, initState, textToDisplay]);

  useEffect(() => {
    if (onEndTimeout) clearTimeout(onEndTimeout);
    if (currentIndex && currentIndex === textToDisplay.length) {
      onEndTimeout = setTimeout(() => {
        setDisplayedText('');
        onNext();
      }, 2000);
    }
    return () => clearTimeout(onEndTimeout);
  }, [onNext, currentIndex, textToDisplay]);

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
