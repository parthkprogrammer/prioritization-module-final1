
import React, { useState } from 'react';
import { Sun, Moon, CheckCircle2, List } from 'lucide-react';
import TaskForm from '@/components/TaskForm/TaskForm';
import TaskCard from '@/components/TaskCard/TaskCard';
import { useTaskStore } from '@/store/taskStore';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PriorityLevel } from '@/types';

const Index = () => {
  const tasks = useTaskStore(state => state.tasks);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
    document.documentElement.classList.toggle('dark');
  };

  // Filter tasks by priority for viewing options
  const highPriorityTasks = tasks.filter(task => task.priority === PriorityLevel.High);
  const mediumPriorityTasks = tasks.filter(task => task.priority === PriorityLevel.Medium);
  const lowPriorityTasks = tasks.filter(task => task.priority === PriorityLevel.Low);

  // Count completed tasks (placeholder since we don't have completion status)
  const urgentTasksCount = tasks.filter(task => task.isUrgent).length;

  return (
    <div className="theme-transition min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Header with theme toggle */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="title text-primary">Task Manager</h1>
            <p className="subtitle text-secondary mt-1">Organize your work efficiently</p>
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleDarkMode}
            className="rounded-full h-10 w-10"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </header>

        {/* Task Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-lg shadow p-4 border border-border flex flex-col items-center justify-center">
            <span className="text-3xl font-heading font-bold">{tasks.length}</span>
            <span className="text-muted-foreground">Total Tasks</span>
          </div>
          <div className="bg-card rounded-lg shadow p-4 border border-border flex flex-col items-center justify-center">
            <span className="text-3xl font-heading font-bold">{highPriorityTasks.length}</span>
            <span className="text-muted-foreground">High Priority</span>
          </div>
          <div className="bg-card rounded-lg shadow p-4 border border-border flex flex-col items-center justify-center">
            <span className="text-3xl font-heading font-bold">{urgentTasksCount}</span>
            <span className="text-muted-foreground">Urgent Tasks</span>
          </div>
          <div className="bg-card rounded-lg shadow p-4 border border-border flex flex-col items-center justify-center">
            <span className="text-3xl font-heading font-bold">{lowPriorityTasks.length}</span>
            <span className="text-muted-foreground">Low Priority</span>
          </div>
        </div>

        {/* Task Form Section */}
        <section className="content-section elevated-card mb-10 rounded-xl">
          <h2 className="section-title text-left mb-6 text-primary">Create New Task</h2>
          <TaskForm />
        </section>
        
        {/* Tasks Display Section with Tabs */}
        <section className="content-section elevated-card rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-title text-left text-primary">My Tasks</h2>
            <div className="flex items-center">
              <CheckCircle2 className="text-secondary mr-2 h-5 w-5" />
              <span className="font-medium">{tasks.length} Tasks</span>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="all" className="font-heading">All Tasks</TabsTrigger>
              <TabsTrigger value="high" className="font-heading">High Priority</TabsTrigger>
              <TabsTrigger value="medium" className="font-heading">Medium Priority</TabsTrigger>
              <TabsTrigger value="low" className="font-heading">Low Priority</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      priority={task.priority}
                      dueDate={task.dueDate}
                      tags={task.tags}
                      isUrgent={task.isUrgent || false}
                    />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12 text-muted-foreground">
                    <List className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-lg font-heading">No tasks found</p>
                    <p className="text-sm">Create your first task to get started</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="high">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {highPriorityTasks.length > 0 ? (
                  highPriorityTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      priority={task.priority}
                      dueDate={task.dueDate}
                      tags={task.tags}
                      isUrgent={task.isUrgent || false}
                    />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12 text-muted-foreground">
                    <p className="text-lg font-heading">No high priority tasks</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="medium">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mediumPriorityTasks.length > 0 ? (
                  mediumPriorityTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      priority={task.priority}
                      dueDate={task.dueDate}
                      tags={task.tags}
                      isUrgent={task.isUrgent || false}
                    />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12 text-muted-foreground">
                    <p className="text-lg font-heading">No medium priority tasks</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="low">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {lowPriorityTasks.length > 0 ? (
                  lowPriorityTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      priority={task.priority}
                      dueDate={task.dueDate}
                      tags={task.tags}
                      isUrgent={task.isUrgent || false}
                    />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12 text-muted-foreground">
                    <p className="text-lg font-heading">No low priority tasks</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Footer area */}
        <footer className="mt-10 pt-6 border-t border-border text-center text-muted-foreground">
          <p className="caption">Task Manager © {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
