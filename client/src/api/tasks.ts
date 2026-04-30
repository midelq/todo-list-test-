import api from './client';
import type { Task, CreateTaskData, UpdateTaskData, TaskStatus } from '../types';

export const tasksApi = {
  getAll: async (status?: TaskStatus): Promise<{ tasks: Task[] }> => {
    const params = status ? { status } : {};
    const response = await api.get('/tasks', { params });
    return response.data;
  },

  getById: async (id: number): Promise<{ task: Task }> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  create: async (data: CreateTaskData): Promise<{ task: Task }> => {
    const response = await api.post('/tasks', data);
    return response.data;
  },

  update: async (id: number, data: UpdateTaskData): Promise<{ task: Task }> => {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};
