import { defineQuery } from 'next-sanity';

export const LATEST_POSTS_QUERY = defineQuery(`
  *[_type == "post"] | order(publishedAt desc)[0..9] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    primaryCategory->{
      _id,
      title,
      "slug": slug.current,
    },
    estimatedReadingTime,
  }
`);
