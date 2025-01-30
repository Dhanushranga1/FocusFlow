// src/components/Sidebar.tsx
'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Sidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-64 p-4 glass-effect"
    >
      <Card>
        <CardHeader>
          <CardTitle className="glow-text">FocusFlow</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li>Home</li>
            <li>Tasks</li>
            <li>Time Grid</li>
            <li>Insights</li>
            <li>Settings</li>
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}