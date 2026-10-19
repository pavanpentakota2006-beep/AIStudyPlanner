import React, { useState } from 'react';
import { usePlanner } from '../hooks/usePlanner';
import { Calendar, Clock, Sparkles, Plus, CheckCircle, Flame } from 'lucide-react';
import '../styles/planner.css';

export const StudyPlanner = () => {
  const { plans, loading } = usePlanner();
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const sampleSlots = [
    { day: 'Monday', time: '09:00 AM', subject: 'Distributed Systems', topic: 'Raft & Paxos Consensus', duration: '90 mins', priority: 'HIGH' },
    { day: 'Monday', time: '02:00 PM', subject: 'Machine Learning', topic: 'Gradient Descent Optimization', duration: '60 mins', priority: 'HIGH' },
    { day: 'Tuesday', time: '10:00 AM', subject: 'Compiler Design', topic: 'LALR(1) Parsing Table', duration: '120 mins', priority: 'MEDIUM' },
    { day: 'Wednesday', time: '04:00 PM', subject: 'Cloud Computing', topic: 'Kubernetes Pod Services', duration: '60 mins', priority: 'LOW' },
    { day: 'Thursday', time: '09:00 AM', subject: 'Database Systems', topic: 'B+ Tree Indexing', duration: '90 mins', priority: 'MEDIUM' },
    { day: 'Friday', time: '03:00 PM', subject: 'Distributed Systems', topic: 'Chandy-Lamport Snapshot', duration: '90 mins', priority: 'HIGH' },
    { day: 'Saturday', time: '11:00 AM', subject: 'Algorithms', topic: 'Dynamic Programming & Graphs', duration: '120 mins', priority: 'MEDIUM' },
  ];

  return (
    <div className="planner-container">
      <div className="planner-controls">
        <div>
          <h1>Weekly Study Timetable</h1>
          <p className="sub-heading">Structured study slots optimized for maximum retention</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary"><Plus size={16} /> Add Slot</button>
          <a href="/ai-planner" className="btn btn-primary"><Sparkles size={16} /> Auto-Optimize Schedule</a>
        </div>
      </div>

      {/* Grid Layout of 7 Days */}
      <div className="planner-grid">
        {days.map((day) => {
          const daySlots = sampleSlots.filter(s => s.day === day);
          return (
            <div key={day} className="day-column">
              <div className="day-header">
                <h4>{day}</h4>
                <span>{daySlots.length} Sessions</span>
              </div>

              {daySlots.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '2rem 0', fontSize: '0.8rem' }}>
                  No sessions planned
                </div>
              ) : (
                daySlots.map((slot, idx) => (
                  <div key={idx} className="session-slot active-slot">
                    <div className="session-time">{slot.time} • {slot.duration}</div>
                    <div className="session-subject">{slot.subject}</div>
                    <div className="session-topic">{slot.topic}</div>
                    <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className={`badge ${slot.priority === 'HIGH' ? 'badge-high' : 'badge-medium'}`} style={{ fontSize: '0.65rem' }}>
                        {slot.priority}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
