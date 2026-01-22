// ===== STATE MANAGEMENT =====
const state = {
  currentUser: null,
  employees: [],
  tasks: [],
  leaves: [],
  selectedEmployee: null,
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

    if (user.role !== 'admin') {
      window.location.href = '../3-dashboard/index.html';
      return;
    }

    state.currentUser = user;
    
    // Initialize UI
    initializeUserUI();
    setupNavigation();
    updateCurrentDate();
    setupTabNavigation();

    // Load dashboard data
    await loadDashboardData();
    showToast('Admin dashboard loaded successfully', 'success');
  } catch (error) {
    console.error('Failed to initialize app:', error);
    showToast('Failed to load dashboard', 'error');
  }
}

// ===== UI INITIALIZATION =====
function initializeUserUI() {
  document.getElementById('user-name').textContent = state.currentUser.name || 'Admin';
  document.getElementById('user-role').textContent = 'Administrator';
  
  const initials = (state.currentUser.name || 'A').split(' ')
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

function setupTabNavigation() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.dataset.tab;
      
      // Hide all tabs
      document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
      });
      
      // Show selected tab
      document.getElementById(`${tabName}-tab`).classList.add('active');
      
      // Update active button
      document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      
      // Load tab-specific data
      if (state.selectedEmployee) {
        if (tabName === 'leaves') loadEmployeeLeaves(state.selectedEmployee._id);
        else if (tabName === 'salary') loadEmployeeSalary(state.selectedEmployee._id);
        else if (tabName === 'analytics') loadEmployeeAnalytics(state.selectedEmployee._id);
      }
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
    dashboard: 'Admin Dashboard',
    employees: 'Employee Management',
    tasks: 'Task Management',
    leaves: 'Leave Requests',
    analytics: 'Organization Analytics'
  };
  
  document.getElementById('page-title').textContent = titles[sectionName] || 'Admin Dashboard';

  // Load section-specific data
  if (sectionName === 'employees') loadEmployees();
  else if (sectionName === 'tasks') loadAllTasks();
  else if (sectionName === 'leaves') loadAllLeaves();
  else if (sectionName === 'analytics') loadOrganizationAnalytics();
}

// ===== DASHBOARD SECTION =====
async function loadDashboardData() {
  try {
    // Load employees first
    const employeesResponse = await api.request('/admin/employees').catch(() => ({ users: [] }));
    state.employees = employeesResponse.users || [];
    
    // Load tasks
    const tasksResponse = await api.request('/tasks').catch(() => ({ tasks: [] }));
    state.tasks = tasksResponse.tasks || [];
    
    // Load leaves
    const leavesResponse = await api.getAllLeaves().catch(() => ({ leaves: [] }));
    state.leaves = leavesResponse.leaves || [];

    // Update stats
    document.getElementById('total-employees').textContent = state.employees.length;
    
    const activeTasks = state.tasks.filter(t => t.status !== 'completed').length;
    document.getElementById('active-tasks').textContent = activeTasks;
    
    const pendingLeaves = state.leaves.filter(l => l.status === 'pending').length;
    document.getElementById('pending-leaves').textContent = pendingLeaves;
    
    // Calculate average productivity (mock for now)
    document.getElementById('avg-productivity').textContent = '75%';
    
    renderDashboardAnalytics();
  } catch (error) {
    console.error('Failed to load dashboard data:', error);
  }
}

