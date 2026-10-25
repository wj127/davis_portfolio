import Link from 'next/link';
import { ArrowUpRight, FilePenLine } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import styles from '@/features/blog/components/empty-latest-posts/empty-latest-posts.module.scss';

export const EmptyLatestPosts = async () => {
  const latestPostsTranslations = await getTranslations('Blog.latestPosts');

  return (
    <section className={styles.section} aria-labelledby='latest-posts-heading'>
      <div className={styles.heading}>
        <h2 id='latest-posts-heading' className={styles.headingTitle}>
          {latestPostsTranslations('title')}
        </h2>
        <p className={styles.headingDescription}>{latestPostsTranslations('emptyDescription')}</p>
      </div>

      <div className={styles.empty}>
        <div className={styles.iconFrame}>
          <FilePenLine className={styles.icon} size={24} strokeWidth={1.6} absoluteStrokeWidth aria-hidden='true' />
        </div>
        <div className={styles.message}>
          <p className={styles.emptyTitle}>{latestPostsTranslations('emptyTitle')}</p>
          <p className={styles.emptyBody}>{latestPostsTranslations('emptyBody')}</p>
        </div>
        <Link href='/about-me' className={styles.aboutLink}>
          {latestPostsTranslations('aboutMe')}
          <ArrowUpRight className={styles.arrow} size={18} strokeWidth={1.6} absoluteStrokeWidth aria-hidden='true' />
        </Link>
      </div>
    </section>
  );
};
