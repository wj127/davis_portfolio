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
const Y_SCROLL_SELECTOR = `.${styles.yScroll}`;

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

    const canScrollVert = (el: HTMLElement, deltaY: number) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      if (scrollHeight <= clientHeight) return false; // no overflow
      if (deltaY < 0) return scrollTop > 0; // up: not at top
      if (deltaY > 0) return scrollTop + clientHeight < scrollHeight - 1; // down: not at bottom
      return false;
    };

    const onWheel = (wheelEvent: WheelEvent) => {
      // If the gesture is already horizontal (trackpad), don’t interfere.
      if (Math.abs(wheelEvent.deltaX) > Math.abs(wheelEvent.deltaY)) return;

      const target = wheelEvent.target as HTMLElement | null;
      const yScroller = target?.closest(Y_SCROLL_SELECTOR) as HTMLElement | null;

      // If we're inside a whitelisted vertical scroller that can still scroll in this direction, let it handle the wheel
      if (yScroller && canScrollVert(yScroller, wheelEvent.deltaY)) {
        const computedStyle = window.getComputedStyle(yScroller);
        const matrix = new DOMMatrix(computedStyle.transform);
        const isVisible = matrix.m41 === 0; // m41 is translateX
        if (!isVisible) return;

        wheelEvent.preventDefault();
        // Manually scroll with reduced speed
        yScroller.scrollBy({ top: wheelEvent.deltaY * 0.5, behavior: 'smooth' });
        return; // no preventDefault -> vertical scroll proceeds
      }

      // Otherwise, translate wheel to horizontal timeline scroll
      wheelEvent.preventDefault();
      // With row-reverse, positive left scroll moves visually right-to-left
      container?.scrollBy({ left: -wheelEvent.deltaY, behavior: 'auto' });
    };

    // function onWheel(wheelEvent: WheelEvent) {
    //   if (!container) return;
    //   wheelEvent.preventDefault();
    //   // With row-reverse, positive left scroll moves visually right-to-left
    //   container.scrollBy({ left: -wheelEvent.deltaY });
    // }

    container?.addEventListener('wheel', onWheel, { passive: false });
    return () => container?.removeEventListener('wheel', onWheel);
  }, [isFirstRender]);

  return (
    <div className={brunoAce.className}>
      <Toc activeYear={activeYear} />
      <div ref={containerRef} className={styles.horizontalContainer}>
        {TimeLineSections.map(({ year, id, logo, subTitle, gradientColor, content, colour }, index) => (
          <Fragment key={id}>
            <section
              /* @ts-ignore */
              ref={(sectionElement) => (sectionRefs.current[year] = sectionElement)}
              className={styles.yearSection}
              style={{
                background: `linear-gradient(90deg, ${gradientColor} 0%, ${gradientColor} 8%, color-mix(in srgb, ${gradientColor} 85%, #3599CA 15%) 15%, color-mix(in srgb, ${gradientColor} 70%, #3599CA 30%) 22%, color-mix(in srgb, ${gradientColor} 50%, #3599CA 50%) 30%, color-mix(in srgb, ${gradientColor} 30%, #3599CA 70%) 35%, #3599CA 40%, #3599CA 100%)`,
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
              <div
                className={styles.yScroll}
                ref={(divElement) => {
                  contentRefs.current.push(divElement);
                }}
                style={{ color: colour }}
              >
                {content}
              </div>
            </section>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
