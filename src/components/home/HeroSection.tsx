import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon, SparklesIcon } from '@heroicons/react/24/outline';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-primary opacity-5"></div>
      
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-6">
            <SparklesIcon className="h-4 w-4 mr-2 text-primary" />
            发现最新的 AI 开发工具
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="gradient-primary bg-clip-text text-transparent">
              AI IDE 工具
            </span>
            <br />
            最佳实践集合地
          </h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            汇聚最新最全的 AI 开发工具，提供详细评测、更新日志和最佳实践。
            助您选择最适合的开发伙伴，提升编程效率。
          </p>

          {/* Search bar */}
          <div className="max-w-lg mx-auto mb-8">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="搜索 AI 编程工具、VS Code 扩展..." 
                className="pl-12 h-12 text-base shadow-soft border-2 border-transparent focus:border-primary"
              />
              <Button 
                size="sm" 
                className="absolute right-2 top-2 gradient-primary border-0"
              >
                搜索
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-foreground">50+</div>
              <div className="text-sm text-muted-foreground">精选工具</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">6</div>
              <div className="text-sm text-muted-foreground">工具分类</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">周更新</div>
              <div className="text-sm text-muted-foreground">内容频率</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">100%</div>
              <div className="text-sm text-muted-foreground">免费使用</div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button size="lg" className="gradient-primary border-0 shadow-medium">
              浏览全部工具
            </Button>
            <Button size="lg" variant="outline" className="shadow-soft">
              查看最佳实践
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;