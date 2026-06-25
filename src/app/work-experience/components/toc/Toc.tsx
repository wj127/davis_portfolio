'use client';

import React, { Fragment } from 'react';
import styles from '@/app/work-experience/components/toc/Toc.module.scss';
import { TimeLineSections } from '@/app/work-experience/constants/sections';
import { TocProps } from '@/app/work-experience/components/toc/Toc.types';

const timelineYears = TimeLineSections.map(({ year }) => year);

export const Toc: React.FC<TocProps> = ({ activeYear, onSelectYear }) => {
  const activeIndex = timelineYears.findIndex((timelineYear) => timelineYear === activeYear);

  return (
    <nav className={styles.tocContainer} aria-label='Work experience timeline'>
      <ol className={styles.timeline}>
        {timelineYears.map((year, yearIndex) => {
          const isActive = year === activeYear;
          // Highlight the path travelled from the newest year (index 0) to the
          // active node, mirroring the Stitch "data-line-active" segment.
          const isConnectorActive = yearIndex < activeIndex;

          return (
            <Fragment key={year}>
              <li className={[styles.node, isActive ? styles.active : ''].join(' ')}>
                <button
                  type='button'
                  className={styles.nodeButton}
                  onClick={() => onSelectYear(year)}
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={`Jump to ${year}`}
                >
                  <span className={styles.year}>{year}</span>
                  <span className={styles.dot}>
                    <span className={styles.dotCore} />
                  </span>
                  <span className={styles.caption}>Current</span>
                </button>
              </li>
              {yearIndex < timelineYears.length - 1 && (
                <li
                  aria-hidden='true'
                  className={[styles.connector, isConnectorActive ? styles.connectorActive : ''].join(' ')}
                />
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
