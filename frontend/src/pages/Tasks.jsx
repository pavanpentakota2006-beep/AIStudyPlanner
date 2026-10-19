import React, { useState } from 'react';
import { TaskCard } from '../components/TaskCard';
import { Plus, Search, Filter, CheckCircle } from 'lucide-react';

export const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Paxos vs Raft Leader Election Comparison Paper', subjectName: 'Distributed Systems', priority: 'HIGH', dueDate: '2026-08-12', difficulty: 4, completed: false },
    { id: 2, title: 'Implement Backpropagation Algorithm in Python', subjectName: 'Machine Learning', priority: 'HIGH', dueDate: '2026-08-13', difficulty: 5, completed: false },
    { id: 3, title: 'Construct LALR(1) Parsing Table for Expression Grammar', subjectName: 'Compiler Design', priority: 'MEDIUM', dueDate: '2026-08-15', difficulty: 3, completed: false },
    { id: 4, title: 'Deploy Kubernetes Helm Chart on MiniKube', subjectName: 'Cloud Computing', priority: 'LOW', dueDate: '2026-08-18', difficulty: 2, completed: true },
  ]);

  const [filterPriority, setFilterPriority] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', subjectName: 'Distributed Systems', priority: 'MEDIUM', dueDate: '', difficulty: 3 });

  const toggleTaskComplete = (taskId) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    setTasks([...tasks, { id: Date.now(), ...newTask, completed: false }]);
    setShowModal(false);
    setNewTask({ title: '', subjectName: 'Distributed Systems', priority: 'MEDIUM', dueDate: '', difficulty: 3 });
  };

  const filteredTasks = tasks.filter(t => {
    const matchesFilter = filterPriority === 'ALL' || t.priority === filterPriority;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.subjectName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Task & Assignment Manager</h1>
          <p className="sub-heading">Organize upcoming lab reports, exam preps, and assignments</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={18} /> Add New Task
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '240px' }}>
          <Search size={18} style={{ color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            className="form-input" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ height: '38px' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={16} style={{ color: 'var(--text-muted)' }} />
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Priority:</span>
          {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map((p) => (
            <button 
              key={p} 
              onClick={() => setFilterPriority(p)}
              className={`btn btn-secondary ${filterPriority === p ? 'active-nav' : ''}`}
              style={{ height: '34px', fontSize: '0.78rem', padding: '0 0.75rem' }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} onToggleComplete={toggleTaskComplete} />
        ))}
      </div>

      {/* Add Task Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '440px', padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.25rem' }}>Create New Task</h3>
            <form onSubmit={handleAddTask}>
              <div className="form-group">
                <label className="form-label">Task Title</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="e.g. Distributed Systems Lab 3 Report"
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <select 
                  className="form-select"
                  value={newTask.subjectName}
                  onChange={(e) => setNewTask({ ...newTask, subjectName: e.target.value })}
                >
                  <option value="Distributed Systems">Distributed Systems</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Compiler Design">Compiler Design</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                </select>
              </div>

              <div className="form-group" style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Priority</label>
                  <select 
                    className="form-select"
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  >
                    <option value="HIGH">High Priority</option>
                    <option value="MEDIUM">Medium Priority</option>
                    <option value="LOW">Low Priority</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Due Date</label>
                  <input 
                    type="date" 
                    className="form-input"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Create Task</button>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
