
import { useState, useCallback } from 'react';
import { Tag } from '@/types';
import { useTagStore } from '@/store/tagStore';
import prioritizationService from '@/services/prioritizationService';
import { useToast } from '@/hooks/use-toast';

export function useTagManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { tags, addTag, updateTag, removeTag, setError } = useTagStore();
  const { toast } = useToast();

  // Filter tags based on search query
  const filteredTags = searchQuery.trim() ? 
    tags.filter(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase())) : 
    tags;

  // Create a new tag
  const createTag = useCallback(async (tagName: string, color: string) => {
    const trimmedName = tagName.trim();
    if (!trimmedName) return null;

    // Check if tag with same name already exists
    const existingTag = tags.find(t => t.name.toLowerCase() === trimmedName.toLowerCase());
    if (existingTag) {
      toast({
        title: "Tag already exists",
        description: `A tag named "${trimmedName}" already exists.`,
      });
      return existingTag;
    }

    setIsLoading(true);
    try {
      const newTag: Tag = {
        id: crypto.randomUUID(), // Will be replaced by server ID if API is used
        name: trimmedName,
        color: color,
      };
      
      // Call API service to create tag
      // Uncomment when API is ready:
      // const createdTag = await prioritizationService.createTag({ name: trimmedName, color });
      // addTag(createdTag);
      
      // For now, just add to local store
      addTag(newTag);
      
      toast({
        title: "Tag created",
        description: `Created new tag: ${trimmedName}`,
      });
      
      return newTag;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create tag';
      setError(errorMsg);
      toast({
        title: "Error creating tag",
        description: errorMsg,
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [tags, addTag, setError, toast]);

  // Update an existing tag
  const modifyTag = useCallback(async (tagId: string, tagName: string, color: string) => {
    if (!tagId) return false;
    
    setIsLoading(true);
    try {
      const updatedTag: Tag = {
        id: tagId,
        name: tagName.trim(),
        color,
      };
      
      // Call API service to update tag
      // Uncomment when API is ready:
      // await prioritizationService.updateTag({ id: tagId, name: tagName.trim(), color });
      
      // Update in local store
      updateTag(tagId, updatedTag);
      
      toast({
        title: "Tag updated",
        description: `Updated tag: ${tagName}`,
      });
      
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update tag';
      setError(errorMsg);
      toast({
        title: "Error updating tag",
        description: errorMsg,
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [updateTag, setError, toast]);

  // Delete a tag
  const deleteTag = useCallback(async (tagId: string) => {
    if (!tagId) return false;
    
    setIsLoading(true);
    try {
      // Call API service to delete tag
      // Uncomment when API is ready:
      // await prioritizationService.deleteTag(tagId);
      
      // Remove from local store
      removeTag(tagId);
      
      toast({
        title: "Tag deleted",
        description: "Tag successfully removed",
      });
      
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to delete tag';
      setError(errorMsg);
      toast({
        title: "Error deleting tag",
        description: errorMsg,
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [removeTag, setError, toast]);

  return {
    isLoading,
    filteredTags,
    searchQuery,
    setSearchQuery,
    createTag,
    modifyTag,
    deleteTag,
  };
}
