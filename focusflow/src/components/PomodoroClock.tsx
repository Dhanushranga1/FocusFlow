// src/components/PomodoroClock.tsx
'use client';

import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import AnimatedContainer from './AnimatedContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PomodoroClock() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const startTimer = () => setIsRunning(true);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <AnimatedContainer>
      <Card>
        <CardHeader>
          <CardTitle>Pomodoro Timer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold">
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </h2>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex gap-2">
            <Button onClick={startTimer} disabled={isRunning}>
              Start
            </Button>
            <Button onClick={resetTimer} variant="outline">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </AnimatedContainer>
  );
}