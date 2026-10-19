-- ==========================================================================
-- AI Study Planner - Full Database Schema Script (MySQL 8.0)
-- ==========================================================================

DROP DATABASE IF EXISTS ai_study_planner;
CREATE DATABASE ai_study_planner CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ai_study_planner;

-- 1. Users Table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    department VARCHAR(255),
    semester VARCHAR(50),
    target_gpa DOUBLE DEFAULT 3.8,
    daily_target_hours DOUBLE DEFAULT 4.0,
    role VARCHAR(50) DEFAULT 'STUDENT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Subjects Table
CREATE TABLE subjects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL,
    credit_hours INT DEFAULT 3,
    total_topics INT DEFAULT 10,
    completed_topics INT DEFAULT 0,
    progress_percentage DOUBLE DEFAULT 0.0,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_subject_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Tasks Table
CREATE TABLE tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    priority VARCHAR(50) DEFAULT 'MEDIUM',
    difficulty INT DEFAULT 3,
    completed BOOLEAN DEFAULT FALSE,
    subject_id BIGINT,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_task_user_due (user_id, due_date),
    INDEX idx_task_priority (priority)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Study Plans Table
CREATE TABLE study_plans (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    subject_name VARCHAR(255) NOT NULL,
    topic_name VARCHAR(255) NOT NULL,
    scheduled_date DATE NOT NULL,
    start_time TIME NOT NULL,
    duration_minutes INT DEFAULT 60,
    status VARCHAR(50) DEFAULT 'SCHEDULED',
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_plan_user_date (user_id, scheduled_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Reminders Table
CREATE TABLE reminders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    message VARCHAR(255) NOT NULL,
    reminder_time TIMESTAMP NOT NULL,
    sent BOOLEAN DEFAULT FALSE,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_reminder_pending (user_id, sent)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Study Sessions Table (Analytics Tracking)
CREATE TABLE study_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    duration_minutes INT DEFAULT 0,
    focus_score DOUBLE DEFAULT 85.0,
    subject_id BIGINT,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
