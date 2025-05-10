'use client';

import React from 'react';
import styles from 'src/app/cv/components/toc/Toc.module.scss';

// Static array of years for the timeline
const timelineYears = [2023, 2020, 2018, 2015, 2012];

export const Toc: React.FC = () => {
  return (
    <div className={styles.tocContainer}>
      <div className={styles.timeline}>
        {timelineYears.map((year, index) => (
          <div className={styles.timelineItem} key={index}>
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
