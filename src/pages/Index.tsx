
import React from 'react';
import TaskForm from '@/components/TaskForm/TaskForm';
import TaskCard from '@/components/TaskCard/TaskCard';

const Index = () => {
  const demoTags = [
    { id: '1', name: 'Backend', color: 'bg-blue-500' },
    { id: '2', name: 'UI', color: 'bg-purple-500' },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Task Form (Module 1)</h2>
        <TaskForm
          priority="medium"
          status="in_progress"
          tags={demoTags}
          onPriorityChange={(p) => console.log('Priority changed:', p)}
          onStatusChange={(s) => console.log('Status changed:', s)}
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Task Card (Module 1)</h2>
        <div className="max-w-md">
          <TaskCard
            title="Task Title Here"
            priority="high"
            dueDate={new Date('2025-11-15')}
            tags={demoTags}
            isUrgent={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
