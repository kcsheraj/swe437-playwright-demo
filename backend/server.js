// A tiny Express API that stores tasks in memory.
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const startingTasks = () => [
  { id: 1, title: 'Read the Playwright docs', done: true },
  { id: 2, title: 'Write my first test', done: false },
];
let tasks = startingTasks();
let nextId = 3;

// Get all tasks
app.get('/api/tasks', (req, res) => res.json(tasks));

// Add a task
app.post('/api/tasks', (req, res) => {
  const title = (req.body.title || '').trim();
  if (!title) return res.status(400).json({ error: 'Please type a task first' });
  const task = { id: nextId++, title, done: false };
  tasks.push(task);
  res.status(201).json(task);
});

// Mark a task done / not done
app.patch('/api/tasks/:id', (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (task) task.done = !task.done;
  res.json(task);
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  tasks = tasks.filter((t) => t.id !== Number(req.params.id));
  res.status(204).end();
});

// For tests only: put the starting tasks back
app.post('/api/reset', (req, res) => {
  tasks = startingTasks();
  nextId = 3;
  res.json({ ok: true });
});

app.listen(3001, () => console.log('API running on http://localhost:3001'));
