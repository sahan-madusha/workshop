-- ============================================================
-- Parking Management System Database Schema & Initial Seed
-- ============================================================

CREATE DATABASE IF NOT EXISTS `parking_db`;
USE `parking_db`;

-- Create user table as requested
CREATE TABLE IF NOT EXISTS `user` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_bin',
	`password` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb3_bin',
	`last_login` DATETIME NULL DEFAULT NULL,
	`employee_id` INT NULL DEFAULT NULL,
	`user_role_id` INT NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `employee_id` (`employee_id`) USING BTREE,
	INDEX `user_role_id` (`user_role_id`) USING BTREE
)
COLLATE='utf8mb3_bin'
ENGINE=InnoDB
;

-- Default User Seed:
-- Username: saman
-- Password: 123123 (hashed with bcrypt or stored as plaintext fallback)
-- Password Hash for '123123': $2a$10$wE99N7z0.oSmS75vJ2b5a.6eB3zHqNfS/k6U4R0U3y7c9E8n4w1nS (or generate via seed script)
INSERT INTO `user` (`username`, `password`, `employee_id`, `user_role_id`) 
VALUES ('saman', '$2a$10$39K/66v2pY61Z3lR5z328.sZg4H9g6jW1bY8Z3s9Y4e1W3Z5a7b6c', 1, 1)
ON DUPLICATE KEY UPDATE `id`=`id`;
