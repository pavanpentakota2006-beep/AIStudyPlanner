# ER Diagram Documentation

Refer to [database/erd_diagram.md](../database/erd_diagram.md) for the full Mermaid Entity Relationship Diagram.

### Entity Summaries:
- **User**: Core entity storing authentication credentials, GPA targets, and semester details.
- **Subject**: Course module containing credit weightage, progress metrics, and topic breakdowns.
- **Task**: Study assignment or exam preparation items associated with priority scores and difficulty levels.
- **StudyPlan**: AI-allocated time slots mapping subjects to specific calendar dates.
- **Reminder**: Notification alerts for scheduled study sessions.
- **StudySession**: Real-time study session telemetry for analytics and mastery tracking.
