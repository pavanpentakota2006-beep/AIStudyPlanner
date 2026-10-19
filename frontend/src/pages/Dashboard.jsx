import React, { useState, useEffect } from 'react';
import { StudyCard } from '../components/StudyCard';
import { TaskCard } from '../components/TaskCard';
import { ProgressChart } from '../components/ProgressChart';
import { AIRecommendationCard } from '../components/AIRecommendationCard';
import { ReminderPopup } from '../components/ReminderPopup';
import { aiService } from '../services/aiService';
import { Clock, BookOpen, Flame, Award, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import '../styles/dashboard.css';

export const Dashboard = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [activeReminder, setActiveReminder] = useState({
    subjectName: 'Distributed Systems',
    topicName: 'Consensus Algorithms (Raft)'
  });

  useEffect(() => {
    aiService.getRecommendations().then(setRecommendations);
  }, []);

  const sampleSubjects = [
    { id: 1, name: 'Distributed Systems', code: 'CS701', progress: 82, creditHours: 4, totalTopics: 12, completedTopics: 10 },
    { id: 2, name: 'Machine Learning', code: 'CS702', progress: 70, creditHours: 4, totalTopics: 14, completedTopics: 10 },
    { id: 3, name: 'Compiler Design', code: 'CS703', progress: 55, creditHours: 3, totalTopics: 10, completedTopics: 5 }
  ];

  const sampleTasks = [
    { id: 101, title: 'Paxos vs Raft Leader Election Comparison Paper', subjectName: 'Distributed Systems', priority: 'HIGH', dueDate: '2026-08-12', difficulty: 4, completed: false },
    { id: 102, title: 'Implement Backpropagation Algorithm in Python', subjectName: 'Machine Learning', priority: 'HIGH', dueDate: '2026-08-13', difficulty: 5, completed: false },
    { id: 103, title: 'Construct LALR(1) Parsing Table for Expression Grammar', subjectName: 'Compiler Design', priority: 'MEDIUM', dueDate: '2026-08-15', difficulty: 3, completed: false }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Banner */}
      <div className="glass-card animate-fade-in" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.15) 50%, rgba(6, 182, 212, 0.1) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        padding: '2rem'
      }}>
        <div>
          <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', marginBottom: '0.5rem' }}>
            <Sparkles size={12} /> AI Powered Study Engine Active
          </span>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '0.35rem' }}>Good Evening, Alex! 👋</h1>
          <p className="sub-heading">Your personalized study plan has 3 high-priority focus sessions scheduled for today.</p>
        </div>
        <a href="/ai-planner" className="btn btn-primary" style={{ height: '42px', padding: '0 1.5rem' }}>
          <Sparkles size={18} /> Generate AI Schedule
        </a>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-grid">
        <div className="glass-card stat-card">
          <div className="stat-icon indigo"><Clock size={26} /></div>
          <div className="stat-info">
            <h3>4.8 hrs</h3>
            <p>Today's Focus Time</p>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon purple"><BookOpen size={26} /></div>
          <div className="stat-info">
            <h3>5 Enrolled</h3>
            <p>Active CSE Subjects</p>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon emerald"><CheckCircle2 size={26} /></div>
          <div className="stat-info">
            <h3>88%</h3>
            <p>Task Completion Rate</p>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon amber"><Flame size={26} /></div>
          <div className="stat-info">
            <h3>7 Days</h3>
            <p>Active Study Streak</p>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="dashboard-grid">
        {/* Chart Section */}
        <div className="glass-card chart-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>Productivity & Focused Hours</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Target: 28 hrs/week</span>
          </div>
          <ProgressChart type="line" />
        </div>

        {/* AI Recommendations */}
        <div className="ai-recommendation-section" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem' }}>AI Recommendations</h3>
          {recommendations.slice(0, 2).map((rec) => (
            <AIRecommendationCard 
              key={rec.id} 
              recommendation={rec} 
              onApply={() => alert(`Applied recommendation: ${rec.title}`)} 
            />
          ))}
        </div>
      </div>

      {/* Subjects & Tasks Grid */}
      <div className="dashboard-grid">
        <div className="subject-preview-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>Active Subjects</h3>
            <a href="/subjects" style={{ fontSize: '0.85rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>View All →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {sampleSubjects.map((sub) => (
              <StudyCard key={sub.id} subject={sub} />
            ))}
          </div>
        </div>

        <div className="task-preview-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>High Priority Tasks</h3>
            <a href="/tasks" style={{ fontSize: '0.85rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Manage Tasks →</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {sampleTasks.map((t) => (
              <TaskCard key={t.id} task={t} />
            ))}
          </div>
        </div>
      </div>

      {/* Active Reminder Popup Demo */}
      {activeReminder && (
        <ReminderPopup 
          reminder={activeReminder} 
          onClose={() => setActiveReminder(null)} 
          onStartNow={() => alert('Starting study session timer!')} 
        />
      )}
    </div>
  );
};
