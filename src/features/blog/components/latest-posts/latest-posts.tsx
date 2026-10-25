import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import type { LatestPosts as LatestPost } from '@/features/blog/contracts/latest-posts';
import styles from '@/features/blog/components/latest-posts/latest-posts.module.scss';

type LatestPostsProps = {
  posts: LatestPost[];
};

export const LatestPosts = async ({ posts }: LatestPostsProps) => {
  const [latestPostsTranslations, locale] = await Promise.all([getTranslations('Blog.latestPosts'), getLocale()]);
  const publishedDateFormatter = new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <section className={styles.section} aria-labelledby='latest-posts-heading'>
      <div className={styles.heading}>
        <h2 id='latest-posts-heading' className={styles.headingTitle}>
          {latestPostsTranslations('title')}
        </h2>
        <p className={styles.headingDescription}>{latestPostsTranslations('description')}</p>
      </div>

      <ul className={styles.posts}>
        {posts.map((post) => {
          const titleId = `latest-post-${post._id}`;

          return (
            <li key={post._id}>
              <Link
                href={`/blog/${post.primaryCategory.slug}/${post.slug}`}
                className={styles.post}
                aria-labelledby={titleId}
              >
                <div className={styles.publication}>
                  <p>{publishedDateFormatter.format(new Date(post.publishedAt))}</p>
                  <p>{post.primaryCategory.title}</p>
                </div>
                <div className={styles.information}>
                  <h3 id={titleId} className={styles.title}>
                    {post.title}
                  </h3>
                  <p className={styles.readingTime}>
                    {latestPostsTranslations('readingTime', { minutes: post.estimatedReadingTime })}
                  </p>
                </div>
                <span className={styles.readPost}>
                  {latestPostsTranslations('readPost')}
                  <ArrowUpRight
                    className={styles.arrow}
                    size={18}
                    strokeWidth={1.6}
                    absoluteStrokeWidth
                    aria-hidden='true'
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
