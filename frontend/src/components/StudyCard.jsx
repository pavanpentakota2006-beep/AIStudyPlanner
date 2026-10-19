import React from 'react';
import { BookOpen, Clock, Award, PlayCircle } from 'lucide-react';

export const StudyCard = ({ subject, onStartSession }) => {
  const { name, code, progress = 75, totalTopics = 12, completedTopics = 9, creditHours = 4 } = subject || {};

  return (
    <div className="glass-card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', letterSpacing: '0.05em' }}>{code || 'CS701'}</span>
          <h3 style={{ fontSize: '1.1rem', marginTop: '0.15rem' }}>{name || 'Distributed Systems'}</h3>
        </div>
        <span className="badge badge-medium">{creditHours} Credits</span>
      </div>

      {/* Progress Bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
          <span>Syllabus Completion</span>
          <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{progress}%</span>
        </div>
        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent-cyan) 100%)',
            borderRadius: '4px',
            transition: 'var(--transition-normal)'
          }} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <BookOpen size={14} />
          <span>{completedTopics}/{totalTopics} Modules</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Award size={14} style={{ color: 'var(--accent-amber)' }} />
          <span>Mastery: High</span>
        </div>
      </div>

      <button 
        onClick={() => onStartSession && onStartSession(subject)}
        className="btn btn-primary" 
        style={{ width: '100%', marginTop: '0.5rem', height: '36px', fontSize: '0.82rem' }}
      >
        <PlayCircle size={16} />
        <span>Start Study Session</span>
      </button>
    </div>
  );
};
