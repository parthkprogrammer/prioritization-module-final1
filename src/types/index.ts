
export type PriorityLevel = 'low' | 'medium' | 'high';

export type StatusType = 'todo' | 'in_progress' | 'done';

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface PriorityDefinition {
  level: PriorityLevel;
  label: string;
  color: string;
  icon?: string;
}

export interface StatusDefinition {
  type: StatusType;
  label: string;
  color: string;
}

export interface UrgencyInfo {
  isUrgent: boolean;
}

// API Types
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface CreateTagRequest {
  name: string;
  color: string;
}

export interface UpdateTagRequest extends CreateTagRequest {
  id: string;
}
