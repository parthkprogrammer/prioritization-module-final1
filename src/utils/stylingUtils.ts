
import { PriorityLevel, StatusType, Tag } from '@/types';
import { useDefinitionsStore } from '@/store/definitionsStore';

export const getPriorityStyle = (level: PriorityLevel) => {
  const { priorities } = useDefinitionsStore.getState();
  const priority = priorities.find((p) => p.level === level);
  
  return {
    colorClass: priority?.color || 'bg-gray-500',
    iconName: priority?.icon,
    label: priority?.label || level,
  };
};

export const getStatusStyle = (type: StatusType) => {
  const { statuses } = useDefinitionsStore.getState();
  const status = statuses.find((s) => s.type === type);
  
  return {
    colorClass: status?.color || 'bg-gray-500',
    label: status?.label || type,
  };
};

export const getTagStyle = (tag: Tag) => {
  return {
    colorClass: tag.color || 'bg-gray-500',
  };
};
