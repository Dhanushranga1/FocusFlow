// src/components/ScheduleOverview.tsx
'use client';

import { useContext } from 'react';
import { TaskContext } from '@/context/TaskContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedContainer from './AnimatedContainer';

export default function ScheduleOverview() {
  const { tasks } = useContext(TaskContext);

  return (
    <AnimatedContainer>
      <Card>
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {tasks.map((task, index) => (
            <AnimatedContainer key={task.id} delay={index * 0.1}>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold">{task.title}</h3>
                <p>{task.description}</p>
                <p>Deadline: {task.deadline}</p>
                <p>Priority: {task.priority}</p>
              </div>
            </AnimatedContainer>
          ))}
        </CardContent>
      </Card>
    </AnimatedContainer>
  );
}