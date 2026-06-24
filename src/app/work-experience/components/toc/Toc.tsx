'use client';

import React from 'react';
import styles from '@/app/work-experience/components/toc/Toc.module.scss';
import { TimeLineSections } from '@/app/work-experience/constants/sections';
import { TocProps } from '@/app/work-experience/components/toc/Toc.types';

const timelineYears = TimeLineSections.map(({ year }) => year);

export const Toc: React.FC<TocProps> = ({ activeYear, onSelectYear }) => {
  return (
    <div className={styles.tocContainer}>
      <div className={styles.timeline}>
        {timelineYears.map((year) => (
          <div
            className={[styles.timelineItem, year === activeYear ? styles.active : ''].join(' ')}
            key={year}
            onClick={() => onSelectYear(year)}
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
