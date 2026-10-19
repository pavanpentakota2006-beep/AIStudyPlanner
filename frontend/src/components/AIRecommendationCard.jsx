import React from 'react';
import { Sparkles, ArrowRight, Brain, Zap } from 'lucide-react';

export const AIRecommendationCard = ({ recommendation, onApply }) => {
  const { title, subject, confidenceScore, explanation, actionablePlan } = recommendation || {};

  return (
    <div className="glass-card animate-fade-in" style={{
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%)',
      border: '1px solid rgba(99, 102, 241, 0.3)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.85rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={18} style={{ color: 'var(--accent-cyan)' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>
            AI Assistant Insight
          </span>
        </div>
        <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)' }}>
          {(confidenceScore * 100).toFixed(0)}% Confidence
        </span>
      </div>

      <h4 style={{ fontSize: '1rem', lineHeight: 1.3 }}>{title}</h4>
      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{explanation}</p>

      {actionablePlan && (
        <div style={{
          padding: '0.75rem',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(0, 0, 0, 0.2)',
          fontSize: '0.78rem',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>Recommended Slot: {actionablePlan.suggestedSlot}</div>
            <div style={{ color: 'var(--text-muted)' }}>Focus: {actionablePlan.focusArea}</div>
          </div>
          <span style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}>{actionablePlan.estimatedMasteryBoost}</span>
        </div>
      )}

      <button 
        onClick={() => onApply && onApply(recommendation)}
        className="btn btn-primary" 
        style={{ width: '100%', height: '36px', fontSize: '0.82rem' }}
      >
        <span>Apply to Schedule</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
};
