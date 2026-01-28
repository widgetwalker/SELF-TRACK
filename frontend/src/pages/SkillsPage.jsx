import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Navigation from '../components/Navigation';
import AuthContext from '../context/AuthContext';
import apiClient from '../api-client-improved';
import './DashboardPage.css';

const SkillsPage = () => {
  const { auth } = useContext(AuthContext);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    proficiency: 'intermediate',
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.getMySkills();
      if (response.success) {
        setSkills(response.skills || []);
      } else {
        setError('Failed to fetch skills');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Please enter a skill name');
      return;
    }

    // Check for duplicate
    if (skills.some(s => s.name.toLowerCase() === formData.name.toLowerCase())) {
      setError('This skill already exists');
      return;
    }

    try {
      setLoading(true);
      const response = await apiClient.addMySkill({
        name: formData.name,
        proficiency: formData.proficiency
      });

      if (response.success) {
        setSkills(response.skills || []);
        setFormData({ name: '', proficiency: 'intermediate' });
        setShowForm(false);
        setSuccess('Skill added successfully!');
        setError(null);
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(response.message || 'Failed to add skill');
      }
    } catch (err) {
      setError(err.message || 'Failed to add skill');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = (id) => {
    setSkills(skills.filter(s => s.id !== id));
    setSuccess('Skill removed!');
    setTimeout(() => setSuccess(null), 2000);
  };

  const handleUpdateProficiency = (id, newProficiency) => {
    setSkills(skills.map(s => s.id === id ? { ...s, proficiency: newProficiency } : s));
    setSuccess('Proficiency updated!');
    setTimeout(() => setSuccess(null), 2000);
  };

  const getProficiencyColor = (level) => {
    switch(level) {
      case 'beginner': return '#ef4444';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#10b981';
      case 'expert': return '#3b82f6';
      default: return '#6b7280';
    }
  };

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
            <h1>My Skills</h1>
            <p>Manage and showcase your professional skills</p>
          </motion.header>

          {error && (
            <motion.div
              className="alert alert-error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              className="alert alert-success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {success}
            </motion.div>
          )}

          <motion.button
            className="action-btn"
            onClick={() => setShowForm(!showForm)}
            whileHover={{ scale: 1.05 }}
          >
            {showForm ? '✕ Cancel' : skills.length === 0 ? '+ Add First Skill' : '+ Add Skill'}
          </motion.button>

          <AnimatePresence>
            {showForm && (
              <motion.form
                onSubmit={handleAddSkill}
                className="form-card"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="form-group">
                  <label>Skill Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., React, Python, Leadership"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Proficiency Level</label>
                  <select
                    value={formData.proficiency}
                    onChange={(e) => setFormData({ ...formData, proficiency: e.target.value })}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>

                <button type="submit" className="btn-primary">Add Skill</button>
              </motion.form>
            )}
          </AnimatePresence>

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading skills...</p>
            </div>
          ) : skills.length > 0 ? (
            <motion.div
              className="skills-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {skills.map((skill, idx) => (
                <motion.div
                  key={skill.id}
                  className="skill-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="skill-header">
                    <h3>{skill.name}</h3>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteSkill(skill.id)}
                      title="Remove skill"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="proficiency-section">
                    <label>Proficiency:</label>
                    <select
                      value={skill.proficiency}
                      onChange={(e) => handleUpdateProficiency(skill.id, e.target.value)}
                      className="proficiency-select"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>

                  <div 
                    className="proficiency-bar"
                    style={{ backgroundColor: getProficiencyColor(skill.proficiency) }}
                  >
                    <span>{skill.proficiency}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div className="empty-state">
              <p>No skills yet. Add your first skill to get started! 🚀</p>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default SkillsPage;
