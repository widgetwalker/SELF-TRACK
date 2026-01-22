// ===== STATE MANAGEMENT =====
const state = {
  currentUser: null,
  tasks: [],
  leaves: [],
  skills: [],
  notifications: [],
  analytics: null,
  currentSection: 'dashboard'
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', async () => {
  await initializeApp();
});

async function initializeApp() {
  try {
    // Check authentication
    const user = JSON.parse(localStorage.getItem('worktrack_user') || 'null');
    const token = localStorage.getItem('worktrack_token');

    if (!user || !token) {
      window.location.href = '../2-login/login.html';
      return;
    }

    if (user.role !== 'employee') {
      window.location.href = '../admin-dashboard/index.html';
      return;
    }

    state.currentUser = user;
    
    // Initialize UI
    initializeUserUI();
    setupNavigation();
    updateCurrentDate();

    // Load dashboard data
    await loadDashboardData();
    showToast('Dashboard loaded successfully', 'success');
  } catch (error) {
    console.error('Failed to initialize app:', error);
    showToast('Failed to load dashboard', 'error');
  }
}

// ===== UI INITIALIZATION =====
function initializeUserUI() {
  document.getElementById('user-name').textContent = state.currentUser.name || 'User';
  document.getElementById('user-role').textContent = 'Employee';
  document.getElementById('page-title').textContent = 'Dashboard';
  
  const initials = (state.currentUser.name || 'U').split(' ')
    .map(n => n[0].toUpperCase())
    .slice(0, 2)
    .join('');
  document.getElementById('user-avatar').textContent = initials;
}

function setupNavigation() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.dataset.section;
      showSection(section);
      
      // Update active state
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

function updateCurrentDate() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date().toLocaleDateString('en-US', options);
  document.getElementById('current-date').textContent = today;
}

// ===== SECTION NAVIGATION =====
function showSection(sectionName) {
  state.currentSection = sectionName;
  
  // Hide all sections
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  
  // Show selected section
  const section = document.getElementById(`${sectionName}-section`);
  if (section) {
    section.classList.add('active');
  }

  // Update page title
  const titles = {
    dashboard: 'Dashboard',
    tasks: 'My Tasks',
    leaves: 'Leave Management',
    skills: 'Skills Profile',
    analytics: 'Performance Analytics',
    notifications: 'Notifications'
  };
  
  document.getElementById('page-title').textContent = titles[sectionName] || 'Dashboard';

  // Load section-specific data
  if (sectionName === 'tasks') loadTasks();
  else if (sectionName === 'leaves') loadLeaves();
  else if (sectionName === 'skills') loadSkills();
  else if (sectionName === 'analytics') loadAnalytics();
  else if (sectionName === 'notifications') loadNotifications();
}

// ===== LOAD DASHBOARD DATA =====
async function loadDashboardData() {
  try {
    const response = await api.getDashboard();
    
    if (response && response.role === 'employee') {
      // Update stats
      document.getElementById('pending-tasks').textContent = response.tasks?.total || 0;
      document.getElementById('completed-tasks').textContent = response.tasks?.completed || 0;
      
      // Calculate leave balance
      const leaveBalance = calculateLeaveBalance(response.leaves?.approved || 0);
      document.getElementById('leave-balance').textContent = leaveBalance + ' days';
      
      document.getElementById('skills-mastered').textContent = response.skills?.total || 0;
      
      // Load recent tasks
      await loadTasks();
    }
  } catch (error) {
    console.error('Failed to load dashboard:', error);
    showToast('Failed to load dashboard data', 'error');
  }
}

function calculateLeaveBalance(approvedLeaves) {
  const annualLeave = 20;
  return Math.max(0, annualLeave - (approvedLeaves || 0));
}

// ===== TASKS SECTION =====
async function loadTasks() {
  try {
    const response = await api.getMyTasks();
    state.tasks = response.tasks || [];
    
    // Update badge
    const pendingCount = state.tasks.filter(t => t.status !== 'completed').length;
    document.getElementById('task-badge').textContent = pendingCount;
    
    // Render tasks
    renderTasks();
  } catch (error) {
    console.error('Failed to load tasks:', error);
  }
}

