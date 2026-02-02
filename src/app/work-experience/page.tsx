'use client';

import React from 'react';
import { Toc } from '@/app/work-experience/components/toc/Toc';
import { Fragment, useEffect, useRef, useState } from 'react';
import styles from '@/app/work-experience/work-experience.module.scss';
import { Bruno_Ace_SC } from 'next/font/google';
import { useTocObserver } from '@/app/work-experience/hooks/toc-observer';
import Image from 'next/image';
import { TimeLineSections, timelineYears } from '@/app/work-experience/constants/sections';
import { useRevealContentObserver } from '@/app/work-experience/hooks/reveal-observer';
import { Carousel } from '@/app/work-experience/components';

const brunoAce = Bruno_Ace_SC({ weight: '400', subsets: ['latin'] });

const BUFFER = 24;

export default function CurriculumVitae() {
  const [activeYear, setActiveYear] = useState(timelineYears[0]);
  const [isFirstRender, setIsFirstRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<number, HTMLElement | null>>({});
  const contentRefs = useRef<(HTMLElement | null)[]>([]);
  useTocObserver({ timelineYears, sectionRefs, containerRef, setActiveYear });
  useRevealContentObserver({
    // eslint-disable-next-line react-hooks/refs
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
    if (!container) return;

    const lockRef = {
      armedElement: null as HTMLElement | null,
      activeElement: null as HTMLElement | null,
      expiresAt: 0,
    };

    const canScrollVert = (element: HTMLElement, deltaY: number, useBuffer = false) => {
      const { scrollTop, scrollHeight, clientHeight: innerElementHeight } = element;
      const top = useBuffer ? BUFFER : 0;
      const bottom = useBuffer ? BUFFER : 0;
      if (scrollHeight <= innerElementHeight) return false;
      if (deltaY < 0) return scrollTop > top; // up
      if (deltaY > 0) return scrollTop + innerElementHeight < scrollHeight - 1 - bottom; // down
      return false;
    };

    const isActiveYScroller = (el: HTMLElement | null) => {
      if (!el) return false;
      if (el.getAttribute('data-visible') !== 'true') return false;
      const activateAt = Number(el.getAttribute('data-activate-at') ?? 0);
      return Date.now() >= activateAt; // honor the 250ms guard
    };

    const onWheel = (wheelEvent: WheelEvent) => {
      // Trackpads: if strong horizontal intent, don't interfere
      if (Math.abs(wheelEvent.deltaX) > Math.abs(wheelEvent.deltaY)) return;

      const target = wheelEvent.target as HTMLElement | null;
      const yScroller = target?.closest(`.${styles.yScroll}`) as HTMLElement | null;

      if (!yScroller) {
        lockRef.armedElement = null;
        lockRef.activeElement = null;
        wheelEvent.preventDefault();
        container?.scrollBy({ left: -wheelEvent.deltaY }); // row-reverse compensation
        return;
      }

      // checks if the yScroller's "data-activate-at" is in the past
      if (isActiveYScroller(yScroller)) {
        // if vertically locked to this element, consume wheel vertically
        if (lockRef.activeElement === yScroller) {
          if (canScrollVert(yScroller, wheelEvent.deltaY)) {
            wheelEvent.preventDefault();
            yScroller.scrollBy({ top: wheelEvent.deltaY });
            return;
          } else {
            // reached an edge: release vertical lock and fall back to horizontal
            lockRef.activeElement = null;
          }
        }

        // not locked: require a second wheel within a short window to engage vertical
        const now = Date.now();
        if (lockRef.armedElement === yScroller && now < lockRef.expiresAt) {
          // only engage if we’re not at the edge (use small buffer so it doesn’t start at the very top/bottom)
          if (canScrollVert(yScroller, wheelEvent.deltaY, true)) {
            lockRef.activeElement = yScroller;
            wheelEvent.preventDefault();
            yScroller.scrollBy({ top: wheelEvent.deltaY });
            return;
          }
          // if buffer blocks, let it be horizontal this tick
        } else {
          // arm this scroller and eat no vertical yet
          lockRef.armedElement = yScroller;
          lockRef.expiresAt = now + 800; // ms window
          // do not vertical-scroll on first tick -> improves intent
        }
      }

      wheelEvent.preventDefault();
      container?.scrollBy({ left: -wheelEvent.deltaY }); // row-reverse compensation
    };

    container?.addEventListener('wheel', onWheel, { passive: false });
    return () => container?.removeEventListener('wheel', onWheel);
  }, [isFirstRender]);

  return (
    <div className={brunoAce.className}>
      {/* @ts-expect-error - need to fix the types */}
      <Toc activeYear={activeYear} sectionRefs={sectionRefs} containerRef={containerRef} />
      <div ref={containerRef} className={styles.horizontalContainer}>
        {TimeLineSections.map(({ year, id, logo, subTitle, gradientColor, content, colour, className }, index) => {
          const imgIndex = index * 2;
          const divIndex = imgIndex + 1;
          return (
            <Fragment key={id}>
              <section
                /* @ts-expect-error - same, need to fix the types here */
                ref={(sectionElement) => (sectionRefs.current[year] = sectionElement)}
                className={`${styles.yearSection} ${styles[className] || ''}`}
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
                    contentRefs.current[imgIndex] = imageElement;
                  }}
                />
                {React.isValidElement(content) ? (
                  <div
                    className={styles.yScroll}
                    ref={(divElement) => {
                      contentRefs.current[divIndex] = divElement;
                    }}
                    style={{ color: colour }}
                  >
                    {content}
                  </div>
                ) : (
                  <Carousel
                    ref={(divElement) => {
                      contentRefs.current[divIndex] = divElement;
                    }}
                    slides={content.map((element, innerIndex) => {
                      const carouselDivIndex = divIndex + innerIndex + 1;
                      return {
                        id: element.id,
                        content: (
                          <div
                            key={element.id}
                            className={styles.yScroll}
                            ref={(divElement) => {
                              contentRefs.current[carouselDivIndex] = divElement;
                            }}
                            style={{ color: colour }}
                            data-visible='true'
                          >
                            {element.content}
                          </div>
                        ),
                      };
                    })}
                  />
                )}
              </section>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
