import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    username: string;
    employee_id?: number | null;
    user_role_id?: number | null;
  };
}

/**
 * JWT Authentication Middleware
 * Validates 'Authorization: Bearer <token>' header and attaches decoded payload to req.user.
 */
export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No authentication token provided.',
      error: {
        code: 401,
        type: 'unauthorized',
      },
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'parking_system_super_secret_jwt_key_2026';
    const decoded = jwt.verify(token, secret) as any;
    req.user = decoded;
    next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
      error: {
        code: 401,
        type: 'invalid_token',
      },
    });
  }
};
