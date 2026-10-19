import { getLatestPosts } from '@/features/blog/blog.data';
import { EmptyLatestPosts } from '@/features/blog/components/empty-latest-posts/empty-latest-posts';
import { LatestPosts } from '@/features/blog/components/latest-posts/latest-posts';
import styles from '@/features/blog/components/latest-posts-section/latest-posts-section.module.scss';

const latestPostPlaceholders = [
  'first-post',
  'second-post',
  'third-post',
  'fourth-post',
  'fifth-post',
  'sixth-post',
] as const;

export const LatestPostsSection = async () => {
  const latestPosts = await getLatestPosts();

  if (latestPosts.length === 0) {
    return <EmptyLatestPosts />;
  }

  return <LatestPosts posts={latestPosts} />;
};

export const LatestPostsSectionFallback = () => {
  return (
    <div className={styles.fallback} aria-hidden='true'>
      <div className={styles.heading}>
        <span className={styles.title} />
        <span className={styles.description} />
      </div>
      <ul className={styles.posts}>
        {latestPostPlaceholders.map((placeholder) => (
          <li key={placeholder} className={styles.post} />
        ))}
      </ul>
    </div>
  );
};
