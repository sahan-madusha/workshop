import bcrypt from 'bcryptjs';
import {
  getAllUsersFromDb,
  getUserByIdFromDb,
  getUserByUsernameFromDb,
  createUserInDb,
  deleteUserFromDb
} from '../repositories/userRepository';

/**
 * USER SERVICE LAYER:
 * Business rules and validations for user management.
 */

// Get all users or search
export const getUsersService = async (search?: string) => {
  return await getAllUsersFromDb(search);
};

// Get single user by ID
export const getUserByIdService = async (id: number) => {
  const user = await getUserByIdFromDb(id);
  if (!user) {
    throw new Error(`User with ID ${id} not found`);
  }
  return user;
};

// Create new user with validation and bcrypt hashing
export const createUserService = async (data: {
  username: string;
  password: string;
  employee_id?: number | null;
  user_role_id?: number | null;
}) => {
  const { username, password, employee_id, user_role_id } = data;

  if (!username || !username.trim()) {
    throw new Error('Username is required.');
  }

  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }

  // Check if username already exists
  const existingUser = await getUserByUsernameFromDb(username);
  if (existingUser) {
    throw new Error('Username is already taken.');
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  return await createUserInDb({
    username: username.trim(),
    passwordHash,
    employee_id: employee_id ? Number(employee_id) : null,
    user_role_id: user_role_id ? Number(user_role_id) : null,
  });
};

// Delete user
export const deleteUserService = async (id: number) => {
  const existingUser = await getUserByIdFromDb(id);
  if (!existingUser) {
    throw new Error(`User with ID ${id} not found`);
  }
  await deleteUserFromDb(id);
};
