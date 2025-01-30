// src/app/api/chat/route.ts - Fixing AI Chat Task Retrieval and Task Saving Issue
import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function getDB() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      priority TEXT CHECK (priority IN ('Low', 'Medium', 'High')),
      status TEXT CHECK (status IN ('To-Do', 'In Progress', 'Completed')) DEFAULT 'To-Do',
      deadline TEXT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  return db;
}

export async function POST(req: Request) {
  const { message, task } = await req.json();
  const db = await getDB();
  
  if (task) {
    // Saving task to the database if provided
    const { title, description, priority, deadline } = task;
    await db.run(
      'INSERT INTO tasks (title, description, priority, status, deadline) VALUES (?, ?, ?, ?, ?)',
      [title, description, priority, 'To-Do', deadline]
    );
  }

  const tasks = await db.all('SELECT title, priority, status FROM tasks WHERE status != "Completed" ORDER BY priority DESC');
  
  let formattedTasks = "No pending tasks available.";
  if (tasks.length > 0) {
    formattedTasks = tasks.map(task => `${task.title} | Priority: ${task.priority} | Status: ${task.status}`).join('\n');
  }

  const aiPrompt = `The user has the following pending tasks:\n${formattedTasks}\nBased on priority and urgency, suggest the best task to work on next.`;

  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3:latest',
        prompt: aiPrompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json({ response: data.response });
  } catch (error) {
    console.error('Error in /api/chat:', error);
    return NextResponse.json(
      { error: 'Failed to fetch response from Ollama' },
      { status: 500 }
    );
  }
}
