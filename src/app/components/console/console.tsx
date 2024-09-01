'use client';

import React from 'react';
import ConsoleStyles from '@/app/components/console/console.module.scss';
import { TerminalCursor } from '@/app/components/console/terminal-cursor';
import { TerminalText } from '@/app/components/console/terminal-text';
import { Source_Code_Pro } from 'next/font/google';

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
    <div className={`${ConsoleStyles.consoleWrapper} ${sourceCodePro.variable}`}>
      <div className={ConsoleStyles.consoleTop}>
        <div className={ConsoleStyles.buttonContainer}>
          <div id={ConsoleStyles.buttonCancel} className={ConsoleStyles.button} />
          <div id={ConsoleStyles.buttonMinimize} className={ConsoleStyles.button} />
          <div id={ConsoleStyles.buttonMaximize} className={ConsoleStyles.button} />
        </div>
      </div>
      <div>
        {currentIndex > 0 &&
          texts.slice(0, currentIndex).map((text, index) => (
            <div className={ConsoleStyles.consoleTextWrapper} key={index}>
              <TerminalText displayedText={text} showCursor={false} />
            </div>
          ))}
        <div className={ConsoleStyles.consoleTextWrapper}>
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
