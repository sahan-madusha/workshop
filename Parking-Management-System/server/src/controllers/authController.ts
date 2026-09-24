import { Request, Response } from 'express';
import { loginService } from '../services/authService';
import { AuthRequest } from '../middlewares/authMiddleware';
import { getUserByIdFromDb } from '../repositories/userRepository';

/**
 * AUTH CONTROLLER LAYER:
 * Handles sign in and token verification requests.
 */

// POST /api/auth/login or /api/login
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const result = await loginService(username, password);
    res.json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Login failed',
      error: {
        code: 400,
        type: 'authentication_error',
      },
    });
  }
};

// GET /api/auth/me (Protected route to fetch current user profile)
export const me = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
    const user = await getUserByIdFromDb(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
