
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

export const useTagStore = create<TagStore>((set) => ({
  tags: [],
  isLoading: false,
  error: null,
  setTags: (tags) => set({ tags }),
  addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
  updateTag: (tagId, updatedTag) =>
    set((state) => ({
      tags: state.tags.map((tag) => (tag.id === tagId ? updatedTag : tag)),
    })),
  removeTag: (tagId) =>
    set((state) => ({
      tags: state.tags.filter((tag) => tag.id !== tagId),
    })),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
