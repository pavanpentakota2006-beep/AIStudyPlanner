/**
 * Priority Calculator Utility
 * Computes Task Urgency & Priority Score using:
 * Score = (Subject Weightage * 0.4) + (Difficulty Level * 0.3) + (Days Remaining Decaying Inverse * 0.3)
 */
export const calculatePriorityScore = ({ creditHours = 3, difficulty = 3, daysRemaining = 5 }) => {
  const urgencyFactor = Math.max(1, 10 - daysRemaining);
  const rawScore = (creditHours * 0.35) + (difficulty * 0.35) + (urgencyFactor * 0.3);
  return parseFloat(rawScore.toFixed(2));
};

export const getPriorityBadgeClass = (priority) => {
  const level = String(priority).toUpperCase();
  if (level === 'HIGH' || level === 'URGENT') return 'badge-high';
  if (level === 'MEDIUM' || level === 'MODERATE') return 'badge-medium';
  return 'badge-low';
};

export const getPriorityFromScore = (score) => {
  if (score >= 6.5) return 'HIGH';
  if (score >= 4.0) return 'MEDIUM';
  return 'LOW';
};
