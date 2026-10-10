'use cache';

import { client } from '@/sanity/client';
import { urlForImage } from '@/sanity/image';
import { CATEGORIES_QUERY } from '@/sanity/queries/categories.query';
import { BlogCategory, Category, CategorySchema } from '@/features/blog/contracts/categories';
import { cacheLife } from 'next/cache';
import { toSeconds } from 'duration-fns';

export const getCategories = async (): Promise<BlogCategory[]> => {
  cacheLife({
    stale: toSeconds({ minutes: 30 }),
    revalidate: toSeconds({ days: 1 }),
    expire: toSeconds({ days: 3 }),
  });
  const categories = await client.fetch<Category[]>(CATEGORIES_QUERY);
  return CategorySchema.array()
    .parse(categories)
    .map(({ image, ...category }) => ({
      ...category,
      image: image && {
        url: urlForImage(image.asset).width(720).height(320).fit('crop').auto('format').url(),
        alt: image.alt,
      },
    }));
};
