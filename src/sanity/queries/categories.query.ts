import { defineQuery } from 'next-sanity';

export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] | order(postCount desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    image,
    "postCount": count(*[_type == "post" && primaryCategory._ref == ^._id])
  }
`);
