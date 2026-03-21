'use client';

import type { CSSProperties } from 'react';
import { useState } from 'react';
import { Bruno_Ace_SC, Source_Code_Pro } from 'next/font/google';
import styles from '@/app/about-me/about-me.module.scss';
import { StackedCarousel } from '@/app/about-me/stacked-carousel/stacked-carousel';
import { useTranslations } from 'next-intl';
import { HowIThinkSection } from '@/app/about-me/sections/how-i-think';
import { WhatImGoodAtSection } from '@/app/about-me/sections/what-im-good-at';
import { BeyondTheResumeSection } from '@/app/about-me/sections/beyond-the-resume';
import { WorkWithMeSection } from '@/app/about-me/sections/work-with-me';
import { ContactDialog } from '@/app/about-me/contact-dialog/contact-dialog';
import { Terminal } from 'lucide-react';

const brunoAce = Bruno_Ace_SC({ weight: '400', subsets: ['latin'] });
const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-source-code-pro',
});

const sections = [
  {
    id: 'how-i-think',
    label: 'How I think',
    colors: {
      primary: '#4169e1',
      secondary: '#7dd3fc',
      gradientColor1: '#b6c4ff',
      gradientColor2: '#4169e1',
    },
    content: <HowIThinkSection />,
  },
  {
    id: 'what-im-good-at',
    label: "What I'm good at",
    colors: {
      primary: '#1f9d55',
      secondary: '#f4b942',
      gradientColor1: '#1f9d55',
      gradientColor2: '#f4b942',
    },
    content: <WhatImGoodAtSection />,
  },
  {
    id: 'beyond-the-resume',
    label: 'Beyond the resume',
    colors: {
      primary: '#f97316',
      secondary: '#facc15',
      gradientColor1: '#f97316',
      gradientColor2: '#facc15',
    },
    content: <BeyondTheResumeSection />,
  },
  {
    id: 'work-with-me',
    label: "What it's like to work with me",
    colors: {
      primary: '#e11d48',
      secondary: '#8b5cf6',
      gradientColor1: '#e11d48',
      gradientColor2: '#8b5cf6',
    },
    content: <WorkWithMeSection />,
  },
] as const;

type AboutSection = (typeof sections)[number];

export default function AboutMePage() {
  const aboutMeTranslations = useTranslations('AboutMe');
  const [activeTab, setActiveTab] = useState<AboutSection>(sections[0]);
  const activePanelId = `${activeTab.id}-panel`;

  return (
    <main
      className={`${styles.page} ${brunoAce.className} ${sourceCodePro.variable}`}
      style={
        {
          '--mesh-primary': activeTab.colors.primary,
          '--mesh-secondary': activeTab.colors.secondary,
        } as CSSProperties
      }
    >
      <div className={styles.meshBackdrop} aria-hidden='true' />

      <section className={styles.panel}>
        <div className={styles.heroGrid}>
          <article className={styles.heroCard}>
            <span className={styles.cardLabel}>{aboutMeTranslations('soWhoAmI')}</span>
            <p className={styles.heroText}>
              {aboutMeTranslations('whoAmIDescription1')}
              <br />
              {aboutMeTranslations('whoAmIDescription2')}
            </p>
          </article>

          <aside className={styles.photoCard} aria-label='Photo carousel'>
            <StackedCarousel />
          </aside>
        </div>

        <div className={styles.tabs} role='tablist' aria-label='About me sections'>
          {sections.map((section) => {
            const isActive = section.id === activeTab.id;
            return (
              <button
                key={section.id}
                type='button'
                role='tab'
                id={`${section.id}-tab`}
                aria-selected={isActive}
                aria-controls={activePanelId}
                className={`${styles.tab} ${isActive ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(section)}
              >
                {section.label}
              </button>
            );
          })}
        </div>

        <article
          className={styles.contentCard}
          role='tabpanel'
          id={activePanelId}
          aria-labelledby={`${activeTab.id}-tab`}
          aria-live='polite'
        >
          {activeTab.content}
        </article>

        <section className={styles.ctaCard}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaHeading}>{aboutMeTranslations('cta.heading')}</h2>
            <p className={styles.ctaDescription}>{aboutMeTranslations('cta.description')}</p>
          </div>
          <ContactDialog
            trigger={
              <button
                className={styles.glitchButton}
                type='button'
                style={
                  {
                    '--gradient-color-1': activeTab.colors.gradientColor1,
                    '--gradient-color-2': activeTab.colors.gradientColor2,
                  } as CSSProperties
                }
              >
                {aboutMeTranslations('cta.button')}
                <Terminal size={20} />
              </button>
            }
            colors={activeTab.colors}
          />
        </section>
      </section>
    </main>
  );
}
