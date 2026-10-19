"""
Task Priority & Urgency Index (TUI) Model
Computes numerical priority scores for study tasks based on multi-variable heuristics:
1. Credit Weightage (1 - 5)
2. Difficulty Rating (1 - 5)
3. Days Remaining Until Deadline
"""

import math

def calculate_urgency_score(credit_hours: float, difficulty: int, days_remaining: int) -> float:
    """
    Calculates normalized Task Urgency Index between 1.0 and 10.0
    """
    if days_remaining <= 0:
        deadline_factor = 10.0
    else:
        # Inverse logarithmic decay for deadline proximity
        deadline_factor = max(1.0, 10.0 - math.log2(days_remaining + 1) * 2.5)

    credit_weight = min(5.0, max(1.0, credit_hours))
    difficulty_weight = min(5.0, max(1.0, difficulty))

    score = (credit_weight * 0.30) + (difficulty_weight * 0.30) + (deadline_factor * 0.40)
    return round(score, 2)

def categorize_priority(score: float) -> str:
    if score >= 6.8:
        return "HIGH"
    elif score >= 4.5:
        return "MEDIUM"
    else:
        return "LOW"

if __name__ == "__main__":
    sample_task = {"name": "Distributed Systems Raft Consensus", "credit_hours": 4, "difficulty": 5, "days_remaining": 3}
    score = calculate_urgency_score(sample_task["credit_hours"], sample_task["difficulty"], sample_task["days_remaining"])
    print(f"Task: {sample_task['name']}")
    print(f"Urgency Score: {score} -> Priority Level: {categorize_priority(score)}")