function renderDashboardAnalytics() {
  // Productivity overview
  const productivityHtml = `
    <div style="text-align: center;">
      <div style="font-size: 2rem; font-weight: bold; color: #667eea; margin: 1rem 0;">75%</div>
      <div style="color: #666; font-size: 0.9rem;">Team Average</div>
      <div style="margin-top: 1rem; height: 200px; display: flex; align-items: flex-end; gap: 0.5rem; justify-content: center;">
        ${['Alice', 'Bob', 'Carol', 'David'].map((name, i) => {
          const height = Math.random() * 180 + 20;
          return `<div style="background: #667eea; width: 30px; height: ${height}px; border-radius: 4px; position: relative;">
            <div style="position: absolute; bottom: -25px; font-size: 0.75rem; width: 100%; text-align: center;">${Math.floor(height / 2 * 0.75)}%</div>
          </div>`;
        }).join('')}
      </div>
    </div>
  `;
  document.getElementById('productivity-overview').innerHTML = productivityHtml;

  // Burnout assessment
  const burnoutHtml = `
    <div style="text-align: center;">
      <div style="margin: 1rem 0;">
        <div style="display: flex; gap: 1rem; justify-content: center; margin: 1rem 0;">
          <div>
            <div style="font-size: 1.5rem; font-weight: bold; color: #10b981;">2</div>
            <div style="color: #666; font-size: 0.85rem;">Low Risk</div>
          </div>
          <div>
            <div style="font-size: 1.5rem; font-weight: bold; color: #f59e0b;">3</div>
            <div style="color: #666; font-size: 0.85rem;">Medium Risk</div>
          </div>
          <div>
            <div style="font-size: 1.5rem; font-weight: bold; color: #ef4444;">1</div>
            <div style="color: #666; font-size: 0.85rem;">High Risk</div>
          </div>
        </div>
      </div>
    </div>
  `;
  document.getElementById('burnout-overview').innerHTML = burnoutHtml;
}

// ===== EMPLOYEES SECTION =====
async function loadEmployees() {
  try {
    const response = await api.request('/admin/employees').catch(() => ({ users: [] }));
    state.employees = response.users || [];
    
    // Setup search
    document.getElementById('employee-search').addEventListener('keyup', (e) => {
      const query = e.target.value.toLowerCase();
      renderEmployeesList(query);
    });
    
    renderEmployeesList();
  } catch (error) {
    console.error('Failed to load employees:', error);
  }
}

