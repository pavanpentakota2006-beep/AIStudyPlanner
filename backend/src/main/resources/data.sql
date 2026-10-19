-- Seed Sample Records for AI Study Planner

INSERT INTO users (id, email, password, name, department, semester, target_gpa, daily_target_hours, role)
VALUES (1, 'alex.johnson@university.edu', '$2a$10$E2x9vBqY76Yj8WwZ.d/ZceH4Jv1Z2vX3a4b5c6d7e8f9g0h1i2j3k', 'Alex Johnson', 'Computer Science & Engineering', '7th Semester', 3.95, 4.5, 'STUDENT')
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO subjects (id, name, code, credit_hours, total_topics, completed_topics, progress_percentage, user_id)
VALUES 
(1, 'Distributed Systems', 'CS701', 4, 12, 10, 82.0, 1),
(2, 'Machine Learning', 'CS702', 4, 14, 10, 70.0, 1),
(3, 'Compiler Design', 'CS703', 3, 10, 5, 55.0, 1)
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO tasks (id, title, description, due_date, priority, difficulty, completed, subject_id, user_id)
VALUES
(101, 'Paxos vs Raft Leader Election Comparison Paper', 'Write 5-page research summary on consensus safety invariants', CURDATE() + INTERVAL 2 DAY, 'HIGH', 4, FALSE, 1, 1),
(102, 'Implement Backpropagation Algorithm in Python', 'Code matrix calculus backprop for multi-layer perceptrons', CURDATE() + INTERVAL 3 DAY, 'HIGH', 5, FALSE, 2, 1),
(103, 'Construct LALR(1) Parsing Table for Expression Grammar', 'Solve shift-reduce conflict resolution exercise', CURDATE() + INTERVAL 5 DAY, 'MEDIUM', 3, FALSE, 3, 1)
ON DUPLICATE KEY UPDATE title=VALUES(title);
