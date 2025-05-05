
import api from '@/config/api';
import { Tag, PriorityDefinition, StatusDefinition, CreateTagRequest, UpdateTagRequest, ApiResponse } from '@/types';

// Currently using mock data, these functions will use the API when ready
const prioritizationService = {
  // Tag related API calls
  getTags: async (): Promise<{ tags: Tag[] }> => {
    // Mock data response
    return {
      tags: [
        { id: '1', name: 'Work', color: 'bg-primary' },
        { id: '2', name: 'Personal', color: 'bg-secondary' },
        { id: '3', name: 'Urgent', color: 'bg-rose-500' },
        { id: '4', name: 'Meeting', color: 'bg-purple-500' },
      ]
    };
    
    // Uncomment when API is ready:
    // const response = await api.get<ApiResponse<{ tags: Tag[] }>>('/tags');
    // return response.data.data;
  },
  
  createTag: async (tagData: CreateTagRequest): Promise<Tag> => {
    // Mock response - would normally come from API
    return {
      id: crypto.randomUUID(),
      name: tagData.name,
      color: tagData.color,
    };
    
    // Uncomment when API is ready:
    // const response = await api.post<ApiResponse<Tag>>('/tags', tagData);
    // return response.data.data;
  },
  
  updateTag: async (tagData: UpdateTagRequest): Promise<Tag> => {
    // Mock response
    return {
      id: tagData.id,
      name: tagData.name,
      color: tagData.color,
    };
    
    // Uncomment when API is ready:
    // const response = await api.put<ApiResponse<Tag>>(`/tags/${tagData.id}`, tagData);
    // return response.data.data;
  },
  
  deleteTag: async (tagId: string): Promise<void> => {
    // Uncomment when API is ready:
    // await api.delete<ApiResponse<void>>(`/tags/${tagId}`);
    return Promise.resolve();
  },
  
  // Definition related API calls (priorities and statuses)
  getDefinitions: async (): Promise<{ priorities: PriorityDefinition[], statuses: StatusDefinition[] }> => {
    // Mock data response
    return {
      priorities: [
        { level: 'low', label: 'Low', color: 'bg-blue-500', icon: 'arrow-down' },
        { level: 'medium', label: 'Medium', color: 'bg-yellow-500', icon: 'minus' },
        { level: 'high', label: 'High', color: 'bg-red-500', icon: 'arrow-up' },
      ],
      statuses: [
        { type: 'todo', label: 'To Do', color: 'bg-gray-500' },
        { type: 'in_progress', label: 'In Progress', color: 'bg-blue-500' },
        { type: 'done', label: 'Done', color: 'bg-green-500' },
      ]
    };
    
    // Uncomment when API is ready:
    // const response = await api.get<ApiResponse<{ priorities: PriorityDefinition[], statuses: StatusDefinition[] }>>('/definitions');
    // return response.data.data;
  },
};

export default prioritizationService;
