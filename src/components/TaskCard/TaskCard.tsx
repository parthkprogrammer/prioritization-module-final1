
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TagList from '@/components/TagList/TagList';
import { useTaskStore } from '@/store/taskStore';
import UrgencyIndicator from '@/components/UrgencyIndicator/UrgencyIndicator';
import { PriorityLevel, Tag } from '@/types';
import { getPriorityStyle } from '@/utils/stylingUtils';
import { format } from 'date-fns';

interface TaskCardProps {
  id: string;
  title: string;
  priority: PriorityLevel;
  dueDate: Date;
  tags: Tag[];
  isUrgent: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  priority,
  dueDate,
  tags,
  isUrgent,
}) => {
  const removeTagFromTask = useTaskStore(state => state.removeTagFromTask);
  const priorityStyle = getPriorityStyle(priority);
  
  return (
    <Card className="p-4">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-medium">{title}</h3>
        <UrgencyIndicator isUrgent={isUrgent} />
      </div>
      
      <div className="flex flex-wrap gap-2 items-center">
        <Badge className={priorityStyle.colorClass}>
          {priorityStyle.label}
        </Badge>
        
        <Badge variant="outline">
          Due {format(dueDate, 'MMM d')}
        </Badge>
      </div>
      
      <div className="mt-3">
        <TagList 
          tags={tags} 
          onRemoveTag={(tagId) => removeTagFromTask(id, tagId)} 
        />
      </div>
    </Card>
  );
};

export default TaskCard;
