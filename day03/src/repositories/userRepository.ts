import { db } from '../config/db';

/**
 * REPOSITORY LAYER:
 * Simple functions that run SQL queries directly on MySQL.
 */

// 1. Get all users or search users
export const getAllUsersFromDb = async (search: string = '') => {
  const connection = await db;
  if (search) {
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE name LIKE ? OR email LIKE ? ORDER BY id DESC',
      [`%${search}%`, `%${search}%`]
    );
    return rows;
  }
  const [rows] = await connection.execute('SELECT * FROM users ORDER BY id DESC');
  return rows;
};

// 2. Get single user by ID
export const getUserByIdFromDb = async (id: number) => {
  const connection = await db;
  const [rows]: any = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

// 3. Get single user by Email
export const getUserByEmailFromDb = async (email: string) => {
  const connection = await db;
  const [rows]: any = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

// 4. Create new user
export const createUserInDb = async (name: string, email: string, role: string = 'user') => {
  const connection = await db;
  const [result]: any = await connection.execute(
    'INSERT INTO users (name, email, role) VALUES (?, ?, ?)',
    [name, email, role]
  );
  return { id: result.insertId, name, email, role };
};

// 5. Update user
export const updateUserInDb = async (id: number, name: string, email: string, role: string) => {
  const connection = await db;
  await connection.execute(
    'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?',
    [name, email, role, id]
  );
  return { id, name, email, role };
};

// 6. Delete user
export const deleteUserFromDb = async (id: number) => {
  const connection = await db;
  await connection.execute('DELETE FROM users WHERE id = ?', [id]);
};
