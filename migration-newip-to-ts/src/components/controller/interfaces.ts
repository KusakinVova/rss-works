import { Source, Article } from './types';

export interface INews {
  articles: Article;
  status: string;
  totalResults: number;
}

export interface ISources {
  status: string;
  sources?: Source;
}

export type ICallback<I> = (data?: I) => void;
