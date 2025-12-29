#  MERN Task Management System  Live Link: [https://task-hub-snowy.vercel.app/](https://task-hub-snowy.vercel.app/).

A modern, production-ready Task Management application built with the MERN stack (MongoDB, Express, React, Node.js). Features secure authentication, real-time UI updates, and advanced productivity insights.

##  Features

###  Authentication & Security
- **JWT Authentication**: Secure login/registration with HTTP-only cookies (or local storage fallback).
- **Protected Routes**: Middleware to ensure only authenticated users access private data.
- **Password Hashing**: Bcrypt implementation for user security.

###  Task Management
- **CRUD Operations**: Create, Read, Update, and Delete tasks.
- **Filtering**: Filter tasks by Status (Todo, In Progress, Done) and Priority (Low, Medium, High).
- **Responsive UI**: Built with Tailwind CSS for mobile and desktop.

###  Productivity Insights
- **Dashboard Analytics**: Visual breakdown of task completion.
- **Work Persona**: Gamified "Persona" based on your task habits (e.g., "Firefighter", "Zen Master").
- **Eisenhower Matrix**: Visual distribution of tasks by urgency and importance.
- **Interactive Charts**: Built with Framer Motion for smooth animations.

##  Tech Stack

**Frontend:**
- React 19
- Vite (Build Tool)
- Tailwind CSS (Styling)
- Framer Motion (Animations)
- React Router DOM (Routing)
- React Hot Toast (Notifications)

**Backend:**
- Node.js & Express
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- Bcryptjs

##  Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas Account (or local MongoDB)

### 1. Clone the Repository
`bash
git clone <your-repo-url>
cd Task-3
` 

### 2. Install Dependencies
Install dependencies for both root, frontend, and backend:
`bash
# Root
npm install

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
` 

### 3. Environment Setup

**Backend (backend/.env):**
`env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=30d
CORS_ORIGIN=http://localhost:5173
` 

**Frontend (frontend/.env):**
*(Optional for local dev, required for production)*
`env
VITE_API_BASE_URL=http://localhost:5000
` 

### 4. Run Locally
From the root directory:
`bash
npm run dev
` 
This will start both the Backend (Port 5000) and Frontend (Port 5173) concurrently.

##  Deployment

This project is configured for split deployment:
- **Frontend**: Vercel
- **Backend**: Render

 **[Read the Deployment Guide (DEPLOY.md)](DEPLOY.md)** for step-by-step instructions.

##  Project Structure

` 
Task-3/
 backend/             # Express API
    src/
       controllers/ # Request handlers
       models/      # Mongoose schemas
       routes/      # API routes
       middleware/  # Auth & Error handling
 frontend/            # React App
    src/
       components/  # Reusable UI components
       pages/       # Full page views
       context/     # Auth state management
       lib/         # API utilities
 DEPLOY.md            # Deployment instructions
` 


