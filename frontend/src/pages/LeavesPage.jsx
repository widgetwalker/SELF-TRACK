import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Navigation from '../components/Navigation';
import AuthContext from '../context/AuthContext';
import apiClient from '../api-client-improved';
import './DashboardPage.css';

const LeavesPage = () => {
  const { auth } = useContext(AuthContext);
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    reason: '',
    startDate: '',
    endDate: '',
    type: 'casual',
  });

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.getMyLeaves();
      if (response.success) {
        setLeaves(response.leaves || []);
      } else {
        setError('Failed to fetch leaves');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch leaves');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitLeaveRequest = async (e) => {
    e.preventDefault();
    
    if (!formData.reason.trim() || !formData.startDate || !formData.endDate) {
      setError('Please fill in all fields');
      return;
    }

    // Validate end date is not before start date
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      setError('End date must be after start date');
      return;
    }

    try {
      setSubmitting(true);
      const response = await apiClient.applyLeave({
        reason: formData.reason,
        startDate: formData.startDate,
        endDate: formData.endDate,
        type: formData.type
      });

      if (response.success) {
        // Re-fetch leaves
        await fetchLeaves();
        setFormData({ reason: '', startDate: '', endDate: '', type: 'casual' });
        setShowForm(false);
        setSuccess('Leave request submitted successfully!');
        setError(null);
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(response.message || 'Failed to submit leave request');
      }
    } catch (err) {
      setError(err.message || 'Failed to submit leave request');
    } finally {
      setSubmitting(false);
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
            <h1>My Leaves</h1>
            <p>Manage your leave requests</p>
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
            {showForm ? '✕ Cancel' : '+ Request Leave'}
          </motion.button>

          <AnimatePresence>
            {showForm && (
              <motion.form
                onSubmit={handleSubmitLeaveRequest}
                className="form-card"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="form-group">
                  <label>Reason for Leave</label>
                  <input
                    type="text"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    placeholder="Enter reason"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Leave Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="casual">Casual Leave</option>
                    <option value="sick">Sick Leave</option>
                    <option value="earned">Earned Leave</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary">Submit Request</button>
              </motion.form>
            )}
          </AnimatePresence>

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading leaves...</p>
            </div>
          ) : leaves.length > 0 ? (
            <motion.div
              className="leaves-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {leaves.map((leave, idx) => (
                <motion.div
                  key={leave.id}
                  className="leave-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="leave-header">
                    <h3>{leave.reason}</h3>
                    <span className={`status-badge status-${leave.status}`}>
                      {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                    </span>
                  </div>
                  <div className="leave-details">
                    <p><strong>Type:</strong> {leave.type}</p>
                    <p><strong>Duration:</strong> {leave.startDate} to {leave.endDate}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div className="empty-state">
              <p>No leaves yet. Request your first leave!</p>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default LeavesPage;
