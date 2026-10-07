import { z } from 'zod';

export const CategoryScehma = z.object({
  name: z.string().min(1, { message: 'Category name is required' }),
  slug: z.string().min(1, { message: 'Category slug is required' }),
  description: z.string().optional(),
  image: z
    .object({
      url: z.string().url({ message: 'Image URL must be a valid URL' }),
      altText: z.string().optional(),
    })
    .optional(),
});
