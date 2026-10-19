'use cache';

import { client } from '@/sanity/client';
import { urlForImage } from '@/sanity/image';
import { CATEGORIES_QUERY } from '@/sanity/queries/categories.query';
import { BlogCategory, Category, CategorySchema } from '@/features/blog/contracts/categories';
import { cacheLife } from 'next/cache';
import { toSeconds } from 'duration-fns';
import { LatestPosts, LatestPostsSchema } from '@/features/blog/contracts/latest-posts';
import { LATEST_POSTS_QUERY } from '@/sanity/queries/latest-posts.query';

export const getCategories = async () => {
  cacheLife({
    stale: toSeconds({ hours: 12 }),
    revalidate: toSeconds({ days: 3 }),
    expire: toSeconds({ days: 7 }),
  });
  const categories = await client.fetch<Category[]>(CATEGORIES_QUERY);
  return CategorySchema.array()
    .parse(categories)
    .map(({ image, ...category }) => ({
      ...category,
      image: image && {
        url: urlForImage(image).width(720).height(320).fit('crop').auto('format').url(),
        alt: image.alt,
      },
    })) satisfies BlogCategory[];
};

export const getLatestPosts = async () => {
  cacheLife({
    stale: toSeconds({ minutes: 15 }),
    revalidate: toSeconds({ hours: 6 }),
    expire: toSeconds({ days: 2 }),
  });
  const latestPosts = await client.fetch<LatestPosts[]>(LATEST_POSTS_QUERY);
  return LatestPostsSchema.array().parse(latestPosts.slice(0, 10));
};