function renderTasks() {
  const container = document.getElementById('tasks-container');
  
  if (!state.tasks || state.tasks.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">✓</div>
        <p>No tasks assigned yet</p>
      </div>
    `;
    
    // Also update recent tasks
    document.getElementById('recent-tasks').innerHTML = `
      <div class="empty-state">
        <p>No recent tasks</p>
      </div>
    `;
    return;
  }

  container.innerHTML = state.tasks.map(task => `
    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: start; gap: 1rem;">
        <div style="flex: 1;">
          <h3>${task.title}</h3>
          <p style="color: #666; margin: 0.5rem 0; font-size: 0.9rem;">${task.description || 'No description'}</p>
          <div style="display: flex; gap: 1rem; margin-top: 1rem; align-items: center;">
            <span class="task-status status-${task.status}">${formatStatus(task.status)}</span>
            <span style="font-size: 0.85rem; color: #999;">Created: ${formatDate(task.createdAt)}</span>
          </div>
        </div>
        <select onchange="updateTaskStatus('${task._id}', this.value)" style="padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
          <option value="pending" ${task.status === 'pending' ? 'selected' : ''}>Pending</option>
          <option value="in_progress" ${task.status === 'in_progress' ? 'selected' : ''}>In Progress</option>
          <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
        </select>
      </div>
    </div>
  `).join('');

  // Update recent tasks
  renderRecentTasks();
}

function renderRecentTasks() {
  const recentContainer = document.getElementById('recent-tasks');
  const recent = state.tasks.slice(0, 3);
  
  if (recent.length === 0) {
    recentContainer.innerHTML = '<p style="text-align: center; color: #999;">No recent tasks</p>';
    return;
  }

  recentContainer.innerHTML = recent.map(task => `
    <div class="task-item">
      <strong>${task.title}</strong>
      <span class="task-status status-${task.status}">${formatStatus(task.status)}</span>
      <small>Created: ${formatDate(task.createdAt)}</small>
    </div>
  `).join('');
}

async function updateTaskStatus(taskId, newStatus) {
  try {
    await api.updateTaskStatus(taskId, { status: newStatus });
    showToast('Task status updated', 'success');
    await loadTasks();
  } catch (error) {
    console.error('Failed to update task:', error);
    showToast('Failed to update task status', 'error');
  }
}

// ===== LEAVES SECTION =====
async function loadLeaves() {
  try {
    const response = await api.getMyLeaves();
    state.leaves = response.leaves || [];
    renderLeaves();
  } catch (error) {
    console.error('Failed to load leaves:', error);
  }
}

function renderLeaves() {
  const container = document.getElementById('leaves-container');
  
  if (!state.leaves || state.leaves.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📅</div>
        <p>No leave requests yet</p>
      </div>
    `;
    return;
  }

  container.innerHTML = state.leaves.map(leave => `
    <div class="leave-item">
      <div>
        <div class="leave-dates">${formatDate(leave.startDate)} to ${formatDate(leave.endDate)}</div>
        <div class="leave-reason">${leave.reason}</div>
        <small style="color: #999;">Applied: ${formatDate(leave.createdAt)}</small>
      </div>
      <span class="leave-status status-${leave.status}">${formatStatus(leave.status)}</span>
    </div>
  `).join('');
}

function openLeaveForm() {
  document.getElementById('leave-form-container').style.display = 'block';
  document.getElementById('leave-start').value = '';
  document.getElementById('leave-end').value = '';
  document.getElementById('leave-reason').value = '';
}

function closeLeaveForm() {
  document.getElementById('leave-form-container').style.display = 'none';
}

