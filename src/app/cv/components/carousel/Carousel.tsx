'use client';

import { useState, useRef, useEffect } from 'react';
import styles from '@/app/cv/components/Carousel.module.scss';
import { CarouselProps } from '@/app/cv/components';

export const Carousel = ({ slides, className = '', slideClassName = '', onSlideChange }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const goToPrevious = () => {
    setCurrentIndex((previousIndex) => {
      return previousIndex > 0 ? previousIndex - 1 : previousIndex;
    });
    //onSlideChange?.(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : currentIndex;
    setCurrentIndex(newIndex);
    onSlideChange?.(newIndex);
  };

  const goToSlide = (index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentIndex(index);
      onSlideChange?.(index);
    }
  };

  // Smooth scroll to current slide
  useEffect(() => {
    if (!carouselRef.current) return;

    const slideHeight = carouselRef.current.clientHeight;
    carouselRef.current.scrollTo({
      top: currentIndex * slideHeight,
      behavior: 'smooth',
    });
  }, [currentIndex]);

  return (
    <div className={`${styles.carouselContainer} ${className}`}>
      {/* Navigation Buttons */}
      <div className={styles.navigationContainer}>
        <button
          className={`${styles.navButton} ${styles.upButton} ${currentIndex === 0 ? styles.hidden : ''}`}
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          aria-label='Previous slide'
        >
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M7 14L12 9L17 14'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>

        <button
          className={`${styles.navButton} ${styles.downButton} ${
            currentIndex === slides.length - 1 ? styles.hidden : ''
          }`}
          onClick={goToNext}
          disabled={currentIndex === slides.length - 1}
          aria-label='Next slide'
        >
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M7 10L12 15L17 10'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>

      {/* Main Carousel Content */}
      <div ref={carouselRef} className={styles.carouselContent}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${slideClassName} ${index === currentIndex ? styles.activeSlide : ''}`}
          >
            <div className={styles.slideContent}>{slide.content}</div>
          </div>
        ))}
      </div>

      {/* Breadcrumb Markers */}
      <div className={styles.breadcrumbContainer}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.breadcrumb} ${index === currentIndex ? styles.activeBreadcrumb : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
