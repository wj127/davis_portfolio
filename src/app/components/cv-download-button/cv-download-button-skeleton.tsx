import React from 'react';
import styles from '@/app/components/cv-download-button/cv-download-button-skeleton.module.scss';

// Placeholder shown while the client-only CvDownloadButton streams in. Mirrors the
// button's fixed position and circular footprint so there is no layout shift once
// the real control mounts.
export const CvDownloadButtonSkeleton: React.FC = () => {
  return <div className={styles.skeleton} aria-hidden='true' />;
};
