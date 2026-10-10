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
