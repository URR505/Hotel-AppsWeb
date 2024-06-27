import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';

const router = Router();

router.post('/api/Acceso/register', registerUser);
router.post('/api/Acceso/login', loginUser);

export default router;
