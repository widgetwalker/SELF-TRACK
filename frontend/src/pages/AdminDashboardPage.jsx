import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Navigation from '../components/Navigation';
import AuthContext from '../context/AuthContext';
import './DashboardPage.css';

const AdminDashboardPage = () => {
  const { auth } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');

  if (auth?.role !== 'admin') {
    return (
      <PageTransition>
        <Navigation />
        <div className="dashboard-page">
          <div className="dashboard-container">
            <motion.header className="dashboard-header">
              <h1>Access Denied</h1>
              <p>You don't have permission to access the admin panel.</p>
            </motion.header>
          </div>
        </div>
      </PageTransition>
    );
  }

  const statsCards = [
    { icon: '👥', title: 'Total Users', value: '156', color: '#3b82f6' },
    { icon: '✅', title: 'Completed Tasks', value: '892', color: '#10b981' },
    { icon: '⏳', title: 'Pending Tasks', value: '45', color: '#f59e0b' },
    { icon: '📊', title: 'Avg Productivity', value: '82%', color: '#8b5cf6' },
  ];

  const adminActions = [
    { label: 'Manage Users', icon: '👥', description: 'Add, edit, or remove users' },
    { label: 'View Reports', icon: '📈', description: 'Analyze system metrics and reports' },
    { label: 'Task Management', icon: '✅', description: 'Oversee all tasks in the system' },
    { label: 'Leave Approvals', icon: '🏖️', description: 'Approve or reject leave requests' },
    { label: 'Skill Tracking', icon: '⭐', description: 'Monitor employee skills' },
    { label: 'System Settings', icon: '⚙️', description: 'Configure system preferences' },
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
            <h1>Admin Dashboard</h1>
            <p>System overview and management</p>
          </motion.header>

          <motion.div
            className="stats-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {statsCards.map((card, idx) => (
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
            className="admin-actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2>Admin Actions</h2>
            <div className="actions-grid">
              {adminActions.map((action, idx) => (
                <motion.div
                  key={idx}
                  className="action-card"
                  whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <div className="action-icon">{action.icon}</div>
                  <h3>{action.label}</h3>
                  <p>{action.description}</p>
                  <button className="action-link">Go →</button>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="recent-activity"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h2>Recent Activity</h2>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-time">10 mins ago</span>
                <span className="activity-text">User John Doe logged in</span>
              </div>
              <div className="activity-item">
                <span className="activity-time">2 hours ago</span>
                <span className="activity-text">Task #45 was marked as completed</span>
              </div>
              <div className="activity-item">
                <span className="activity-time">5 hours ago</span>
                <span className="activity-text">New leave request from Sarah Smith</span>
              </div>
              <div className="activity-item">
                <span className="activity-time">1 day ago</span>
                <span className="activity-text">System backup completed successfully</span>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </PageTransition>
  );
};

export default AdminDashboardPage;
