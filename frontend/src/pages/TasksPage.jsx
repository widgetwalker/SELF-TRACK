import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Navigation from '../components/Navigation';
import AuthContext from '../context/AuthContext';
import './TasksPage.css';

const TasksPage = () => {
  const { auth } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
  });

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      // Dynamically import the API client
      const { default: apiClient } = await import('../api-client-improved');
      const filterParam = filter !== 'all' ? filter : '';
      const response = await apiClient.getTasks(filterParam);
      setTasks(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Task title is required');
      return;
    }

    try {
      const { default: apiClient } = await import('../api-client-improved');
      await apiClient.createTask(formData);
      setFormData({ title: '', description: '', priority: 'medium', dueDate: '' });
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      setError('Failed to create task: ' + (err.message || 'Unknown error'));
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const { default: apiClient } = await import('../api-client-improved');
      await apiClient.updateTaskStatus(taskId, newStatus);
      fetchTasks();
    } catch (err) {
      setError('Failed to update task: ' + (err.message || 'Unknown error'));
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f59e0b',
      'in-progress': '#3b82f6',
      completed: '#10b981',
      cancelled: '#ef4444',
    };
    return colors[status] || '#6b7280';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: '#10b981',
      medium: '#f59e0b',
      high: '#ef4444',
    };
    return colors[priority] || '#6b7280';
  };

  const statuses = ['all', 'pending', 'in-progress', 'completed'];

  return (
    <PageTransition>
      <Navigation />
      <div className="tasks-page">
        <div className="tasks-container">
          <motion.header
            className="tasks-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>My Tasks</h1>
            <button
              className="btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? '✕ Cancel' : '+ Create Task'}
            </button>
          </motion.header>

          {error && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              ⚠️ {error}
            </motion.div>
          )}

          <AnimatePresence>
            {showForm && (
              <motion.form
                className="task-form"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleCreateTask}
              >
                <div className="form-group">
                  <label>Task Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter task title"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Enter task description"
                    rows="3"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) =>
                        setFormData({ ...formData, priority: e.target.value })
                      }
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Due Date</label>
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) =>
                        setFormData({ ...formData, dueDate: e.target.value })
                      }
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary">
                  Create Task
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <motion.div
            className="filters"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {statuses.map((status) => (
              <button
                key={status}
                className={`filter-btn ${filter === status ? 'active' : ''}`}
                onClick={() => setFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </motion.div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <motion.div
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p>No tasks found. Create one to get started! 🚀</p>
            </motion.div>
          ) : (
            <motion.div
              className="tasks-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              <AnimatePresence>
                {tasks.map((task, index) => (
                  <motion.div
                    key={task._id}
                    className="task-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  >
                    <div className="task-header">
                      <h3>{task.title}</h3>
                      <div className="task-badges">
                        <span
                          className="badge priority"
                          style={{
                            backgroundColor: getPriorityColor(task.priority),
                          }}
                        >
                          {task.priority}
                        </span>
                        <span
                          className="badge status"
                          style={{
                            backgroundColor: getStatusColor(task.status),
                          }}
                        >
                          {task.status}
                        </span>
                      </div>
                    </div>

                    {task.description && (
                      <p className="task-description">{task.description}</p>
                    )}

                    {task.dueDate && (
                      <p className="task-duedate">
                        📅 Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    )}

                    {task.status !== 'completed' && (
                      <div className="task-actions">
                        <select
                          className="status-select"
                          value={task.status}
                          onChange={(e) =>
                            handleStatusChange(task._id, e.target.value)
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default TasksPage;
