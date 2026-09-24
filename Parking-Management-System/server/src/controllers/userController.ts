import { Request, Response } from 'express';
import {
  getUsersService,
  getUserByIdService,
  createUserService,
  deleteUserService
} from '../services/userService';

/**
 * USER CONTROLLER LAYER:
 * Handles HTTP endpoints for User Management.
 */

// GET /api/users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;
    const users = await getUsersService(search);
    res.json({ success: true, data: users });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET /api/users/:id
export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const user = await getUserByIdService(id);
    res.json({ success: true, data: user });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// POST /api/users (Add user)
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, employee_id, user_role_id } = req.body;
    const newUser = await createUserService({
      username,
      password,
      employee_id,
      user_role_id,
    });
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE /api/users/:id
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await deleteUserService(id);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
