
import React from 'react';
import { Tag } from '@/types';
import { Badge } from "@/components/ui/badge";
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagListProps {
  tags: Tag[];
  onRemoveTag?: (tagId: string) => void;
  readOnly?: boolean;
}

const TagList: React.FC<TagListProps> = ({
  tags = [],
  onRemoveTag,
  readOnly = false,
}) => {
  // Safely handle tags by ensuring it's an array and has items
  const safeTags = Array.isArray(tags) ? tags : [];
  
  if (safeTags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {safeTags.map((tag) => (
        <Badge
          key={tag.id}
          className={cn(
            "inline-flex items-center",
            tag.color || "bg-gray-500",
            !readOnly && "pr-1"
          )}
        >
          {tag.name}
          {!readOnly && onRemoveTag && (
            <button
              onClick={() => onRemoveTag(tag.id)}
              className="ml-1 rounded-full hover:bg-background/80"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove tag</span>
            </button>
          )}
        </Badge>
      ))}
    </div>
  );
};

export default TagList;
