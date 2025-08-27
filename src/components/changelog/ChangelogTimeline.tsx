import React from 'react';
import { ChangelogEntry, Tool } from '@/types/tool';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, TagIcon, ClockIcon } from '@heroicons/react/24/outline';

interface ChangelogTimelineProps {
  entries: ChangelogEntry[];
  selectedTool?: Tool;
}

const ChangelogTimeline = ({ entries, selectedTool }: ChangelogTimelineProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'feature': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300';
      case 'improvement': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'bugfix': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300';
      case 'breaking': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'feature': return '✨';
      case 'improvement': return '⚡';
      case 'bugfix': return '🐛';
      case 'breaking': return '💥';
      default: return '📝';
    }
  };

  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <ClockIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">
          暂无更新记录
        </h3>
        <p className="text-muted-foreground">
          {selectedTool ? `${selectedTool.name} 还没有发布任何更新。` : '选择一个工具查看其更新历史。'}
        </p>
      </div>
    );
  }

  // 按日期分组
  const groupedEntries = entries.reduce((groups, entry) => {
    const date = new Date(entry.date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(entry);
    return groups;
  }, {} as Record<string, ChangelogEntry[]>);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">
          更新时间线
        </h2>
        <Badge variant="outline" className="px-3 py-1">
          共 {entries.length} 条更新
        </Badge>
      </div>

      <div className="relative">
        {/* 时间线主线 */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

        <div className="space-y-8">
          {Object.entries(groupedEntries)
            .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
            .map(([date, dateEntries]) => (
              <div key={date} className="relative">
                {/* 日期节点 */}
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/10 border-4 border-background rounded-full shadow-soft relative z-10">
                    <CalendarIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-medium text-foreground">{date}</h3>
                    <p className="text-sm text-muted-foreground">
                      {dateEntries.length} 项更新
                    </p>
                  </div>
                </div>

                {/* 该日期的更新条目 */}
                <div className="ml-20 space-y-4">
                  {dateEntries.map((entry) => (
                    <Card key={entry.id} className="border border-border/50 shadow-soft hover:shadow-elevated transition-all duration-200">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{getTypeIcon(entry.type)}</span>
                            <div className="flex items-center space-x-2">
                              <Badge className={getTypeColor(entry.type)}>
                                {getTypeText(entry.type)}
                              </Badge>
                              <Badge variant="outline" className="px-2 py-1">
                                <TagIcon className="h-3 w-3 mr-1" />
                                {entry.version}
                              </Badge>
                            </div>
                          </div>
                          {!selectedTool && (
                            <Badge variant="secondary" className="px-3 py-1">
                              {entry.toolId}
                            </Badge>
                          )}
                        </div>

                        <h4 className="text-lg font-semibold mb-3 text-foreground">
                          {entry.title}
                        </h4>

                        <p className="text-muted-foreground leading-relaxed">
                          {entry.description}
                        </p>

                        <div className="mt-4 pt-4 border-t border-border/30">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              版本 {entry.version}
                            </span>
                            <span className="text-muted-foreground">
                              {new Date(entry.date).toLocaleTimeString('zh-CN', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default ChangelogTimeline;