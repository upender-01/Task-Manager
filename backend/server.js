const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({
    origin:"https://task-manager-lkml.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json()); 

// In-memory database
let tasks = [];
app.get("/" , (req, res)=>{
    res.send("Backend is running");
});
// GET /tasks - to return all tasks 
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// POST /tasks - create a new task
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    
    // Validation of the input type 
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required and must be a valid string.' });
    }

    const newTask = {
        id: Date.now().toString(), // Simple unique identifier
        title: title.trim(),
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PATCH /tasks/:id - Update a task status
app.patch('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    
    const task = tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ error: 'Task not found.' });
    
    if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Completed status must be a boolean.' });
    }

    task.completed = completed;
    res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = tasks.length;
    
    tasks = tasks.filter(t => t.id !== id);
    
    if (tasks.length === initialLength) {
        return res.status(404).json({ error: 'Task not found.' });
    }
    
    res.status(204).send(); // 204 No Content
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
