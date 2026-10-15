import { z } from 'zod';

const sanityReferenceSchema = z.object({
  _type: z.literal('reference'),
  _ref: z.string().min(1),
});

const sanityImageCropSchema = z.object({
  bottom: z.number(),
  left: z.number(),
  right: z.number(),
  top: z.number(),
});

const sanityImageHotspotSchema = z.object({
  height: z.number(),
  width: z.number(),
  x: z.number(),
  y: z.number(),
});

const sanityImageSchema = z.object({
  _type: z.literal('image'),
  alt: z.string().optional(),
  asset: sanityReferenceSchema,
  crop: sanityImageCropSchema.optional(),
  hotspot: sanityImageHotspotSchema.optional(),
});

const portableTextSpanSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal('span'),
  marks: z.array(z.string()).optional(),
  text: z.string(),
});

const portableTextLinkSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal('link'),
  href: z.url().optional(),
});

const portableTextBlockSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal('block'),
  children: z.array(portableTextSpanSchema),
  level: z.number().int().positive().optional(),
  listItem: z.enum(['bullet', 'number']).optional(),
  markDefs: z.array(portableTextLinkSchema).optional(),
  style: z.enum(['normal', 'h1', 'h2', 'h3', 'h4', 'blockquote']),
});

const portableTextImageSchema = sanityImageSchema.extend({
  _key: z.string().min(1),
});

const portableTextCodeSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal('code'),
  code: z.string().optional(),
  filename: z.string().optional(),
  highlightedLines: z.array(z.number().int()).optional(),
  language: z.string().optional(),
});

const postBodySchema = z
  .array(z.discriminatedUnion('_type', [portableTextBlockSchema, portableTextImageSchema, portableTextCodeSchema]))
  .min(1, { message: 'Post body is required' });

const postAudioSchema = z.object({
  _type: z.literal('file'),
  asset: sanityReferenceSchema,
});

export const PostSchema = z.object({
  _id: z.string(),
  _type: z.literal('post'),
  title: z.string().min(1, { message: 'Post title is required' }),
  slug: z.string().min(1, { message: 'Post slug is required' }),
  // Studio warns past 200 characters. That limit is not a publish error.
  excerpt: z.string().min(1, { message: 'Post excerpt is required' }),
  estimatedReadingTime: z.number().min(1).max(60),
  primaryCategory: z.object({
    _type: z.literal('reference'),
    _ref: z.string().min(1, { message: 'Primary category is required' }),
  }),
  coverImage: sanityImageSchema,
  publishedAt: z.iso.datetime({ offset: true, error: 'Published at must be a datetime' }),
  body: postBodySchema,
  audio: postAudioSchema.nullish(),
  youtubeUrl: z.url('YouTube URL must be a valid URL').nullish(),
});

export type Post = z.infer<typeof PostSchema>;
