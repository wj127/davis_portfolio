import { useEffect } from 'react';
import styles from 'src/app/cv/cv.module.scss';

export type RevealContentObserverProps = {
  targetRefs: (HTMLElement | null)[];
  threshold?: number;
  rootMargin?: string;
  revealOnce?: boolean;
  visibleAttrName?: string; // attribute toggled on target when visible
};

// Observes provided elements and toggles a data attribute when they become visible.
export const useRevealContentObserver = ({
  targetRefs,
  threshold = 1,
  rootMargin = '0px', // Adjust as needed
  revealOnce = true,
  visibleAttrName = 'data-visible',
}: RevealContentObserverProps) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            target.setAttribute(visibleAttrName, 'true');

            // NEW: reset any accidental pre-reveal scroll and arm a short delay
            if (target.matches?.(`.${styles.yScroll}`)) {
              target.scrollTop = 0;
              target.setAttribute('data-activate-at', String(Date.now() + 250)); // 250ms guard
            }

            if (revealOnce) observer.unobserve(target);
          }
        });
      },
      { threshold, rootMargin },
    );

    targetRefs
      .filter((ref): ref is HTMLElement => Boolean(ref))
      .forEach((contentElement) => observer.observe(contentElement));

    return () => {
      targetRefs.forEach((contentElement) => {
        if (contentElement) observer.unobserve(contentElement);
      });
      observer.disconnect();
    };
  }, [targetRefs, threshold, rootMargin, revealOnce, visibleAttrName]);
};
