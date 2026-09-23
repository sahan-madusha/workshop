# Parking Management System - Backend Server (Node.js + Express + MySQL)

A clean, beginner-friendly Node.js + Express TypeScript backend for the **Parking Management System**.

---

## 🎯 Architecture Flow

A request flows through 4 clear layers:

```
Client (Frontend / Postman)
         │
         ▼
 1. Route Layer        (src/routes/userRoutes.ts)
         │
         ▼
 2. Controller Layer   (src/controllers/userController.ts)
         │
         ▼
 3. Service Layer      (src/services/userService.ts)
         │
         ▼
 4. Repository Layer   (src/repositories/userRepository.ts)
         │
         ▼
    MySQL Database     (schema.sql)
```

---

## 📁 Project Structure

```
server/
├── schema.sql                      # SQL script to create database & table
├── .env                            # Environment variables (port, DB credentials)
├── package.json                    # Dependencies & scripts
└── src/
    ├── server.ts                   # Main server entry point
    ├── config/
    │   └── db.ts                   # MySQL connection pool
    ├── repositories/
    │   └── userRepository.ts       # Database queries
    ├── services/
    │   └── userService.ts          # Validation & business logic
    ├── controllers/
    │   └── userController.ts       # HTTP request handlers
    └── routes/
        └── userRoutes.ts           # Express route definitions
```

---

## 🚀 How to Run

### Step 1: Create Database in MySQL
Run `schema.sql` in MySQL Workbench or CLI:
```sql
CREATE DATABASE IF NOT EXISTS parking_db;
USE parking_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Step 2: Configure Environment Variables
Create or edit `.env`:
```env
PORT=8000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=parking_db
```

### Step 3: Install & Start Server
```bash
npm install
npm run dev
```

---

## 🧪 API Endpoints

| HTTP Method | URL Path | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Server status welcome message |
| `GET` | `/api/users` | Get all users / search |
| `GET` | `/api/users/:id` | Get user by ID |
| `POST` | `/api/users` | Create new user |
| `PUT` | `/api/users/:id` | Update user |
| `DELETE` | `/api/users/:id` | Delete user |
