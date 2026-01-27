import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthContext from '../context/AuthContext';
import './Navigation.css';

const Navigation = () => {
  const { auth, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!auth) return null;

  const isActive = (path) => location.pathname === path;

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          <span className="logo-icon">📊</span>
          Self-Track
        </Link>

        <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <Link
            to="/dashboard"
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/tasks"
            className={`nav-link ${isActive('/tasks') ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Tasks
          </Link>
          <Link
            to="/leaves"
            className={`nav-link ${isActive('/leaves') ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Leaves
          </Link>
          <Link
            to="/skills"
            className={`nav-link ${isActive('/skills') ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Skills
          </Link>
          {auth.role === 'admin' && (
            <Link
              to="/admin"
              className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </Link>
          )}

          <div className="nav-user">
            <span className="user-name">{auth.fullName}</span>
            <button
              className="btn-logout"
              onClick={() => {
                handleLogoutClick();
                setMenuOpen(false);
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </motion.nav>
  );
};

export default Navigation;
