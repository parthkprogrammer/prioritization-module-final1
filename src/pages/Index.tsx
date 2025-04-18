
import React from 'react';
import TaskForm from '@/components/TaskForm/TaskForm';
import TaskCard from '@/components/TaskCard/TaskCard';
import { useTaskStore } from '@/store/taskStore';

const Index = () => {
  const tasks = useTaskStore(state => state.tasks);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <TaskForm />
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              priority={task.priority}
              dueDate={task.dueDate}
              tags={task.tags}
              isUrgent={task.isUrgent || false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
