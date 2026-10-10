import { inMemoryClient, CATEGORIES } from '@/tests/server/blog/helpers';
import { getCategories } from '@/features/blog/blog.actions';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CATEGORIES_QUERY } from '@/sanity/queries/categories.query';
import { ZodError } from 'zod';

vi.mock('@/sanity/client', () => ({
  client: inMemoryClient,
}));

vi.mock('next/cache');

describe('Blog Actions', () => {
  describe('getCategories', () => {
    beforeEach(() => {
      inMemoryClient.clearData();
    });

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
});
