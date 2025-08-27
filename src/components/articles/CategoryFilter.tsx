import { Button } from '@/components/ui/button';
import { ArticleCategory } from '@/types/article';

interface CategoryFilterProps {
  categories: ArticleCategory[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className="transition-all duration-200"
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;