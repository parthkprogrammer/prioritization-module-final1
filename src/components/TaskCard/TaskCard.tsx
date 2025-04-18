
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TagList from '@/components/TagList/TagList';
import { useTaskStore } from '@/store/taskStore';
import UrgencyIndicator from '@/components/UrgencyIndicator/UrgencyIndicator';
import EditTaskDialog from '@/components/EditTaskDialog/EditTaskDialog';
import { PriorityLevel, Tag } from '@/types';
import { getPriorityStyle } from '@/utils/stylingUtils';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  const deleteTask = useTaskStore(state => state.deleteTask);
  const tasks = useTaskStore(state => state.tasks);
  const priorityStyle = getPriorityStyle(priority);
  
  const task = tasks.find(t => t.id === id);
  if (!task) return null;
  
  return (
    <Card className="p-4 relative">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="flex items-center gap-2">
          <EditTaskDialog task={task} />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-100">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete task</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the task.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteTask(id)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <UrgencyIndicator isUrgent={isUrgent} />
        </div>
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
