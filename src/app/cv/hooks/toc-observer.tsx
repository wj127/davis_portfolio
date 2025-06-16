import { MutableRefObject, RefObject, useEffect } from 'react';

export const useTocObserver = ({
  timelineYears,
  sectionRefs,
  containerRef,
  setActiveYear,
}: {
  timelineYears: number[];
  sectionRefs: MutableRefObject<Record<number, HTMLElement | null>>;
  containerRef: RefObject<HTMLDivElement>;
  setActiveYear: (year: number) => void;
}) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const yearMatch = target.id?.match(/year-(\d+)/);
            if (yearMatch?.[1]) {
              const year = Number(yearMatch[1]);
              setActiveYear(year);
            }
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.5,
      },
    );

    timelineYears.forEach((year) => {
      const sec = sectionRefs.current[year];
      if (sec) obs.observe(sec);
    });
    return () => obs.disconnect();
  }, [containerRef, sectionRefs, setActiveYear, timelineYears]);
};
