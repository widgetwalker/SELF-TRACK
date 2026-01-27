import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import './HomePage.css';

const HomePage = () => {
  const features = [
    { icon: '📋', title: 'Task Management', desc: 'Prioritized feeds and deadline tracking' },
    { icon: '🏖️', title: 'Leave Management', desc: 'One-click leave requests' },
    { icon: '📈', title: 'Skill Growth', desc: 'Track your proficiency and development' },
    { icon: '🤖', title: 'AI Insights', desc: 'ML-powered productivity and burnout detection' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <PageTransition>
      <div className="homepage">
        <header className="hero">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1>Self-Track</h1>
            <p>Intelligent Workforce Management System</p>
            <div className="hero-buttons">
              <Link to="/login" className="btn btn-primary">
                Get Started
              </Link>
            </div>
          </motion.div>
        </header>

        <section className="features">
          <h2>Powerful Features</h2>
          <motion.div
            className="features-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, idx) => (
              <motion.div key={idx} className="feature-card" variants={itemVariants}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <footer className="footer">
          <p>&copy; 2026 Self-Track. All rights reserved.</p>
        </footer>
      </div>
    </PageTransition>
  );
};

export default HomePage;
