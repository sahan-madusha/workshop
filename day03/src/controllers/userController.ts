import { Request, Response } from 'express';
import {
  getUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService
} from '../services/userService';

/**
 * CONTROLLER LAYER:
 * Simple functions that handle HTTP requests and send back responses.
 */

// GET /api/users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;
    const users = await getUsersService(search);
    res.json({ success: true, data: users });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// GET /api/users/:id
export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const user = await getUserByIdService(id);
    res.json({ success: true, data: user });
  } catch (error: any) {
    res.status(404).json({ success: false, error: error.message });
  }
};

// POST /api/users
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, role } = req.body;
    const newUser = await createUserService(name, email, role);
    res.status(201).json({ success: true, message: 'User created successfully', data: newUser });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// PUT /api/users/:id
export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, email, role } = req.body;
    const updatedUser = await updateUserService(id, name, email, role);
    res.json({ success: true, message: 'User updated successfully', data: updatedUser });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE /api/users/:id
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await deleteUserService(id);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
