export const formatMinutesToHours = (minutes) => {
  if (!minutes || isNaN(minutes)) return '0h 0m';
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs === 0) return `${mins}m`;
  if (mins === 0) return `${hrs}h`;
  return `${hrs}h ${mins}m`;
};

export const formatTimeSlot = (startTime, durationMinutes = 60) => {
  if (!startTime) return '09:00 AM';
  return `${startTime} (${durationMinutes} mins)`;
};
