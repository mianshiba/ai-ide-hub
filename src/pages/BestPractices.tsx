import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/layout/Header';
import { articles, articleCategories } from '@/data/articles';
import ArticleCard from '@/components/articles/ArticleCard';
import CategoryFilter from '@/components/articles/CategoryFilter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const BestPractices = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    let filtered = articles;

    // 按分类筛选
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // 按搜索关键词筛选
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // 精选文章排在前面
    return filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });
  }, [selectedCategory, searchQuery]);

  const featuredArticles = articles.filter(article => article.featured);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>最佳实践 - AI IDE工具实战指南与开发技巧</title>
          <meta 
            name="description" 
            content="探索AI开发工具的最佳实践，包括GitHub Copilot使用技巧、代码审查流程、调试方法和性能优化策略。提升开发效率的实战指南。" 
          />
          <meta name="keywords" content="AI开发最佳实践,GitHub Copilot技巧,代码审查,调试方法,性能优化,开发效率" />
          <link rel="canonical" href="https://your-domain.com/best-practices" />
        </Helmet>
        
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              AI开发最佳实践
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              探索AI工具在实际开发中的最佳实践，掌握提升效率的核心技巧和方法论
            </p>
          </section>

          {/* Featured Articles */}
          {featuredArticles.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">精选文章</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>
          )}

          {/* Search and Filter */}
          <section className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索文章标题、描述或标签..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <CategoryFilter
              categories={articleCategories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </section>

          {/* Articles Grid */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">
                {selectedCategory === 'all' ? '全部文章' : 
                 articleCategories.find(cat => cat.id === selectedCategory)?.name || '文章列表'}
              </h2>
              <span className="text-sm text-muted-foreground">
                共 {filteredArticles.length} 篇文章
              </span>
            </div>

            {filteredArticles.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? '没有找到匹配的文章' : '暂无文章'}
                </p>
                {searchQuery && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                  >
                    清除筛选条件
                  </Button>
                )}
              </div>
            )}
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t mt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-muted-foreground">
              <p>&copy; 2024 AI IDE工具最佳实践. 专注于AI驱动的开发效率提升.</p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default BestPractices;