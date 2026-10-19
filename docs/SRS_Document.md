# Software Requirements Specification (SRS)
## AI Study Planner Platform (CSE Final Year Project)

### 1. Introduction
The **AI Study Planner** is an intelligent, automated study schedule generation and task management system engineered for Computer Science students. It incorporates Spaced Repetition (Ebbinghaus Forgetting Curve) and Dynamic Programming slot allocation algorithms.

### 2. Functional Requirements
- **FR-1 Authentication**: JWT-based stateless user registration and login.
- **FR-2 Subject Management**: CRUD operations for academic courses, syllabus modules, and credit weightage.
- **FR-3 Task Manager**: Priority calculation based on deadline, weightage, and difficulty.
- **FR-4 AI Timetable Generator**: Automated generation of optimal weekly study schedules.
- **FR-5 Analytics**: Graphical radar and line charts displaying focus time and subject mastery.

### 3. Non-Functional Requirements
- **NFR-1 Response Time**: API response times under 200ms.
- **NFR-2 Security**: Passwords encrypted using BCrypt hash, JWT bearer tokens.
- **NFR-3 Availability**: 99.9% uptime with containerized microservices.
