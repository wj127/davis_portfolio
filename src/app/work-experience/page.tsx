'use client';

import React, { Fragment, useRef, useState } from 'react';
import Image from 'next/image';
import { Bruno_Ace_SC } from 'next/font/google';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from '@/app/work-experience/work-experience.module.scss';
import { Toc } from '@/app/work-experience/components/toc/Toc';
import { TimeLineSections, timelineYears } from '@/app/work-experience/constants/sections';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const brunoAce = Bruno_Ace_SC({ weight: '400', subsets: ['latin'] });

const DESKTOP_MEDIA_QUERY = '(min-width: 1025px)';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

// Visible viewport width, excluding the vertical scrollbar that the pin always introduces.
// (window.innerWidth includes the scrollbar, which would offset the centering math.)
const getViewportWidth = () => document.documentElement.clientWidth;

export default function WorkExperience() {
  const [activeYear, setActiveYear] = useState<number>(timelineYears[0]);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const yearSectionRefs = useRef<Record<number, HTMLElement | null>>({});
  const horizontalScrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const pinWrapper = pinWrapperRef.current;
      if (!track || !pinWrapper) return;

      const matchMedia = gsap.matchMedia();

      matchMedia.add(DESKTOP_MEDIA_QUERY, () => {
        const getScrollDistance = () => track.scrollWidth - getViewportWidth();

        // Activate the year whose section currently covers the viewport centre.
        // Read from live layout (not GSAP containerAnimation triggers): the track
        // pans positive-x (right-to-left camera), a direction containerAnimation
        // child triggers don't map correctly, so we derive state from positions.
        const updateActiveYear = () => {
          const viewportCenter = getViewportWidth() / 2;
          for (const year of timelineYears) {
            const yearSection = yearSectionRefs.current[year];
            if (!yearSection) continue;
            const rect = yearSection.getBoundingClientRect();
            if (rect.left <= viewportCenter && rect.right >= viewportCenter) {
              setActiveYear(year);
              return;
            }
          }
        };

        // Paused per-panel reveal tweens, played/reversed from live positions for
        // the same direction-agnostic reason as the active-year detection above.
        const companySections = Array.from(pinWrapper.querySelectorAll<HTMLElement>(`.${styles.companySection}`));
        const companyReveals = companySections.map((companySection) => {
          const revealTargets = [
            companySection.querySelector<HTMLElement>(`.${styles.companyLogo}`),
            companySection.querySelector<HTMLElement>(`.${styles.contentWrapper}`),
          ].filter((revealTarget): revealTarget is HTMLElement => Boolean(revealTarget));

          const reveal = gsap.from(revealTargets, {
            autoAlpha: 0,
            y: 48,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            paused: true,
            immediateRender: true,
          });

          return { companySection, reveal };
        });

        const updateCompanyReveals = () => {
          const viewportWidth = getViewportWidth();
          companyReveals.forEach(({ companySection, reveal }) => {
            const rect = companySection.getBoundingClientRect();
            const isInView = rect.left < viewportWidth * 0.75 && rect.right > viewportWidth * 0.25;
            if (isInView) reveal.play();
            else reveal.reverse();
          });
        };

        // The track rests flush-right (see SCSS), so at x:0 the newest year is shown.
        // Panning the track rightward (+x) brings the older years (laid out to the
        // left) into view: a right-to-left camera pan. Starting at x:0 keeps the
        // pre-hydration paint identical to the first animated frame (no flick).
        const horizontalTween = gsap.fromTo(
          track,
          { x: 0 },
          {
            x: () => getScrollDistance(),
            ease: 'none',
            scrollTrigger: {
              trigger: pinWrapper,
              start: 'top top',
              end: () => `+=${getScrollDistance()}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: () => {
                updateActiveYear();
                updateCompanyReveals();
              },
              onRefresh: () => {
                updateActiveYear();
                updateCompanyReveals();
              },
            },
          },
        );

        horizontalScrollTriggerRef.current = horizontalTween.scrollTrigger ?? null;

        updateActiveYear();
        updateCompanyReveals();

        return () => {
          horizontalScrollTriggerRef.current = null;
        };
      });
    },
    { scope: pinWrapperRef },
  );

  const handleSelectYear = (year: number) => {
    const yearSection = yearSectionRefs.current[year];
    const track = trackRef.current;
    if (!yearSection) return;

    setActiveYear(year);

    const horizontalScrollTrigger = horizontalScrollTriggerRef.current;
    if (!track || !horizontalScrollTrigger || !window.matchMedia(DESKTOP_MEDIA_QUERY).matches) {
      yearSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const scrollDistance = track.scrollWidth - getViewportWidth();
    if (scrollDistance <= 0) return;

    // Track rests flush-right and pans from x:0 to +scrollDistance, so a section is
    // centered at progress = 1 - its centered offset within the track.
    const centeredProgress =
      (yearSection.offsetLeft + yearSection.offsetWidth / 2 - getViewportWidth() / 2) / scrollDistance;
    const progress = clamp(1 - centeredProgress, 0, 1);
    const targetScroll =
      horizontalScrollTrigger.start + progress * (horizontalScrollTrigger.end - horizontalScrollTrigger.start);

    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <div className={brunoAce.className}>
      <Toc activeYear={activeYear} onSelectYear={handleSelectYear} />
      <section ref={pinWrapperRef} className={styles.pinWrapper}>
        <div ref={trackRef} className={styles.track}>
          {TimeLineSections.map(({ year, id, logo, subTitle, gradientColor, content, colour, className }) => (
            <Fragment key={id}>
              <section
                ref={(yearSectionElement) => {
                  yearSectionRefs.current[year] = yearSectionElement;
                }}
                className={`${styles.yearSection} ${styles[className] || ''}`}
                id={id}
              >
                <div>
                  <h1>{year}</h1>
                  <h3>{subTitle}</h3>
                </div>
              </section>
              <section className={styles.companySection} style={{ background: gradientColor }}>
                <Image src={logo} alt={`${year} company logo`} className={styles.companyLogo} />
                <div className={styles.contentWrapper} style={{ color: colour }}>
                  {React.isValidElement(content)
                    ? content
                    : content.map((contentBlock) => (
                        <div key={contentBlock.id} className={styles.contentSection}>
                          {contentBlock.content}
                        </div>
                      ))}
                </div>
              </section>
            </Fragment>
          ))}
        </div>
      </section>
    </div>
  );
}
