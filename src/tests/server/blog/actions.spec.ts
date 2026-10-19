import {
  inMemoryClient,
  CATEGORIES,
  CATEGORY_WITH_COVER,
  LATEST_POSTS,
  createPosts,
} from '@/tests/server/blog/helpers';
import { getCategories, getLatestPosts } from '@/features/blog/blog.data';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CATEGORIES_QUERY } from '@/sanity/queries/categories.query';
import { ZodError } from 'zod';
import { LATEST_POSTS_QUERY } from '@/sanity/queries/latest-posts.query';

vi.mock('@/sanity/client', () => ({
  client: inMemoryClient,
  projectId: 'some-project-id',
  dataset: 'production',
  apiVersion: '2026-05-15',
}));

vi.mock('next/cache');

describe('Blog Actions', () => {
  beforeEach(() => {
    inMemoryClient.clearData();
  });

  describe('getCategories', () => {
    it("should return a bunch of categories from Sanity's data lake", async () => {
      // Given
      inMemoryClient.setData(CATEGORIES_QUERY, CATEGORIES);

      // When
      const categories = await getCategories();

      // Then
      expect(categories).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            _id: expect.any(String),
            title: expect.any(String),
            slug: expect.any(String),
            postCount: expect.any(Number),
          }),
        ]),
      );
    });

    it('should return an empty array if there are no categories', async () => {
      // Given
      inMemoryClient.setData(CATEGORIES_QUERY, []);

      // When
      const categories = await getCategories();

      // Then
      expect(categories).toEqual([]);
    });

    it("should resolve the category cover into an image served from Sanity's CDN", async () => {
      // Given
      inMemoryClient.setData(CATEGORIES_QUERY, [CATEGORY_WITH_COVER]);

      // When
      const [category] = await getCategories();

      // Then
      expect(category.image?.url).toMatch(
        /^https:\/\/cdn\.sanity\.io\/images\/some-project-id\/production\/3fd05d274208d27feba85b3c85deb54bd27a87f1-1672x941\.png/,
      );
    });

    it('should deliver the category cover cropped to the card proportions in the best format for the browser', async () => {
      // Given
      inMemoryClient.setData(CATEGORIES_QUERY, [CATEGORY_WITH_COVER]);

      // When
      const [category] = await getCategories();

      // Then
      const coverParams = new URL(category.image?.url ?? '').searchParams;
      expect(coverParams.get('w')).toBe('720');
      expect(coverParams.get('h')).toBe('320');
      expect(coverParams.get('fit')).toBe('crop');
      expect(coverParams.get('auto')).toBe('format');
    });

    it('should keep the category cover within the crop set in Sanity Studio', async () => {
      // Given
      inMemoryClient.setData(CATEGORIES_QUERY, [
        {
          ...CATEGORY_WITH_COVER,
          image: {
            ...CATEGORY_WITH_COVER.image,
            crop: { top: 0.1, bottom: 0.1, left: 0.1, right: 0.1 },
          },
        },
      ]);

      // When
      const [category] = await getCategories();

      // Then
      const rect = new URL(category.image?.url ?? '').searchParams.get('rect');
      expect(rect).not.toBeNull();
      const [left, top, width, height] = (rect ?? '').split(',').map(Number);
      expect(left).toBeGreaterThanOrEqual(167);
      expect(top).toBeGreaterThanOrEqual(94);
      expect(left + width).toBeLessThanOrEqual(1505);
      expect(top + height).toBeLessThanOrEqual(847);
    });

    it('should expose the alternative text of the category cover', async () => {
      // Given
      inMemoryClient.setData(CATEGORIES_QUERY, [CATEGORY_WITH_COVER]);

      // When
      const [category] = await getCategories();

      // Then
      expect(category.image?.alt).toBe('laptop with code and essential technologies');
    });

    it('should throw an error if the categories are not valid', async () => {
      // Given
      inMemoryClient.setData(CATEGORIES_QUERY, [
        {
          ...CATEGORIES[0],
          title: 123,
        },
      ]);

      // When
      const categories = getCategories();

      // Then
      await expect(categories).rejects.toThrow(ZodError);
      await expect(getCategories()).rejects.toMatchObject({
        issues: [
          {
            code: 'invalid_type',
            expected: 'string',
            path: [0, 'title'],
          },
        ],
      });
    });
  });

  describe('getLatestPosts', () => {
    it("should return the latest posts from Sanity's data lake", async () => {
      // Given
      inMemoryClient.setData(LATEST_POSTS_QUERY, LATEST_POSTS);

      // When
      const latestPosts = await getLatestPosts();

      // Then
      expect(latestPosts).toEqual(LATEST_POSTS);
    });

    it('should throw an error if the latest posts are not valid', async () => {
      // Given
      inMemoryClient.setData(LATEST_POSTS_QUERY, [{ ...LATEST_POSTS[0], estimatedReadingTime: 'not a number' }]);

      // When
      const latestPosts = getLatestPosts();

      // Then
      await expect(latestPosts).rejects.toThrow(ZodError);
      await expect(getLatestPosts()).rejects.toMatchObject({
        issues: [
          {
            code: 'invalid_type',
            expected: 'number',
            path: [0, 'estimatedReadingTime'],
          },
        ],
      });
    });

    it('should return no more than 10 posts', async () => {
      // Given
      inMemoryClient.setData(LATEST_POSTS_QUERY, createPosts(LATEST_POSTS, 11));

      // When
      const latestPosts = await getLatestPosts();

      // Then
      expect(latestPosts).toHaveLength(10);
    });

    it('should return an empty array if there are no latest posts', async () => {
      // Given
      inMemoryClient.setData(LATEST_POSTS_QUERY, []);

      // When
      const latestPosts = await getLatestPosts();

      // Then
      expect(latestPosts).toEqual([]);
    });
  });
});
