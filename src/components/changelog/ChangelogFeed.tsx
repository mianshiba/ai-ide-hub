import { ChangelogEntry } from '@/types/tool';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, TagIcon } from '@heroicons/react/24/outline';

interface ChangelogFeedProps {
  entries: ChangelogEntry[];
}

const ChangelogFeed = ({ entries }: ChangelogFeedProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'feature': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'improvement': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'bugfix': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'breaking': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'feature': return '新功能';
      case 'improvement': return '改进';
      case 'bugfix': return '修复';
      case 'breaking': return '重大变更';
      default: return type;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">最新更新</h2>
        <Badge variant="outline">实时更新</Badge>
      </div>
      
      <div className="space-y-4">
        {entries.map((entry) => (
          <Card key={entry.id} className="gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Badge className={getTypeColor(entry.type)}>
                    {getTypeText(entry.type)}
                  </Badge>
                  <Badge variant="outline">
                    <TagIcon className="h-3 w-3 mr-1" />
                    {entry.version}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {new Date(entry.date).toLocaleDateString('zh-CN')}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                {entry.title}
              </h3>
              
              <p className="text-muted-foreground text-sm leading-relaxed">
                {entry.description}
              </p>
              
              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    来自工具: {entry.toolId}
                  </span>
                  <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
                    查看详情 →
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChangelogFeed;