
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
import { Trash2, Calendar } from 'lucide-react';
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
  
  // Calculate if due date is approaching (within 2 days)
  const isApproaching = new Date(dueDate).getTime() - new Date().getTime() < 2 * 24 * 60 * 60 * 1000;
  
  return (
    <Card className="task-card overflow-hidden border border-border hover:shadow-md transition-all duration-200">
      {/* Priority indicator strip at top */}
      <div className={`h-1 w-full ${priorityStyle.colorClass} mb-3`} />
      
      <div className="px-4 pb-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-heading font-medium">{title}</h3>
          <div className="flex items-center gap-2">
            <EditTaskDialog task={task} />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/90 hover:bg-destructive/10">
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete task</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-heading">Delete Task</AlertDialogTitle>
                  <AlertDialogDescription className="font-body">
                    This action cannot be undone. This will permanently delete the task.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="font-body">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteTask(id)}
                    className="bg-destructive hover:bg-destructive/90 font-body"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <UrgencyIndicator isUrgent={isUrgent} />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 items-center mb-3">
          <Badge className={`${priorityStyle.colorClass} font-caption`}>
            {priorityStyle.label}
          </Badge>
          
          <Badge 
            variant={isApproaching ? "destructive" : "outline"} 
            className="font-caption flex items-center gap-1"
          >
            <Calendar className="h-3 w-3" />
            <span>{format(dueDate, 'MMM d')}</span>
          </Badge>
        </div>
        
        <div className="mt-3">
          <TagList 
            tags={tags} 
            onRemoveTag={(tagId) => removeTagFromTask(id, tagId)} 
          />
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
