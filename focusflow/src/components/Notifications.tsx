// src/components/Notifications.tsx
'use client';

import { useContext } from 'react';
import { TaskContext } from '@/context/TaskContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function Notifications() {
  const { notifications } = useContext(TaskContext) ?? { notifications: [] };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.length > 0 ? (
            <ul>
              {notifications.map((notification, index) => (
                <li key={index} className="text-blue-400 font-bold">{notification}</li>
              ))}
            </ul>
          ) : (
            <p>No new notifications.</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}