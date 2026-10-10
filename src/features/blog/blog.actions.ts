'use cache';

import { client } from '@/sanity/client';
import { CATEGORIES_QUERY } from '@/sanity/queries/categories.query';
import { Category, CategorySchema } from '@/features/blog/contracts/categories';
import { cacheLife } from 'next/cache';
import { toSeconds } from 'duration-fns';

export const getCategories = async () => {
  cacheLife({
    stale: toSeconds({ minutes: 30 }),
    revalidate: toSeconds({ days: 1 }),
    expire: toSeconds({ days: 3 }),
  });
  const categories = await client.fetch<Category[]>(CATEGORIES_QUERY);
  return CategorySchema.array().parse(categories);
};
