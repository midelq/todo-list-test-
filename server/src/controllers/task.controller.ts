import { Response } from 'express';
import Task, { TaskStatus } from '../models/Task';
import { AuthRequest } from '../types';

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.query;

    const where: any = { userId: req.userId };
    if (status && ['todo', 'in_progress', 'done'].includes(status as string)) {
      where.status = status;
    }

    const tasks = await Task.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    res.json({ tasks });
  } catch (error) {
    console.error('GetTasks error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTaskById = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.userId },
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ task });
  } catch (error) {
    console.error('GetTask error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.create({
      title,
      description: description || '',
      status: status || 'todo',
      userId: req.userId!,
    });

    res.status(201).json({ task });
  } catch (error: any) {
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map((e: any) => e.message);
      return res.status(400).json({ message: 'Validation error', errors: messages });
    }
    console.error('CreateTask error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.userId },
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const { title, description, status } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status as TaskStatus;

    await task.save();

    res.json({ task });
  } catch (error: any) {
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map((e: any) => e.message);
      return res.status(400).json({ message: 'Validation error', errors: messages });
    }
    console.error('UpdateTask error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.userId },
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('DeleteTask error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
