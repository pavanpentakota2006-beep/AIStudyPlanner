import { format, formatDistanceToNow, isToday, isPast, isFuture, parseISO } from 'date-fns';

export const formatDate = (dateString, formatStr = 'MMM dd, yyyy') => {
  if (!dateString) return 'N/A';
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(date, formatStr);
  } catch (error) {
    return dateString;
  }
};

export const formatRelativeTime = (dateString) => {
  if (!dateString) return '';
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    return dateString;
  }
};

export const getDaysRemaining = (dueDateStr) => {
  if (!dueDateStr) return 0;
  const now = new Date();
  const due = new Date(dueDateStr);
  const diffTime = due - now;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isDateToday = (dateStr) => {
  if (!dateStr) return false;
  return isToday(parseISO(dateStr));
};
