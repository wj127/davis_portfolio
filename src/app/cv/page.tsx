'use client';

import { Toc } from 'src/app/cv/components/toc/Toc';
import { Fragment, useEffect, useRef } from 'react';
import styles from 'src/app/cv/cv.module.scss';
import { Bruno_Ace_SC } from 'next/font/google';
import Image from 'next/image';
import { TimeLineSections } from '@/app/cv/constants/sections';

const brunoAce = Bruno_Ace_SC({ weight: '400', subsets: ['latin'] });

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
