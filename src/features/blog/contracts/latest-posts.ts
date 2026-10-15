import { PostSchema } from '@/features/blog/contracts/posts';
import { z } from 'zod';

export const LatestPostsSchema = PostSchema.pick({
  _id: true,
  title: true,
  slug: true,
  publishedAt: true,
  estimatedReadingTime: true,
}).extend({
  primaryCategory: z.object({
    _id: z.string(),
    title: z.string(),
    slug: z.string(),
  }),
});

export type LatestPosts = z.infer<typeof LatestPostsSchema>;
