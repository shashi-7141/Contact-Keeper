'use client';

import { useContacts } from '@/lib/contact-context';
import { Card } from '@/components/ui/card';
import { Folder } from 'lucide-react';

interface CategoriesPanelProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoriesPanel({
  selectedCategory,
  onSelectCategory,
}: CategoriesPanelProps) {
  const { contacts, getCategories } = useContacts();
  const categories = getCategories();

  const getCategoryCount = (category: string) => {
    return contacts.filter((c) => c.category === category).length;
  };

  return (
    <Card className="p-4">
      <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
        <Folder className="h-4 w-4" />
        Categories
      </h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center justify-between ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            <span>{category}</span>
            <span className="text-xs font-medium">
              {getCategoryCount(category)}
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
}
