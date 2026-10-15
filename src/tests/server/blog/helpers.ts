import { subDays } from 'date-fns';

class InMemoryClient {
  private data: Record<string, unknown> = {};

  public async fetch(query: string) {
    return this.data[query] || [];
  }

  public setData(query: string, data: unknown) {
    this.data[query] = data;
  }

  public clearData() {
    this.data = {};
  }
}

export const inMemoryClient = new InMemoryClient();

export const CATEGORIES = [
  {
    _id: '1',
    title: 'Category 1',
    slug: 'category-1',
    postCount: 10,
  },
  {
    _id: '2',
    title: 'Category 2',
    slug: 'category-2',
    postCount: 20,
  },
];

export const CATEGORY_WITH_COVER = {
  _id: '3',
  title: 'Software Engineering',
  slug: 'software-engineering',
  postCount: 8,
  image: {
    _type: 'image',
    alt: 'laptop with code and essential technologies',
    asset: {
      _type: 'reference',
      _ref: 'image-3fd05d274208d27feba85b3c85deb54bd27a87f1-1672x941-png',
    },
  },
};

export const LATEST_POSTS = [
  {
    _id: '4',
    title: 'Post 4',
    slug: 'post-4',
    publishedAt: new Date('2026-01-01').toISOString(),
    primaryCategory: {
      _id: '1',
      title: 'Category 1',
      slug: 'category-1',
    },
    estimatedReadingTime: 5,
  },
  {
    _id: '5',
    title: 'Post 5',
    slug: 'post-5',
    publishedAt: new Date('2026-01-02').toISOString(),
    primaryCategory: {
      _id: '2',
      title: 'Category 2',
      slug: 'category-2',
    },
    estimatedReadingTime: 10,
  },
];

export const createPosts = (posts: typeof LATEST_POSTS, numberOfPosts: number) => {
  for (let i = 0; i < numberOfPosts; i++) {
    posts.push({
      _id: `${i + 1}`,
      title: `Post ${i + 1}`,
      slug: `post-${i + 1}`,
      publishedAt: subDays(new Date(), i).toISOString(),
      primaryCategory: {
        _id: `${i + 1}`,
        title: `Category ${i + 1}`,
        slug: `category-${i + 1}`,
      },
      estimatedReadingTime: Math.floor(Math.random() * 10) + 1,
    });
  }
  return posts;
};
