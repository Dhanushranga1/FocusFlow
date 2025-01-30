
// src/components/XPTracker.tsx
'use client';

import { useContext } from 'react';
import { TaskContext } from '@/context/TaskContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

export default function XPTracker() {
  const { xp, streak } = useContext(TaskContext) ?? { xp: 0, streak: 0 };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <Card>
        <CardHeader>
          <CardTitle>XP & Streaks</CardTitle>
        </CardHeader>
        <CardContent>
          <p>XP: {xp}</p>
          <Progress value={(xp % 100) / 100 * 100} />
          <p>Daily Streak: {streak}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
