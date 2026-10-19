import React from 'react';
import { CalendarView } from '../components/CalendarView';

export const Calendar = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1>Academic & Exam Calendar</h1>
        <p className="sub-heading">View scheduled study sessions, assignment deadlines, and exam dates</p>
      </div>
      <CalendarView />
    </div>
  );
};
