// lib/db.ts
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('mytasks.db');

export async function initDatabase() {
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      priority TEXT NOT NULL,
      dueDate TEXT,
      completed INTEGER NOT NULL DEFAULT 0
    );`
  );
}

export async function getTasks() {
  const result = await db.getAllAsync('SELECT * FROM tasks ORDER BY id DESC;', []);
  return result;
}

export async function addTask(name: string, priority: string, dueDate?: string) {
  await db.runAsync(
    'INSERT INTO tasks (name, priority, dueDate, completed) VALUES (?, ?, ?, 0);',
    [name, priority, dueDate || null]
  );
}

export async function updateTask(id: number, name: string, priority: string, dueDate?: string) {
  await db.runAsync(
    'UPDATE tasks SET name = ?, priority = ?, dueDate = ? WHERE id = ?;',
    [name, priority, dueDate || null, id]
  );
}

export async function toggleComplete(id: number, completed: boolean) {
  await db.runAsync('UPDATE tasks SET completed = ? WHERE id = ?;', [completed ? 1 : 0, id]);
}

export async function deleteTask(id: number) {
  await db.runAsync('DELETE FROM tasks WHERE id = ?;', [id]);
}
