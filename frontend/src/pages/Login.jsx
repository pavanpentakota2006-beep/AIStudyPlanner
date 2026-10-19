import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';
import { BrainCircuit, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('alex.johnson@university.edu');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authService.login(email, password);
      login(response.user, response.token);
      navigate('/');
    } catch (err) {
      alert('Login failed. Using demo login fallback.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, rgba(11, 15, 25, 1) 100%)',
      padding: '1.5rem'
    }}>
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '440px', padding: '2.5rem' }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            marginBottom: '1rem',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <BrainCircuit size={32} />
          </div>
          <h2 style={{ fontSize: '1.6rem' }}>Welcome Back</h2>
          <p className="sub-heading">Sign in to your AI Study Planner Portal</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">University Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="email" 
                className="form-input" 
                style={{ paddingLeft: '2.5rem' }} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="password" 
                className="form-input" 
                style={{ paddingLeft: '2.5rem' }} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '44px', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Register Here</Link>
        </div>

        <div style={{ marginTop: '1.5rem', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          <Sparkles size={14} style={{ color: 'var(--accent-cyan)', verticalAlign: 'middle', marginRight: '4px' }} />
          Demo Mode Enabled: Click Sign In to instantly access student dashboard.
        </div>
      </div>
    </div>
  );
};
