'use client';

import React from 'react';
import styles from '../landing.module.scss';
import { TerminalCursor } from './terminal-cursor';
import { Source_Code_Pro } from 'next/font/google';
import { TerminalText } from './terminal-text';

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['200', '400'],
  style: ['normal', 'italic'],
  variable: '--font-source-code-pro',
});

const texts = [
  'Hey! This is Davis. Welcome to my website :D',
  'I am a software engineer with a passion for web development',
  'I am a full stack developer with experience in React, Node.js, and Python',
  'I am also a cybersecurity enthusiast and a CTF player',
];

export const Console: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  return (
    <div className={`${styles.consoleWrapper} ${sourceCodePro.variable}`}>
      <div className={styles.consoleTop}>
        <div className={styles.buttonContainer}>
          <div id={styles.buttonCancel} className={styles.button} />
          <div id={styles.buttonMinimize} className={styles.button} />
          <div id={styles.buttonMaximize} className={styles.button} />
        </div>
      </div>
      <div>
        {currentIndex > 0 &&
          texts.slice(0, currentIndex).map((text, index) => (
            <div className={styles.consoleTextWrapper} key={index}>
              <TerminalText displayedText={text} showCursor={false} />
            </div>
          ))}
        <div className={styles.consoleTextWrapper}>
          <TerminalCursor
            key={currentIndex}
            textToDisplay={texts.at(currentIndex) ?? ''}
            onNext={() => setCurrentIndex((prev) => prev + 1)}
          />
        </div>
      </div>
    </div>
  );
};
