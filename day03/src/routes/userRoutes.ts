import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController';

const router = Router();

/**
 * ROUTE LAYER:
 * Maps URL paths to controller functions.
 */

// GET all users OR search: GET /api/users
router.get('/', getUsers);

// GET single user: GET /api/users/1
router.get('/:id', getUserById);

// POST create user: POST /api/users
router.post('/', createUser);

// PUT update user: PUT /api/users/1
router.put('/:id', updateUser);

// DELETE user: DELETE /api/users/1
router.delete('/:id', deleteUser);

export default router;
