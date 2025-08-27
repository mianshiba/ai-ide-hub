import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/home/HeroSection';
import CategoryFilter from '@/components/tools/CategoryFilter';
import ToolCard from '@/components/tools/ToolCard';
import ChangelogFeed from '@/components/changelog/ChangelogFeed';
import { tools, categories, recentChangelogs } from '@/data/tools';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'updated'>('rating');
  const [bookmarkedTools, setBookmarkedTools] = useState<Set<string>>(new Set());

  const filteredAndSortedTools = useMemo(() => {
    let filtered = tools;
    
    if (selectedCategory) {
      filtered = tools.filter(tool => tool.category === selectedCategory);
    }
    
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'updated':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        default:
          return 0;
      }
    });
  }, [selectedCategory, sortBy]);

  const handleBookmark = (toolId: string) => {
    const newBookmarks = new Set(bookmarkedTools);
    if (newBookmarks.has(toolId)) {
      newBookmarks.delete(toolId);
    } else {
      newBookmarks.add(toolId);
    }
    setBookmarkedTools(newBookmarks);
  };

  const featuredTools = tools.filter(tool => tool.featured);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
          <Helmet>
            <title>AI IDE Tools - 最佳AI开发工具集合与实践指南</title>
            <meta 
              name="description" 
              content="发现并比较最新的AI IDE工具，包括GitHub Copilot、Cursor、Tabnine等。获取最佳实践指南、更新日志和详细评测。" 
            />
            <meta name="keywords" content="AI IDE, 代码补全, GitHub Copilot, Cursor, 开发工具, 编程助手, 最佳实践" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="canonical" href="https://ai-ide-tools.com" />
            
            {/* Open Graph */}
            <meta property="og:title" content="AI IDE Tools - 最佳AI开发工具集合" />
            <meta property="og:description" content="发现并比较最新的AI IDE工具，获取最佳实践指南和详细评测" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://ai-ide-tools.com" />
            
            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="AI IDE Tools - 最佳AI开发工具集合" />
            <meta name="twitter:description" content="发现并比较最新的AI IDE工具，获取最佳实践指南和详细评测" />
            
            {/* Structured Data */}
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "AI IDE Tools",
                "description": "最佳AI开发工具集合与实践指南",
                "url": "https://ai-ide-tools.com",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://ai-ide-tools.com/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              })}
            </script>
          </Helmet>

          <Header />
          
          <main>
            <HeroSection />
            
            {/* Featured Tools Section */}
            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">精选推荐</h2>
                  <p className="text-muted-foreground">编辑精选的顶级AI开发工具</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      onBookmark={handleBookmark}
                      isBookmarked={bookmarkedTools.has(tool.id)}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Main Content */}
            <section className="py-16">
              <div className="container mx-auto px-4">
                <Tabs defaultValue="tools" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="tools">工具导航</TabsTrigger>
                    <TabsTrigger value="changelog">更新日志</TabsTrigger>
                    <TabsTrigger value="articles">最佳实践</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="tools" className="mt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                      {/* Sidebar */}
                      <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                          <CategoryFilter
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                          />
                          
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold">排序方式</h3>
                            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="rating">按评分排序</SelectItem>
                                <SelectItem value="name">按名称排序</SelectItem>
                                <SelectItem value="updated">按更新时间</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      
                      {/* Main Content */}
                      <div className="lg:col-span-3">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-2xl font-bold">
                            {selectedCategory 
                              ? categories.find(c => c.id === selectedCategory)?.name 
                              : '全部工具'
                            }
                          </h2>
                          <p className="text-muted-foreground">
                            共 {filteredAndSortedTools.length} 个工具
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {filteredAndSortedTools.map((tool) => (
                            <ToolCard
                              key={tool.id}
                              tool={tool}
                              onBookmark={handleBookmark}
                              isBookmarked={bookmarkedTools.has(tool.id)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="changelog" className="mt-8">
                    <div className="max-w-4xl mx-auto">
                      <ChangelogFeed entries={recentChangelogs} />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="articles" className="mt-8">
                    <div className="text-center py-16">
                      <h3 className="text-2xl font-bold mb-4">最佳实践文章</h3>
                      <p className="text-muted-foreground mb-8">深度技术文章和使用指南即将上线</p>
                      <Button>敬请期待</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="bg-muted/30 py-12 mt-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                      <span className="text-sm font-bold text-white">AI</span>
                    </div>
                    <span className="font-bold">AI IDE Tools</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    最全面的AI开发工具资源库，助力开发者选择最佳工具。
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold">工具分类</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="#" className="hover:text-foreground transition-smooth">代码补全</a></li>
                    <li><a href="#" className="hover:text-foreground transition-smooth">对话编程</a></li>
                    <li><a href="#" className="hover:text-foreground transition-smooth">代码审查</a></li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold">资源</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="#" className="hover:text-foreground transition-smooth">最佳实践</a></li>
                    <li><a href="#" className="hover:text-foreground transition-smooth">更新日志</a></li>
                    <li><a href="#" className="hover:text-foreground transition-smooth">工具对比</a></li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold">关于</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="#" className="hover:text-foreground transition-smooth">关于我们</a></li>
                    <li><a href="#" className="hover:text-foreground transition-smooth">联系我们</a></li>
                    <li><a href="#" className="hover:text-foreground transition-smooth">RSS订阅</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
                <p>&copy; 2024 AI IDE Tools. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </ThemeProvider>
  );
};

export default Index;
