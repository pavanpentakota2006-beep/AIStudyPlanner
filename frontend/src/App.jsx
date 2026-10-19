import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { useAuth } from './hooks/useAuth';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Subjects } from './pages/Subjects';
import { Tasks } from './pages/Tasks';
import { StudyPlanner } from './pages/StudyPlanner';
import { AIPlanner } from './pages/AIPlanner';
import { Calendar } from './pages/Calendar';
import { Analytics } from './pages/Analytics';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import './styles/global.css';

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/study-planner" element={<StudyPlanner />} />
            <Route path="/ai-planner" element={<AIPlanner />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<ProtectedLayout />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
