import { Tool } from '@/types/tool';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  StarIcon, 
  ArrowTopRightOnSquareIcon,
  BookmarkIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface ToolCardProps {
  tool: Tool;
  onBookmark?: (toolId: string) => void;
  isBookmarked?: boolean;
}

const ToolCard = ({ tool, onBookmark, isBookmarked = false }: ToolCardProps) => {
  const getPricingColor = (pricing: string) => {
    switch (pricing) {
      case 'free': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'freemium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'paid': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getPricingText = (pricing: string) => {
    switch (pricing) {
      case 'free': return '免费';
      case 'freemium': return '免费增值';
      case 'paid': return '付费';
      default: return pricing;
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarSolidIcon key={i} className="h-4 w-4 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <StarIcon className="h-4 w-4 text-yellow-400" />
          <StarSolidIcon 
            className="absolute inset-0 h-4 w-4 text-yellow-400" 
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          />
        </div>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarIcon key={`empty-${i}`} className="h-4 w-4 text-gray-300 dark:text-gray-600" />
      );
    }

    return stars;
  };

  return (
    <Card className="group hover:shadow-medium transition-smooth gradient-card border-0">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <img 
                src={tool.logo} 
                alt={`${tool.name} logo`}
                className="h-12 w-12 rounded-lg shadow-soft"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-smooth">
                {tool.name}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center space-x-1">
                  {renderStars(tool.rating)}
                  <span className="text-sm text-muted-foreground ml-1">
                    {tool.rating}
                  </span>
                </div>
                <Badge className={getPricingColor(tool.pricing)}>
                  {getPricingText(tool.pricing)}
                </Badge>
              </div>
            </div>
          </div>
          
          {tool.featured && (
            <Badge variant="secondary" className="gradient-primary text-white border-0">
              推荐
            </Badge>
          )}
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {tool.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tool.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tool.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{tool.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">核心功能</h4>
          <ul className="space-y-1">
            {tool.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="text-xs text-muted-foreground flex items-center">
                <span className="w-1 h-1 bg-primary rounded-full mr-2 flex-shrink-0"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 bg-muted/30 flex items-center justify-between">
        <div className="flex items-center text-xs text-muted-foreground">
          <ClockIcon className="h-3 w-3 mr-1" />
          更新于 {new Date(tool.lastUpdated).toLocaleDateString('zh-CN')}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onBookmark?.(tool.id)}
            className={isBookmarked ? 'text-primary' : ''}
          >
            <BookmarkIcon className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </Button>
          
          <Button size="sm" asChild>
            <a 
              href={tool.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center"
            >
              访问
              <ArrowTopRightOnSquareIcon className="h-3 w-3 ml-1" />
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;