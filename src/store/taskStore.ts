
import { create } from 'zustand';
import { PriorityLevel, StatusType, Tag } from '@/types';

export interface Task {
  id: string;
  title: string;
  dueDate: Date;
  dueTime: string;
  priority: PriorityLevel;
  status: StatusType;
  tags: Tag[];
  isUrgent?: boolean;
}

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  removeTagFromTask: (taskId: string, tagId: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, { ...task, id: crypto.randomUUID() }]
  })),
  updateTask: (id, updatedTask) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === id ? { ...task, ...updatedTask } : task
    )
  })),
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter(task => task.id !== id)
  })),
  removeTagFromTask: (taskId, tagId) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === taskId 
        ? { ...task, tags: task.tags.filter(tag => tag.id !== tagId) }
        : task
    )
  })),
}));
