import UserController from '../controllers/user-controller.js';
import express from 'express';

const router = express.Router();

router.get('/users', UserController.getAll);

export default router;
