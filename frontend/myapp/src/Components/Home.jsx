import React, { useState, useEffect } from 'react';

const API_URL = 'https://task-manager-00-9ihe.onrender.com';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


     const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/tasks`);
      if (!res.ok) throw new Error('Failed to fetch tasks.');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }; 
  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    try {
      setError(null);
      const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error('Failed to add task.');
      
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
      setTitle(''); // Reset input
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleComplete = async (id, currentStatus) => {
    try {
      setError(null);
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !currentStatus }),
      });
      if (!res.ok) throw new Error('Failed to update task.');
      
      const updatedTask = await res.json();
      setTasks(tasks.map(t => (t.id === id ? updatedTask : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      setError(null);
      const res = await fetch(`${API_URL}/task/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete task.');
      
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 font-sans bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Task Manager</h2>
      
      {error && (
        <div className="p-3 mb-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={addTask} className="flex gap-3 mb-6">
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="What needs to be done?"
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          disabled={loading}
        />
        <button 
          type="submit" 
          disabled={loading || !title.trim()} 
          className="px-5 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Add
        </button>
      </form>

      {loading && tasks.length === 0 ? (
        <p className="text-gray-500 text-center animate-pulse">Loading tasks...</p>
      ) : (
        <ul className="space-y-2">
          {tasks.length === 0 && (
            <p className="text-gray-500 text-center italic py-4">No tasks yet. Add one above!</p>
          )}
          
          {tasks.map(task => (
            <li 
              key={task.id} 
              className="flex justify-between items-center p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => toggleComplete(task.id, task.completed)}
                  className="w-5 h-5 cursor-pointer accent-blue-600"
                />
                <span className={task.completed ? 'line-through text-gray-400' : 'text-gray-800 font-medium'}>
                  {task.title}
                </span>
              </div>
              <button 
                onClick={() => deleteTask(task.id)} 
                className="text-red-500 hover:text-red-700 font-bold p-1 rounded transition-colors"
                aria-label="Delete task"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
