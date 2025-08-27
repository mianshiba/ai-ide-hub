export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
}

export interface ArticleCategory {
  id: string;
  name: string;
  description: string;
}