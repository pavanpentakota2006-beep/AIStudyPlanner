import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';

export const CalendarView = () => {
  const [currentMonth, setCurrentMonth] = useState('August 2026');

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

  const sampleEvents = {
    11: [
      { id: 1, title: 'Distributed Systems Exam Prep', time: '09:00 AM', type: 'EXAM' },
      { id: 2, title: 'ML Vector Calculus Revision', time: '02:00 PM', type: 'STUDY' }
    ],
    14: [
      { id: 3, title: 'Compiler Design Lab Submission', time: '11:59 PM', type: 'DEADLINE' }
    ],
    18: [
      { id: 4, title: 'Cloud Computing Docker Workshop', time: '04:00 PM', type: 'STUDY' }
    ]
  };

  return (
    <div className="glass-card animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <CalendarIcon size={22} style={{ color: 'var(--primary)' }} />
          <h3>{currentMonth}</h3>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-secondary btn-icon"><ChevronLeft size={18} /></button>
          <button className="btn btn-secondary btn-icon"><ChevronRight size={18} /></button>
        </div>
      </div>

      {/* Days Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', textAlign: 'center', marginBottom: '0.5rem' }}>
        {daysOfWeek.map((day) => (
          <div key={day} style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', padding: '0.5rem 0' }}>
            {day}
          </div>
        ))}
      </div>

      {/* Dates Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
        {calendarDays.map((day) => {
          const events = sampleEvents[day] || [];
          const isToday = day === 10;

          return (
            <div key={day} style={{
              minHeight: '85px',
              padding: '0.5rem',
              borderRadius: 'var(--radius-sm)',
              background: isToday ? 'rgba(99, 102, 241, 0.12)' : 'rgba(255, 255, 255, 0.02)',
              border: isToday ? '1px solid var(--primary)' : '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: '0.85rem', fontWeight: isToday ? 700 : 500, color: isToday ? 'var(--primary)' : 'var(--text-main)' }}>
                {day}
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                {events.map((evt) => (
                  <div key={evt.id} style={{
                    fontSize: '0.68rem',
                    padding: '0.15rem 0.35rem',
                    borderRadius: '4px',
                    background: evt.type === 'EXAM' ? 'rgba(244,63,94,0.2)' : evt.type === 'DEADLINE' ? 'rgba(245,158,11,0.2)' : 'rgba(99,102,241,0.2)',
                    color: evt.type === 'EXAM' ? 'var(--accent-rose)' : evt.type === 'DEADLINE' ? 'var(--accent-amber)' : 'var(--primary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {evt.time} - {evt.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
