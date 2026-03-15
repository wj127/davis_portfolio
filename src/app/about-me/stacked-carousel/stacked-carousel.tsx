'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '@app/about-me/stacked-carousel/stacked-carousel.module.scss';

const PHOTO_PATHS = [
  '/about-me/stacked-carousel/17857424409151159.jpg',
  '/about-me/stacked-carousel/17890512732343932.jpg',
  '/about-me/stacked-carousel/17957757662693706.jpg',
  '/about-me/stacked-carousel/17983899056690839.jpg',
  '/about-me/stacked-carousel/17986905803846443.jpg',
  '/about-me/stacked-carousel/17996045549353821.jpg',
  '/about-me/stacked-carousel/18048450118916185.jpg',
  '/about-me/stacked-carousel/18049716997524679.jpg',
  '/about-me/stacked-carousel/20240317_145824.jpg',
  '/about-me/stacked-carousel/20240323_181950_remastered.jpg',
  '/about-me/stacked-carousel/20240324_205956.jpg',
  '/about-me/stacked-carousel/20240704_115811.jpg',
  '/about-me/stacked-carousel/20240929_084751.jpg',
  '/about-me/stacked-carousel/20250220_122311.jpg',
  '/about-me/stacked-carousel/20251110_114326.jpg',
  '/about-me/stacked-carousel/DSC09050.jpg',
  '/about-me/stacked-carousel/DSC09251(1).jpg',
] as const;

const TOTAL_PHOTOS = PHOTO_PATHS.length;
const AUTO_ADVANCE_MS = 5000;

function wrapIndex(index: number): number {
  return ((index % TOTAL_PHOTOS) + TOTAL_PHOTOS) % TOTAL_PHOTOS;
}

export function StackedCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlinging, setIsFlinging] = useState(false);
  const autoAdvanceTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPaused = useRef(false);

  const advance = () => setIsFlinging(true);

  const handleFlingEnd = () => {
    setCurrentIndex((previousIndex) => wrapIndex(previousIndex + 1));
    setIsFlinging(false);
  };

  const resetAutoAdvance = () => {
    if (autoAdvanceTimer.current) clearInterval(autoAdvanceTimer.current);
    autoAdvanceTimer.current = setInterval(() => {
      if (!isPaused.current) advance();
    }, AUTO_ADVANCE_MS);
  };

  useEffect(() => {
    resetAutoAdvance();
    return () => {
      if (autoAdvanceTimer.current) clearInterval(autoAdvanceTimer.current);
    };
  }, [resetAutoAdvance]);

  const handleInteraction = () => {
    if (isFlinging) return;
    advance();
    resetAutoAdvance();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleInteraction();
    }
  };

  const LAYER_STYLES = [
    styles.cardFront,
    styles.cardLayer1,
    styles.cardLayer2,
    styles.cardLayer3,
    styles.cardLayer4,
  ] as const;

  const VISIBLE_LAYERS = LAYER_STYLES.length;
  const displayBase = isFlinging ? currentIndex + 1 : currentIndex;

  return (
    <div
      className={styles.carousel}
      onClick={handleInteraction}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => {
        isPaused.current = true;
      }}
      onMouseLeave={() => {
        isPaused.current = false;
      }}
      onFocus={() => {
        isPaused.current = true;
      }}
      onBlur={() => {
        isPaused.current = false;
      }}
      role='region'
      aria-roledescription='carousel'
      aria-label='Photo gallery'
      tabIndex={0}
    >
      {[...LAYER_STYLES].reverse().map((layerStyle, reverseIndex) => {
        const layerDepth = VISIBLE_LAYERS - 1 - reverseIndex;
        const imageIndex = wrapIndex(displayBase + layerDepth);
        return (
          <div key={`layer-${layerDepth}`} className={`${styles.card} ${layerStyle}`}>
            <Image
              src={PHOTO_PATHS[imageIndex]}
              alt=''
              fill
              sizes='(min-width: 900px) 380px, 300px'
              style={{ objectFit: 'cover' }}
              priority={layerDepth === 0 && imageIndex === 0}
              draggable={false}
            />
          </div>
        );
      })}

      {isFlinging && (
        <div
          className={`${styles.card} ${styles.cardFront} ${styles.fling}`}
          onAnimationEnd={handleFlingEnd}
          aria-hidden='true'
        >
          <Image
            src={PHOTO_PATHS[currentIndex]}
            alt=''
            fill
            sizes='(min-width: 900px) 380px, 300px'
            style={{ objectFit: 'cover' }}
            draggable={false}
          />
        </div>
      )}

      <span className={styles.counter} aria-live='polite' aria-atomic='true'>
        {currentIndex + 1} / {TOTAL_PHOTOS}
      </span>
    </div>
  );
}
