import { useEffect } from 'react';
import styles from 'src/app/cv/cv.module.scss';

export type RevealContentObserverProps = {
  targetRefs: (HTMLElement | null)[];
  threshold?: number;
  rootMargin?: string;
  revealOnce?: boolean;
  visibleAttrName?: string; // attribute toggled on target when visible
  activateDelayMs?: number; // new: how long to delay vertical handoff after reveal
};

// Observes provided elements and toggles a data attribute when they become visible.
export const useRevealContentObserver = ({
  targetRefs,
  threshold = 0.35,
  rootMargin = '0px 15% 0px 15%', // Adjust as needed
  revealOnce = true,
  visibleAttrName = 'data-visible',
  activateDelayMs = 1200, // match CSS transition in `yScroll`
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
              const targetRect = entry.boundingClientRect;
              const rootRect = entry.rootBounds;
              if (targetRect.left > rootRect!.left) target.scrollTop = target.scrollHeight;
              else target.scrollTop = 0;
              target.setAttribute('data-activate-at', String(Date.now() + activateDelayMs));
            }

            // if (revealOnce) observer.unobserve(target);
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
  }, [targetRefs, threshold, rootMargin, revealOnce, visibleAttrName, activateDelayMs]);
};
