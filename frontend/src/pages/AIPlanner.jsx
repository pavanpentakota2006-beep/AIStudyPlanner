import React, { useState } from 'react';
import { aiService } from '../services/aiService';
import { Sparkles, Brain, Cpu, CheckCircle2, ArrowRight, Calendar, Sliders } from 'lucide-react';

export const AIPlanner = () => {
  const [formData, setFormData] = useState({
    targetExamDate: '2026-08-25',
    dailyAvailableHours: 4.5,
    studyStrategy: 'SPACED_REPETITION',
    targetGPA: '4.0',
    preferredTime: 'MORNING',
  });

  const [generating, setGenerating] = useState(false);
  const [generatedSchedule, setGeneratedSchedule] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setGenerating(true);
    try {
      const response = await aiService.generateAIPlan(formData);
      setGeneratedSchedule(response);
    } catch (err) {
      alert('AI schedule generator execution failed.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-card animate-fade-in" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.2) 100%)',
        border: '1px solid var(--border-highlight)',
        padding: '2.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
          }}>
            <Brain size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.8rem' }}>AI Timetable & Schedule Optimizer</h1>
            <p className="sub-heading">Powered by Dynamic Programming & Spaced Repetition Algorithms</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>
        {/* Form Settings */}
        <div className="glass-card" style={{ gridColumn: 'span 5' }}>
          <h3 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sliders size={18} style={{ color: 'var(--primary)' }} /> Optimization Parameters
          </h3>

          <form onSubmit={handleGenerate}>
            <div className="form-group">
              <label className="form-label">Upcoming Exam / Target Date</label>
              <input 
                type="date" 
                className="form-input" 
                value={formData.targetExamDate}
                onChange={(e) => setFormData({ ...formData, targetExamDate: e.target.value })}
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Daily Available Study Hours: {formData.dailyAvailableHours} hrs</label>
              <input 
                type="range" 
                min="1" max="10" step="0.5" 
                value={formData.dailyAvailableHours}
                onChange={(e) => setFormData({ ...formData, dailyAvailableHours: parseFloat(e.target.value) })}
                style={{ width: '100%', accentColor: 'var(--primary)' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Study Methodology Algorithm</label>
              <select 
                className="form-select"
                value={formData.studyStrategy}
                onChange={(e) => setFormData({ ...formData, studyStrategy: e.target.value })}
              >
                <option value="SPACED_REPETITION">Spaced Repetition (Ebbinghaus Curve)</option>
                <option value="POMODORO_DEEP">Pomodoro Deep Focus (50m / 10m)</option>
                <option value="DIFFICULTY_FIRST">Hardest Topics First (Highest Weightage)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Peak Focus Time Window</label>
              <select 
                className="form-select"
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
              >
                <option value="MORNING">Morning (08:00 AM - 12:00 PM)</option>
                <option value="AFTERNOON">Afternoon (01:00 PM - 05:00 PM)</option>
                <option value="NIGHT">Night Owl (08:00 PM - 12:00 AM)</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '44px', marginTop: '1rem' }} disabled={generating}>
              {generating ? 'Running Optimization Engine...' : 'Generate AI Study Schedule'} <Sparkles size={18} />
            </button>
          </form>
        </div>

        {/* AI Output Result */}
        <div className="glass-card" style={{ gridColumn: 'span 7' }}>
          <h3 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={18} style={{ color: 'var(--accent-cyan)' }} /> Generated AI Timetable
          </h3>

          {!generatedSchedule ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
              <Brain size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <p>Configure parameters on the left and click <strong>Generate AI Study Schedule</strong> to run the optimization algorithm.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <CheckCircle2 size={24} style={{ color: 'var(--accent-emerald)' }} />
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>Optimization Complete!</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Generated {generatedSchedule.totalSlotsGenerated} slots across {generatedSchedule.weeklyHoursAllocated} hours for goal: "{generatedSchedule.targetGoal}"
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {generatedSchedule.recommendedSchedule.map((slot, idx) => (
                  <div key={idx} style={{
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255,255,255,0.03)',
                    borderLeft: '4px solid var(--primary)',
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>{slot.day} • {slot.slot}</span>
                      <h4 style={{ fontSize: '0.95rem' }}>{slot.subject}</h4>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{slot.topic}</p>
                    </div>
                    <span className="badge badge-medium">{slot.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
