# TaskFlow

A full-stack task management application built with React and Node.js. 

## Tech Stack

**Frontend:**
- React (Vite)
- TypeScript
- TanStack Query (React Query) for state & caching
- Axios for API requests
- Vanilla CSS Modules (custom dark theme & glassmorphism)

**Backend:**
- Node.js & Express
- TypeScript
- Sequelize ORM + SQLite
- JWT for authentication
- bcryptjs for password hashing


## Local Development

The project is split into two directories: `client` and `server`. You need to run them simultaneously in two terminal windows.

### 1. Backend

```bash
cd server
npm install
npm run dev
```
The server runs on port 5050. 
### 2. Frontend

In a new terminal window:

```bash
cd client
npm install
npm run dev
```
The frontend runs on port 3000.

