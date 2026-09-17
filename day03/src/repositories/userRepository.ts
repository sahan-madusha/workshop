import { db } from '../config/db';

/**
 * REPOSITORY LAYER:
 * Direct SQL queries against MySQL database.
 */

// 1. Get all users or search users
export const getAllUsersFromDb = async (search: string = '') => {
  if (search) {
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE name LIKE ? OR email LIKE ? ORDER BY id DESC',
      [`%${search}%`, `%${search}%`]
    );
    return rows;
  }
  const [rows] = await db.execute('SELECT * FROM users ORDER BY id DESC');
  return rows;
};

// 2. Get single user by ID
export const getUserByIdFromDb = async (id: number) => {
  const [rows]: any = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

// 3. Get single user by Email
export const getUserByEmailFromDb = async (email: string) => {
  const [rows]: any = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

// 4. Create new user
export const createUserInDb = async (name: string, email: string, role: string = 'user') => {
  const [result]: any = await db.execute(
    'INSERT INTO users (name, email, role) VALUES (?, ?, ?)',
    [name, email, role]
  );
  return { id: result.insertId, name, email, role };
};

// 5. Update user
export const updateUserInDb = async (id: number, name: string, email: string, role: string) => {
  await db.execute(
    'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?',
    [name, email, role, id]
  );
  return { id, name, email, role };
};

// 6. Delete user
export const deleteUserFromDb = async (id: number) => {
  await db.execute('DELETE FROM users WHERE id = ?', [id]);
};
