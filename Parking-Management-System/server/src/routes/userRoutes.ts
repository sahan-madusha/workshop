import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  deleteUser
} from '../controllers/userController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

/**
 * USER ROUTES (Protected by JWT Middleware)
 */

// GET all users OR search: GET /api/users
router.get('/', authenticateToken, getUsers);

// GET single user: GET /api/users/1
router.get('/:id', authenticateToken, getUserById);

// POST create user: POST /api/users
router.post('/', authenticateToken, createUser);

// DELETE user: DELETE /api/users/1
router.delete('/:id', authenticateToken, deleteUser);

export default router;
