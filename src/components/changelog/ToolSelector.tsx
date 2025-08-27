import React from 'react';
import { Tool } from '@/types/tool';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckIcon } from '@heroicons/react/24/solid';

interface ToolSelectorProps {
  tools: Tool[];
  selectedToolId: string;
  onToolSelect: (toolId: string) => void;
}

const ToolSelector = ({ tools, selectedToolId, onToolSelect }: ToolSelectorProps) => {
  const toolsWithChangelogs = tools.filter(tool => tool.changelog && tool.changelog.length > 0);

  return (
    <Card className="sticky top-8 border border-border/50 shadow-soft">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          筛选工具
        </h3>
        
        <div className="space-y-2">
          <Button
            variant={selectedToolId === 'all' ? 'default' : 'ghost'}
            onClick={() => onToolSelect('all')}
            className="w-full justify-start h-auto p-3"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">所有工具</span>
              </div>
              <div className="flex items-center space-x-2">
                {selectedToolId === 'all' && (
                  <CheckIcon className="h-4 w-4 text-primary-foreground" />
                )}
                <Badge variant="secondary" className="text-xs">
                  全部
                </Badge>
              </div>
            </div>
          </Button>

          <div className="border-t border-border/30 pt-3 mt-4">
            <p className="text-xs text-muted-foreground mb-3 px-1">
              按工具筛选
            </p>
            
            <div className="space-y-1">
              {toolsWithChangelogs.map((tool) => {
                const changelogCount = tool.changelog?.length || 0;
                
                return (
                  <Button
                    key={tool.id}
                    variant={selectedToolId === tool.id ? 'default' : 'ghost'}
                    onClick={() => onToolSelect(tool.id)}
                    className="w-full justify-start h-auto p-3"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-3">
                        <img
                          src={tool.logo}
                          alt={tool.name}
                          className="w-5 h-5 rounded"
                        />
                        <span className="text-sm font-medium truncate">
                          {tool.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {selectedToolId === tool.id && (
                          <CheckIcon className="h-4 w-4 text-primary-foreground" />
                        )}
                        <Badge variant="secondary" className="text-xs">
                          {changelogCount}
                        </Badge>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>

          {toolsWithChangelogs.length === 0 && (
            <div className="text-center py-6">
              <p className="text-sm text-muted-foreground">
                暂无可筛选的工具
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolSelector;