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
  'Hey you, yeah YOU! 🫵🏼',
  "Don't be shy, let's get to know each other 😉",
  "I'm Davis, a huble entrepreneur and occasional angel investor.",
  'I also work full time as a software engineer with a passion for creating amazing things.',
  "I'm an entrepreneurial software engineer who aligns technical decisions with business growth, customer retention, and product quality.",
  'Having contributed to multiple ventures, I leverage strategic business insights in my coding approach that emphasizes in rigorous testing and scalable engineering solutions that directly drive business success 🚀.',
  'Now, I DARE you go and check the rest of my portfolio. 😏',
];

export const Console: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [hasClosed, setHasClosed] = React.useState(false);
  const [isMinimized, setIsMinimized] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  if (hasClosed) return null;

  if (isMinimized) {
    return (
      <div className={ConsoleStyles.minimizedConsole} onClick={() => setIsMinimized(false)}>
        <div className={ConsoleStyles.buttonContainer}>
          <div
            id={ConsoleStyles.buttonCancel}
            className={ConsoleStyles.button}
            onClick={(e) => {
              e.stopPropagation();
              setHasClosed(true);
            }}
          />
          <div
            id={ConsoleStyles.buttonMaximize}
            className={ConsoleStyles.button}
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(false);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${ConsoleStyles.consoleWrapper} ${isExpanded ? ConsoleStyles.isExpanded : ''} ${sourceCodePro.variable}`}
    >
      <div className={ConsoleStyles.consoleTop}>
        <div className={ConsoleStyles.buttonContainer}>
          <div id={ConsoleStyles.buttonCancel} className={ConsoleStyles.button} onClick={() => setHasClosed(true)} />
          <div
            id={ConsoleStyles.buttonMinimize}
            className={ConsoleStyles.button}
            onClick={() => setIsMinimized(true)}
          />
          <div
            id={ConsoleStyles.buttonMaximize}
            className={ConsoleStyles.button}
            onClick={() => setIsExpanded(!isExpanded)}
          />
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
