import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { BlogCategory } from '@/features/blog/contracts/categories';
import styles from '@/features/blog/components/category-card/category-card.module.scss';

type CategoryCardProps = {
  category: BlogCategory;
};

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const blogTranslations = useTranslations('Blog');

  return (
    <article className={styles.card}>
      {category.image && (
        <div className={styles.cover}>
          <Image
            src={category.image.url}
            alt={category.image.alt ?? ''}
            fill
            unoptimized
            className={styles.coverImage}
          />
        </div>
      )}
      <div className={styles.content}>
        <h3 className={styles.title}>
          <Link href={`/blog/${category.slug}`} className={styles.link}>
            {category.title}
          </Link>
        </h3>
        {category.description && <p className={styles.description}>{category.description}</p>}
        <div className={styles.footer}>
          <p className={styles.postCount}>
            {blogTranslations('postCount', {
              count: category.postCount,
              formattedCount: String(category.postCount).padStart(2, '0'),
            })}
          </p>
          <ArrowRight className={styles.arrow} size={18} strokeWidth={1.6} absoluteStrokeWidth aria-hidden='true' />
        </div>
      </div>
    </article>
  );
};
