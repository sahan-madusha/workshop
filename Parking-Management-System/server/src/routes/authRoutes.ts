import { Router } from 'express';
import { login, me } from '../controllers/authController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

// POST /api/auth/login - User Sign In
router.post('/login', login);

// GET /api/auth/me - Get current user profile (Protected)
router.get('/me', authenticateToken, me);

export default router;