function renderEmployeesList(searchQuery = '') {
  const container = document.getElementById('employees-list');
  
  let filtered = state.employees;
  if (searchQuery) {
    filtered = state.employees.filter(emp => 
      emp.fullName?.toLowerCase().includes(searchQuery) ||
      emp.email?.toLowerCase().includes(searchQuery)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">No employees found</p>';
    return;
  }

  container.innerHTML = filtered.map(emp => `
    <div class="employee-item" onclick="selectEmployee('${emp._id}')" style="cursor: pointer; padding: 1rem; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 0.5rem; transition: all 0.3s; ${state.selectedEmployee?._id === emp._id ? 'background: #e0e8ff; border-color: #667eea;' : 'hover: background: #f8f9fa;'}">
      <strong>${emp.fullName}</strong>
      <small style="display: block; color: #666; margin-top: 0.25rem;">${emp.email}</small>
      <small style="display: block; color: #999; margin-top: 0.25rem;">Role: ${emp.role || 'Employee'}</small>
    </div>
  `).join('');
}

async function selectEmployee(employeeId) {
  const employee = state.employees.find(e => e._id === employeeId);
  if (!employee) return;

  state.selectedEmployee = employee;
  
  // Show details panel
  document.getElementById('employee-panel-empty').style.display = 'none';
  document.getElementById('employee-panel-content').style.display = 'block';
  document.getElementById('employee-detail-name').textContent = employee.fullName;
  
  // Load profile
  loadEmployeeProfile(employeeId);
  
  // Re-render list to show selection
  renderEmployeesList(document.getElementById('employee-search').value);
}

async function loadEmployeeProfile(employeeId) {
  try {
    const response = await api.request(`/admin/employees/${employeeId}`).catch(() => null);
    const employee = response?.user || state.selectedEmployee;
    
    const profileHtml = `
      <div style="padding: 1rem 0; border-bottom: 1px solid #eee;">
        <p><strong>Email:</strong> ${employee.email}</p>
        <p><strong>Role:</strong> ${employee.role || 'Employee'}</p>
        <p><strong>Joined:</strong> ${formatDate(employee.createdAt || new Date())}</p>
        <p><strong>Skills:</strong> ${employee.skills?.map(s => s.name).join(', ') || 'None'}</p>
      </div>
    `;
    
    document.getElementById('employee-profile-content').innerHTML = profileHtml;
  } catch (error) {
    console.error('Failed to load employee profile:', error);
  }
}

async function loadEmployeeLeaves(employeeId) {
  try {
    const response = await api.request(`/admin/employees/${employeeId}/leaves`).catch(() => ({ leaves: [] }));
    const leaves = response.leaves || state.leaves.filter(l => l.employee?._id === employeeId);
    
    if (leaves.length === 0) {
      document.getElementById('employee-leaves-content').innerHTML = '<p style="text-align: center; color: #999;">No leave requests</p>';
      return;
    }

    const leavesHtml = leaves.map(leave => `
      <div style="padding: 1rem; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 0.75rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong>${formatDate(leave.startDate)} to ${formatDate(leave.endDate)}</strong>
            <p style="color: #666; font-size: 0.9rem; margin: 0.5rem 0; 0;">${leave.reason}</p>
          </div>
          <span class="leave-status status-${leave.status}">${formatStatus(leave.status)}</span>
        </div>
        ${leave.status === 'pending' ? `
          <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
            <button class="btn-success btn-small" onclick="approveLeave('${leave._id}')">Approve</button>
            <button class="btn-danger btn-small" onclick="rejectLeave('${leave._id}')">Reject</button>
          </div>
        ` : ''}
      </div>
    `).join('');
    
    document.getElementById('employee-leaves-content').innerHTML = leavesHtml;
  } catch (error) {
    console.error('Failed to load employee leaves:', error);
  }
}

async function loadEmployeeSalary(employeeId) {
  try {
    const response = await api.request(`/admin/employees/${employeeId}/salary`).catch(() => null);
    const salary = response?.salary;
    
    if (!salary) {
      document.getElementById('employee-salary-content').innerHTML = '<p style="text-align: center; color: #999;">No salary information</p>';
      return;
    }

    const salaryHtml = `
      <div style="padding: 1rem; border: 1px solid #ddd; border-radius: 4px;">
        <p><strong>Base Salary:</strong> $${salary.baseSalary?.toLocaleString() || 0}</p>
        <p><strong>Allowances:</strong> $${salary.allowances?.toLocaleString() || 0}</p>
        <p><strong>Deductions:</strong> $${salary.deductions?.toLocaleString() || 0}</p>
        <p style="border-top: 1px solid #ddd; padding-top: 1rem; margin-top: 1rem;">
          <strong>Net Salary:</strong> $${salary.netSalary?.toLocaleString() || 0}
        </p>
      </div>
    `;
    
    document.getElementById('employee-salary-content').innerHTML = salaryHtml;
  } catch (error) {
    console.error('Failed to load employee salary:', error);
  }
}

async function loadEmployeeAnalytics(employeeId) {
  try {
    const response = await api.request(`/admin/employees/${employeeId}/analytics`).catch(() => null);
    const analytics = response?.analytics || {};
    
    const analyticsHtml = `
      <div class="analytics-card">
        <h4>Productivity Score</h4>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${analytics.productivityScore || 0}%"></div>
        </div>
        <div class="progress-value" style="display: flex; justify-content: space-between;">
          <span>Score</span>
          <strong>${analytics.productivityScore || 0}%</strong>
        </div>
      </div>
      
      <div class="analytics-card" style="margin-top: 1rem;">
        <h4>Task Completion Rate</h4>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${analytics.completionRate || 0}%"></div>
        </div>
        <div class="progress-value" style="display: flex; justify-content: space-between;">
          <span>Rate</span>
          <strong>${analytics.completionRate || 0}%</strong>
        </div>
      </div>
    `;
    
    document.getElementById('employee-analytics-content').innerHTML = analyticsHtml;
  } catch (error) {
    console.error('Failed to load employee analytics:', error);
  }
}

// ===== TASKS SECTION =====
async function loadAllTasks() {
  try {
    const response = await api.request('/tasks').catch(() => ({ tasks: [] }));
    state.tasks = response.tasks || [];
    
    // Populate employee select in form
    const employeeSelect = document.getElementById('task-employee');
    employeeSelect.innerHTML = '<option value="">Choose an employee...</option>' + 
      state.employees.map(emp => `<option value="${emp._id}">${emp.fullName}</option>`).join('');
    
    renderAllTasks();
  } catch (error) {
    console.error('Failed to load tasks:', error);
  }
}

function renderAllTasks() {
  const container = document.getElementById('tasks-container');
  
  if (!state.tasks || state.tasks.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">✓</div>
        <p>No tasks assigned yet</p>
      </div>
    `;
    return;
  }

  container.innerHTML = state.tasks.map(task => {
    const employee = state.employees.find(e => e._id === task.assignedTo);
    return `
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: start;">
          <div style="flex: 1;">
            <h3>${task.title}</h3>
            <p style="color: #666; font-size: 0.9rem; margin: 0.5rem 0;">${task.description || 'No description'}</p>
            <small style="color: #999;">Assigned to: <strong>${employee?.fullName || 'Unknown'}</strong></small>
            <div style="display: flex; gap: 1rem; margin-top: 1rem; align-items: center;">
              <span class="task-status status-${task.status}">${formatStatus(task.status)}</span>
              <span style="font-size: 0.85rem; color: #999;">Created: ${formatDate(task.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function openAssignTaskForm() {
  document.getElementById('task-form-container').style.display = 'block';
  document.getElementById('task-title').value = '';
  document.getElementById('task-description').value = '';
  document.getElementById('task-employee').value = '';
}

function closeAssignTaskForm() {
  document.getElementById('task-form-container').style.display = 'none';
}

async function submitTask(e) {
  e.preventDefault();

  const employeeId = document.getElementById('task-employee').value;
  const title = document.getElementById('task-title').value;
  const description = document.getElementById('task-description').value;
  const messageEl = document.getElementById('task-form-message');

  if (!employeeId || !title) {
    showFormMessage(messageEl, 'Please fill all required fields', 'error');
    return;
  }

  try {
    await api.createTask({ assignedTo: employeeId, title, description });
    showFormMessage(messageEl, 'Task assigned successfully', 'success');
    closeAssignTaskForm();
    setTimeout(() => loadAllTasks(), 500);
  } catch (error) {
    showFormMessage(messageEl, error.message || 'Failed to assign task', 'error');
  }
}

// ===== LEAVES SECTION =====
async function loadAllLeaves() {
  try {
    const response = await api.getAllLeaves().catch(() => ({ leaves: [] }));
    state.leaves = response.leaves || [];
    
    const pendingCount = state.leaves.filter(l => l.status === 'pending').length;
    document.getElementById('pending-leaves-count').textContent = `${pendingCount} pending`;
    
    renderAllLeaves();
  } catch (error) {
    console.error('Failed to load leaves:', error);
  }
}

function renderAllLeaves() {
  const container = document.getElementById('leaves-container');
  
  if (!state.leaves || state.leaves.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>No leave requests</p>
      </div>
    `;
    return;
  }

  // Group by status
  const pending = state.leaves.filter(l => l.status === 'pending');
  const approved = state.leaves.filter(l => l.status === 'approved');
  const rejected = state.leaves.filter(l => l.status === 'rejected');

  let html = '';
  
  if (pending.length > 0) {
    html += '<h3 style="margin-top: 0;">Pending Requests</h3>';
    html += pending.map(leave => renderLeaveItem(leave)).join('');
  }

  if (approved.length > 0) {
    html += '<h3 style="margin-top: 2rem;">Approved</h3>';
    html += approved.map(leave => renderLeaveItem(leave)).join('');
  }

  if (rejected.length > 0) {
    html += '<h3 style="margin-top: 2rem;">Rejected</h3>';
    html += rejected.map(leave => renderLeaveItem(leave)).join('');
  }

  container.innerHTML = html;
}

function renderLeaveItem(leave) {
  const employee = state.employees?.find(e => e._id === leave.employee?._id);
  return `
    <div class="leave-item">
      <div>
        <div class="leave-dates">${formatDate(leave.startDate)} to ${formatDate(leave.endDate)}</div>
        <div class="leave-reason">${leave.reason}</div>
        <small style="color: #999;">By: ${employee?.fullName || leave.employee?.fullName || 'Unknown'}</small>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <span class="leave-status status-${leave.status}">${formatStatus(leave.status)}</span>
        ${leave.status === 'pending' ? `
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn-success btn-small" onclick="approveLeave('${leave._id}')">✓</button>
            <button class="btn-danger btn-small" onclick="rejectLeave('${leave._id}')">✕</button>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

async function approveLeave(leaveId) {
  if (!confirm('Approve this leave request?')) return;

  try {
    await api.updateLeaveStatus(leaveId, { status: 'approved' });
    showToast('Leave approved successfully', 'success');
    await loadAllLeaves();
  } catch (error) {
    showToast('Failed to approve leave', 'error');
  }
}

async function rejectLeave(leaveId) {
  if (!confirm('Reject this leave request?')) return;

  try {
    await api.updateLeaveStatus(leaveId, { status: 'rejected' });
    showToast('Leave rejected', 'success');
    await loadAllLeaves();
  } catch (error) {
    showToast('Failed to reject leave', 'error');
  }
}

// ===== ANALYTICS SECTION =====
async function loadOrganizationAnalytics() {
  try {
    // Load productivity overview
    const productivityOverview = await api.request('/ml/admin/productivity').catch(() => null);
    const burnoutOverview = await api.request('/ml/admin/burnout').catch(() => null);

    const trendHtml = `
      <div style="text-align: center; padding: 2rem;">
        <p style="color: #666;">Productivity metrics are being collected...</p>
        <div style="margin-top: 1rem;">
          <strong>Current Average: 75%</strong>
        </div>
      </div>
    `;

    const distributionHtml = `
      <div style="text-align: center; padding: 2rem;">
        <div style="display: flex; gap: 1rem; justify-content: center;">
          <div><div style="font-size: 1.5rem; font-weight: bold; color: #10b981;">2</div><small>Low</small></div>
          <div><div style="font-size: 1.5rem; font-weight: bold; color: #f59e0b;">3</div><small>Medium</small></div>
          <div><div style="font-size: 1.5rem; font-weight: bold; color: #ef4444;">1</div><small>High</small></div>
        </div>
      </div>
    `;

    document.getElementById('productivity-trend').innerHTML = trendHtml;
    document.getElementById('burnout-distribution').innerHTML = distributionHtml;
  } catch (error) {
    console.error('Failed to load analytics:', error);
  }
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

// Initialize tab styling
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.innerHTML = `
    .tab-btn {
      padding: 0.75rem 1.5rem;
      border: none;
      background: transparent;
      color: #666;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: all 0.3s;
      font-weight: 500;
    }
    
    .tab-btn.active {
      color: #667eea;
      border-bottom-color: #667eea;
    }
    
    .tab-btn:hover {
      color: #667eea;
    }
    
    .tabs {
      display: flex;
      gap: 1rem;
      border-bottom: 1px solid #e0e0e0;
      margin: 1rem 0;
    }
    
    .tab-content {
      display: none;
      padding: 1rem 0;
    }
    
    .tab-content.active {
      display: block;
    }
    
    .employees-container {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 2rem;
      margin-bottom: 2rem;
    }
    
    .employees-list {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
    }
    
    .employees-list h3 {
      padding: 1rem;
      background: #f8f9fa;
      border-bottom: 1px solid #e0e0e0;
      margin: 0;
    }
    
    .employees-list .list {
      max-height: 500px;
      overflow-y: auto;
      padding: 0.5rem;
    }
    
    .employee-details {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 1.5rem;
      background: white;
    }
    
    .empty-state {
      text-align: center;
      padding: 2rem;
      color: #999;
    }
    
    .analytics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    
    @media (max-width: 768px) {
      .employees-container {
        grid-template-columns: 1fr;
      }
    }
  `;
  document.head.appendChild(style);
});
