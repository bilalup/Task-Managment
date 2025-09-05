# Task Management App

A modern, intuitive task management application designed to help you organize, prioritize, and track daily tasks effortlessly—whether you're on desktop or mobile.

## Live Demo

[Live Demo](https://task-managment.bilalsi.com/)

## Features

- Add, update, and delete tasks
- Mark tasks as **complete** or **incomplete**
- Assign priority: **High**, **Medium**, **Low**
- Set due date reminders
- Organize via categories or labels
- Search and filter tasks (by status, priority, due date)
- Fully **responsive design**

## Tech Stack

| Layer    | Technology          |
| -------- | ------------------- |
| Frontend | React, Tailwind CSS |
| Backend  | Node.js, Express    |
| Database | MongoDB             |

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)

### Installation & Setup

```bash
# Clone the repo
git clone https://github.com/bilalup/Task-Managment.git
cd Task-Managment

# Install dependencies
cd server && npm install
cd ../client && npm install

# Run both client and server (in separate terminals):
cd server && npm run dev     # starts backend on default port (e.g., 5000)
cd client && npm start       # starts React app (e.g., port 3000)
```
