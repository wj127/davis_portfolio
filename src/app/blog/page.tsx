import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { getCategories } from '@/features/blog/blog.data';
import { CategoryCard } from '@/features/blog/components/category-card/category-card';
import { LagoonGlassBackground } from '@/features/blog/components/lagoon-glass-background/lagoon-glass-background';
import {
  LatestPostsSection,
  LatestPostsSectionFallback,
} from '@/features/blog/components/latest-posts-section/latest-posts-section';
import styles from '@/app/blog/blog.module.scss';

export default async function BlogPage() {
  const [blogTranslations, categories] = await Promise.all([getTranslations('Blog'), getCategories()]);

  return (
    <div className={styles.page}>
      <LagoonGlassBackground />

      <div className={styles.content}>
        <header className={styles.hero}>
          <h1 className={styles.title}>{blogTranslations('title')}</h1>
          <p className={styles.lead}>{blogTranslations('description')}</p>
        </header>

        <section className={styles.section} aria-labelledby='blog-categories-heading'>
          <div className={styles.sectionHeading}>
            <h2 id='blog-categories-heading' className={styles.sectionTitle}>
              {blogTranslations('categories.title')}
            </h2>
            <p className={styles.sectionDescription}>{blogTranslations('categories.description')}</p>
          </div>

          <ul className={styles.categories}>
            {categories.map((category) => (
              <li key={category._id}>
                <CategoryCard category={category} />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby='latest-posts-heading'>
          <Suspense fallback={<LatestPostsSectionFallback />}>
            <LatestPostsSection />
          </Suspense>
        </section>
      </div>

      {/* <BlogFooter /> */}
    </div>
  );
}
