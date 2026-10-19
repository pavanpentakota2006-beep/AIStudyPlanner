# 🎓 AI Study Planner - Industry Standard Full-Stack Web Application

![AI Study Planner Banner](https://img.shields.io/badge/AI%20Study%20Planner-v1.0.0-blueviolet?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Spring%20Boot%20%7C%20MySQL%20%7C%20Python%20AI-orange?style=for-the-badge)

A 10/10 production-ready, full-stack **AI-powered Study Management & Schedule Optimization Platform** built for Computer Science engineering projects, GitHub showcase portfolios, and enterprise placements.

---

## 🌟 Key Features

- ⚡ **Dynamic AI Schedule Generation**: Generates individualized, priority-balanced study timetables utilizing Spaced Repetition (Ebbinghaus Forgetting Curve) and Dynamic Programming algorithm models.
- 🎯 **Smart Task & Subject Prioritization**: Auto-calculates task urgency and priority scores based on deadline proximity, subject credit weightage, and difficulty ratings.
- 📊 **Comprehensive Study Analytics**: Visual insights featuring subject mastery radar charts, weekly study hour breakdown, streak metrics, and productivity heatmaps.
- 📅 **Interactive Calendar & Timetable**: Day, week, and month view calendar with session markers, exam countdown timers, and drag-and-drop study slot planning.
- 🔔 **Intelligent Reminders & Notifications**: Real-time popups and toast alerts for upcoming revision sessions and high-priority assignment deadlines.
- 🔐 **Enterprise Security (JWT & Spring Security 6)**: Role-based access control, encrypted credentials, stateless authentication, and protected API endpoints.
- 🎨 **State-of-the-Art Futuristic UI/UX**: Glassmorphism aesthetic, sleek dark/light mode engine, responsive layouts, micro-animations, and seamless component design system.
- 🐳 **1-Command Docker Setup**: Fully containerized environment with Docker Compose (Frontend, Backend, Database, AI Engine).

---

## 📁 Repository Directory Structure

```
AI-Study-Planner/
├── frontend/                   # React + Vite Client Application
│   ├── public/                 # Static assets & index.html
│   └── src/
│       ├── assets/             # Images, logos, SVGs
│       ├── components/         # Reusable UI Components (Navbar, TaskCard, Charts...)
│       ├── pages/              # Views (Dashboard, Subjects, Tasks, AIPlanner, Analytics...)
│       ├── services/           # Axios API Layer & Mock Fallback Engine
│       ├── context/            # AuthContext & ThemeContext
│       ├── hooks/              # Custom React Hooks (useAuth, usePlanner)
│       ├── utils/              # Date utils, priority math, time formatters
│       └── styles/             # Modular Glassmorphism CSS Design System
├── backend/                    # Spring Boot 3.x REST API Engine
│   ├── pom.xml                 # Maven Dependencies
│   └── src/main/java/com/aistudyplanner/
│       ├── config/             # SecurityConfig, JwtConfig, OpenAIConfig
│       ├── controller/         # Auth, Subject, Task, Planner, AI, Analytics Controllers
│       ├── service/            # Business Logic Services
│       ├── repository/         # Spring Data JPA Repositories
│       ├── entity/             # JPA Entities (User, Subject, Task, StudyPlan...)
│       ├── dto/                # Request & Response Data Transfer Objects
│       ├── security/           # JwtTokenProvider, JwtAuthenticationFilter
│       └── exception/          # Global Exception Handler
├── database/                   # MySQL DDL & Seed Data
│   ├── ai_study_planner.sql    # Schema Definition SQL
│   ├── sample_data.sql         # Seed Sample Records
│   └── erd_diagram.md          # Mermaid Entity-Relationship Diagram
├── ai-model/                   # Python AI Optimizer Engine
│   ├── study_optimizer.py      # Dynamic Programming & Spaced Repetition Algorithm
│   ├── priority_model.py       # Heuristic Urgency Scoring Algorithm
│   └── planner_prompt.txt      # System Prompts for OpenAI LLM
├── docs/                       # CSE Final-Year Documentation
│   ├── SRS_Document.md         # Software Requirements Specification
│   ├── Architecture_Diagram.md # Multi-tier System Architecture
│   ├── Workflow_Diagram.md     # Data Flow & Execution Sequence
│   ├── API_Documentation.md    # REST API Endpoint Specifications
│   └── Project_Report.md       # IEEE Format Project Report
├── postman/                    # API Testing Collection
│   └── AI_Study_Planner_API.postman_collection.json
└── docker/                     # Containerization Configuration
    ├── Dockerfile
    └── docker-compose.yml
```

---

## 🛠️ Quick Start Guide

### Option 1: Standalone Frontend Demo (Immediate Preview)
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Run Vite dev server
npm run dev
```
*Note: The frontend includes a Dual-Mode API Engine. If the Spring Boot backend is offline, it dynamically serves mock data so you can test all UI pages and AI recommendations out of the box!*

---

### Option 2: Full-Stack Execution (Spring Boot + MySQL + React)

#### 1. Database Setup
Import `database/ai_study_planner.sql` and `database/sample_data.sql` into MySQL Server:
```sql
CREATE DATABASE ai_study_planner;
USE ai_study_planner;
SOURCE database/ai_study_planner.sql;
SOURCE database/sample_data.sql;
```

#### 2. Backend Startup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
The REST API will start at `http://localhost:8080/api/v1`.

#### 3. AI Service Startup (Optional Python Engine)
```bash
cd ai-model
pip install -r requirements.txt
python study_optimizer.py
```

---

### Option 3: Docker Compose (Production Environment)
```bash
cd docker
docker-compose up --build
```
- **Frontend App**: `http://localhost:3000`
- **Backend API**: `http://localhost:8080/api/v1`
- **MySQL Database**: `localhost:3306`

---

## 🌐 REST API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/auth/login` | Authenticate user & issue JWT token |
| `POST` | `/api/v1/auth/register` | Register new user account |
| `GET` | `/api/v1/subjects` | Fetch user enrolled subjects |
| `POST` | `/api/v1/tasks` | Create new study task |
| `GET` | `/api/v1/planner/generate` | Trigger AI Study Schedule Optimizer |
| `GET` | `/api/v1/analytics/overview` | Fetch user productivity metrics |

---

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
