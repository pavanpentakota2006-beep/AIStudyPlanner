import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, BookOpen, Award, Mail, GraduationCap, Shield } from 'lucide-react';

export const Profile = () => {
  const { user } = useAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1>Student Profile</h1>
        <p className="sub-heading">Academic background, GPA targets, and study preferences</p>
      </div>

      <div className="glass-card" style={{ display: 'flex', gap: '2rem', alignItems: 'center', padding: '2.5rem' }}>
        <div style={{
          width: '90px', height: '90px', borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2.5rem', fontWeight: 800, color: '#fff'
        }}>
          {user?.name ? user.name.charAt(0) : 'A'}
        </div>

        <div>
          <h2 style={{ fontSize: '1.6rem' }}>{user?.name || 'Alex Johnson'}</h2>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.35rem', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Mail size={15} /> {user?.email}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><GraduationCap size={15} /> {user?.department}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
        <div className="glass-card">
          <h3 style={{ marginBottom: '1rem' }}>Academic Target & GPA</h3>
          <div className="form-group">
            <label className="form-label">Current Cumulative GPA</label>
            <input type="text" className="form-input" value="3.85 / 4.00" disabled />
          </div>
          <div className="form-group">
            <label className="form-label">Target Semester GPA</label>
            <input type="text" className="form-input" defaultValue="3.95" />
          </div>
        </div>

        <div className="glass-card">
          <h3 style={{ marginBottom: '1rem' }}>AI Model Preferences</h3>
          <div className="form-group">
            <label className="form-label">Default Study Technique</label>
            <select className="form-select" defaultValue="Spaced Repetition">
              <option value="Spaced Repetition">Spaced Repetition (Ebbinghaus)</option>
              <option value="Pomodoro">Pomodoro 50/10</option>
              <option value="Feynman">Feynman Technique</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Daily Max Target Hours</label>
            <input type="number" className="form-input" defaultValue="4.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