async function submitLeaveRequest(e) {
  e.preventDefault();

  const startDate = document.getElementById('leave-start').value;
  const endDate = document.getElementById('leave-end').value;
  const reason = document.getElementById('leave-reason').value;
  const messageEl = document.getElementById('form-message');

  // Validation
  if (!startDate || !endDate || !reason) {
    showFormMessage(messageEl, 'Please fill all fields', 'error');
    return;
  }

  if (new Date(endDate) <= new Date(startDate)) {
    showFormMessage(messageEl, 'End date must be after start date', 'error');
    return;
  }

  try {
    await api.applyLeave({ startDate, endDate, reason });
    showFormMessage(messageEl, 'Leave request submitted successfully', 'success');
    closeLeaveForm();
    setTimeout(() => loadLeaves(), 1000);
  } catch (error) {
    showFormMessage(messageEl, error.message || 'Failed to submit leave request', 'error');
  }
}

// ===== SKILLS SECTION =====
async function loadSkills() {
  try {
    const response = await api.getMySkills();
    state.skills = response.skills || [];
    renderSkills();
  } catch (error) {
    console.error('Failed to load skills:', error);
  }
}

function renderSkills() {
  const container = document.getElementById('skills-container');
  
  if (!state.skills || state.skills.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">⭐</div>
        <p>No skills added yet</p>
        <button class="btn-primary" onclick="openSkillForm()">+ Add Your First Skill</button>
      </div>
    `;
    return;
  }

  container.innerHTML = state.skills.map((skill, idx) => `
    <div class="skill-card">
      <div class="skill-name">${skill.name}</div>
      <div class="skill-level">
        ${Array(5).fill(0).map((_, i) => 
          `<span class="star" style="opacity: ${i < skill.level ? 1 : 0.3};">★</span>`
        ).join('')}
      </div>
      <div class="skill-actions">
        <button onclick="editSkill(${idx})">Edit</button>
        <button onclick="deleteSkill('${skill._id || idx}')" style="background: #fee2e2; color: #ef4444;">Delete</button>
      </div>
    </div>
  `).join('');
}

function openSkillForm() {
  document.getElementById('skill-form-container').style.display = 'block';
  document.getElementById('skill-name').value = '';
  document.getElementById('skill-level').value = '';
}

function closeSkillForm() {
  document.getElementById('skill-form-container').style.display = 'none';
}

async function submitSkill(e) {
  e.preventDefault();

  const name = document.getElementById('skill-name').value;
  const level = parseInt(document.getElementById('skill-level').value);
  const messageEl = document.getElementById('skill-form-message');

  if (!name || !level) {
    showFormMessage(messageEl, 'Please fill all fields', 'error');
    return;
  }

  try {
    const currentSkills = state.skills || [];
    currentSkills.push({ name, level });
    await api.updateMySkills({ skills: currentSkills });
    
    showFormMessage(messageEl, 'Skill added successfully', 'success');
    closeSkillForm();
    setTimeout(() => loadSkills(), 500);
  } catch (error) {
    showFormMessage(messageEl, error.message || 'Failed to add skill', 'error');
  }
}

function editSkill(idx) {
  const skill = state.skills[idx];
  if (!skill) return;

  const newLevel = prompt(`Update proficiency level for "${skill.name}" (1-5):`, skill.level);
  if (newLevel === null) return;

  const level = parseInt(newLevel);
  if (isNaN(level) || level < 1 || level > 5) {
    showToast('Please enter a number between 1 and 5', 'error');
    return;
  }

  skill.level = level;
  updateSkillInDatabase();
}

async function deleteSkill(skillId) {
  if (!confirm('Are you sure you want to delete this skill?')) return;

  try {
    const updatedSkills = state.skills.filter((s, idx) => s._id !== skillId && idx.toString() !== skillId);
    await api.updateMySkills({ skills: updatedSkills });
    showToast('Skill deleted successfully', 'success');
    await loadSkills();
  } catch (error) {
    showToast('Failed to delete skill', 'error');
  }
}

async function updateSkillInDatabase() {
  try {
    await api.updateMySkills({ skills: state.skills });
    showToast('Skill updated successfully', 'success');
    await loadSkills();
  } catch (error) {
    showToast('Failed to update skill', 'error');
  }
}

// ===== ANALYTICS SECTION =====
async function loadAnalytics() {
  try {
    const response = await api.getPerformanceInsights();
    state.analytics = response;
    renderAnalytics();
  } catch (error) {
    console.error('Failed to load analytics:', error);
    document.getElementById('analytics-container').innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <p>Analytics data unavailable</p>
      </div>
    `;
  }
}

