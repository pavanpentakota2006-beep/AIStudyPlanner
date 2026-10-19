-- Seed Records for AI Study Planner Database

USE ai_study_planner;

INSERT INTO users (id, email, password, name, department, semester, target_gpa, daily_target_hours, role)
VALUES 
(1, 'alex.johnson@university.edu', '$2a$10$E2x9vBqY76Yj8WwZ.d/ZceH4Jv1Z2vX3a4b5c6d7e8f9g0h1i2j3k', 'Alex Johnson', 'Computer Science & Engineering', '7th Semester', 3.95, 4.5, 'STUDENT');

INSERT INTO subjects (id, name, code, credit_hours, total_topics, completed_topics, progress_percentage, user_id)
VALUES 
(1, 'Distributed Systems', 'CS701', 4, 12, 10, 82.0, 1),
(2, 'Machine Learning', 'CS702', 4, 14, 10, 70.0, 1),
(3, 'Compiler Design', 'CS703', 3, 10, 5, 55.0, 1),
(4, 'Cloud Computing & DevOps', 'CS704', 3, 8, 7, 90.0, 1),
(5, 'Advanced Database Systems', 'CS705', 4, 11, 7, 64.0, 1);

INSERT INTO tasks (id, title, description, due_date, priority, difficulty, completed, subject_id, user_id)
VALUES
(101, 'Paxos vs Raft Leader Election Comparison Paper', 'Write 5-page research summary on consensus safety invariants', CURDATE() + INTERVAL 2 DAY, 'HIGH', 4, FALSE, 1, 1),
(102, 'Implement Backpropagation Algorithm in Python', 'Code matrix calculus backprop for multi-layer perceptrons', CURDATE() + INTERVAL 3 DAY, 'HIGH', 5, FALSE, 2, 1),
(103, 'Construct LALR(1) Parsing Table for Expression Grammar', 'Solve shift-reduce conflict resolution exercise', CURDATE() + INTERVAL 5 DAY, 'MEDIUM', 3, FALSE, 3, 1),
(104, 'Deploy Kubernetes Helm Chart on MiniKube', 'Setup ingress controller and horizontal pod autoscaler', CURDATE() + INTERVAL 8 DAY, 'LOW', 2, TRUE, 4, 1);

INSERT INTO study_plans (id, subject_name, topic_name, scheduled_date, start_time, duration_minutes, status, user_id)
VALUES
(1, 'Distributed Systems', 'Consensus Algorithms (Raft & Paxos)', CURDATE(), '09:00:00', 90, 'SCHEDULED', 1),
(2, 'Machine Learning', 'Gradient Descent Optimization', CURDATE(), '14:00:00', 60, 'SCHEDULED', 1),
(3, 'Compiler Design', 'LALR Parsing Tables & AST', CURDATE() + INTERVAL 1 DAY, '10:30:00', 120, 'SCHEDULED', 1);

INSERT INTO reminders (id, message, reminder_time, sent, user_id)
VALUES
(1, 'Distributed Systems Revision starting in 10 mins', NOW() + INTERVAL 10 MINUTE, FALSE, 1);
