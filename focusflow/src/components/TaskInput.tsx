// src/components/TaskInput.tsx - Ensuring Task Saving to Database
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AnimatedContainer from './AnimatedContainer';

export default function TaskInput() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, deadline, priority }),
      });

      if (!response.ok) {
        throw new Error('Failed to save task');
      }

      setTitle('');
      setDescription('');
      setDeadline('');
      setPriority('Medium');
    } catch (err) {
      setError('Failed to save task. Please try again.');
    }
  };

  return (
    <AnimatedContainer>
      <Card>
        <CardHeader>
          <CardTitle>Add Task</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <Input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <Select
              value={priority}
              onValueChange={(value: 'Low' | 'Medium' | 'High') =>
                setPriority(value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" className="w-full">
              Add Task
            </Button>
          </form>
        </CardContent>
      </Card>
    </AnimatedContainer>
  );
}