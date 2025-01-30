// src/components/Badges.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Badges() {
  const badges = ['10 Tasks Completed', '5 High-Priority Tasks', '3-Day Streak'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Badges</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center gap-2">
              <span>🏆</span>
              <p>{badge}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}