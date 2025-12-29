# Deployment Guide

This project is split into two parts: `backend` (Node.js/Express) and `frontend` (React/Vite). You will need to deploy them separately.

## 1. Deploy Backend (Render.com)

We recommend using **Render** for the backend because it's easy to set up for Node.js apps.

1.  Push your code to GitHub.
2.  Go to [Render Dashboard](https://dashboard.render.com/).
3.  Click **New +** -> **Web Service**.
4.  Connect your GitHub repository.
5.  **Configure the service**:
    *   **Name**: `task-app-backend` (or similar)
    *   **Root Directory**: `backend` (Important!)
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
6.  **Environment Variables** (Scroll down to "Advanced"):
    *   `MONGODB_URI`: Your MongoDB connection string (from MongoDB Atlas).
    *   `JWT_SECRET`: A long random string (e.g., generated via `openssl rand -hex 32`).
    *   `CORS_ORIGIN`: `*` (initially, to test) OR your frontend URL (once deployed).
7.  Click **Create Web Service**.
8.  Wait for the deployment to finish. Copy the **Backend URL** (e.g., `https://task-app-backend.onrender.com`).

## 2. Deploy Frontend (Vercel)

We recommend **Vercel** for the frontend.

1.  Go to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  **Configure the project**:
    *   **Framework Preset**: Vite (should be auto-detected).
    *   **Root Directory**: Click "Edit" and select `frontend`.
5.  **Environment Variables**:
    *   `VITE_API_BASE_URL`: Paste your **Backend URL** from step 1 (e.g., `https://task-app-backend.onrender.com`).
6.  Click **Deploy**.
7.  Wait for the deployment to finish. Copy the **Frontend URL** (e.g., `https://task-app-frontend.vercel.app`).

## 3. Final Configuration

1.  Go back to your **Render Dashboard** (Backend).
2.  Update the `CORS_ORIGIN` environment variable to your **Frontend URL** (e.g., `https://task-app-frontend.vercel.app`).
    *   *Note: Remove any trailing slashes.*
3.  Render will automatically redeploy the backend.

## Troubleshooting

*   **CORS Errors**: Ensure `CORS_ORIGIN` in Render matches your Vercel URL exactly (no trailing slash).
*   **API Connection Errors**: Ensure `VITE_API_BASE_URL` in Vercel is correct (no trailing slash, e.g., `https://your-backend.onrender.com`).
*   **White Screen on Refresh**: The `vercel.json` file in the `frontend` folder handles this by redirecting all routes to `index.html`.
