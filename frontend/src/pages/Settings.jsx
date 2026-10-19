import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Settings as SettingsIcon, Moon, Sun, Bell, Database, Shield, Cpu } from 'lucide-react';

export const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1>System Settings</h1>
        <p className="sub-heading">Application preferences, notifications, theme, and API integrations</p>
      </div>

      <div className="glass-card">
        <h3 style={{ marginBottom: '1.25rem' }}>Appearance & Theme</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 600 }}>Active Theme Mode</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Toggle between Futuristic Dark Mode and Light Mode</p>
          </div>
          <button onClick={toggleTheme} className="btn btn-secondary">
            {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
            <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
        </div>
      </div>

      <div className="glass-card">
        <h3 style={{ marginBottom: '1.25rem' }}>AI Integration Engine Settings</h3>
        <div className="form-group">
          <label className="form-label">Active AI Engine Model</label>
          <select className="form-select" defaultValue="GPT4_MINI">
            <option value="GPT4_MINI">OpenAI GPT-4o Mini (Fast & Accurate)</option>
            <option value="CLAUDE_HAIKU">Anthropic Claude 3.5 Haiku</option>
            <option value="LOCAL_OPTIMIZER">Built-in Python Dynamic Programming Service (Offline)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
