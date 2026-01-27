import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AuthContext from './context/AuthContext';
import apiClient from './api-client-improved';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import LeavesPage from './pages/LeavesPage';
import SkillsPage from './pages/SkillsPage';
import SalaryPage from './pages/SalaryPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import PerformanceInsightPage from './pages/PerformanceInsightPage';

// Styles
import './styles/global.css';

function App() {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('worktrack_user');
    if (user) {
      try {
        setAuth(JSON.parse(user));
      } catch (e) {
        localStorage.removeItem('worktrack_user');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData, token) => {
    const userData_with_token = { ...userData, token };
    localStorage.setItem('worktrack_user', JSON.stringify(userData_with_token));
    apiClient.setToken(token);
    setAuth(userData_with_token);
  };

  const handleLogout = () => {
    localStorage.removeItem('worktrack_user');
    apiClient.setToken(null);
    setAuth(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, handleLogin, handleLogout }}>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={!auth ? <HomePage /> : <Navigate to="/dashboard" />} />
            <Route path="/login" element={!auth ? <LoginPage /> : <Navigate to="/dashboard" />} />

            {/* Protected Routes */}
            {auth && (
              <>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/leaves" element={<LeavesPage />} />
                <Route path="/skills" element={<SkillsPage />} />
                <Route path="/salary" element={<SalaryPage />} />
                <Route path="/performance" element={<PerformanceInsightPage />} />

                {auth.role === 'admin' && (
                  <Route path="/admin" element={<AdminDashboardPage />} />
                )}
              </>
            )}

            {/* Catch all */}
            <Route path="*" element={<Navigate to={auth ? "/dashboard" : "/"} />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
