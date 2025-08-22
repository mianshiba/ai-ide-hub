export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  url: string;
  pricing: 'free' | 'freemium' | 'paid';
  rating: number;
  logo: string;
  screenshots: string[];
  features: string[];
  lastUpdated: string;
  changelog?: ChangelogEntry[];
  featured?: boolean;
}

export interface ChangelogEntry {
  id: string;
  version: string;
  date: string;
  title: string;
  description: string;
  type: 'feature' | 'improvement' | 'bugfix' | 'breaking';
  toolId: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: string;
  tags: string[];
  category: string;
  readTime: number;
  featured?: boolean;
}