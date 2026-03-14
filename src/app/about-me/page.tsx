'use client';

import type { CSSProperties } from 'react';
import { useState } from 'react';
import { Bruno_Ace_SC, Source_Code_Pro } from 'next/font/google';
import styles from '@/app/about-me/about-me.module.scss';

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
    },
    content: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer feugiat, metus et feugiat dapibus, libero mauris tincidunt nibh, ac vulputate ipsum ipsum et nisi. Donec sed nulla mattis, viverra elit vel, aliquet eros.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur mattis, neque sed auctor congue, augue mauris laoreet sapien, vitae ultricies lorem mauris sit amet sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo, augue non luctus vulputate, arcu augue porttitor lectus, et tincidunt ipsum dui a risus. Vivamus pharetra semper tortor, sit amet suscipit magna tempus a.',
    ],
  },
  {
    id: 'what-im-good-at',
    label: "What I'm good at",
    colors: {
      primary: '#1f9d55',
      secondary: '#f4b942',
    },
    content: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Aliquam feugiat enim sed nisl blandit, a volutpat tortor tincidunt. Integer et nibh et lacus molestie feugiat quis non neque.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt augue vitae mauris suscipit, sit amet posuere lectus dictum. Praesent sit amet magna sed turpis aliquet tempus quis a lorem.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget quam pulvinar, hendrerit justo non, gravida augue. Suspendisse in turpis gravida, ultricies urna eu, egestas ipsum.',
    ],
  },
  {
    id: 'beyond-the-resume',
    label: 'Beyond the resume',
    colors: {
      primary: '#f97316',
      secondary: '#facc15',
    },
    content: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum malesuada augue vel diam tempor, eu vulputate justo faucibus. Vivamus at libero lacinia, porttitor nulla id, dictum lacus.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque luctus massa a diam semper, id placerat est ultrices. Integer ac lacus non tellus ultrices volutpat vel vel tortor.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis lorem scelerisque, rhoncus risus ut, elementum augue. Donec vulputate odio vel felis fermentum, vel tempor ligula consequat.',
    ],
  },
  {
    id: 'work-with-me',
    label: "What it's like to work with me",
    colors: {
      primary: '#e11d48',
      secondary: '#8b5cf6',
    },
    content: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi volutpat sapien vel velit convallis, a pretium dolor egestas. Cras sit amet lacus vitae libero posuere tincidunt sed vitae nibh.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus turpis non augue feugiat, a bibendum ex luctus. Integer ullamcorper tortor sed lectus vulputate, non vulputate magna posuere.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consequat, magna et lobortis sagittis, erat orci gravida velit, at malesuada nisl neque quis lectus.',
    ],
  },
] as const;

type AboutSection = (typeof sections)[number];

export default function AboutMePage() {
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
            <span className={styles.cardLabel}>So who am I?</span>
            <p className={styles.heroText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris gravida, sapien ac malesuada auctor, augue
              arcu dignissim turpis, sed semper libero ipsum eget dolor.
            </p>
          </article>

          <aside className={styles.photoCard} aria-label='Stacked photo placeholder'>
            <div className={styles.photoStack}>
              <div className={styles.photoPlate} />
              <div className={styles.photoPlate} />
              <div className={styles.photoPlaceholder}>Stacked Photo Placeholder</div>
            </div>
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
          {activeTab.content.map((paragraph, index) => (
            <p key={`${activeTab.id}-${index}`}>{paragraph}</p>
          ))}
        </article>

        <section className={styles.ctaCard}>
          <span className={styles.cardLabel}>CTA</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac massa non mauris tempus luctus sed sit
            amet urna.
          </p>
        </section>
      </section>
    </main>
  );
}
