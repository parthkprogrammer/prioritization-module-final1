
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PrioritySelector from '@/components/PrioritySelector/PrioritySelector';
import StatusSelector from '@/components/StatusSelector/StatusSelector';
import TagList from '@/components/TagList/TagList';
import TagInput from '@/components/TagInput/TagInput';
import { Label } from "@/components/ui/label";
import { PriorityLevel, StatusType, Tag } from '@/types';
import { useTaskStore } from '@/store/taskStore';
import { CalendarIcon, Clock } from 'lucide-react';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('medium');
  const [status, setStatus] = useState<StatusType>('todo');
  const [tags, setTags] = useState<Tag[]>([]);
  const addTask = useTaskStore(state => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({
      title,
      dueDate: dueDate ? new Date(dueDate) : new Date(),
      dueTime,
      priority,
      status,
      tags: tags || [], // Ensure tags is always an array
    });
    // Reset form
    setTitle('');
    setDueDate('');
    setDueTime('');
    setPriority('medium');
    setStatus('todo');
    setTags([]);
  };

  const handleAddTag = (tag: Tag) => {
    if (!tag) return;
    setTags(prevTags => {
      const safeArray = Array.isArray(prevTags) ? prevTags : [];
      return [...safeArray, tag];
    });
  };

  const handleRemoveTag = (tagId: string) => {
    if (!tagId) return;
    setTags(prevTags => {
      const safeArray = Array.isArray(prevTags) ? prevTags : [];
      return safeArray.filter(tag => tag?.id !== tagId);
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Create Task</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <div className="relative">
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="pr-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <div className="relative">
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="pr-10"
              required
            />
            <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueTime">Due Time</Label>
          <div className="relative">
            <Input
              id="dueTime"
              type="time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              className="pr-10"
              required
            />
            <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <PrioritySelector
            currentPriority={priority}
            onChange={setPriority}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <StatusSelector
            currentStatus={status}
            onChange={setStatus}
          />
        </div>

        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="flex gap-2">
            <TagInput 
              assignedTags={tags || []}
              onAddTag={handleAddTag}
            />
          </div>
          {tags && tags.length > 0 && (
            <TagList
              tags={tags}
              onRemoveTag={handleRemoveTag}
            />
          )}
        </div>

        <Button type="submit" className="w-full md:w-auto">
          Add Task
        </Button>
      </form>
    </Card>
  );
};

export default TaskForm;
