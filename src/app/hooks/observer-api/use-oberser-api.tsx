import { useEffect, useRef } from 'react';

type UseObserverApiProps = {
  observedElements: React.RefObject<HTMLElement>[];
  callback: IntersectionObserverCallback;
  options?: IntersectionObserverInit;
};

const defaultObserverOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

export const useObserverApi = ({
  observedElements,
  callback,
  options = defaultObserverOptions,
}: UseObserverApiProps) => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!observedElements?.length) return;

    observer.current = new IntersectionObserver(callback, options);

    observedElements.forEach((element) => {
      if (!element.current) return;
      observer.current?.observe(element.current);
    });

    return () => {
      observedElements.forEach((element) => {
        if (!element.current) return;
        observer.current?.unobserve(element.current);
      });
    };
  }, [observedElements, callback, options]);
};
