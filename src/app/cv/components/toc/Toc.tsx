'use client';

import React, { MutableRefObject, RefObject } from 'react';
import styles from 'src/app/cv/components/toc/Toc.module.scss';

// Static array of years for the timeline
const timelineYears = [2023, 2020, 2018, 2015, 2012];

export const Toc: React.FC<{
  activeYear: number;
  sectionRefs: MutableRefObject<Record<number, HTMLElement | null>>;
  containerRef: RefObject<HTMLDivElement>;
}> = ({ activeYear, containerRef, sectionRefs }) => {
  const scrollToYear = (year: number) => {
    const section = sectionRefs.current[year];
    if (section && containerRef.current) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  };

  return (
    <div className={styles.tocContainer}>
      <div className={styles.timeline}>
        {timelineYears.map((year, index) => (
          <div
            className={[styles.timelineItem, year === activeYear ? styles.active : ''].join(' ')}
            key={index}
            onClick={() => scrollToYear(year)}
          >
            <div className={styles.timelineDot}>
              <div className={styles.dateInfo}>
                <span className={styles.year}>{year}</span>
              </div>
            </div>
            <div className={styles.timelineLine}></div>
          </div>
        ))}
      </div>
    </div>
  );
};
