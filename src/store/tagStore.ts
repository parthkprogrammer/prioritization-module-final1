
import { create } from 'zustand';
import { Tag } from '@/types';

interface TagStore {
  tags: Tag[];
  isLoading: boolean;
  error: string | null;
  setTags: (tags: Tag[]) => void;
  addTag: (tag: Tag) => void;
  updateTag: (tagId: string, updatedTag: Tag) => void;
  removeTag: (tagId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Initial tags for demo - ensuring they're properly typed
const initialTags: Tag[] = [
  { id: '1', name: 'Work', color: 'bg-blue-500' },
  { id: '2', name: 'Personal', color: 'bg-green-500' },
  { id: '3', name: 'Urgent', color: 'bg-red-500' },
  { id: '4', name: 'Meeting', color: 'bg-purple-500' },
];

export const useTagStore = create<TagStore>((set) => ({
  tags: initialTags,
  isLoading: false,
  error: null,
  setTags: (tags) => set({ tags: Array.isArray(tags) ? tags : [] }),
  addTag: (tag) => set((state) => ({ 
    tags: Array.isArray(state.tags) ? [...state.tags, tag] : [tag] 
  })),
  updateTag: (tagId, updatedTag) =>
    set((state) => ({
      tags: Array.isArray(state.tags) 
        ? state.tags.map((tag) => (tag.id === tagId ? updatedTag : tag))
        : []
    })),
  removeTag: (tagId) =>
    set((state) => ({
      tags: Array.isArray(state.tags)
        ? state.tags.filter((tag) => tag.id !== tagId)
        : []
    })),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
