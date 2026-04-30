export type TaskStatus = 'todo' | 'in_progress' | 'done';

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  status?: TaskStatus;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: TaskStatus;
}
