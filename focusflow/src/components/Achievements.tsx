// src/components/Achievements.tsx
'use client';

import { useContext } from 'react';
import { TaskContext } from '@/context/TaskContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function Achievements() {
  const { achievements } = useContext(TaskContext) ?? { achievements: [] };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          {achievements.length > 0 ? (
            <ul>
              {achievements.map((achievement, index) => (
                <li key={index} className="text-green-400 font-bold">{achievement}</li>
              ))}
            </ul>
          ) : (
            <p>No achievements yet. Keep completing tasks!</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}