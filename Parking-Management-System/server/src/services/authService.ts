import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  getUserByUsernameFromDb,
  updateLastLoginInDb
} from '../repositories/userRepository';

/**
 * AUTH SERVICE:
 * Logic for authenticating users, password verification, and JWT generation.
 */
export const loginService = async (username: string, password: string) => {
  if (!username || !password) {
    throw new Error('Username and password are required.');
  }

  const user = await getUserByUsernameFromDb(username);
  if (!user) {
    throw new Error('Invalid username or password.');
  }

  // Check password (bcrypt or fallback plain text check)
  let isMatch = false;
  if (user.password) {
    if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      // Plain text fallback if entered directly into DB
      isMatch = user.password === password;
    }
  }

  if (!isMatch) {
    throw new Error('Invalid username or password.');
  }

  // Update last_login timestamp
  await updateLastLoginInDb(user.id);

  // Generate JWT token
  const secret = process.env.JWT_SECRET || 'parking_system_super_secret_jwt_key_2026';
  const expiresIn = process.env.JWT_EXPIRES_IN || '24h';

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      employee_id: user.employee_id,
      user_role_id: user.user_role_id,
    },
    secret,
    { expiresIn: expiresIn as any }
  );

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      employee_id: user.employee_id,
      user_role_id: user.user_role_id,
      last_login: new Date().toISOString(),
    },
  };
};
