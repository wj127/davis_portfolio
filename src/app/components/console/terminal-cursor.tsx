'use client';

import React, { useEffect, useState } from 'react';
import { TerminalText } from '@/app/components/console/terminal-text';

let displayTimeout: ReturnType<typeof setTimeout>;
let onEndTimeout: ReturnType<typeof setTimeout>;

type TerminalCursorProps = {
  textToDisplay: string;
  onNext: () => void;
};

export const TerminalCursor: React.FC<TerminalCursorProps> = ({ textToDisplay, onNext }) => {
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

  return <TerminalText displayedText={displayedText} />;
};
