# Database Entity-Relationship Diagram (ERD)

```mermaid
erDiagram
    USERS ||--o{ SUBJECTS : "enrolls in"
    USERS ||--o{ TASKS : "creates"
    USERS ||--o{ STUDY_PLANS : "has scheduled"
    USERS ||--o{ REMINDERS : "receives"
    USERS ||--o{ STUDY_SESSIONS : "completes"
    SUBJECTS ||--o{ TASKS : "categorizes"
    SUBJECTS ||--o{ STUDY_SESSIONS : "tracks focus for"

    USERS {
        bigint id PK
        string email UK
        string password
        string name
        string department
        string semester
        double target_gpa
        double daily_target_hours
        string role
        timestamp created_at
    }

    SUBJECTS {
        bigint id PK
        string name
        string code
        int credit_hours
        int total_topics
        int completed_topics
        double progress_percentage
        bigint user_id FK
    }

    TASKS {
        bigint id PK
        string title
        text description
        date due_date
        string priority
        int difficulty
        boolean completed
        bigint subject_id FK
        bigint user_id FK
    }

    STUDY_PLANS {
        bigint id PK
        string subject_name
        string topic_name
        date scheduled_date
        time start_time
        int duration_minutes
        string status
        bigint user_id FK
    }

    REMINDERS {
        bigint id PK
        string message
        timestamp reminder_time
        boolean sent
        bigint user_id FK
    }

    STUDY_SESSIONS {
        bigint id PK
        timestamp start_time
        timestamp end_time
        int duration_minutes
        double focus_score
        bigint subject_id FK
        bigint user_id FK
    }
```
