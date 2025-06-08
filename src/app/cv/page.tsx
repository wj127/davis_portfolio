'use client';

import { Toc } from 'src/app/cv/components/toc/Toc';
import { useEffect, useRef } from 'react';
import styles from 'src/app/cv/cv.module.scss';
import { Bruno_Ace_SC } from 'next/font/google';

const brunoAce = Bruno_Ace_SC({ weight: '400', subsets: ['latin'] });

const timelineYears = [2023, 2020, 2018, 2015, 2012];

export default function CurriculumVitae() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<number, HTMLElement | null>>({});

  useEffect(() => {
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
  }, []);

  return (
    <div className={brunoAce.className}>
      <Toc />
      {/*<section className={CVStyles.sectionOne}>*/}
      {/*  <h1>Curriculum Vitae</h1>*/}
      {/*</section>*/}
      {/*<section className={CVStyles.sectionTwo}></section>*/}
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
