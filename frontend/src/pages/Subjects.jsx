import React, { useState } from 'react';
import { StudyCard } from '../components/StudyCard';
import { Plus, BookOpen, Search, Filter } from 'lucide-react';

export const Subjects = () => {
  const [showModal, setShowModal] = useState(false);
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Distributed Systems', code: 'CS701', progress: 82, creditHours: 4, totalTopics: 12, completedTopics: 10 },
    { id: 2, name: 'Machine Learning', code: 'CS702', progress: 70, creditHours: 4, totalTopics: 14, completedTopics: 10 },
    { id: 3, name: 'Compiler Design', code: 'CS703', progress: 55, creditHours: 3, totalTopics: 10, completedTopics: 5 },
    { id: 4, name: 'Cloud Computing & DevOps', code: 'CS704', progress: 90, creditHours: 3, totalTopics: 8, completedTopics: 7 },
    { id: 5, name: 'Advanced Database Systems', code: 'CS705', progress: 64, creditHours: 4, totalTopics: 11, completedTopics: 7 },
  ]);

  const [newSubject, setNewSubject] = useState({ name: '', code: '', creditHours: 3, totalTopics: 10 });

  const handleAddSubject = (e) => {
    e.preventDefault();
    setSubjects([...subjects, { id: Date.now(), ...newSubject, progress: 0, completedTopics: 0 }]);
    setShowModal(false);
    setNewSubject({ name: '', code: '', creditHours: 3, totalTopics: 10 });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Subject Management</h1>
          <p className="sub-heading">Track your course syllabus, credit weightage, and topic mastery</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={18} /> Add New Subject
        </button>
      </div>

      {/* Grid of Subjects */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {subjects.map((sub) => (
          <StudyCard key={sub.id} subject={sub} />
        ))}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '420px', padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.25rem' }}>Add New Subject</h3>
            <form onSubmit={handleAddSubject}>
              <div className="form-group">
                <label className="form-label">Subject Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                  placeholder="e.g. Natural Language Processing"
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject Code</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={newSubject.code}
                  onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
                  placeholder="e.g. CS708"
                  required 
                />
              </div>

              <div className="form-group" style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Credit Hours</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={newSubject.creditHours}
                    onChange={(e) => setNewSubject({ ...newSubject, creditHours: parseInt(e.target.value) })}
                    min="1" max="6"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Total Modules</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={newSubject.totalTopics}
                    onChange={(e) => setNewSubject({ ...newSubject, totalTopics: parseInt(e.target.value) })}
                    min="1"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Subject</button>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
