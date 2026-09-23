import {
  getAllUsersFromDb,
  getUserByIdFromDb,
  getUserByEmailFromDb,
  createUserInDb,
  updateUserInDb,
  deleteUserFromDb
} from '../repositories/userRepository';

/**
 * SERVICE LAYER:
 * Simple functions for business rules and validations.
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

// Create new user with validation
export const createUserService = async (name: string, email: string, role?: string) => {
  // Simple validation checks
  if (!name) {
    throw new Error('Name is required');
  }

  if (!email || !email.includes('@')) {
    throw new Error('Valid email is required');
  }

  // Check if email already exists
  const existingUser = await getUserByEmailFromDb(email);
  if (existingUser) {
    throw new Error('Email is already registered');
  }

  return await createUserInDb(name, email, role || 'user');
};

// Update user
export const updateUserService = async (id: number, name: string, email: string, role: string) => {
  // Check if user exists
  const existingUser = await getUserByIdFromDb(id);
  if (!existingUser) {
    throw new Error(`User with ID ${id} not found`);
  }

  return await updateUserInDb(id, name, email, role);
};

// Delete user
export const deleteUserService = async (id: number) => {
  // Check if user exists
  const existingUser = await getUserByIdFromDb(id);
  if (!existingUser) {
    throw new Error(`User with ID ${id} not found`);
  }

  await deleteUserFromDb(id);
};
