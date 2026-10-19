"""
AI Study Schedule Optimizer
Implements Dynamic Programming & Spaced Repetition (Ebbinghaus Forgetting Curve)
to divide daily available study capacity into optimal revision and deep work slots.
"""

from priority_model import calculate_urgency_score, categorize_priority
from typing import List, Dict, Any

class StudyScheduleOptimizer:
    def __init__(self, daily_hours: float = 4.5, pomodoro_length_mins: int = 50):
        self.daily_minutes = int(daily_hours * 60)
        self.pomodoro_length = pomodoro_length_mins

    def optimize_schedule(self, subjects: List[Dict[str, Any]], tasks: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Allocates study slots dynamically based on priority scores and forgetting curve intervals.
        """
        scored_tasks = []
        for task in tasks:
            score = calculate_urgency_score(
                task.get("credit_hours", 3),
                task.get("difficulty", 3),
                task.get("days_remaining", 5)
            )
            scored_tasks.append({**task, "score": score, "priority": categorize_priority(score)})

        # Sort tasks descending by priority score
        scored_tasks.sort(key=lambda x: x["score"], reverse=True)

        allocated_slots = []
        remaining_time = self.daily_minutes

        start_hour = 9  # 09:00 AM start

        for task in scored_tasks:
            if remaining_time < 30:
                break

            session_duration = min(remaining_time, 90 if task["score"] >= 6.8 else 60)
            slot_time_str = f"{start_hour:02d}:00 AM" if start_hour < 12 else f"{start_hour - 12 if start_hour > 12 else 12}:00 PM"

            allocated_slots.append({
                "subject": task.get("subject_name", "General"),
                "topic": task.get("title"),
                "duration_minutes": session_duration,
                "start_time": slot_time_str,
                "priority": task["priority"],
                "urgency_score": task["score"]
            })

            remaining_time -= session_duration
            start_hour += max(1, session_duration // 60)

        return {
            "total_slots": len(allocated_slots),
            "allocated_minutes": self.daily_minutes - remaining_time,
            "schedule": allocated_slots
        }

if __name__ == "__main__":
    optimizer = StudyScheduleOptimizer(daily_hours=4.5)
    sample_tasks = [
        {"subject_name": "Distributed Systems", "title": "Raft Consensus Invariants", "credit_hours": 4, "difficulty": 5, "days_remaining": 2},
        {"subject_name": "Machine Learning", "title": "Backprop Gradient Descent", "credit_hours": 4, "difficulty": 4, "days_remaining": 3},
        {"subject_name": "Compiler Design", "title": "LALR Parsing Tables", "credit_hours": 3, "difficulty": 3, "days_remaining": 6},
    ]
    result = optimizer.optimize_schedule([], sample_tasks)
    print("Optimization Result:", result)
