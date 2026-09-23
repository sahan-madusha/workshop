# Day 03: Beginner-Friendly Backend Workshop (Node.js + Express + MySQL)

Welcome to **Day 03 Backend Workshop**! This repository is designed specifically for **beginners** to learn how backend applications work step-by-step using **Node.js, Express, TypeScript, and MySQL**.

---

## 🎯 What Students Will Learn

Students will learn how a web request flows through 4 clear parts of a backend server:

```
Client (Postman / Browser)
         │
         ▼
 1. Route Layer        (routes/userRoutes.ts)    --> "Where does the URL go?"
         │
         ▼
 2. Controller Layer   (controllers/userController.ts) --> "Handles HTTP Request & Response"
         │
         ▼
 3. Service Layer      (services/userService.ts)  --> "Business Rules & Validation"
         │
         ▼
 4. Repository Layer   (repositories/userRepository.ts) --> "SQL Database Queries"
         │
         ▼
    MySQL Database     (schema.sql)
```

---

## 📁 Simple Project Structure

```
day03/
├── schema.sql                      # SQL script to create database & table
├── .env                            # Database configuration & credentials
├── package.json                    # Project dependencies
├── requests.http                   # 1-click API test requests
└── src/
    ├── server.ts                   # Main server entry point
    ├── config/
    │   └── db.ts                   # Simple MySQL connection
    ├── repositories/
    │   └── userRepository.ts       # Raw SQL functions
    ├── services/
    │   └── userService.ts           # Simple validation & logic functions
    ├── controllers/
    │   └── userController.ts       # Simple HTTP functions
    └── routes/
        └── userRoutes.ts           # Simple URL route definitions
```

---

## 🚀 How to Run for Workshop Students

### Step 1: Create Database & Table in MySQL
Run `schema.sql` in MySQL Workbench or CLI:
```sql
CREATE DATABASE IF NOT EXISTS workshop_db;
USE workshop_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Step 2: Configure Database Credentials
Edit [`.env`](file:///d:/taprodev/workshop/workshop/day03/.env):
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=workshop_db
```

### Step 3: Install & Start Server
```bash
npm install
npm run dev
```

---

## 🧪 Testing CRUD Endpoints

| HTTP Method | URL Path | Description |
| :--- | :--- | :--- |
| `GET` | `/api/users` | Get all users |
| `GET` | `/api/users?search=john` | Search users by name or email |
| `GET` | `/api/users/1` | Get user by ID |
| `POST` | `/api/users` | Create new user (`{ "name": "John", "email": "john@email.com" }`) |
| `PUT` | `/api/users/1` | Update user by ID |
| `DELETE` | `/api/users/1` | Delete user by ID |
