-- ============================================================
-- Backend Workshop Day 03: MySQL Database Schema (No Seeding)
-- ============================================================

-- 1. Create database if it does not exist
CREATE DATABASE IF NOT EXISTS workshop_db;
USE workshop_db;

-- 2. Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
