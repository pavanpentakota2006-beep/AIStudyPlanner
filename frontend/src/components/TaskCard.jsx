import React from 'react';
import { Clock, AlertCircle, CheckCircle2, Circle } from 'lucide-react';
import { getPriorityBadgeClass } from '../utils/priorityCalculator';
import { formatRelativeTime } from '../utils/dateUtils';

export const TaskCard = ({ task, onToggleComplete }) => {
  const { title, subjectName, dueDate, priority = 'MEDIUM', completed = false, difficulty = 3 } = task || {};

  return (
    <div className="glass-card animate-fade-in" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 1.25rem',
      opacity: completed ? 0.6 : 1,
      borderLeft: completed ? '4px solid var(--accent-emerald)' : `4px solid ${priority === 'HIGH' ? 'var(--accent-rose)' : 'var(--primary)'}`
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
        <button 
          onClick={() => onToggleComplete && onToggleComplete(task.id)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: completed ? 'var(--accent-emerald)' : 'var(--text-muted)' }}
        >
          {completed ? <CheckCircle2 size={22} /> : <Circle size={22} />}
        </button>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>{subjectName || 'General'}</span>
            <span className={`badge ${getPriorityBadgeClass(priority)}`}>{priority}</span>
          </div>
          <h4 style={{
            fontSize: '0.95rem',
            textDecoration: completed ? 'line-through' : 'none',
            color: completed ? 'var(--text-muted)' : 'var(--text-main)'
          }}>
            {title}
          </h4>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ textAlign: 'right', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', justifyContent: 'flex-end' }}>
            <Clock size={13} />
            <span>{dueDate ? formatRelativeTime(dueDate) : 'No deadline'}</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '2px' }}>
            Diff: {'★'.repeat(difficulty)}{'☆'.repeat(5 - difficulty)}
          </div>
        </div>
      </div>
    </div>
  );
};
