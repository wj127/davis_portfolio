'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import styles from '@/app/work-experience/components/company-narrative/CompanyNarrative.module.scss';
import { WorkContentBlock } from '@/app/work-experience/types';
import { CompanyNarrativeProps } from '@/app/work-experience/components/company-narrative/CompanyNarrative.types';

const renderContentBlock = (contentBlock: WorkContentBlock, blockIndex: number) => {
  switch (contentBlock.type) {
    case 'paragraph':
      return (
        <p key={blockIndex} className={styles.paragraph}>
          {contentBlock.text}
        </p>
      );
    case 'list':
      return (
        <div key={blockIndex} className={styles.listGroup}>
          {contentBlock.heading ? <p className={styles.listHeading}>{contentBlock.heading}</p> : null}
          <ul className={styles.list}>
            {contentBlock.items.map((item, itemIndex) => (
              <li key={itemIndex} className={styles.listItem}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      );
    default:
      return null;
  }
};

export const CompanyNarrative: React.FC<CompanyNarrativeProps> = ({ companyKey }) => {
  const translations = useTranslations('WorkExperience');
  const companyPath = `companies.${companyKey}`;

  const role = translations(`${companyPath}.role`);
  const tldr = translations(`${companyPath}.tldr`);
  const contentBlocks = translations.raw(`${companyPath}.content`) as WorkContentBlock[];

  const note = contentBlocks.find((contentBlock) => contentBlock.type === 'note');
  const bodyBlocks = contentBlocks.filter((contentBlock) => contentBlock.type !== 'note');

  return (
    <article className={styles.narrative}>
      <header className={styles.heading}>
        <h2 className={styles.title}>{translations(`${companyPath}.title`)}</h2>
        {role ? <p className={styles.role}>{role}</p> : null}
      </header>

      <section className={styles.tldr}>
        <h3 className={styles.tldrLabel}>{translations('tldrLabel')}</h3>
        <p className={styles.tldrText}>{tldr}</p>
      </section>

      <div className={styles.content}>{bodyBlocks.map(renderContentBlock)}</div>

      {note && note.type === 'note' ? (
        <aside className={styles.note}>
          <span className={styles.noteLabel}>{translations('noteLabel')}</span>
          <p className={styles.noteText}>{note.text}</p>
        </aside>
      ) : null}
    </article>
  );
};
