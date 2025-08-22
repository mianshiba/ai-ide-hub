import { Category } from '@/types/tool';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">工具分类</h3>
      
      <div className="space-y-2">
        <Button
          variant={selectedCategory === null ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => onCategoryChange(null)}
        >
          <span className="mr-2">🔍</span>
          全部工具
          <Badge variant="secondary" className="ml-auto">
            {categories.reduce((sum, cat) => sum + cat.count, 0)}
          </Badge>
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onCategoryChange(category.id)}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
            <Badge variant="secondary" className="ml-auto">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;