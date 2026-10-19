-- Schema Initialization for AI Study Planner Database

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    department VARCHAR(255),
    semester VARCHAR(50),
    target_gpa DOUBLE,
    daily_target_hours DOUBLE,
    role VARCHAR(50) DEFAULT 'STUDENT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subjects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL,
    credit_hours INT DEFAULT 3,
    total_topics INT DEFAULT 10,
    completed_topics INT DEFAULT 0,
    progress_percentage DOUBLE DEFAULT 0.0,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tasks (
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
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS study_plans (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    subject_name VARCHAR(255) NOT NULL,
    topic_name VARCHAR(255) NOT NULL,
    scheduled_date DATE NOT NULL,
    start_time TIME NOT NULL,
    duration_minutes INT DEFAULT 60,
    status VARCHAR(50) DEFAULT 'SCHEDULED',
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reminders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    message VARCHAR(255) NOT NULL,
    reminder_time TIMESTAMP NOT NULL,
    sent BOOLEAN DEFAULT FALSE,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
