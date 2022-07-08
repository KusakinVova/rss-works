export type Article = [
  {
    title: string;
    description: string;
    author: string;
    content: string;
    publishedAt: string;
    url: string;
    urlToImage: string;
    source: {
      id: string;
      name: string;
    };
  }
];

export type Source = [
  {
    id: string;
    name: string;
    description: string;
    category: string;
    country: string;
    language: string;
    url: string;
  }
];
