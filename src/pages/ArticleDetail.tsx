import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ThemeProvider } from 'next-themes';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { articles } from '@/data/articles';
import { useToast } from '@/hooks/use-toast';

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const article = articles.find(a => a.id === id);

  if (!article) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold mb-4">文章未找到</h1>
              <p className="text-muted-foreground mb-6">抱歉，您要查找的文章不存在。</p>
              <Button onClick={() => navigate('/best-practices')}>
                返回文章列表
              </Button>
            </div>
          </main>
        </div>
      </ThemeProvider>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled sharing
      }
    } else {
      // Fallback to copying to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "链接已复制",
          description: "文章链接已复制到剪贴板",
        });
      } catch (err) {
        toast({
          title: "复制失败",
          description: "无法复制链接到剪贴板",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>{article.title} - AI IDE工具最佳实践</title>
          <meta name="description" content={article.description} />
          <meta name="keywords" content={article.tags.join(', ')} />
          <meta name="author" content={article.author} />
          <meta property="og:title" content={article.title} />
          <meta property="og:description" content={article.description} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={window.location.href} />
          <meta property="article:author" content={article.author} />
          <meta property="article:published_time" content={article.publishDate} />
          <meta property="article:tag" content={article.tags.join(', ')} />
          <link rel="canonical" href={window.location.href} />
        </Helmet>
        
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/best-practices')}
            className="mb-6 -ml-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回文章列表
          </Button>

          {/* Article Header */}
          <article className="max-w-4xl mx-auto">
            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
                {article.featured && (
                  <Badge variant="default">精选文章</Badge>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {article.title}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-6">
                {article.description}
              </p>
              
              <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{article.publishDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  分享
                </Button>
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: article.content
                    .split('\n')
                    .map(line => {
                      // 处理标题
                      if (line.startsWith('# ')) {
                        return `<h1 class="text-3xl font-bold mt-8 mb-4">${line.substring(2)}</h1>`;
                      }
                      if (line.startsWith('## ')) {
                        return `<h2 class="text-2xl font-semibold mt-6 mb-3">${line.substring(3)}</h2>`;
                      }
                      if (line.startsWith('### ')) {
                        return `<h3 class="text-xl font-medium mt-4 mb-2">${line.substring(4)}</h3>`;
                      }
                      
                      // 处理代码块
                      if (line.startsWith('```')) {
                        const language = line.substring(3);
                        return language ? 
                          `<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-4"><code class="language-${language}">` :
                          `</code></pre>`;
                      }
                      
                      // 处理列表项
                      if (line.startsWith('- ')) {
                        return `<li class="ml-4">${line.substring(2)}</li>`;
                      }
                      
                      // 处理段落
                      if (line.trim() === '') {
                        return '<br />';
                      }
                      
                      return `<p class="mb-4">${line}</p>`;
                    })
                    .join('')
                }}
              />
            </div>

            {/* Article Footer */}
            <footer className="mt-12 pt-8 border-t">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-muted-foreground">标签：</span>
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  分享文章
                </Button>
              </div>
            </footer>
          </article>

          {/* Related Articles */}
          <section className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">相关文章</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {articles
                .filter(a => 
                  a.id !== article.id && 
                  (a.category === article.category || 
                   a.tags.some(tag => article.tags.includes(tag)))
                )
                .slice(0, 4)
                .map((relatedArticle) => (
                  <div 
                    key={relatedArticle.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => navigate(`/article/${relatedArticle.id}`)}
                  >
                    <h3 className="font-medium mb-2 line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {relatedArticle.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{relatedArticle.author}</span>
                      <span>{relatedArticle.readTime}</span>
                    </div>
                  </div>
                ))}
            </div>
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

export default ArticleDetail;