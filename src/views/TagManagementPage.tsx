
import React, { useState, useEffect } from 'react';
import { useTagManagement } from '@/hooks/useTagManagement';
import { usePrioritizationData } from '@/hooks/usePrioritizationData';
import { Tag } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const TagManagementPage: React.FC = () => {
  const { filteredTags, searchQuery, setSearchQuery, createTag, modifyTag, deleteTag, isLoading } = useTagManagement();
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('bg-primary');
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  // Available colors for tag creation/editing
  const availableColors = [
    { value: 'bg-primary', label: 'Primary' },
    { value: 'bg-secondary', label: 'Secondary' },
    { value: 'bg-accent', label: 'Accent' },
    { value: 'bg-blue-500', label: 'Blue' },
    { value: 'bg-green-500', label: 'Green' },
    { value: 'bg-purple-500', label: 'Purple' },
    { value: 'bg-rose-500', label: 'Rose' },
    { value: 'bg-amber-500', label: 'Amber' },
    { value: 'bg-indigo-500', label: 'Indigo' },
    { value: 'bg-emerald-500', label: 'Emerald' },
    { value: 'bg-cyan-500', label: 'Cyan' },
    { value: 'bg-teal-500', label: 'Teal' },
    { value: 'bg-orange-500', label: 'Orange' },
  ];

  const handleCreateTag = async () => {
    if (newTagName.trim()) {
      await createTag(newTagName, newTagColor);
      setNewTagName('');
    }
  };

  const handleEditTag = async () => {
    if (editingTag && editingTag.id) {
      await modifyTag(editingTag.id, editingTag.name, editingTag.color);
      setEditingTag(null);
    }
  };

  const handleDeleteTag = async (tagId: string) => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      await deleteTag(tagId);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tag Management</h1>
      
      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="Search tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {/* Create new tag section */}
      <div className="mb-8 p-4 border rounded-md bg-background">
        <h2 className="text-xl font-semibold mb-4">{editingTag ? 'Edit Tag' : 'Create New Tag'}</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            value={editingTag ? editingTag.name : newTagName}
            onChange={(e) => editingTag ? setEditingTag({...editingTag, name: e.target.value}) : setNewTagName(e.target.value)}
            placeholder="Tag name"
            className="flex-grow"
          />
          
          <select 
            value={editingTag ? editingTag.color : newTagColor}
            onChange={(e) => editingTag ? setEditingTag({...editingTag, color: e.target.value}) : setNewTagColor(e.target.value)}
            className="rounded border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {availableColors.map(color => (
              <option key={color.value} value={color.value}>{color.label}</option>
            ))}
          </select>
          
          <div>
            <Button 
              onClick={editingTag ? handleEditTag : handleCreateTag} 
              disabled={isLoading}
            >
              {editingTag ? 'Update Tag' : 'Create Tag'}
            </Button>
            {editingTag && (
              <Button 
                variant="outline" 
                onClick={() => setEditingTag(null)} 
                className="ml-2"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
        
        {/* Preview */}
        <div className="mt-4">
          <Badge className={cn(
            "mt-2 text-white",
            editingTag ? editingTag.color : newTagColor
          )}>
            {editingTag ? editingTag.name || 'Tag Preview' : newTagName || 'Tag Preview'}
          </Badge>
        </div>
      </div>
      
      {/* Tags list */}
      <div className="border rounded-md">
        <h2 className="text-xl font-semibold p-4 border-b">Existing Tags</h2>
        {filteredTags.length > 0 ? (
          <div className="divide-y">
            {filteredTags.map(tag => (
              <div key={tag.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Badge className={cn("text-white", tag.color)}>{tag.name}</Badge>
                  <span className="ml-3 text-sm text-muted-foreground">{tag.color.replace('bg-', '')}</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setEditingTag(tag)}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDeleteTag(tag.id)}
                  >
                    <Trash2 size={16} className="text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            {searchQuery ? 'No tags match your search' : 'No tags found. Create some tags above.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagManagementPage;
