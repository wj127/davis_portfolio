import { ReactNode } from 'react';

export type CarouselSlide = {
  id: string;
  content: ReactNode;
};

export type CarouselProps = {
  slides: CarouselSlide[];
  className?: string;
  slideClassName?: string;
  onSlideChange?: (currentIndex: number) => void;
};

export type CarouselNavigationProps = {
  currentIndex: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
};

export type CarouselBreadcrumbsProps = {
  currentIndex: number;
  totalSlides: number;
  onSlideClick: (index: number) => void;
};