function renderAnalytics() {
  const container = document.getElementById('analytics-container');
  
  if (!state.analytics) {
    container.innerHTML = '<p>No analytics data available</p>';
    return;
  }

  container.innerHTML = `
    <div class="analytics-card">
      <h3>Productivity Score</h3>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${state.analytics.productivityScore || 0}%"></div>
      </div>
      <div class="progress-value">
        <span>Score</span>
        <strong>${state.analytics.productivityScore || 0}%</strong>
      </div>
    </div>
    
    <div class="analytics-card">
      <h3>Tasks Completion Rate</h3>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${state.analytics.completionRate || 0}%"></div>
      </div>
      <div class="progress-value">
        <span>Rate</span>
        <strong>${state.analytics.completionRate || 0}%</strong>
      </div>
    </div>
    
    <div class="analytics-card">
      <h3>Work-Life Balance</h3>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${state.analytics.workLifeBalance || 0}%"></div>
      </div>
      <div class="progress-value">
        <span>Score</span>
        <strong>${state.analytics.workLifeBalance || 0}%</strong>
      </div>
    </div>
  `;
}

// ===== NOTIFICATIONS SECTION =====
async function loadNotifications() {
  try {
    const response = await api.getMyNotifications();
    state.notifications = response.notifications || [];
    renderNotifications();
  } catch (error) {
    console.error('Failed to load notifications:', error);
  }
}

function renderNotifications() {
  const container = document.getElementById('notifications-container');
  
  if (!state.notifications || state.notifications.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔔</div>
        <p>No notifications</p>
      </div>
    `;
    return;
  }

  container.innerHTML = state.notifications.map(notif => `
    <div class="notification-item">
      <div class="notification-icon">📢</div>
      <div class="notification-content">
        <div class="notification-title">${notif.title}</div>
        <div class="notification-message">${notif.message}</div>
        <div class="notification-time">${formatDate(notif.createdAt)}</div>
      </div>
    </div>
  `).join('');
}

// ===== UTILITY FUNCTIONS =====
function formatStatus(status) {
  const statusMap = {
    'pending': 'Pending',
    'in_progress': 'In Progress',
    'completed': 'Completed',
    'approved': 'Approved',
    'rejected': 'Rejected'
  };
  return statusMap[status] || status;
}

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function showFormMessage(element, message, type) {
  element.textContent = message;
  element.className = `message ${type}`;
  element.style.display = 'block';
  
  if (type === 'success') {
    setTimeout(() => {
      element.style.display = 'none';
    }, 3000);
  }
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('worktrack_user');
    localStorage.removeItem('worktrack_token');
    window.location.href = '../2-login/login.html';
  }
}

// ===== API EXTENSIONS =====
// Add these methods to api-client.js if not already present
if (!api.getMyTasks) {
  api.getMyTasks = function() {
    return this.request('/tasks/my');
  };
}

if (!api.updateTaskStatus) {
  api.updateTaskStatus = function(id, data) {
    return this.request(`/tasks/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  };
}

if (!api.applyLeave) {
  api.applyLeave = function(data) {
    return this.request('/leaves', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  };
}

if (!api.getMyLeaves) {
  api.getMyLeaves = function() {
    return this.request('/leaves/my');
  };
}

if (!api.getMySkills) {
  api.getMySkills = function() {
    return this.request('/skills/my');
  };
}

if (!api.updateMySkills) {
  api.updateMySkills = function(data) {
    return this.request('/skills/my', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  };
}

if (!api.getMyNotifications) {
  api.getMyNotifications = function() {
    return this.request('/notifications/my');
  };
}

if (!api.getPerformanceInsights) {
  api.getPerformanceInsights = function() {
    return this.request('/ml/insights', { method: 'POST' });
  };
}
