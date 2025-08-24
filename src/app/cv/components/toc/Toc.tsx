'use client';

import React from 'react';
import styles from 'src/app/cv/components/toc/Toc.module.scss';
import { TimeLineSections } from '@/app/cv/constants/sections';

// Static array of years for the timeline
const timelineYears = TimeLineSections.map(({ year }) => year);

export const Toc: React.FC<{ activeYear: number }> = ({ activeYear }) => {
  return (
    <div className={styles.tocContainer}>
      <div className={styles.timeline}>
        {timelineYears.map((year, index) => (
          <div
            className={[styles.timelineItem, year === activeYear ? styles.active : ''].join(' ')}
            key={index}
            onClick={() => {
              const element = document.getElementById(`year-${year}`);
              element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
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
