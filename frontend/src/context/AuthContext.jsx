import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('study_planner_user');
    return saved ? JSON.parse(saved) : {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex.johnson@university.edu',
      role: 'STUDENT',
      department: 'Computer Science & Engineering',
      semester: '7th Semester',
      gpa: '3.85',
      dailyTargetHours: 4.5,
      preferredStudyMethod: 'Pomodoro (50/10)'
    };
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('study_planner_token') || 'demo_jwt_token_xyz_12345';
  });

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('study_planner_user', JSON.stringify(userData));
    localStorage.setItem('study_planner_token', jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('study_planner_user');
    localStorage.removeItem('study_planner_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
