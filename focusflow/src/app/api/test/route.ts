// src/app/api/tasks/route.ts
import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function getDB() {
  return open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
}

export async function GET() {
  const db = await getDB();
  const tasks = await db.all('SELECT * FROM tasks');
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const { title, description, deadline, priority, scheduledTime } = await req.json();
  const db = await getDB();
  const result = await db.run(
    'INSERT INTO tasks (title, description, deadline, priority, status, scheduledTime, xp) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [title, description, deadline, priority, 'To-Do', scheduledTime, 10]
  );
  return NextResponse.json({ id: result.lastID, title, description, deadline, priority, status: 'To-Do', scheduledTime, xp: 10 });
}

export async function PUT(req: Request) {
  const { id, updates } = await req.json();
  const db = await getDB();
  await db.run(
    'UPDATE tasks SET title = ?, description = ?, deadline = ?, priority = ?, status = ?, scheduledTime = ?, xp = ? WHERE id = ?',
    [updates.title, updates.description, updates.deadline, updates.priority, updates.status, updates.scheduledTime, updates.xp, id]
  );
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const db = await getDB();
  await db.run('DELETE FROM tasks WHERE id = ?', id);
  return NextResponse.json({ success: true });
}