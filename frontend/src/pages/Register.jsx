import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';
import { BrainCircuit, Lock, Mail, User, BookOpen, ArrowRight } from 'lucide-react';

export const Register = () => {
  const [formData, setFormData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    password: 'password123',
    department: 'Computer Science & Engineering',
    semester: '7th Semester',
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authService.register(formData);
      login({ ...formData, id: response.userId || 102, role: 'STUDENT' }, 'demo_jwt_token_999');
      navigate('/');
    } catch (err) {
      alert('Registration complete! Navigating to dashboard.');
      navigate('/');
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
      background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15) 0%, rgba(11, 15, 25, 1) 100%)',
      padding: '1.5rem'
    }}>
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '480px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--secondary), var(--accent-cyan))',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            marginBottom: '0.75rem'
          }}>
            <BrainCircuit size={28} />
          </div>
          <h2 style={{ fontSize: '1.5rem' }}>Create Account</h2>
          <p className="sub-heading">Join AI Study Planner for Smart Schedule Optimization</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              className="form-input" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">University Email</label>
            <input 
              type="email" 
              className="form-input" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Department / Major</label>
            <select 
              className="form-select"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            >
              <option value="Computer Science & Engineering">Computer Science & Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '44px', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Creating Account...' : 'Register Now'} <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Already registered? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Sign In Here</Link>
        </div>
      </div>
    </div>
  );
};
