
import { create } from 'zustand';
import { PriorityDefinition, StatusDefinition } from '@/types';

interface DefinitionsStore {
  priorities: PriorityDefinition[];
  statuses: StatusDefinition[];
  isLoading: boolean;
  error: string | null;
  setPriorities: (priorities: PriorityDefinition[]) => void;
  setStatuses: (statuses: StatusDefinition[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const defaultPriorities: PriorityDefinition[] = [
  { level: 'low', label: 'Low', color: 'bg-blue-500', icon: 'arrow-down' },
  { level: 'medium', label: 'Medium', color: 'bg-yellow-500', icon: 'minus' },
  { level: 'high', label: 'High', color: 'bg-red-500', icon: 'arrow-up' },
];

const defaultStatuses: StatusDefinition[] = [
  { type: 'todo', label: 'To Do', color: 'bg-gray-500' },
  { type: 'in_progress', label: 'In Progress', color: 'bg-blue-500' },
  { type: 'done', label: 'Done', color: 'bg-green-500' },
];

export const useDefinitionsStore = create<DefinitionsStore>((set) => ({
  priorities: defaultPriorities,
  statuses: defaultStatuses,
  isLoading: false,
  error: null,
  setPriorities: (priorities) => set({ priorities }),
  setStatuses: (statuses) => set({ statuses }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
