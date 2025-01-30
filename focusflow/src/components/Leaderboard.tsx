// src/components/Leaderboard.tsx
'use client';

import { useContext } from 'react';
import { TaskContext } from '@/context/TaskContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function Leaderboard() {
  const { leaderboard } = useContext(TaskContext) ?? { leaderboard: [] };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <Card>
        <CardHeader>
          <CardTitle>Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          {leaderboard.length > 0 ? (
            <ul>
              {leaderboard.map((entry, index) => (
                <li key={index} className="font-bold text-yellow-400">{index + 1}. {entry.user} - {entry.xp} XP</li>
              ))}
            </ul>
          ) : (
            <p>No leaderboard data yet.</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
