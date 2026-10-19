import React from 'react';
import { ProgressChart } from '../components/ProgressChart';
import { BarChart3, TrendingUp, Target, Award, Zap } from 'lucide-react';

export const Analytics = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1>Study Analytics & Performance</h1>
        <p className="sub-heading">Detailed metrics on subject mastery, focus time distribution, and retention decay</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>
        <div className="glass-card" style={{ gridColumn: 'span 7' }}>
          <h3 style={{ marginBottom: '1rem' }}>Weekly Focus Hours</h3>
          <ProgressChart type="line" />
        </div>

        <div className="glass-card" style={{ gridColumn: 'span 5' }}>
          <h3 style={{ marginBottom: '1rem' }}>Subject Mastery Distribution</h3>
          <ProgressChart type="radar" />
        </div>
      </div>

      {/* KPI Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <TrendingUp size={22} style={{ color: 'var(--accent-emerald)' }} />
            <h4 style={{ fontSize: '1rem' }}>Productivity Gain</h4>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>+24%</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Compared to previous semester benchmark</p>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Target size={22} style={{ color: 'var(--primary)' }} />
            <h4 style={{ fontSize: '1rem' }}>Plan Adherence</h4>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>92.4%</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Scheduled sessions completed on time</p>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Zap size={22} style={{ color: 'var(--accent-amber)' }} />
            <h4 style={{ fontSize: '1rem' }}>Optimal Study Slot</h4>
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>09:00 AM - 11:30 AM</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Peak retention efficiency window</p>
        </div>
      </div>
    </div>
  );
};
