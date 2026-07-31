'use client';

import React, { useRef, useEffect } from 'react';
import ConsoleStyles from '@/app/components/console/console.module.scss';
import { EasterEggDialog } from '@/app/components/console/easter-egg-dialog';
import { TerminalCursor } from '@/app/components/console/terminal-cursor';
import { TerminalText } from '@/app/components/console/terminal-text';
import { Source_Code_Pro } from 'next/font/google';
import { useTranslations } from 'next-intl';

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['200', '400'],
  style: ['normal', 'italic'],
  variable: '--font-source-code-pro',
});

export const Console: React.FC = () => {
  const consoleTranslations = useTranslations('Console');
  const texts = consoleTranslations.raw('texts') as string[];
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [hasClosed, setHasClosed] = React.useState(false);
  const [isEasterEggOpen, setIsEasterEggOpen] = React.useState(false);
  const [isMinimized, setIsMinimized] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const scrollableAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollableAreaRef.current) {
      scrollableAreaRef.current.scrollTop = scrollableAreaRef.current.scrollHeight;
    }
  }, [currentIndex]);

  const handleClose = () => {
    setHasClosed(true);
    setIsMinimized(false);
    setIsEasterEggOpen(true);
  };

  if (hasClosed) {
    return <EasterEggDialog open={isEasterEggOpen} onOpenChange={setIsEasterEggOpen} />;
  }

  if (isMinimized) {
    return (
      <div className={ConsoleStyles.minimizedConsole} onClick={() => setIsMinimized(false)}>
        <div className={ConsoleStyles.buttonContainer}>
          <div
            id={ConsoleStyles.buttonCancel}
            className={ConsoleStyles.button}
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
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
          <div id={ConsoleStyles.buttonCancel} className={ConsoleStyles.button} onClick={handleClose} />
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
      <div ref={scrollableAreaRef}>
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
