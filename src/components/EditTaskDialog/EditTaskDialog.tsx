
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
  const [open, setOpen] = useState(false);
  
  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const handleSuccess = () => {
    console.log("Task update successful, closing dialog");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
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
          <DialogDescription>
            Make changes to your task here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <TaskForm 
          isEditing={true} 
          existingTask={task} 
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
