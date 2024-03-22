import UserController from '../controllers/user-controller.js';
import { registerValidation } from '../validations/auth.js';
import { checkAuth } from '../utils/checkAuth.js';
import express from 'express';

const router = express.Router();

router.get('/auth/me', checkAuth, UserController.getMe);
router.post('/auth/login', UserController.authorization);
router.post('/auth/register', registerValidation, UserController.registration);

export default router;
