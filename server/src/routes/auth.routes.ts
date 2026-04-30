import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';

const router = Router();

router.post(
  '/register',
  validateBody([
    { field: 'name', required: true, minLength: 2, maxLength: 100 },
    { field: 'email', required: true, isEmail: true },
    { field: 'password', required: true, minLength: 6 },
  ]),
  register
);

router.post(
  '/login',
  validateBody([
    { field: 'email', required: true, isEmail: true },
    { field: 'password', required: true },
  ]),
  login
);

router.get('/me', authMiddleware, getMe);

export default router;
