
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import TaskForm from '../TaskForm/TaskForm';
import { Task } from '@/store/taskStore';

interface EditTaskDialogProps {
  task: Task;
}

const EditTaskDialog = ({ task }: EditTaskDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          <PencilIcon className="h-4 w-4" />
          <span className="sr-only">Edit task</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <TaskForm isEditing existingTask={task} />
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
