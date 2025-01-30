// src/components/SocialFeed.tsx
'use client';

import { useContext } from 'react';
import { TaskContext } from '@/context/TaskContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function SocialFeed() {
  const { socialFeed } = useContext(TaskContext) ?? { socialFeed: [] };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <Card>
        <CardHeader>
          <CardTitle>Social Feed</CardTitle>
        </CardHeader>
        <CardContent>
          {socialFeed.length > 0 ? (
            <ul>
              {socialFeed.map((post, index) => (
                <li key={index} className="text-green-400 font-bold">
                  <span className="text-white">{post.user}:</span> {post.message} <span className="text-gray-400">({new Date(post.timestamp).toLocaleString()})</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No social updates yet.</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}