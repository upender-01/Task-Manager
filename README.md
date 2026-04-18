# Task-Manager
Task Manager
# 📝 Task Manager App

A simple full-stack Task Manager application built using **React (Frontend)** and **Node.js + Express (Backend)**. It allows users to create, update, and delete tasks with a clean UI.

---

## 🚀 Live Demo

* 🔗 Frontend: https://task-manager-lkml.vercel.app
* 🔗 Backend API: https://task-manager-00-9ihe.onrender.com

---

## ✨ Features

* ✅ Add new tasks
* 📋 View all tasks
* ✔️ Mark tasks as completed / incomplete
* ❌ Delete tasks
* ⚡ Real-time UI updates
* 🌐 Deployed using Vercel (Frontend) & Render (Backend)

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Fetch API

### Backend

* Node.js
* Express.js
* CORS

---

## 📂 Project Structure

```
task-manager/
│
├── frontend/       # React App
│   ├── src/
│   └── ...
│
├── backend/        # Express Server
│   ├── server.js
│   └── ...
│
└── README.md
```

---

## ⚙️ API Endpoints

| Method | Endpoint   | Description        |
| ------ | ---------- | ------------------ |
| GET    | /          | Health check       |
| GET    | /tasks     | Get all tasks      |
| POST   | /tasks     | Create a new task  |
| PATCH  | /tasks/:id | Update task status |
| DELETE | /tasks/:id | Delete a task      |

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
node server.js
```

Server runs on:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔗 API Usage Example

```js
// Get tasks
fetch("https://task-manager-00-9ihe.onrender.com/tasks")

// Add task
fetch("https://task-manager-00-9ihe.onrender.com/tasks", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "New Task" })
});
```

---

## ⚠️ Limitations

* Uses **in-memory storage** (tasks will reset when server restarts)
* No authentication implemented

---

## 🚀 Future Improvements

* 🔐 User authentication (JWT)
* 💾 Database integration (MongoDB)
* ✏️ Edit task title
* 📊 Task filters (completed / pending)

---

## 👨‍💻 Author

**Upender Bhukya**
Aspiring Software Engineer

---

## ⭐ Contributing

Feel free to fork this repo and improve it!

---

## 📜 License

This project is open-source and available under the MIT License.
