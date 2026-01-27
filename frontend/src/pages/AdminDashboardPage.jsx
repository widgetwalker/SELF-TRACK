import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Navigation from '../components/Navigation';
import './DashboardPage.css';

const Page = () => {
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
            <h1>Feature Page</h1>
            <p>Page ready to be built with full functionality</p>
          </motion.header>

          <motion.section
            className="quick-actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="card">
              <p style={{ textAlign: 'center', color: '#6b7280' }}>
                Use REACT_MIGRATION_GUIDE.md template to add components here ✨
              </p>
            </div>
          </motion.section>
        </div>
      </div>
    </PageTransition>
  );
};

export default Page;
