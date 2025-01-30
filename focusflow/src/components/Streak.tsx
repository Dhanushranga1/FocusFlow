// src/components/Streak.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Streak() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // Fetch streak from local storage or backend
    const savedStreak = localStorage.getItem('streak');
    if (savedStreak) {
      setStreak(parseInt(savedStreak));
    }
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Streak</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{streak} 🔥</p>
      </CardContent>
    </Card>
  );
}