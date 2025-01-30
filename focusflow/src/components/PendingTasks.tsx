// src/components/PendingTasks.tsx - Displaying Pending Tasks with Status Bar
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

interface Task {
  id: number;
  title: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'To-Do' | 'In Progress' | 'Completed';
}

export default function PendingTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setTasks(data.filter((task: Task) => task.status !== 'Completed'));
    }
    fetchTasks();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <Card>
        <CardHeader>
          <CardTitle>Pending Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          {tasks.length > 0 ? (
            <ul className="space-y-4">
              {tasks.map((task) => (
                <li key={task.id} className="flex flex-col gap-2">
                  <p className="font-bold text-lg">{task.title}</p>
                  <Progress value={task.status === 'In Progress' ? 50 : 10} className="h-2" />
                  <p className="text-sm text-gray-400">Priority: {task.priority}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No pending tasks available.</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
