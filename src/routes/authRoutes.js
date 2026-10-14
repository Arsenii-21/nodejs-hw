import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
} from '../controllers/authController.js';
import { loginUserSchema, registerUserSchema } from '../validations/authValidation.js';

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const router = Router();

router.post(
  '/auth/register',
  celebrate(registerUserSchema),
  asyncHandler(registerUser),
);
router.post('/auth/login', celebrate(loginUserSchema), asyncHandler(loginUser));
router.post('/auth/refresh', asyncHandler(refreshUserSession));
router.post('/auth/logout', asyncHandler(logoutUser));

export default router;
