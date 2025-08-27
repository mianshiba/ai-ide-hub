import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/layout/Header';
import ChangelogTimeline from '@/components/changelog/ChangelogTimeline';
import ToolSelector from '@/components/changelog/ToolSelector';
import { tools, recentChangelogs } from '@/data/tools';
import { ChangelogEntry } from '@/types/tool';

const Changelog = () => {
  const [selectedToolId, setSelectedToolId] = useState<string>('all');

  const filteredChangelogs = useMemo(() => {
    if (selectedToolId === 'all') {
      return recentChangelogs;
    }
    return recentChangelogs.filter(entry => entry.toolId === selectedToolId);
  }, [selectedToolId]);

  const selectedTool = tools.find(tool => tool.id === selectedToolId);

  return (
    <>
      <Helmet>
        <title>
          {selectedToolId === 'all' 
            ? 'AI 工具更新日志 - 最新功能与改进' 
            : `${selectedTool?.name} 更新日志`
          }
        </title>
        <meta 
          name="description" 
          content={
            selectedToolId === 'all'
              ? '查看最新的 AI 开发工具更新日志，了解新功能、改进和修复。实时跟踪您喜欢的工具的最新发展。'
              : `查看 ${selectedTool?.name} 的完整更新历史，包括新功能发布、性能改进和问题修复。`
          } 
        />
        <meta name="keywords" content="AI工具,更新日志,changelog,开发工具,新功能" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {selectedToolId === 'all' ? '更新日志' : `${selectedTool?.name} 更新日志`}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              {selectedToolId === 'all' 
                ? '跟踪最新的 AI 开发工具更新，了解新功能发布、性能改进和问题修复。'
                : `查看 ${selectedTool?.name} 的详细更新历史和发展轨迹。`
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <ToolSelector
                tools={tools}
                selectedToolId={selectedToolId}
                onToolSelect={setSelectedToolId}
              />
            </div>
            
            <div className="lg:col-span-3">
              <ChangelogTimeline 
                entries={filteredChangelogs}
                selectedTool={selectedTool}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Changelog;