import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  MagnifyingGlassIcon, 
  Bars3Icon,
  MoonIcon,
  SunIcon,
  BookmarkIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navigation = [
    { name: '工具导航', href: '#tools' },
    { name: '更新日志', href: '#changelog' },
    { name: '最佳实践', href: '#articles' },
    { name: '对比分析', href: '#compare' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <span className="text-lg font-bold text-white">AI</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold">AI IDE Tools</h1>
              <p className="text-xs text-muted-foreground">最佳开发工具集合</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hidden sm:flex"
            >
              <MagnifyingGlassIcon className="h-4 w-4" />
              <span className="ml-2 text-sm text-muted-foreground">搜索工具...</span>
              <kbd className="ml-2 hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <SunIcon className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">切换主题</span>
            </Button>

            {/* Bookmarks */}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <BookmarkIcon className="h-4 w-4" />
            </Button>

            {/* Stats */}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <ChartBarIcon className="h-4 w-4" />
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Bars3Icon className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="mt-6 space-y-4">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="搜索工具..." className="pl-9" />
                  </div>
                  <nav className="space-y-2">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-smooth"
                      >
                        {item.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar (Expanded) */}
        {isSearchOpen && (
          <div className="border-t py-4">
            <div className="relative max-w-md mx-auto">
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="搜索 AI IDE 工具..." 
                className="pl-9"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;