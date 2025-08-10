'use client';

import { Toc } from 'src/app/cv/components/toc/Toc';
import { Fragment, useEffect, useRef, useState } from 'react';
import styles from 'src/app/cv/cv.module.scss';
import { Bruno_Ace_SC } from 'next/font/google';
import { useTocObserver } from '@/app/cv/hooks/toc-observer';
import Image from 'next/image';
import { TimeLineSections, timelineYears } from '@/app/cv/constants/sections';

const brunoAce = Bruno_Ace_SC({ weight: '400', subsets: ['latin'] });

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
      wheelEvent.preventDefault();
      // With row-reverse, positive left scroll moves visually right-to-left
      container.scrollBy({ left: -wheelEvent.deltaY });
    }
    container?.addEventListener('wheel', onWheel, { passive: false });
    return () => container?.removeEventListener('wheel', onWheel);
  }, [isFirstRender]);

  return (
    <div className={brunoAce.className}>
      <Toc activeYear={activeYear} />
      <div ref={containerRef} className={styles.horizontalContainer}>
        {TimeLineSections.map(({ year, id, logo }) => (
          <Fragment key={id}>
            <section
              /* @ts-ignore */
              ref={(el) => (sectionRefs.current[year] = el)}
              className={styles.yearSection}
              id={id}
            >
              <h1>{year}</h1>
            </section>
            <section className={styles.companySection}>
              <Image src={logo} alt='InAtlas Logo' width={500} height={500} className={styles.companyLogo} />
            </section>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
