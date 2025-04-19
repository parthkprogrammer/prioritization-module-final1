import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PrioritySelector from '@/components/PrioritySelector/PrioritySelector';
import StatusSelector from '@/components/StatusSelector/StatusSelector';
import TagList from '@/components/TagList/TagList';
import TagInput from '@/components/TagInput/TagInput';
import { Label } from "@/components/ui/label";
import { PriorityLevel, StatusType, Tag } from '@/types';
import { useTaskStore, Task } from '@/store/taskStore';
import { CalendarIcon } from 'lucide-react';
import { format, parse } from 'date-fns';

interface TaskFormProps {
  isEditing?: boolean;
  existingTask?: Task;
}

const TaskForm = ({ isEditing = false, existingTask }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  // Instead of one dueTime string, use hour, minute, ampm controlled inputs:
  const [hour, setHour] = useState('12');
  const [minute, setMinute] = useState('00');
  const [ampm, setAmpm] = useState<'AM' | 'PM'>('AM');

  const [priority, setPriority] = useState<PriorityLevel>('medium');
  const [status, setStatus] = useState<StatusType>('todo');
  const [tags, setTags] = useState<Tag[]>([]);
  
  const addTask = useTaskStore(state => state.addTask);
  const updateTask = useTaskStore(state => state.updateTask);

  useEffect(() => {
    if (isEditing && existingTask) {
      setTitle(existingTask.title);
      setDueDate(format(existingTask.dueDate, 'yyyy-MM-dd'));

      // Parse existingTask.dueTime in 24h format like "14:30" and convert to hour/minute/ampm
      const parsedTime = existingTask.dueTime;
      if (parsedTime) {
        const [hStr, mStr] = parsedTime.split(':');
        let h = Number(hStr);
        const m = mStr ?? '00';
        const isPM = h >= 12;
        if (h === 0) {
          h = 12;
        } else if (h > 12) {
          h = h - 12;
        }
        setHour(h.toString().padStart(2, '0'));
        setMinute(m);
        setAmpm(isPM ? 'PM' : 'AM');
      } else {
        setHour('12');
        setMinute('00');
        setAmpm('AM');
      }

      setPriority(existingTask.priority);
      setStatus(existingTask.status);
      setTags(existingTask.tags);
    }
  }, [isEditing, existingTask]);

  // Compose dueTime string from hour, minute, ampm in 24h format HH:mm to store
  const composeDueTime = () => {
    let hNum = Number(hour);
    if (ampm === 'AM' && hNum === 12) {
      hNum = 0;
    } else if (ampm === 'PM' && hNum !== 12) {
      hNum += 12;
    }
    return `${hNum.toString().padStart(2, '0')}:${minute.padStart(2, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const taskData = {
      title,
      dueDate: dueDate ? new Date(dueDate) : new Date(),
      dueTime: composeDueTime(),
      priority,
      status,
      tags: tags || [],
    };

    if (isEditing && existingTask) {
      updateTask(existingTask.id, taskData);
    } else {
      addTask(taskData);
    }

    // Reset form if not editing
    if (!isEditing) {
      setTitle('');
      setDueDate('');
      setHour('12');
      setMinute('00');
      setAmpm('AM');
      setPriority('medium');
      setStatus('todo');
      setTags([]);
    }
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

  // Generate options lists for hour and minute
  const hourOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  return (
    <div className={isEditing ? "max-w-full p-4 max-h-[70vh] overflow-auto" : "card p-6"}>
      <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Task' : 'Create Task'}</h2>
      <form onSubmit={handleSubmit} className="space-y-6 min-w-[320px] md:min-w-[400px]">
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
          <div className="flex space-x-2 items-center">
            <select
              aria-label="Select hour"
              value={hour}
              onChange={e => setHour(e.target.value)}
              className="rounded border border-input bg-background px-2 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {hourOptions.map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
            <span>:</span>
            <select
              aria-label="Select minutes"
              value={minute}
              onChange={e => setMinute(e.target.value)}
              className="rounded border border-input bg-background px-2 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {minuteOptions.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <select
              aria-label="Select AM/PM"
              value={ampm}
              onChange={e => setAmpm(e.target.value as 'AM' | 'PM')}
              className="rounded border border-input bg-background px-3 py-2 text-base font-semibold uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
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
          {isEditing ? 'Update Task' : 'Add Task'}
        </Button>
      </form>
    </div>
  );
};

export default TaskForm;
