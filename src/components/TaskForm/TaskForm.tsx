
import React from 'react';
import { Card } from "@/components/ui/card";
import PrioritySelector from '@/components/PrioritySelector/PrioritySelector';
import StatusSelector from '@/components/StatusSelector/StatusSelector';
import TagList from '@/components/TagList/TagList';
import { Label } from "@/components/ui/label";
import { PriorityLevel, StatusType, Tag } from '@/types';

interface TaskFormProps {
  priority: PriorityLevel | null;
  status: StatusType | null;
  tags: Tag[];
  onPriorityChange: (priority: PriorityLevel) => void;
  onStatusChange: (status: StatusType) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  priority,
  status,
  tags,
  onPriorityChange,
  onStatusChange,
}) => {
  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="priority">Priority:</Label>
          <PrioritySelector
            currentPriority={priority}
            onChange={onPriorityChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status:</Label>
          <StatusSelector
            currentStatus={status}
            onChange={onStatusChange}
          />
        </div>

        <div className="space-y-2">
          <Label>Tags:</Label>
          <TagList tags={tags} readOnly />
        </div>
      </div>
    </Card>
  );
};

export default TaskForm;
