
import React, { useState, useEffect } from 'react';
import { Tag } from '@/types';
import { useTagStore } from '@/store/tagStore';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CheckIcon, PlusCircle } from "lucide-react";
import { cn } from '@/lib/utils';

interface TagInputProps {
  assignedTags: Tag[];
  onAddTag: (tag: Tag) => void;
  onCreateTag?: (tagName: string) => Promise<Tag | null>;
  disabled?: boolean;
}

const TagInput: React.FC<TagInputProps> = ({
  assignedTags = [], // Make sure we default to an empty array
  onAddTag,
  onCreateTag,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  
  // Get tags from store safely
  const { tags = [] } = useTagStore() || {}; // Use destructuring with default empty array

  // Update available tags whenever tags or assignedTags change
  useEffect(() => {
    if (!Array.isArray(tags) || !Array.isArray(assignedTags)) {
      setAvailableTags([]);
      return;
    }

    const filteredTags = tags.filter(
      (tag) => !assignedTags.some((assigned) => assigned?.id === tag?.id)
    );
    setAvailableTags(filteredTags);
  }, [tags, assignedTags]);

  const handleSelect = async (currentValue: string) => {
    if (currentValue === 'create' && onCreateTag && value.trim()) {
      const newTag = await onCreateTag(value);
      if (newTag) {
        onAddTag(newTag);
      }
    } else {
      const selectedTag = tags.find((tag) => tag.id === currentValue);
      if (selectedTag) {
        onAddTag(selectedTag);
      }
    }
    setValue("");
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          disabled={disabled}
        >
          Add tag...
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search tags..."
            value={value}
            onValueChange={setValue}
          />
          <CommandEmpty className="py-2 px-2 text-sm">
            {onCreateTag && value.trim() && (
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleSelect('create')}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create "{value}"
              </Button>
            )}
            {(!onCreateTag || !value.trim()) && "No tags found."}
          </CommandEmpty>
          {Array.isArray(availableTags) && availableTags.length > 0 && (
            <CommandGroup>
              {availableTags.map((tag) => (
                <CommandItem
                  key={tag.id}
                  value={tag.id}
                  onSelect={handleSelect}
                >
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full mr-2",
                      tag.color || "bg-gray-500"
                    )}
                  />
                  {tag.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === tag.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TagInput;
