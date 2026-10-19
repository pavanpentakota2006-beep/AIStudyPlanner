import React from 'react';
import { BellRing, X, Clock, Play } from 'lucide-react';

export const ReminderPopup = ({ reminder, onClose, onStartNow }) => {
  if (!reminder) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      width: '340px',
      zIndex: 1000,
    }}>
      <div className="glass-card animate-fade-in" style={{
        background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.95))',
        border: '1px solid var(--primary)',
        boxShadow: 'var(--shadow-glow)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BellRing size={18} style={{ color: 'var(--accent-amber)' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-amber)' }}>Session Reminder</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </div>

        <h4 style={{ fontSize: '0.95rem', marginBottom: '0.25rem' }}>{reminder.subjectName || 'Study Session Alert'}</h4>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Scheduled topic: <strong>{reminder.topicName || 'Review notes'}</strong> starting in 10 minutes.
        </p>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={onStartNow} className="btn btn-primary" style={{ flex: 1, height: '34px', fontSize: '0.78rem' }}>
            <Play size={14} /> Start Now
          </button>
          <button onClick={onClose} className="btn btn-secondary" style={{ height: '34px', fontSize: '0.78rem' }}>
            Snooze
          </button>
        </div>
      </div>
    </div>
  );
};
