
import React, { useState, useEffect } from 'react';
import { Tag } from '@/types';
import { useTagStore } from '@/store/tagStore';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CheckIcon, PlusCircle } from "lucide-react";
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

interface TagInputProps {
  assignedTags: Tag[];
  onAddTag: (tag: Tag) => void;
  disabled?: boolean;
}

const TagInput: React.FC<TagInputProps> = ({
  assignedTags = [],
  onAddTag,
  disabled = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [availableTags, setAvailableTags] = React.useState<Tag[]>([]);
  const { toast } = useToast();

  const { tags, addTag } = useTagStore();

  React.useEffect(() => {
    const safeAssignedTags = Array.isArray(assignedTags) ? assignedTags : [];
    const safeTags = Array.isArray(tags) ? tags : [];

    const filteredTags = safeTags.filter(
      (tag) => !safeAssignedTags.some((assigned) => assigned?.id === tag?.id)
    );

    setAvailableTags(filteredTags);
  }, [tags, assignedTags]);

  const handleCreateNewTag = async (tagName: string) => {
    const trimmedName = tagName.trim();
    if (!trimmedName) return null;

    // Generate a random color from a predefined set of Tailwind colors
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-purple-500', 'bg-yellow-500', 'bg-pink-500'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newTag: Tag = {
      id: crypto.randomUUID(),
      name: trimmedName,
      color: randomColor,
    };

    addTag(newTag);
    toast({
      title: "Tag created",
      description: `Created new tag: ${trimmedName}`,
    });

    return newTag;
  };

  const handleSelect = async (currentValue: string) => {
    if (currentValue === 'create' && value.trim()) {
      const newTag = await handleCreateNewTag(value);
      if (newTag) {
        onAddTag(newTag);
      }
    } else {
      const selectedTag = tags.find((tag) => tag?.id === currentValue);
      if (selectedTag) {
        onAddTag(selectedTag);
      }
    }
    setValue("");
    setOpen(false);
  };

  const handleCreateClick = async () => {
    if (value.trim()) {
      console.log("Creating new tag:", value);
      const newTag = await handleCreateNewTag(value);
      if (newTag) {
        console.log("New tag created:", newTag);
        onAddTag(newTag);
        setValue("");
        setOpen(false);
      }
    }
  };

  const handleCreateKeyDown = async (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      await handleCreateClick();
    }
  };

  // NEW: Add keyDown on CommandInput to trigger create on Enter key
  const handleInputKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (value.trim()) {
        await handleCreateClick();
      }
    }
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
            placeholder="Search or create tag..."
            value={value}
            onValueChange={setValue}
            autoComplete="off"
            onKeyDown={handleInputKeyDown} // Added keyboard handler on input
          />
          <CommandList>
            <CommandEmpty className="py-2 px-2 text-sm">
              {value.trim() && (
                <Button
                  className="flex w-full items-center px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                  onClick={handleCreateClick}
                  type="button"
                  variant="ghost"
                  tabIndex={0}
                  onKeyDown={handleCreateKeyDown}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create "{value}"
                </Button>
              )}
              {!value.trim() && "No tags found."}
            </CommandEmpty>
            {availableTags.length > 0 && (
              <CommandGroup>
                {availableTags.map((tag) => (
                  <CommandItem
                    key={tag.id}
                    value={tag.id}
                    onSelect={handleSelect}
                    className="cursor-pointer"
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
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TagInput;

