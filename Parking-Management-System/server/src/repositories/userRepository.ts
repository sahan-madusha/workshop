import { db } from '../config/db';

export interface UserRow {
  id: number;
  username: string;
  password?: string;
  last_login?: string | Date | null;
  employee_id?: number | null;
  user_role_id?: number | null;
}

// 1. Get user by username
export const getUserByUsernameFromDb = async (username: string): Promise<UserRow | null> => {
  const [rows]: any = await db.execute(
    'SELECT id, username, password, last_login, employee_id, user_role_id FROM `user` WHERE username = ?',
    [username]
  );
  return rows[0] || null;
};

// 2. Get user by ID
export const getUserByIdFromDb = async (id: number): Promise<UserRow | null> => {
  const [rows]: any = await db.execute(
    'SELECT id, username, last_login, employee_id, user_role_id FROM `user` WHERE id = ?',
    [id]
  );
  return rows[0] || null;
};

// 3. Update last login timestamp
export const updateLastLoginInDb = async (id: number): Promise<void> => {
  await db.execute('UPDATE `user` SET last_login = NOW() WHERE id = ?', [id]);
};

// 4. Create user (for seeding / admin setup)
export const createUserInDb = async (userData: {
  username: string;
  passwordHash: string;
  employee_id?: number | null;
  user_role_id?: number | null;
}): Promise<UserRow> => {
  const { username, passwordHash, employee_id = null, user_role_id = null } = userData;
  const [result]: any = await db.execute(
    'INSERT INTO `user` (username, password, employee_id, user_role_id) VALUES (?, ?, ?, ?)',
    [username, passwordHash, employee_id, user_role_id]
  );
  return {
    id: result.insertId,
    username,
    employee_id,
    user_role_id,
  };
};
