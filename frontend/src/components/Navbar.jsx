import React, { useState, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ThemeContext } from '../context/ThemeContext';
import { Search, Bell, Sun, Moon, Sparkles, User, LogOut, ChevronDown } from 'lucide-react';
import { AIAssistantModal } from './AIAssistantModal';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);

  const notifications = [
    { id: 1, title: 'AI Schedule Updated', text: 'Distributed Systems study slot added for 09:00 AM', time: '10m ago' },
    { id: 2, title: 'Assignment Due Soon', text: 'Machine Learning Lab Report due in 24 hours', time: '1h ago' },
    { id: 3, title: 'Streak Milestone!', text: '🔥 You hit a 7-day study streak! Keep going.', time: '3h ago' }
  ];

  return (
    <header className="navbar-header" style={{
      position: 'fixed',
      top: 0,
      right: 0,
      left: 'var(--sidebar-width)',
      height: 'var(--navbar-height)',
      background: 'var(--bg-card)',
      backdropFilter: 'var(--backdrop-blur)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      zIndex: 100,
      transition: 'var(--transition-normal)'
    }}>
      {/* Search Input */}
      <div style={{ position: 'relative', width: '340px' }}>
        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input 
          type="text" 
          placeholder="Search subjects, tasks, AI schedules..." 
          className="form-input"
          style={{ paddingLeft: '2.5rem', height: '40px', fontSize: '0.85rem' }}
        />
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Quick AI Trigger Button */}
        <button 
          onClick={() => setShowAIModal(true)} 
          className="btn btn-primary" 
          style={{ height: '38px', fontSize: '0.82rem', padding: '0 1rem' }}
        >
          <Sparkles size={16} />
          <span>Ask AI Assistant</span>
        </button>

        {/* AI Assistant Modal */}
        <AIAssistantModal isOpen={showAIModal} onClose={() => setShowAIModal(false)} />

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme} 
          className="btn btn-secondary btn-icon"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={18} style={{ color: '#fbbf24' }} /> : <Moon size={18} style={{ color: '#818cf8' }} />}
        </button>

        {/* Notifications Dropdown */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)} 
            className="btn btn-secondary btn-icon"
            style={{ position: 'relative' }}
          >
            <Bell size={18} />
            <span style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-rose)'
            }} />
          </button>

          {showNotifications && (
            <div className="glass-card animate-fade-in" style={{
              position: 'absolute',
              right: 0,
              top: '50px',
              width: '320px',
              padding: '1rem',
              zIndex: 200
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <h4 style={{ fontSize: '0.9rem' }}>Notifications</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary)', cursor: 'pointer' }}>Mark all read</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {notifications.map((n) => (
                  <div key={n.id} style={{
                    padding: '0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255,255,255,0.03)',
                    borderLeft: '3px solid var(--primary)'
                  }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{n.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{n.text}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: '4px' }}>{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div style={{ position: 'relative' }}>
          <div 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          >
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              color: '#fff',
              fontSize: '0.9rem'
            }}>
              {user?.name ? user.name.charAt(0) : 'A'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.2 }}>{user?.name || 'Alex Johnson'}</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>CSE Student</span>
            </div>
            <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
          </div>

          {showProfileMenu && (
            <div className="glass-card animate-fade-in" style={{
              position: 'absolute',
              right: 0,
              top: '50px',
              width: '180px',
              padding: '0.5rem',
              zIndex: 200
            }}>
              <a href="/profile" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start', border: 'none' }}>
                <User size={16} /> Profile
              </a>
              <button onClick={logout} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start', border: 'none', color: 'var(--accent-rose)' }}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
