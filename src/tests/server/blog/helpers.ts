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
