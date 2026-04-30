import { Router } from 'express';
import { getTasks, getTaskById, createTask, updateTask, deleteTask } from '../controllers/task.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', getTasks);
router.get('/:id', getTaskById);

router.post(
  '/',
  validateBody([
    { field: 'title', required: true, minLength: 1, maxLength: 255 },
  ]),
  createTask
);

router.put(
  '/:id',
  validateBody([
    { field: 'title', minLength: 1, maxLength: 255 },
  ]),
  updateTask
);

router.delete('/:id', deleteTask);

export default router;
