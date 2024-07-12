// auth.routes.js
import { Router } from 'express';
import { registerUser, loginUser, getProfile, logoutUser, verifyToken } from '../controllers/auth.controller.js';

const router = Router();

router.post('/api/Acceso/register', registerUser);
router.post('/api/Acceso/login', loginUser);
router.get('/api/profile', getProfile);
router.post('/api/logout', logoutUser);
router.get('/api/verify-token', verifyToken);

export default router;
