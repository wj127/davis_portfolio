import { z } from 'zod';

export const CategorySchema = z.object({
  _id: z.string(),
  title: z.string().min(1, { message: 'Category title is required' }),
  slug: z.string().min(1, { message: 'Category slug is required' }),
  description: z.string().optional(),
  image: z
    .object({
      _type: z.literal('image'),
      alt: z.string().optional(),
      asset: z.object({
        _type: z.literal('reference'),
        _ref: z.string(),
      }),
      caption: z.string().optional(),
      crop: z
        .object({
          bottom: z.number(),
          left: z.number(),
          right: z.number(),
          top: z.number(),
        })
        .optional(),
      hotspot: z
        .object({
          width: z.number(),
          height: z.number(),
          x: z.number(),
          y: z.number(),
        })
        .optional(),
    })
    .optional(),
  postCount: z.number().min(0, { message: 'Category post count must be greater than or equal to 0' }),
});

export type Category = z.infer<typeof CategorySchema>;

export type CategoryCover = {
  url: string;
  alt?: string;
};

export type BlogCategory = Omit<Category, 'image'> & {
  image?: CategoryCover;
};
