# REST API Documentation

### Base URL: `http://localhost:8080/api/v1`

---

### 1. Authentication Endpoints

#### `POST /auth/login`
- **Description**: Authenticate user credentials and return JWT bearer token.
- **Request Body**:
```json
{
  "email": "alex.johnson@university.edu",
  "password": "password123"
}
```

#### `POST /auth/register`
- **Description**: Create a new student account.
- **Request Body**:
```json
{
  "name": "Alex Johnson",
  "email": "alex.johnson@university.edu",
  "password": "password123",
  "department": "Computer Science & Engineering",
  "semester": "7th Semester"
}
```

---

### 2. Subject Endpoints

#### `GET /subjects`
- **Query Params**: `userId=1`
- **Response**: Array of subject records.

#### `POST /subjects`
- **Request Body**:
```json
{
  "name": "Natural Language Processing",
  "code": "CS708",
  "creditHours": 4,
  "totalTopics": 12
}
```

---

### 3. AI Planner Endpoints

#### `POST /ai/generate-schedule`
- **Request Body**:
```json
{
  "targetExamDate": "2026-08-25",
  "dailyAvailableHours": 4.5,
  "studyStrategy": "SPACED_REPETITION",
  "preferredTime": "MORNING"
}
```
