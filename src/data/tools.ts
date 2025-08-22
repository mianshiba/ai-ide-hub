import { Tool, Category, ChangelogEntry } from '@/types/tool';

export const categories: Category[] = [
  {
    id: 'code-completion',
    name: 'AI代码补全',
    description: '智能代码自动补全和建议工具',
    icon: '⚡',
    count: 8
  },
  {
    id: 'chat-coding',
    name: 'AI对话编程',
    description: '与AI对话进行编程开发',
    icon: '💬',
    count: 6
  },
  {
    id: 'code-review',
    name: '代码审查',
    description: 'AI驱动的代码质量检查工具',
    icon: '🔍',
    count: 4
  },
  {
    id: 'documentation',
    name: '文档生成',
    description: '自动生成代码文档和注释',
    icon: '📚',
    count: 5
  },
  {
    id: 'testing',
    name: '测试生成',
    description: 'AI辅助测试用例生成',
    icon: '🧪',
    count: 3
  },
  {
    id: 'refactoring',
    name: '代码重构',
    description: '智能代码重构和优化',
    icon: '🔧',
    count: 4
  }
];

export const tools: Tool[] = [
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    description: 'GitHub官方AI编程助手，支持多种编程语言的智能代码补全',
    category: 'code-completion',
    tags: ['VSCode', 'IntelliJ', 'Vim', 'JavaScript', 'Python'],
    url: 'https://github.com/features/copilot',
    pricing: 'paid',
    rating: 4.8,
    logo: '/api/placeholder/64/64',
    screenshots: ['/api/placeholder/800/450'],
    features: [
      '实时代码建议',
      '多语言支持',
      '上下文感知',
      '函数自动生成',
      'IDE深度集成'
    ],
    lastUpdated: '2024-01-15',
    featured: true
  },
  {
    id: 'cursor',
    name: 'Cursor',
    description: '专为AI编程设计的现代代码编辑器，集成强大的AI对话功能',
    category: 'chat-coding',
    tags: ['AI Editor', 'GPT-4', 'TypeScript', 'React'],
    url: 'https://cursor.sh',
    pricing: 'freemium',
    rating: 4.7,
    logo: '/api/placeholder/64/64',
    screenshots: ['/api/placeholder/800/450'],
    features: [
      'AI聊天界面',
      '代码生成',
      '重构建议',
      'Bug修复',
      '代码解释'
    ],
    lastUpdated: '2024-01-20',
    featured: true
  },
  {
    id: 'tabnine',
    name: 'Tabnine',
    description: '基于机器学习的AI代码补全工具，支持本地和云端模式',
    category: 'code-completion',
    tags: ['Machine Learning', 'Privacy', 'Multi-IDE'],
    url: 'https://tabnine.com',
    pricing: 'freemium',
    rating: 4.5,
    logo: '/api/placeholder/64/64',
    screenshots: ['/api/placeholder/800/450'],
    features: [
      '本地AI模型',
      '隐私保护',
      '团队训练',
      '多IDE支持',
      '企业级安全'
    ],
    lastUpdated: '2024-01-18'
  },
  {
    id: 'codeium',
    name: 'Codeium',
    description: '免费的AI代码补全工具，支持70+编程语言',
    category: 'code-completion',
    tags: ['Free', 'Multi-language', 'Fast'],
    url: 'https://codeium.com',
    pricing: 'free',
    rating: 4.6,
    logo: '/api/placeholder/64/64',
    screenshots: ['/api/placeholder/800/450'],
    features: [
      '完全免费',
      '70+语言支持',
      '快速响应',
      '无限制使用',
      '隐私安全'
    ],
    lastUpdated: '2024-01-22'
  },
  {
    id: 'claude-dev',
    name: 'Claude Dev',
    description: 'VSCode扩展，集成Anthropic Claude AI进行编程辅助',
    category: 'chat-coding',
    tags: ['VSCode', 'Claude', 'Anthropic'],
    url: 'https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev',
    pricing: 'free',
    rating: 4.4,
    logo: '/api/placeholder/64/64',
    screenshots: ['/api/placeholder/800/450'],
    features: [
      'Claude AI集成',
      '代码生成',
      '问题解答',
      '代码解释',
      'VSCode原生集成'
    ],
    lastUpdated: '2024-01-10'
  },
  {
    id: 'aider',
    name: 'Aider',
    description: '命令行AI编程工具，可以直接修改您的代码库',
    category: 'chat-coding',
    tags: ['CLI', 'Git Integration', 'GPT-4'],
    url: 'https://aider.chat',
    pricing: 'free',
    rating: 4.3,
    logo: '/api/placeholder/64/64',
    screenshots: ['/api/placeholder/800/450'],
    features: [
      '命令行界面',
      'Git集成',
      '直接代码修改',
      '多文件编辑',
      '变更历史'
    ],
    lastUpdated: '2024-01-25'
  }
];

export const recentChangelogs: ChangelogEntry[] = [
  {
    id: '1',
    version: '1.15.0',
    date: '2024-01-20',
    title: 'Cursor Chat 2.0 发布',
    description: '全新的AI对话界面，支持多轮对话和代码上下文理解',
    type: 'feature',
    toolId: 'cursor'
  },
  {
    id: '2',
    version: '1.156.0',
    date: '2024-01-15',
    title: 'GitHub Copilot Chat 优化',
    description: '改进了代码建议的准确性，新增了更多编程语言支持',
    type: 'improvement',
    toolId: 'github-copilot'
  },
  {
    id: '3',
    version: '4.8.2',
    date: '2024-01-22',
    title: 'Codeium 性能提升',
    description: '代码补全速度提升30%，新增JavaScript框架支持',
    type: 'improvement',
    toolId: 'codeium'
  },
  {
    id: '4',
    version: '4.2.1',
    date: '2024-01-18',
    title: 'Tabnine 本地模型更新',
    description: '更新了本地AI模型，提升了代码建议质量',
    type: 'improvement',
    toolId: 'tabnine'
  }
];