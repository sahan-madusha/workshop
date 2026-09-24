import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

async function seed() {
  const host = process.env.DB_HOST || '127.0.0.1';
  const port = Number(process.env.DB_PORT) || 3306;
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'parking_db';

  console.log(`📡 Connecting to MySQL at ${host}:${port}...`);

  try {
    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
    });

    // 1. Create database if it does not exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
    await connection.query(`USE \`${database}\``);

    // 2. Create user table as per user's specification
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS \`user\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`username\` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_bin',
        \`password\` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb3_bin',
        \`last_login\` DATETIME NULL DEFAULT NULL,
        \`employee_id\` INT NULL DEFAULT NULL,
        \`user_role_id\` INT NULL DEFAULT NULL,
        PRIMARY KEY (\`id\`) USING BTREE,
        INDEX \`employee_id\` (\`employee_id\`) USING BTREE,
        INDEX \`user_role_id\` (\`user_role_id\`) USING BTREE
      )
      COLLATE='utf8mb3_bin'
      ENGINE=InnoDB;
    `;
    await connection.query(createTableSQL);
    console.log('✅ MySQL Table `user` is ready.');

    // 3. Check if default user 'saman' exists
    const [rows]: any = await connection.query('SELECT * FROM `user` WHERE username = ?', ['saman']);
    if (rows.length === 0) {
      const passwordHash = await bcrypt.hash('123123', 10);
      await connection.query(
        'INSERT INTO `user` (username, password, employee_id, user_role_id) VALUES (?, ?, ?, ?)',
        ['saman', passwordHash, 1, 1]
      );
      console.log('🎉 Default user created -> Username: saman | Password: 123123');
    } else {
      console.log('ℹ️ User `saman` already exists in database.');
    }

    await connection.end();
    console.log('🚀 Seeding completed successfully!');
  } catch (error: any) {
    console.error('❌ Seeding Error:', error.message);
    console.log('💡 Tip: Make sure MySQL server is running on ' + host + ':' + port);
  }
}

seed();
