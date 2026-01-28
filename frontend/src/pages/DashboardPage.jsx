import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import Navigation from '../components/Navigation';
import AuthContext from '../context/AuthContext';
import './DashboardPage.css';

const DashboardPage = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const cards = [
    { icon: '📋', title: 'Tasks', value: '12', color: '#3b82f6' },
    { icon: '🏖️', title: 'Leaves', value: '3', color: '#10b981' },
    { icon: '💼', title: 'Skills', value: '5', color: '#f59e0b' },
    { icon: '📈', title: 'Productivity', value: '78%', color: '#8b5cf6' },
  ];

  return (
    <PageTransition>
      <Navigation />
      <div className="dashboard-page">
        <div className="dashboard-container">
          <motion.header
            className="dashboard-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>Welcome back, {auth?.fullName}! 👋</h1>
            <p>Here's your performance overview</p>
          </motion.header>

          <motion.div
            className="stats-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                className="stat-card"
                style={{ borderTopColor: card.color }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="stat-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p className="stat-value">{card.value}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.section
            className="quick-actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <button className="action-btn" onClick={() => navigate('/tasks')}>📝 Create Task</button>
              <button className="action-btn" onClick={() => navigate('/leaves')}>🏖️ Request Leave</button>
              <button className="action-btn" onClick={() => navigate('/skills')}>⭐ Update Skills</button>
              <button className="action-btn" onClick={() => navigate('/performance')}>📊 View Analytics</button>
            </div>
          </motion.section>
        </div>
      </div>
    </PageTransition>
  );
};

export default DashboardPage;
