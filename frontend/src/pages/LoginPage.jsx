import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import AuthContext from '../context/AuthContext';
import apiClient from '../api-client-improved';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('demo@selftrack.com');
  const [password, setPassword] = useState('demo123');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('employee');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('login');
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiClient.login(email, password);
      if (response.success) {
        handleLogin(response.user, response.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!fullName.trim()) {
      setError('Please enter your full name');
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.register(fullName, email, password, role);
      if (response.success) {
        handleLogin(response.user, response.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="login-page">
        <motion.div
          className="login-container"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="login-header">
            <h1>Self-Track</h1>
            <p>Workforce Management System</p>
          </div>

          <div className="tab-buttons">
            <button
              className={`tab-btn ${tab === 'login' ? 'active' : ''}`}
              onClick={() => setTab('login')}
            >
              Login
            </button>
            <button
              className={`tab-btn ${tab === 'register' ? 'active' : ''}`}
              onClick={() => setTab('register')}
            >
              Register
            </button>
          </div>

          <form onSubmit={tab === 'login' ? handleLoginSubmit : handleRegisterSubmit} className="login-form">
            {error && <div className="error-message">{error}</div>}

            {tab === 'login' ? (
              <>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-login"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                  />
                </div>

                <div className="form-group">
                  <label>Role</label>
                  <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn-login"
                  disabled={loading}
                >
                  {loading ? 'Creating account...' : 'Register'}
                </button>
              </>
            )}
          </form>

          <div className="demo-creds">
            <p>Demo Credentials:</p>
            <p><strong>Employee:</strong> demo@selftrack.com / demo123</p>
            <p><strong>Admin:</strong> admin@selftrack.com / admin123</p>
            <p><strong>Or Register as:</strong> Select "Register" tab and choose your role</p>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default LoginPage;
