
import React, { useState } from 'react';
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
  assignedTags,
  onAddTag,
  onCreateTag,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { tags } = useTagStore();

  const availableTags = tags.filter(
    (tag) => !assignedTags.find((assigned) => assigned.id === tag.id)
  );

  const handleSelect = async (currentValue: string) => {
    if (currentValue === 'create' && onCreateTag) {
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
            {onCreateTag && (
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleSelect('create')}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create "{value}"
              </Button>
            )}
            {!onCreateTag && "No tags found."}
          </CommandEmpty>
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
                    tag.color
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
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TagInput;
