// src/app/api/tasks/route.ts - Fixing getDB Reference Error and Ensuring Task Table Creation
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
  const { title, description, priority, deadline } = await req.json();
  const db = await getDB();
  
  const result = await db.run(
    'INSERT INTO tasks (title, description, priority, status, deadline) VALUES (?, ?, ?, ?, ?)',
    [title, description, priority, 'To-Do', deadline]
  );
  
  return NextResponse.json({ success: true, id: result.lastID });
}

export async function GET() {
  const db = await getDB();
  const tasks = await db.all('SELECT * FROM tasks ORDER BY createdAt DESC');
  return NextResponse.json(tasks);
}
