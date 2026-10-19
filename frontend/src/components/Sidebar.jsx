import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, BookOpen, CheckSquare, Calendar, Sparkles, 
  BarChart3, User, Settings, Flame, BrainCircuit, Clock
} from 'lucide-react';

export const Sidebar = () => {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/subjects', label: 'Subjects', icon: BookOpen },
    { path: '/tasks', label: 'Tasks Manager', icon: CheckSquare },
    { path: '/study-planner', label: 'Study Planner', icon: Clock },
    { path: '/ai-planner', label: 'AI Optimizer', icon: Sparkles, badge: 'AI' },
    { path: '/calendar', label: 'Calendar', icon: Calendar },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: 'var(--sidebar-width)',
      height: '100vh',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem 1rem',
      zIndex: 110
    }}>
      {/* Brand Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 0.5rem 1.5rem 0.5rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1rem' }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: 'var(--radius-md)',
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          boxShadow: 'var(--shadow-glow)'
        }}>
          <BrainCircuit size={22} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.1rem', lineHeight: 1.1 }}>AI Study Planner</h2>
          <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>CSE EDITION v1.0</span>
        </div>
      </div>

      {/* Nav Links */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `btn btn-secondary ${isActive ? 'active-nav' : ''}`}
              style={({ isActive }) => ({
                justifyContent: 'flex-start',
                width: '100%',
                padding: '0.75rem 1rem',
                border: 'none',
                background: isActive ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.15))' : 'transparent',
                color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                fontWeight: isActive ? 700 : 500,
                borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                borderRadius: 'var(--radius-sm)'
              })}
            >
              <Icon size={18} style={{ color: item.badge ? 'var(--accent-cyan)' : 'inherit' }} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && (
                <span className="badge" style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: '#fff', fontSize: '0.65rem' }}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Streak Widget */}
      <div className="glass-card" style={{ padding: '1rem', marginTop: 'auto', background: 'rgba(99, 102, 241, 0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Flame size={20} style={{ color: 'var(--accent-amber)' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>7 Day Streak!</span>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>You're in top 5% of active students this week.</p>
      </div>
    </aside>
  );
};
