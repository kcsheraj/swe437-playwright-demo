import { useEffect, useState } from 'react';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  // Load the tasks from the backend when the page opens
  useEffect(() => {
    fetch('/api/tasks').then((res) => res.json()).then(setTasks);
  }, []);

  async function addTask(e) {
    e.preventDefault();
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error);
    setError('');
    setTasks([...tasks, data]);
    setTitle('');
  }

  function toggleTask(id) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    fetch(`/api/tasks/${id}`, { method: 'PATCH' });
  }

  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
    fetch(`/api/tasks/${id}`, { method: 'DELETE' });
  }

  const tasksLeft = tasks.filter((t) => !t.done).length;

  return (
    <main className="card">
      <h1>TaskBoard</h1>

      <form onSubmit={addTask}>
        <input
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {error && <p className="error">{error}</p>}

      <ul>
        {tasks.map((t) => (
          <li key={t.id} className={t.done ? 'done' : ''}>
            <label>
              <input type="checkbox" checked={t.done} onChange={() => toggleTask(t.id)} />
              {t.title}
            </label>
            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <p>{tasksLeft} task(s) left</p>
    </main>
  );
}
