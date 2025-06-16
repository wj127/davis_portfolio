'use client';

import { Toc } from 'src/app/cv/components/toc/Toc';
import { useEffect, useRef, useState } from 'react';
import styles from 'src/app/cv/cv.module.scss';
import { Bruno_Ace_SC } from 'next/font/google';
import { useTocObserver } from '@/app/cv/hooks/toc-observer';

const brunoAce = Bruno_Ace_SC({ weight: '400', subsets: ['latin'] });

const timelineYears = [2023, 2020, 2018, 2015, 2012];

export default function CurriculumVitae() {
  const [activeYear, setActiveYear] = useState(timelineYears[0]);
  const [isFirstRender, setIsFirstRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<number, HTMLElement | null>>({});
  useTocObserver({ timelineYears, sectionRefs, containerRef, setActiveYear });

  // little hack to ensure you can safely access client APIs after SSR
  useEffect(() => {
    setIsFirstRender(true);
  }, [setIsFirstRender]);

  useEffect(() => {
    if (!isFirstRender) return;
    const isMobile = window.innerWidth <= 1025; // Adjust this breakpoint as needed
    if (isMobile) return;
    const container = containerRef.current;
    function onWheel(wheelEvent: WheelEvent) {
      if (!container) return;
      wheelEvent.preventDefault(); // Stop vertical scroll
      container.scrollBy({
        left: wheelEvent.deltaY, // Use vertical delta to scroll horizontally
        // behavior: 'smooth',
      });
    }
    container?.addEventListener('wheel', onWheel, { passive: false });
    return () => container?.removeEventListener('wheel', onWheel);
  }, [isFirstRender]);

  return (
    <div className={brunoAce.className}>
      <Toc activeYear={activeYear} sectionRefs={sectionRefs} containerRef={containerRef} />
      <div ref={containerRef} className={styles.horizontalContainer}>
        {timelineYears.map((year) => (
          <section
            key={year}
            /* @ts-ignore */
            ref={(el) => (sectionRefs.current[year] = el)}
            className={styles.yearSection}
            id={`year-${year}`}
          >
            <h1>{year}</h1>
            {/* Your content here */}
          </section>
        ))}
      </div>
    </div>
  );
}
