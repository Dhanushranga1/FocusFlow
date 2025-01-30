// src/context/TaskContext.tsx
'use client';

import { createContext, useState, ReactNode, useEffect } from 'react';

interface Task {
  id: number;
  title: string;
  description?: string;
  deadline?: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'To-Do' | 'In Progress' | 'Completed';
  scheduledTime?: string;
  xp?: number;
  completedAt?: string;
}

interface SocialFeature {
  user: string;
  message: string;
  timestamp: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'status' | 'xp' | 'completedAt'>) => void;
  updateTask: (id: number, updates: Partial<Task>) => void;
  deleteTask: (id: number) => void;
  getNextSuggestedTask: () => Task | null;
  completeTask: (id: number) => void;
  xp: number;
  streak: number;
  achievements: string[];
  leaderboard: { user: string; xp: number }[];
  notifications: string[];
  socialFeed: SocialFeature[];
  addSocialPost: (user: string, message: string) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [xp, setXp] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [leaderboard, setLeaderboard] = useState<{ user: string; xp: number }[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [socialFeed, setSocialFeed] = useState<SocialFeature[]>([]);

  useEffect(() => {
    const lastCompletionDate = localStorage.getItem('lastCompletionDate');
    const today = new Date().toISOString().split('T')[0];
    if (lastCompletionDate !== today) {
      setStreak(0);
    }
  }, []);

  const addTask = (task: Omit<Task, 'id' | 'status' | 'xp' | 'completedAt'>) => {
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), status: 'To-Do', xp: 10, completedAt: '', ...task },
    ]);
  };

  const updateTask = (id: number, updates: Partial<Task>) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updates } : task)));
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const getNextSuggestedTask = (): Task | null => {
    const pendingTasks = tasks.filter(task => task.status !== 'Completed');
    return pendingTasks.sort((a, b) => {
      const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })[0] || null;
  };

  const completeTask = (id: number) => {
    const today = new Date().toISOString().split('T')[0];
    setTasks((prev) => prev.map((task) =>
      task.id === id ? { ...task, status: 'Completed', completedAt: today } : task
    ));
    setXp((prevXp) => prevXp + 50);
    
    const lastCompletionDate = localStorage.getItem('lastCompletionDate');
    if (lastCompletionDate === today) {
      setStreak((prevStreak) => prevStreak + 1);
    } else {
      setStreak(1);
    }
    localStorage.setItem('lastCompletionDate', today);
    checkAchievements();
    updateLeaderboard("User", xp + 50);
    addNotification("Task completed successfully!");
  };

  const checkAchievements = () => {
    const newAchievements = [];
    if (streak >= 5) newAchievements.push("5-Day Streak Achieved!");
    if (xp >= 500) newAchievements.push("500 XP Milestone Reached!");
    if (tasks.filter(task => task.status === 'Completed').length >= 10) newAchievements.push("Completed 10 Tasks!");
    setAchievements([...new Set([...achievements, ...newAchievements])]);
  };

  const updateLeaderboard = (user: string, newXp: number) => {
    setLeaderboard((prev) => {
      const updated = prev.filter(entry => entry.user !== user);
      return [...updated, { user, xp: newXp }].sort((a, b) => b.xp - a.xp);
    });
  };

  const addNotification = (message: string) => {
    setNotifications((prev) => [...prev, message]);
  };

  const addSocialPost = (user: string, message: string) => {
    setSocialFeed((prev) => [...prev, { user, message, timestamp: new Date().toISOString() }]);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, getNextSuggestedTask, completeTask, xp, streak, achievements, leaderboard, notifications, socialFeed, addSocialPost }}>
      {children}
    </TaskContext.Provider>
  );
}
