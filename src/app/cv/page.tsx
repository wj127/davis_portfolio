'use client';

import { Toc } from 'src/app/cv/components/toc/Toc';
import { Fragment, useEffect, useRef, useState } from 'react';
import styles from 'src/app/cv/cv.module.scss';
import { Bruno_Ace_SC } from 'next/font/google';
import { useTocObserver } from '@/app/cv/hooks/toc-observer';
import Image from 'next/image';
import { TimeLineSections, timelineYears } from '@/app/cv/constants/sections';
import { useRevealContentObserver } from '@/app/cv/hooks/reveal-observer';

const brunoAce = Bruno_Ace_SC({ weight: '400', subsets: ['latin'] });

export default function CurriculumVitae() {
  const [activeYear, setActiveYear] = useState(timelineYears[0]);
  const [isFirstRender, setIsFirstRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<number, HTMLElement | null>>({});
  const contentRefs = useRef<(HTMLElement | null)[]>([]);
  useTocObserver({ timelineYears, sectionRefs, containerRef, setActiveYear });
  useRevealContentObserver({
    targetRefs: contentRefs.current,
  });

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
        {TimeLineSections.map(({ year, id, logo, subTitle, gradientColor }, index) => (
          <Fragment key={id}>
            <section
              /* @ts-ignore */
              ref={(sectionElement) => (sectionRefs.current[year] = sectionElement)}
              className={styles.yearSection}
              style={{
                background: `linear-gradient(90deg, ${gradientColor} 0%, ${gradientColor} 25%, rgba(255,255,255,0.8) 50%, #ffffff 100%)`,
              }}
              id={id}
            >
              <div>
                <h1>{year}</h1>
                <h3>{subTitle}</h3>
              </div>
            </section>
            <section className={styles.companySection} style={{ background: gradientColor }}>
              <Image
                src={logo}
                alt='InAtlas Logo'
                data-index-type={index % 2 === 0 ? 'even' : 'odd'}
                className={styles.companyLogo}
                ref={(imageElement) => {
                  contentRefs.current.push(imageElement);
                }}
              />
            </section>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
